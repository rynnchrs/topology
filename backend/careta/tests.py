from datetime import date
import datetime
import reversion
import json

from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import serializers, status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

from .models import (Maintenance, TPL, Car, Contract, Inspection, Insurance,  # add this
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


class InspectionReportTestCase(APITestCase):
    TEST_REPORT1 = {  
            "body_no": "18-1654",  
            "mileage": 10000,  
            "driver": "sample",
        } 
    
    TEST_REPORT2 = {  
            "body_no": "18-1654",  
            "mileage": 20000,  
            "driver": "sample",
        } 
    TEST_REPORT3 = {  
            "body_no": "18-1654",  
            "mileage": 30000,  
            "driver": "sample",
        } 
    INVALID_REPORT1 = {  
            "body_no": "invalid",  
            "driver": "sample",
    }  
    INVALID_REPORT2 = {  
            "body_no": "18-1654",  
            "driver": "invalid",
    }  
    INVALID_REPORT3 = {  
            "body_no": "18-1654",  
            "gas_level": 5,  
            "oil_level": 5,  
            "driver": "sample",
    } 

    TEST_USER = {
                "username": "sample",
                "email": "sample@email.com",
                "first_name": "sample",
                "last_name": "sample",
                "password": "sample!23"
            }
    TEST_PERMISSION = {
                "slug": "sample",
                "can_view_inspection_reports": True,
                "can_add_inspection_reports": True,
                "can_edit_inspection_reports": True,
                "can_delete_inspection_reports": True,
            }
    TEST_CAR = {
            "vin_no": "PAEL65NYHJB005043",
            "body_no": "18-1654",
            "plate_no": "NCT4511",
            "make": "L30",
            "current_loc": "Marikina"
                }
    

    def setUp(self):
        self.user = User.objects.create_user(**self.TEST_USER) # create user
        self.client.force_authenticate(self.user) # authenticate user
        self.permission = Permission.objects.create(user = self.user,**self.TEST_PERMISSION) # create permission
        self.car = Car.objects.create(**self.TEST_CAR) # create car
        self.inspection = Inspection.objects.create( body_no = self.car, driver=self.user) # create initial inspection report
        with reversion.create_revision(): # create reversion for inspection report
            self.inspection.save()
            
    def test_inspection_report_list(self):
        response = self.client.get('/api/inspection-list/') # list of inspection report
        self.assertEqual( response.status_code , status.HTTP_200_OK)


    def test_inspection_report_retrieve(self): # retrieve inspection report
        response = self.client.get('/api/inspection/1/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_inspection_report_create(self): # create inspection report
        response = self.client.post('/api/inspection/', self.TEST_REPORT1, format='json')
        self.assertEquals(response.status_code, status.HTTP_201_CREATED)


    def test_inspection_report_create_invalid(self): # try invalid report
        # invalid body_no
        response1 = self.client.post('/api/inspection/', self.INVALID_REPORT1, format='json')
        # invalid driver
        response2 = self.client.post('/api/inspection/', self.INVALID_REPORT2, format='json')
        #invalid choice fields
        response3 = self.client.post('/api/inspection/', self.INVALID_REPORT3, format='json')
        self.assertEquals(response1.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEquals(response2.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEquals(response3.status_code, status.HTTP_400_BAD_REQUEST)


    def test_inspection_report_create_multiple(self): # create multiple inspection report with same body_no
        response1 = self.client.post('/api/inspection/', self.TEST_REPORT1, format='json')
        response2 = self.client.post('/api/inspection/', self.TEST_REPORT2, format='json')
        response3 = self.client.post('/api/inspection/', self.TEST_REPORT3, format='json')
        self.assertEquals(response1.status_code, status.HTTP_201_CREATED)
        self.assertEquals(response2.status_code, status.HTTP_201_CREATED)
        self.assertEquals(response3.status_code, status.HTTP_201_CREATED)
        #retrieve inspection rerpot
        retrieve1 = self.client.get('/api/inspection/1/')
        retrieve2 = self.client.get('/api/inspection/2/')
        retrieve3 = self.client.get('/api/inspection/3/')
        retrieve4 = self.client.get('/api/inspection/4/')
        # first 3 reports must deleted
        self.assertEquals(retrieve1.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEquals(retrieve2.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEquals(retrieve3.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEquals(retrieve4.status_code, status.HTTP_200_OK)

    
    def test_inspection_report_update(self): # update inspection report 
        response = self.client.put('/api/inspection/1/',
            json.dumps(self.TEST_REPORT1),
            content_type = 'application/json'
            )
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_inspection_report_update_invalid(self): #update invalid inspection report
        response = self.client.put('/api/inspection/1/',
            json.dumps(self.INVALID_REPORT1),
            content_type = 'application/json'
            )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


    def test_inspection_report_update_multiple(self): # multiple update
        response = self.client.put('/api/inspection/1/',
            json.dumps(self.TEST_REPORT2),
            content_type = 'application/json'
            )
        retrieve1 = self.client.get('/api/inspection/1/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = self.client.put('/api/inspection/1/',
            json.dumps(self.TEST_REPORT3),
            content_type = 'application/json'
            )
        retrieve2 = self.client.get('/api/inspection/1/')
        self.assertNotEqual(retrieve1.content, retrieve2.content) # the content must not equal
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class MaintenanceReportTestCase(APITestCase):
    TEST_REPORT1 = {  
            "body_no": "18-1654",   
            "mileage": 20000,  
            "inspected_by": "sample",
        } 
    
    TEST_REPORT2 = {  
            "body_no": "18-1654",  
            "mileage": 20000,  
            "inspected_by": "sample",
        } 
    TEST_REPORT3 = {  
            "body_no": "18-1654",  
            "mileage": 30000,  
            "inspected_by": "sample",
        } 
    INVALID_REPORT1 = {  
            "body_no": "invalid",  
            "inspected_by": "sample",
    }  
    INVALID_REPORT2 = {  
            "body_no": "18-1654",  
            "inspected_by": "invalid",
    }  
    INVALID_REPORT3 = {  
            "body_no": "18-1654",  
            "tread_depth" : 4,
            "exterior_body": 4,
            "inspected_by": "sample",
    } 

    TEST_USER = {
                "username": "sample",
                "email": "sample@email.com",
                "first_name": "sample",
                "last_name": "sample",
                "password": "sample!23"
            }
    TEST_PERMISSION = {
                "slug": "sample",
                "can_view_maintenance_reports": True,
                "can_add_maintenance_reports": True,
                "can_edit_maintenance_reports": True,
                "can_delete_maintenance_reports": True,
            }
    TEST_CAR = {
            "vin_no": "PAEL65NYHJB005043",
            "body_no": "18-1654",
            "plate_no": "NCT4511",
            "make": "L30",
            "current_loc": "Marikina"
                }
    

    def setUp(self):
        self.user = User.objects.create_user(**self.TEST_USER) #create user
        self.client.force_authenticate(self.user) # authenticate user
        self.permission = Permission.objects.create(user = self.user,**self.TEST_PERMISSION) # create permission
        self.car = Car.objects.create(**self.TEST_CAR) # create car instance
        self.maintenance = Maintenance.objects.create(body_no = self.car, inspected_by=self.user) # create maintenance
        with reversion.create_revision(): # create reversion
            self.maintenance.save()
            
    def test_maintenance_report_list(self):
        response = self.client.get('/api/maintenance-list/') # list of maintenanc report
        self.assertEqual( response.status_code, status.HTTP_200_OK)


    def test_maintenance_report_retrieve(self):
        response = self.client.get('/api/maintenance/1/') # retrieve maintenance report
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_maintenance_report_create(self):
        response = self.client.post('/api/maintenance/', self.TEST_REPORT1, format='json') # create maintenance report
        self.assertEquals(response.status_code, status.HTTP_201_CREATED)


    def test_maintenance_report_create_invalid(self):
        # invalid body_no
        response1 = self.client.post('/api/maintenance/', self.INVALID_REPORT1, format='json')
        # invalid inspected_by
        response2 = self.client.post('/api/maintenance/', self.INVALID_REPORT2, format='json')
        # invalid choice field 
        response3 = self.client.post('/api/maintenance/', self.INVALID_REPORT3, format='json')
        self.assertEquals(response1.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEquals(response2.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEquals(response3.status_code, status.HTTP_400_BAD_REQUEST)


    def test_maintenance_report_create_multiple(self):
        # create maintenance report 
        response1 = self.client.post('/api/maintenance/', self.TEST_REPORT1, format='json')
        response2 = self.client.post('/api/maintenance/', self.TEST_REPORT2, format='json')
        response3 = self.client.post('/api/maintenance/', self.TEST_REPORT3, format='json')
        self.assertEquals(response1.status_code, status.HTTP_201_CREATED)
        self.assertEquals(response2.status_code, status.HTTP_201_CREATED)
        self.assertEquals(response3.status_code, status.HTTP_201_CREATED)
        # retrieve maintenance report
        retrieve1 = self.client.get('/api/maintenance/1/')
        retrieve2 = self.client.get('/api/maintenance/2/')
        retrieve3 = self.client.get('/api/maintenance/3/')
        retrieve4 = self.client.get('/api/maintenance/4/')
        # the first 3 report must not found
        self.assertEquals(retrieve1.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEquals(retrieve2.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEquals(retrieve3.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEquals(retrieve4.status_code, status.HTTP_200_OK)    

    
    def test_maintenance_report_update(self):
        response = self.client.put('/api/maintenance/1/', # update maintenance report
            json.dumps(self.TEST_REPORT1),
            content_type = 'application/json'
            )
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_maintenance_report_update_invalid(self): # invalid update 
        response = self.client.put('/api/maintenance/1/',
            json.dumps(self.INVALID_REPORT1),
            content_type = 'application/json'
            )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


    def test_maintenance_report_update_multiple(self): # multiple update
        response = self.client.put('/api/maintenance/1/',
            json.dumps(self.TEST_REPORT2),
            content_type = 'application/json'
            )
        retrieve1 = self.client.get('/api/maintenance/1/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = self.client.put('/api/maintenance/1/',
            json.dumps(self.TEST_REPORT3),
            content_type = 'application/json'
            )
        retrieve2 = self.client.get('/api/maintenance/1/')
        self.assertNotEqual(retrieve1.content, retrieve2.content) # the content must not equal
        self.assertEqual(response.status_code, status.HTTP_200_OK)