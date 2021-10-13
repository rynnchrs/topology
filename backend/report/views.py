import datetime
from datetime import datetime as date
from os import remove
from wsgiref.util import FileWrapper

from django.db.models.deletion import ProtectedError

from car.models import Car
from django.conf import settings
from django.contrib.auth.models import User
from django.db.models import query
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django_filters import rest_framework as filter
from image.models import Image
from rest_framework import filters, generics, status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.utils import serializer_helpers
from reversion.models import Version
from task.models import JobOrder, Task

from .export import export, repair_export
from .filters import CheckListFilter, InspectionFilter, RepairFilter
from .models import CheckList, CheckListParts, Cost, Inspection, Repair
from .serializers import (CheckListListSerializer, CheckListPartsSerializer,
                          CheckListSerializer, CostSerializer,
                          InspectionLastFourListSerializer,
                          InspectionListSerializer, InspectionSerializer,
                          RepairListSerializer, RepairSerializer)
from .utils import (analysis, checklist_reversion, repair_reversion, reversion,
                    user_permission)


class InspectionView(viewsets.ViewSet):  # inspection report Form
    permission_classes = [IsAuthenticated]
    serializer_class = InspectionSerializer

    def list(self, request):        
        user = self.request.user
        queryset = Inspection.objects.all().filter(driver=user.id).order_by('-inspection_id')[:4]
        serializer = InspectionLastFourListSerializer(queryset, many=True)
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
        if not user_permission(user, 'can_edit_inspection_reports'):
            if str(inspection.driver) == user.username:       # if current user is equal to pk
                return Response(reversion(inspection), status=status.HTTP_200_OK)
            elif user_permission(user, 'can_show_all_inspection_reports'):
                return Response(reversion(inspection), status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_401_UNAUTHORIZED)
        elif user_permission(user, 'can_view_inspection_reports'):
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
        filename = '{date}-Inspections.xlsx'.format(
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
        if user_permission(user, 'can_show_all_inspection_reports'):
            queryset = Inspection.objects.all().order_by('inspection_id')
        else:
            queryset = Inspection.objects.filter(driver=user.id).order_by('inspection_id')
        return queryset

class CanViewListView(generics.ListAPIView): #list of inspection with filtering
    permission_classes = [IsAuthenticated]
    # queryset = Inspection.objects.all().order_by('inpsection_id')
    serializer_class = InspectionListSerializer
    filter_backends = [filter.DjangoFilterBackend, filters.OrderingFilter]
    filterset_class = InspectionFilter
    ordering_fields = ['body_no__body_no', 'date_created', 'inspection_id']

    def get_queryset(self):
        user = self.request.user
        if user_permission(user, 'can_show_all_inspection_reports'):
            queryset = Inspection.objects.all().order_by('inspection_id')
        else:
            queryset = Inspection.objects.filter(driver=user.id).order_by('inspection_id')
        return queryset

class RepairView(viewsets.ModelViewSet):  # add this
    permission_classes = [IsAuthenticated]
    queryset = Repair.objects.all().order_by('-repair_id')  # add this
    serializer_class = RepairSerializer  # add this
    filter_backends = [filter.DjangoFilterBackend, filters.OrderingFilter]
    filterset_class = RepairFilter
    ordering_fields = ['repair_id', 'date_created']
    
    def list(self, request): 
        user = self.request.user   
        if user_permission(user, 'can_view_repair_reports'): 
            queryset = self.filter_queryset(self.get_queryset())
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = RepairListSerializer(page, many=True)
                return self.get_paginated_response(serializer.data)      
            serializer = RepairListSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def create(self, request):
        user = self.request.user
        if user_permission(user, 'can_add_repair_reports'): 
            request.data['diagnosed_by'] = user.id 
            request.data['generated_by'] = user.id 
            request.data['repair_by'] = user.id 
            request.data['noted_by'] = ""
            cost = request.data['parts'] + request.data['labor']
            request.data['cost'] = cost
            serializer = RepairSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                job = JobOrder.objects.get(pk=request.data['job_order'])
                car = Car.objects.get(body_no=job.task.body_no.body_no)
                if request.data['status_repair'] == "Operational":
                    car.operational = True
                else:
                    car.operational = False
                car.save()
                serializer.save()
                return Response(serializer.data,status=status.HTTP_201_CREATED)  
            return Response(serializer.errors)        
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)    

    def retrieve(self, request, pk=None):  
        user = self.request.user
        if user_permission(user,'can_view_repair_reports'): 
            queryset = Repair.objects.all()
            repair = get_object_or_404(queryset, pk=pk) 
            serializer = RepairSerializer(repair,many=False)

            parts = Cost.objects.filter(ro_no=repair, cost_type="P")
            labor = Cost.objects.filter(ro_no=repair, cost_type="L")
            serializer_data = serializer.data
            parts = CostSerializer(parts, many=True)
            serializer_data['parts'] = parts.data
            labor = CostSerializer(labor, many=True)
            serializer_data['labor'] = labor.data
            serializer_data['revised'] = repair_reversion(repair)
            return Response(serializer_data, status=status.HTTP_200_OK)          
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def update(self, request, pk=None):
        user = self.request.user
        if user_permission(user, 'can_edit_repair_reports'): 
            request.data['diagnosed_by'] = user.id 
            request.data['generated_by'] = user.id 
            request.data['repair_by'] = user.id 
            request.data['approved_by'] = "" 
            cost = request.data['parts'] + request.data['labor']
            request.data['cost'] = cost
            queryset = Repair.objects.all()
            repair = get_object_or_404(queryset, pk=pk)   
            serializer = RepairSerializer(instance=repair, data=request.data)
            if serializer.is_valid(raise_exception=True):
                job = JobOrder.objects.get(pk=request.data['job_order'])
                car = Car.objects.get(body_no=job.task.body_no.body_no)
                if request.data['status_repair'] == "Operational":
                    car.operational = True
                else:
                    car.operational = False
                car.save()
                serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)       
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
            
    def destroy(self, request, pk=None):      
        user = self.request.user
        if user_permission(user, 'can_delete_repair_reports'): 
            queryset = Repair.objects.all()
            repair = get_object_or_404(queryset, pk=pk)
            repair.delete()
            queryset = Image.objects.filter(image_name=pk ,mode="cr")
            for image in queryset:
                try:
                    image.image.delete(save=False)
                    image.delete()
                except:
                    pass
            return Response("Successfully Deleted",status=status.HTTP_200_OK)        
        else: 
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=True,  methods=['put'])  # edit the noted_by Field
    def approved(self, request, pk=None):
        user = self.request.user
        if user_permission(user, 'can_edit_task'): 
            queryset = Repair.objects.all()
            repair = get_object_or_404(queryset, job_order=pk) 
            if repair.noted_by is None:  
                repair.noted_by = user
                repair.save()    
            else:
                return Response("Already approved",status=status.HTTP_400_BAD_REQUEST)

            return Response("Successfully Added", status=status.HTTP_200_OK)       
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def export_post(self, request, pk=None):
        repair_id = []
        if len(request.data['repair_id']) == 0:
            return Response("Failed to generate.",status=status.HTTP_400_BAD_REQUEST)            
        for data in (request.data['repair_id']):
            repair_id.append(data)
            try:
                repair = Repair.objects.get(repair_id=data)
            except Repair.DoesNotExist:
                return Response("Failed to generate.",status=status.HTTP_400_BAD_REQUEST)
        repair = Repair.objects.all().filter(repair_id__in=repair_id)
        if repair_export(repair):
            return Response("Excel generated",status=status.HTTP_200_OK)
        else:
            return Response("Failed to generate.",status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False,permission_classes=[AllowAny])
    def export_get(self, request):
        filename = '{date}-Repair.xlsx'.format(
        date=date.now().strftime('%Y-%m-%d'))

        file_path = '.'+settings.MEDIA_URL+filename
        file = open(file_path,"rb")
        response = HttpResponse(FileWrapper(file),
         content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )
        response['Content-Disposition'] = 'attachment; filename=' + filename
        file = remove(file_path)
        return response


class CheckListPartsView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = CheckListParts.objects.all()
    serializer_class = CheckListPartsSerializer

    def list(self, request):
        user = self.request.user
        if user_permission(user, 'can_add_repair_reports'): 
            queryset = self.filter_queryset(self.get_queryset())
            serializer = CheckListPartsSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)  


    def create(self, request):
        user = self.request.user
        if user_permission(user, 'can_add_repair_reports'): 
            serializer = CheckListPartsSerializer(data=request.data, many=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data,status=status.HTTP_201_CREATED)  
            return Response(serializer.errors)        
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)  

    def destroy(self, request, pk=None):
        user = self.request.user
        if user_permission(user, 'can_add_repair_reports'): 
            queryset = self.filter_queryset(self.get_queryset().filter(pk=pk))
            queryset.delete()
            return Response("deleted", status=status.HTTP_200_OK)        
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)  


class CheckListView(viewsets.ModelViewSet):  # add this
    permission_classes = [IsAuthenticated]
    queryset = CheckList.objects.all().order_by('-check_list_id')  # add this
    serializer_class = CheckListSerializer  # add this
    filter_backends = [filter.DjangoFilterBackend, filters.OrderingFilter]
    filterset_class = CheckListFilter
    ordering_fields = ['check_list_id', 'date_created']
    
    def list(self, request): 
        user = self.request.user   
        if user_permission(user, 'can_view_repair_reports'): 
            queryset = self.filter_queryset(self.get_queryset())
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = CheckListListSerializer(page, many=True)
                return self.get_paginated_response(serializer.data)      
            serializer = CheckListListSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

            
    def create(self, request):
        user = self.request.user
        if user_permission(user, 'can_add_repair_reports'): 
            serializer = CheckListSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                car = Car.objects.get(body_no=request.data['body_no'])
                if request.data['status'] == "Operational":
                    car.operational = True
                else:
                    car.operational = False
                car.save()
                serializer.save()
                return Response(serializer.data,status=status.HTTP_201_CREATED)  
            return Response(serializer.errors)        
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)    

    def retrieve(self, request, pk=None):  
        user = self.request.user
        if user_permission(user,'can_view_repair_reports'): 
            queryset = self.filter_queryset(self.get_queryset())
            check_list = get_object_or_404(queryset, pk=pk) 
            serializer = CheckListSerializer(check_list,many=False)
            serializer_data = serializer.data
            serializer_data['analysis'] = analysis(serializer_data)
            serializer_data['revised'] = checklist_reversion(check_list)
            return Response(serializer_data, status=status.HTTP_200_OK)          
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def update(self, request, pk=None):
        user = self.request.user
        if user_permission(user, 'can_edit_repair_reports'): 
            queryset = self.filter_queryset(self.get_queryset())
            check_list = get_object_or_404(queryset, pk=pk) 
            serializer = CheckListSerializer(instance=check_list, data=request.data)
            if serializer.is_valid(raise_exception=True):
                car = Car.objects.get(body_no=request.data['body_no'])
                if request.data['status'] == "Operational":
                    car.operational = True
                else:
                    car.operational = False
                car.save()
                serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)       
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
            
    
    def destroy(self, request, pk=None):      
        user = self.request.user
        if user_permission(user, 'can_delete_repair_reports'): 
            try:
                queryset = CheckList.objects.all()
                repair = get_object_or_404(queryset, pk=pk)
                repair.delete()
                queryset = Image.objects.filter(image_name=pk ,mode="cl")
                for image in queryset:
                    try:
                        image.image.delete(save=False)
                        image.delete()
                    except:
                        pass
                return Response("Successfully Deleted",status=status.HTTP_200_OK)      
            except ProtectedError:
                return Response("Can't delete this because it's being use by Task Scheduling", status=status.HTTP_200_OK)    
        else: 
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=False)
    def task_not_created(self, request):
        user = self.request.user
        if user_permission(user, 'can_add_task'):
            # filter the used job order in inspection table
            check_list = Task.objects.all().values_list('check_list', flat=True)
            # filter True(inspection) and remove all used job order
            check_list = [i for i in check_list if i is not None]
            queryset = CheckList.objects.all().exclude(pk__in=check_list)
            serializer = CheckListListSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
