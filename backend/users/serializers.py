from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Profile

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user


class SimpleProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = Profile
        fields = ['id', 'username', 'image']

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    followers = serializers.SerializerMethodField()
    follows = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ['id', 'user', 'image', 'followers', 'follows', 'bio', 'username']

    def get_followers(self, obj):
        followers = obj.followed_by.all()
        return SimpleProfileSerializer(followers, many=True).data
    
    def get_follows(self, obj):
        follows = obj.follows.all()
        return SimpleProfileSerializer(follows, many=True).data

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']