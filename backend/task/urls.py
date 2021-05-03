from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()                      # add this
router.register(r'job-order', views.JobOrderView, 'job-order') # job-order list api

urlpatterns = [
    path('', include(router.urls)),
]
