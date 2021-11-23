# todo/admin.py

from django.contrib import admin

from .models import DashboardPermission, Permission, UserInfo


class UserInfoAdmin(admin.ModelAdmin):  # add this
    list_display = ('id','user','company', 'position', 'gender','address','phone','address','full_name')  # add this
# Register your models here.
admin.site.register(UserInfo, UserInfoAdmin)  # add this
admin.site.register(Permission)  # add this
admin.site.register(DashboardPermission)  # add this
