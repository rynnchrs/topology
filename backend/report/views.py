import datetime
from datetime import datetime as date
from os import remove
from wsgiref.util import FileWrapper

from car.models import Car
from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django_filters import rest_framework as filter
from rest_framework import filters, generics, status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from reversion.models import Version

from .export import export
from .filters import InspectionFilter
from .models import Inspection, Maintenance, Repair
from .serializers import (InspectionLastFourListSerializer,
                          InspectionListSerializer, InspectionSerializer,
                          MaintenanceListSerializer, MaintenanceSerializer,
                          RepairListSerializer, RepairSerializer)
from .utils import maintenance_reversion, reversion, user_permission


class InspectionView(viewsets.ViewSet):  # inspection report Form
    permission_classes = [IsAuthenticated]
    serializer_class = InspectionSerializer

    def list(self, request):        
        user = self.request.user
        queryset = Inspection.objects.all().filter(driver=user.id).order_by('-inspection_id')[:4]
        serializer = InspectionLastFourListSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)    

    @action(detail=False)
    def can_view_list(self, request): 
        user = self.request.user
        if user_permission(user, 'can_view_inspection_reports'):
            queryset = Inspection.objects.all().order_by('inspection_id')
            serializer = InspectionListSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)    
        else:
            queryset = Inspection.objects.filter(driver=user.id).order_by('inspection_id')
            serializer = InspectionListSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)    

    def create(self, request): # create report 
        user = self.request.user
        if user_permission(user, 'can_add_inspection_reports'):
            serializer = InspectionSerializer(data=request.data) 
            if serializer.is_valid(raise_exception=True): 
                car = request.data.get("body_no")
                car = Car.objects.get(body_no=car)
                try:
                    inspection = Inspection.objects.all().filter(body_no=car.car_id).filter(date_created=datetime.date.today())[0]
                except:
                    serializer.save() # add this
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                inspection = Inspection.objects.get(pk=inspection.pk)
                reversion = Version.objects.get_for_object(inspection)
                reversion.delete()
                inspection.delete()
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    def retrieve(self, request, pk=None): #retrieve inspection
        user = self.request.user
        queryset =  Inspection.objects.all()
        inspection = get_object_or_404(queryset, pk=pk)
        if user_permission(user, 'can_view_inspection_reports'):
            return Response(reversion(inspection), status=status.HTTP_200_OK)
        else:
            if str(inspection.driver) == user.username:       # if current user is equal to pk
                return Response(reversion(inspection), status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    def update(self, request, pk=None): # update inspection
        user = self.request.user
        if user_permission(user, 'can_edit_inspection_reports'):
            queryset =  Inspection.objects.all()
            inspection = get_object_or_404(queryset, pk=pk)
            serializer = InspectionSerializer(instance=inspection, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)    
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def export_post(self, request, pk=None):
        # print(request.data)
        inspection_id = []
        if len(request.data['inspection_id']) == 0:
            return Response("Failed to generate.",status=status.HTTP_400_BAD_REQUEST)            
        for data in (request.data['inspection_id']):
            inspection_id.append(data)
            try:
                inspection = Inspection.objects.get(inspection_id=data)
            except Inspection.DoesNotExist:
                return Response("Failed to generate.",status=status.HTTP_400_BAD_REQUEST)
        inspection = Inspection.objects.all().filter(inspection_id__in=inspection_id)
        if export(inspection):
            return Response("Excel generated",status=status.HTTP_200_OK)
        else:
            return Response("Failed to generate.",status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False,permission_classes=[AllowAny])
    def export_get(self, request):
        # print(request.data)
        filename = '{date}-Inspection-Report.xlsx'.format(
        date=date.now().strftime('%Y-%m-%d'))

        file_path = '.'+settings.MEDIA_URL+filename
        file = open(file_path,"rb")
        response = HttpResponse(FileWrapper(file),
         content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )
        response['Content-Disposition'] = 'attachment; filename=' + filename
        file = remove(file_path)
        return response


class InspectionListView(generics.ListAPIView): #list of inspection with filtering
    permission_classes = [IsAuthenticated]
    # queryset = Inspection.objects.all().order_by('inpsection_id')
    serializer_class = InspectionListSerializer
    filter_backends = [filter.DjangoFilterBackend, filters.OrderingFilter]
    filterset_class = InspectionFilter
    ordering_fields = ['body_no__body_no', 'date_created', 'inspection_id']

    def get_queryset(self):
        user = self.request.user
        if user_permission(user, 'can_edit_inspection_reports'):
            queryset = Inspection.objects.all().order_by('inspection_id')
        else:
            queryset = Inspection.objects.filter(driver=user.id).order_by('inspection_id')
        return queryset


class MaintenanceView(viewsets.ViewSet):  # inspection report Form
    permission_classes = [IsAuthenticated]
    serializer_class = MaintenanceSerializer

    def create(self, request): # create report 
        user = self.request.user
        if user_permission(user,'can_add_maintenance_reports'):
            serializer = MaintenanceSerializer(data=request.data) 
            if serializer.is_valid(raise_exception=True): 
                serializer.save()
                return Response(status=status.HTTP_201_CREATED)
            return Response(serializer.errors) 
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    def retrieve(self, request, pk=None): #retrieve inspection
        user = self.request.user
        queryset =  Maintenance.objects.all()
        maintenance = get_object_or_404(queryset, pk=pk)
        if user_permission(user,'can_view_maintenance_reports'):
            return Response(maintenance_reversion(maintenance), status=status.HTTP_200_OK)
        else:
            if str(maintenance.inspected_by) == user.username:       # if current user is equal to pk
                return Response(maintenance_reversion(maintenance), status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    def update(self, request, pk=None): # update inspection
        user = self.request.user
        if user_permission(user,'can_edit_maintenance_reports'):
            queryset =  Maintenance.objects.all()
            maintenance = get_object_or_404(queryset, pk=pk)
            serializer = MaintenanceSerializer(instance=maintenance, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)    
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


class MaintenanceListView(generics.ListAPIView): #list of inspection with filtering
    permission_classes = [IsAuthenticated]
    queryset = Maintenance.objects.all().order_by('maintenance_id')
    serializer_class = MaintenanceListSerializer       
    filter_backends = [filter.DjangoFilterBackend,filters.OrderingFilter]
    filterset_fields = ['maintenance_id','body_no__body_no', 'body_no__vin_no', 'date_created', 'body_no__current_loc']
    ordering_fields = ['body_no__body_no', 'date_created', 'maintenance_id']


class RepairView(viewsets.ModelViewSet):  # add this
    permission_classes = [IsAuthenticated]
    queryset = Repair.objects.all()  # add this
    serializer_class = RepairSerializer  # add this
    search_fields = ['vin_no__vin_no','date_created']
    filter_backends = [filters.SearchFilter]

    def list(self, request): # list of all repair
        queryset =  Repair.objects.all()
        serializer = RepairListSerializer(queryset, many=True)
        return Response(serializer.data)
