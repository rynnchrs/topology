import inspect

from django.contrib import admin

# Register your models here.
from .models import PDF, TPL, Car, Contract, Insurance

admin.site.register(Car) 
admin.site.register(Contract) 
admin.site.register(TPL) 
admin.site.register(Insurance) 
admin.site.register(PDF) 