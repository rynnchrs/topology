from django.db import models
import datetime
from django.db.models import fields
from django.db.models.deletion import CASCADE # add this
from django.db.models.fields import AutoField, BooleanField, CharField, DateField, DateTimeField
from phone_field import PhoneField
# Create your models here.
# add this
from django.contrib.auth.models import User # authenticate User
from datetime import date

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
        ('K', 'Kia')
    ]

    brand = models.CharField(max_length=2, choices=Brand_List, default="M")
    release_year = models.IntegerField(default=datetime.date.today().year, null=True, blank=True)
    make = models.CharField(max_length=30, null=True, blank=True)
    series = models.CharField(max_length=30, null=True, blank=True)
    body_type = models.CharField(max_length=30, null=True, blank=True)
    color = models.CharField(max_length=30, null=True, blank=True)

    Dealer_List = [
        ('DM', 'Diamond Motor Corporation'),
        ('SA', 'Sample Corporation')
    ]
    dealer = models.CharField(max_length=2, choices=Dealer_List, default="DM")
    dealer_phone = PhoneField(help_text='Contact phone number', null=True, blank=True)
    dealer_email = models.EmailField(max_length=60, null=True, blank=True)
    po_no = models.CharField(max_length=100, null=True, blank=True)
    po_date = models.CharField(max_length=20, null = True)
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
    cr_date = models.CharField(max_length=20, null = True)
    or_no = models.IntegerField(default=0, null=True, blank=True)
    or_date = models.CharField(max_length=20, null = True)
    top_load = models.BooleanField(default=False, null=True, blank=True)
    field_office = models.CharField(max_length=50, null=True, blank=True)
    or_cr = models.CharField(max_length=20, null = True)
    permanent_loc = models.CharField(max_length=30, null=True, blank=True)
    current_loc = models.CharField(max_length=30, null=True, blank=True)
    vtf = models.BooleanField(default=False, null=True, blank=True)
    permanent_status = models.BooleanField(default=False, null=True, blank=True)
    delivery_location = models.CharField(max_length=50, null=True, blank=True)
    deliver_date = models.CharField(max_length=20, null = True)
    si_no = models.IntegerField(default=0, null=True, blank=True)
    dr_no = models.CharField(max_length=50, null=True, blank=True)
    dr_codes = models.CharField(max_length=50, null=True, blank=True)
    plate_date = models.CharField(max_length=20, null = True)
    decals_date = models.CharField(max_length=20, null = True)
    modified = models.BooleanField(default=False, null=True, blank=True)
    ewd_date = models.CharField(max_length=20, null = True)
    tools_date = models.CharField(max_length=20, null = True)
    userManual_date = models.CharField(max_length=20, null = True)
    warrantyBook_date = models.CharField(max_length=20, null = True)
    unitKey_date = models.CharField(max_length=20, null = True)
    bodyKey_date = models.CharField(max_length=20, null = True)
    cigarettePlug_date = models.CharField(max_length=20, null = True)
    keychain_date = models.CharField(max_length=20, null = True)
    fan_date = models.CharField(max_length=20, null = True)
    jack = models.CharField(max_length=20, null = True)
    wrench = models.CharField(max_length=20, null = True)
    fire_extinguisher = models.CharField(max_length=20, null = True)
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
    start_date = models.CharField(max_length=20, null = True)
    end_date = models.CharField(max_length=20, null = True)
    bid_no = models.CharField(max_length=50, null=True, blank=True)
    bid_name = models.CharField(max_length=50, null=True, blank=True)
    bid_date = models.CharField(max_length=20, null = True)
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
    date_issued = models.CharField(max_length=20, null = True)
    start_date = models.CharField(max_length=20, null = True)
    end_date = models.CharField(max_length=20, null = True)
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
    date_issued = models.CharField(max_length=20, null = True)
    start_date = models.CharField(max_length=20, null = True)
    end_date = models.CharField(max_length=20, null = True)
    cost = models.IntegerField(default=0, null=True, blank=True)
    insurance_no = models.IntegerField(default=1, null=True, blank=True)
    date_updated = models.DateField(auto_now=True, null=True, blank=True)
    date_created = models.DateField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return self.company


class Inspection(models.Model):
    inspection_id = models.AutoField(primary_key=True)
    vin_no =  models.ForeignKey(Car, related_name='report', on_delete=models.CASCADE)
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
        return self.vin_no.vin_no


class InspectiontImage(models.Model):
   report = models.ForeignKey(Inspection, default=None, on_delete=models.CASCADE, related_name='images')
   images = models.ImageField(upload_to = 'images/')



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
