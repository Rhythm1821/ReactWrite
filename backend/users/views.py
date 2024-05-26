from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.generics import CreateAPIView

from .serializers import RegisterSerializer

class RegistrationView(CreateAPIView):
    queryset=User.objects.all()
    serializer_class=RegisterSerializer
    permission_classes=[AllowAny]

"""
{
"username":"user01",
"email":user01@mail.com,
"password":"123"
}

account
{
    "username": "newuser",
    "email": "newuser@example.com",
    "password": "yourpassword"
}

tokens
{
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxNjczNDM1NSwiaWF0IjoxNzE2NjQ3OTU1LCJqdGkiOiJmYjI4NGY2MDlkNWI0ZjY0YWM2ZTcyNDZlMWI5YWUwMCIsInVzZXJfaWQiOjJ9.0cUwIYSAlkWbBTgslT319pFOcCaOl0Yw8MKvf45yTXM",
    "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE2NjQ4MjU1LCJpYXQiOjE3MTY2NDc5NTUsImp0aSI6IjBhMWRiZjcyZjk4YjQxMDdhNDU3OTYwZWJlN2ZmMDFhIiwidXNlcl9pZCI6Mn0.QCOS9odNyvtGh97IB4Tm25cbAhg-5Z1DCwSMFWXbopk"
}
"""


# class RegistrationView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         serializer = RegisterSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.save()
#             refresh = RefreshToken.for_user(user)
#             return Response({
#                 'refresh': str(refresh),
#                 'access': str(refresh.access_token),
#             }, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)