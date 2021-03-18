# todo/admin.py

from django.contrib import admin

from .models import (Car, Cost, Inspection,  # ReportImage # add this
                     Maintenance, Permission, Repair, UserInfo)


class CarAdmin(admin.ModelAdmin):  # add this
    list_display = ('vin_no', 'body_no', 'cs_no','dealer_phone')  # add this

class UserInfoAdmin(admin.ModelAdmin):  # add this
    list_display = ('id','user','company', 'position', 'gender','address','birthday','phone','address','full_name')  # add this
# Register your models here.
admin.site.register(Car, CarAdmin)  # add this
admin.site.register(UserInfo, UserInfoAdmin)  # add this
admin.site.register(Permission)  # add this
admin.site.register(Inspection) 
admin.site.register(Maintenance) 
#class ImageReport(admin.TabularInline):
#    model = ReportImage
#    extra = 1

#class ReportAdmin(admin.ModelAdmin): # report admin
#    search_fields =  ['report_id','car__vin_no','body_no','make','mileage','location','cleanliness_exterior','condition_rust','decals','windows',
                    # 'rear_door','mirror','roof_rack','rear_step','seats','seat_belts','general_condition','vehicle_documents','main_beam',
                    # 'dipped_beam','side_lights','tail_lights','indicators','break_lights','reverse_lights','hazard_light','rear_fog_lights',
                    # 'interior_lights','screen_washer','wiper_blades','horn','radio','front_fog_lights','air_conditioning','cleanliness_engine_bay',
                    # 'washer_fluid','coolant_level','brake_fluid_level','power_steering_fluid','gas_level','oil_level','tyres','front_visual',
                    # 'rear_visual','spare_visual','wheel_brace','jack','front_right_wheel','front_left_wheel','rear_right_wheel','rear_left_wheel', 
                    # 'notes','date_updated','date_created']
#    inlines = [ImageReport]

#admin.site.register(Report, ReportAdmin)

class CostAdmin(admin.TabularInline):
    model = Cost
    extra = 1

class RepairAdmin(admin.ModelAdmin):
    search_fields = ['vin_no__vin_no']
    inlines = [CostAdmin]

admin.site.register(Repair, RepairAdmin)
admin.site.register(Cost)
