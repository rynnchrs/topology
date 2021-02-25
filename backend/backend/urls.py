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

router.register(r'users', views.UserView, 'users') # users api
router.register(r'permission', views.PermissionView, 'permission') # permission api
router.register(r'permission/user', views.PermissionUserView, 'permission-user') # user permission api
router.register(r'permission/inventory', views.PermissionInventoryView, 'permission-inventory') # inventory permission api
router.register(r'permission/inspection-report', views.PermissionInspectionReport, 'permission-inspection-report')    # update inspection report
router.register(r'permission/maintenance-report', views.PermissionMaintenanceReport, 'permission-maintenance-report') # update maintenance report
router.register(r'permission/repair-report', views.PermissionRepairReport, 'permission-repair-report') # update repair report
router.register(r'permission/task', views.PermissionTaskView, 'permission-task')    # task permission api
router.register(r'permission/add-list/maintenance', views.AddMaintenanceReportView, 'permission-maintenance-list') # list of can add maintenance report
router.register(r'permission/add-list/inspection', views.AddInspectionReportView, 'permission-inspection-list')  # list of can add inspection report
router.register(r'permission/add-list/repair', views.AddRepairReportView, 'permission-repair-list')  # list of can add repair report
router.register(r'permission/add-list/repair', views.AddRepairReportView, 'permission-repair-list')  # list of can add repair report
router.register(r'search-field', views.SearchInventoryView, 'search-field')  # list of can add repair report

router.register(r'report', views.ReportView, 'report') # report creation api

urlpatterns = [
    path('admin/', admin.site.urls),         path('api/', include(router.urls)),                # add this
    re_path('^api/careta-list/(?P<username>.+)/$', views.InsuranceList.as_view()),
    path('api/',  include('careta.urls')), # add this
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)