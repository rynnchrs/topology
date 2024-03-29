from django.contrib.auth.models import User

from .models import Permission


def user_permission(user, permission):
    perm = Permission.objects.get(user__username=user.username) # get users permission
    user = User.objects.get(username=user) 
    result = getattr(perm, permission)
    if result is True:
        return True
    else:
        return False

    