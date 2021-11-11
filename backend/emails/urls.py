from django.urls import include, path
from rest_framework import routers  # add this

from . import views

router = routers.DefaultRouter() 
# router.register(r'inspection', views.InspectionNotifyView, 'inspection'),
router.register(r'email-send', views.PDFtoEmail, 'email-send'),
router.register(r'email', views.EmailView, 'email'),


urlpatterns = [
    path('', include(router.urls)),
]