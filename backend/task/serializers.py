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
            if count == 0:
                job_order = JobOrder.objects.create(**job_order, job_no=count+1)
            else:
                count = JobOrder.objects.filter(type=False).latest('job_id')
                count = int(count.job_no)+1
                job_order = JobOrder.objects.create(**job_order, job_no=count)
        elif job_order['type'] == True: # repair job order
            count = JobOrder.objects.filter(type=True).count()
            if count == 0:
                job_order = JobOrder.objects.create(**job_order, job_no=count+1)
            else:
                count = JobOrder.objects.filter(type=True).latest('job_id')
                count = int(count.job_no)+1
                job_order = JobOrder.objects.create(**job_order, job_no=count)

        fieldmans_data = validated_data.pop('fieldman')
        task = Task.objects.create(**validated_data, job_order=job_order)

        for fieldman_data in fieldmans_data:
            Fieldman.objects.create(task=task, **fieldman_data)
        return task

    def update(self, instance, validated_data):     # Updating User Info
        fieldmans_data = validated_data.pop("fieldman")
        fieldmans = (instance.fieldman).all()

        for fieldman in fieldmans:
            fieldman.delete()

        instance.job_order = validated_data.get('job_order__type', instance.job_order)
        instance.desc = validated_data.get('desc', instance.desc)
        instance.remarks = validated_data.get('remarks', instance.remarks)
        instance.schedule_date = validated_data.get('schedule_date', instance.schedule_date)
        instance.start_date = validated_data.get('start_date', instance.start_date)
        instance.end_date = validated_data.get('end_date', instance.end_date)
        instance.start_date_actual = validated_data.get('start_date_actual', instance.start_date_actual)
        instance.end_date_actual = validated_data.get('end_date_actual', instance.end_date_actual)
        instance.actual_days = validated_data.get('actual_days', instance.actual_days)
        instance.task_status_fm = validated_data.get('task_status_fm', instance.task_status_fm)
        instance.task_status_mn = validated_data.get('task_status_mn', instance.task_status_mn)
        instance.manager = validated_data.get('manager', instance.manager)
        instance.body_no = validated_data.get('body_no', instance.body_no)
        instance.save()

        for fieldman_data in fieldmans_data:
            Fieldman.objects.create(task=instance, **fieldman_data)

        return instance
        
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



class RepairCarInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ['vin_no','body_no','plate_no','make','current_loc','status','operational']


class RepairTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['task_id','schedule_date','body_no']

    def to_representation(self, instance): 
        self.fields['body_no'] = RepairCarInfoSerializer(read_only=True)
        return super(RepairTaskSerializer, self).to_representation(instance)
 
 
class RepairJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobOrder
        fields = '__all__'

    def to_representation(self, instance): 
        self.fields['task'] = RepairTaskSerializer(read_only=True)
        return super(RepairJobSerializer, self).to_representation(instance)   
