from django.urls import include, path
from rest_framework import routers  # add this

from . import views
from .views import GPSView

router = routers.DefaultRouter() 
router.register(r'records', views.RecordView, 'records'),

urlpatterns = [
    path('', include(router.urls)),
    path('gps-list/', GPSView.as_view(), name='gps-list'), # 
]
