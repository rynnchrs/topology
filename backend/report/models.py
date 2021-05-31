import datetime

from car.models import Car
from django.contrib.auth.models import User
from django.db import models
from task.models import JobOrder

# Create your models here.

class Inspection(models.Model):
    inspection_id = models.AutoField(primary_key=True)
    body_no =  models.ForeignKey(Car, related_name='inspection', on_delete=models.CASCADE, default=None)
    mileage = models.IntegerField(default=0)
    gps = models.CharField(max_length=255, blank=True, null=True)
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
    # Engine Bay
    cleanliness_engine_bay = models.BooleanField(default=False)
    washer_fluid = models.BooleanField(default=False)
    coolant_level = models.BooleanField(default=False)
    brake_fluid_level = models.BooleanField(default=False)
    power_steering_fluid = models.BooleanField(default=False)
    liquid_leak = models.BooleanField(default=False)
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


class Repair(models.Model):
    repair_id = models.AutoField(primary_key=True)
    job_order = models.OneToOneField(JobOrder, related_name='repair', on_delete=models.CASCADE)
    
    ir_no = models.CharField(max_length=30, null=True, blank=True)
    incident_date = models.DateField(default=datetime.date.today)
    date_receive = models.DateField(default=datetime.date.today)
    site_poc = models.CharField(max_length=30, null=True, blank=True)  
    contact_no = models.IntegerField(default=0, null=True, blank=True)
    incident_details = models.TextField(max_length=200, null=True, blank=True)
    #actual findings    
    diagnosed_by = models.ForeignKey(User, related_name='diagnosed', on_delete=models.CASCADE)
    perform_date = models.DateField(default=datetime.date.today)
    actual_findings = models.TextField(max_length=200, null=True, blank=True)
    actual_remarks = models.TextField(max_length=200, null=True, blank=True)
    generated_by = models.ForeignKey(User, related_name='generated', on_delete=models.CASCADE)
    noted_by = models.ForeignKey(User, related_name='noted', on_delete=models.CASCADE, null=True, blank=True)
    #action taken
    repair_by = models.ForeignKey(User, related_name='repair', on_delete=models.CASCADE)
    repair_date = models.DateField(default=datetime.date.today)
    action_taken = models.TextField(max_length=200, null=True, blank=True)
    date_done = models.DateField(default=datetime.date.today)
    status_repair = models.CharField(max_length=20, null=True, blank=True)
    remarks = models.TextField(max_length=200, null=True, blank=True)

    date_updated = models.DateField(auto_now=True)
    date_created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.job_order
        
    @property
    def total_parts_cost(self):  # total cost of particular
        repair_list = Cost.objects.filter(ro_no=self.repair_id,cost_type="P")
        total = 0
        for cost in repair_list:
            total += cost.total_cost
        return total
    
    @property
    def total_labor_cost(self): # total cost of labor
        ro_no = Repair.objects.get(repair_id=self.repair_id)
        repair_list = Cost.objects.filter(ro_no=self.repair_id, cost_type="L")
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

    