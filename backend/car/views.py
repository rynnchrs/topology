import subprocess
from wsgiref.util import FileWrapper

from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django_filters import rest_framework as filter
from rest_framework import filters, generics, status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .filters import CarFilter
from .models import TPL, Car, Contract, Insurance
from .serializers import (CarInfoSerializer, CarSerializer, ContractSerializer,
                          InsuranceSerializer, SearchInventorySerializer,
                          TPLSerializer)


class CarView(viewsets.ModelViewSet):  # add this
    permission_classes = [IsAuthenticated]
    queryset = Car.objects.all().order_by('car_id') # add this
    serializer_class = CarSerializer  # add this
    filter_backends = [filters.SearchFilter]
    search_fields = ['^body_no','^vin_no','^plate_no','^date_created','^current_loc']
    lookup_field = 'slug'
    
    def create(self, request):
        serializer = CarSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            subprocess.Popen(["python","car-export.py"], shell=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)      

    def update(self, request, slug=None):
        queryset = Car.objects.all()
        car = get_object_or_404(queryset, slug=slug) 
        serializer = CarSerializer(instance=car, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            subprocess.Popen(["python","car-export.py"], shell=True)
        return Response(serializer.data, status=status.HTTP_200_OK)   
    
    def destroy(self, request, slug=None):       
        queryset = Car.objects.all()
        car = get_object_or_404(queryset, slug=slug)  
        car.delete()
        subprocess.Popen(["python","car-export.py"], shell=True)
        return Response(status=status.HTTP_200_OK)         

    @action(detail=False, permission_classes=[AllowAny])
    def export_list(self, request):
        filename = 'Car-Inventory.xlsx'
        file_path = '.'+settings.MEDIA_URL+filename
        file = open(file_path,"rb")
        response = HttpResponse(FileWrapper(file),
         content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )
        response['Content-Disposition'] = 'attachment; filename=' + filename
        return response


class CarListView(generics.ListAPIView):  #list of all car with filtering
    permission_classes = [IsAuthenticated]
    queryset = Car.objects.all().order_by('car_id') 
    serializer_class = CarInfoSerializer  
    filter_backends = [filters.SearchFilter]
    search_fields = ['^body_no','^vin_no','^plate_no','^date_created','^current_loc']


class SearchInventoryView(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        value = request.query_params.get('search_field', None)
        queryset = Car.objects.only(value)
        serializer = SearchInventorySerializer(queryset, many=True, fields=[str(value)])
        return Response(serializer.data)


class ContractView(viewsets.ModelViewSet):  # add this
    permission_classes = [IsAuthenticated]
    queryset = Contract.objects.all()  # add this
    serializer_class = ContractSerializer  # add this
    lookup_field = 'slug'

    def create(self, request):
        serializer = ContractSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            subprocess.Popen(["python","car-export.py"], shell=True)  
        return Response(status=status.HTTP_201_CREATED)      

    def update(self, request, slug=None):
        queryset = Contract.objects.all()
        contract = get_object_or_404(queryset, slug=slug) 
        serializer = ContractSerializer(instance=contract, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            subprocess.Popen(["python","car-export.py"], shell=True) 
        return Response(serializer.data, status=status.HTTP_200_OK)  

    def destroy(self, request, slug=None):       
        queryset = Contract.objects.all()
        contract = get_object_or_404(queryset, slug=slug)  
        contract.delete()
        subprocess.Popen(["python","car-export.py"], shell=True)
        return Response(status=status.HTTP_200_OK)   


class TPLView(viewsets.ModelViewSet):  # add this
    permission_classes = [IsAuthenticated]
    queryset = TPL.objects.all()  # add this
    serializer_class = TPLSerializer  # add this
    lookup_field = 'slug'

    def create(self, request):
        serializer = TPLSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            subprocess.Popen(["python","car-export.py"], shell=True)  
        return Response(status=status.HTTP_201_CREATED)      

    def update(self, request, slug=None):
        queryset = TPL.objects.all()
        tpl = get_object_or_404(queryset, slug=slug) 
        serializer = TPLSerializer(instance=tpl, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            subprocess.Popen(["python","car-export.py"], shell=True) 
        return Response(serializer.data, status=status.HTTP_200_OK)  

    def destroy(self, request, slug=None):       
        queryset = TPL.objects.all()
        tpl = get_object_or_404(queryset, slug=slug)  
        tpl.delete()
        subprocess.Popen(["python","car-export.py"], shell=True)
        return Response(status=status.HTTP_200_OK)   

class InsuranceView(viewsets.ModelViewSet):  # add this
    permission_classes = [IsAuthenticated]
    queryset = Insurance.objects.all()  # add this
    serializer_class = InsuranceSerializer  # add this
    lookup_field = 'slug'
 
    def create(self, request):
        serializer = InsuranceSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            subprocess.Popen(["python","car-export.py"], shell=True)  
        return Response(status=status.HTTP_201_CREATED)      

    def update(self, request, slug=None):
        queryset = Insurance.objects.all()
        insurance = get_object_or_404(queryset, slug=slug) 
        serializer = InsuranceSerializer(instance=insurance, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            subprocess.Popen(["python","car-export.py"], shell=True) 
        return Response(serializer.data, status=status.HTTP_200_OK)     
    
    def destroy(self, request, slug=None):       
        queryset = Insurance.objects.all()
        insurance = get_object_or_404(queryset, slug=slug)  
        insurance.delete()
        subprocess.Popen(["python","car-export.py"], shell=True)
        return Response(status=status.HTTP_200_OK)   


class InsuranceList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = InsuranceSerializer

    def get_queryset(self):
        username = self.kwargs['username']
        return Insurance.objects.filter(car=username)


