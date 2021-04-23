from careta.models import Car
from django.contrib.auth.models import User
from report.models import Cost, Inspection, Maintenance, Repair
from rest_framework import fields, serializers

class InspectionNotifySerializer(serializers.ModelSerializer):
    body_no = serializers.CharField(source='body_no.body_no')
    driver = serializers.CharField(source='driver.username')
    class Meta:
        model = Inspection
        fields = ['body_no','driver','date_created']


