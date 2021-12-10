from django.contrib.auth.models import User
from django.db.models.deletion import ProtectedError
from notifications.signals import notify
from rest_framework import generics, status, viewsets
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import GPS, Record
from .serializer import GPSSerializer, RecordSerializer
from .utils import user_permission


class RecordView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Record.objects.all().order_by('-record_id')
    serializer_class = RecordSerializer
    
    # def list(self, request):    
    #     user = self.request.user
    #     if user_permission(user, 'can_add_checklist'):  
    #         queryset = self.filter_queryset(self.get_queryset())
    #         page = self.paginate_queryset(queryset)
    #         if page is not None:
    #             serializer = EmailSerializer(page, many=True)
    #             return self.get_paginated_response(serializer.data)      
    #         serializer = EmailSerializer(queryset, many=True)
    #         return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        queryset = self.filter_queryset(self.get_queryset())
        try:
            record = queryset.filter(device_id__device_id=pk)[0]
        except Record.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = RecordSerializer(instance=record, many=False)
        return Response(serializer.data,status=status.HTTP_200_OK)

  
class GPSView(viewsets.ModelViewSet): #list of inspection with filtering
    permission_classes = [IsAuthenticated]
    queryset = GPS.objects.all().order_by('-gps_id')
    serializer_class = GPSSerializer
    # filter_backends = [filter.DjangoFilterBackend, filters.OrderingFilter]
    # filterset_class = InspectionFilter
    # ordering_fields = ['body_no__body_no', 'date_created', 'inspection_id']

    def list(self, request): 
        user = self.request.user   
        if user_permission(user, 'can_view_checklist'): 
            queryset = self.filter_queryset(self.get_queryset())
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = GPSSerializer(page, many=True)
                return self.get_paginated_response(serializer.data)      
            serializer = GPSSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
            
    def create(self, request):
        user = self.request.user
        if user_permission(user, 'can_add_checklist'): 
            serializer = GPSSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                sender = User.objects.get(username=user.username)
                recipients = User.objects.filter(permission__can_add_task=True)
                message = f"Device id {str(request.data['device_id'])} is register for Car {str(request.data['body_no'])}."
                notify.send(sender, recipient=recipients,  target=serializer.save(), 
                                level='info', verb='gps,create', description=message)
                return Response(serializer.data,status=status.HTTP_201_CREATED)  
            return Response(serializer.errors)        
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def retrieve(self, request, pk=None):  
        user = self.request.user
        if user_permission(user,'can_view_checklist'): 
            queryset = self.filter_queryset(self.get_queryset())
            gps = get_object_or_404(queryset, pk=pk) 
            serializer = GPSSerializer(gps,many=False)
            serializer_data = serializer.data
            notifs = user.notifications.filter(target_object_id=pk, verb__startswith='gps')
            for notif in notifs:
                notif.mark_as_read()
            return Response(serializer_data, status=status.HTTP_200_OK)          
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def update(self, request, pk=None):
        user = self.request.user
        if user_permission(user, 'can_edit_checklist'): 
            queryset = self.filter_queryset(self.get_queryset())
            gps = get_object_or_404(queryset, pk=pk) 
            serializer = GPSSerializer(instance=gps, data=request.data)
            if serializer.is_valid(raise_exception=True):
                sender = User.objects.get(username=user.username)
                recipients = User.objects.filter(permission__can_add_task=True)
                message = f"Device id {str(gps.device_id)} for Car {str(gps.body_no)} is  updated."
                notify.send(sender, recipient=recipients,  target=serializer.save(), 
                                level='info', verb='gps,update', description=message)
            return Response(serializer.data, status=status.HTTP_200_OK)       
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
                        
    def destroy(self, request, pk=None):      
        user = self.request.user
        if user_permission(user, 'can_delete_checklist'): 
            try:
                queryset = self.filter_queryset(self.get_queryset())
                gps = get_object_or_404(queryset, pk=pk)
                sender = User.objects.get(username=user.username)
                recipients = User.objects.filter(permission__can_add_task=True)
                message = f"Device id {str(gps.device_id)} for Car {str(gps.body_no)} is deleted."
                notify.send(sender, recipient=recipients, level='info', 
                                verb='gps,delete', description=message)
                gps.delete()
                return Response("Successfully Deleted",status=status.HTTP_200_OK)      
            except ProtectedError:
                return Response("Can't delete this because it's being use by Task Scheduling", status=status.HTTP_200_OK)    
        else: 
            return Response(status=status.HTTP_401_UNAUTHORIZED)
