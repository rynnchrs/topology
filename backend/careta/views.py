from django.shortcuts import render
from rest_framework import viewsets  # add this
from .serializers import CarSerializer, ContractSerializer, PermissionSerializer, TPLSerializer, InsuranceSerializer, UserInfoSerializer  , UserSerializer# add this
from .models import Car, Contract, Permission, TPL, Insurance, UserInfo  # add this

from rest_framework import generics, status     # add this
from rest_framework.response import Response    # add this
from rest_framework.views import APIView    # add this
from django.contrib.auth.models import User     # add this
from rest_framework_simplejwt.tokens import RefreshToken    # add this

class RegisterView(generics.GenericAPIView): # add this
    serializer_class = UserSerializer # add this
    def post(self, request): # add this
        serializer = UserSerializer(data=request.data) # add this
        if serializer.is_valid(raise_exception=True): # add this
            serializer.save() # add this
            return Response("Successfully Register") # add this
        return Response(serializer.error_messages) # add this

class BlacklistTokenView(APIView): # add this
    def post(self, request):    # add this
        try:        # add this
            refresh_token = request.data.get("refresh_token")   # add this
            token = RefreshToken(refresh_token) # add this
            token.blacklist()   # add this
        except Exception as e:  # add this
            return Response(status=status.HTTP_400_BAD_REQUEST) # add this

class UserView(viewsets.ModelViewSet):   # add this
    queryset = User.objects.all()   # add this
    serializer_class = UserSerializer   # add this
    lookup_field = 'username'   # add this
    
class PermissionView(viewsets.ModelViewSet): # add this
    queryset = Permission.objects.all() # add this
    serializer_class = PermissionSerializer # add this
    lookup_field = 'slug'   # add this

class CarView(viewsets.ModelViewSet):  # add this
    queryset = Car.objects.all()  # add this
    serializer_class = CarSerializer  # add this
    lookup_field = 'slug'


class ContractView(viewsets.ModelViewSet):  # add this
    queryset = Contract.objects.all()  # add this
    serializer_class = ContractSerializer  # add this
    lookup_field = 'slug'


class TPLView(viewsets.ModelViewSet):  # add this
    queryset = TPL.objects.all()  # add this
    serializer_class = TPLSerializer  # add this
    lookup_field = 'slug'


class InsuranceView(viewsets.ModelViewSet):  # add this
    queryset = Insurance.objects.all()  # add this
    serializer_class = InsuranceSerializer  # add this
    lookup_field = 'slug'


class InsuranceList(generics.ListAPIView):
    serializer_class = InsuranceSerializer

    def get_queryset(self):
        username = self.kwargs['username']
        return Insurance.objects.filter(car=username)
