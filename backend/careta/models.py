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
    company = models.CharField(max_length=50)
    position = models.CharField(max_length=20)
    gender = models.CharField(max_length=1, choices=Gender_List)
    birthday = models.DateField(auto_now=False, auto_now_add=False)
    phone = PhoneField(blank=True, help_text='Contact phone number')
    address = models.CharField(max_length=100)
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
    body_no = models.CharField(unique=True, max_length=30)
    cs_no = models.CharField(unique=True, max_length=30)
    plate_no = models.CharField(unique=True, max_length=30)

    Brand_List=[
        ('M', 'Mitsubishi'),
        ('K', 'Kia')
    ]

    brand = models.CharField(max_length=2, choices=Brand_List, default="M")
    release_year = models.IntegerField(default=datetime.date.today().year)
    make = models.CharField(max_length=30)
    series = models.CharField(max_length=30)
    body_type = models.CharField(max_length=30)
    color = models.CharField(max_length=30)

    Dealer_List = [
        ('DM', 'Diamond Motor Corporation'),
        ('SA', 'Sample Corporation')
    ]
    dealer = models.CharField(max_length=2, choices=Dealer_List, default="DM")
    dealer_phone = PhoneField(blank=True, help_text='Contact phone number')
    dealer_email = models.EmailField(max_length=60)
    po_no = models.CharField(max_length=100)
    po_date = models.DateField(auto_now=False, auto_now_add=False)
    body_builder = models.CharField(max_length=50)
    fabricator = models.CharField(max_length=50)
    sale_price = models.IntegerField(default=0)
    vat_price = models.IntegerField(default=0)
    chassis_no = models.CharField(max_length=100)
    engine_no = models.CharField(max_length=50)
    battery_no = models.CharField(max_length=50)

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
    denomination = models.CharField(max_length=30)
    piston = models.IntegerField(default=0)
    cylinder = models.IntegerField(default=0)
    procuring_entity = models.CharField(max_length=50)
    capacity = models.IntegerField(default=0)
    gross_weight = models.IntegerField(default=0)
    net_weight = models.IntegerField(default=0)
    shipping_weight = models.IntegerField(default=0)
    net_capacity = models.IntegerField(default=0)
    lto_cr = models.IntegerField(default=0)
    cr_date = models.DateField(auto_now=False, auto_now_add=False)
    or_no = models.IntegerField(default=0)
    or_date = models.DateField(auto_now=False, auto_now_add=False)
    top_load = models.BooleanField(default=False)
    field_office = models.CharField(max_length=50)
    or_cr = models.DateField(auto_now=False, auto_now_add=False)
    permanent_loc = models.CharField(max_length=30)
    current_loc = models.CharField(max_length=30)
    vtf = models.BooleanField(default=False)
    permanent_status = models.BooleanField(default=False)
    delivery_location = models.CharField(max_length=50)
    deliver_date = models.DateField(auto_now=False, auto_now_add=False)
    si_no = models.IntegerField(default=0)
    dr_no = models.CharField(max_length=50)
    dr_codes = models.CharField(max_length=50)
    plate_date = models.DateField(auto_now=False, auto_now_add=False)
    decals_date = models.DateField(auto_now=False, auto_now_add=False)
    modified = models.BooleanField(default=False)
    ewd_date = models.DateField(auto_now=False, auto_now_add=False)
    tools_date = models.DateField(auto_now=False, auto_now_add=False)
    userManual_date = models.DateField(auto_now=False, auto_now_add=False)
    warrantyBook_date = models.DateField(auto_now=False, auto_now_add=False)
    unitKey_date = models.DateField(auto_now=False, auto_now_add=False)
    bodyKey_date = models.DateField(auto_now=False, auto_now_add=False)
    cigarettePlug_date = models.DateField(auto_now=False, auto_now_add=False)
    keychain_date = models.DateField(auto_now=False, auto_now_add=False)
    fan_date = models.DateField(auto_now=False, auto_now_add=False)
    remarks = models.TextField(max_length=200)
    operational = models.BooleanField(default=False)
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
    client_name = models.CharField(max_length=100)
    contract_no = models.CharField(max_length=50)
    start_date = models.DateField(auto_now=False, auto_now_add=False)
    end_date = models.DateField(auto_now=False, auto_now_add=False)
    bid_no = models.CharField(max_length=50)
    bid_name = models.CharField(max_length=50)
    bid_date = models.DateField(auto_now=False, auto_now_add=False)
    cost = models.IntegerField(default=0)
    date_updated = models.DateField(auto_now=True)
    date_created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.client_name


class TPL(models.Model):
    tpl_id = models.AutoField(primary_key=True)
    car = models.ForeignKey(Car, related_name='tpl', on_delete=models.CASCADE)
    slug = models.CharField(max_length=30)
    insurance_name = models.CharField(max_length=50)
    telephone = PhoneField(blank=True, help_text='Contact phone number')
    email = models.EmailField(max_length=60)
    po_no = models.CharField(max_length=50)
    date_issued = models.DateField(auto_now=False, auto_now_add=False)
    start_date = models.DateField(auto_now=False, auto_now_add=False)
    end_date = models.DateField(auto_now=False, auto_now_add=False)
    cost = models.IntegerField(default=0)
    date_updated = models.DateField(auto_now=True)
    date_created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.insurance_name


class Insurance(models.Model):
    insurance_id = models.AutoField(primary_key=True)
    car = models.ForeignKey(Car, related_name='insurance', on_delete=models.CASCADE)
    slug = models.CharField(max_length=30)
    company = models.CharField(max_length=100)
    telephone = PhoneField(blank=True, help_text='Contact phone number')
    email = models.EmailField(max_length=50)
    po_no = models.CharField(max_length=30)
    date_issued = models.DateField(auto_now=False, auto_now_add=False)
    start_date = models.DateField(auto_now=False, auto_now_add=False)
    end_date = models.DateField(auto_now=False, auto_now_add=False)
    cost = models.IntegerField(default=0)
    insurance_no = models.IntegerField(default=1)
    date_updated = models.DateField(auto_now=True)
    date_created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.company


class Report(models.Model):
    report_id = models.AutoField(primary_key=True)
    car =  models.ForeignKey(Car, related_name='report', on_delete=models.CASCADE)
    body_no = models.CharField(unique=True, max_length=30)
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
    breake_lights = models.BooleanField(default=False)
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


class ReportImage(models.Model):
    report = models.ForeignKey(Report, default=None, on_delete=models.CASCADE, related_name='images')
    images = models.ImageField(upload_to = 'images/')

    def __str__(self):
        return self.report.car.vin_no
