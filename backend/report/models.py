import datetime

from django.db.models.fields import CharField

from car.models import Car
from django.contrib.auth.models import User
from django.db import models
from multiselectfield import MultiSelectField
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
    contact_no = models.CharField(max_length=12, null=True, blank=True)
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
        return str(self.repair_id)
        
    @property
    def total_parts_cost(self):  # total cost of particular
        repair_list = Cost.objects.filter(ro_no=self.repair_id,cost_type="P")
        total = 0
        for cost in repair_list:
            total += cost.total_cost
        return total
    
    @property
    def total_labor_cost(self): # total cost of labor
        repair_list = Cost.objects.filter(ro_no=self.repair_id, cost_type="L")
        total = 0
        for cost in repair_list:
            total += cost.total_cost
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
    particulars = models.CharField(max_length=50, null=True, blank=True)
    cost = models.IntegerField(default=0)
    quantity = models.IntegerField(default=0)
    date_updated = models.DateField(auto_now=True)
    date_created = models.DateField(auto_now_add=True)

    def __str__(self):
        return str(self.cost_id)

    @property
    def total_cost(self): # total cost of an item per quantity
        return self.cost * self.quantity


# class IR(models.Model):
#     ir_id = models.AutoField(primary_key=True)
#     req_name = models.ForeignKey(User, related_name='requestor', on_delete=models.CASCADE)
#     body_no = models.ForeignKey(Car, related_name='ir', on_delete=models.CASCADE)
#     project_name = models.CharField(max_length=30, null=True, blank=True)
#     sub_project = models.CharField(max_length=30, null=True, blank=True)
#     region = models.CharField(max_length=30, null=True, blank=True)
#     exact_loc = models.CharField(max_length=70, null=True, blank=True)
#     vehicle_supp = models.CharField(max_length=50, null=True, blank=True)
#     odometer = models.IntegerField(default=0, null=True, blank=True)
#     Repair_List = [
#         ('me', 'Mehcanical'),
#         ('el', 'Electrical'),
#         ('ba', 'Battery'),
#         ('ti', 'Tires'),
#         ('pm', 'PMS'),
#         ('ac', 'Accident'),
#         ('ot', 'Others'),
#     ]
#     repair_type = MultiSelectField(max_length=2, choices=Repair_List, null=True, blank=True)
#     damaged_parts = models.TextField(max_length=200, null=True, blank=True)
#     incedent_loc = models.CharField(max_length=20, null=True, blank=True)
#     problem_obs = models.TextField(max_length=200, null=True, blank=True)
#     recommendation = models.TextField(max_length=200, null=True, blank=True)
#     date_time = models.DateTimeField(default=datetime.datetime.now())
#     prepared_by = models.ForeignKey(User, related_name='prepared_by', on_delete=models.CASCADE)
#     noted_by = models.ForeignKey(User, related_name='noted_by', on_delete=models.CASCADE)
#     admin_name = models.ForeignKey(User, related_name='admin', on_delete=models.CASCADE)
#     approved_by = models.ForeignKey(User, related_name='approved_by', on_delete=models.CASCADE)
#     contact_number = models.CharField(max_length=12, null=True, blank=True)


class CheckList(models.Model):
    check_list_id = models.AutoField(primary_key=True)
    email = models.ForeignKey(User, related_name='checklist', on_delete=models.CASCADE)
    schedule_date = models.DateField(default=datetime.date.today)
    body_no = models.ForeignKey(Car, related_name='checklist', on_delete=models.CASCADE)
    odometer = models.IntegerField(default=0, null=True, blank=True)
    Job_List = [
        ('in', 'Inspection'),
        ('re', 'Repair'),
        ('pm', 'PMS'),
    ]
    job_desc = models.IntegerChoices(max_length=2, choices=Job_List, defualt='pm')
    pair_ewd = models.BooleanField(default=False)
    Color_List = [
        ('yo', 'Yellow only'),
        ('ro', 'Red only'),
        ('bo', 'both'),
    ]
    color_ewd = models.IntegerChoices(max_length=2, choices=Color_List, defualt='bo')
    body_no_ewd = models.BooleanField(default=False)
    body_no_fl_tire = models.BooleanField(default=False)
    body_no_fr_tire = models.BooleanField(default=False)
    body_no_rl_tire = models.BooleanField(default=False)
    body_no_rr_tire = models.BooleanField(default=False)
    spare_tire = models.BooleanField(default=False)
    body_no_batt = models.BooleanField(default=False)
    vehicle_wt = models.BooleanField(default=False)
    remarks = models.TextField(max_length=200, null=True, blank=True)
    Repair_List = [
        ('me', 'Mehcanical'),
        ('el', 'Electrical'),
        ('ba', 'Battery'),
        ('ti', 'Tires'),
        ('pm', 'PMS'),
        ('ac', 'Accident'),
        ('ot', 'Others'),
    ]
    replaced = MultiSelectField(max_length=2, choices=Repair_List, null=True, blank=True)
