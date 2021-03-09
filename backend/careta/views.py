from abc import abstractmethod
from django.shortcuts import render
from rest_framework import viewsets  # add this
from .serializers import CarSerializer, ContractSerializer, PermissionInventorySerializer, PermissionInspectionReportSerializer, PermissionMaintenanceReportSerializer, PermissionRepairReportSerializer, PermissionSerializer, PermissionTaskSerializer, TPLSerializer, InsuranceSerializer, UserSerializer, UpdateUserSerializer , PermissionUserSerializer, ReportSerializer, SearchInventorySerializer# add this
from .models import Car, Contract, Permission, TPL, Insurance, UserInfo, Report  # add this

from rest_framework import generics, status     # add this
from rest_framework.response import Response    # add this
from rest_framework.views import APIView    # add this
from django.contrib.auth.models import User     # add this
from rest_framework_simplejwt.tokens import RefreshToken    # add this
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend # filter
from rest_framework import filters # filter 

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
        except Exception as e:  
            return Response(status=status.HTTP_400_BAD_REQUEST) 

class UserView(viewsets.ModelViewSet):   # User ModelViewSet view, create, update, delete

    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()   # add this
    serializer_class = UserSerializer  # add this

    def list(self, request):        # User List
        user = self.request.user
        permission = Permission.objects.get(slug=user.username) # get users permission
        user = User.objects.get(username=user)
        if permission.can_view_users == True:    # permission
            queryset = User.objects.all()
            serializer = UserSerializer(queryset, many=True)
            return Response(serializer.data)            
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def create(self, request):  # create user
        user = self.request.user
        permission = Permission.objects.get(slug=user.username) # get users permission
        user = User.objects.get(username=user)  # get current user
        if permission.can_add_users == True:      # permission
            serializer = UserSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
            return Response(serializer.data)          
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
            
    def retrieve(self, request, pk=None):   # retrieve user
        user = self.request.user
        permission = Permission.objects.get(slug=user)  # get users permission
        user = User.objects.get(username=user)      # get current user
        if permission.can_view_users == True:       # permission
            queryset = User.objects.all()
            users = get_object_or_404(queryset, username=pk)    # get user
            serializer = UserSerializer(users,  many=False)
            return Response(serializer.data)          
        else:
            if pk == permission.slug:       # if current user is equal to pk
                serializer = UserSerializer(user,  many=False)
                return Response(serializer.data)
            else:    
                return Response(status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):     # update user
        user = self.request.user
        permission = Permission.objects.get(slug=user) # get users permission
        user = User.objects.get(username=user)  # get current user
        if permission.can_edit_users == True:   # permission
            queryset = User.objects.all()
            users = get_object_or_404(queryset, username=pk)    # get user
            serializer = UpdateUserSerializer(instance=users, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
            return Response(serializer.data)       
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):       # delete user
        user = self.request.user    
        permission = Permission.objects.get(slug=user)      # get users permission
        user = User.objects.get(username=user)  # get current user
        if permission.can_delete_users == True: # permission
            queryset = User.objects.all()
            users = get_object_or_404(queryset, username=pk)    # get user
            users.delete()
            return Response('Successfully deleted.')        
        else: 
            return Response(status=status.HTTP_400_BAD_REQUEST)       

class PermissionView(viewsets.ViewSet):  # permission ViewSet
    permission_classes = [IsAuthenticated]
    serializer_class = PermissionSerializer 

    def create(self, request):      # create permission
        user = self.request.user
        permission = Permission.objects.get(slug=user.username) # get permission
        if permission.can_add_users == True:    # permission
            serializer = PermissionSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
            return Response(serializer.data)          
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):    # Permission List
        user = self.request.user
        permission = Permission.objects.get(slug=user.username)
        user = User.objects.get(username=user)
        if permission.can_view_users == True:   
            queryset = Permission.objects.all()
            serializer = PermissionSerializer(queryset, many=True)
            return Response(serializer.data)            
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):       # retrieve permission
        user = self.request.user    # get current user
        permission = Permission.objects.get(slug=user)  # get permission
        if permission.can_view_users == True:
            queryset = Permission.objects.all()
            users = get_object_or_404(queryset, slug=pk)
            serializer = PermissionSerializer(users,  many=False)
            return Response(serializer.data)          
        else:
            if pk == permission.slug:    # if current user is equal to pk
                queryset = Permission.objects.all()
                users = get_object_or_404(queryset, slug=pk)    # get user
                serializer = PermissionSerializer(users,  many=False)
                return Response(serializer.data)
            else:    
                return Response(status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):    # delete task permission
        user = self.request.user
        permission = Permission.objects.get(slug=user)  # get permission
        if permission.can_delete_users == True:     # permission
            queryset = Permission.objects.all()
            user = get_object_or_404(queryset, slug=pk) # get user
            user.delete()
            return Response('Successfully deleted.')        
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class PermissionUserView(viewsets.ViewSet): # User permission ViewSet
    permission_classes = [IsAuthenticated]
    serializer_class = PermissionUserSerializer  # add this

    # def retrieve(self, request, pk=None):
    #     queryset = Permission.objects.all()
    #     permission = get_object_or_404(queryset, slug=pk)
    #     serializer_class = PermissionUserSerializer(permission)
    #     return Response(serializer_class.data)

    def update(self, request, pk=None):     # update user permission
        user = self.request.user
        permission = Permission.objects.get(slug=user)  # get permission
        if permission.can_edit_users == True:       # permission
            queryset = Permission.objects.all()
            users = get_object_or_404(queryset, slug=pk)    # get user
            serializer = PermissionUserSerializer(instance=users, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
            return Response(serializer.data)       
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class PermissionInventoryView(viewsets.ViewSet): # Inventory permission ViewSet
    permission_classes = [IsAuthenticated]
    serializer_class = PermissionInventorySerializer
    # def retrieve(self, request, pk=None):
    #     queryset = Permission.objects.all()
    #     permission = get_object_or_404(queryset, slug=pk)
    #     serializer_class = PermissionInventorySerializer(permission)
    #     return Response(serializer_class.data)

    def update(self, request, pk=None): # update inventory permission
        user = self.request.user
        permission = Permission.objects.get(slug=user)  # get permission
        if permission.can_edit_users == True:   # permission
            queryset = Permission.objects.all()
            users = get_object_or_404(queryset, slug=pk)    # get user
            serializer = PermissionInventorySerializer(instance=users, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
            return Response(serializer.data)       
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class PermissionInspectionReport(viewsets.ViewSet): # Inspection Reports permission ViewSet
    permission_classes = [IsAuthenticated]
    serializer_class = PermissionInspectionReportSerializer
    # def retrieve(self, request, pk=None):
    #     queryset = Permission.objects.all()
    #     permission = get_object_or_404(queryset, slug=pk)
    #     serializer_class = PermissionReportSerializer(permission)
    #     return Response(serializer_class.data)

    def update(self, request, pk=None):     # update report permission
        user = self.request.user
        permission = Permission.objects.get(slug=user)  # get permission
        if permission.can_edit_users == True:   # permission
            queryset = Permission.objects.all()
            users = get_object_or_404(queryset, slug=pk) # get user
            serializer = PermissionInspectionReportSerializer(instance=users, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
            return Response(serializer.data)       
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class PermissionMaintenanceReport(viewsets.ViewSet): # Maintenance Reports permission ViewSet
    permission_classes = [IsAuthenticated]
    serializer_class = PermissionMaintenanceReportSerializer
    # def retrieve(self, request, pk=None):
    #     queryset = Permission.objects.all()
    #     permission = get_object_or_404(queryset, slug=pk)
    #     serializer_class = PermissionReportSerializer(permission)
    #     return Response(serializer_class.data)

    def update(self, request, pk=None):     # update report permission
        user = self.request.user
        permission = Permission.objects.get(slug=user)  # get permission
        if permission.can_edit_users == True:   # permission
            queryset = Permission.objects.all()
            users = get_object_or_404(queryset, slug=pk) # get user
            serializer = PermissionMaintenanceReportSerializer(instance=users, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
            return Response(serializer.data)       
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class PermissionRepairReport(viewsets.ViewSet): # Repair Reports permission ViewSet
    permission_classes = [IsAuthenticated]
    serializer_class = PermissionRepairReportSerializer
    # def retrieve(self, request, pk=None):
    #     queryset = Permission.objects.all()
    #     permission = get_object_or_404(queryset, slug=pk)
    #     serializer_class = PermissionReportSerializer(permission)
    #     return Response(serializer_class.data)

    def update(self, request, pk=None):     # update report permission
        user = self.request.user
        permission = Permission.objects.get(slug=user)  # get permission
        if permission.can_edit_users == True:   # permission
            queryset = Permission.objects.all()
            users = get_object_or_404(queryset, slug=pk) # get user
            serializer = PermissionRepairReportSerializer(instance=users, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
            return Response(serializer.data)       
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class PermissionTaskView(viewsets.ViewSet):     # Task Permission ViewSet
    permission_classes = [IsAuthenticated]
    serializer_class = PermissionTaskSerializer
    # def retrieve(self, request, pk=None):
    #     queryset = Permission.objects.all()
    #     permission = get_object_or_404(queryset, slug=pk)
    #     serializer_class = PermissionTaskSerializer(permission)
    #     return Response(serializer_class.data)

    def update(self, request, pk=None):     # update task permission
        user = self.request.user
        permission = Permission.objects.get(slug=user)  # get permission
        if permission.can_edit_users == True:       # permission
            queryset = Permission.objects.all()
            users = get_object_or_404(queryset, slug=pk)    # get user
            serializer = PermissionTaskSerializer(instance=users, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
            return Response(serializer.data)       
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class AddMaintenanceReportView(viewsets.ViewSet): # list of can add maintenance report s
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer
    def list(self, request):        # User List
        user = self.request.user
        permission = Permission.objects.get(slug=user.username) # get users permission
        if permission.can_view_users == True:    # permission
            queryset = User.objects.all().filter(permission__can_add_maintenance_reports=True)
            serializer = UserSerializer(queryset, many=True)
            return Response(serializer.data)            
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class AddInspectionReportView(viewsets.ViewSet): # list of can add Inspection reports
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer
    def list(self, request):        # User List
        user = self.request.user
        permission = Permission.objects.get(slug=user.username) # get users permission
        if permission.can_view_users == True:    # permission
            queryset = User.objects.all().filter(permission__can_add_inspection_reports=True)
            serializer = UserSerializer(queryset, many=True)
            return Response(serializer.data)            
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class AddRepairReportView(viewsets.ViewSet): # list of can add Repair reports 
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer
    def list(self, request):        # User List
        user = self.request.user
        permission = Permission.objects.get(slug=user.username) # get users permission
        if permission.can_view_users == True:    # permission
            queryset = User.objects.all().filter(permission__can_add_repair_reports=True)
            serializer = UserSerializer(queryset, many=True)
            return Response(serializer.data)            
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)   


class ReportView(viewsets.ModelViewSet):  # report Form

    queryset = Report.objects.all() 
    serializer_class = ReportSerializer
    search_fields = ['report_id','car__vin_no','body_no','make','mileage','location','cleanliness_exterior','condition_rust','decals','windows',
                    'rear_door','mirror','roof_rack','rear_step','seats','seat_belts','general_condition','vehicle_documents','main_beam',
                    'dipped_beam','side_lights','tail_lights','indicators','break_lights','reverse_lights','hazard_light','rear_fog_lights',
                    'interior_lights','screen_washer','wiper_blades','horn','radio','front_fog_lights','air_conditioning','cleanliness_engine_bay',
                    'washer_fluid','coolant_level','brake_fluid_level','power_steering_fluid','gas_level','oil_level','tyres','front_visual',
                    'rear_visual','spare_visual','wheel_brace','jack','front_right_wheel','front_left_wheel','rear_right_wheel','rear_left_wheel', 
                    'notes','date_updated','date_created']   # filtering

    filter_backends = [filters.SearchFilter, filters.OrderingFilter]  # filtering and ordering
    ordering_fields = ['car', 'date_created'] # ordering

    def create(self, request): # create report 
        serializer = ReportSerializer(data=request.data) 
        if serializer.is_valid(raise_exception=True): 
            serializer.save() # add this
            return Response("Successfully Register") 
        return Response(serializer.errors) 


class CarView(viewsets.ModelViewSet):  # add this
    queryset = Car.objects.all()  # add this
    serializer_class = CarSerializer  # add this
    search_fields = ['body_no', 'plate_no', 'vin_no']
    filter_backends = [filters.SearchFilter]
    lookup_field = 'slug'


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
