from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated

from .models import Image
from .serializers import ImageInfoSerializer, ReportImageSerializer

# Create your views here.

class UserImageView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    serializer_class = ImageInfoSerializer
    queryset = Image.objects.all().order_by('-id')

    def create(self, request):
        serializer = ImageInfoSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response("Successfully Created",status=status.HTTP_201_CREATED)  
        return Response(serializer.errors)  

    def retrieve(self, request, pk=None):
        queryset = self.filter_queryset(self.get_queryset()).filter(mode="cu")
        image = get_object_or_404(queryset, image_name=pk) 
        serializer = ImageInfoSerializer(image, many=False)
        return Response(serializer.data,status=status.HTTP_200_OK)  
    
    def destroy(self, request, pk=None):
        queryset = self.filter_queryset(self.get_queryset())
        image = get_object_or_404(queryset, pk=pk)
        image.delete()
        return Response("Successfully Deleted",status=status.HTTP_200_OK)  


class ReportImageView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    serializer_class = ReportImageSerializer
    queryset = Image.objects.all().order_by('-id')

    def create(self, request):
        serializer = ReportImageSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response("Successfully Created",status=status.HTTP_201_CREATED)  
        return Response(serializer.errors)  

    def retrieve(self, request, pk=None):
        mode = request.query_params['mode']
        queryset = Image.objects.filter(image_name=pk ,mode=mode)
        serializer = ImageInfoSerializer(queryset, many=True)
        return Response(serializer.data,status=status.HTTP_200_OK) 

    def destroy(self, request, pk=None):
        mode = request.query_params['mode']
        image_pk = list(request.query_params['id'].split(','))
        queryset = Image.objects.filter(pk__in=image_pk, image_name=pk ,mode=mode)
        for image in queryset:
            image.delete()
        return Response("Successfully Deleted",status=status.HTTP_200_OK) 
    