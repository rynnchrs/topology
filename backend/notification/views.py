import datetime
from datetime import datetime as date

from car.models import Car
from careta.models import User
from notifications.models import Notification
from notifications.signals import notify
from report.models import Inspection
from rest_framework import serializers, status, viewsets
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


class InboxView(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request):
        user = self.request.user   
        # sender = User.objects.get(username=request.user)
        # receiver = User.objects.get(id=request.POST.get('user_id'))
        # notify.send(sender, recipient=receiver, verb='Message', description=request.POST.get('message'))
        # print(user.notifications.read())
        
        
        queryset = Notification.objects.all()
        serializers = NotificationsSerializer(queryset, many=True)
        return Response(serializers.data)


# -*- coding: utf-8 -*-
''' Django Notifications example views '''
from distutils.version import StrictVersion  # pylint: disable=no-name-in-module,import-error

from django import get_version
from django.contrib.auth.decorators import login_required
from django.forms import model_to_dict
from django.shortcuts import get_object_or_404, redirect
from django.utils.decorators import method_decorator
from django.views.generic import ListView
from notifications import settings
from notifications.models import Notification
from notifications.utils import id2slug, slug2id
from notifications.settings import get_config
from django.views.decorators.cache import never_cache

if StrictVersion(get_version()) >= StrictVersion('1.7.0'):
    from django.http import JsonResponse  # noqa
else:
    # Django 1.6 doesn't have a proper JsonResponse
    import json
    from django.http import HttpResponse  # noqa

    def date_handler(obj):
        return obj.isoformat() if hasattr(obj, 'isoformat') else obj

    def JsonResponse(data):  # noqa
        return HttpResponse(
            json.dumps(data, default=date_handler),
            content_type="application/json")

class NotificationViewList(ListView):
    template_name = 'notifications/list.html'
    context_object_name = 'notifications'
    paginate_by = settings.get_config()['PAGINATE_BY']

    @api_view(["GET"])
    def dispatch(self, request, *args, **kwargs):
        return super(NotificationViewList, self).dispatch(
            request, *args, **kwargs)

# @api_view(["GET"])
class AllNotificationsList(NotificationViewList):
    """
    Index page for authenticated user
    """
    
    def get_queryset(self):
        
        if settings.get_config()['SOFT_DELETE']:
            qset = self.request.user.notifications.active()
        else:
            qset = self.request.user.notifications.all()
        return qset

# @api_view(["GET"])
class UnreadNotificationsList(NotificationViewList):

    def get_queryset(self):
        return self.request.user.notifications.unread()


@api_view(["GET"])
def mark_all_as_read(request):
    request.user.notifications.mark_all_as_read()

    _next = request.GET.get('next')

    if _next:
        return redirect(_next)
    return redirect('notifications:unread')


@api_view(["GET"])
def mark_as_read(request, slug=None):
    notification_id = slug2id(slug)

    notification = get_object_or_404(
        Notification, recipient=request.user, id=notification_id)
    notification.mark_as_read()

    _next = request.GET.get('next')

    if _next:
        return redirect(_next)

    return redirect('notifications:unread')


@api_view(["GET"])
def mark_as_unread(request, slug=None):
    notification_id = slug2id(slug)

    notification = get_object_or_404(
        Notification, recipient=request.user, id=notification_id)
    notification.mark_as_unread()

    _next = request.GET.get('next')

    if _next:
        return redirect(_next)

    return redirect('notifications:unread')


@api_view(["GET"])
def delete(request, slug=None):
    notification_id = slug2id(slug)

    notification = get_object_or_404(
        Notification, recipient=request.user, id=notification_id)

    if settings.get_config()['SOFT_DELETE']:
        notification.deleted = True
        notification.save()
    else:
        notification.delete()

    _next = request.GET.get('next')

    if _next:
        return redirect(_next)

    return redirect('notifications:all')


@api_view(["GET"])
def live_unread_notification_count(request):
    try:
        user_is_authenticated = request.user.is_authenticated()
    except TypeError:  # Django >= 1.11
        user_is_authenticated = request.user.is_authenticated
        # print("error")

    if not user_is_authenticated:
        data = {
            'unread_count': "zero"
        }
    else:
        data = {
            'unread_count': request.user.notifications.unread().count(),
        }
    return JsonResponse(data)


@api_view(["GET"])
def live_unread_notification_list(request):
    ''' Return a json with a unread notification list '''
    try:
        user_is_authenticated = request.user.is_authenticated()
    except TypeError:  # Django >= 1.11
        user_is_authenticated = request.user.is_authenticated

    if not user_is_authenticated:
        data = {
            'unread_count': 0,
            'unread_list': []
        }
        return JsonResponse(data)

    default_num_to_fetch = get_config()['NUM_TO_FETCH']
    try:
        # If they don't specify, make it 5.
        num_to_fetch = request.GET.get('max', default_num_to_fetch)
        num_to_fetch = int(num_to_fetch)
        if not (1 <= num_to_fetch <= 100):
            num_to_fetch = default_num_to_fetch
    except ValueError:  # If casting to an int fails.
        num_to_fetch = default_num_to_fetch

    unread_list = []

    for notification in request.user.notifications.unread()[0:num_to_fetch]:
        struct = model_to_dict(notification)
        struct['slug'] = id2slug(notification.id)
        if notification.actor:
            struct['actor'] = str(notification.actor)
        if notification.target:
            struct['target'] = str(notification.target)
        if notification.action_object:
            struct['action_object'] = str(notification.action_object)
        if notification.data:
            struct['data'] = notification.data
        unread_list.append(struct)
        if request.GET.get('mark_as_read'):
            notification.mark_as_read()
    data = {
        'unread_count': request.user.notifications.unread().count(),
        'unread_list': unread_list
    }
    return JsonResponse(data)


@api_view(["GET"])
def live_all_notification_list(request):
    ''' Return a json with a unread notification list '''
    try:
        user_is_authenticated = request.user.is_authenticated()
    except TypeError:  # Django >= 1.11
        user_is_authenticated = request.user.is_authenticated

    if not user_is_authenticated:
        data = {
            'all_count': 0,
            'all_list': []
        }
        return JsonResponse(data)

    default_num_to_fetch = get_config()['NUM_TO_FETCH']
    try:
        # If they don't specify, make it 5.
        num_to_fetch = request.GET.get('max', default_num_to_fetch)
        num_to_fetch = int(num_to_fetch)
        if not (1 <= num_to_fetch <= 100):
            num_to_fetch = default_num_to_fetch
    except ValueError:  # If casting to an int fails.
        num_to_fetch = default_num_to_fetch

    all_list = []

    for notification in request.user.notifications.all()[0:num_to_fetch]:
        struct = model_to_dict(notification)
        struct['slug'] = id2slug(notification.id)
        if notification.actor:
            struct['actor'] = str(notification.actor)
        if notification.target:
            struct['target'] = str(notification.target)
        if notification.action_object:
            struct['action_object'] = str(notification.action_object)
        if notification.data:
            struct['data'] = notification.data
        all_list.append(struct)
        if request.GET.get('mark_as_read'):
            notification.mark_as_read()
    data = {
        'all_count': request.user.notifications.count(),
        'all_list': all_list
    }
    return JsonResponse(data)


def live_all_notification_count(request):
    try:
        user_is_authenticated = request.user.is_authenticated()
    except TypeError:  # Django >= 1.11
        user_is_authenticated = request.user.is_authenticated

    if not user_is_authenticated:
        data = {
            'all_count': 0
        }
    else:
        data = {
            'all_count': request.user.notifications.count(),
        }
    return JsonResponse(data)
