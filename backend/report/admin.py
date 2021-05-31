from django.contrib import admin
from reversion.admin import VersionAdmin
from reversion.models import Version

from .models import Cost, Inspection, Repair

# Register your models here.

admin.site.register(Inspection, VersionAdmin) 
admin.site.register(Version)
class CostAdmin(admin.TabularInline):
    model = Cost
    extra = 1

class RepairAdmin(admin.ModelAdmin):
    inlines = [CostAdmin]
admin.site.register(Repair, RepairAdmin)
admin.site.register(Cost)
