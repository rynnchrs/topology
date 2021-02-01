# todo/serializers.py
from rest_framework import serializers
from .models import Car, Contract, TPL, Insurance, UserInfo, Permissions
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    Gender_List=[
        ('M', 'Female'),
        ('F', 'Male')
    ]
    company = serializers.CharField(max_length=50)
    position = serializers.CharField(max_length=20)
    gender = serializers.CharField(max_length=2, source='get_gender_display')
    birthday = serializers.DateField(input_formats=None)
    phone = serializers.IntegerField(max_value=None, min_value=None)
    address = serializers.CharField(max_length=100)
    class Meta:
        model = User
        fields = ['username','email','first_name','last_name','password','password2','company','position','gender','birthday','phone','address']
        extra_kwargs = {'password': {'write_only': True}}
    def save(self):
        user = User(
                username=self.validated_data['username'],
                email=self.validated_data['email'],
                first_name=self.validated_data['first_name'],
                last_name=self.validated_data['last_name']

            )
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({'password': 'Passwords must match.'})
        
        user.set_password(password)
        user.save()
        info = UserInfo.objects.create(
            user = User.objects.get(username=user.username),
            company = self.initial_data['company'],
            position = self.initial_data['position'],
            gender = self.initial_data['gender'],
            birthday = self.initial_data['birthday'],
            phone = self.initial_data['phone'],
            address = self.initial_data['address'],
            )
        info.save()  
        return user
        
class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ['car_id', 'slug', 'vin_no', 'body_no', 'cs_no', 'plate_no', 'brand', 'release_year',
                  'make', 'series', 'body_type', 'color', 'dealer', 'dealer_phone', 'dealer_email',
                  'po_no', 'po_date', 'body_builder', 'fabricator', 'sale_price', 'vat_price', 'chassis_no',
                  'engine_no', 'battery_no', 'fuel_type', 'transmission', 'denomination', 'piston', 'cylinder',
                  'procuring_entity', 'capacity', 'gross_weight', 'net_weight', 'shipping_weight', 'net_capacity',
                  'lto_cr', 'cr_date', 'or_no', 'or_date', 'top_load', 'field_office', 'or_cr', 'permanent_loc',
                  'current_loc', 'vtf', 'permanent_status', 'delivery_location', 'deliver_date', 'si_no',
                  'dr_no', 'dr_codes', 'plate_date', 'decals_date', 'modified', 'ewd_date', 'tools_date',
                  'userManual_date', 'warrantyBook_date', 'unitKey_date', 'bodyKey_date', 'cigarettePlug_date',
                  'keychain_date', 'fan_date', 'remarks', 'operational', 'status', 'date_updated', 'date_created']
        lookup_field = 'slug'


class ContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contract
        fields = ['contract_id','car', 'slug','client_name', 'contract_no', 'start_date', 'end_date', 'bid_no',
                  'bid_name', 'bid_date', 'cost', 'date_updated', 'date_created']
        lookup_field = 'slug'


class TPLSerializer(serializers.ModelSerializer):
    class Meta:
        model = TPL
        fields = ['tpl_id', 'car', 'slug', 'insurance_name', 'telephone', 'email', 'po_no', 'date_issued', 'start_date',
                  'end_date', 'cost', 'date_updated', 'date_created']
        lookup_field = 'slug'


class InsuranceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Insurance
        fields = ['insurance_id', 'car', 'slug', 'company', 'telephone', 'email', 'po_no', 'date_issued', 'start_date',
                  'end_date', 'cost', 'insurance_no','date_updated', 'date_created']
        lookup_field = 'slug'

