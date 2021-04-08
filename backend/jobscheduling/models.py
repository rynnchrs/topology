from careta.models import Car
import datetime
from datetime import date
from django.contrib.auth.models import User  # authenticate User
from django.db import models
from django.db.models import fields
from django.db.models.deletion import CASCADE  # add this
from django.db.models.fields import (AutoField, BooleanField, CharField,
                                     DateField, DateTimeField)
from django.db.models.fields.related import ForeignKey
from phone_field import PhoneField


class JobOrder(models.Model):
    id = models.AutoField(primary_key=True)
    job_number = models.IntegerField(default=0, null=False, blank=False)
    job_type = models.BooleanField(default=False)
        
    def __str__(self):
        return self.id      


class Task(models.Model):
    id = models.AutoField(primary_key=True)
    manager = models.ForeignKey(User, related_name='TaskMgr', on_delete=models.CASCADE)
    car = models.ForeignKey(Car, related_name='TaskCar', on_delete=models.CASCADE)
    job_order = models.ForeignKey(JobOrder, related_name='TaskJO', on_delete=models.CASCADE)
    job_desc = models.CharField(max_length=100)
    job_remarks = models.CharField(max_length=100)
    job_startdate = models.DateField(auto_now=False, auto_now_add=False)
    job_enddate = models.DateField(auto_now=False, auto_now_add=False)
    job_startdate_actual = models.DateField(auto_now=False, auto_now_add=False)
    job_enddate_actual = models.DateField(auto_now=False, auto_now_add=False)
    job_actualdays = models.IntegerField(default=0, null=True, blank=True)
    job_status_fm = models.BooleanField(default=False)
    job_status_mn = models.BooleanField(default=False)
    job_scheduledate = models.DateField(auto_now=False, auto_now_add=False)
    
    def __str__(self):
        return self.id


class FieldManAssignment(models.Model):
    id = models.AutoField(primary_key=True)
    task_id = models.ForeignKey(Task, related_name='FieldmanTask', on_delete=models.CASCADE)
    fieldman = models.ForeignKey(User, related_name='FieldmanId', on_delete=models.CASCADE)
        
    def __str__(self):
        return self.id

          

