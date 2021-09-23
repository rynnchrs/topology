from rest_framework import serializers

from .models import PDF, TPL, Car, Contract, Insurance


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


class PDFSerializer(serializers.ModelSerializer):
    class Meta:
        model = PDF
        fields = '__all__'

    def to_representation(self, instance):
        self.fields['car'] = serializers.CharField(read_only=True, source='car.body_no')
        return super(PDFSerializer, self).to_representation(instance)