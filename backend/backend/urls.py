"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include, re_path                 # add this
from rest_framework import routers                    # add this
from careta import views                            # add this
from django.conf.urls.static import static
from django.conf import settings

router = routers.DefaultRouter()                      # add this
router.register(r'careta', views.CarView, 'careta')     # add this
router.register(r'careta-contract', views.ContractView, 'careta-contract')     # add this
router.register(r'careta-tpl', views.TPLView, 'careta-tpl')     # add this
router.register(r'careta-insurance', views.InsuranceView, 'careta-insurance') # add this
router.register(r'search-field', views.SearchInventoryView, 'search-field')  # list of can add repair report
router.register(r'total', views.TotalView, 'total') # total list api
router.register(r'job-order', views.JobOrderView, 'job-order') # job-order list api

urlpatterns = [
    path('admin/', admin.site.urls),         path('api/', include(router.urls)),                # add this
    re_path('^api/careta-list/(?P<username>.+)/$', views.InsuranceList.as_view()),
    path('careta/',  include('careta.urls')), # add this
    path('report/',  include('report.urls')), # add this
    path('jobscheduling/',  include('jobscheduling.urls')), # add this
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)