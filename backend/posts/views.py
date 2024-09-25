from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User

from .models import Post,Profile
from .serializers import PostSerializer,CommentSerializer

# Create your views here.
class PostListView(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        posts = Post.objects.all().order_by('-created_at')
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
    permission_classes = [AllowAny]

    def get_object(self):
        post=Post.objects.get(pk=self.kwargs['pk'])
        return post

class PostUpdateView(generics.UpdateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        post=Post.objects.get(pk=self.kwargs['pk'])
        return post
    
    def update(self, request, *args, **kwargs):
        post = self.get_object()
        data = request.data
        profile = Profile.objects.get(id=data['author'])
        post.title = data['title']
        post.content = data['content']
        post.author = profile
        post.save()
        serializer = self.get_serializer(post)
        return Response(serializer.data)


class PostDeleteView(generics.DestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        post=Post.objects.get(pk=self.kwargs['pk'])
        return post

    def perform_destroy(self, serializer):
        post = self.get_object()
        post.delete()

from django.http import HttpResponse
def postLike(request, postId):
    post = Post.objects.get(id=postId)
    user = request.user
    if user in post.likes.all():
        post.likes.remove(user)
    else:
        post.likes.add(user)

    return HttpResponse('Success')
    
class PostLikeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, postId):
        post = Post.objects.get(id=postId)
        user = request.user
        if user in post.likes.all():
            post.likes.remove(user)
        else:
            post.likes.add(user)
        return Response(post.num_of_likes())
    
    def get(self, request, postId):
        post = Post.objects.get(id=postId)
        return Response(request.user in post.likes.all())
    
class PostCommentView(APIView):

    def get_permissions(self):
        if self.request.method == 'POST':
            self.permission_classes = [IsAuthenticated]
        else:
            self.permission_classes = [AllowAny]
        return super().get_permissions()

    def get(self, request, postId):
        post = Post.objects.get(id=postId)
        comments = post.comments.all().order_by('-created_at')
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)
    
    def post(self,request, postId):
        post = Post.objects.get(id=postId)
        data = request.data
        author = User.objects.get(id=data['author'])
        print("author",author)
        comment = data['content']
        post.comments.create(author=author, content=comment)
        return Response(status=status.HTTP_200_OK)