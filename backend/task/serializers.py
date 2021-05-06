from car.models import Car
from car.serializers import CarInfoSerializer
from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Fieldman, JobOrder, Task


class JobOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobOrder
        fields = ['job_id','job_no','type']


class FieldmanSerializer(serializers.ModelSerializer):
    field_man = serializers.CharField()
    class Meta:
        model = Fieldman
        fields = ['field_man']

    def validate(self, obj): # validate input in foreign keys
        errors = []
        try:
            obj['field_man'] = User.objects.get(username=obj['field_man'])
        except:
            errors.append({"field_man": 'Invalid Fieldman.'})
        if errors:
            raise serializers.ValidationError({'errors':errors})
        return obj

        
class TaskSerializer(serializers.ModelSerializer):
    job_order = JobOrderSerializer()
    fieldman = FieldmanSerializer(many=True)
    body_no = serializers.CharField()
    manager = serializers.CharField()
    class Meta:
        model= Task
        fields =  '__all__'

    def validate(self, obj): # validate input in foreign keys
        errors = []
        try:
            obj['body_no'] = Car.objects.get(body_no=obj['body_no'])
        except:
            errors.append({"body_no": 'Invalid Body number.'})
        try:
            obj['manager'] = User.objects.get(username=obj['manager'])
        except:
            errors.append({"manager": 'Invalid Manager.'})
        if errors:
            raise serializers.ValidationError({'errors':errors})
        return obj

    def create(self, validated_data):
        job_order = validated_data.pop('job_order')

        if job_order['type'] == False:  # maintenance job order
            count = JobOrder.objects.filter(type=False).count()
            job_order = JobOrder.objects.create(**job_order, job_no=count+1)
        elif job_order['type'] == True: # repair job order
            count = JobOrder.objects.filter(type=True).count()
            job_order = JobOrder.objects.create(**job_order, job_no=count+1)

        fieldmans_data = validated_data.pop('fieldman')
        task = Task.objects.create(**validated_data, job_order=job_order)

        for fieldman_data in fieldmans_data:
            Fieldman.objects.create(task=task, **fieldman_data)
        return task

    def to_representation(self, instance): # instance of vin_no
        self.fields['body_no'] =  CarInfoSerializer(read_only=True)
        return super(TaskSerializer, self).to_representation(instance)


class WarningTaskSerializer(serializers.ModelSerializer):
    
    # job_order = JobOrderSerializer()
    fieldman = FieldmanSerializer(many=True)
    body_no = serializers.CharField(source='body_no.body_no')
    manager = serializers.CharField()
    class Meta:
        model= Task
        fields =  ['task_id','fieldman','manager','body_no','job_order','start_date','end_date']