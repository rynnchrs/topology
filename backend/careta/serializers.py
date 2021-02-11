# todo/serializers.py
from django.db.models import fields
from rest_framework import serializers
from .models import Car, Contract, TPL, Insurance, UserInfo, Permission, Report, ReportImage # add this

from django.contrib.auth.models import User # add this
import django.contrib.auth.password_validation as validators    # add this
from django.core import exceptions

class UserInfoSerializer(serializers.ModelSerializer):  # user info serializer
    class Meta:
        model = UserInfo
        fields = ['id','company','position','gender','birthday','phone','address']
        
        
class UserSerializer(serializers.ModelSerializer):  # user serializer
    user_info = UserInfoSerializer()

    class Meta:
        model = User
        fields = ['id','username','email','first_name','last_name','password','user_info']
        extra_kwargs = {
            'user_info': {'validators': []},
            'password': {'write_only': True}
        }
        lookup_field = 'username'
        
    def validate_password(self, data):  # validate password
        validators.validate_password(password=data, user=User)
        return data

    def create(self, validated_data):       # Creating User
        user_data = validated_data.pop('user_info')
        password = validated_data['password']
        user = User.objects.create(**validated_data)
        UserInfo.objects.create(user=user, **user_data)
        user.set_password(password)
        user.save()
        return user

class UpdateUserSerializer(serializers.ModelSerializer):  # user update serializer
    user_info = UserInfoSerializer()
    password = serializers.CharField(required=False, write_only=True)
    class Meta:
        model = User
        fields = ['id','username','email','first_name','last_name','password','user_info']
        extra_kwargs = {
            'user_info': {'validators': []},
            'password': {'write_only': True}
        }
        lookup_field = 'username'
        
    def validate_password(self, data):      # validate password
        validators.validate_password(password=data, user=User)
        return data

    def update(self, instance, validated_data):     # Updating User Info
        user_data = validated_data.pop("user_info")
        password = validated_data.pop('password',None)
        user_info = instance.user_info
        
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)

        if password is not None:    # set password if not null
            instance.set_password(password)
        instance.save()

        user_info.company = user_data.get('company', user_info.company)
        user_info.position = user_data.get('position', user_info.position)
        user_info.gender = user_data.get('gender', user_info.gender)
        user_info.birthday = user_data.get('birthday', user_info.birthday)
        user_info.phone = user_data.get('phone', user_info.phone)
        user_info.address = user_data.get('address', user_info.address)
        user_info.save()
        return instance

class PermissionSerializer(serializers.ModelSerializer):    # permission serializer
    class Meta:
        model = Permission
        fields = ['id','user','slug','can_view_users','can_add_users','can_edit_users','can_delete_users',
                  'can_view_inventory','can_add_inventory','can_edit_inventory','can_delete_inventory',
                  'can_view_inspection_reports','can_add_inspection_reports','can_edit_inspection_reports','can_delete_inspection_reports',
                  'can_view_maintenance_reports','can_add_maintenance_reports','can_edit_maintenance_reports','can_delete_maintenance_reports',
                  'can_view_repair_reports','can_add_repair_reports','can_edit_repair_reports','can_delete_repair_reports',
                  'can_view_task','can_add_task','can_edit_task','can_delete_task']

class PermissionUserSerializer(serializers.ModelSerializer):    # user permission serializer
    class Meta:
        model = Permission
        fields = ['id','slug','can_view_users','can_add_users','can_edit_users','can_delete_users']
        extra_kwargs = {'slug': {'read_only': True},}

class PermissionInventorySerializer(serializers.ModelSerializer):    # inventory permission serializer
    class Meta:
        model = Permission
        fields = ['id','slug','can_view_inventory','can_add_inventory','can_edit_inventory','can_delete_inventory']
        extra_kwargs = {'slug': {'read_only': True},}

class PermissionInspectionReportSerializer(serializers.ModelSerializer):    # inspection report permission serializer
    class Meta:
        model = Permission
        fields = ['id','slug','can_view_inspection_reports','can_add_inspection_reports','can_edit_inspection_reports','can_delete_inspection_reports']
        extra_kwargs = {'slug': {'read_only': True},}

class PermissionMaintenanceReportSerializer(serializers.ModelSerializer):    # maintenance report permission serializer
    class Meta:
        model = Permission
        fields = ['id','slug','can_view_maintenance_reports','can_add_maintenance_reports','can_edit_maintenance_reports','can_delete_maintenance_reports']
        extra_kwargs = {'slug': {'read_only': True},}

class PermissionRepairReportSerializer(serializers.ModelSerializer):    # repair permission serializer
    class Meta:
        model = Permission
        fields = ['id','slug','can_view_repair_reports','can_add_repair_reports','can_edit_repair_reports','can_delete_repair_reports']
        extra_kwargs = {'slug': {'read_only': True},}

class PermissionTaskSerializer(serializers.ModelSerializer):    # task permission serializer
    class Meta:
        model = Permission
        fields = ['id','slug','can_view_task','can_add_task','can_edit_task','can_delete_task']
        extra_kwargs = {'slug': {'read_only': True},}

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

class ReportImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportImage
        fields = ['id','images']

class ReportSerializer(serializers.ModelSerializer):
    # images = ReportImageSerializer(many=True)
    class Meta:
        model = Report
        fields = ['report_id','car','body_no','make','mileage','location','cleanliness_exterior','condition_rust','decals','windows',
                    'rear_door','mirror','roof_rack','rear_step','seats','seat_belts','general_condition','vehicle_documents','main_beam',
                    'dipped_beam','side_lights','tail_lights','indicators','breake_lights','reverse_lights','hazard_light','rear_fog_lights',
                    'interior_lights','screen_washer','wiper_blades','horn','radio','front_fog_lights','air_conditioning','cleanliness_engine_bay',
                    'washer_fluid','coolant_level','brake_fluid_level','power_steering_fluid','gas_level','oil_level','tyres','front_visual',
                    'rear_visual','spare_visual','wheel_brace','jack','front_right_wheel','front_left_wheel','rear_right_wheel','rear_left_wheel', 
                    'notes','date_updated','date_created']#,'images']


    # def create(self, validated_data):       # Creating User
    #     images_data = validated_data.pop('images')
    #     report = Report.objects.create(**validated_data)
    #     for image_data in images_data:
    #         ReportImage.objects.create(report=report, **image_data)
    #     return report