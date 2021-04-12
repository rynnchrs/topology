import datetime
from abc import abstractmethod

from django.contrib.auth.models import User  # add this
from django.db.models import query
from django.shortcuts import get_object_or_404, render
from django_filters.rest_framework import DjangoFilterBackend  # filter
from report.models import Maintenance
from rest_framework import viewsets  # add this; filter; add this
from rest_framework import filters, generics, serializers, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response  # add this
from rest_framework.views import APIView  # add this
from rest_framework_simplejwt.tokens import RefreshToken  # add this
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import (TPL, Car, Contract, Insurance, JobOrder,  # add this
                     Permission)
from .populate import user_data
from .serializers import (CarInfoSerializer, CarSerializer,  # add this
                          ContractSerializer, InsuranceSerializer,
                          JobOrderSerializer, MyTokenObtainPairSerializer,
                          PermissionInspectionReportSerializer,
                          PermissionInventorySerializer,
                          PermissionMaintenanceReportSerializer,
                          PermissionRepairReportSerializer,
                          PermissionSerializer, PermissionTaskSerializer,
                          PermissionUserSerializer, SearchInventorySerializer,
                          TotalCarSerializer, TPLSerializer,
                          UpdateUserSerializer, UserListSerializer,
                          UserSerializer)
from .utils import (check_Com_date, check_cr_date, check_or_date,
                    check_TPL_date, user_permission)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    
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
    queryset = User.objects.all()   # add this
    serializer_class = UserSerializer  # add this
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
    queryset = Permission.objects.all().order_by('id')
    serializer_class = UserListSerializer            
    filter_backends = [DjangoFilterBackend]
    filterset_fields  = ['can_view_users','can_add_users','can_edit_users','can_delete_users',
                  'can_view_inventory','can_add_inventory','can_edit_inventory','can_delete_inventory',
                  'can_view_inspection_reports','can_add_inspection_reports','can_edit_inspection_reports',
                  'can_delete_inspection_reports','can_view_maintenance_reports','can_add_maintenance_reports',
                  'can_edit_maintenance_reports','can_delete_maintenance_reports','can_view_repair_reports',
                  'can_add_repair_reports','can_edit_repair_reports','can_delete_repair_reports','can_view_task',
                  'can_add_task','can_edit_task','can_delete_task']


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
    def maintenance(self, request, pk=None):     # update report permission
        user = self.request.user
        if user_permission(user, 'can_edit_users'): # permission
            queryset = Permission.objects.all()
            users = get_object_or_404(queryset, user__username=pk) # get user
            serializer = PermissionMaintenanceReportSerializer(instance=users, data=request.data)
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
    def add_maintenance_list(self, request):        # User List
        user = self.request.user
        if user_permission(user, 'can_view_users'): # permission
            queryset = User.objects.all().filter(permission__can_add_maintenance_reports=True)
            serializer = UserSerializer(queryset, many=True)
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



class JobOrderView(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = JobOrderSerializer

    @action(detail=False)
    def maintenance_list(self, request):
        user = self.request.user
        if user_permission(user, 'can_view_task'):
            queryset = JobOrder.objects.all().filter(type=True) # get all True(Maintenance)
            serializer = JobOrderSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=False)
    def maintenance_created(self, request):
        user = self.request.user
        if user_permission(user, 'can_add_task'):
            # filter the used job order in maintenance table
            maintenance = Maintenance.objects.values_list('job_order', flat=True)
            # filter True(Maintenance) and used job order
            queryset = JobOrder.objects.filter(type=True).filter(job_no__in=maintenance) 
            # filter the job order with the fieldman = current user 
            queryset = queryset.filter(task__fieldman__field_man=user.pk)
            serializer = JobOrderSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=False)
    def maintenance_not_created(self, request):
        user = self.request.user
        if user_permission(user, 'can_add_task'):
            # filter the used job order in maintenance table
            maintenance = Maintenance.objects.all().values_list('job_order', flat=True)
            # filter True(Maintenance) and remove all used job order
            queryset = JobOrder.objects.all().filter(type=True).exclude(job_no__in=maintenance)
            # filter the job order with the fieldman = current user 
            queryset = queryset.filter(task__fieldman__field_man=user.pk)
            serializer = JobOrderSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=False)
    def repair_list(self, request):
        user = self.request.user
        if user_permission(user, 'can_view_task'):
            queryset = JobOrder.objects.all().filter(type=False)
            serializer = JobOrderSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=False)
    def repair_created(self, request):
        user = self.request.user
        if user_permission(user, 'can_add_task'):
            maintenance = Maintenance.objects.values_list('job_order', flat=True)
            queryset = JobOrder.objects.filter(type=False).filter(job_no__in=maintenance)
            queryset = queryset.filter(task__fieldman__field_man=user.pk)
            serializer = JobOrderSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=False)
    def repair_not_created(self, request):
        user = self.request.user
        if user_permission(user, 'can_add_task'):
            maintenance = Maintenance.objects.all().values_list('job_order', flat=True)
            queryset = JobOrder.objects.all().filter(type=False).exclude(job_no__in=maintenance)
            queryset = queryset.filter(task__fieldman__field_man=user.pk)
            serializer = JobOrderSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


class CarView(viewsets.ModelViewSet):  # add this
    permission_classes = [IsAuthenticated]
    queryset = Car.objects.all()  # add this
    serializer_class = CarSerializer  # add this
    search_fields = ['body_no', 'plate_no', 'vin_no']
    filter_backends = [filters.SearchFilter]
    lookup_field = 'slug'


class CarListView(generics.ListAPIView):  #list of all car with filtering
    permission_classes = [IsAuthenticated]
    queryset = Car.objects.all().order_by('car_id')  # add this
    serializer_class = CarInfoSerializer  # add this
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['body_no', 'plate_no', 'vin_no','make','current_loc']
    pagination_class=None


class SearchInventoryView(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        value = request.query_params.get('search_field', None)
        queryset = Car.objects.only(value)
        serializer = SearchInventorySerializer(queryset, many=True, fields=[str(value)])
        return Response(serializer.data)


class ContractView(viewsets.ModelViewSet):  # add this
    permission_classes = [IsAuthenticated]
    queryset = Contract.objects.all()  # add this
    serializer_class = ContractSerializer  # add this
    lookup_field = 'slug'


class TPLView(viewsets.ModelViewSet):  # add this
    permission_classes = [IsAuthenticated]
    queryset = TPL.objects.all()  # add this
    serializer_class = TPLSerializer  # add this
    lookup_field = 'slug'


class InsuranceView(viewsets.ModelViewSet):  # add this
    permission_classes = [IsAuthenticated]
    queryset = Insurance.objects.all()  # add this
    serializer_class = InsuranceSerializer  # add this
    lookup_field = 'slug'
    

class InsuranceList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = InsuranceSerializer

    def get_queryset(self):
        username = self.kwargs['username']
        return Insurance.objects.filter(car=username)



class TotalView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = TotalCarSerializer
    queryset = Car.objects.all().order_by('date_created')[:1]


class ExpiryView(APIView): # expiry 
    permission_classes = [IsAuthenticated]
    def get(self, request):
        year = request.data.get('year')
        print(year)
        return Response({
            'OR':check_or_date(year), # OR
            'CR':check_cr_date(year), # CR
            'TPL':check_TPL_date(year), # TPL Insurance
            'Com':check_Com_date(year), # Comprehensive Insurance
            })
