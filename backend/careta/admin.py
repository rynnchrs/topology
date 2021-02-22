# todo/admin.py

from django.contrib import admin
from .models import Car, Permission, UserInfo , Report #ReportImage # add this


class CarAdmin(admin.ModelAdmin):  # add this
    list_display = ('vin_no', 'body_no', 'cs_no','dealer_phone')  # add this

class UserInfoAdmin(admin.ModelAdmin):  # add this
    list_display = ('id','user','company', 'position', 'gender','address','birthday','phone','address')  # add this
# Register your models here.
admin.site.register(Car, CarAdmin)  # add this
admin.site.register(UserInfo, UserInfoAdmin)  # add this
admin.site.register(Permission)  # add this

#class ImageReport(admin.TabularInline):
#    model = ReportImage
#    extra = 1

#class ReportAdmin(admin.ModelAdmin): # report admin
#    search_fields = ['room_number']
#    inlines = [ImageReport]

#admin.site.register(Report, ReportAdmin)
