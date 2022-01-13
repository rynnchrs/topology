from django.urls import include, path
from rest_framework import routers  # add this

from . import views
from .views import GPSView

router = routers.DefaultRouter() 
router.register(r'records', views.RecordView, 'records'),
router.register(r'gps', views.GPSView, 'gps'), 

urlpatterns = [
    path('', include(router.urls)), # 
]
