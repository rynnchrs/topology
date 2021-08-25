from car.models import Car
from car.serializers import CarInfoSerializer
from django.contrib.auth.models import User
from rest_framework import fields, serializers
from task.serializers import RepairJobSerializer

from .models import CheckList, CheckListParts, CheckListReportParts, Cost, Inspection, Repair


class InspectionSerializer(serializers.ModelSerializer): # Inspection serializer 
    body_no = serializers.CharField()
    driver = serializers.CharField(required=False, allow_blank=True)
    edited_by = serializers.CharField(required=False, allow_blank=True)
    class Meta:
        model = Inspection
        fields = ['inspection_id','body_no','mileage','gps','cleanliness_exterior','condition_rust','decals','windows',
                    'rear_door','mirror','roof_rack','rear_step','seats','seat_belts','general_condition',
                    'vehicle_documents','main_beam','dipped_beam','side_lights','tail_lights','indicators',
                    'break_lights','reverse_lights','hazard_light','rear_fog_lights','interior_lights',
                    'screen_washer','wiper_blades','horn','radio','front_fog_lights','cleanliness_engine_bay',
                    'washer_fluid','coolant_level','brake_fluid_level','power_steering_fluid','liquid_leak',
                    'gas_level','oil_level','tyres','front_visual','rear_visual','spare_visual','wheel_brace',
                    'jack','front_right_wheel','front_left_wheel','rear_right_wheel','rear_left_wheel','driver',
                    'edited_by','notes','date_updated','date_created']

    def validate(self, obj): # validate if vin_no input is vin_no
        errors = []
        try:
            obj['body_no'] = Car.objects.get(body_no=obj['body_no'])
        except:
           errors.append({"body_no": 'Invalid Body No.'})
        try:
            if obj['driver'] == "":
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
        validated_data.pop('edited_by', None) 
        report = Inspection.objects.create(**validated_data)
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


class CostSerializer(serializers.ModelSerializer): # cost info ingeritance
    class Meta:
        model = Cost
        fields = ['cost_type','particulars','cost','quantity','total_cost']
    

class RepairSerializer(serializers.ModelSerializer): # repair serializer
    cost = CostSerializer(many=True, write_only=True)
    noted_by = serializers.CharField(required=False, allow_blank=True)
    class Meta:
        model = Repair
        fields = ['repair_id','job_order','cost','total_parts_cost','total_labor_cost','total_estimate_cost',
                'ir_no','incident_date','date_receive','site_poc','contact_no','incident_details','diagnosed_by',
                'perform_date','actual_findings','actual_remarks','generated_by','noted_by','repair_by',
                'repair_date','action_taken','date_done','status_repair','remarks','date_updated','date_created']
        extra_kwargs = {
            'job_order': {'required': False}
        }
    def validate(self, obj): # validate input in foreign keys
        errors = []
        try:
            if obj['noted_by'] == "":
                obj['noted_by'] = None
        except:
            errors.append({"noted_by": 'Invalid Noted By'})
        if errors:
            raise serializers.ValidationError({'errors':errors})
        return obj

    def create(self, validated_data):       # Creating Repair with many Cost
        costs_data = validated_data.pop('cost')
        ro_no = Repair.objects.create(**validated_data)
        parts = [x for x in costs_data if x['cost_type'] == 'P']
        for part in parts:
            Cost.objects.create(ro_no=ro_no, **part)
        for i in range(5-len(parts)):
            Cost.objects.create(ro_no=ro_no, cost_type='P')
        
        labors = [x for x in costs_data if x['cost_type'] == 'L']
        for labor in labors:
            Cost.objects.create(ro_no=ro_no, **labor)
        for i in range(5-len(labors)):
            Cost.objects.create(ro_no=ro_no, cost_type='L')

        return ro_no

    def update(self, instance, validated_data):     
        costs_data = validated_data.pop("cost")
        parts = (instance.cost).filter(cost_type='P')
        part = [x for x in costs_data if x['cost_type'] == 'P']
        for i in range(len(parts)):
            if i < len(part):
                Cost.objects.filter(pk=parts[i].pk).update(**part[i])
            else:
                obj = Cost.objects.get(pk=parts[i].pk)
                obj.particulars = None
                obj.cost = 0
                obj.quantity = 0
                obj.save()
        
        labors = (instance.cost).filter(cost_type='L')
        labor = [x for x in costs_data if x['cost_type'] == 'L']
        for i in range(len(labors)):
            if i < len(labor):
                Cost.objects.filter(pk=labors[i].pk).update(**labor[i])
            else:
                obj = Cost.objects.get(pk=labors[i].pk)
                obj.particulars = None
                obj.cost = 0
                obj.quantity = 0
                obj.save()

        instance.ir_no = validated_data.get('ir_no', instance.ir_no)
        instance.incident_date = validated_data.get('incident_date', instance.incident_date)
        instance.date_receive = validated_data.get('date_receive', instance.date_receive)
        instance.site_poc = validated_data.get('site_poc', instance.site_poc)
        instance.contact_no = validated_data.get('contact_no', instance.contact_no)
        instance.incident_details = validated_data.get('incident_details', instance.incident_details)
        instance.perform_date = validated_data.get('perform_date', instance.perform_date)
        instance.actual_findings = validated_data.get('actual_findings', instance.actual_findings)
        instance.actual_remarks = validated_data.get('actual_remarks', instance.actual_remarks)
        instance.repair_date = validated_data.get('repair_date', instance.repair_date)
        instance.action_taken = validated_data.get('action_taken', instance.action_taken)
        instance.date_done = validated_data.get('date_done', instance.date_done)
        instance.status_repair = validated_data.get('status_repair', instance.status_repair)
        instance.remarks = validated_data.get('remarks', instance.remarks)
        instance.save()

        return instance

    def to_representation(self, instance): 
        self.fields['job_order'] = RepairJobSerializer(read_only=True)
        self.fields['diagnosed_by'] = serializers.CharField(source='diagnosed_by.user_info.full_name')
        self.fields['repair_by'] = serializers.CharField(source='repair_by.user_info.full_name')
        self.fields['generated_by'] = serializers.CharField(source='generated_by.user_info.full_name')
        if instance.noted_by is not None:
            self.fields['noted_by'] = serializers.CharField(source='noted_by.user_info.full_name')
        return super(RepairSerializer, self).to_representation(instance)


class RepairListSerializer(serializers.ModelSerializer): # list of all repair
    body_no = serializers.CharField(source='body_no.body_no')
    job_order = serializers.CharField(source='job_order.job_no')
    type = serializers.SerializerMethodField()
    class Meta:
        model = Repair
        fields = [  'repair_id','body_no','job_order','type','date_created']
    
    def get_type(self, obj):
        print(obj.job_order.type)
        if obj.job_order.type == False:
            return "Inspection"
        else:
            return "Repair"


class CheckListPartsSerializer(serializers.ModelSerializer): # cost info ingeritance
    class Meta:
        model = CheckListParts
        fields = ['id','name']
    

class CheckListReportPartsSerializer(serializers.ModelSerializer): # cost info ingeritance
    check_list_parts = serializers.CharField()
    class Meta:
        model = CheckListReportParts
        fields = ['id','quantity','check_list_parts']
    
    def validate(self, obj): # validate if vin_no input is vin_no
        errors = []
        try:
            obj['check_list_parts'] = CheckListParts.objects.get(name=obj['check_list_parts'])
        except:
           errors.append({"check_list_parts": 'Invalid check_list_parts.'})
        if errors:
            raise serializers.ValidationError({'errors':errors})
        return obj


class CheckListSerializer(serializers.ModelSerializer): # Inspection serializer 
    parts = CheckListReportPartsSerializer(many=True, required=False)
    parts_included = fields.MultipleChoiceField(choices=CheckList.Parts_List)
    body_no = serializers.CharField()
    email = serializers.CharField()
    class Meta:
        model = CheckList
        fields = '__all__'

    def validate(self, obj): # validate if vin_no input is vin_no
        errors = []
        try:
            obj['email'] = User.objects.get(email=obj['email'])
        except:
           errors.append({"email": 'Invalid Email.'})
        try:
            obj['body_no'] = Car.objects.get(body_no=obj['body_no'])
        except:
           errors.append({"body_no": 'Invalid Body No.'})
        if errors:
            raise serializers.ValidationError({'errors':errors})
        return obj

    # def update(self, instance, validated_data):

    def create(self, validated_data):       # Creating report
        parts_data = validated_data.pop('parts') 
        check_list = CheckList.objects.create(**validated_data)
        for part_data in parts_data:
            CheckListReportParts.objects.create(check_list=check_list, **part_data)
        return check_list

    def to_representation(self, instance): # instance of vin_no
        self.fields['body_no'] =  CarInfoSerializer(read_only=True)
        self.fields['email'] =  serializers.CharField(source="email.email",read_only=True)
        self.fields['parts_included'] = serializers.SerializerMethodField(read_only=True)
        self.fields['job_desc'] = serializers.CharField(source='get_job_desc_display',read_only=True)
        return super(CheckListSerializer, self).to_representation(instance)
    
    def get_parts_included(self, obj):
        parts_list = []
        parts_included = str(obj.parts_included)
        parts = parts_included.split(', ')
        for part in parts:
            parts_list.append(part)
        return parts_list


class CheckListListSerializer(serializers.ModelSerializer): # list of all repair
    body_no = serializers.CharField(source='body_no.body_no')
    job_order = serializers.CharField(source='job_order.job_no')
    type = serializers.SerializerMethodField()
    class Meta:
        model = CheckList
        fields = [  'check_list_id','body_no','job_order','type','date_created']
    
    def get_type(self, obj):
        if obj.job_order.type == False:
            return "Inspection"
        else:
            return "Repair"