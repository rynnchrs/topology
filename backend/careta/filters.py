from django.contrib.auth.models import User
from django_filters import rest_framework as filters


class UserFilter(filters.FilterSet):
    id = filters.NumberFilter(field_name="id", lookup_expr='exact')
    username = filters.CharFilter(field_name="username", lookup_expr='startswith')
    full_name = filters.CharFilter(field_name="user_info__full_name")
    class Meta:
        models = User
        fields = ['id','username','full_name']