import datetime
from datetime import date

from django.contrib.auth.models import User  # authenticate User
from django.db import models
from phone_field import PhoneField

def upload_path(instance, filename):
    ext = filename.split('.')[-1]
    path = str(instance.user.username)
    filename = '{}.{}'.format(instance.full_name, ext)
    return '/'.join(['careta_users/',path,filename])

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
    phone = PhoneField(blank=True, help_text='Contact phone number')
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
    can_show_all_inspection_reports = models.BooleanField(default=False)

    can_view_repair_reports = models.BooleanField(default=False)
    can_add_repair_reports = models.BooleanField(default=False)
    can_edit_repair_reports = models.BooleanField(default=False)
    can_delete_repair_reports = models.BooleanField(default=False)

    can_approved_task = models.BooleanField(default=False)
    can_view_task = models.BooleanField(default=False)
    can_add_task = models.BooleanField(default=False)
    can_edit_task = models.BooleanField(default=False)
    can_delete_task = models.BooleanField(default=False)

    can_view_ir = models.BooleanField(default=False)
    can_add_ir = models.BooleanField(default=False)
    can_edit_ir = models.BooleanField(default=False)
    can_delete_ir = models.BooleanField(default=False)

    can_view_checklist = models.BooleanField(default=False)
    can_add_checklist = models.BooleanField(default=False)
    can_edit_checklist = models.BooleanField(default=False)
    can_delete_checklist = models.BooleanField(default=False)
    
    can_view_dashboard = models.BooleanField(default=False)

    date_created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.user.username


class DashboardPermission(models.Model):         # permission Model
    user = models.OneToOneField(User, related_name='dashboard', on_delete=models.CASCADE)
    slug = models.CharField(max_length=30)

    can_view_recieved_items = models.BooleanField(default=False)
    can_view_operational_status = models.BooleanField(default=False)
    can_view_expiring_cars = models.BooleanField(default=False)
    can_view_expiry_table = models.BooleanField(default=False)
    can_view_driver_inspection = models.BooleanField(default=False)
    can_view_task = models.BooleanField(default=False)
    can_view_ir = models.BooleanField(default=False)
    
    date_created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.user.username