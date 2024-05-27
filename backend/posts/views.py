from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import Post
from .serializers import PostSerializer

# Create your views here.
class PostList(generics.ListCreateAPIView):
    # queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        posts = Post.objects.all()
        author_username = self.request.query_params.get('author', None)
        print("Author", author_username)
        if author_username is not None:
            posts = posts.filter(author__user__username=author_username)
        return posts