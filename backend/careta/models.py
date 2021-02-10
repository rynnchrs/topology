from django.db import models
import datetime
from phone_field import PhoneField
# Create your models here.
# add this


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
