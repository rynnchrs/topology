import django.contrib.auth.password_validation as validators  # add this
from django.contrib.auth.models import User  # add this
from django.core import exceptions
from django.db.models import fields
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import (JobOrder,Task,FieldManAssignment)


class TaskListSerializer(serializers.ModelSerializer):
    manager_un = serializers.CharField(source='manager.username')
    car_vn = serializers.CharField(source='car.vin_no')
    start = serializers.DateField(source='job_startdate')
    end = serializers.DateField(source='job_enddate')
    
    class Meta:
        model = Task
        fields = ['id','manager_un','car_vn','job_order','job_desc','job_remarks',
                  'start','end','job_startdate_actual','job_enddate_actual',
                  'job_actualdays','job_status_fm','job_status_mn','job_scheduledate']


class TaskSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Task
        fields = '__all__'


class JobOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobOrder
        fields = '__all__'


class FieldmanAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = FieldManAssignment
        fields = '__all__'        