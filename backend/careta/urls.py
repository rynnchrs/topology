from django.urls import include, path 
from rest_framework import routers
from rest_framework_simplejwt import views as jwt_views

from . import views
from .views import BlacklistTokenView 
from .views import MyTokenObtainPairView, RegisterView, UserListView

router = routers.DefaultRouter()  
router.register(r'users', views.UserView, 'users') 
router.register(r'permission', views.PermissionView, 'permission') 

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'), # login api
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'), # refresh token
    path('logout/blacklist/', BlacklistTokenView.as_view(), name='blacklist'), # logout api
    path('register/', RegisterView.as_view(), name='register'), # register api
    path('user-list/', UserListView.as_view(), name='user-list'), # 
]
