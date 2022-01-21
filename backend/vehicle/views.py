from datetime import datetime, timedelta

from car.models import Car
from django.db.models import Count
from django.db.models.functions import TruncDate
from django.shortcuts import render
from django_filters import rest_framework as filter
from gps.models import Record, GPS
from gps.serializer import RecordSerializer
from rest_framework import filters, generics, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .filters import VehicleDeploymentFilter

# Create your views here.

class VehicleQuantityView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Car.objects.all()
    serializer_class = RecordSerializer
    
    @action(detail=False)
    def daily(self, request):
        queryset = self.filter_queryset(self.get_queryset()).count()
        return Response({"vehicle": (queryset) })


class VehicleDeploymentView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = RecordSerializer
    queryset = Record.objects.filter(totaldistancetoday__gt = 0).values('statisticsday').annotate(used=Count('device_id', distinct=True))
    filter_class = VehicleDeploymentFilter
    
    @action(detail=False)
    def daily(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        total_cars = Car.objects.all().count()
        deployed_cars = GPS.objects.all().count()
        for query in queryset:
            query['not_used'] = int(query['used']) - deployed_cars
            query['deployed'] = deployed_cars
            query['not_deployed'] = total_cars - deployed_cars
        return Response((queryset))

    @action(detail=False)
    def average(self, request):
            count = self.filter_queryset(self.get_queryset()).count()
            date = self.filter_queryset(self.get_queryset()).values(self.get_queryset().statisticsday)
            ave = count / 294
            total = ave * 100
            return Response({"total": total, "date": date})

        # elif mode == "month":
        #     first_day = day.replace(day=1)
        #     last_day = date(year=(day.year + int(day.month % 12 == 0)),
        #     month=(day.month + 1) % 12, day=1) - timedelta(days=1)


class FuelConsumptionView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        return Response("123")


class OTMonitoringView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        return Response("123")


class DriverBehaviorView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        return Response("123")
