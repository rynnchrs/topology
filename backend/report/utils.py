import json

from car.models import Car
from careta.models import Permission
from django.contrib.auth.models import User
from jsondiff import diff
from reversion.models import Version

from .models import Cost


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
        parts_first = Version.objects.get_for_object(part).last() # get the oldest version
        if parts_first.field_dict['particulars'] is not None:
            parts_latest = Version.objects.get_for_object(part)[0] # get the latest version
            parts_revised = diff(parts_latest.field_dict,parts_first.field_dict) # get the old item only
        
            cost_parts.append(parts_revised)
        
    cost_labor = []
    labor = Cost.objects.filter(ro_no=repair, cost_type="L")
    for lab in labor:
        labor_first = Version.objects.get_for_object(lab).last() # get the oldest version
        if labor_first.field_dict['particulars'] is not None:
            labor_latest = Version.objects.get_for_object(lab)[0] # get the latest version
            labor_revised = diff(labor_latest.field_dict,labor_first.field_dict) # get the old item only
            cost_labor.append(labor_revised)

    revised['parts'] = cost_parts
    revised['labor'] = cost_labor

    return revised
