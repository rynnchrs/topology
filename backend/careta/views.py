from django.shortcuts import render
from rest_framework import viewsets  # add this
from .serializers import CarSerializer, ContractSerializer, TPLSerializer, InsuranceSerializer  # add this
from .models import Car, Contract, TPL, Insurance  # add this
from rest_framework import generics


class CarView(viewsets.ModelViewSet):  # add this
    queryset = Car.objects.all()  # add this
    serializer_class = CarSerializer  # add this
    lookup_field = 'slug'


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
