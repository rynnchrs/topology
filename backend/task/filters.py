from django_filters import rest_framework as filters
from .models import Task

class TaskFilter(filters.FilterSet):
    task_id = filters.NumberFilter(field_name="task_id", lookup_expr='exact')
    body_no = filters.CharFilter(field_name="body_no__body_no", lookup_expr='startswith')
    fieldman = filters.CharFilter(field_name="fieldman__field_man__username", lookup_expr='startswith')
    start_date = filters.CharFilter(field_name="start_date", lookup_expr='exact')
    end_date = filters.CharFilter(field_name="end_date", lookup_expr='exact')
    job_type = filters.CharFilter(field_name="job_order__type", lookup_expr='exact')
    status_fm = filters.CharFilter(field_name="task_status_fm", lookup_expr='exact')
    status_mn = filters.CharFilter(field_name="task_status_mn", lookup_expr='exact')
  
    class Meta:
        models = Task
        fields = ['task_id','body_no','fieldman','start_date','end_date','job_type'
                    'status_fm','status_mn']