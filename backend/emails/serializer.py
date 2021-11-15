from car.models import Car
from .models import Email
from rest_framework import serializers


class EmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Email
        fields = '__all__'


class SendEmailSerializer(serializers.ModelSerializer):
    body_no = serializers.CharField()
    email = serializers.ListField()
    class Meta:
        model = Email
        fields = ['body_no', 'email']

    def validate(self, obj):
        errors = []
        try:
            obj['body_no'] = Car.objects.get(body_no=obj['body_no'])
        except:
           errors.append({"body_no": 'Invalid Body No.'})
        for email in obj['email']:
            try:
                email = Email.objects.get(email_add=email)
            except:
                errors.append({"email": 'Invalid Email Address.'})
        if errors:
            raise serializers.ValidationError({'errors':errors})
        return obj