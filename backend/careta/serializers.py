# todo/serializers.py
import django.contrib.auth.password_validation as validators  # add this
from django.contrib.auth.models import User  # add this
from django.core import exceptions
from django.db.models import fields
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import (TPL, Car, Contract, Cost,  # , ReportImage # add this
                     Inspection, Insurance, Maintenance, Permission, Repair,
                     UserInfo)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        credentials = {
            'username': '',
            'password': attrs.get("password")
        }

        username = User.objects.filter(email=attrs.get("username")).first()
        email = User.objects.filter(username=attrs.get("username")).first()
        phone = User.objects.filter(user_info__phone=attrs.get("username")).first()

        user_obj = username or email or phone 
        if user_obj:
            credentials['username'] = user_obj.username

        return super().validate(credentials)


class UserListSerializer(serializers.ModelSerializer):  # user info serializer
    id = serializers.CharField(read_only=True, source='user.id')
    username = serializers.CharField(read_only=True, source='user.username')
    full_name = serializers.CharField(read_only=True, source='user.user_info.full_name')
    class Meta:
        model = Permission
        fields = ['id','username','full_name']


class UserInfoSerializer(serializers.ModelSerializer):  # user info serializer
    class Meta:
        model = UserInfo
        fields = ['id','company','position','gender','birthday','phone','address','full_name']
        
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
        user.set_password(password)
        user.save()
        UserInfo.objects.create(user=user, **user_data)
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
    user = serializers.CharField()
    slug = serializers.CharField(read_only=True, source='user.username')
    class Meta:
        model = Permission
        fields = ['id','user','slug','can_view_users','can_add_users','can_edit_users','can_delete_users',
                  'can_view_inventory','can_add_inventory','can_edit_inventory','can_delete_inventory',
                  'can_view_inspection_reports','can_add_inspection_reports','can_edit_inspection_reports','can_delete_inspection_reports',
                  'can_view_maintenance_reports','can_add_maintenance_reports','can_edit_maintenance_reports','can_delete_maintenance_reports',
                  'can_view_repair_reports','can_add_repair_reports','can_edit_repair_reports','can_delete_repair_reports',
                  'can_view_task','can_add_task','can_edit_task','can_delete_task']

    def validate(self, obj): # validate if user field input is username
        try:
            obj['user'] = User.objects.get(username=obj['user'])
        except:
            raise serializers.ValidationError({'user':'Invalid username in permission'})
        return obj


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
        fields = '__all__'
        lookup_field = 'slug'


class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)

        # Instantiate the superclass normally
        super(DynamicFieldsModelSerializer, self).__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class SearchInventorySerializer(DynamicFieldsModelSerializer):
     class Meta:
         model = Car
         fields = ['vin_no', 'body_no', 'plate_no']


class ContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contract
        fields = '__all__'
        lookup_field = 'slug'


class TPLSerializer(serializers.ModelSerializer):
    class Meta:
        model = TPL
        fields = '__all__'
        lookup_field = 'slug'


class InsuranceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Insurance
        fields = '__all__'
        lookup_field = 'slug'


#class InspectionImageSerializer(serializers.ModelSerializer):
#    class Meta:
#        model = InspectionImage
#        fields = ['id','images']

class CarInfoSerializer(serializers.ModelSerializer): # car info inheritance, car list
    class Meta:
        model = Car
        fields = ['vin_no','body_no','plate_no','make','current_loc']


class InspectionSerializer(serializers.ModelSerializer): # Inspection serializer 
    #images = InspectionImageSerializer(many=True)
    body_no = serializers.CharField()
    driver = serializers.CharField(required=False, allow_blank=True)
    edited_by = serializers.CharField(required=False, allow_blank=True)
    class Meta:
        model = Inspection
        fields = ['inspection_id','body_no','mileage','cleanliness_exterior','condition_rust','decals','windows',
                    'rear_door','mirror','roof_rack','rear_step','seats','seat_belts','general_condition',
                    'vehicle_documents','main_beam','dipped_beam','side_lights','tail_lights','indicators',
                    'break_lights','reverse_lights','hazard_light','rear_fog_lights','interior_lights',
                    'screen_washer','wiper_blades','horn','radio','front_fog_lights','air_conditioning',
                    'cleanliness_engine_bay','washer_fluid','coolant_level','brake_fluid_level',
                    'power_steering_fluid','gas_level','oil_level','tyres','front_visual','rear_visual',
                    'spare_visual','wheel_brace','jack','front_right_wheel','front_left_wheel','rear_right_wheel',
                    'rear_left_wheel','driver','edited_by','notes','date_updated','date_created']#,'images']

    def validate(self, obj): # validate if vin_no input is vin_no
        errors = []
        try:
            obj['body_no'] = Car.objects.get(body_no=obj['body_no'])
        except:
           errors.append({"body_no": 'Invalid Body No.'})
        try:
            if obj['driver'] == "" or None:
                pass
            else:
                obj['driver'] = User.objects.get(username=obj['driver'])
        except:
            errors.append({"driver": 'Invalid Driver'})
        try:
            if obj['edited_by'] == "" or None:
                obj['edited_by'] = None
            else:
                obj['edited_by'] = User.objects.get(username=obj['edited_by'])
        except:
            errors.append({"edited_by": 'Invalid Edited By'})
        if errors:
            raise serializers.ValidationError({'errors':errors})
        return obj

    def update(self, instance, validated_data):
        validated_data.pop('body_no', None)  # prevent myfield from being updated
        validated_data.pop('driver', None)  # prevent driver from being updated
        return super().update(instance, validated_data)

    def create(self, validated_data):       # Creating report
        # images_data = validated_data.pop('images') 
        validated_data.pop('edited_by', None) 
        report = Inspection.objects.create(**validated_data)
        # for image_data in images_data:
        #     ReportImage.objects.create(report=report, **image_data)
        return report

    def to_representation(self, instance): # instance of vin_no
        self.fields['body_no'] =  CarInfoSerializer(read_only=True)
        return super(InspectionSerializer, self).to_representation(instance)


class InspectionListSerializer(serializers.ModelSerializer): # list of all Inspection
    vin_no = serializers.CharField(source='body_no.vin_no')
    body_no = serializers.CharField(source='body_no.body_no')
    current_loc = serializers.CharField(source='body_no.current_loc')

    class Meta:
        model = Inspection
        fields = [  'inspection_id','body_no','vin_no','date_created', 'current_loc']

class InspectionLastFourListSerializer(serializers.ModelSerializer): # list of all Inspection
    body_no = serializers.CharField(source='body_no.body_no')
    class Meta:
        model = Inspection
        fields = ['body_no']

class MaintenanceSerializer(serializers.ModelSerializer): # Maintenance serializer 
    body_no = serializers.CharField()
    inspected_by = serializers.CharField()
    class Meta:
        model = Maintenance
        fields = '__all__'

    def validate(self, obj): # validate if vin_no input is vin_no
        errors = []
        try:
            obj['body_no'] = Car.objects.get(body_no=obj['body_no'])
        except:
           errors.append({"body_no": 'Invalid Body no'})
        try:
            obj['inspected_by'] = User.objects.get(username=obj['inspected_by'])
        except:
            errors.append({"inspected_by": 'Invalid Inspected By'})
        if errors:
            raise serializers.ValidationError({'errors':errors})
        return obj

    def update(self, instance, validated_data):
        validated_data.pop('body_no', None)  # prevent myfield from being updated
        validated_data.pop('inspected_by', None)  # prevent inspected_by from being updated
        return super().update(instance, validated_data)

    def to_representation(self, instance): # instance of vin_no
        self.fields['body_no'] =  CarInfoSerializer(read_only=True)
        return super(MaintenanceSerializer, self).to_representation(instance)

class MaintenanceListSerializer(serializers.ModelSerializer): # list of all Maintenance
    vin_no = serializers.CharField(source='body_no.vin_no')
    body_no = serializers.CharField(source='body_no.body_no')
    current_loc = serializers.CharField(source='body_no.current_loc')

    class Meta:
        model = Maintenance
        fields = [  'maintenance_id','body_no','vin_no','date_created', 'current_loc']


class CostSerializer(serializers.ModelSerializer): # cost info ingeritance
    class Meta:
        model = Cost
        fields = ['cost_type','particulars','cost','quantity','total_cost']


class RepairSerializer(serializers.ModelSerializer): # repair serializer
    cost = CostSerializer(many=True)
    vin_no = serializers.CharField()
    vms = serializers.CharField()
    perform_by = serializers.CharField()
    repair_by = serializers.CharField()
    class Meta:
        model = Repair
        fields = [  'repair_id','ro_no','vin_no','current_status','incident_details','vms','dealer','schedule_date','perform_by','perform_date',
                    'actual_findings','actual_remarks','repair_by','repair_date','action_taken','date_done','status_repair',
                    'remarks','date_updated','date_created','cost','total_parts_cost','total_labor_cost','total_estimate_cost',
                    ]
    def validate(self, obj): # validate input in foreign keys
        errors = []
        try:
            obj['vin_no'] = Car.objects.get(vin_no=obj['vin_no'])
        except:
            errors.append({"vin_no": 'Invalid vin_no'})
        try:
            obj['vms'] = User.objects.get(username=obj['vms'])
        except:
            errors.append({"vms": 'Invalid vms'})
        try:
            obj['perform_by'] = User.objects.get(username=obj['perform_by'])
        except:
            errors.append({"perform_by": 'Invalid perform_by'})
        try:
            obj['repair_by'] = User.objects.get(username=obj['repair_by'])
        except:
            errors.append({"repair_by": 'Invalid repair_by'})
        if errors:
            raise serializers.ValidationError({'errors':errors})
        return obj

    def create(self, validated_data):       # Creating Repair with many Cost
        costs_data = validated_data.pop('cost')
        ro_no = Repair.objects.create(**validated_data)
        for cost_data in costs_data:
            Cost.objects.create(ro_no=ro_no, **cost_data)
        return ro_no

    def to_representation(self, instance): # vin_no instances
        self.fields['vin_no'] =  CarInfoSerializer(read_only=True)
        return super(RepairSerializer, self).to_representation(instance)


class RepairListSerializer(serializers.ModelSerializer): # list of all repair
    vin_no = serializers.CharField(source='vin_no.vin_no')
    class Meta:
        model = Repair
        fields = [  'repair_id','ro_no','vin_no']


class TotalCarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ['get_total','plate_with_date','decals_with_date','userManual_with_date','warrantyBook_with_date','unitKey_with_date',
                    'bodyKey_with_date','fan_date_with_date','ewd_date_with_date','tools_with_date','cigarettePlug_with_date','tools_with_date',
                    
                    'plate_with_nrc','fan_date_with_nrc','ewd_date_with_nrc','tools_with_nrc','cigarettePlug_with_nrc','tools_with_nrc',
                    'decals_with_nrc','userManual_with_nrc','warrantyBook_with_nrc','unitKey_with_nrc','bodyKey_with_nrc',

                    'plate_with_nyr','fan_date_with_nyr','ewd_date_with_nyr','tools_with_nyr','cigarettePlug_with_nyr','tools_with_nyr',
                    'decals_with_nyr','userManual_with_nyr','warrantyBook_with_nyr','unitKey_with_nyr','bodyKey_with_nyr',

                    'plate_with_na','fan_date_with_na','ewd_date_with_na','tools_with_na','cigarettePlug_with_na','tools_with_na',
                    'decals_with_na','userManual_with_na','warrantyBook_with_na','unitKey_with_na','bodyKey_with_na',

                    'plate_with_dnr','fan_date_with_dnr','ewd_date_with_dnr','tools_with_dnr','cigarettePlug_with_dnr','tools_with_dnr',
                    'decals_with_dnr','userManual_with_dnr','warrantyBook_with_dnr','unitKey_with_dnr','bodyKey_with_dnr',
                 ]

