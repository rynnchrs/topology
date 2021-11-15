from django.urls import include, path
from rest_framework import routers  # add this
import notifications.urls

from . import views

router = routers.DefaultRouter() 
router.register(r'inspection', views.InspectionNotifyView, 'inspection'),
router.register(r'', views.NotificationView, 'notification'),


urlpatterns = [
    path('', include(router.urls)),
    
    path('all/', views.AllNotificationsList.as_view(), name='all'),
    path('unread-count/', views.UnreadNotificationsList.as_view(), name='unread'),
]