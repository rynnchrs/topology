from django.urls import path # add this
from rest_framework_simplejwt import views as jwt_views # add this
from .views import RegisterView, BlacklistTokenView # add this
urlpatterns = [
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'), # add this
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'), # add this
    path('logout/blacklist/', BlacklistTokenView.as_view(), name='blacklist'), # add this
    path('register/', RegisterView.as_view(), name='register') # add this
]