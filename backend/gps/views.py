from rest_framework import status, viewsets
from rest_framework import generics
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

  
class GPSView(generics.ListAPIView): #list of inspection with filtering
    permission_classes = [IsAuthenticated]
    queryset = GPS.objects.all().order_by('-gps_id')
    serializer_class = GPSSerializer
    # filter_backends = [filter.DjangoFilterBackend, filters.OrderingFilter]
    # filterset_class = InspectionFilter
    # ordering_fields = ['body_no__body_no', 'date_created', 'inspection_id']

    # def get_queryset(self):
    #     user = self.request.user
    #     if user_permission(user, 'can_add_checklist'):
    #         queryset = GPS.objects.all().order_by('-gps_id')
    #     return queryset