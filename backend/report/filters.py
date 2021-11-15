from django_filters import rest_framework as filters
from .models import FieldInspection, Inspection, Repair

class InspectionFilter(filters.FilterSet):
    inspection_id = filters.NumberFilter(field_name="inspection_id", lookup_expr='exact')
    body_no = filters.CharFilter(field_name="body_no__body_no", lookup_expr='startswith')
    vin_no = filters.CharFilter(field_name="body_no__vin_no", lookup_expr='startswith')
    plate_no = filters.CharFilter(field_name="body_no__plate_no", lookup_expr='startswith')
    date_created = filters.CharFilter(field_name="date_created", lookup_expr='startswith')
    current_loc = filters.CharFilter(field_name="body_no__current_loc", lookup_expr='startswith')
    class Meta:
        models = Inspection
        fields = ['inspection_id','body_no','vin_no','plate_no','date_created','current_loc']


class RepairFilter(filters.FilterSet):
    repair_id = filters.NumberFilter(field_name="repair_id", lookup_expr='exact')
    body_no = filters.CharFilter(field_name="body_no__body_no", lookup_expr='startswith')
    job_no = filters.CharFilter(field_name="job_order__job_no", lookup_expr='startswith')
    type = filters.CharFilter(field_name="job_order__type", lookup_expr='exact')
    date_created = filters.CharFilter(field_name="date_created", lookup_expr='startswith')
    class Meta:
        models = Repair
        fields = ['repair_id','body_no','job_no','type','date_created']

class CheckListFilter(filters.FilterSet):
    check_list_id = filters.NumberFilter(field_name="check_list_id", lookup_expr='exact')
    body_no = filters.CharFilter(field_name="body_no__body_no", lookup_expr='startswith')
    job_no = filters.CharFilter(field_name="job_order__job_no", lookup_expr='startswith')
    type = filters.CharFilter(field_name="job_order__type", lookup_expr='exact')
    date_created = filters.CharFilter(field_name="date_created", lookup_expr='startswith')
    class Meta:
        models = Repair
        fields = ['check_list_id','body_no','job_no','type','date_created']


class FieldInspectionFilter(filters.FilterSet):
    fi_report_id = filters.NumberFilter(field_name="fi_report_id", lookup_expr='exact')
    body_no = filters.CharFilter(field_name="body_no__body_no", lookup_expr='startswith')
    job_no = filters.CharFilter(field_name="job_order__job_no", lookup_expr='startswith')
    inspection_date = filters.CharFilter(field_name="inspection_date", lookup_expr='startswith')
    class Meta:
        models = FieldInspection
        fields = ['fi_report_id','body_no','job_no','inspection_date']