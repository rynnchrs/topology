from django.db.models import Case, F, When
from django.db.models.functions import Concat
from django_filters import rest_framework as filters

from .models import IR, Task


class TaskFilter(filters.FilterSet):
    task_id = filters.NumberFilter(field_name="task_id", lookup_expr='exact')
    body_no = filters.CharFilter(field_name="body_no__body_no", lookup_expr='startswith')
    fieldman = filters.CharFilter(method="custom_fieldman_filter")
    start_date = filters.CharFilter(field_name="start_date", lookup_expr='exact')
    end_date = filters.CharFilter(field_name="end_date", lookup_expr='exact')
    job_type = filters.CharFilter(field_name="job_order__type", lookup_expr='exact')
    status_fm = filters.CharFilter(field_name="task_status_fm", lookup_expr='exact')
    status_mn = filters.CharFilter(field_name="task_status_mn", lookup_expr='exact')
  
    class Meta:
        models = Task
        fields = ['task_id','body_no','fieldman','start_date','end_date','job_type'
                    'status_fm','status_mn']


    def custom_fieldman_filter(self, queryset, name, value):
        if value:
            queryset = queryset.annotate(fieldman__field_man__user_info__full_name=Concat(F('fieldman__field_man__first_name'),F('fieldman__field_man__last_name')))
            queryset = queryset.filter(fieldman__field_man__user_info__full_name__icontains=value)
        return queryset


class IRFilter(filters.FilterSet):
    task_id = filters.NumberFilter(field_name="task_id", lookup_expr='exact')
    body_no = filters.CharFilter(field_name="body_no__body_no", lookup_expr='startswith')
    ir_no = filters.CharFilter(field_name="ir_no", lookup_expr='startswith')
    project_name = filters.CharFilter(field_name="project_name", lookup_expr='startswith')
    operational = filters.CharFilter(field_name="operational", lookup_expr='exact')
    date = filters.CharFilter(field_name="date", lookup_expr='exact')
  
    class Meta:
        models = IR
        fields = ['task_id','body_no','ir_no','project_name','date']

