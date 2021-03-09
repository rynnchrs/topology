from django.urls import include, path  # add this
from rest_framework_simplejwt import views as jwt_views  # add this

from .views import (BlacklistTokenView, CarListView, ExpiryView, InspectionListView,  # add this
                    PermissionUserView, RegisterView, SearchInventoryView,
                    UserListView)

urlpatterns = [
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('login/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'), # login api
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'), # refresh token
    path('logout/blacklist/', BlacklistTokenView.as_view(), name='blacklist'), # logout api
    path('register/', RegisterView.as_view(), name='register'), # register api
    path('user-list/', UserListView.as_view(), name='user-list'), # 
    path('inspection-list/', InspectionListView.as_view(), name='inspection-list'), # 
    path('car-list/', CarListView.as_view(), name='inspection-list'), # 
    path('expiry/', ExpiryView.as_view(), name='expiry') # 
]
