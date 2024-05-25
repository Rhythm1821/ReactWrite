from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.
def home(request):
    return JsonResponse({"message": "Hello World"})

def login_user(request):
    return JsonResponse({'msg':"Login User"})

def register_user(request):
    return JsonResponse({'msg':"Register User"})