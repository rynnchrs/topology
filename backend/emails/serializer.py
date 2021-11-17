from car.models import Car
from report.models import FieldInspection
from rest_framework import serializers

from .models import Email


class EmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Email
        fields = '__all__'


class SendEmailSerializer(serializers.ModelSerializer):
    fi_report_id = serializers.CharField(required=False, allow_blank=True)
    email = serializers.ListField()
    class Meta:
        model = Email
        fields = ['fi_report_id', 'email']

    def validate(self, obj):
        errors = []
        if obj['fi_report_id']: 
            try:
                obj['fi_report_id'] = FieldInspection.objects.get(pk=obj['fi_report_id'])
            except:
                errors.append({"fi_report_id": 'Invalid Field Inspection Report ID.'})
        else:
            pass

        for email in obj['email']:
            try:
                email = Email.objects.get(email_add=email)
            except:
                errors.append({"email": 'Invalid Email Address.'})
        if errors:
            raise serializers.ValidationError({'errors':errors})
        return obj
