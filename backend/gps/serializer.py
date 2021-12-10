from car.models import Car
from rest_framework import serializers

from .models import GPS, Record


class RecordSerializer(serializers.ModelSerializer):
    device_id = serializers.CharField(source='device_id.device_id')
    class Meta:
        model = Record
        fields = '__all__'


class GPSSerializer(serializers.ModelSerializer):
    body_no = serializers.CharField(write_only=True)

    class Meta:
        model = GPS
        fields = '__all__'

    def validate(self, obj): # validate input in foreign keys
        errors = []
        try:
            obj['body_no'] = Car.objects.get(body_no=obj['body_no'])
        except:
           errors.append({"body_no": 'Invalid Body No.'})
        if errors:
            raise serializers.ValidationError({'errors':errors})
        return obj
 
    def to_representation(self, instance): 
        self.fields['body_no'] = serializers.CharField(read_only=True, source='body_no.body_no')
        return super(GPSSerializer, self).to_representation(instance)