import datetime
from careta.models import Car, JobOrder
from django.contrib.auth.models import User
from django.db import models

# Create your models here.

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
    gas_level = models.IntegerField(choices=Gas_List, default=1)
    Oil_List = [
        (1, 1),
        (2, 2),
        (3, 3),
        (4, 4)
    ]
    oil_level = models.IntegerField(choices=Oil_List, default=1)
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
    edited_by = models.ForeignKey(User, related_name='edited_by', on_delete=models.CASCADE, null=True)
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
    supplier_name = models.CharField(max_length=50, null=True, blank=True)
    mileage = models.IntegerField(default=0, null=True, blank=True)
    job_order = models.ForeignKey(JobOrder, related_name='maintenance', on_delete=models.CASCADE)
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
    date = models.DateField(default=datetime.date.today)
    date_updated = models.DateField(auto_now=True)
    date_created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.body_no.body_no


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
