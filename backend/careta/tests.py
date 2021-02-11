import json

from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import serializers, status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from .models import (TPL, Car, Contract, Insurance, Permission,  # add this
                     Report, UserInfo)
from .serializers import (CarSerializer, ContractSerializer,  # add this
                          InsuranceSerializer,
                          PermissionInspectionReportSerializer,
                          PermissionInventorySerializer,
                          PermissionMaintenanceReportSerializer,
                          PermissionRepairReportSerializer,
                          PermissionSerializer, PermissionTaskSerializer,
                          PermissionUserSerializer, ReportSerializer,
                          TPLSerializer, UpdateUserSerializer, UserSerializer)

class RegistrationTestCase(APITestCase):

    def test_registration(self):
        data = {
                "username": "test",
                "email": "test@email.com",
                "first_name": "test",
                "last_name": "test",
                "password": "test123!",
                "user_info": {
                    "company": "test",
                    "position": "test",
                    "gender": "M",
                    "birthday": "1998-02-07",
                    "phone": "123",
                    "address": "test"
                }
               }
        url = reverse('register')
        response = self.client.post(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_201_CREATED)

# class CreateUsersTestCase(APITestCase):

#     url = reverse('users-list')

#     def setUp(self):
#         self. data = {
#                 "username": "test",
#                 "email": "test@email.com",
#                 "first_name": "test",
#                 "last_name": "test",
#                 "password": "test123!",
#                 "user_info": {
#                     "company": "test",
#                     "position": "test",
#                     "gender": "M",
#                     "birthday": "1998-02-07",
#                     "phone": "123",
#                     "address": "test"
#                 }
#                }
#     def test_report_create(self):
#         response = self.client.post(self.url, data=json.dumps(self.data), content_type='application/json')
#         self.assertEquals(response.status_code, status.HTTP_200_OK)


class CreateReportTestCase(APITestCase):

    url = reverse('report-list')

    def setUp(self):
        Car.objects.create(slug= "1",)
        car = Car.objects.get(car_id=1)
        self.data = {
                    "car": car,
                    "body_no": "1",
                    "make": "1",
                    "mileage": 1,
                    "location": "1",
                    "notes": "1",
                    }
    def test_report_create(self):
        response = self.client.post(self.url, data=json.dumps(self.data), content_type='application/json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)

    def test_report_list(self):
        response = self.client.get(self.url)
        reports = Report.objects.all()
        serializers = ReportSerializer(reports, many=True)
        self.assertEqual(response.data, serializers.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_report_detail(self):
        response = self.client.get(self.url, kwargs={'pk': self.data.pk})
        report = Report.objects.get(pk=self.data.pk)
        serializer = ReportSerializer(report)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
