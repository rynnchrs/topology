from django.urls import include, path
from rest_framework import routers  # add this
import notifications.urls

from . import views

router = routers.DefaultRouter() 
router.register(r'inspection', views.InspectionNotifyView, 'inspection'),

    

urlpatterns = [
    path('', include(router.urls)),
    path('notify/', include(notifications.urls, namespace='notifications')),
    path('inbox/', views.InboxView.as_view(), name='inbox/'),
    
    path('all/', views.AllNotificationsList.as_view(), name='all'),
    path('unread/', views.UnreadNotificationsList.as_view(), name='unread'),
    path('mark_all_as_read/', views.mark_all_as_read, name='mark_all_as_read'),
    path('mark_as_read/', views.mark_as_read, name='mark_as_read'),
    path('mark_as_unread/', views.mark_as_unread, name='mark_as_unread'),
    path('delete/', views.delete, name='delete'),
    path('api/unread_count/', views.live_unread_notification_count, name='live_unread_notification_count'),
    path('api/all_count/', views.live_all_notification_count, name='live_all_notification_count'),
    path('api/unread_list/', views.live_unread_notification_list, name='live_unread_notification_list'),
    path('api/all_list/', views.live_all_notification_list, name='live_all_notification_list'),
]