import reversion
import json

from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import serializers, status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

from .models import (TPL, Car, Contract, Inspection, Insurance,  # add this
                     Permission, UserInfo)
from .serializers import (CarSerializer, ContractSerializer, InspectionSerializer,
                          PermissionSerializer, PermissionTaskSerializer,
                          PermissionUserSerializer, TPLSerializer,
                          UpdateUserSerializer, UserSerializer)


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

class UserTestCase(APITestCase):
    TEST_USER = {
                "username": "sample",
                "email": "sample@email.com",
                "first_name": "sample",
                "last_name": "sample",
                "password": "sample!23"
            }
    url = reverse('users-list')
    def setUp(self):
        self.user = User.objects.create_user(**self.TEST_USER)
        self.TEST_PERMISSION = {
                "user": self.user,
                "slug": "sample",
                "can_view_users": True,
                "can_add_users": True,
                "can_edit_users": True,
                "can_delete_users": True,
            }
        self.permission = Permission.objects.create(**self.TEST_PERMISSION)
        self.refresh = RefreshToken.for_user(self.user)
        self.api_auth()

    def api_auth(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.refresh.access_token}')

    def test_user_list(self):
        response = self.client.get(self.url)
        self.assertEqual( response.status_code , status.HTTP_200_OK)

    def test_user_retrieve_detail(self):
        response = self.client.get(reverse('users-detail', kwargs={"pk":"sample"}))
        self.assertEqual( response.status_code , status.HTTP_200_OK)

    def test_permission_list(self):
        self.url = reverse('permission-list')
        response = self.client.get(self.url)
        self.assertEqual( response.status_code , status.HTTP_200_OK)

    def test_permission_retrieve_detail(self):
        self.url = reverse('permission-detail', kwargs={"pk":"sample"})
        response = self.client.get(self.url)
        self.assertEqual( response.status_code , status.HTTP_200_OK)

    def test_permission_maintenance_list(self):
        response = self.client.get('/api/permission/add-list/maintenance/')
        self.assertEqual( response.status_code , status.HTTP_200_OK)

    def test_permission_maintenance_retrieve(self):
        response = self.client.get('/api/permission/add-list/maintenance/', kwargs={"pk":"sample"})
        self.assertEqual( response.status_code , status.HTTP_200_OK)

    def test_permission_inspection_list(self):
        response = self.client.get('/api/permission/add-list/inspection/')
        self.assertEqual( response.status_code , status.HTTP_200_OK)

    def test_permission_inspection_retrieve(self):
        response = self.client.get('/api/permission/add-list/inspection/', kwargs={"pk":"sample"})
        self.assertEqual( response.status_code , status.HTTP_200_OK)

    def test_permission_repair_list(self):
        response = self.client.get('/api/permission/add-list/repair/')
        self.assertEqual( response.status_code , status.HTTP_200_OK)

    def test_permission_repair_retrieve(self):
        response = self.client.get('/api/permission/add-list/repair/', kwargs={"pk":"sample"})
        self.assertEqual( response.status_code , status.HTTP_200_OK)


class ReportTestCase(APITestCase):
    url = reverse('inspection-list')
    TEST_REPORT = {  
            "body_no": "18-1654",  
            "mileage": 10000,  
            "gas_level": 1,  
            "oil_level": 1,  
            "driver": "sample",
        } 
    TEST_USER = {
                "username": "sample",
                "email": "sample@email.com",
                "first_name": "sample",
                "last_name": "sample",
                "password": "sample!23"
            }

    def setUp(self):
        self.user = User.objects.create_user(**self.TEST_USER)
        self.TEST_PERMISSION = {
                "user": self.user,
                "slug": "sample",
                "can_view_inspection_reports": True,
                "can_add_inspection_reports": True,
                "can_edit_inspection_reports": True,
                "can_delete_inspection_reports": True,
            }
        self.permission = Permission.objects.create(**self.TEST_PERMISSION)
        self.CAR = {
                    "vin_no": "PAEL65NYHJB005043",
                    "body_no": "18-1654",
                    "plate_no": "NCT4511",
                    "make": "L30",
                    "current_loc": "Marikina"
                }
        self.car = Car.objects.create(**self.CAR)
        self.refresh = RefreshToken.for_user(self.user)
        self.api_auth()
        self.inspection = Inspection.objects.create(
                    body_no = self.car,  
                    mileage = 10000,  
                    gas_level = 1,  
                    oil_level = 1,  
                    driver =self.user,
                )
        with reversion.create_revision():
            self.inspection.save()
    def api_auth(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.refresh.access_token}')
        
    def test_inspection_report_create(self):
        response = self.client.post('/api/inspection/', self.TEST_REPORT, format='json')
        self.assertEquals(response.status_code, status.HTTP_201_CREATED)

    def test_inspection_report_list(self):
        response = self.client.get('/api/inspection-list/')

        self.assertEqual( response.status_code , status.HTTP_200_OK)

    def test_inspection_report_retrieve(self):
        response = self.client.get('/api/inspection/1/')
        print(response.content)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_inspection_report_update(self):
        response = self.client.put('/api/inspection/1/',
            json.dumps(self.TEST_REPORT),
            content_type = 'application/json'
            )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

