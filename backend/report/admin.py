from django.contrib import admin
from reversion.admin import VersionAdmin
from reversion.models import Version

from .models import Cost, Inspection, Maintenance, Repair

# Register your models here.

admin.site.register(Inspection, VersionAdmin) 
admin.site.register(Maintenance,VersionAdmin) 
admin.site.register(Version)
class CostAdmin(admin.TabularInline):
    model = Cost
    extra = 1

class RepairAdmin(admin.ModelAdmin):
    search_fields = ['vin_no__vin_no']
    inlines = [CostAdmin]
admin.site.register(Repair, RepairAdmin)
admin.site.register(Cost)
