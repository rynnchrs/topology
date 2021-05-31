from django.urls import include, path
from rest_framework import routers  # add this

from . import views
from .views import CanViewListView, InspectionListView

router = routers.DefaultRouter() 
router.register(r'inspection', views.InspectionView, 'inspection'), # inspection report creation api
router.register(r'repair', views.RepairView, 'repair'), #repair report form api

urlpatterns = [
    path('', include(router.urls)),
    path('inspection-list/', InspectionListView.as_view(), name='inspection-list'), # 
    path('inspection-list/can_view_list/', CanViewListView.as_view(), name='can_view_list'),
]
