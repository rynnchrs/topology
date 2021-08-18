import report.models
import datetime
from datetime import date

from car.models import Car
from django.contrib.auth.models import User
from django.db import models
from multiselectfield import MultiSelectField


class JobOrder(models.Model):
    job_id = models.AutoField(primary_key=True)
    job_no = models.IntegerField(default=1)
    type = models.BooleanField(default=True)

    def __str__(self):
        return str(self.job_id)


class IR(models.Model):
    ir_id = models.AutoField(primary_key=True)
    ir_no = models.CharField(unique=True, max_length=50, null=True, blank=True)
    date = models.DateTimeField(default=datetime.datetime.now)
    weiver = models.BooleanField(default=False)
    req_name = models.CharField(max_length=50, null=True, blank=True)
    body_no = models.ForeignKey(Car, related_name='ir_body_no', on_delete=models.CASCADE)
    project_name = models.CharField(max_length=30, null=True, blank=True)
    sub_project = models.CharField(max_length=30, null=True, blank=True)
    region = models.CharField(max_length=30, null=True, blank=True)
    exact_loc = models.CharField(max_length=70, null=True, blank=True)
    vehicle_supp = models.CharField(max_length=50, null=True, blank=True)
    odometer = models.CharField(max_length=20, null=True, blank=True)
    Repair_List = [
        ('me', 'Mehcanical'),
        ('el', 'Electrical'),
        ('ba', 'Battery'),
        ('ti', 'Tires'),
        ('pm', 'PMS'),
        ('ac', 'Accident'),
        ('ot', 'Others'),
    ]
    repair_type = MultiSelectField(max_length=2, choices=Repair_List, null=True, blank=True)
    damaged_parts = models.TextField(max_length=200, null=True, blank=True)
    incedent_loc = models.CharField(max_length=20, null=True, blank=True)
    problem_obs = models.TextField(max_length=200, null=True, blank=True)
    recommendation = models.TextField(max_length=200, null=True, blank=True)
    date_time = models.DateTimeField(default=datetime.datetime.now)
    prepared_by = models.CharField(max_length=50, null=True, blank=True)
    noted_by = models.CharField(max_length=50, null=True, blank=True)
    admin_name = models.CharField(max_length=50, null=True, blank=True)
    approved_by = models.CharField(max_length=50, null=True, blank=True)
    contact_number = models.CharField(max_length=50, null=True, blank=True)

    date_updated = models.DateField(auto_now=True)
    date_created = models.DateField(auto_now_add=True)

    def __str__(self):
        return str(self.ir_id)

class Task(models.Model):
    task_id = models.AutoField(primary_key=True)
    manager = models.ForeignKey(User, related_name='task', on_delete=models.CASCADE)
    body_no = models.ForeignKey(Car, related_name='task', on_delete=models.CASCADE)
    ir_no = models.OneToOneField(IR, null=True, blank=True, related_name='task', on_delete=models.CASCADE)
    check_list = models.ForeignKey("report.CheckList", null=True, blank=True, related_name='ck_task', on_delete=models.CASCADE)
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
