from rest_framework import serializers
from .models import Post,Comment
from users.serializers import ProfileSerializer

class PostSerializer(serializers.ModelSerializer):
    author = ProfileSerializer(read_only=True)
    class Meta:
        model = Post
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='author.username', read_only=True)
    class Meta:
        model=Comment
        fields = ['id','content','created_at','username','author']

