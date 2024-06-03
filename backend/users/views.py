from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import generics

from .models import Profile
from .serializers import RegisterSerializer,ProfileSerializer, UserSerializer

class RegistrationView(generics.CreateAPIView):
    queryset=User.objects.all()
    serializer_class=RegisterSerializer
    permission_classes=[AllowAny]

class ProfileView(generics.RetrieveAPIView):
    serializer_class=ProfileSerializer
    permission_classes=[IsAuthenticated]

    def get_object(self):
        try:
            return Profile.objects.get(pk=self.kwargs['pk'])
        except:
            print("Profile Does not exist")

class MyProfileView(generics.RetrieveAPIView):
    serializer_class=ProfileSerializer
    permission_classes=[IsAuthenticated]

    def get_object(self):
        return Profile.objects.get(user=self.request.user)

class ProfileUpdateView(generics.UpdateAPIView):
    serializer_class=ProfileSerializer
    permission_classes=[IsAuthenticated]
    queryset=Profile.objects.all()


class UserViewSet(generics.RetrieveAPIView):
    queryset=User.objects.all()
    serializer_class=UserSerializer
    permission_classes=[IsAuthenticated]
    
    def get_object(self):
        user=User.objects.get(id=self.kwargs['pk'])
        print(user)
        return user

"""
{
"username":"user01",
"email":user01@mail.com,
"password":"123"
}

account
{
    "username": "newuser",
    "email": "newuser@example.com",
    "password": "yourpassword"
}
"""