from django.shortcuts import render
from rest_framework import viewsets  # add this
from .serializers import CarSerializer, ContractSerializer, PermissionInventorySerializer, PermissionReportSerializer, PermissionSerializer, PermissionTaskSerializer, TPLSerializer, InsuranceSerializer, UserSerializer , PermissionUserSerializer# add this
from .models import Car, Contract, Permission, TPL, Insurance, UserInfo  # add this

from rest_framework import generics, status     # add this
from rest_framework.response import Response    # add this
from rest_framework.views import APIView    # add this
from django.contrib.auth.models import User     # add this
from rest_framework_simplejwt.tokens import RefreshToken    # add this
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated

class RegisterView(generics.GenericAPIView):  # for register user
    serializer_class = UserSerializer # add this
    def post(self, request): # add this
        serializer = UserSerializer(data=request.data) # add this
        if serializer.is_valid(raise_exception=True): # add this
            serializer.save() # add this
            return Response("Successfully Register") # add this
        return Response(serializer.error_messages) # add this

class BlacklistTokenView(APIView):      # for Logout
    def post(self, request):    
        try:       
            refresh_token = request.data.get("refresh_token")   
            token = RefreshToken(refresh_token)
            token.blacklist()  
        except Exception as e:  
            return Response(status=status.HTTP_400_BAD_REQUEST) 

class UserView(viewsets.ModelViewSet):   # User ModelViewSet view, create, update, delete
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()   # add this
    serializer_class = UserSerializer   # add this
    lookup_field = 'username'   # add this

class PermissionView(viewsets.ViewSet):  # permission ViewSet
    
  
    def create(self, request):  # create permission in a user
        serializer = PermissionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

    def list(self, request):        # list of users with permission
        queryset = Permission.objects.all()
        serializer_class = PermissionSerializer(queryset, many=True)
        return Response(serializer_class.data)

    def retrieve(self, request, pk=None):     # users with permission

        queryset = Permission.objects.all()
        permission = get_object_or_404(queryset, slug=pk)
        serializer_class = PermissionSerializer(permission)
        return Response(serializer_class.data)

class PermissionUserView(viewsets.ViewSet): # User permission ViewSet

    # def retrieve(self, request, pk=None):
    #     queryset = Permission.objects.all()
    #     permission = get_object_or_404(queryset, slug=pk)
    #     serializer_class = PermissionUserSerializer(permission)
    #     return Response(serializer_class.data)

    def update(self, request, pk=None):     # update user permission
        queryset = Permission.objects.all()
        permission = get_object_or_404(queryset, slug=pk)
        serializer = PermissionUserSerializer(instance=permission, data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
    def delete(self, request, pk=None):     # delete user permission
        queryset = Permission.objects.all()
        permission = get_object_or_404(queryset, slug=pk)
        permission.delete()
        return Response("Successfully deleted.")

class PermissionInventoryView(viewsets.ViewSet): # Inventory permission ViewSet

    # def retrieve(self, request, pk=None):
    #     queryset = Permission.objects.all()
    #     permission = get_object_or_404(queryset, slug=pk)
    #     serializer_class = PermissionInventorySerializer(permission)
    #     return Response(serializer_class.data)

    def update(self, request, pk=None):         # update inventory permission
        queryset = Permission.objects.all()
        permission = get_object_or_404(queryset, slug=pk)
        serializer = PermissionInventorySerializer(instance=permission, data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
    
    def delete(self, request, pk=None):     # delete inventory permission
        queryset = Permission.objects.all()
        permission = get_object_or_404(queryset, slug=pk)
        permission.delete()
        return Response("Successfully deleted.")

class PermissionReportView(viewsets.ViewSet): # Reports permission ViewSet

    # def retrieve(self, request, pk=None):
    #     queryset = Permission.objects.all()
    #     permission = get_object_or_404(queryset, slug=pk)
    #     serializer_class = PermissionReportSerializer(permission)
    #     return Response(serializer_class.data)

    def update(self, request, pk=None):     # update report permission
        queryset = Permission.objects.all()
        permission = get_object_or_404(queryset, slug=pk)
        serializer = PermissionReportSerializer(instance=permission, data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
    
    def delete(self, request, pk=None):    # delete report permission
        queryset = Permission.objects.all()
        permission = get_object_or_404(queryset, slug=pk)
        permission.delete()
        return Response("Successfully deleted.")

class PermissionTaskView(viewsets.ViewSet):     # Task Permission ViewSet

    # def retrieve(self, request, pk=None):
    #     queryset = Permission.objects.all()
    #     permission = get_object_or_404(queryset, slug=pk)
    #     serializer_class = PermissionTaskSerializer(permission)
    #     return Response(serializer_class.data)

    def update(self, request, pk=None):     # update task permission
        queryset = Permission.objects.all()
        permission = get_object_or_404(queryset, slug=pk)
        serializer = PermissionTaskSerializer(instance=permission, data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
    
    def delete(self, request, pk=None):     # delete task permission
        queryset = Permission.objects.all()
        permission = get_object_or_404(queryset, slug=pk)
        permission.delete()
        return Response("Successfully deleted.")

class CarView(viewsets.ModelViewSet):  # add this
    queryset = Car.objects.all()  # add this
    serializer_class = CarSerializer  # add this
    lookup_field = 'slug'


class ContractView(viewsets.ModelViewSet):  # add this
    queryset = Contract.objects.all()  # add this
    serializer_class = ContractSerializer  # add this
    lookup_field = 'slug'


class TPLView(viewsets.ModelViewSet):  # add this
    queryset = TPL.objects.all()  # add this
    serializer_class = TPLSerializer  # add this
    lookup_field = 'slug'


class InsuranceView(viewsets.ModelViewSet):  # add this
    queryset = Insurance.objects.all()  # add this
    serializer_class = InsuranceSerializer  # add this
    lookup_field = 'slug'


class InsuranceList(generics.ListAPIView):
    serializer_class = InsuranceSerializer

    def get_queryset(self):
        username = self.kwargs['username']
        return Insurance.objects.filter(car=username)
