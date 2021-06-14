import subprocess
from datetime import datetime, date, timedelta
from wsgiref.util import FileWrapper

from django.conf import settings
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django_filters import rest_framework as filter
from report.models import Repair
from rest_framework import filters, generics, status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .filters import CarFilter
from .models import TPL, Car, Contract, Insurance
from .serializers import (CarInfoSerializer, CarSerializer, ContractSerializer,
                          InsuranceSerializer, SearchInventorySerializer,
                          TotalCarSerializer, TPLSerializer)
from .utils import (check_Com_date, check_cr_date, check_or_date,
                    check_TPL_date, close_to_expire, inspection)


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
            subprocess.Popen(["python","car-export.py"], shell=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)      

    def update(self, request, slug=None):
        queryset = Car.objects.all()
        car = get_object_or_404(queryset, slug=slug) 
        serializer = CarSerializer(instance=car, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            subprocess.Popen(["python","car-export.py"], shell=False)
        return Response(serializer.data, status=status.HTTP_200_OK)   
    
    def destroy(self, request, slug=None):       
        queryset = Car.objects.all()
        car = get_object_or_404(queryset, slug=slug)  
        car.delete()
        subprocess.Popen(["python","car-export.py"], shell=False)
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
            subprocess.Popen(["python","car-export.py"], shell=False)  
        return Response(status=status.HTTP_201_CREATED)      

    def update(self, request, slug=None):
        queryset = Contract.objects.all()
        contract = get_object_or_404(queryset, slug=slug) 
        serializer = ContractSerializer(instance=contract, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            subprocess.Popen(["python","car-export.py"], shell=False) 
        return Response(serializer.data, status=status.HTTP_200_OK)  

    def destroy(self, request, slug=None):       
        queryset = Contract.objects.all()
        contract = get_object_or_404(queryset, slug=slug)  
        contract.delete()
        subprocess.Popen(["python","car-export.py"], shell=False)
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
            subprocess.Popen(["python","car-export.py"], shell=False)  
        return Response(status=status.HTTP_201_CREATED)      

    def update(self, request, slug=None):
        queryset = TPL.objects.all()
        tpl = get_object_or_404(queryset, slug=slug) 
        serializer = TPLSerializer(instance=tpl, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            subprocess.Popen(["python","car-export.py"], shell=False) 
        return Response(serializer.data, status=status.HTTP_200_OK)  

    def destroy(self, request, slug=None):       
        queryset = TPL.objects.all()
        tpl = get_object_or_404(queryset, slug=slug)  
        tpl.delete()
        subprocess.Popen(["python","car-export.py"], shell=False)
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
            subprocess.Popen(["python","car-export.py"], shell=False)  
        return Response(status=status.HTTP_201_CREATED)      

    def update(self, request, slug=None):
        queryset = Insurance.objects.all()
        insurance = get_object_or_404(queryset, slug=slug) 
        serializer = InsuranceSerializer(instance=insurance, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            subprocess.Popen(["python","car-export.py"], shell=False) 
        return Response(serializer.data, status=status.HTTP_200_OK)     
    
    def destroy(self, request, slug=None):       
        queryset = Insurance.objects.all()
        insurance = get_object_or_404(queryset, slug=slug)  
        insurance.delete()
        subprocess.Popen(["python","car-export.py"], shell=False)
        return Response(status=status.HTTP_200_OK)   


class InsuranceList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = InsuranceSerializer

    def get_queryset(self):
        username = self.kwargs['username']
        return Insurance.objects.filter(car=username)


class TotalView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = TotalCarSerializer
    queryset = Car.objects.all().order_by('date_created')[:1]


class TotalReportView(APIView):
    # permission_classes = [IsAuthenticated]
    def get(self, request):
        context = {}
        operational = Car.objects.filter(operational=True)
        unoperational = Car.objects.filter(operational=False)
        inspection = Repair.objects.filter(job_order__type=False)
        repair = Repair.objects.filter(job_order__type=True)
        
        context = {
            'operational': operational.count(),
            'unoperational': unoperational.count(),
            'inspection': inspection.count(),
            'repair': repair.count(),
           }
        return Response(context)


class TotalExpiryView(APIView):
    # permission_classes = [IsAuthenticated]
    def get(self, request):
        context = {}
        expired_contract = Contract.objects.filter(end_date__lte=date.today())
        expired_TPL = TPL.objects.filter(end_date__lte=date.today())
        expired_insurance = Insurance.objects.filter(end_date__lte=date.today())
        contract = Contract.objects.all()
        tpls = TPL.objects.all()
        insurance = Insurance.objects.all()
        context = {
            'expired_contract': expired_contract.count(),
            'expiring_contract': close_to_expire(contract),
            'expired_TPL': expired_TPL.count(),
            'expiring_TPL': close_to_expire(tpls),
            'expired_insurance': expired_insurance.count(),
            'expiring_insurance': close_to_expire(insurance)
            }
        return Response(context)

class ExpiryView(APIView): # expiry 
    permission_classes = [IsAuthenticated]
    def get(self, request):
        year = request.data.get('year')
        print(year)
        return Response({
            'OR':check_or_date(year), # OR
            'CR':check_cr_date(year), # CR
            'TPL':check_TPL_date(year), # TPL Insurance
            'Com':check_Com_date(year), # Comprehensive Insurance
            })


class TotalInspectionView(APIView): # driver inspection
    # permission_classes = [IsAuthenticated]
    def get(self, request):
        day = datetime.strptime(request.GET['date'], '%Y-%m-%d')
        mode = request.GET['mode']
        if mode == "day":
            first_day = day
            last_day = day

        elif mode == "week":
            first_day = day + timedelta(days=0-date.weekday())
            last_day = day + timedelta(days=6-date.weekday())

        elif mode == "month":
            first_day = day.replace(day=1)
            last_day = date(year=(day.year + int(day.month % 12 == 0)),
            month=(day.month + 1) % 12, day=1) - timedelta(days=1)

        return Response(inspection(first_day, last_day))
