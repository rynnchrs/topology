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

from .models import (Task)
from .serializers import (TaskListSerializer,TaskSerializer,JobOrderSerializer,FieldmanAssignmentSerializer)

from careta.utils import (user_permission)

class TaskView(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    
    def list(self, request):    
        user = self.request.user
        if user_permission(user, 'can_view_task'):   
            queryset = Task.objects.all()
            serializer_class = TaskListSerializer(queryset, many=True)
            return Response(serializer_class.data, status=status.HTTP_200_OK)            
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def retrieve(self, request, pk=None):    
        user = self.request.user
        if user_permission(user, 'can_view_task'):   
            queryset = Task.objects.filter(manager_id__username=pk)
            serializer_class = TaskListSerializer(queryset, many=True)
            return Response(serializer_class.data, status=status.HTTP_200_OK)            
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)  

    def create(self, request):      
        user = self.request.user
        if user_permission(user, 'can_add_task'):    # permission
            serializer = TaskSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
            return Response(status=status.HTTP_201_CREATED)          
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def update(self, request,pk=None):      
        user = self.request.user
        if user_permission(user, 'can_edit_task'):    # permission
            queryset = Task.objects.all()
            targettask = get_object_or_404(queryset, id=pk)
            serializer = TaskSerializer(instance = targettask, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
            return Response(status=status.HTTP_200_OK)          
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def destroy(self, request,pk=None):      
        user = self.request.user
        if user_permission(user, 'can_delete_task'):    # permission
            queryset = Task.objects.all()
            targettask = get_object_or_404(queryset, id=pk)
            targettask.delete()
            return Response(status=status.HTTP_200_OK)          
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)                        

    
      
