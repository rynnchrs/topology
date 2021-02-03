# todo/serializers.py
from django.db.models import fields
from rest_framework import serializers
from .models import Car, Contract, TPL, Insurance, UserInfo, Permission # add this

from django.contrib.auth.models import User # add this
import django.contrib.auth.password_validation as validators    # add this

class UserInfoSerializer(serializers.ModelSerializer):  # add this
    
    class Meta:
        model = UserInfo
        fields = ['id','company','position','gender','birthday','phone','address']
        
        
class UserSerializer(serializers.ModelSerializer):  # add this
    user_info = UserInfoSerializer()
    class Meta:
        model = User
        fields = ['id','username','email','first_name','last_name','password','user_info']
        extra_kwargs = {
            'user_info': {'validators': []},
            'password': {'write_only': True}
        }
        lookup_field = 'username'
    def validate_password(self, data):      # add this
        validators.validate_password(password=data, user=User)
        return data

    def create(self, validated_data):       # add this
        user_data = validated_data.pop('user_info')
        password = validated_data['password']
        user = User.objects.create(**validated_data)
        user.set_password(password)
        UserInfo.objects.create(user=user, **user_data)
        user.save()
        return user
    
    def update(self, instance, validated_data):     # add this
        user_data = validated_data.pop("user_info")
        user_info = instance.user_info
        
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.password = validated_data.get('password', instance.password)
        instance.save()

        user_info.company = user_data.get('company', user_info.company)
        user_info.position = user_data.get('position', user_info.position)
        user_info.gender = user_data.get('gender', user_info.gender)
        user_info.birthday = user_data.get('birthday', user_info.birthday)
        user_info.phone = user_data.get('phone', user_info.phone)
        user_info.address = user_data.get('address', user_info.address)
        user_info.save()
        return instance

class PermissionSerializer(serializers.ModelSerializer):    # add this
    class Meta:
        model = Permission
        fields = ['id','user','slug','can_view_users','can_add_users','can_edit_users','can_delete_users',
                  'can_view_inventory','can_add_inventory','can_edit_inventory','can_delete_inventory','can_view_reports',
                  'can_add_reports','can_edit_reports','can_delete_reports','can_view_task','can_add_task','can_edit_task',
                  'can_delete_task']
        lookup_field = 'slug'

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

