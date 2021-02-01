# todo/admin.py

from django.contrib import admin
from .models import Car  # add this


class CarAdmin(admin.ModelAdmin):  # add this
    list_display = ('vin_no', 'body_no', 'cs_no','dealer_phone')  # add this


# Register your models here.
admin.site.register(Car, CarAdmin)  # add this
