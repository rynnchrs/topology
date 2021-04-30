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
router.register(r'job-order', views.JobOrderView, 'job-order') # job-order list api

urlpatterns = [
    path('admin/', admin.site.urls),                        # add this
    path('car/',  include('car.urls')), 
    path('careta/',  include('careta.urls')), 
    path('report/',  include('report.urls')), 
    path('notifications/',  include('notifications.urls')), 
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)