import json

from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import serializers, status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

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
    url = reverse('report-list')
    TEST_REPORT = {
            "slug": "1",
            "vin_no": "1",
            "body_no": "1",
            "cs_no": "1",
            "plate_no": "1",
            "brand": "M",
            "release_year": 2020,
            "make": "1",
            "series": "1",
            "body_type": "1",
            "color": "1",
            "dealer": "DM",
            "dealer_phone": "1",
            "dealer_email": "1@gmail.com",
            "po_no": "1",
            "po_date": "2020-01-01",
            "body_builder": "1",
            "fabricator": "1",
            "sale_price": 1,
            "vat_price": 1,
            "chassis_no": "1",
            "engine_no": "1",
            "battery_no": "1",
            "fuel_type": "D",
            "transmission": "A",
            "denomination": "1",
            "piston": 1,
            "cylinder": 1,
            "procuring_entity": "1",
            "capacity": 1,
            "gross_weight": 1,
            "net_weight": 1,
            "shipping_weight": 1,
            "net_capacity": 1,
            "lto_cr": 1,
            "cr_date": "2020-01-01",
            "or_no": 1,
            "or_date": "2020-01-01",
            "field_office": "1",
            "or_cr": "2020-01-01",
            "permanent_loc": "1",
            "current_loc": "1",
            "delivery_location": "1",
            "deliver_date": "2020-01-01",
            "si_no": 1,
            "dr_no": "1",
            "dr_codes": "1",
            "plate_date": "2020-01-01",
            "decals_date": "2020-01-01",
            "ewd_date": "2020-01-01",
            "tools_date": "2020-01-01",
            "userManual_date": "2020-01-01",
            "warrantyBook_date": "2020-01-01",
            "unitKey_date": "2020-01-01",
            "bodyKey_date": "2020-01-01",
            "cigarettePlug_date": "2020-01-01",
            "keychain_date": "2020-01-01",
            "fan_date": "2020-01-01",
            "remarks": "1",
            "status": "A",
        }
    def setUp(self):
        car = Car.objects.create(**self.TEST_REPORT)
        self.data = {"car": 1,
                    "body_no": "2",
                    "make": "1",
                    "mileage": 0,
                    "location": "1",
                    "gas_level": 1,
                    "oil_level": 1,
                    "notes": "",
                    }
    def test_report_create(self):
        response = self.client.post(self.url, self.data, format='json')
        self.assertEquals(response.status_code, status.HTTP_201_CREATED)

    def test_report_list(self):
        response = self.client.get(self.url)  
        reports = Report.objects.all()
        serializers = ReportSerializer(reports, many=True)
        self.assertEqual(response.data, serializers.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_report_detail(self):
        response = self.client.get(self.url, args=['1'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
