import datetime
from datetime import datetime as date

from car.models import Car
from report.models import Inspection
from rest_framework import status, viewsets
from rest_framework.response import Response


class InspectionNotifyView(viewsets.ViewSet):

    def list(str, request):
        context = []
        start_date = date.strptime(request.GET['start_date'], '%Y-%m-%d')
        end_date = date.strptime(request.GET['end_date'], '%Y-%m-%d')
        day = datetime.timedelta(days=1)
        
        dates = []
        #apped all the dates in the given range of dates
        while start_date <= end_date:
            dates.append(start_date)
            start_date += day

        for i in range(len(dates)):
            # get all report that created in specified date
            inspection = Inspection.objects.filter(date_created = dates[i]) 
            # get all cars that is not used in specified date
            car = Car.objects.exclude(body_no__in = inspection.values_list('body_no__body_no', flat=True))

            for x in range(len(car)):
                # get the driver of the car
                try:
                    inspection = Inspection.objects.filter(body_no = car[x]).latest('inspection_id')
                    driver = inspection.driver.username
                except:
                    driver = ""
                context.append({
                    'body_no': car[x].body_no,
                    'driver': driver,
                    'date': dates[i].strftime('%Y-%m-%d')
                })
        return Response(context, status=status.HTTP_200_OK)

