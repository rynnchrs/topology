from django.urls import include, path 
from rest_framework import routers

from . import views
router = routers.DefaultRouter() 
router.register(r'user-image', views.UserImageView, 'user-image'),
router.register(r'report-image', views.ReportImageView, 'report-image'),

urlpatterns = [
    path('', include(router.urls)),
]