from django.urls import include, path  # add this
from rest_framework import routers
from rest_framework_simplejwt import views as jwt_views  # add this

from . import views
from .views import (BlacklistTokenView, CarListView, ExpiryView,  # add this
                    MyTokenObtainPairView, RegisterView, SearchInventoryView,
                    UserListView)

router = routers.DefaultRouter()  
router.register(r'users', views.UserView, 'users') # users api
router.register(r'permission', views.PermissionView, 'permission') # permission api

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'), # login api
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'), # refresh token
    path('logout/blacklist/', BlacklistTokenView.as_view(), name='blacklist'), # logout api
    path('register/', RegisterView.as_view(), name='register'), # register api
    path('user-list/', UserListView.as_view(), name='user-list'), # 
    path('car-list/', CarListView.as_view(), name='car-list'), # 
    path('expiry/', ExpiryView.as_view(), name='expiry'),
]
