from datetime import datetime as date

from rest_framework.generics import get_object_or_404

from report.models import Maintenance
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Fieldman, JobOrder, Task
from .serializers import JobOrderSerializer, TaskSerializer, WarningTaskSerializer
from .utils import user_permission


class TaskView(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticated]
    queryset = Task.objects.all().order_by('task_id')
    serializer_class = TaskSerializer

    def create(self, request):  # create user
        # user = self.request.user
        # if user_permission(user, 'can_add_task'): 
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            print()
        return Response(status=status.HTTP_201_CREATED)          
        # else:
        #     return Response(status=status.HTTP_401_UNAUTHORIZED)   
    
    # def update(self, request, pk=None):    
    #     user = self.request.user
    #     if user_permission(user, 'can_edit_task'):  
    #         queryset = Task.objects.all()
    #         task = get_object_or_404(queryset, pk=pk)   
    #         serializer = TaskSerializer(instance=task, data=request.data)
    #         if serializer.is_valid(raise_exception=True):
    #             serializer.save()
    #         return Response(serializer.data, status=status.HTTP_200_OK)       
    #     else:
    #         return Response(status=status.HTTP_401_UNAUTHORIZED)
            
    # def destroy(self, request, pk=None):       
    #     user = self.request.user
    #     if user_permission(user, 'can_delete_task'): 
    #         queryset = Task.objects.all()
    #         users = get_object_or_404(queryset, pk=pk)    # get user
    #         users.delete()
    #         return Response(status=status.HTTP_200_OK)        
    #     else: 
    #         return Response(status=status.HTTP_401_UNAUTHORIZED) 

    @action(detail=False)     
    def warning_list(self, request):       
        # user = self.request.user   
        # if user_permission(user, 'can_view_task'): 
        start_date = date.strptime(request.data.get('start_date'), '%Y-%m-%d')
        end_date = date.strptime(request.data.get('end_date'), '%Y-%m-%d')
        fieldmans_data = request.data.get('fieldman')
        fieldman = []
        for fieldman_data in fieldmans_data:
            fieldman.append(fieldman_data['field_man'])
        queryset = Task.objects.filter(fieldman__field_man__username__in=fieldman)
        queryset = queryset.filter(start_date__gte=start_date)
        queryset = queryset.filter(end_date__lte=end_date)
        serializer = WarningTaskSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)            
        # else:
        #     return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    @action(detail=True, methods=['put'])
    def status_fm(self, request, pk=None):     
        # user = self.request.user
        # if user_permission(user, 'can_edit_task'): 
        queryset = Task.objects.all()
        task = get_object_or_404(queryset, pk=pk)    # get user
        print(task.task_status_fm)
        if task.task_status_fm == False:
            task.task_status_fm = True;
        else:
            task.task_status_fm = False;
        task.save()
        return Response("success",status=status.HTTP_200_OK)       
        # else:
        #     return Response(status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=True, methods=['put'])
    def status_mn(self, request, pk=None):     
        # user = self.request.user
        # if user_permission(user, 'can_edit_task'): 
        queryset = Task.objects.all()
        task = get_object_or_404(queryset, pk=pk)    # get user
        print(task.task_status_mn)
        if task.task_status_mn == False:
            task.task_status_mn = True;
        else:
            task.task_status_mn = False;
        task.save()
        return Response("success",status=status.HTTP_200_OK)       
        # else:
        #     return Response(status=status.HTTP_401_UNAUTHORIZED)

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
