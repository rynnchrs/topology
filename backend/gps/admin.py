from django.contrib import admin

from .models import GPS, Record

# Register your models here.
class GPSAdmin(admin.ModelAdmin):
    list_display = ('device_id', 'body_no') 
admin.site.register(GPS, GPSAdmin)


class RecordAdmin(admin.ModelAdmin):
    list_display = ('record_id','obedrecord_id','device_id')
admin.site.register(Record, RecordAdmin)