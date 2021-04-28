from django.urls import include, path
from rest_framework import routers  # add this

from . import views

router = routers.DefaultRouter() 
router.register(r'inspection', views.InspectionNotifyView, 'inspection'),

urlpatterns = [
    path('', include(router.urls)),
]
