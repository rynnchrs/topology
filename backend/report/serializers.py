from careta.models import Car
from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Cost, Inspection, Maintenance, Repair

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

