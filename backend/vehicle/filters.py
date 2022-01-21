from django_filters import rest_framework as filters

from car.models import Car

class TaskFilter(filters.FilterSet):
    car_id = filters.NumberFilter(field_name="task_id", lookup_expr='exact')
    proj = filters.CharFilter(field_name="body_no__body_no", lookup_expr='startswith')
    reg = filters.CharFilter(method="custom_fieldman_filter")
    area = filters.CharFilter(field_name="start_date", lookup_expr='exact')
    # typ = filters.CharFilter(field_name="end_date", lookup_expr='exact')
  
    class Meta:
        models = Car
        fields = ['car_id','proj','reg','area','typ']


class VehicleDeploymentFilter(filters.FilterSet):
    car_id = filters.NumberFilter(field_name="task_id", lookup_expr='exact')
    device_id = filters.CharFilter(field_name="device_id__device_id", lookup_expr='startswith')
    reg = filters.CharFilter(method="custom_fieldman_filter")
    area = filters.CharFilter(field_name="start_date", lookup_expr='exact')
    # typ = filters.CharFilter(field_name="end_date", lookup_expr='exact')
  
    class Meta:
        models = Car
        fields = ['car_id','device_id','reg','area','typ']