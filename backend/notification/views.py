import datetime
from datetime import datetime as date

import requests
from car.models import Car
from careta.models import User
from django.conf import settings
from django.views.generic.list import ListView
from geopy.geocoders import Nominatim
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
        notification = self.request.user.notifications.all()
        notifs = notification.filter(verb__contains='delete').filter(unread=True)
        for notif in notifs:
            notif.unread = False
            notif.save()
        return notification


class UnreadNotificationsList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        count = self.request.user.notifications.all().filter(unread=True).count()
        
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
    
    @action(detail=False, methods=['post'])
    def gps(self, request):
        lat = request.GET['lat']
        lng = request.GET['lng']
        body_no = request.GET['body_no']
        geolocator = Nominatim(user_agent="notification")
        location = geolocator.reverse(f'{lat},{lng}')
        # location = requests.get(
        #     'https://maps.googleapis.com/maps/api/geocode/json?',
        #     params={
        #         'latlng':f'{lat},{lng}',
        #         'key': settings.GOOGLE_API_KEY
        #     }
        # )
        # current_loc = Car.objects.get(body_no=body_no)
        # if location != current_loc.current_loc:

        #     context = {
        #         "latitude": lat,
        #         "longitude": lng,
        #         "location": location,
        #     }
        #     # sender = User.objects.get(username=user.username)
        #     recipients = User.objects.filter(permission__can_add_task=True)
        #     message = "The body no " + str(car.body_no) + " is not in the Area."
        #     notify.send(sender, recipient=recipients,  target=serializer.save(), 
        #                     level='warning', verb='gps', description=message)
        #     return Response("message",status=status.HTTP_201_CREATED) 
        return Response(location.raw,status=status.HTTP_200_OK)  
   
