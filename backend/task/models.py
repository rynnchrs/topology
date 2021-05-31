import datetime
from datetime import date

from car.models import Car
from django.contrib.auth.models import User
from django.db import models


class JobOrder(models.Model):
    job_id = models.AutoField(primary_key=True)
    job_no = models.IntegerField(default=1)
    type = models.BooleanField(default=True)

    def __str__(self):
        return str(self.job_id)


class Task(models.Model):
    task_id = models.AutoField(primary_key=True)
    manager = models.ForeignKey(User, related_name='task', on_delete=models.CASCADE)
    body_no = models.ForeignKey(Car, related_name='task', on_delete=models.CASCADE)
    job_order = models.OneToOneField(JobOrder, related_name='task', on_delete=models.CASCADE)
    desc = models.TextField(blank=True, null=True)
    schedule_date = models.DateField(default=datetime.date.today)
    remarks =  models.TextField(blank=True, null=True)
    start_date = models.DateField(default=datetime.date.today)
    end_date = models.DateField(default=datetime.date.today)
    start_date_actual = models.DateField(null=True, blank=True)
    end_date_actual = models.DateField(null=True, blank=True)
    task_status_fm = models.BooleanField(default=False)
    task_status_mn = models.BooleanField(default=False)
    date_updated = models.DateField(auto_now=True)
    date_created = models.DateField(auto_now_add=True)
    def __str__(self):
        return str(self.task_id)
    
    @property
    def actual_days(self):
        return (self.start_date_actual-self.end_date_actual)


class Fieldman(models.Model):
    fieldman_id = models.AutoField(primary_key=True)
    task = models.ForeignKey(Task, related_name='fieldman', on_delete=models.CASCADE)
    field_man = models.ForeignKey(User, related_name='fieldman', on_delete=models.CASCADE)

    def __str__(self):
        return str(self.fieldman_id)
