from django.urls import include, path
from rest_framework import routers 

from . import views

router = routers.DefaultRouter() 
router.register(r'deployment', views.VehicleDeploymentView, 'deployment') 
router.register(r'quantity', views.VehicleQuantityView, 'quantity') 

urlpatterns = [
    path('', include(router.urls)),
]