from abc import abstractmethod
from django.shortcuts import render
from rest_framework import viewsets  # add this
from .serializers import CarSerializer, ContractSerializer, PermissionInventorySerializer, PermissionReportSerializer, PermissionSerializer, PermissionTaskSerializer, TPLSerializer, InsuranceSerializer, UserSerializer , PermissionUserSerializer# add this
from .models import Car, Contract, Permission, TPL, Insurance, UserInfo  # add this

from rest_framework import generics, status     # add this
from rest_framework.response import Response    # add this
from rest_framework.views import APIView    # add this
from django.contrib.auth.models import User     # add this
from rest_framework_simplejwt.tokens import RefreshToken    # add this
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated

class RegisterView(generics.GenericAPIView):  # for register user
    serializer_class = UserSerializer # add this
    def post(self, request): # add this
        serializer = UserSerializer(data=request.data) # add this
        if serializer.is_valid(raise_exception=True): # add this
            serializer.save() # add this
            return Response("Successfully Register") # add this
        return Response(serializer.error_messages) # add this

class BlacklistTokenView(APIView):      # for Logout
    def post(self, request):    
        try:       
            refresh_token = request.data.get("refresh_token")   
            token = RefreshToken(refresh_token)
            token.blacklist()  
        except Exception as e:  
            return Response(status=status.HTTP_400_BAD_REQUEST) 

class UserView(viewsets.ModelViewSet):   # User ModelViewSet view, create, update, delete

    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()   # add this
    serializer_class = UserSerializer  # add this

    def list(self, request):        # User List
        user = self.request.user
        permission = Permission.objects.get(slug=user.username) # get users permission
        user = User.objects.get(username=user)
        if permission.can_view_users == True:    # permission
            queryset = User.objects.all()
            serializer = UserSerializer(queryset, many=True)
            return Response(serializer.data)            
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def create(self, request):  # create user
        user = self.request.user
        permission = Permission.objects.get(slug=user.username) # get users permission
        user = User.objects.get(username=user)  # get current user
        if permission.can_add_users == True:      # permission
            serializer = UserSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
            return Response(serializer.data)          
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
            
    def retrieve(self, request, pk=None):   # retrieve user
        user = self.request.user
        permission = Permission.objects.get(slug=user)  # get users permission
        user = User.objects.get(username=user)      # get current user
        if permission.can_view_users == True:       # permission
            queryset = User.objects.all()
            users = get_object_or_404(queryset, username=pk)
            serializer = UserSerializer(users,  many=False)
            return Response(serializer.data)          
        else:
            if pk == permission.slug:       # if current user is equal to pk
                serializer = UserSerializer(user,  many=False)
                return Response(serializer.data)
            else:    
                return Response(status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):     # update user
        user = self.request.user
        permission = Permission.objects.get(slug=user) # get users permission
        user = User.objects.get(username=user)  # get current user
        if permission.can_edit_users == True:   # permission
            queryset = User.objects.all()
            users = get_object_or_404(queryset, username=pk)
            serializer = UserSerializer(instance=users, data=request.data)
            if serializer.is_valid():
                serializer.save()
            return Response("success")       
        else:
            if pk == permission.slug:   # if current user is equal to pk
                serializer = UserSerializer(instance=user, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                return Response("success")
            else:    
                return Response(status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):       # delete user
        user = self.request.user    
        permission = Permission.objects.get(slug=user)      # get users permission
        user = User.objects.get(username=user)  # get current user
        if permission.can_delete_users == True: # permission
            queryset = User.objects.all()
            users = get_object_or_404(queryset, username=pk)
            users.delete()
            return Response('Successfully deleted.')        
        else: 
            return Response(status=status.HTTP_400_BAD_REQUEST)       

class PermissionView(viewsets.ViewSet):  # permission ViewSet
    permission_classes = [IsAuthenticated]
    serializer_class = PermissionSerializer 

    def create(self, request):      # create permission
        user = self.request.user
        permission = Permission.objects.get(slug=user.username) # get permission
        if permission.can_add_users == True:    # permission
            serializer = PermissionSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
            return Response(serializer.data)          
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):    # Permission List
        user = self.request.user
        permission = Permission.objects.get(slug=user.username)
        user = User.objects.get(username=user)
        if permission.can_view_users == True:   
            queryset = Permission.objects.all()
            serializer = PermissionSerializer(queryset, many=True)
            return Response(serializer.data)            
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):       # retrieve permission
        user = self.request.user    # get current user
        permission = Permission.objects.get(slug=user)  # get permission
        if permission.can_view_users == True:
            queryset = Permission.objects.all()
            users = get_object_or_404(queryset, slug=pk)
            serializer = PermissionSerializer(users,  many=False)
            return Response(serializer.data)          
        else:
            if pk == permission.slug:    # if current user is equal to pk
                queryset = Permission.objects.all()
                users = get_object_or_404(queryset, slug=pk)
                serializer = PermissionSerializer(users,  many=False)
                return Response(serializer.data)
            else:    
                return Response(status=status.HTTP_400_BAD_REQUEST)

class PermissionUserView(viewsets.ViewSet): # User permission ViewSet
    permission_classes = [IsAuthenticated]
    serializer_class = PermissionUserSerializer  # add this

    # def retrieve(self, request, pk=None):
    #     queryset = Permission.objects.all()
    #     permission = get_object_or_404(queryset, slug=pk)
    #     serializer_class = PermissionUserSerializer(permission)
    #     return Response(serializer_class.data)

    def update(self, request, pk=None):     # update user permission
        user = self.request.user
        permission = Permission.objects.get(slug=user)  # get permission
        if permission.can_edit_users == True:       # permission
            queryset = Permission.objects.all()
            users = get_object_or_404(queryset, slug=pk)
            serializer = PermissionUserSerializer(instance=users, data=request.data)
            if serializer.is_valid():
                serializer.save()
            return Response("success")       
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):    # delete user permission
        user = self.request.user
        permission = Permission.objects.get(slug=user)      # get permission
        if permission.can_delete_users == True:         # permission
            queryset = Permission.objects.all()
            user = get_object_or_404(queryset, slug=pk)
            user.delete()
            return Response('Successfully deleted.')        
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST) 

class PermissionInventoryView(viewsets.ViewSet): # Inventory permission ViewSet
    permission_classes = [IsAuthenticated]
    serializer_class = PermissionInventorySerializer
    # def retrieve(self, request, pk=None):
    #     queryset = Permission.objects.all()
    #     permission = get_object_or_404(queryset, slug=pk)
    #     serializer_class = PermissionInventorySerializer(permission)
    #     return Response(serializer_class.data)

    def update(self, request, pk=None): # update inventory permission
        user = self.request.user
        permission = Permission.objects.get(slug=user)  # get permission
        if permission.can_edit_users == True:   # permission
            queryset = Permission.objects.all()
            users = get_object_or_404(queryset, slug=pk)
            serializer = PermissionInventorySerializer(instance=users, data=request.data)

            if serializer.is_valid():
                serializer.save()
            return Response("success")       
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):        # delete inventory permission        
        user = self.request.user
        permission = Permission.objects.get(slug=user)  # get permission
        if permission.can_delete_users == True:     # permission
            queryset = Permission.objects.all()
            user = get_object_or_404(queryset, slug=pk)
            user.delete()
            return Response('Successfully deleted.')        
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class PermissionReportView(viewsets.ViewSet): # Reports permission ViewSet
    permission_classes = [IsAuthenticated]
    serializer_class = PermissionReportSerializer
    # def retrieve(self, request, pk=None):
    #     queryset = Permission.objects.all()
    #     permission = get_object_or_404(queryset, slug=pk)
    #     serializer_class = PermissionReportSerializer(permission)
    #     return Response(serializer_class.data)

    def update(self, request, pk=None):     # update report permission
        user = self.request.user
        permission = Permission.objects.get(slug=user)  # get permission
        if permission.can_edit_users == True:   # permission
            queryset = Permission.objects.all()
            users = get_object_or_404(queryset, slug=pk)
            serializer = PermissionInventorySerializer(instance=users, data=request.data)
            if serializer.is_valid():
                serializer.save()
            return Response("success")       
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):    # delete current permission
        user = self.request.user
        permission = Permission.objects.get(slug=user)  # get permission
        if permission.can_delete_users == True:     # permission
            queryset = Permission.objects.all()
            user = get_object_or_404(queryset, slug=pk)
            user.delete()
            return Response('Successfully deleted.')        
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class PermissionTaskView(viewsets.ViewSet):     # Task Permission ViewSet
    permission_classes = [IsAuthenticated]
    serializer_class = PermissionTaskSerializer
    # def retrieve(self, request, pk=None):
    #     queryset = Permission.objects.all()
    #     permission = get_object_or_404(queryset, slug=pk)
    #     serializer_class = PermissionTaskSerializer(permission)
    #     return Response(serializer_class.data)

    def update(self, request, pk=None):     # update task permission
        user = self.request.user
        permission = Permission.objects.get(slug=user)  # get permission
        if permission.can_edit_users == True:       # permission
            queryset = Permission.objects.all()
            users = get_object_or_404(queryset, slug=pk)
            serializer = PermissionInventorySerializer(instance=users, data=request.data)
            if serializer.is_valid():
                serializer.save()
            return Response("success")       
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):    # delete task permission
        user = self.request.user
        permission = Permission.objects.get(slug=user)  # get permission
        if permission.can_delete_users == True:     # permission
            queryset = Permission.objects.all()
            user = get_object_or_404(queryset, slug=pk)
            user.delete()
            return Response('Successfully deleted.')        
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

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
