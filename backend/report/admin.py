from django.contrib import admin
from reversion.admin import VersionAdmin
from reversion.models import Version

from .models import CheckList, Cost, Inspection, Repair

# Register your models here.

admin.site.register(Inspection, VersionAdmin)


admin.site.register(Version)
class CostAdmin(admin.TabularInline):
    model = Cost
    extra = 1

class RepairAdmin(VersionAdmin):
    inlines = [CostAdmin]
    list_display = ['repair_id','job_order']

admin.site.register(Repair, RepairAdmin) 


class CostAdmin(admin.ModelAdmin):
    list_display = ['cost_id','ro_no']

admin.site.register(Cost, CostAdmin) 
admin.site.register(CheckList)