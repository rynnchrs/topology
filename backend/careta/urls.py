from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import RegisterView, BlacklistTokenView
urlpatterns = [
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/blacklist/', BlacklistTokenView.as_view(), name='blacklist'),
    path('register/', RegisterView.as_view(), name='register')
]