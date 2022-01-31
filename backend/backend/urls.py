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
from django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path  # add this

from rest_framework.documentation import include_docs_urls
from rest_framework.schemas import get_schema_view

API_TITLE = 'Careta'
API_DESCRIPTION = 'A Web Api for Careta Fleet Management System.'
schema_view = get_schema_view(title=API_TITLE)

urlpatterns = [
    path('admin/', admin.site.urls),                        # add this
    path('car/',  include('car.urls')), 
    path('careta/',  include('careta.urls')), 
    path('report/',  include('report.urls')), 
    path('notification/',  include('notification.urls')), 
    path('task/',  include('task.urls')), 
    path('dashboard/',  include('dashboard.urls')),
    path('image/',  include('image.urls')),
    path('emails/',  include('emails.urls')),
    path('vehicle/',  include('vehicle.urls')),
    path('gps/',  include('gps.urls')),
    path('docs/', include_docs_urls(title=API_TITLE,
                                    description=API_DESCRIPTION)),
    path('schema/', schema_view)
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)