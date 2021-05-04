import datetime
from datetime import date

from car.models import Car
from django.contrib.auth.models import User
from django.db import models


class JobOrder(models.Model):
    job_id = models.AutoField(primary_key=True)
    job_no = models.IntegerField(default=0)
    type = models.BooleanField(default=True)

    def __str__(self):
        return str(self.job_id)


class Task(models.Model):
    task_id = models.AutoField(primary_key=True)
    manager = models.ForeignKey(User, related_name='task', on_delete=models.CASCADE)
    body_no = models.ForeignKey(Car, related_name='task', on_delete=models.CASCADE)
    job_order = models.OneToOneField(JobOrder, related_name='task', on_delete=models.CASCADE)
    desc = models.TextField(blank=True, null=True)
    remarks =  models.TextField(blank=True, null=True)
    startdate = models.DateTimeField(default=datetime.date.today)
    enddate = models.DateTimeField(default=datetime.date.today)
    startdate_actual = models.DateTimeField(default=datetime.date.today)
    enddate_actual = models.DateTimeField(default=datetime.date.today)
    actual_days = models.DateTimeField(default=datetime.date.today)
    task_status_fm = models.BooleanField(default=False)
    task_status_mn = models.BooleanField(default=False)

    def __str__(self):
        return str(self.task_id)


class Fieldman(models.Model):
    fieldman_id = models.AutoField(primary_key=True)
    task = models.ForeignKey(Task, related_name='fieldman', on_delete=models.CASCADE)
    field_man = models.ForeignKey(User, related_name='fieldman', on_delete=models.CASCADE)

    def __str__(self):
        return str(self.fieldman_id)
