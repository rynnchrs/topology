from django.conf import settings
from django.core.mail import EmailMessage, send_mail
from rest_framework import serializers, status, viewsets
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Email
from .serializer import EmailSerializer
from .utils import user_permission

MAX_UPLOAD_SIZE = 26214400
                  
class PDFtoEmail(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def create(self, request):
        email = EmailMessage()
        pdf = request.FILES['pdf']
        email.subject = request.data['subject']
        email.body= request.data['body']
        email.to = [request.data['email'],]
        email.from_email = settings.EMAIL_HOST_USER
        email.attach(pdf.name, pdf.read(), pdf.content_type)
        email.send()
        return Response("Success", status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def bulk(self, request):

        email = EmailMessage()
        pdf_data = request.data.getlist('pdf')

        size = 0
        for pdf in pdf_data:
            size += pdf.size

        subject =  request.data['subject']
        body= request.data['body']
        to = [request.data['email'],]
        email = EmailMessage(subject, body, settings.EMAIL_HOST_USER, to)

        if size >= MAX_UPLOAD_SIZE:
            mail = EmailMessage(subject, body, settings.EMAIL_HOST_USER, to)
            leng = int((len(pdf_data)/2))
            for i in range(leng):
                email.attach(pdf_data[i].name, pdf_data[i].read(), pdf_data[i].content_type)
            pdf_data.reverse()
            for i in range(len(pdf_data)-leng):
                mail.attach(pdf_data[i].name, pdf_data[i].read(), pdf_data[i].content_type)
            email.send()
            mail.send()
            return Response("Success", status=status.HTTP_200_OK)
        else:
            for pdf in pdf_data:
                email.attach(pdf.name, pdf.read(), pdf.content_type)
            email.send()
        return Response("Success", status=status.HTTP_200_OK)

        
class EmailView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Email.objects.all().order_by('-email_id')
    serializer_class = EmailSerializer
    
    def list(self, request):    
        user = self.request.user
        if user_permission(user, 'can_add_checklist'):  
            queryset = self.filter_queryset(self.get_queryset())
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = EmailSerializer(page, many=True)
                return self.get_paginated_response(serializer.data)      
            serializer = EmailSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK) 

    def create(self, request):
        serializer = EmailSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response("Successfully Created",status=status.HTTP_201_CREATED)  
        return Response(serializer.errors)  

    def retrieve(self, request, pk=None):
        queryset = self.filter_queryset(self.get_queryset())
        email = get_object_or_404(queryset, pk=pk)
        serializer = EmailSerializer(instance=email, many=False)
        return Response(serializer.data,status=status.HTTP_200_OK)  

    def destroy(self, request, pk=None):
        queryset = self.filter_queryset(self.get_queryset())
        email = get_object_or_404(queryset, pk=pk)
        email.delete()
        return Response("Successfully Deleted",status=status.HTTP_200_OK)  

  