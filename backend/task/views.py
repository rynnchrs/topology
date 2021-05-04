
from report.models import Maintenance
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import JobOrder
from .serializers import JobOrderSerializer
from .utils import user_permission


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
