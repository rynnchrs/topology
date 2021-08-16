from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()                      # add this
router.register(r'job-order', views.JobOrderView, 'job-order') # job-order list api
router.register(r'task-scheduling', views.TaskView, 'task-scheduling') 

urlpatterns = [
    path('', include(router.urls)),
    path('task-list/', views.TaskListView.as_view(), name='task-list'),
    path('fieldman-list/', views.FieldmanListView.as_view(), name='fieldman-list'),
    path('location-list/', views.LocationListView.as_view(), name='location-list'),
]
