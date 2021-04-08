from django.urls import include, path  # add this

from .views import InspectionListView, MaintenanceListView, InspectionView
from . import views
urlpatterns = [
    path('inspection-list/', InspectionListView.as_view(), name='inspection-list'), # 
    path('maintenance-list/', MaintenanceListView.as_view(), name='maintenance-list'),
]
