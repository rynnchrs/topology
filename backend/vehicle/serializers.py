from car.models import Car
from rest_framework import serializers

from gps.models import GPS, Record


class RecordSerializer(serializers.ModelSerializer):
    device_id = serializers.CharField(source='device_id.device_id')
    class Meta:
        model = Record
        fields = '__all__'
