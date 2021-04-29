import datetime
from datetime import date

from car.models import Car
from django.contrib.auth.models import User  # authenticate User
from django.db import models
from phone_field import PhoneField


class UserInfo(models.Model):  # User Info Model
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_info')
    slug = models.CharField(max_length=30)
    Gender_List=[
        ('M', 'Male'),
        ('F', 'Female'),
    ]
    company = models.CharField(max_length=50, null=True, blank=True)
    position = models.CharField(max_length=20, null=True, blank=True)
    gender = models.CharField(max_length=1, choices=Gender_List, null=True)
    birthday = models.DateField(auto_now=False, auto_now_add=False, null=True)
    phone = PhoneField(unique=True, blank=True, help_text='Contact phone number')
    address = models.CharField(max_length=100, null=True, blank=True)
    date_created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.user.username
    
    @property
    def full_name(self):
        return "%s %s" % (self.user.first_name, self.user.last_name)


class Permission(models.Model):         # permission Model
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    slug = models.CharField(max_length=30)

    can_view_users = models.BooleanField(default=False)
    can_add_users = models.BooleanField(default=False)
    can_edit_users = models.BooleanField(default=False)
    can_delete_users = models.BooleanField(default=False)

    can_view_inventory = models.BooleanField(default=False)
    can_add_inventory = models.BooleanField(default=False)
    can_edit_inventory = models.BooleanField(default=False)
    can_delete_inventory = models.BooleanField(default=False)

    can_view_inspection_reports = models.BooleanField(default=False)
    can_add_inspection_reports = models.BooleanField(default=False)
    can_edit_inspection_reports = models.BooleanField(default=False)
    can_delete_inspection_reports = models.BooleanField(default=False)

    can_view_maintenance_reports = models.BooleanField(default=False)
    can_add_maintenance_reports = models.BooleanField(default=False)
    can_edit_maintenance_reports = models.BooleanField(default=False)
    can_delete_maintenance_reports = models.BooleanField(default=False)

    can_view_repair_reports = models.BooleanField(default=False)
    can_add_repair_reports = models.BooleanField(default=False)
    can_edit_repair_reports = models.BooleanField(default=False)
    can_delete_repair_reports = models.BooleanField(default=False)

    can_view_task = models.BooleanField(default=False)
    can_add_task = models.BooleanField(default=False)
    can_edit_task = models.BooleanField(default=False)
    can_delete_task = models.BooleanField(default=False)

    date_created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.user.username


class JobOrder(models.Model):
    job_id = models.AutoField(primary_key=True)
    job_no = models.IntegerField(default=0)
    type = models.BooleanField(default=True)

    def __str__(self):
        return str(self.job_id)


class Task(models.Model):
    task_id = models.AutoField(primary_key=True)
    job_order = models.OneToOneField(JobOrder, related_name='task', on_delete=models.CASCADE)
    body_no = models.ForeignKey(Car, related_name='task', on_delete=models.CASCADE, default="")

    def __str__(self):
        return str(self.task_id)


class Fieldman(models.Model):
    fieldman_id = models.AutoField(primary_key=True)
    task = models.ForeignKey(Task, related_name='fieldman', on_delete=models.CASCADE)
    field_man = models.ForeignKey(User, related_name='fieldman', on_delete=models.CASCADE)

    def __str__(self):
        return str(self.fieldman_id)
