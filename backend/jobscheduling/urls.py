from django.urls import include, path  # add this
from rest_framework import routers
from rest_framework_simplejwt import views as jwt_views  # add this

#from . import views
from .views import (TaskView)

router = routers.DefaultRouter()  
router.register(r'tasks', TaskView.as_view, 'tasks') # tasks api

urlpatterns = [
    path('task/', TaskView.as_view(), name='tasklist')
]
