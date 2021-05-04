from django_filters import rest_framework as filters
from .models import Car

class CarFilter(filters.FilterSet):
    body_no = filters.CharFilter(field_name="body_no", lookup_expr='startswith')
    vin_no = filters.CharFilter(field_name="vin_no", lookup_expr='startswith')
    plate_no = filters.CharFilter(field_name="plate_no", lookup_expr='startswith')
    date_created = filters.CharFilter(field_name="date_created", lookup_expr='startswith')
    current_loc = filters.CharFilter(field_name="current_loc", lookup_expr='startswith')
    class Meta:
        models = Car
        fields = ['inspection_id','body_no','vin_no','plate_no','date_created','current_loc']