import inspect
from django.contrib import admin

# Register your models here.
from .models import Car, Contract, Insurance, TPL

admin.site.register(Car) 
admin.site.register(Contract) 
admin.site.register(TPL) 
admin.site.register(Insurance) 