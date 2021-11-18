import subprocess
from wsgiref.util import FileWrapper

from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django_filters import rest_framework as filter
from image.models import Image
from report.models import CheckList, Inspection, Repair
from report.serializers import (CheckListListSerializer,
                                InspectionListSerializer, RepairListSerializer)
from rest_framework import filters, generics, status, viewsets
from rest_framework.decorators import action
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from task.models import IR, Task
from task.serializers import IRListSerializers, WarningTaskSerializer

from .filters import CarFilter
from .models import PDF, TPL, Car, Contract, Insurance
from .serializers import (CarInfoSerializer, CarSerializer, ContractSerializer,
                          InsuranceSerializer, PDFSerializer, QRCodeSerializer,
                          SearchInventorySerializer, TPLSerializer)


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
            subprocess.Popen(["/home/topodev/venv/bin/python /home/topodev/topology/backend/car-export.py"], shell=True)    
        return Response(serializer.data, status=status.HTTP_201_CREATED)      

    def update(self, request, slug=None):
        queryset = Car.objects.all()
        car = get_object_or_404(queryset, slug=slug) 
        serializer = CarSerializer(instance=car, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            subprocess.Popen(["/home/topodev/venv/bin/python /home/topodev/topology/backend/car-export.py"], shell=True)    
        return Response(serializer.data, status=status.HTTP_200_OK)   
    
    def destroy(self, request, slug=None):       
        queryset = Car.objects.all()
        car = get_object_or_404(queryset, slug=slug)
        car.qr_code.delete(save=False)
        car.delete()
        queryset = Image.objects.filter(image_name=slug ,mode="ci")
        for image in queryset:
            try:
                image.image.delete(save=False)
                image.delete()
            except:
                pass
        subprocess.Popen(["/home/topodev/venv/bin/python /home/topodev/topology/backend/car-export.py"], shell=True)    
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
            subprocess.Popen(["/home/topodev/venv/bin/python /home/topodev/topology/backend/car-export.py"], shell=True)      
        return Response(status=status.HTTP_201_CREATED)      

    def update(self, request, slug=None):
        queryset = Contract.objects.all()
        contract = get_object_or_404(queryset, slug=slug) 
        serializer = ContractSerializer(instance=contract, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            subprocess.Popen(["/home/topodev/venv/bin/python /home/topodev/topology/backend/car-export.py"], shell=True)     
        return Response(serializer.data, status=status.HTTP_200_OK)  

    def destroy(self, request, slug=None):       
        queryset = Contract.objects.all()
        contract = get_object_or_404(queryset, slug=slug)  
        contract.delete()
        subprocess.Popen(["/home/topodev/venv/bin/python /home/topodev/topology/backend/car-export.py"], shell=True)    
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
            subprocess.Popen(["/home/topodev/venv/bin/python /home/topodev/topology/backend/car-export.py"], shell=True)      
        return Response(status=status.HTTP_201_CREATED)      

    def update(self, request, slug=None):
        queryset = TPL.objects.all()
        tpl = get_object_or_404(queryset, slug=slug) 
        serializer = TPLSerializer(instance=tpl, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            subprocess.Popen(["/home/topodev/venv/bin/python /home/topodev/topology/backend/car-export.py"], shell=True)     
        return Response(serializer.data, status=status.HTTP_200_OK)  

    def destroy(self, request, slug=None):       
        queryset = TPL.objects.all()
        tpl = get_object_or_404(queryset, slug=slug)  
        tpl.delete()
        subprocess.Popen(["/home/topodev/venv/bin/python /home/topodev/topology/backend/car-export.py"], shell=True)    
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
            subprocess.Popen(["/home/topodev/venv/bin/python /home/topodev/topology/backend/car-export.py"], shell=True)      
        return Response(status=status.HTTP_201_CREATED)      

    def update(self, request, slug=None):
        queryset = Insurance.objects.all()
        insurance = get_object_or_404(queryset, slug=slug) 
        serializer = InsuranceSerializer(instance=insurance, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            subprocess.Popen(["/home/topodev/venv/bin/python /home/topodev/topology/backend/car-export.py"], shell=True)     
        return Response(serializer.data, status=status.HTTP_200_OK)     
    
    def destroy(self, request, slug=None):       
        queryset = Insurance.objects.all()
        insurance = get_object_or_404(queryset, slug=slug)  
        insurance.delete()
        subprocess.Popen(["/home/topodev/venv/bin/python /home/topodev/topology/backend/car-export.py"], shell=True)    
        return Response(status=status.HTTP_200_OK)   


class InsuranceList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = InsuranceSerializer

    def get_queryset(self):
        username = self.kwargs['username']
        return Insurance.objects.filter(car=username)



class PDFView(viewsets.ModelViewSet):  # add this
    permission_classes = [IsAuthenticated]
    queryset = PDF.objects.all()  # add this
    serializer_class = PDFSerializer  # add this
    parser_classes = [MultiPartParser, FormParser]

    def create(self, request):
        serializer = PDFSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response("successfully Created",status=status.HTTP_201_CREATED)
        
    def retrieve(self, request, pk=None):
        queryset = PDF.objects.all()
        pdf = get_object_or_404(queryset, car__body_no=pk) 
        serializer = PDFSerializer(pdf, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK) 

    def update(self, request, pk=None):
        queryset = PDF.objects.all()
        pdf = get_object_or_404(queryset, car__body_no=pk) 
        serializer = PDFSerializer(instance=pdf, data=request.data)
        if serializer.is_valid(raise_exception=True):
            pdf.pdf.delete(save=False)
            serializer.save()
        return Response("successfully Edited", status=status.HTTP_200_OK)     
    
    def destroy(self, request, pk=None):       
        queryset = PDF.objects.all()
        pdf = get_object_or_404(queryset, car__body_no=pk)  
        pdf.pdf.delete(save=False)
        pdf.delete()
        return Response("successfully Deleted",status=status.HTTP_200_OK)   


class QRCodeView(generics.ListAPIView):  #list of all car with filtering
    permission_classes = [IsAuthenticated]
    queryset = Car.objects.all().order_by('car_id') 
    serializer_class = QRCodeSerializer  
    filter_backends = [filters.SearchFilter]
    search_fields = ['^body_no',]


class HistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        body_no = request.GET['body_no']

        driver_reports = Inspection.objects.filter(body_no__body_no=body_no).order_by('-inspection_id')[:5]
        incident_report = IR.objects.filter(body_no__body_no=body_no).order_by('-ir_id')[:5]
        task_schedule = Task.objects.filter(body_no__body_no=body_no).order_by('-task_id')[:5]
        check_list = CheckList.objects.filter(body_no__body_no=body_no).order_by('-check_list_id')[:5]
        repair_report = Repair.objects.filter(body_no__body_no=body_no).order_by('-repair_id')[:5]

        driver_reports = InspectionListSerializer(driver_reports, many=True)
        incident_report = IRListSerializers(incident_report, many=True)
        task_schedule = WarningTaskSerializer(task_schedule, many=True)
        check_list = CheckListListSerializer(check_list, many=True)
        repair_report = RepairListSerializer(repair_report, many=True)
        
        context = {
            'driver_reports': driver_reports.data,
            'incident_report': incident_report.data,
            'task_schedule': task_schedule.data,
            'check_list': check_list.data,
            'repair_report': repair_report.data,
        }
        return Response(context, status=status.HTTP_200_OK)
