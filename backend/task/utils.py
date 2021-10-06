from careta.models import Permission
from django.contrib.auth.models import User
from jsondiff import diff
from reversion.models import Version

from .models import IR


def user_permission(user, permission):
    perm = Permission.objects.get(user__username=user.username) # get users permission
    user = User.objects.get(username=user) 
    result = getattr(perm, permission)
    if result is True:
        return True
    else:
        return False


def ir_reversion(ir):
    first = Version.objects.get_for_object(ir).last() # get the oldest version
    latest = Version.objects.get_for_object(ir)[0] # get the latest version
    revised = diff(latest.field_dict,first.field_dict) # get the old item only
    
    repair_types = IR.Repair_List

    try:
        revised['repair_type']
        lists =[(values) for values in first.field_dict['repair_type']]
        repair_type = [(y) for v in lists for x,y in repair_types if v==x]
        revised['repair_type'] = repair_type
    except:
        pass
    
    return revised
