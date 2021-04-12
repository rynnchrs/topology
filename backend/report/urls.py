from django.urls import include, path
from rest_framework import routers  # add this

from . import views
from .views import InspectionListView, InspectionView, MaintenanceListView

router = routers.DefaultRouter() 
router.register(r'inspection', views.InspectionView, 'inspection'), # report creation api
router.register(r'maintenance', views.MaintenanceView, 'maintenance'), #maintenance report form api

urlpatterns = [
    path('', include(router.urls)),
    path('inspection-list/', InspectionListView.as_view(), name='inspection-list'), # 
    path('maintenance-list/', MaintenanceListView.as_view(), name='maintenance-list'),
]
