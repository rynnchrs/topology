from rest_framework.fields import CharField, SerializerMethodField
from car.models import Car
from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Fieldman, JobOrder, Task

class CarInfoSerializer(serializers.ModelSerializer): # car info inheritance, car list
    make = serializers.SerializerMethodField()
    
    def get_make(self, obj):
        return obj.get_make_display()

    class Meta:
        model = Car
        fields = ['vin_no','body_no','plate_no','make','current_loc']

class JobOrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = JobOrder
        fields = ['job_id','job_no','type']

    def to_representation(self, instance):
        representation = super(JobOrderSerializer, self).to_representation(instance)
        if instance.type == False:
            representation['type'] = "Inspection"
            return representation
        else:
            representation['type'] = "Repair"
            return representation
            
class FieldmanSerializer(serializers.ModelSerializer):
    field_man = serializers.CharField()
    class Meta:
        model = Fieldman
        fields = ['field_man']

    def validate(self, obj): # validate input in foreign keys
        errors = []
        try:
            fieldman = obj['field_man'].split()
            obj['field_man'] = User.objects.get(first_name=fieldman[0], last_name=fieldman[1])
        except:
            errors.append({"field_man": 'Invalid Fieldman.'})
        if errors:
            raise serializers.ValidationError({'errors':errors})
        return obj

        
class TaskSerializer(serializers.ModelSerializer):
    job_order = JobOrderSerializer()
    fieldman = FieldmanSerializer(many=True)
    body_no = serializers.CharField()
    class Meta:
        model= Task
        fields =  '__all__'

    def validate(self, obj): # validate input in foreign keys
        errors = []
        fieldmans = []
        for fieldman in obj['fieldman']:
            fieldmans.append(fieldman['field_man'].pk)

        if(len(set(fieldmans)) == len(fieldmans)):
            pass
        else:
            errors.append({"field_man": 'There have a duplicate fieldman in the list.'})
        try:
            obj['body_no'] = Car.objects.get(body_no=obj['body_no'])
        except:
            errors.append({"body_no": 'Invalid Body number.'})
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
        validated_data.pop('manager', None)
        fieldmans_data = validated_data.pop("fieldman")
        fieldmans = (instance.fieldman).all()

        for fieldman in fieldmans:
            fieldman.delete()

        instance.desc = validated_data.get('desc', instance.desc)
        instance.remarks = validated_data.get('remarks', instance.remarks)
        instance.schedule_date = validated_data.get('schedule_date', instance.schedule_date)
        instance.start_date = validated_data.get('start_date', instance.start_date)
        instance.end_date = validated_data.get('end_date', instance.end_date)
        instance.task_status_fm = validated_data.get('task_status_fm', instance.task_status_fm)
        instance.task_status_mn = validated_data.get('task_status_mn', instance.task_status_mn)
        instance.body_no = validated_data.get('body_no', instance.body_no)
        instance.save()

        for fieldman_data in fieldmans_data:
            Fieldman.objects.create(task=instance, **fieldman_data)

        return instance
        
    def to_representation(self, instance): # instances
        self.fields['body_no'] =  CarInfoSerializer(read_only=True)
        self.fields['manager'] =  serializers.CharField(source='manager.user_info.full_name')
        return super(TaskSerializer, self).to_representation(instance)


class WarningTaskSerializer(serializers.ModelSerializer):
    fieldman = FieldmanSerializer(many=True)
    job_order = JobOrderSerializer()
    class Meta:
        model= Task
        fields =  ['job_order','fieldman','start_date','end_date','schedule_date']



class RepairCarInfoSerializer(serializers.ModelSerializer):
    make = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()
        
    class Meta:
        model = Car
        fields = ['vin_no','body_no','plate_no','make','current_loc','status','operational']
    
    def get_make(self, obj):
        return obj.get_make_display()

    def get_status(self, obj):
        return obj.get_status_display()

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.operational == False:
            representation['operational'] = "Unoperational"
            return representation
        else:
            representation['operational'] = "Operational"
            return representation


class RepairTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['task_id','schedule_date','body_no']

    def to_representation(self, instance): 
        self.fields['body_no'] = RepairCarInfoSerializer(read_only=True)
        return super(RepairTaskSerializer, self).to_representation(instance)
 
 
class RepairJobSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()

    class Meta:
        model = JobOrder
        fields = '__all__'

    def get_type(self, obj):
        if obj.type == False:
            return "Inspection"
        else:
            return "Repair"

    def to_representation(self, instance): 
        self.fields['task'] = RepairTaskSerializer(read_only=True)
        return super(RepairJobSerializer, self).to_representation(instance)   
