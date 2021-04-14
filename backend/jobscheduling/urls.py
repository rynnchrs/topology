from django.urls import include, path  # add this
from rest_framework import routers
from rest_framework_simplejwt import views as jwt_views  # add this

#from . import views
from .views import (TaskView,JobOrderView)

router = routers.DefaultRouter()  
router.register(r'task', TaskView, 'task') # tasks api
router.register(r'joborders', JobOrderView, 'joborders') # job order api

urlpatterns = [
    path('', include(router.urls)),
 
]