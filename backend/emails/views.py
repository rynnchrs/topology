from datetime import date

from django.conf import settings
from django.core.mail import EmailMessage, send_mail
from report.models import FieldInspection
from rest_framework import serializers, status, viewsets
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Email
from .serializer import EmailSerializer, SendEmailSerializer
from .utils import user_permission


class PDFtoEmail(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def create(self, request):
        serializer = SendEmailSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            queryset = FieldInspection.objects.all()
            inspection = get_object_or_404(queryset, pk=request.data['fi_report_id'])
            subject =  f"Inspection Report for {inspection.body_no.body_no}"
            body = f"{request.data['body']}<br><br>Please see the attached url.<br>http://localhost:3000/#/pdfget/?id={inspection}"
            to = request.data['email']
            try:
                email = EmailMessage(subject, body, settings.EMAIL_HOST_USER, to)
                email.content_subtype = "html"
                email.send()
            except:
                return Response("Failed", status=status.HTTP_400_BAD_REQUEST)
            return Response("Success", status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)        

    @action(detail=False, methods=['post'])
    def bulk(self, request):
        
        reports = FieldInspection.objects.filter(inspection_date=date.today())
        if not reports:
            return Response("No Reports yet.", status=status.HTTP_400_BAD_REQUEST)
        
        serializer = SendEmailSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            subject =  "Inspection Report for"

            body =  f"{request.data['body']}<br><br>"
            body += "Please see the attached url.<br>"
            to = request.data['email']

            for report in reports:
                subject += f' {report.body_no.body_no},'
                body += f'http://localhost:3000/#/pdfget/?id={report}<br>'
            subject = subject[:-1] + '.'
            try:
                email = EmailMessage(subject, body, settings.EMAIL_HOST_USER, to)
                email.content_subtype = "html"
                email.send()
            except:
                return Response("Failed", status=status.HTTP_400_BAD_REQUEST)
            return Response("Success", status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    


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

  