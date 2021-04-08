import datetime
from abc import abstractmethod

from django.contrib.auth.models import User  # add this
from django.db.models import query
from django.shortcuts import get_object_or_404, render
from django_filters.rest_framework import DjangoFilterBackend  # filter
from rest_framework import viewsets  # add this; filter; add this
from rest_framework import filters, generics, serializers, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response  # add this
from rest_framework.views import APIView  # add this
from rest_framework_simplejwt.tokens import RefreshToken  # add this
from rest_framework_simplejwt.views import TokenObtainPairView
from reversion.models import Version

from .models import (TPL, Car, Contract, Inspection, Insurance,  # add this
                     Maintenance, Permission, Repair, Task, UserInfo)
from .serializers import (TaskListSerializer,JobOrderSerializer,FieldmanAssignmentSerializer)
from careta.utils import (user_permission)


class TaskView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Task.objects.all()
    serializer_class = TaskListSerializer