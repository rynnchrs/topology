from django.db import models
import datetime
from django.db.models.deletion import CASCADE # add this
from django.db.models.fields import AutoField, BooleanField, CharField, DateField, DateTimeField
from phone_field import PhoneField
# Create your models here.
# add this
from django.contrib.auth.models import User # authenticate User


class UserInfo(models.Model):  # User Info Model
    user = models.OneToOneField(User, on_delete=CASCADE, related_name='user_info')
    slug = models.CharField(max_length=30)
    Gender_List=[
        ('M', 'Male'),
        ('F', 'Female'),
    ]
    company = models.CharField(max_length=50, null = True)
    position = models.CharField(max_length=20, null = True)
    gender = models.CharField(max_length=1, choices=Gender_List)
    birthday = models.DateField(auto_now=False, auto_now_add=False)
    phone = PhoneField(blank=True, help_text='Contact phone number')
    address = models.CharField(max_length=100, null = True)
    date_created = DateField(auto_now_add=True)

    def __str__(self):
        return self.user.username


class Permission(models.Model):         # permission Model
    user = models.OneToOneField(User, on_delete=CASCADE)
    slug = models.CharField(max_length=30)

    can_view_users = BooleanField(default=False)
    can_add_users = BooleanField(default=False)
    can_edit_users = BooleanField(default=False)
    can_delete_users = BooleanField(default=False)

    can_view_inventory = BooleanField(default=False)
    can_add_inventory = BooleanField(default=False)
    can_edit_inventory = BooleanField(default=False)
    can_delete_inventory = BooleanField(default=False)

    can_view_inspection_reports = BooleanField(default=False)
    can_add_inspection_reports = BooleanField(default=False)
    can_edit_inspection_reports = BooleanField(default=False)
    can_delete_inspection_reports = BooleanField(default=False)

    can_view_maintenance_reports = BooleanField(default=False)
    can_add_maintenance_reports = BooleanField(default=False)
    can_edit_maintenance_reports = BooleanField(default=False)
    can_delete_maintenance_reports = BooleanField(default=False)

    can_view_repair_reports = BooleanField(default=False)
    can_add_repair_reports = BooleanField(default=False)
    can_edit_repair_reports = BooleanField(default=False)
    can_delete_repair_reports = BooleanField(default=False)

    can_view_task = BooleanField(default=False)
    can_add_task = BooleanField(default=False)
    can_edit_task = BooleanField(default=False)
    can_delete_task = BooleanField(default=False)

    date_created = DateField(auto_now_add=True)

    def __str__(self):
        return self.user.username


class Car(models.Model):
    car_id = models.AutoField(primary_key=True)
    slug = models.CharField(max_length=30)
    vin_no = models.CharField(unique=True, max_length=30)
    body_no = models.CharField(unique=True, max_length=30, null=True, blank=True)
    cs_no = models.CharField(unique=True, max_length=30, null=True, blank=True)
    plate_no = models.CharField(max_length=30, null=True, blank=True)

    Brand_List=[
        ('M', 'Mitsubishi'),
        ('S', 'Suzuki'),
        ('F', 'Foton'),
    ]

    brand = models.CharField(max_length=2, choices=Brand_List, default="M")
    release_year = models.IntegerField(default = 2020, null=True, blank=True)
    make = models.CharField(max_length=30, null=True, blank=True)
    series = models.CharField(max_length=30, null=True, blank=True)
    body_type = models.CharField(max_length=30, null=True, blank=True)
    color = models.CharField(max_length=30, null=True, blank=True)

    Dealer_List = [
        ('DM', 'Diamond Motor Corporation'),
        ('GC', 'Grand Canyon Multi Holdings, INC.'),
        ('CAC', 'Cebu Autocentrale Corporation'),
        ('CA', 'Cherub Autodealer Inc.'),

    ]
    dealer = models.CharField(max_length=3, choices=Dealer_List, default="DM")
    dealer_phone = PhoneField(help_text='Contact phone number', null=True, blank=True)
    dealer_email = models.EmailField(max_length=60, null=True, blank=True)
    po_no = models.CharField(max_length=100, null=True, blank=True)
    po_date = models.CharField(max_length=20, null = True, blank = True)
    body_builder = models.CharField(max_length=50, null=True, blank=True)
    fabricator = models.CharField(max_length=50, null=True, blank=True)
    sale_price = models.IntegerField(default=0, null=True, blank=True)
    vat_price = models.IntegerField(default=0, null=True, blank=True)
    engine_no = models.CharField(max_length=50, null=True, blank=True)
    battery_no = models.CharField(max_length=50, null=True, blank=True)

    Fuel_List = [
        ('D', 'Diesel'),
        ('G', 'Gas')
    ]
    fuel_type = models.CharField(max_length=1, choices=Fuel_List, default="D")

    Transmission_List = [
        ('A', 'Automatic'),
        ('M', 'Manual')
    ]
    transmission = models.CharField(max_length=1, choices=Transmission_List, default="M")
    denomination = models.CharField(max_length=30, null=True, blank=True)
    piston = models.IntegerField(default=0, null=True, blank=True)
    cylinder = models.IntegerField(default=0, null=True, blank=True)
    procuring_entity = models.CharField(max_length=50, null=True, blank=True)
    capacity = models.IntegerField(default=0, null=True, blank=True)
    gross_weight = models.IntegerField(default=0, null=True, blank=True)
    net_weight = models.IntegerField(default=0, null=True, blank=True)
    shipping_weight = models.IntegerField(default=0, null=True, blank=True)
    net_capacity = models.IntegerField(default=0, null=True, blank=True)
    lto_cr = models.IntegerField(default=0, null=True, blank=True)
    cr_date = models.CharField(max_length=20, null = True, blank=True)
    or_no = models.IntegerField(default=0, null=True, blank=True)
    or_date = models.CharField(max_length=20, null = True, blank=True)
    top_load = models.BooleanField(default=False, null=True, blank=True)
    field_office = models.CharField(max_length=50, null=True, blank=True)
    or_cr = models.CharField(max_length=20, null = True, blank=True)
    permanent_loc = models.CharField(max_length=30, null=True, blank=True)
    current_loc = models.CharField(max_length=30, null=True, blank=True)
    vtf = models.BooleanField(default=False, null=True, blank=True)
    permanent_status = models.BooleanField(default=False, null=True, blank=True)
    delivery_location = models.CharField(max_length=50, null=True, blank=True)
    deliver_date = models.CharField(max_length=20, null = True, blank=True)
    si_no = models.IntegerField(default=0, null=True, blank=True)
    dr_no = models.CharField(max_length=50, null=True, blank=True)
    dr_codes = models.CharField(max_length=50, null=True, blank=True)
    plate_date = models.CharField(max_length=20, null = True, blank=True)
    decals_date = models.CharField(max_length=20, null = True, blank=True)
    modified = models.BooleanField(default=False, null=True, blank=True)
    ewd_date = models.CharField(max_length=20, null = True, blank=True)
    tools_date = models.CharField(max_length=20, null = True, blank=True)
    userManual_date = models.CharField(max_length=20, null = True, blank=True)
    warrantyBook_date = models.CharField(max_length=20, null = True, blank=True)
    unitKey_date = models.CharField(max_length=20, null = True, blank=True)
    bodyKey_date = models.CharField(max_length=20, null = True, blank=True)
    cigarettePlug_date = models.CharField(max_length=20, null = True, blank=True)
    keychain_date = models.CharField(max_length=20, null = True, blank=True)
    fan_date = models.CharField(max_length=20, null = True, blank=True)
    jack = models.CharField(max_length=20, null = True, blank=True)
    wrench = models.CharField(max_length=20, null = True, blank=True)
    fire_extinguisher = models.CharField(max_length=20, null = True, blank=True)
    remarks = models.TextField(max_length=200, null=True, blank=True)
    operational = models.BooleanField(default=False, null=True, blank=True)
    Status_List = [
        ('A', 'Active'),
        ('M', 'Maintenance'),
        ('R', 'Repair')
    ]
    status = models.CharField(max_length=1, choices=Status_List, default="A")
    date_updated = models.DateField(auto_now=True)
    date_created = models.DateField(auto_now_add=True)

    def _str_(self):
        return self.vin_no


class Contract(models.Model):
    contract_id = models.AutoField(primary_key=True)
    car = models.ForeignKey(Car, related_name='contract', on_delete=models.CASCADE)
    slug = models.CharField(max_length=30)
    client_name = models.CharField(max_length=100, null=True, blank=True)
    contract_no = models.CharField(max_length=50, null=True, blank=True)
    start_date = models.CharField(max_length=20, null = True, blank=True)
    end_date = models.CharField(max_length=20, null = True, blank=True)
    bid_no = models.CharField(max_length=50, null=True, blank=True)
    bid_name = models.CharField(max_length=50, null=True, blank=True)
    bid_date = models.CharField(max_length=20, null = True, blank=True)
    cost = models.IntegerField(default=0, null=True, blank=True)
    date_updated = models.DateField(auto_now=True, null=True, blank=True)
    date_created = models.DateField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return self.client_name


class TPL(models.Model):
    tpl_id = models.AutoField(primary_key=True)
    car = models.ForeignKey(Car, related_name='tpl', on_delete=models.CASCADE)
    slug = models.CharField(max_length=30)
    insurance_name = models.CharField(max_length=50, null=True, blank=True)
    telephone = PhoneField(help_text='Contact phone number', null=True, blank=True)
    email = models.EmailField(max_length=60, null=True, blank=True)
    po_no = models.CharField(max_length=50, null=True, blank=True)
    date_issued = models.CharField(max_length=20, null = True, blank=True)
    start_date = models.CharField(max_length=20, null = True, blank=True)
    end_date = models.CharField(max_length=20, null = True, blank=True)
    cost = models.IntegerField(default=0, null=True, blank=True)
    date_updated = models.DateField(auto_now=True)
    date_created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.insurance_name


class Insurance(models.Model):
    insurance_id = models.AutoField(primary_key=True)
    car = models.ForeignKey(Car, related_name='insurance', on_delete=models.CASCADE)
    slug = models.CharField(max_length=30)
    company = models.CharField(max_length=100, null=True, blank=True)
    telephone = PhoneField(help_text='Contact phone number', null=True, blank=True)
    email = models.EmailField(max_length=50, null=True, blank=True)
    po_no = models.CharField(max_length=30, null=True, blank=True)
    date_issued = models.CharField(max_length=20, null = True, blank=True)
    start_date = models.CharField(max_length=20, null = True, blank=True)
    end_date = models.CharField(max_length=20, null = True, blank=True)
    cost = models.IntegerField(default=0, null=True, blank=True)
    insurance_no = models.IntegerField(default=1, null=True, blank=True)
    date_updated = models.DateField(auto_now=True, null=True, blank=True)
    date_created = models.DateField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return self.company


class Report(models.Model):
    report_id = models.AutoField(primary_key=True)
    car =  models.ForeignKey(Car, related_name='report', on_delete=models.CASCADE)
    body_no = models.CharField(max_length=30)
    make = models.CharField(max_length=30)
    mileage = models.IntegerField(default=0)
    location = models.CharField(max_length=50)
    # Exterior
    cleanliness_exterior = models.BooleanField(default=False)
    condition_rust = models.BooleanField(default=False)
    decals = models.BooleanField(default=False)
    windows = models.BooleanField(default=False)
    rear_door = models.BooleanField(default=False)
    mirror = models.BooleanField(default=False)
    roof_rack = models.BooleanField(default=False)
    rear_step = models.BooleanField(default=False)
    # Interior
    seats = models.BooleanField(default=False)
    seat_belts = models.BooleanField(default=False)
    general_condition = models.BooleanField(default=False)
    vehicle_documents = models.BooleanField(default=False)
    # Electrics
    main_beam = models.BooleanField(default=False)
    dipped_beam = models.BooleanField(default=False)
    side_lights = models.BooleanField(default=False)
    tail_lights = models.BooleanField(default=False)
    indicators = models.BooleanField(default=False)
    break_lights = models.BooleanField(default=False)
    reverse_lights = models.BooleanField(default=False)
    hazard_light = models.BooleanField(default=False)
    rear_fog_lights = models.BooleanField(default=False)
    interior_lights = models.BooleanField(default=False)
    screen_washer = models.BooleanField(default=False)
    wiper_blades = models.BooleanField(default=False)
    horn = models.BooleanField(default=False)
    radio = models.BooleanField(default=False)
    front_fog_lights = models.BooleanField(default=False)
    air_conditioning = models.BooleanField(default=False)
    # Engine Bay
    cleanliness_engine_bay = models.BooleanField(default=False)
    washer_fluid = models.BooleanField(default=False)
    coolant_level = models.BooleanField(default=False)
    brake_fluid_level = models.BooleanField(default=False)
    power_steering_fluid = models.BooleanField(default=False)
    Gas_List = [
        (1, 1),
        (2, 2),
        (3, 3),
        (4, 4)
    ]
    gas_level = models.IntegerField(choices=Gas_List)
    Oil_List = [
        (1, 1),
        (2, 2),
        (3, 3),
        (4, 4)
    ]
    oil_level = models.IntegerField(choices=Oil_List)
    # Wheels and Tyres
    tyres = models.BooleanField(default=False)
    front_visual = models.BooleanField(default=False)
    rear_visual = models.BooleanField(default=False)
    spare_visual = models.BooleanField(default=False)
    wheel_brace = models.BooleanField(default=False)
    jack = models.BooleanField(default=False)
    front_right_wheel = models.BooleanField(default=False)
    front_left_wheel = models.BooleanField(default=False)
    rear_right_wheel = models.BooleanField(default=False)
    rear_left_wheel = models.BooleanField(default=False)

    notes = models.TextField(null=True, blank=True)
    date_updated = models.DateField(auto_now=True)
    date_created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.car.vin_no


#class ReportImage(models.Model):
#    report = models.ForeignKey(Report, default=None, on_delete=models.CASCADE, related_name='images')
#    images = models.ImageField(upload_to = 'images/')

#    def __str__(self):
#        return self.report.car.vin_no
