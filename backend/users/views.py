from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from .models import Profile
from .serializers import RegisterSerializer,ProfileSerializer, UserSerializer

class RegistrationView(generics.CreateAPIView):
    queryset=User.objects.all()
    serializer_class=RegisterSerializer
    permission_classes=[AllowAny]

    def create(self, validated_data):
        # check if user or email already exists
        if User.objects.filter(username=self.request.data['username']).exists() or User.objects.filter(email=self.request.data['email']).exists():
            return Response({"detail": "Username or email already exists"}, status=status.HTTP_400_BAD_REQUEST)
        data=self.request.data
        User.objects.create_user(username=data['username'],email=data['email'],password=data['password'])
        return Response({"detail": "User created successfully"}, status=status.HTTP_201_CREATED)

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

    def update(self, request, *args, **kwargs):
        user=self.request.user
        user.username=request.data['username']
        user.save()
        return super().update(request, *args, **kwargs)


class UserViewSet(generics.RetrieveAPIView):
    queryset=User.objects.all()
    serializer_class=UserSerializer
    permission_classes=[IsAuthenticated]
    
    def get_object(self):
        user=User.objects.get(id=self.kwargs['pk'])
        return user

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
        following = user.profile.follows.all()
        usernames = [follower.user.username for follower in following]
        return Response(usernames)