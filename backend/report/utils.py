import json
from jsondiff import diff
from django.contrib.auth.models import User
from careta.models import Car, Permission
from reversion.models import Version

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

def maintenance_reversion(maintenance):
    first = Version.objects.get_for_object(maintenance).last() # get the oldest version
    first = json.loads(str(first.serialized_data).replace('[','').replace(']','')) # convert to json
    latest = Version.objects.get_for_object(maintenance)[0] # get the latest version
    latest = json.loads(str(latest.serialized_data).replace('[','').replace(']','')) #convert to json

    revised = diff(first['fields'],latest['fields']) # get the updated item only
    first = first['fields'] 
    car = Car.objects.get(pk=first['body_no']) # get car instance
    inspected_by = User.objects.get(pk=first['inspected_by']) # get inspected_by instance
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
    first.pop('inspected_by', None) # remove the inspected_by item
    old.update(first) # merge first json and latest json
    data = old
    data['inspected_by'] = inspected_by.username
    data['revised'] = revised
    return data