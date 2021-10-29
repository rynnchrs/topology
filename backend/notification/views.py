import datetime
from datetime import datetime as date

from django.views.generic.list import ListView

from car.models import Car
from careta.models import User
from notifications.models import Notification
from notifications.signals import notify
from report.models import Inspection
from rest_framework import generics, permissions, serializers, status, viewsets
from rest_framework.decorators import action, api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializer import NotificationsSerializer


class InspectionNotifyView(viewsets.ViewSet):

    def list(self, request):
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
                    inspections = Inspection.objects.filter(body_no = car[x]).order_by('-inspection_id')[:3]
                    driver = []
                    for inspection in inspections:
                        driver.append(str(inspection.driver))
                    driver = list(dict.fromkeys(driver))
                except:
                    driver = ""
                context.append({
                    'body_no': car[x].body_no,
                    'driver': driver,
                    'date': dates[i].strftime('%Y-%m-%d')
                })
        return Response(context, status=status.HTTP_200_OK)
    
    @action(detail=False)
    def last_three_driver(self, request):
        context = []
        queryset = Inspection.objects.all().order_by('-inspection_id')[:3]
        # print(queryset)
        for inspection in queryset:
            context.append(str(inspection.driver))
        return Response({"driver":context}, status=status.HTTP_200_OK)


class AllNotificationsList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = NotificationsSerializer

    def get_queryset(self):
        notifs = self.request.user.notifications.all()
        return notifs


class UnreadNotificationsList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        count = self.request.user.notifications.unread().count()
        data = {
            'unread_count': count,
        }
        return Response(data)


class NotificationView(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['post'])
    def expired(self, request):
        user = self.request.user
        car = Car.objects.get(car_id=1)
        sender = User.objects.get(username=user.username)
        recipients = User.objects.filter(permission__can_add_task=True)
        message = "Expired"
        notify.send(sender, recipient=recipients, action_object=car, target=car, 
                        level='warning', verb='Warning', description=message)
        return Response(status=status.HTTP_200_OK)
