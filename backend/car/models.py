import datetime
from datetime import date

from django.db import models
from phone_field import PhoneField


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
    cr_date = models.DateField(null=True, blank=True)
    or_no = models.CharField(max_length=50, null=True, blank=True)
    or_date = models.DateField(null=True, blank=True)
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
        return self.body_no

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
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    bid_no = models.CharField(max_length=50, null=True, blank=True)
    bid_name = models.CharField(max_length=50, null=True, blank=True)
    bid_date = models.DateField(null=True, blank=True)
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
    date_issued = models.DateField(null=True, blank=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
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
    reference_no = models.CharField(max_length=30, null=True, blank=True)
    date_issued = models.DateField(null=True, blank=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    cost = models.IntegerField(default=0, null=True, blank=True)
    insurance_no = models.IntegerField(default=1, null=True, blank=True)
    date_updated = models.DateField(auto_now=True, null=True, blank=True)
    date_created = models.DateField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return self.company

def upload_path(instance, filename):
    return '/'.join(['Car-PDF/',filename])

class PDF(models.Model):
    pdf_id = models.AutoField(primary_key=True)
    car = models.OneToOneField(Car, related_name='pdf', on_delete=models.PROTECT)
    pdf = models.FileField(upload_to=upload_path, null=True, blank=True)

    date_updated = models.DateField(auto_now=True, null=True, blank=True)
    date_created = models.DateField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return str(self.car.body_no)