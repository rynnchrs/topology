# todo/admin.py

from django.contrib import admin

from .models import (TPL, Car,  Fieldman,  # ReportImage # add this
                     Insurance, JobOrder, Permission, Task, UserInfo)


class CarAdmin(admin.ModelAdmin):  # add this
    list_display = ('vin_no', 'body_no', 'cs_no','dealer_phone')  # add this

class UserInfoAdmin(admin.ModelAdmin):  # add this
    list_display = ('id','user','company', 'position', 'gender','address','birthday','phone','address','full_name')  # add this
# Register your models here.
admin.site.register(Car, CarAdmin)  # add this
admin.site.register(UserInfo, UserInfoAdmin)  # add this
admin.site.register(Permission)  # add this
admin.site.register(TPL) 
admin.site.register(Insurance) 
admin.site.register(JobOrder) 

class FieldmanAdmin(admin.TabularInline):
    model = Fieldman
    extra = 1

class TaskAdmin(admin.ModelAdmin):
    inlines = [FieldmanAdmin]

admin.site.register(Task, TaskAdmin)  
admin.site.register(Fieldman)  
