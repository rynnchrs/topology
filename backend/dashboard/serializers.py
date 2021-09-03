from car.models import TPL, Car, Contract, Insurance
from car.serializers import CarInfoSerializer
from rest_framework import serializers


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

class ExpiryContractSerializer(serializers.ModelSerializer):
    body_no = serializers.CharField(source='car.body_no')
    class Meta:
        model = Contract
        fields = ['contract_id','body_no','start_date','end_date']


class ExpiryTPLSerializer(serializers.ModelSerializer):
    body_no = serializers.CharField(source='car.body_no')
    class Meta:
        model = TPL
        fields = ['tpl_id','body_no','start_date','end_date']

        
class ExpiryInsuranceSerializer(serializers.ModelSerializer):
    body_no = serializers.CharField(source='car.body_no')
    class Meta:
        model = Insurance
        fields = ['insurance_id','body_no','start_date','end_date']

        