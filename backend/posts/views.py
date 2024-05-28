from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework import status

from .models import Post,Profile
from .serializers import PostSerializer

# Create your views here.
class PostListView(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        posts = Post.objects.all()
        author_username = self.request.query_params.get('author', None or '')
        if author_username is not None and author_username != '':
            posts = posts.filter(author__user__username=author_username)
        return posts
    
    def perform_create(self, serializer):
        user = self.request.user
        profile = Profile.objects.get(user=user)
        serializer.save(author=profile)

class PostDetailView(generics.RetrieveAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        post=Post.objects.get(pk=self.kwargs['pk'])
        return post

class PostUpdateView(generics.UpdateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        post=Post.objects.get(pk=self.kwargs['pk'])
        return post

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
            print(f'Post updated for user: {self.request.user}')

class PostDeleteView(generics.DestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        post=Post.objects.get(pk=self.kwargs['pk'])
        return post

    def perform_destroy(self, serializer):
        post = self.get_object()
        post.delete()
        print(f'Post deleted for user: {self.request.user}')