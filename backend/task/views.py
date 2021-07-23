from datetime import datetime as date

from careta.serializers import UserListSerializer
from django.contrib.auth.models import User
from django_filters import filters
from django_filters import rest_framework as filter
from report.models import Repair
from rest_framework import filters, generics, status, viewsets
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .filters import TaskFilter
from .models import Fieldman, JobOrder, Task
from .serializers import (RepairJobSerializer, RepairJobSerializer,
                          TaskSerializer, WarningTaskSerializer)
from .utils import user_permission
from car.models import Car

class TaskView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Task.objects.all().order_by('task_id')
    serializer_class = TaskSerializer

    def list(self, request):    
        user = self.request.user
        if user_permission(user, 'can_view_task'):  
            queryset = Task.objects.all().order_by('task_id')
            serializer = TaskSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)      
        else:
            queryset = Task.objects.filter(fieldman__field_man__username=user.username).order_by('task_id')
            serializer = TaskSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)     

    def create(self, request):  # create user
        user = self.request.user
        if user_permission(user, 'can_add_task'):
            request.data['manager'] = user.id
            serializer = TaskSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                car = Car.objects.get(body_no=request.data['body_no'])
                if request.data['job_order']['type'] == False:
                    car.status = "M"
                else:
                    car.status = "R"
                car.save()
                serializer.save()
            return Response("Successfully Created",status=status.HTTP_201_CREATED)          
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)   
        
    def retrieve(self, request, pk=None):    
        user = self.request.user
        queryset = Task.objects.all()
        task = get_object_or_404(queryset, pk=pk)
        if user_permission(user, 'can_view_task'):  
            serializer = TaskSerializer(instance=task, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)      
        else:
            queryset = Task.objects.all().filter(fieldman__field_man__username=user.username)
            task = get_object_or_404(queryset, pk=pk)
            serializer = TaskSerializer(instance=task, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)      
            
    def update(self, request, pk=None):    
        user = self.request.user
        if user_permission(user, 'can_edit_task'):  
            queryset = Task.objects.all()
            request.data['manager'] = user.id
            task = get_object_or_404(queryset, pk=pk)   
            serializer = TaskSerializer(instance=task, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)       
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
            
    def destroy(self, request, pk=None):  
        user = self.request.user
        if user_permission(user, 'can_delete_task'): 
            queryset = Task.objects.all()
            task = get_object_or_404(queryset, pk=pk)    # get user
            task.delete()
            queryset = JobOrder.objects.all()
            job_order = get_object_or_404(queryset, pk=task.job_order.job_id)
            job_order.delete()
            return Response("Successfully Deleted",status=status.HTTP_200_OK)        
        else: 
            return Response(status=status.HTTP_401_UNAUTHORIZED) 

    @action(detail=False)     
    def warning_list(self, request):       
        user = self.request.user   
        if user_permission(user, 'can_view_task'): 
            start_date = date.strptime(request.GET['start_date'], '%Y-%m-%d')
            end_date = date.strptime(request.GET['end_date'], '%Y-%m-%d')
            fieldmans = request.GET['fieldman']
            fieldman = fieldmans.split(",")
            queryset = Task.objects.filter(fieldman__field_man__username__in=fieldman)
            queryset = queryset.filter(start_date__gte=start_date).order_by('task_id')
            queryset = queryset.filter(end_date__lte=end_date)
            serializer = WarningTaskSerializer(queryset, many=True)
            print(fieldman)
            return Response(serializer.data, status=status.HTTP_200_OK)            
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    @action(detail=True, methods=['put'])
    def date_update(self, request, pk=None): # update the date actual by fieldman
        user = self.request.user 
        queryset = Task.objects.all().filter(fieldman__field_man__username=user.username)
        task = get_object_or_404(queryset, pk=pk) 
        if task.start_date_actual is None:
            if request.data.get('start_date_actual') != "":
                task.start_date_actual = request.data.get('start_date_actual')
        if task.end_date_actual is None:
            if request.data.get('end_date_actual') != "":
                task.end_date_actual = request.data.get('end_date_actual')
            task.save()
            return Response("Success", status=status.HTTP_200_OK)
        return Response("Already Updated",status=status.HTTP_400_BAD_REQUEST)   

    @action(detail=True, methods=['put'])
    def status_fm(self, request, pk=None):  # update by fieldman
        user = self.request.user 
        queryset = Task.objects.all().filter(fieldman__field_man__username=user.username)
        task = get_object_or_404(queryset, pk=pk)
        if task.task_status_fm == False:
            task.task_status_fm = True;
        else:
            task.task_status_fm = False;
        task.save()
        return Response("Success",status=status.HTTP_200_OK)   

    @action(detail=True, methods=['put'])
    def status_mn(self, request, pk=None):     # update by manager
        user = self.request.user
        if user_permission(user, 'can_edit_task'): 
            queryset = Task.objects.all()
            task = get_object_or_404(queryset, pk=pk)    # get user
            print(task.task_status_mn)
            if task.task_status_mn == False:
                task.task_status_mn = True;
            else:
                task.task_status_mn = False;
            
            car = Car.objects.get(body_no=task.body_no.body_no)
            car.status = "A"
            car.save()
            task.save()
            return Response("Success",status=status.HTTP_200_OK)       
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=False)
    def status_approval(self, request):  # list of all task for approval
        user = self.request.user
        if user_permission(user, 'can_view_task'):  
            queryset = Task.objects.filter(task_status_fm=True, task_status_mn=False).order_by('task_id')
            serializer = WarningTaskSerializer(queryset, many=True)
            page = self.paginate_queryset(self.filter_queryset(queryset))
            if page is not None:
                serializer = WarningTaskSerializer(page, many=True)
                return self.get_paginated_response(serializer.data) 
            serializer = WarningTaskSerializer(queryset, many=True)   
            return Response(serializer.data, status=status.HTTP_200_OK)        
        else:
            queryset = Task.objects.filter(fieldman__field_man__username=user.username).order_by('task_id')
            queryset = queryset.filter(task_status_fm=True, task_status_mn=False)
            page = self.paginate_queryset(self.filter_queryset(queryset))
            if page is not None:
                serializer = WarningTaskSerializer(page, many=True)
                return self.get_paginated_response(serializer.data) 
            serializer = WarningTaskSerializer(queryset, many=True)     
            return Response(serializer.data, status=status.HTTP_200_OK)
            
    @action(detail=False)
    def status_approved(self, request):  # List of approved task
        user = self.request.user
        if user_permission(user, 'can_view_task'):  
            queryset = Task.objects.filter(task_status_fm=True, task_status_mn=True).order_by('task_id')
            serializer = WarningTaskSerializer(queryset, many=True)
            page = self.paginate_queryset(serializer.data)
            if page is not None:
                return self.get_paginated_response(serializer.data)  
            return Response(serializer.data, status=status.HTTP_200_OK)    
        else:
            queryset = Task.objects.filter(fieldman__field_man__username=user.username).order_by('task_id')
            queryset = queryset.filter(task_status_fm=True, task_status_mn=True)
            serializer = WarningTaskSerializer(queryset, many=True)
            page = self.paginate_queryset(serializer.data)
            if page is not None:
                return self.get_paginated_response(serializer.data)   
            return Response(serializer.data, status=status.HTTP_200_OK)


class TaskListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = WarningTaskSerializer
    filter_backends = [filter.DjangoFilterBackend, filters.OrderingFilter]
    filter_class = TaskFilter
    ordering_fields = ['body_no__body_no', 'date_created', 'task_id']
    
    def get_queryset(self):
        user = self.request.user
        if user_permission(user, 'can_view_task'):  
            queryset = Task.objects.all().order_by('task_id')
        else:
            queryset = Task.objects.filter(fieldman__field_man__username=user.username).order_by('task_id')
        return queryset


class FieldmanListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserListSerializer
    filter_backends = [filter.DjangoFilterBackend, filters.OrderingFilter]
    filter_class = TaskFilter
    ordering_fields = ['body_no__body_no', 'date_created', 'task_id']
    
    def get_queryset(self):
        user = self.request.user
        if user_permission(user, 'can_add_task'):  
            queryset = User.objects.all().order_by('id')
            queryset = queryset.filter(permission__can_add_task=False, permission__can_add_repair_reports=True)
        return queryset


class JobOrderView(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = RepairJobSerializer
    
    @action(detail=False)
    def inspection_list(self, request):
        user = self.request.user
        if user_permission(user, 'can_view_task'):
            queryset = JobOrder.objects.all().filter(type=False) # get all False (inspection)
            serializer = RepairJobSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=False)
    def inspection_created(self, request):
        user = self.request.user
        if user_permission(user, 'can_add_task'):
            # filter the used job order in inspection table
            inspection = Repair.objects.values_list('job_order', flat=False)
            # filter True(inspection) and used job order
            queryset = JobOrder.objects.filter(type=False).filter(job_no__in=inspection) 
            serializer = RepairJobSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        elif user_permission(user, 'can_add_repair_reports'):
            repair = Repair.objects.all().values_list('job_order', flat=True)
            queryset = JobOrder.objects.filter(type=False).filter(job_id__in=repair)
            queryset = queryset.filter(task__fieldman__field_man=user.pk)
            serializer = RepairJobSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=False)
    def inspection_not_created(self, request):
        user = self.request.user
        if user_permission(user, 'can_add_task'):
            # filter the used job order in inspection table
            inspection = Repair.objects.all().values_list('job_order', flat=True)
            # filter True(inspection) and remove all used job order
            queryset = JobOrder.objects.all().filter(type=False).exclude(job_no__in=inspection)
            serializer = RepairJobSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        elif user_permission(user, 'can_add_repair_reports'):
            repair = Repair.objects.all().values_list('job_order', flat=True)
            queryset = JobOrder.objects.filter(type=False).exclude(job_id__in=repair)
            queryset = queryset.filter(task__fieldman__field_man=user.pk)
            serializer = RepairJobSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=False)
    def repair_list(self, request):
        user = self.request.user
        if user_permission(user, 'can_view_task'):
            queryset = JobOrder.objects.all().filter(type=True)
            serializer = RepairJobSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=False)
    def repair_created(self, request):
        user = self.request.user
        if user_permission(user, 'can_add_task'):
            repair = Repair.objects.values_list('job_order', flat=True)
            queryset = JobOrder.objects.filter(type=True).filter(job_id__in=repair)
            serializer = RepairJobSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        elif user_permission(user, 'can_add_repair_reports'):
            repair = Repair.objects.all().values_list('job_order', flat=True)
            queryset = JobOrder.objects.filter(type=True).filter(job_id__in=repair)
            queryset = queryset.filter(task__fieldman__field_man=user.pk)
            serializer = RepairJobSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=False)
    def repair_not_created(self, request):
        user = self.request.user
        if user_permission(user, 'can_add_task'):
            repair = Repair.objects.all().values_list('job_order', flat=True)
            queryset = JobOrder.objects.filter(type=True).exclude(job_id__in=repair)
            serializer = RepairJobSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        elif user_permission(user, 'can_add_repair_reports'):
            repair = Repair.objects.all().values_list('job_order', flat=True)
            queryset = JobOrder.objects.filter(type=True).exclude(job_id__in=repair)
            queryset = queryset.filter(task__fieldman__field_man=user.pk)
            serializer = RepairJobSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

