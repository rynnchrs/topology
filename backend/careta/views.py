import datetime
from abc import abstractmethod

from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import filters, generics, status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.parsers import MultiPartParser, FormParser
from .filters import UserFilter
from .models import Permission
from .serializers import (MyTokenObtainPairSerializer,
                          PermissionInspectionReportSerializer,
                          PermissionInventorySerializer,
                          PermissionRepairReportSerializer,
                          PermissionSerializer, PermissionTaskSerializer,
                          PermissionUserSerializer, UpdateUserSerializer,
                          UserListSerializer, UserSerializer)
from .utils import user_permission


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    

class RegisterView(generics.GenericAPIView):  # for register user
    serializer_class = UserSerializer # add this
    perser_classes = [MultiPartParser, FormParser]
    def post(self, request): # add this
        serializer = UserSerializer(data=request.data) # add this
        if serializer.is_valid(raise_exception=True): # add this
            serializer.save() # add this
            return Response("Successfully Register", status=status.HTTP_201_CREATED) # add this
        return Response(serializer.errors) # add this


class BlacklistTokenView(APIView):      # for Logout
    permission_classes = [IsAuthenticated]
    def post(self, request):    
        try:       
            refresh_token = request.data.get("refresh_token")   
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_200_OK) 
        except:  
            return Response(status=status.HTTP_400_BAD_REQUEST) 

class UserView(viewsets.ModelViewSet):   # User ModelViewSet view, create, update, delete
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all().order_by('id')
    serializer_class = UserSerializer
    def list(self, request):        # User List
        user = self.request.user    # get users
        if user_permission(user, 'can_view_users'):    # permission
            queryset = User.objects.all()
            serializer = UserSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)            
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    def create(self, request):  # create user
        user = self.request.user
        if user_permission(user, 'can_add_users'):     # permission
            serializer = UserSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
            return Response(status=status.HTTP_201_CREATED)          
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)     
    def retrieve(self, request, pk=None):   # retrieve user
        user = self.request.user
        if user_permission(user,'can_view_users'):      # permission
            queryset = User.objects.all()
            users = get_object_or_404(queryset, username=pk)    # get user
            serializer = UserSerializer(users,  many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)          
        else:
            if pk == user.username:       # if current user is equal to pk
                serializer = UserSerializer(user,  many=False)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:    
                return Response(status=status.HTTP_401_UNAUTHORIZED)
    def update(self, request, pk=None):     # update user
        user = self.request.user
        if user_permission(user, 'can_edit_users'):  # permission
            queryset = User.objects.all()
            users = get_object_or_404(queryset, username=pk)    # get user
            serializer = UpdateUserSerializer(instance=users, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)       
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    def destroy(self, request, pk=None):       # delete user
        user = self.request.user
        if user_permission(user, 'can_delete_users'): # permission
            queryset = User.objects.all()
            users = get_object_or_404(queryset, username=pk)    # get user
            users.delete()
            return Response(status=status.HTTP_200_OK)        
        else: 
            return Response(status=status.HTTP_401_UNAUTHORIZED)     


class UserListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all().exclude(username='admin').order_by('id')
    serializer_class = UserListSerializer   
    filter_backends = [filters.SearchFilter]  
    search_fields = ['id','^username','^first_name','^last_name']  


class PermissionView(viewsets.ViewSet):  # permission ViewSet
    permission_classes = [IsAuthenticated]
    serializer_class = PermissionSerializer 
    def create(self, request):      # create permission
        user = self.request.user
        if user_permission(user, 'can_add_users'):    # permission
            serializer = PermissionSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
            return Response(status=status.HTTP_201_CREATED)          
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def list(self, request):    # Permission List
        user = self.request.user
        if user_permission(user, 'can_view_users'):   
            queryset = Permission.objects.all()
            serializer = PermissionSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)            
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def retrieve(self, request, pk=None):       # retrieve permission
        user = self.request.user
        if user_permission(user, 'can_view_users'): # permission
            queryset = Permission.objects.all()
            users = get_object_or_404(queryset, user__username=pk)
            serializer = PermissionSerializer(users,  many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)          
        else:
            if pk == user.username:    # if current user is equal to pk
                queryset = Permission.objects.all()
                users = get_object_or_404(queryset, user__username=pk)    # get user
                serializer = PermissionSerializer(users,  many=False)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:    
                return Response(status=status.HTTP_401_UNAUTHORIZED)

    def destroy(self, request, pk=None):    # delete task permission
        user = self.request.user
        if user_permission(user, 'can_delete_users'): # permission 
            queryset = Permission.objects.all()
            user = get_object_or_404(queryset, user__username=pk) # get user
            user.delete()
            return Response(status=status.HTTP_200_OK)        
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=True, methods=['put'])
    def user(self, request, pk=None):     # update user permission
        user = self.request.user
        if user_permission(user, 'can_edit_users'): # permission
            queryset = Permission.objects.all()
            users = get_object_or_404(queryset, user__username=pk)    # get user
            serializer = PermissionUserSerializer(instance=users, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)       
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=True, methods=['put'])
    def inventory(self, request, pk=None): # update inventory permission
        user = self.request.user
        if user_permission(user, 'can_edit_users'): # permission
            queryset = Permission.objects.all()
            users = get_object_or_404(queryset, user__username=pk)    # get user
            serializer = PermissionInventorySerializer(instance=users, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)       
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=True, methods=['put'])
    def inspection(self, request, pk=None):     # update report permission
        user = self.request.user
        if user_permission(user, 'can_edit_users'): # permission
            queryset = Permission.objects.all()
            users = get_object_or_404(queryset, user__username=pk) # get user
            serializer = PermissionInspectionReportSerializer(instance=users, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)       
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=True, methods=['put'])
    def repair(self, request, pk=None):     # update report permission
        user = self.request.user
        if user_permission(user, 'can_edit_users'): # permission
            queryset = Permission.objects.all()
            users = get_object_or_404(queryset, user__username=pk) # get user
            serializer = PermissionRepairReportSerializer(instance=users, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)       
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=True, methods=['put'])
    def task(self, request, pk=None):     # update task permission
        user = self.request.user
        if user_permission(user, 'can_edit_users'): # permission
            queryset = Permission.objects.all()
            users = get_object_or_404(queryset, user__username=pk)    # get user
            serializer = PermissionTaskSerializer(instance=users, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)       
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=False)
    def add_inspection_list(self, request):        # User List
        user = self.request.user
        if user_permission(user, 'can_view_users'): # permission
            queryset = User.objects.all().filter(permission__can_add_inspection_reports=True)
            serializer = UserSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)            
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=False)
    def add_repair_list(self, request):        # User List
        user = self.request.user
        if user_permission(user, 'can_view_users'): # permission
            queryset = User.objects.all().filter(permission__can_add_repair_reports=True)
            serializer = UserSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)            
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)   




