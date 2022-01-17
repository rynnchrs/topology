from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from car.models import Car
from gps.models import Record
# Create your views here.

class VehicleQuantityView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        context = {}
        if request.query_params['mode'] == "project":
            car = Car.objects.all().count()
            context = {
                "quantity": car
            }
            return Response(context)

        else:
            car = Car.objects.all().count()
            context = {
                "quantity": car
            }
            return Response(context)


class VehicleDeploymentView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        if request.query_params['mode'] == "service":
            return Response("sample service")

        else:
            car = Car.objects.all().count()
            context = {
                "quantity": car
            }
            return Response(context)


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