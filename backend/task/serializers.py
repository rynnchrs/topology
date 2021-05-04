from car.serializers import CarInfoSerializer
from rest_framework import serializers

from .models import JobOrder, Task


class TaskSerializer(serializers.ModelSerializer):
    body_no = serializers.CharField()
    class Meta:
        model= Task
        fields = ['body_no']

    def to_representation(self, instance): # instance of vin_no
        self.fields['body_no'] =  CarInfoSerializer(read_only=True)
        return super(TaskSerializer, self).to_representation(instance)

class JobOrderSerializer(serializers.ModelSerializer): # list of all Maintenance
    task = TaskSerializer()
    class Meta:
        model = JobOrder
        fields = ['job_id','job_no','task']
