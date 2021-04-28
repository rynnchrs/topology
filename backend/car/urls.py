from django.urls import include, path, re_path  # add this
from rest_framework import routers

from . import views

router = routers.DefaultRouter()  
router.register(r'careta', views.CarView, 'careta')     # add this
router.register(r'careta-contract', views.ContractView, 'careta-contract')     # add this
router.register(r'careta-tpl', views.TPLView, 'careta-tpl')     # add this
router.register(r'careta-insurance', views.InsuranceView, 'careta-insurance') # add this
router.register(r'search-field', views.SearchInventoryView, 'search-field')  # list of can add repair report
router.register(r'total', views.TotalView, 'total') # total list api

urlpatterns = [
    path('', include(router.urls)),
    re_path('^api/careta-list/(?P<username>.+)/$', views.InsuranceList.as_view()),
    path('expiry/', views.ExpiryView.as_view(), name='expiry'),
    path('car-list/', views.CarListView.as_view(), name='car-list'), # 
]
