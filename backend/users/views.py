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
        return user


from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.db import transaction
from .models import Profile

class FollowersAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, username):
        user = request.user
        profile = Profile.objects.get(user__username=username)
        if user.profile.follows.filter(pk=profile.pk).exists():
            user.profile.follows.remove(profile)
        else:
            user.profile.follows.add(profile)
        return Response(status=status.HTTP_200_OK)
    
    def get(self, request, username):
        user = request.user
        profile = Profile.objects.get(user__username=username)
        if user.profile.follows.filter(pk=profile.pk).exists():
            return Response({'isFollowing':True})
        else:
            return Response({'isFollowing':False})
    
class FollowingAPIView(APIView):
    permission_classes=[IsAuthenticated]

    def post(self,request,username):
        user=self.request.user
        profile = Profile.objects.get(user__username=username)
        if user.profile.follows.filter(pk=profile.pk).exists():
            user.profile.follows.remove(profile)
        else:
            user.profile.follows.add(profile)
        return Response(status=status.HTTP_200_OK)
    
    def get(self, request, username):
        user = request.user
        profile = Profile.objects.get(user__username=username)
        if user.profile.follows.filter(pk=profile.pk).exists():
            return Response({'isFollowing':True})
        else:
            return Response({'isFollowing':False})