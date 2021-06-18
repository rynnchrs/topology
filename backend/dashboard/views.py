from datetime import date, datetime, timedelta

from car.models import TPL, Car, Contract, Insurance
from django_filters import rest_framework as filter
from report.models import Repair
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import TotalCarSerializer
from .utils import (check_Com_date, check_cr_date, check_or_date,
                    check_TPL_date, close_to_expire, inspection)


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
            first_day = day + timedelta(days=0-day.weekday())
            last_day = day + timedelta(days=6-day.weekday())

        elif mode == "month":
            first_day = day.replace(day=1)
            last_day = date(year=(day.year + int(day.month % 12 == 0)),
            month=(day.month + 1) % 12, day=1) - timedelta(days=1)

        return Response(inspection(first_day, last_day))
