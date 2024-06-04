from rest_framework import serializers
from .models import Post
from users.models import Profile
from users.serializers import ProfileSerializer

class PostSerializer(serializers.ModelSerializer):
    author = ProfileSerializer(read_only=True)
    class Meta:
        model = Post
        fields = '__all__'