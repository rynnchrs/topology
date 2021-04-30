from rest_framework import serializers

from .models import TPL, Car, Contract, Insurance


class CarInfoSerializer(serializers.ModelSerializer): # car info inheritance, car list
    class Meta:
        model = Car
        fields = ['vin_no','body_no','plate_no','make','current_loc']


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = '__all__'
        lookup_field = 'slug'


class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)

        # Instantiate the superclass normally
        super(DynamicFieldsModelSerializer, self).__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class SearchInventorySerializer(DynamicFieldsModelSerializer):
     class Meta:
         model = Car
         fields = ['vin_no', 'body_no', 'plate_no']


class ContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contract
        fields = '__all__'
        lookup_field = 'slug'


class TPLSerializer(serializers.ModelSerializer):
    class Meta:
        model = TPL
        fields = '__all__'
        lookup_field = 'slug'


class InsuranceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Insurance
        fields = '__all__'
        lookup_field = 'slug'


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
