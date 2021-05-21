from car.models import Car
from car.serializers import CarInfoSerializer
from django.contrib.auth.models import User
from django.db.models import fields
from rest_framework import serializers
from task.serializers import RepairJobSerializer

from .models import Cost, Inspection, Maintenance, Repair

#class InspectionImageSerializer(serializers.ModelSerializer):
#    class Meta:
#        model = InspectionImage
#        fields = ['id','images']


class InspectionSerializer(serializers.ModelSerializer): # Inspection serializer 
    #images = InspectionImageSerializer(many=True)
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
                    'edited_by','notes','date_updated','date_created']#,'images']

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
    diagnosed_by = serializers.CharField()
    generated_by = serializers.CharField()
    noted_by = serializers.CharField(required=False, allow_blank=True)
    repair_by = serializers.CharField()
    class Meta:
        model = Repair
        fields = ['repair_id','job_order','cost','total_parts_cost','total_labor_cost','total_estimate_cost',
                'ir_no','incident_date','date_receive','site_poc','contact_no','incident_details','diagnosed_by',
                'perform_date','actual_findings','actual_remarks','generated_by','noted_by','repair_by',
                'repair_date','action_taken','date_done','status_repair','remarks','date_updated','date_created']
        
    def validate(self, obj): # validate input in foreign keys
        errors = []
        try:
            obj['diagnosed_by'] = User.objects.get(username=obj['diagnosed_by'])
        except:
            errors.append({"diagnosed_by": 'Invalid diagnosed_by'})
        try:
            obj['generated_by'] = User.objects.get(username=obj['generated_by'])
        except:
            errors.append({"generated_by": 'Invalid generated_by'})
        try:
            obj['repair_by'] = User.objects.get(username=obj['repair_by'])
        except:
            errors.append({"repair_by": 'Invalid repair_by'})
        try:
            if obj['noted_by'] == "" or None:
                obj['noted_by'] = None
            else:
                obj['noted_by'] = User.objects.get(username=obj['noted_by'])
        except:
            errors.append({"noted_by": 'Invalid Noted By'})
        if errors:
            raise serializers.ValidationError({'errors':errors})
        return obj

    def create(self, validated_data):       # Creating Repair with many Cost
        costs_data = validated_data.pop('cost')
        ro_no = Repair.objects.create(**validated_data)
        for cost_data in costs_data:
            Cost.objects.create(ro_no=ro_no, **cost_data)
        return ro_no

    def update(self, instance, validated_data):     
        costs_data = validated_data.pop("cost")
        costs = (instance.cost).all()

        for cost in costs:
            cost.delete()

        instance.ir_no = validated_data.get('ir_no', instance.ir_no)
        instance.incident_date = validated_data.get('incident_date', instance.incident_date)
        instance.date_receive = validated_data.get('date_receive', instance.date_receive)
        instance.site_poc = validated_data.get('site_poc', instance.site_poc)
        instance.contact_no = validated_data.get('contact_no', instance.contact_no)
        instance.incident_details = validated_data.get('incident_details', instance.incident_details)
        instance.diagnosed_by = validated_data.get('diagnosed_by', instance.diagnosed_by)
        instance.perform_date = validated_data.get('perform_date', instance.perform_date)
        instance.actual_findings = validated_data.get('actual_findings', instance.actual_findings)
        instance.task_status_mn = validated_data.get('task_status_mn', instance.task_status_mn)
        instance.actual_remarks = validated_data.get('actual_remarks', instance.actual_remarks)
        instance.generated_by = validated_data.get('generated_by', instance.generated_by)
        instance.noted_by = validated_data.get('noted_by', instance.noted_by)
        instance.repair_by = validated_data.get('repair_by', instance.repair_by)
        instance.repair_date = validated_data.get('repair_date', instance.repair_date)
        instance.action_taken = validated_data.get('action_taken', instance.action_taken)
        instance.date_done = validated_data.get('date_done', instance.date_done)
        instance.status_repair = validated_data.get('status_repair', instance.status_repair)
        instance.remarks = validated_data.get('remarks', instance.remarks)
        instance.save()

        for cost_data in costs_data:
            Cost.objects.create(ro_no=instance, **cost_data)

        return instance

    def to_representation(self, instance): 
        self.fields['job_order'] = RepairJobSerializer(read_only=True)
        return super(RepairSerializer, self).to_representation(instance)


class RepairListSerializer(serializers.ModelSerializer): # list of all repair
    body_no = serializers.CharField(source='body_no.body_no')
    class Meta:
        model = Repair
        fields = [  'repair_id','ro_no','body_no']

