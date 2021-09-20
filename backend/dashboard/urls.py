from django.urls import include, path # add this
from rest_framework import routers

from . import views

router = routers.DefaultRouter()  
router.register(r'total', views.TotalView, 'total') # total list api

urlpatterns = [
    path('', include(router.urls)),
    path('expiry/', views.ExpiryView.as_view(), name='expiry'),
    path('total-report/', views.TotalReportView.as_view(), name='total-report'),
    path('total-expiry/', views.TotalExpiryView.as_view(), name='total-expiry'),
    path('total-inspection/', views.TotalInspectionView.as_view(), name='total-inspection'),
    path('expiry-body-no/', views.ExpiryBodyNoView.as_view(), name='expiry-body-no'),
    path('expiry-status/', views.ExpiryStatusView.as_view(), name='expiry-status'),
    path('total-ir/', views.TotalIRView.as_view(), name='total-ir'),
    path('total-task/', views.TotalTaskView.as_view(), name='total-task'),
]
