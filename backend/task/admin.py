from django.contrib import admin
from reversion.admin import VersionAdmin
from reversion.models import Version

from .models import Fieldman, IR, JobOrder, Task

admin.site.register(JobOrder) 

class FieldmanAdmin(admin.TabularInline):
    model = Fieldman
    extra = 1

class TaskAdmin(admin.ModelAdmin):
    inlines = [FieldmanAdmin]

admin.site.register(Task, TaskAdmin)  
admin.site.register(Fieldman)

# admin.site.register(Version)
class IRAdmin(VersionAdmin):
    list_display = ['ir_id','body_no']

admin.site.register(IR, IRAdmin)  
