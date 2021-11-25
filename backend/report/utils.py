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

    if 'approved_by_id' in revised:
        del revised['approved_by_id']
    if 'noted_by' in revised:
        del revised['noted_by']
        
    return revised

def checklist_reversion(checklist):
    first = Version.objects.get_for_object(checklist).last() # get the oldest version
    latest = Version.objects.get_for_object(checklist)[0] # get the latest version
    revised = diff(latest.field_dict,first.field_dict) # get the old item only

    parts_list = CheckList.Parts_List
    job_desc_value = CheckList.Job_List

    try:
        revised['job_desc']
        job_desc = [(y) for x,y in job_desc_value if revised['job_desc']==x]
        revised['job_desc'] = job_desc
    except:
        pass
    try:
        revised['parts_included']
        lists =[int(values) for values in first.field_dict['parts_included']]
        parts_included = [(y) for v in lists for x,y in parts_list if v==x]
        revised['parts_included'] = parts_included
    except:
        pass

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

def fi_report_reversion(inspection):
    
    first = Version.objects.get_for_object(inspection).last() # get the oldest version
    latest = Version.objects.get_for_object(inspection)[0] # get the latest version
    revised = diff(latest.field_dict,first.field_dict) # get the old item only

    return revised

def fi_report_serialized(data):
    
    field = ["Hood","Front","Front Bumper","Fenders","Doors",
            "Roof","Rear","Rear Bumper","Trunk","Trim","Fuel Door","Paint Condition",
            "Windshield","Windows","Mirrors","Rear Windows","Condition of Tires","Condition of Wheels",
            "Spare Tire","Frame","Exhaust System","Transmission","Drive Axle","Suspension",
            "Brake System","Engine Compartment","Battery","Oil","Fluids","Wiring","Belts",
            "Hoses","Any Non-Stock Modifications","Seats","Headliner","Carpet","Door Panels",
            "Glove Box","Vanity Mirror","Interior Trim","Dashboard","DaFshboard Gauges","Air Conditioning",
            "Heater","Defroster","Power Locks","Power Seats","Power Steering","Power Windows",
            "Power Mirrors","Audio System","Onboard Computer","Headlights","Taillights","Signal Lights",
            "Brake Lights","Parking Lights","Starting","Idling","Engine Performance","Acceleration",
            "Transmission Shift Quality","Steering","Braking","Suspension Performance"]

    note = ["hood_note","front_note","front_bumper_note","fenders_note","doors_note",
            "roof_note","rear_note","rear_bumper_note","trunk_note","trim_note","fuel_door_note","pait_condition_note",
            "windshield_note","windows_note","mirrors_note","rear_window_note","tires_condition_note","wheels_condition_note",
            "spare_tire_note","frame_note","exhaust_system_note","transmission_note","drive_axle_note","suspension_note",
            "breake_system_note","engine_compartment_note","battery_note","oil_note","fluids_note","wiring_note","belts_note",
            "hoses_note","non_stock_modif_note","seats_note","headliner_note","carpet_note","door_panels_note",
            "glove_box_note","vanity_mirrors_note","interioir_trim_note","dashboard_note","dashboard_gauges_note","air_conditioning_note",
            "heater_note","defroster_note","power_locks_note","power_seats_note","power_steering_note","power_windows_note",
            "power_mirrors_note","audio_system_note","onboard_computer_note","headlights_note","taillights_note","signal_lights_note",
            "brake_lights_note","parking_lights_note","starting_note","idling_note","engine_performance_note","acceleration_note",
            "trans_shift_quality_note","steering_note","braking_note","suspension_performance_note"]
    
    parts = ["hood","front","front_bumper","fenders","doors",
            "roof","rear","rear_bumper","trunk","trim","fuel_door","pait_condition",
            "windshield","windows","mirrors","rear_window","tires_condition","wheels_condition",
            "spare_tire","frame","exhaust_system","transmission","drive_axle","suspension",
            "breake_system","engine_compartment","battery","oil","fluids","wiring","belts",
            "hoses","non_stock_modif","seats","headliner","carpet","door_panels",
            "glove_box","vanity_mirrors","interioir_trim","dashboard","dashboard_gauges","air_conditioning",
            "heater","defroster","power_locks","power_seats","power_steering","power_windows",
            "power_mirrors","audio_system","onboard_computer","headlights","taillights","signal_lights",
            "brake_lights","parking_lights","starting","idling","engine_performance","acceleration",
            "trans_shift_quality","steering","braking","suspension_performance"]


    exterior = []
    glass = []
    tires_wheels = []
    under_body = []
    under_hood = []
    interior = []
    electrical_system = []
    road_test_findings = []
    
    to_delete = []

    good_count = 0
    fair_count = 0
    poor_count = 0

    for key, value in data.items():
        if '_note' in key:
            if value:
                index = note.index(key)
                if index <= 11:
                    real = field[index]
                    exterior.append(f'{real} - {value}')
                elif index <= 15:
                    real = field[index]
                    glass.append(f'{real} - {value}')
                elif index <= 18:
                    real = field[index]
                    tires_wheels.append(f'{real} - {value}')
                elif index <= 24:
                    real = field[index]
                    under_body.append(f'{real} - {value}')
                elif index <= 32:
                    real = field[index]
                    under_hood.append(f'{real} - {value}')
                elif index <= 44:
                    real = field[index]
                    interior.append(f'{real} - {value}')
                elif index <= 56:
                    real = field[index]
                    electrical_system.append(f'{real} - {value}')
                elif index <= 64:
                    real = field[index]
                    road_test_findings.append(f'{real} - {value}')
            to_delete.append(key)
        if value == "G":
            good_count += 1
        elif value == "F":
            fair_count += 1
        elif value == "P":
            poor_count += 1

    for key in to_delete:
        del data[key]
    
    good = {
        'Exterior':[],
        'Glass':[],
        'Tires and wheels': [],
        'Under Body': [],
        'Under Hood': [],
        'Interior': [],
        'Electrical System': [],
        'Road Test Findings': [],
    }
    fair = {
        'Exterior':[],
        'Glass':[],
        'Tires and wheels': [],
        'Under Body': [],
        'Under Hood': [],
        'Interior': [],
        'Electrical System': [],
        'Road Test Findings': [],
    }
    poor = {
        'Exterior':[],
        'Glass':[],
        'Tires and wheels': [],
        'Under Body': [],
        'Under Hood': [],
        'Interior': [],
        'Electrical System': [],
        'Road Test Findings': [],
    }

    for key, value in data.items():
        if value == "G":
            index = parts.index(key)
            real = field[index]
            ext = [string for string in exterior if real in string]
            gla = [string for string in glass if real in string]
            tir = [string for string in tires_wheels if real in string]
            bod = [string for string in under_body if real in string]
            hoo = [string for string in under_hood if real in string]
            inte = [string for string in interior if real in string]
            ele = [string for string in electrical_system if real in string]
            roa = [string for string in road_test_findings if real in string]
            if ext:
                good['Exterior'].append(listToString(ext))
            else:
                if index <= 11:
                    good['Exterior'].append(real)
            if gla:
                good['Glass'].append(listToString(gla))
            else:
                if index <= 15 and index >= 12:
                    good['Glass'].append(real)
            if tir:
                good['Tires and wheels'].append(listToString(tir))
            else:
                if index <= 18 and index >= 16:
                    good['Tires and wheels'].append(real)
            if bod:
                good['Under Body'].append(listToString(bod))
            else:
                if index <= 24 and index >= 19:
                    good['Under Body'].append(real)
            if hoo:
                good['Under Hood'].append(listToString(hoo))
            else:
                if index <= 32 and index >= 25:
                    good['Under Hood'].append(real)
            if inte:
                good['Interior'].append(listToString(inte))
            else:
                if index <= 44 and index >= 33:
                    good['Interior'].append(real)
            if ele:
                good['Electrical System'].append(listToString(ele))
            else:
                if index <= 56 and index >= 45:
                    good['Electrical System'].append(real)
            if roa:
                good['Road Test Findings'].append(listToString(roa))
            else:
                if index <= 64 and index >= 57:
                    good['Road Test Findings'].append(real)
        elif value == "F":
            index = parts.index(key)
            real = field[index]
            ext = [string for string in exterior if real in string]
            gla = [string for string in glass if real in string]
            tir = [string for string in tires_wheels if real in string]
            bod = [string for string in under_body if real in string]
            hoo = [string for string in under_hood if real in string]
            inte = [string for string in interior if real in string]
            ele = [string for string in electrical_system if real in string]
            roa = [string for string in road_test_findings if real in string]
            if ext:
                fair['Exterior'].append(listToString(ext))
            else:
                if index <= 11:
                    fair['Exterior'].append(real)
            if gla:
                fair['Glass'].append(listToString(gla))
            else:
                if index <= 15 and index >= 12:
                    fair['Glass'].append(real)
            if tir:
                fair['Tires and wheels'].append(listToString(tir))
            else:
                if index <= 18 and index >= 16:
                    fair['Tires and wheels'].append(real)
            if bod:
                fair['Under Body'].append(listToString(bod))
            else:
                if index <= 24 and index >= 19:
                    fair['Under Body'].append(real)
            if hoo:
                fair['Under Hood'].append(listToString(hoo))
            else:
                if index <= 32 and index >= 25:
                    fair['Under Hood'].append(real)
            if inte:
                fair['Interior'].append(listToString(inte))
            else:
                if index <= 44 and index >= 33:
                    fair['Interior'].append(real)
            if ele:
                fair['Electrical System'].append(listToString(ele))
            else:
                if index <= 56 and index >= 45:
                    fair['Electrical System'].append(real)
            if roa:
                fair['Road Test Findings'].append(listToString(roa))
            else:
                if index <= 64 and index >= 57:
                    fair['Road Test Findings'].append(real)
        elif value == "P":
            index = parts.index(key)
            real = field[index]
            ext = [string for string in exterior if real in string]
            gla = [string for string in glass if real in string]
            tir = [string for string in tires_wheels if real in string]
            bod = [string for string in under_body if real in string]
            hoo = [string for string in under_hood if real in string]
            inte = [string for string in interior if real in string]
            ele = [string for string in electrical_system if real in string]
            roa = [string for string in road_test_findings if real in string]
            if ext:
                poor['Exterior'].append(listToString(ext))
            else:
                if index <= 11:
                    poor['Exterior'].append(real)
            if gla:
                poor['Glass'].append(listToString(gla))
            else:
                if index <= 15 and index >= 12:
                    poor['Glass'].append(real)
            if tir:
                poor['Tires and wheels'].append(listToString(tir))
            else:
                if index <= 18 and index >= 16:
                    poor['Tires and wheels'].append(real)
            if bod:
                poor['Under Body'].append(listToString(bod))
            else:
                if index <= 24 and index >= 19:
                    poor['Under Body'].append(real)
            if hoo:
                poor['Under Hood'].append(listToString(hoo))
            else:
                if index <= 32 and index >= 25:
                    poor['Under Hood'].append(real)
            if inte:
                poor['Interior'].append(listToString(inte))
            else:
                if index <= 44 and index >= 33:
                    poor['Interior'].append(real)
            if ele:
                poor['Electrical System'].append(listToString(ele))
            else:
                if index <= 56 and index >= 45:
                    poor['Electrical System'].append(real)
            if roa:
                poor['Road Test Findings'].append(listToString(roa))
            else:
                if index <= 64 and index >= 57:
                    poor['Road Test Findings'].append(real)

    
    if not good['Exterior']:
        del good['Exterior']
    if not good['Glass']:
        del good['Glass']
    if not good['Tires and wheels']:
        del good['Tires and wheels']
    if not good['Under Body']:
        del good['Under Body']
    if not good['Under Hood']:
        del good['Under Hood']
    if not good['Interior']:
        del good['Interior']
    if not good['Electrical System']:
        del good['Electrical System']
    if not good['Road Test Findings']:
        del good['Road Test Findings']
    
    if not fair['Exterior']:
        del fair['Exterior']
    if not fair['Glass']:
        del fair['Glass']
    if not fair['Tires and wheels']:
        del fair['Tires and wheels']
    if not fair['Under Body']:
        del fair['Under Body']
    if not fair['Under Hood']:
        del fair['Under Hood']
    if not fair['Interior']:
        del fair['Interior']
    if not fair['Electrical System']:
        del fair['Electrical System']
    if not fair['Road Test Findings']:
        del fair['Road Test Findings']
        
    if not poor['Exterior']:
        del poor['Exterior']
    if not poor['Glass']:
        del poor['Glass']
    if not poor['Tires and wheels']:
        del poor['Tires and wheels']
    if not poor['Under Body']:
        del poor['Under Body']
    if not poor['Under Hood']:
        del poor['Under Hood']
    if not poor['Interior']:
        del poor['Interior']
    if not poor['Electrical System']:
        del poor['Electrical System']
    if not poor['Road Test Findings']:
        del poor['Road Test Findings']
     
    context = {
        'good': good,
        'fair': fair,
        'poor': poor
    }
    
    if not good:
        del context['good']
    if not fair:
        del context['fair']
    if not poor:
        del context['poor']
  
    data['summary'] = context
    data['poor_count'] = poor_count
    data['good_count'] = good_count
    data['fair_count'] = fair_count

    return data

def listToString(s): 
    # initialize an empty string
    str1 = " "
    # return string  
    return (str1.join(s))

def field_inspection_image(request,serializer):
    image_count = 0
    for key in request:
        if 'images' in key:
            image_count += 1
    images_mode = []
    images_name = []
    for i in range(image_count):
        mode = f'images[{i}]mode'
        image_name = f'images[{i}]image_name'
        images_mode.append(mode)
        images_name.append(image_name)
    for image in images_mode:
        request[image] = 'fi'
    for image in images_name:
        request[image] = serializer['fi_report_id']
    return request