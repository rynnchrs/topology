from abc import abstractmethod

from django.contrib.auth.models import User  # add this
from django.db.models import query
from django.shortcuts import get_object_or_404, render
from django_filters.rest_framework import DjangoFilterBackend  # filter
from rest_framework import filters  # add this; filter
from rest_framework import viewsets  # add this
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response  # add this
from rest_framework.views import APIView  # add this
from rest_framework_simplejwt.tokens import RefreshToken  # add this

from .models import (TPL, Car, Contract, Inspection, Insurance,  # add this
                     Maintenance, Permission, Repair, UserInfo)
from .populate import user_data
from .serializers import (CarInfoSerializer, CarSerializer,  # add this
                          ContractSerializer, InspectionListSerializer,
                          InspectionSerializer, InsuranceSerializer,
                          MaintenanceListSerializer, MaintenanceSerializer,
                          PermissionInspectionReportSerializer,
                          PermissionInventorySerializer,
                          PermissionMaintenanceReportSerializer,
                          PermissionRepairReportSerializer,
                          PermissionSerializer, PermissionTaskSerializer,
                          PermissionUserSerializer, RepairListSerializer,
                          RepairSerializer, SearchInventorySerializer,
                          TotalCarSerializer, TPLSerializer,
                          UpdateUserSerializer, UserListSerializer,
                          UserSerializer)
from .utils import (can_add_maintenance, can_view_maintenance, check_Com_date,
                    check_cr_date, check_or_date, check_TPL_date,
                    inspection_permission, user_permission)


class Populate(generics.GenericAPIView):  # for register user

    def post(self, request):
        user_data()
        return Response("Successfully Created", status=status.HTTP_201_CREATED)

class RegisterView(generics.GenericAPIView):  # for register user
    serializer_class = UserSerializer # add this

    def post(self, request): # add this
        serializer = UserSerializer(data=request.data) # add this
        if serializer.is_valid(raise_exception=True): # add this
            serializer.save() # add this
            return Response("Successfully Register", status=status.HTTP_201_CREATED) # add this
        return Response(serializer.errors) # add this


class BlacklistTokenView(APIView):      # for Logout
    def post(self, request):    
        try:       
            refresh_token = request.data.get("refresh_token")   
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_200_OK) 
        except Exception as e:  
            return Response(status=status.HTTP_400_BAD_REQUEST) 

class UserView(viewsets.ModelViewSet):   # User ModelViewSet view, create, update, delete
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()   # add this
    serializer_class = UserSerializer  # add this
    def list(self, request):        # User List
        user = self.request.user    # get users
        if user_permission(user):    # permission
            queryset = User.objects.all()
            serializer = UserSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)            
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    def create(self, request):  # create user
        user = self.request.user
        if user_permission(user):     # permission
            serializer = UserSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
            return Response(status=status.HTTP_201_CREATED)          
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)     
    def retrieve(self, request, pk=None):   # retrieve user
        user = self.request.user
        if user_permission(user):      # permission
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
        if user_permission(user):  # permission
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
        if user_permission(user): # permission
            queryset = User.objects.all()
            users = get_object_or_404(queryset, username=pk)    # get user
            users.delete()
            return Response(status=status.HTTP_200_OK)        
        else: 
            return Response(status=status.HTTP_401_UNAUTHORIZED)     


class UserListView(generics.ListAPIView):
    queryset = Permission.objects.all()
    serializer_class = UserListSerializer            
    filter_backends = [DjangoFilterBackend]
    filterset_fields  = ['can_view_users','can_add_users','can_edit_users','can_delete_users',
                  'can_view_inventory','can_add_inventory','can_edit_inventory','can_delete_inventory',
                  'can_view_inspection_reports','can_add_inspection_reports','can_edit_inspection_reports','can_delete_inspection_reports',
                  'can_view_maintenance_reports','can_add_maintenance_reports','can_edit_maintenance_reports','can_delete_maintenance_reports',
                  'can_view_repair_reports','can_add_repair_reports','can_edit_repair_reports','can_delete_repair_reports',
                  'can_view_task','can_add_task','can_edit_task','can_delete_task']

    

class PermissionView(viewsets.ViewSet):  # permission ViewSet
    permission_classes = [IsAuthenticated]
    serializer_class = PermissionSerializer 
    def create(self, request):      # create permission
        user = self.request.user
        if user_permission(user):    # permission
            serializer = PermissionSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
            return Response(status=status.HTTP_201_CREATED)          
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def list(self, request):    # Permission List
        user = self.request.user
        if user_permission(user):   
            queryset = Permission.objects.all()
            serializer = PermissionSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)            
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def retrieve(self, request, pk=None):       # retrieve permission
        user = self.request.user
        if user_permission(user): # permission
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
        if user_permission(user): # permission 
            queryset = Permission.objects.all()
            user = get_object_or_404(queryset, user__username=pk) # get user
            user.delete()
            return Response(status=status.HTTP_200_OK)        
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

class PermissionUserView(viewsets.ViewSet): # User permission ViewSet
    permission_classes = [IsAuthenticated]
    serializer_class = PermissionUserSerializer  # add this
    def update(self, request, pk=None):     # update user permission
        user = self.request.user
        if user_permission(user): # permission
            queryset = Permission.objects.all()
            users = get_object_or_404(queryset, user__username=pk)    # get user
            serializer = PermissionUserSerializer(instance=users, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)       
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

class PermissionInventoryView(viewsets.ViewSet): # Inventory permission ViewSet
    permission_classes = [IsAuthenticated]
    serializer_class = PermissionInventorySerializer
    def update(self, request, pk=None): # update inventory permission
        user = self.request.user
        if user_permission(user): # permission
            queryset = Permission.objects.all()
            users = get_object_or_404(queryset, user__username=pk)    # get user
            serializer = PermissionInventorySerializer(instance=users, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)       
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

class PermissionInspectionReport(viewsets.ViewSet): # Inspection Reports permission ViewSet
    permission_classes = [IsAuthenticated]
    serializer_class = PermissionInspectionReportSerializer

    def update(self, request, pk=None):     # update report permission
        user = self.request.user
        if user_permission(user): # permission
            queryset = Permission.objects.all()
            users = get_object_or_404(queryset, user__username=pk) # get user
            serializer = PermissionInspectionReportSerializer(instance=users, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)       
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class PermissionMaintenanceReport(viewsets.ViewSet): # Maintenance Reports permission ViewSet
    permission_classes = [IsAuthenticated]
    serializer_class = PermissionMaintenanceReportSerializer
    def update(self, request, pk=None):     # update report permission
        user = self.request.user
        if user_permission(user): # permission
            queryset = Permission.objects.all()
            users = get_object_or_404(queryset, user__username=pk) # get user
            serializer = PermissionMaintenanceReportSerializer(instance=users, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)       
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class PermissionRepairReport(viewsets.ViewSet): # Repair Reports permission ViewSet
    permission_classes = [IsAuthenticated]
    serializer_class = PermissionRepairReportSerializer
    def update(self, request, pk=None):     # update report permission
        user = self.request.user
        if user_permission(user): # permission
            queryset = Permission.objects.all()
            users = get_object_or_404(queryset, user__username=pk) # get user
            serializer = PermissionRepairReportSerializer(instance=users, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)       
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class PermissionTaskView(viewsets.ViewSet):     # Task Permission ViewSet
    permission_classes = [IsAuthenticated]
    serializer_class = PermissionTaskSerializer

    def update(self, request, pk=None):     # update task permission
        user = self.request.user
        if user_permission(user): # permission
            queryset = Permission.objects.all()
            users = get_object_or_404(queryset, user__username=pk)    # get user
            serializer = PermissionTaskSerializer(instance=users, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)       
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class AddMaintenanceReportView(viewsets.ViewSet): # list of can add maintenance report s
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer
    def list(self, request):        # User List
        user = self.request.user
        if user_permission(user): # permission
            queryset = User.objects.all().filter(permission__can_add_maintenance_reports=True)
            serializer = UserSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)            
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class AddInspectionReportView(viewsets.ViewSet): # list of can add Inspection reports
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer
    def list(self, request):        # User List
        user = self.request.user
        if user_permission(user): # permission
            queryset = User.objects.all().filter(permission__can_add_inspection_reports=True)
            serializer = UserSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)            
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class AddRepairReportView(viewsets.ViewSet): # list of can add Repair reports 
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer
    def list(self, request):        # User List
        user = self.request.user
        if user_permission(user): # permission
            queryset = User.objects.all().filter(permission__can_add_repair_reports=True)
            serializer = UserSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)            
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)   


class InspectionView(viewsets.ViewSet):  # inspection report Form
    permission_classes = [IsAuthenticated]
    serializer_class = InspectionSerializer

    def create(self, request): # create report 
        user = self.request.user
        if inspection_permission(user):
            serializer = InspectionSerializer(data=request.data) 
            if serializer.is_valid(raise_exception=True): 
                serializer.save() # add this
                return Response(status=status.HTTP_201_CREATED) 
            return Response(serializer.errors) 
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk=None): #retrieve inspection
        user = self.request.user
        if inspection_permission(user):
            queryset =  Inspection.objects.all()
            inspection = get_object_or_404(queryset, pk=pk)
            serializer = InspectionSerializer(inspection, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:   
            return Response(status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk=None): # update inspection
        user = self.request.user
        if inspection_permission(user):
            queryset =  Inspection.objects.all()
            inspection = get_object_or_404(queryset, pk=pk)
            if inspection.status is True:
                inspection.status = False
                inspection.save()
                return Response("Status False", status=status.HTTP_200_OK)
            else:
                inspection.status = True
                inspection.save()
                return Response("Status True", status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class InspectionListView(generics.ListAPIView): #list of inspection with filtering
    queryset = Inspection.objects.all()
    serializer_class = InspectionListSerializer       
    filter_backends = [DjangoFilterBackend,filters.OrderingFilter]
    filterset_fields = ['inspection_id','vin_no__vin_no']
    ordering_fields = ['vin_no__vin_no', 'date_created']

class MaintenanceView(viewsets.ViewSet):  # inspection report Form
    permission_classes = [IsAuthenticated]
    serializer_class = MaintenanceSerializer

    def create(self, request): # create report 
        user = self.request.user
        if can_add_maintenance(user):
            serializer = MaintenanceSerializer(data=request.data) 
            if serializer.is_valid(raise_exception=True): 
                serializer.save() # add this
                return Response(status=status.HTTP_201_CREATED) 
            return Response(serializer.errors) 
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    def retrieve(self, request, pk=None): #retrieve inspection
        user = self.request.user
        if can_view_maintenance(user):
            queryset =  Maintenance.objects.all()
            maintenance = get_object_or_404(queryset, pk=pk)
            serializer = MaintenanceSerializer(maintenance, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:   
            return Response(status=status.HTTP_400_BAD_REQUEST)

class MaintenanceListView(generics.ListAPIView): #list of inspection with filtering
    queryset = Maintenance.objects.all()
    serializer_class = MaintenanceListSerializer       
    filter_backends = [DjangoFilterBackend,filters.OrderingFilter]
    filterset_fields = ['maintenance_id','vin_no__vin_no']
    ordering_fields = ['vin_no__vin_no', 'date_created']

class CarView(viewsets.ModelViewSet):  # add this
    queryset = Car.objects.all()  # add this
    serializer_class = CarSerializer  # add this
    search_fields = ['body_no', 'plate_no', 'vin_no']
    filter_backends = [filters.SearchFilter]
    lookup_field = 'slug'


class CarListView(generics.ListAPIView):  #list of all car with filtering
    queryset = Car.objects.all()  # add this
    serializer_class = CarInfoSerializer  # add this
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['body_no', 'plate_no', 'vin_no','make','current_loc']


class SearchInventoryView(viewsets.ViewSet):

    def list(self, request):
        value = request.query_params.get('search_field', None)
        queryset = Car.objects.only(value)
        serializer = SearchInventorySerializer(queryset, many=True, fields=[str(value)])
        return Response(serializer.data)


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


class RepairView(viewsets.ModelViewSet):  # add this
    queryset = Repair.objects.all()  # add this
    serializer_class = RepairSerializer  # add this
    search_fields = ['vin_no__vin_no','date_created']
    filter_backends = [filters.SearchFilter]

    def list(self, request): # list of all repair
        queryset =  Repair.objects.all()
        serializer = RepairListSerializer(queryset, many=True)
        return Response(serializer.data)


class TotalView(viewsets.ModelViewSet):
    serializer_class = TotalCarSerializer
    queryset = Car.objects.all().order_by('date_created')[:1]


class ExpiryView(APIView): # expiry 
    def get(self, request):
        year = request.data.get('year')
        return Response({
            'OR':check_or_date(year), # OR
            'CR':check_cr_date(year), # CR
            'TPL':check_TPL_date(year), # TPL Insurance
            'Com':check_Com_date(year), # Comprehensive Insurance
            })
