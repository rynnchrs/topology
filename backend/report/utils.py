import json

from rest_framework import serializers

from car.models import Car
from careta.models import Permission
from django.contrib.auth.models import User
from jsondiff import diff
from reversion.models import Version

from .models import CheckList, CheckListParts, CheckListReportParts, Cost


def user_permission(user, permission):
    perm = Permission.objects.get(user__username=user.username) # get users permission
    user = User.objects.get(username=user) 
    result = getattr(perm, permission)
    if result is True:
        return True
    else:
        return False

def reversion(inspection):
    first = Version.objects.get_for_object(inspection).last() # get the oldest version
    first = json.loads(str(first.serialized_data).replace('[','').replace(']','')) # convert to json
    latest = Version.objects.get_for_object(inspection)[0] # get the latest version
    latest = json.loads(str(latest.serialized_data).replace('[','').replace(']','')) #convert to json
    revised = diff(first['fields'],latest['fields']) # get the updated item only
    try:
        user = User.objects.get(pk=revised['edited_by'])
        revised['edited_by'] = user.user_info.full_name
    except:
        pass
    first = first['fields'] 
    car = Car.objects.get(pk=first['body_no']) # get car instance
    driver = User.objects.get(pk=first['driver']) # get driver instance
    old = {
        'body_no':{
            'vin_no': car.vin_no,
            'body_no': car.body_no,
            'plate_no': car.plate_no,
            'make': car.make,
            'current_loc': car.current_loc,
        }
    }
    first.pop('body_no', None) # remove the body_no item in first json
    first.pop('driver', None) # remove the driver item
    first.pop('edited_by', None)
    old.update(first) # merge first json and latest json
    data = old
    data['driver'] = driver.user_info.full_name
    data['revised'] = revised
    return data

    
def repair_reversion(repair):
    first = Version.objects.get_for_object(repair).last() # get the oldest version
    latest = Version.objects.get_for_object(repair)[0] # get the latest version
    revised = diff(latest.field_dict,first.field_dict) # get the old item only
    
    cost_parts = []
    parts = Cost.objects.filter(ro_no=repair, cost_type="P")
    for part in parts:
        lists =  Version.objects.get_for_object(part)
        parts_first = Version.objects.get_for_object(part).last() # get the oldest version
        if parts_first.field_dict['particulars'] is None and len(lists) > 1:
            parts_first.delete()
        else:
            parts_latest = Version.objects.get_for_object(part)[0] # get the latest version
            parts_revised = diff(parts_latest.field_dict,parts_first.field_dict) # get the old item only
            # if parts_revised:
            cost_parts.append(parts_revised)
        
    cost_labor = []
    labor = Cost.objects.filter(ro_no=repair, cost_type="L")
    for lab in labor:
        lists =  Version.objects.get_for_object(lab)
        labor_first = Version.objects.get_for_object(lab).last() # get the oldest version
        if labor_first.field_dict['particulars'] is None and len(lists) > 1:
            labor_first.delete()
        else:
            labor_latest = Version.objects.get_for_object(lab)[0] # get the latest version
            labor_revised = diff(labor_latest.field_dict,labor_first.field_dict) # get the old item only
            # if labor_revised:
            cost_labor.append(labor_revised)

    revised['parts'] = cost_parts
    revised['labor'] = cost_labor

    if 'noted_by_id' in revised:
        del revised['noted_by_id']
        
    return revised

def checklist_reversion(checklist):
    first = Version.objects.get_for_object(checklist).last() # get the oldest version
    latest = Version.objects.get_for_object(checklist)[0] # get the latest version
    revised = diff(latest.field_dict,first.field_dict) # get the old item only
    
    parts_list = CheckList.Parts_List

    try:
        revised['parts_included']
        try:
            lists =[(values) for key, values in revised['parts_included'].items()]
            print(lists)
            parts_included = [(y) for k,v in lists[0] for x,y in parts_list if v==x]
            print(parts_included)
            revised['parts_included'] = parts_included
        except:
            lists =[int(values) for values in revised['parts_included']]
            print(lists)
            parts_included = [(y) for v in lists for x,y in parts_list if v==x]
            revised['parts_included'] = parts_included
    except:
        pass

    parts = []
    parts_data = CheckListReportParts.objects.filter(check_list=checklist)
    
    for part_data in parts_data:
        lists =  Version.objects.get_for_object(part_data)
        parts_first = Version.objects.get_for_object(part_data).last()
        parts_name = CheckListParts.objects.get(id=parts_first.field_dict['check_list_parts_id'])
        if parts_name is None and len(lists) > 1:
            print(parts_first.field_dict)
            parts_first.delete()
        else:
            parts_latest = Version.objects.get_for_object(part_data)[0] # get the latest version
            parts_revised = diff(parts_latest.field_dict,parts_first.field_dict) # get the old item only
            for key, value in parts_revised.items():
                if "check_list_parts_id" in key:
                    parts_name = CheckListParts.objects.get(id=value)
                    if parts_revised[key] is not None:
                        parts_revised[key] = parts_name.name
            parts.append(parts_revised)

    if parts:
        revised['parts'] = parts

    if 'noted_by_id' in revised:
        del revised['noted_by_id']
        
    return revised

def analysis(checklist):
    odometer=""
    
    if checklist['odometer'] >= 10000:
        odometer = "Need to change the oil."
        
    fields = ['pair_ewd',
            'body_no_ewd',
            'body_no_fl_tire',
            'body_no_fr_tire',
            'body_no_rl_tire',
            'body_no_rr_tire',
            'spare_tire',
            'body_no_spare',
            'body_no_batt',
            'vehicle_wt'
            ]
    booleans = 0
    for field in checklist:
        for item in fields:
            if field == item:
                if field is True:
                    booleans+=1
    
    if booleans >= 1:
        if checklist['parts']:
            if checklist['status'] == "Operational":
                analize = "Not in critical condition but need to check."
            else:
                analize = "Critical condition prior to repair."
        else:
            if checklist['status'] == "Operational":
                analize = "Not in critical condition but need to check."
            else:
                analize = "Critical condition prior to repair."
    else:
        if checklist['parts']:
            if checklist['status'] == "Operational":
                analize = "Not in critical condition but need to check."
            else:
                analize = "Critical condition prior to repair."
        else:
            if checklist['status'] == "Operational":
                analize = "The vehicle is in good condition"
            else:
                analize = "Not in critical condition but need to check."
        
    if odometer:
        return (odometer, analize)
    else:
        return (odometer, analize)