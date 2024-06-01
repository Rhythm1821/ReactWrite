from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    path('profile/<int:pk>/',views.ProfileView.as_view(),name='profile'),
    path('myprofile/',views.MyProfileView.as_view(),name='profile'),
    path('profile/<int:pk>/update/', views.ProfileUpdateView.as_view(), name='profile_update'),
    path('register/',views.RegistrationView.as_view(),name='register'),
    path('login/',TokenObtainPairView.as_view(),name='login'),
    path('token/refresh/',TokenRefreshView.as_view(),name='refresh'),
]