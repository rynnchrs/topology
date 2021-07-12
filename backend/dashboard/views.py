from datetime import date, datetime, timedelta

from car.models import TPL, Car, Contract, Insurance
from django_filters import rest_framework as filter
from report.models import Repair
from rest_framework import generics, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import (ExpiryContractSerializer, ExpiryInsuranceSerializer,
                          ExpiryTPLSerializer, TotalCarSerializer)
from .utils import (check_Com_date, check_cr_date, check_or_date,
                    check_TPL_date, close_to_expire, expiry_body_no,
                    inspection)


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
        expired_contract = Contract.objects.filter(end_date__lte=date.today()).count()
        expired_TPL = TPL.objects.filter(end_date__lte=date.today()).count()
        expired_insurance19 = Insurance.objects.filter(start_date__year__lte='2019')
        expired_insurance20 = Insurance.objects.filter(start_date__year='2020',)
        expired_insurance19 = expired_insurance19.filter(end_date__lte=date.today()).count()
        expired_insurance20 = expired_insurance20.filter(end_date__lte=date.today()).count()

        contract = Contract.objects.all()
        tpls = TPL.objects.all()
        insurance19 = Insurance.objects.filter(start_date__year__lte='2019')
        insurance20 = Insurance.objects.filter(start_date__year='2020')

        context = {
            'expired_contract': expired_contract,
            'expiring_contract': close_to_expire(contract),
            'expired_TPL': expired_TPL,
            'expiring_TPL': close_to_expire(tpls),
            'expired_insurance19': expired_insurance19,
            'expiring_insurance19': close_to_expire(insurance19),
            'expired_insurance20': expired_insurance20,
            'expiring_insurance20': close_to_expire(insurance20),
            }
        return Response(context)


class ExpiryBodyNoView(generics.ListAPIView):
    def get(self, request):
        mode = request.GET['mode']
        if mode == "contract":
            queryset = Contract.objects.all()
            serializer = ExpiryContractSerializer(expiry_body_no(queryset), many=True)
        elif mode == "tpl":
            queryset = TPL.objects.all()
            serializer = ExpiryTPLSerializer(expiry_body_no(queryset), many=True)
        elif mode == "insurance19":
            queryset = Insurance.objects.filter(start_date__year__lte='2019')
            serializer = ExpiryInsuranceSerializer(expiry_body_no(queryset), many=True)
        elif mode == "insurance20":
            queryset = Insurance.objects.filter(start_date__year='2020')
            serializer = ExpiryInsuranceSerializer(expiry_body_no(queryset), many=True)

        page = self.paginate_queryset(serializer.data)
        if page is not None:
            return self.get_paginated_response(serializer.data)   
        return Response(serializer.data)   

class ExpiryStatusView(APIView):
    def get(self, request):
        context = {}
        repair = Repair.objects.filter(job_order__type=True).count()
        inspection = Repair.objects.filter(job_order__type=False).count()
        context = {
            "Repair": repair,
            "Inspection": inspection,
        } 
        return Response(context)   
    

class ExpiryView(APIView): # expiry 
    # permission_classes = [IsAuthenticated]
    def get(self, request):
        year = request.GET['year']
        or_date = Car.objects.filter(or_date__isnull=False)
        cr_date = Car.objects.filter(cr_date__isnull=False)
        tpl_date = TPL.objects.filter(end_date__isnull=False)
        com_date = Insurance.objects.filter(end_date__isnull=False)
        return Response({
            'OR':check_or_date(year,or_date), # OR
            'CR':check_cr_date(year,cr_date), # CR
            'TPL':check_TPL_date(year,tpl_date), # TPL Insurance
            'Com':check_Com_date(year,com_date), # Comprehensive Insurance
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
            first_day = day + timedelta(days=0-day.weekday())
            last_day = day + timedelta(days=6-day.weekday())

        elif mode == "month":
            first_day = day.replace(day=1)
            last_day = date(year=(day.year + int(day.month % 12 == 0)),
            month=(day.month + 1) % 12, day=1) - timedelta(days=1)

        return Response(inspection(first_day, last_day))
