from django.urls import path
from . import views

urlpatterns = [
    path('',views.PostListView.as_view(),name='posts'),
    path('edit/',views.PostUpdateView.as_view(),name='edit_post'),
]
