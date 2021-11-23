from car.models import Car
from car.serializers import CarFieldInspectionSerializer
from django.contrib.auth.models import User
from report.models import CheckList
from rest_framework import fields, serializers
from rest_framework.fields import CharField, SerializerMethodField

from .models import IR, Fieldman, JobOrder, Task


class CarInfoSerializer(serializers.ModelSerializer): # car info inheritance, car list
    make = serializers.SerializerMethodField()  
    dealer = serializers.SerializerMethodField()

    def get_make(self, obj):
        return obj.get_make_display()

    def get_dealer(self, obj):
        return obj.get_dealer_display()
        
    class Meta:
        model = Car
        fields = ['vin_no','body_no','plate_no','make','current_loc',
                    'permanent_loc','dealer','cs_no','engine_no']



class JobOrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = JobOrder
        fields = ['job_id','job_no','type','field_inspection']

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
            fieldman = obj['field_man']
            obj['field_man'] = User.objects.get(username=fieldman)
        except:
            errors.append({"field_man": 'Invalid Fieldman.'})
        if errors:
            raise serializers.ValidationError({'errors':errors})
        return obj
    
    def to_representation(self, instance): # instances
        self.fields['field_man'] =  serializers.CharField(source='field_man.user_info.full_name')
        return super(FieldmanSerializer, self).to_representation(instance)

        
class TaskSerializer(serializers.ModelSerializer):
    job_order = JobOrderSerializer()
    fieldman = FieldmanSerializer(many=True)
    body_no = serializers.CharField()
    ir_no = serializers.CharField(required=False, allow_blank=True)
    check_list = serializers.CharField(required=False, allow_blank=True)
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
        
        if obj['ir_no'] != "":
            try:
                obj['ir_no'] = IR.objects.get(ir_no=obj['ir_no'])
            except:
                errors.append({"ir_no": 'Invalid IR No.'})
        else:
            obj['ir_no'] = None

        if obj['check_list'] != "":
            try:
                obj['check_list'] = CheckList.objects.get(check_list_no=obj['check_list'])
            except:
                errors.append({"check_list": 'Invalid Check List.'})
        else:
            obj['check_list'] = None

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
        self.fields['ir_no'] =  IRListSerializers(read_only=True)
        return super(TaskSerializer, self).to_representation(instance)


class WarningTaskSerializer(serializers.ModelSerializer):
    fieldman = FieldmanSerializer(many=True)
    job_order = JobOrderSerializer()
    current_loc = serializers.CharField(source='body_no.current_loc')
    body_no = serializers.CharField(source='body_no.body_no')
    class Meta:
        model= Task
        fields =  ['task_id','job_order','body_no','fieldman','start_date',
        'end_date','schedule_date','task_status_fm','task_status_mn','current_loc']


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



class IRTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = IR
        fields = ['ir_no','date_time','date','problem_obs','contact_number','admin_name']


class RepairTaskSerializer(serializers.ModelSerializer):
    # check_list = serializers.CharField(source='check_list.check_list_no', read_only=True)
    class Meta:
        model = Task
        fields = ['task_id','schedule_date',]#'body_no','ir_no','check_list']

    # def to_representation(self, instance): 
    #     # self.fields['body_no'] = RepairCarInfoSerializer(read_only=True)
    #     # self.fields['ir_no'] = IRTaskSerializer(read_only=True)
    #     return super(RepairTaskSerializer, self).to_representation(instance)


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
        self.fields['body_no'] = RepairCarInfoSerializer(source='task.body_no')
        self.fields['ir_no'] = IRTaskSerializer(source='task.ir_no')
        self.fields['check_list'] = serializers.CharField(source='task.check_list')
        return super(RepairJobSerializer, self).to_representation(instance)   


class FieldInspectionJobSerializer(serializers.ModelSerializer):
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
        self.fields['body_no'] = CarFieldInspectionSerializer(source='task.body_no')
        return super(FieldInspectionJobSerializer, self).to_representation(instance)


class IRListSerializers(serializers.ModelSerializer):
    body_no = serializers.CharField(source='body_no.body_no')
    
    class Meta:
        model= IR
        fields =  ['ir_id','ir_no','date','operational','body_no','project_name']


class IRSerializers(serializers.ModelSerializer): # Inspection serializer 
    repair_type = fields.MultipleChoiceField(choices=IR.Repair_List)
    body_no = serializers.CharField()
    class Meta:
        model = IR
        fields = '__all__'

    def validate(self, obj): # validate if vin_no input is vin_no
        errors = []
        try:
            obj['body_no'] = Car.objects.get(body_no=obj['body_no'])
        except:
           errors.append({"body_no": 'Invalid Body No.'})
        if errors:
            raise serializers.ValidationError({'errors':errors})
        return obj

    # def update(self, instance, validated_data):

    # def create(self, validated_data):       # Creating report
    #     validated_data.pop('edited_by', None) 
    #     report = Inspection.objects.create(**validated_data)
    #     return report

    def to_representation(self, instance): # instance of vin_no
        self.fields['body_no'] =  CarInfoSerializer(read_only=True)
        self.fields['repair_type'] =  serializers.SerializerMethodField(read_only=True)
        return super(IRSerializers, self).to_representation(instance)

    
    def get_repair_type(self, obj):
        repair_list = []
        repair_type = str(obj.repair_type)
        repairs = repair_type.split(', ')
        for repair in repairs:
            repair_list.append(repair)
        return repair_list
