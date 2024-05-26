from django.contrib import admin
from django.urls import path,include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('users.urls')),
    path('api/token/',TokenObtainPairView.as_view(),name='get_token'),
    path("api/token/refresh/",TokenRefreshView.as_view(),name='refresh_token'),
    path('api-auth/', include('rest_framework.urls'))
]
