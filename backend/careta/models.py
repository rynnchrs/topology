import datetime
from datetime import date

# Create your models here.
# add this
from django.contrib.auth.models import User  # authenticate User
from django.db import models
from django.db.models import fields
from django.db.models.deletion import CASCADE  # add this
from django.db.models.fields import (AutoField, BooleanField, CharField,
                                     DateField, DateTimeField)
from django.db.models.fields.related import ForeignKey
from phone_field import PhoneField


class UserInfo(models.Model):  # User Info Model
    user = models.OneToOneField(User, on_delete=CASCADE, related_name='user_info')
    slug = models.CharField(max_length=30)
    Gender_List=[
        ('M', 'Male'),
        ('F', 'Female'),
    ]
    company = models.CharField(max_length=50, null=True, blank=True)
    position = models.CharField(max_length=20, null=True, blank=True)
    gender = models.CharField(max_length=1, choices=Gender_List, null=True)
    birthday = models.DateField(auto_now=False, auto_now_add=False, null=True)
    phone = PhoneField(blank=True, help_text='Contact phone number')
    address = models.CharField(max_length=100, null=True, blank=True)
    date_created = DateField(auto_now_add=True)

    def __str__(self):
        return self.user.username
    
    @property
    def full_name(self):
        return "%s %s" % (self.user.first_name, self.user.last_name)


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
    plate_no = models.CharField(unique=True, max_length=30, null=True, blank=True)

    Brand_List=[
        ('M', 'Mitsubishi'),
        ('S', 'Suzuki'),
        ('F', 'Foton')
    ]

    brand = models.CharField(max_length=2, choices=Brand_List, default="M")
    release_year = models.IntegerField(default=datetime.date.today().year, null=True, blank=True)
    Make_List=[
        ('L30', 'L300 Exceed 2.5D MT'),
        ('SUV', 'Super Carry UV'),
        ('G15', 'Gratour midi truck 1.5L'),
        ('G12', 'Gratour midi truck 1.2L')
    ]
    make = models.CharField(max_length=3, choices=Make_List, default="L30")
    Series_List=[
        ('L3', 'L300 Exceed C/C'),
        ('SC', 'Suzuki CAB CHAS'),
        ('GR', 'Gratour midi')
    ]
    series = models.CharField(max_length=2, choices=Series_List, default="L3")
    body_type = models.CharField(max_length=30, null=True, blank=True)
    color = models.CharField(max_length=30, null=True, blank=True)

    Dealer_List = [
        ('DMC', 'Diamond Motor Corporation'),
        ('GCM', 'Grand Canyon Multi Holdings, INC.'),
        ('CAC', 'Cebu Autocentrale Corporation'),
        ('CAI', 'Cherub Autodealer Inc.')
    ]
    dealer = models.CharField(max_length=3, choices=Dealer_List, default="DMC")
    dealer_phone = PhoneField(help_text='Contact phone number', null=True, blank=True)
    dealer_email = models.EmailField(max_length=60, null=True, blank=True)
    po_no = models.CharField(max_length=100, null=True, blank=True)
    po_date = models.CharField(max_length=20, null=True, blank=True)
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
    lto_cr = models.CharField(max_length=30, null=True, blank=True)
    cr_date = models.CharField(max_length=20, null=True, blank=True)
    or_no = models.IntegerField(default=0, null=True, blank=True)
    or_date = models.CharField(max_length=20, null=True, blank=True)
    top_load = models.BooleanField(default=False, null=True, blank=True)
    field_office = models.CharField(max_length=50, null=True, blank=True)
    or_cr = models.CharField(max_length=20, null=True, blank=True)
    permanent_loc = models.CharField(max_length=30, null=True, blank=True)
    current_loc = models.CharField(max_length=30, null=True, blank=True)
    vtf = models.BooleanField(default=False, null=True, blank=True)
    permanent_status = models.BooleanField(default=False, null=True, blank=True)
    delivery_location = models.CharField(max_length=50, null=True, blank=True)
    deliver_date = models.CharField(max_length=20, null=True, blank=True)
    si_no = models.IntegerField(default=0, null=True, blank=True)
    dr_no = models.CharField(max_length=50, null=True, blank=True)
    dr_codes = models.CharField(max_length=50, null=True, blank=True)
    plate_date = models.CharField(max_length=20, null=True, blank=True)
    decals_date = models.CharField(max_length=20, null=True, blank=True)
    modified = models.BooleanField(default=False, null=True, blank=True)
    ewd_date = models.CharField(max_length=20, null=True, blank=True)
    tools_date = models.CharField(max_length=20, null=True, blank=True)
    userManual_date = models.CharField(max_length=20, null=True, blank=True)
    warrantyBook_date = models.CharField(max_length=20, null=True, blank=True)
    unitKey_date = models.CharField(max_length=20, null=True, blank=True)
    bodyKey_date = models.CharField(max_length=20, null=True, blank=True)
    cigarettePlug_date = models.CharField(max_length=20, null=True, blank=True)
    keychain_date = models.CharField(max_length=20, null=True, blank=True)
    fan_date = models.CharField(max_length=20, null=True, blank=True)
    jack = models.CharField(max_length=20, null=True, blank=True)
    wrench = models.CharField(max_length=20, null=True, blank=True)
    fire_extinguisher = models.CharField(max_length=20, null=True, blank=True)
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

    @property
    def get_total(self):
        return Car.objects.all().count()

    #with date
    @property
    def plate_with_date(self):
        return Car.objects.all().filter(plate_date__lte = date.today().strftime("%Y-%m-%d")).count()
    @property
    def decals_with_date(self):
        return Car.objects.all().filter(decals_date__lte = date.today().strftime("%Y-%m-%d")).count()
    @property
    def ewd_date_with_date(self):
        return Car.objects.all().filter(ewd_date__lte = date.today().strftime("%Y-%m-%d")).count()
    @property
    def fan_date_with_date(self):
        return Car.objects.all().filter(fan_date__lte = date.today().strftime("%Y-%m-%d")).count()
    @property
    def tools_with_date(self):
        return Car.objects.all().filter(tools_date__lte = date.today().strftime("%Y-%m-%d")).count()
    @property
    def userManual_with_date(self):
        return Car.objects.all().filter(userManual_date__lte = date.today().strftime("%Y-%m-%d")).count()
    @property
    def warrantyBook_with_date(self):
        return Car.objects.all().filter(warrantyBook_date__lte = date.today().strftime("%Y-%m-%d")).count()
    @property
    def unitKey_with_date(self):
        return Car.objects.all().filter(unitKey_date__lte = date.today().strftime("%Y-%m-%d")).count()
    @property
    def bodyKey_with_date(self):
        return Car.objects.all().filter(bodyKey_date__lte = date.today().strftime("%Y-%m-%d")).count()
    @property
    def cigarettePlug_with_date(self):
        return Car.objects.all().filter(cigarettePlug_date__lte = date.today().strftime("%Y-%m-%d")).count()

    # with NRC
    @property
    def plate_with_nrc(self):
        return Car.objects.all().filter(plate_date='NRC').count()
    @property
    def decals_with_nrc(self):
        return Car.objects.all().filter(decals_date='NRC').count()
    @property
    def ewd_date_with_nrc(self):
        return Car.objects.all().filter(ewd_date='NRC').count()
    @property
    def fan_date_with_nrc(self):
        return Car.objects.all().filter(fan_date='NRC').count()
    @property
    def tools_with_nrc(self):
        return Car.objects.all().filter(tools_date='NRC').count()
    @property
    def userManual_with_nrc(self):
        return Car.objects.all().filter(userManual_date='NRC').count()
    @property
    def warrantyBook_with_nrc(self):
        return Car.objects.all().filter(warrantyBook_date='NRC').count()
    @property
    def unitKey_with_nrc(self):
        return Car.objects.all().filter(unitKey_date='NRC').count()
    @property
    def bodyKey_with_nrc(self):
        return Car.objects.all().filter(bodyKey_date='NRC').count()
    @property
    def tools_with_nrc(self):
        return Car.objects.all().filter(tools_date='NRC').count()
    @property
    def cigarettePlug_with_nrc(self):
        return Car.objects.all().filter(cigarettePlug_date='NRC').count()

    # with NYR
    @property
    def plate_with_nyr(self):
        return Car.objects.all().filter(plate_date='NYR').count()
    @property
    def decals_with_nyr(self):
        return Car.objects.all().filter(decals_date='NYR').count()
    @property
    def ewd_date_with_nyr(self):
        return Car.objects.all().filter(ewd_date='NYR').count()
    @property
    def fan_date_with_nyr(self):
        return Car.objects.all().filter(fan_date='NYR').count()
    @property
    def tools_with_nyr(self):
        return Car.objects.all().filter(tools_date='NYR').count()
    @property
    def userManual_with_nyr(self):
        return Car.objects.all().filter(userManual_date='NYR').count()
    @property
    def warrantyBook_with_nyr(self):
        return Car.objects.all().filter(warrantyBook_date='NYR').count()
    @property
    def unitKey_with_nyr(self):
        return Car.objects.all().filter(unitKey_date='NYR').count()
    @property
    def bodyKey_with_nyr(self):
        return Car.objects.all().filter(bodyKey_date='NYR').count()
    @property
    def cigarettePlug_with_nyr(self):
        return Car.objects.all().filter(cigarettePlug_date='NYR').count()

    # with NA
    @property
    def plate_with_na(self):
        return Car.objects.all().filter(plate_date='NA').count()
    @property
    def decals_with_na(self):
        return Car.objects.all().filter(decals_date='NA').count()
    @property
    def ewd_date_with_na(self):
        return Car.objects.all().filter(ewd_date='NA').count()
    @property
    def fan_date_with_na(self):
        return Car.objects.all().filter(fan_date='NA').count()
    @property
    def tools_with_na(self):
        return Car.objects.all().filter(tools_date='NA').count()
    @property
    def userManual_with_na(self):
        return Car.objects.all().filter(userManual_date='NA').count()
    @property
    def warrantyBook_with_na(self):
        return Car.objects.all().filter(warrantyBook_date='NA').count()
    @property
    def unitKey_with_na(self):
        return Car.objects.all().filter(unitKey_date='NA').count()
    @property
    def bodyKey_with_na(self):
        return Car.objects.all().filter(bodyKey_date='NA').count()
    @property
    def cigarettePlug_with_na(self):
        return Car.objects.all().filter(cigarettePlug_date='NA').count()

    # with DNR
    @property
    def plate_with_dnr(self):
        return Car.objects.all().filter(plate_date='DNR').count()
    @property
    def decals_with_dnr(self):
        return Car.objects.all().filter(decals_date='DNR').count()
    @property
    def fan_date_with_dnr(self):
        return Car.objects.all().filter(fan_date='DNR').count()
    @property
    def tools_with_dnr(self):
        return Car.objects.all().filter(tools_date='DNR').count()
    @property
    def ewd_date_with_dnr(self):
        return Car.objects.all().filter(ewd_date='DNR').count()
    @property
    def userManual_with_dnr(self):
        return Car.objects.all().filter(userManual_date='DNR').count()
    @property
    def warrantyBook_with_dnr(self):
        return Car.objects.all().filter(warrantyBook_date='DNR').count()
    @property
    def unitKey_with_dnr(self):
        return Car.objects.all().filter(unitKey_date='DNR').count()
    @property
    def bodyKey_with_dnr(self):
        return Car.objects.all().filter(bodyKey_date='DNR').count()
    @property
    def cigarettePlug_with_dnr(self):
        return Car.objects.all().filter(cigarettePlug_date='DNR').count()

        

class Contract(models.Model):
    contract_id = models.AutoField(primary_key=True)
    car = models.ForeignKey(Car, related_name='contract', on_delete=models.CASCADE)
    slug = models.CharField(max_length=30)
    client_name = models.CharField(max_length=100, null=True, blank=True)
    contract_no = models.CharField(max_length=50, null=True, blank=True)
    start_date = models.CharField(max_length=20, null=True, blank=True)
    end_date = models.CharField(max_length=20, null=True, blank=True)
    bid_no = models.CharField(max_length=50, null=True, blank=True)
    bid_name = models.CharField(max_length=50, null=True, blank=True)
    bid_date = models.CharField(max_length=20, null=True, blank=True)
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
    date_issued = models.CharField(max_length=20, null=True, blank=True)
    start_date = models.CharField(max_length=20, null=True, blank=True)
    end_date = models.CharField(max_length=20, null=True, blank=True)
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
    date_issued = models.CharField(max_length=20, null=True, blank=True)
    start_date = models.CharField(max_length=20, null=True, blank=True)
    end_date = models.CharField(max_length=20, null=True, blank=True)
    cost = models.IntegerField(default=0, null=True, blank=True)
    insurance_no = models.IntegerField(default=1, null=True, blank=True)
    date_updated = models.DateField(auto_now=True, null=True, blank=True)
    date_created = models.DateField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return self.company


class Inspection(models.Model):
    inspection_id = models.AutoField(primary_key=True)
    body_no =  models.ForeignKey(Car, related_name='inspection', on_delete=models.CASCADE, default=None)
    mileage = models.IntegerField(default=0)
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
    driver = models.ForeignKey(User, related_name='driver', on_delete=models.CASCADE)
    status = models.BooleanField(default=True)
    date_updated = models.DateField(auto_now=True)
    date_created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.body_no.body_no


class InspectiontImage(models.Model):
   report = models.ForeignKey(Inspection, default=None, on_delete=models.CASCADE, related_name='images')
   images = models.ImageField(upload_to = 'images/')


class Maintenance(models.Model): #Maintenance model
    maintenance_id = models.AutoField(primary_key=True)
    body_no = models.ForeignKey(Car, related_name='maintenance', on_delete=models.CASCADE)
    supplier_name = models.CharField(max_length=50)
    mileage = models.IntegerField(default=0, null=True, blank=True)
    Level_List = [
        (1, "CHECK AND OK"),
        (2, "MAY REQUIRE ATTENTION"),
        (3, "REQUIRES IMMEDIATE ATTENTION")
    ]
    #interior/exterior
    exterior_body = models.IntegerField(default=1, choices=Level_List)
    windshield = models.IntegerField(default=1, choices=Level_List)
    wipers = models.IntegerField(default=1, choices=Level_List)
    lights = models.IntegerField(default=1, choices=Level_List)
    interior_lights = models.IntegerField(default=1, choices=Level_List)
    ac_operation = models.IntegerField(default=1, choices=Level_List)
    heating = models.IntegerField(default=1, choices=Level_List)
    interior_other = models.CharField(max_length=30, null=True, blank=True)
    #underhood
    engine_oil = models.IntegerField(default=1, choices=Level_List)
    brake_fluid = models.IntegerField(default=1, choices=Level_List)
    power_stearing = models.IntegerField(default=1, choices=Level_List)
    washer = models.IntegerField(default=1, choices=Level_List)
    belts_hoses = models.IntegerField(default=1, choices=Level_List)
    coolant = models.IntegerField(default=1, choices=Level_List)
    air_filter = models.IntegerField(default=1, choices=Level_List)
    cabin_filter = models.IntegerField(default=1, choices=Level_List)
    fuel_filter = models.IntegerField(default=1, choices=Level_List)
    spark_plug = models.IntegerField(default=1, choices=Level_List)
    underhood_other = models.CharField(max_length=30, null=True, blank=True)
    battery_charge = models.IntegerField(default=1, choices=Level_List)
    battery_condition = models.IntegerField(default=1, choices=Level_List)
    cables = models.IntegerField(default=1, choices=Level_List)
    #under vehicle
    brakes = models.IntegerField(default=1, choices=Level_List)
    brake_lines = models.IntegerField(default=1, choices=Level_List)
    steering = models.IntegerField(default=1, choices=Level_List)
    shocks = models.IntegerField(default=1, choices=Level_List)
    driveline = models.IntegerField(default=1, choices=Level_List)
    exhaust = models.IntegerField(default=1, choices=Level_List)
    fuel_lines = models.IntegerField(default=1, choices=Level_List)
    under_vehicle_other = models.CharField(max_length=30, null=True, blank=True)
    #tires
    Tread_List = [
        (1, "7/32\" or greater"),
        (2, "3/32\" to 6/32\""),
        (3, "2/32\" or less")
    ]
    tread_depth = models.IntegerField(default=1, choices=Tread_List)
    tread_lf = models.IntegerField(default=1, choices=Level_List)
    tread_lr = models.IntegerField(default=1, choices=Level_List)
    tread_rf = models.IntegerField(default=1, choices=Level_List)
    tread_rr = models.IntegerField(default=1, choices=Level_List)
    wear_lf = models.IntegerField(default=1, choices=Level_List)
    wear_lr = models.IntegerField(default=1, choices=Level_List)
    wear_rf = models.IntegerField(default=1, choices=Level_List)
    wear_rr = models.IntegerField(default=1, choices=Level_List)
    tpms = models.BooleanField(default=False)
    air_lf = models.IntegerField(default=0, null=True, blank=True)
    air_lr = models.IntegerField(default=0, null=True, blank=True)
    air_rf = models.IntegerField(default=0, null=True, blank=True)
    air_rr = models.IntegerField(default=0, null=True, blank=True)
    alignment = models.BooleanField(default=False)
    balance = models.BooleanField(default=False)
    rotation = models.BooleanField(default=False)
    new_tire = models.BooleanField(default=False)
    repair_desc = models.TextField(null=True, blank=True)
    comments = models.TextField(null=True, blank=True)
    inspected_by = models.ForeignKey(User, related_name='inspect', on_delete=models.CASCADE)
    date = models.DateField()
    status = models.BooleanField(default=True)
    date_updated = models.DateField(auto_now=True)
    date_created = models.DateField(auto_now_add=True)

    def __str__(self):
        return str(self.maintenance_id)

class Repair(models.Model):
    repair_id = models.AutoField(primary_key=True)
    vin_no = models.ForeignKey(Car, related_name='repair', on_delete=models.CASCADE)
    ro_no = models.CharField(unique=True, max_length=10)
    current_status = models.CharField(max_length=30)
    incident_details = models.TextField(max_length=200, null=True, blank=True)
    vms = models.ForeignKey(User, related_name='vms', on_delete=models.CASCADE)
    dealer = models.CharField(max_length=30)
    schedule_date = models.DateField(auto_now=False, auto_now_add=False)
    perform_by = models.ForeignKey(User, related_name='actual', on_delete=models.CASCADE)
    perform_date = models.DateField(auto_now=False, auto_now_add=False)
    actual_findings = models.TextField(max_length=200, null=True, blank=True)
    actual_remarks = models.TextField(max_length=200, null=True, blank=True)
    repair_by = models.ForeignKey(User, related_name='repair', on_delete=models.CASCADE)
    repair_date = models.DateField(auto_now=False, auto_now_add=False)
    action_taken = models.TextField(max_length=200, null=True, blank=True)
    date_done = models.DateField(auto_now=False, auto_now_add=False)
    status_repair = models.CharField(max_length=20)
    remarks = models.TextField(max_length=200, null=True, blank=True)
    date_updated = models.DateField(auto_now=True)
    date_created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.ro_no
        
    @property
    def total_parts_cost(self):  # total cost of particular
        ro_no = Repair.objects.get(ro_no=self.ro_no)
        repair_list = Cost.objects.filter(ro_no=ro_no,cost_type="P")
        total = 0
        for cost in repair_list:
            total += cost.total_cost
        return total
    
    @property
    def total_labor_cost(self): # total cost of labor
        ro_no = Repair.objects.get(ro_no=self.ro_no)
        repair_list = Cost.objects.filter(ro_no=ro_no, cost_type="L")
        total = 0
        for cost in repair_list:
            total += cost.cost
        return total
    
    def total_estimate_cost(self): # total estimate
        return self.total_labor_cost + self.total_parts_cost


class Cost(models.Model):
    cost_id = models.AutoField(primary_key=True)
    ro_no = models.ForeignKey(Repair, related_name='cost', on_delete=models.CASCADE)
    Cost_List = [
        ('P', 'Parts'),
        ('L', 'Labor'),
    ]
    cost_type = models.CharField(max_length=1, choices=Cost_List, default="L")
    particulars = models.CharField(max_length=50)
    cost = models.IntegerField(default=0)
    quantity = models.IntegerField(default=0)
    date_updated = models.DateField(auto_now=True)
    date_created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.ro_no.ro_no

    @property
    def total_cost(self): # total cost of an item per quantity
        return self.cost * self.quantity


class Job(models.Model):
    job_id = models.AutoField(primary_key=True)
    slug = models.CharField(max_length=30)
    car = models.ForeignKey(Car, related_name='job', on_delete=models.CASCADE)
    manager = models.ForeignKey(User, related_name='job_manager', on_delete=models.CASCADE)
    fieldman = models.ForeignKey(User, related_name='job_fieldman', on_delete=models.CASCADE)
    job_desc = models.CharField(max_length=100, null=True, blank=True)
    job_remarks = models.CharField(max_length=300, null=True, blank=True)
    job_startdate = models.DateField(auto_now=False, auto_now_add=False, null=True)
    job_enddate = models.DateField(auto_now=False, auto_now_add=False, null=True)
    job_startdate_actual = models.DateField(auto_now=False, auto_now_add=False, null=True)
    job_enddate_actual = models.DateField(auto_now=False, auto_now_add=False, null=True)
    job_actual_days = models.IntegerField(default=0, null=True, blank=True)
    job_task_status_fm = models.CharField(max_length=30, null=True, blank=True)
    job_task_status_mn = models.CharField(max_length=30, null=True, blank=True)

    def __str__(self):
        return self.job_id

        
