from django.contrib import admin

from .models import Fieldman, JobOrder, Task

admin.site.register(JobOrder) 

class FieldmanAdmin(admin.TabularInline):
    model = Fieldman
    extra = 1

class TaskAdmin(admin.ModelAdmin):
    inlines = [FieldmanAdmin]

admin.site.register(Task, TaskAdmin)  
admin.site.register(Fieldman)  
