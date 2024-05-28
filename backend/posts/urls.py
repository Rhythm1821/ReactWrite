from django.urls import path
from . import views

urlpatterns = [
    path('',views.PostListView.as_view(),name='posts'),
    path('<int:pk>/',views.PostDetailView.as_view(),name='post_detail'),
    path('edit/<int:pk>/',views.PostUpdateView.as_view(),name='edit_post'),
    path('delete/<int:pk>/',views.PostDeleteView.as_view(),name='delete_post'),
    
]
