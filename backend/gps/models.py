from datetime import datetime

from car.models import Car
from django.db import models
from django.db.models.fields import AutoField


# Create your models here.
class GPS(models.Model):
    gps_id = models.AutoField(primary_key=True)
    device_id = models.CharField(unique=True, max_length=30, null=True, blank=True)
    body_no = models.ForeignKey(Car, null=True, blank=True,  related_name='gps', on_delete=models.CASCADE)

    date_updated = models.DateField(auto_now=True)
    date_created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.device_id

class Record(models.Model):
    # === OBD ===
    record_id = models.AutoField(primary_key=True)
    obedrecord_id = models.CharField(max_length=20, null=True, blank=True)
    device_id = models.ForeignKey(GPS,  related_name='records', on_delete=models.CASCADE)
    updatetime = models.CharField(max_length=20, null=True, blank=True)
    mileage = models.CharField(max_length=20, null=True, blank=True)
    controlvoltage = models.FloatField(null=True, blank=True)
    gasolineconsumptionperhour = models.FloatField(default=0)
    gasolineconsumptionperhunkm = models.FloatField(default=0)
    overloadcalculate = models.IntegerField(default=0)
    coolanttemperature = models.IntegerField(default=0)
    oilpressure = models.IntegerField(default=0)
    inletbranchpressure = models.IntegerField(default=0)
    inlettemperature = models.IntegerField(default=0)
    airmassflow = models.IntegerField(default=0)
    throttleposition = models.IntegerField(default=0)
    speed = models.IntegerField(default=0)
    oilvalue = models.IntegerField(default=0)
    faultcodetime = models.CharField(max_length=20, null=True, blank=True)
    faultcodes = models.CharField(max_length=20, null=True, blank=True)
    totaldistance = models.IntegerField(default=0)

    # === MILEAGE ===
    statisticsday = models.DateField(blank=True, null=True)
    beginoil = models.IntegerField(default=0)
    endoil = models.IntegerField(default=0)
    addoil = models.IntegerField(default=0)
    leakoil = models.IntegerField(default=0)
    idleoil = models.IntegerField(default=0)
    totaloil = models.IntegerField(default=0)
    totalnotrunningad = models.IntegerField(default=0)
    beginnotrunningad = models.IntegerField(default=0)
    endnotrunningad = models.IntegerField(default=0)
    addnotrunningad = models.IntegerField(default=0)
    leaknotrunningad = models.IntegerField(default=0)
    idlenotrunningad = models.IntegerField(default=0)
    
    totaldistancetoday  = models.CharField(max_length=20, null=True, blank=True)
    endtime  = models.CharField(max_length=20, null=True, blank=True)
    starttime  = models.CharField(max_length=20, null=True, blank=True)

    date_updated = models.DateField(auto_now=True)
    date_created = models.DateField(auto_now_add=True)

    def __str__(self):
        return f'{self.record_id}'

    