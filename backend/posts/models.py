from django.db import models
from django.contrib.auth.models import User

from users.models import Profile

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    author = models.ForeignKey('users.Profile', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(User, related_name='post_like', blank=True)

    def num_of_likes(self):
        return self.likes.count()

    def __str__(self):
        return self.title