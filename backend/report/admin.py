from django.contrib import admin
from reversion.admin import VersionAdmin
from reversion.models import Version

from .models import CheckList, CheckListParts, CheckListReportParts, Cost, Inspection, Repair

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


class CheckListReportPartsAdmin(admin.TabularInline):
    model = CheckListReportParts
    extra = 1

class CheckListAdmin(VersionAdmin):
    inlines = [CheckListReportPartsAdmin]
    list_display = ['check_list_id','job_order','task']

admin.site.register(CheckList, CheckListAdmin) 

class CheckListReportPartsAdmin(admin.ModelAdmin):
    list_display = ['id','check_list_parts','quantity']

admin.site.register(CheckListReportParts, CheckListReportPartsAdmin)