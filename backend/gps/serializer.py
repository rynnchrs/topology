from .models import GPS, Record
from rest_framework import serializers


class GpsRecordSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Record
        field = '__all__'

    def validate(self, obj): # validate if vin_no input is vin_no
        errors = []
        try:
            obj['device_id'] = GPS.objects.get(device_id=obj['device_id'])
        except:
           errors.append({"device_id": 'Invalid Device ID.'})
        if errors:
            raise serializers.ValidationError({'errors':errors})
        return obj