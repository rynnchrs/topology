from django.urls import path, include # add this
from rest_framework_simplejwt import views as jwt_views # add this
from .views import RegisterView, BlacklistTokenView , PermissionUserView, ExpiryView# add this
urlpatterns = [
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('login/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'), # login api
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'), # refresh token
    path('logout/blacklist/', BlacklistTokenView.as_view(), name='blacklist'), # logout api
    path('register/', RegisterView.as_view(), name='register'), # register api

    # path('tools/', Get_with_date.as_view(), name='tools'), # register api
     path('expiry/', ExpiryView.as_view(), name='expiry-2019') # 
]