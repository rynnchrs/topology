# todo/serializers.py
import django.contrib.auth.password_validation as validators
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Permission, UserInfo


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
        token = super().validate(credentials) 
        token['username'] = credentials['username']
        
        return token


class UserListSerializer(serializers.ModelSerializer):  # user info serializer
    full_name = serializers.CharField(read_only=True, source='user_info.full_name')
    class Meta:
        model = User
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
                  'can_view_inspection_reports','can_add_inspection_reports','can_edit_inspection_reports','can_show_all_inspection_reports',
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
        fields = ['id','slug','can_view_inspection_reports','can_add_inspection_reports','can_edit_inspection_reports','can_show_all_inspection_reports']
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






