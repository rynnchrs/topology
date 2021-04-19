import json

import reversion
from careta.models import Car, Permission, UserInfo, JobOrder
from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Inspection, Maintenance

# Create your tests here.

class InspectionReportTestCase(APITestCase):
    TEST_REPORT1 = {  
            "body_no": "18-1654",  
            "mileage": 10000,  
            "driver": "sample",
            "edited_by": "",
        } 
    
    TEST_REPORT2 = {  
            "body_no": "18-1654",  
            "mileage": 20000,  
            "driver": "sample",
            "edited_by": "",
        } 
    TEST_REPORT3 = {  
            "body_no": "18-1654",  
            "mileage": 30000,  
            "driver": "sample",
            "edited_by": "",
        } 
    INVALID_REPORT1 = {  
            "body_no": "invalid",  
            "driver": "sample",
            "edited_by": "",
    }  
    INVALID_REPORT2 = {  
            "body_no": "18-1654",  
            "driver": "invalid",
            "edited_by": "",
    }  
    INVALID_REPORT3 = {  
            "body_no": "18-1654",  
            "gas_level": 5,  
            "oil_level": 5,  
            "driver": "sample",
            "edited_by": "",
    }  
    INVALID_REPORT4 = {  
            "body_no": "18-1654",  
            "driver": "sample",
            "edited_by": "invalid",
    } 

    TEST_USER = {
                "username": "sample",
                "email": "sample@email.com",
                "first_name": "sample",
                "last_name": "sample",
                "password": "sample!23",
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
        UserInfo.objects.create(user=self.user)
        self.client.force_authenticate(self.user) # authenticate user
        self.permission = Permission.objects.create(user = self.user,**self.TEST_PERMISSION) # create permission
        self.car = Car.objects.create(**self.TEST_CAR) # create car
        self.inspection = Inspection.objects.create( body_no = self.car, driver=self.user) # create initial inspection report
        with reversion.create_revision(): # create reversion for inspection report
            self.inspection.save()
            
    def test_inspection_report_list(self):
        response = self.client.get('/report/inspection-list/') # list of inspection report
        self.assertEqual( response.status_code , status.HTTP_200_OK)

    def test_inspection_report_list(self):
        response1 = self.client.post('/report/inspection/', self.TEST_REPORT1, format='json')
        response = self.client.get('/report/inspection/can_view_list/') # list of inspection report
        self.assertEqual( response.status_code , status.HTTP_200_OK)
        response = self.client.get('/report/inspection/can_view_list/?search=18-1654') # filter with body no
        self.assertNotEquals( response.content , response1.content)
        response = self.client.get('/report/inspection/can_view_list/?search=NCT4511') # filter with plate no
        self.assertNotEquals( response.status_code , response1.content)
        response = self.client.get('/report/inspection/can_view_list/?search=Marikina') # lfilter with location
        self.assertNotEquals( response.status_code , response1.content)
        response = self.client.get('/report/inspection/can_view_list/?search=PAEL65NYHJB005043') # filter with vin no
        self.assertNotEquals( response.status_code , response1.content)
        response = self.client.get('/report/inspection/can_view_list/?search=L30') # filter with make
        self.assertNotEquals( response.status_code , response1.content)

    def test_inspection_report_retrieve(self): # retrieve inspection report
        response = self.client.get('/report/inspection/1/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_inspection_report_create(self): # create inspection report
        response = self.client.post('/report/inspection/', self.TEST_REPORT1, format='json')
        self.assertEquals(response.status_code, status.HTTP_201_CREATED)


    def test_inspection_report_create_invalid(self): # try invalid report
        # invalid body_no
        response1 = self.client.post('/report/inspection/', self.INVALID_REPORT1, format='json')
        # invalid driver
        response2 = self.client.post('/report/inspection/', self.INVALID_REPORT2, format='json')
        #invalid choice fields
        response3 = self.client.post('/report/inspection/', self.INVALID_REPORT3, format='json')
        #invalid edited_by
        response4 = self.client.post('/report/inspection/', self.INVALID_REPORT4, format='json')
        self.assertEquals(response1.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEquals(response2.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEquals(response3.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEquals(response4.status_code, status.HTTP_400_BAD_REQUEST)


    def test_inspection_report_create_multiple(self): # create multiple inspection report with same body_no
        response1 = self.client.post('/report/inspection/', self.TEST_REPORT1, format='json')
        response2 = self.client.post('/report/inspection/', self.TEST_REPORT2, format='json')
        response3 = self.client.post('/report/inspection/', self.TEST_REPORT3, format='json')
        self.assertEquals(response1.status_code, status.HTTP_201_CREATED)
        self.assertEquals(response2.status_code, status.HTTP_201_CREATED)
        self.assertEquals(response3.status_code, status.HTTP_201_CREATED)
        #retrieve inspection rerpot
        retrieve1 = self.client.get('/report/inspection/1/')
        retrieve2 = self.client.get('/report/inspection/2/')
        retrieve3 = self.client.get('/report/inspection/3/')
        retrieve4 = self.client.get('/report/inspection/4/')
        # first 3 reports must deleted
        self.assertEquals(retrieve1.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEquals(retrieve2.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEquals(retrieve3.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEquals(retrieve4.status_code, status.HTTP_200_OK)

    
    def test_inspection_report_update(self): # update inspection report 
        response = self.client.put('/report/inspection/1/',
            json.dumps(self.TEST_REPORT1),
            content_type = 'application/json'
            )
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_inspection_report_update_invalid(self): #update invalid inspection report
        response = self.client.put('/report/inspection/1/',
            json.dumps(self.INVALID_REPORT1),
            content_type = 'application/json'
            )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


    def test_inspection_report_update_multiple(self): # multiple update
        response = self.client.put('/report/inspection/1/',
            json.dumps(self.TEST_REPORT2),
            content_type = 'application/json'
            )
        retrieve1 = self.client.get('/report/inspection/1/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = self.client.put('/report/inspection/1/',
            json.dumps(self.TEST_REPORT3),
            content_type = 'application/json'
            )
        retrieve2 = self.client.get('/report/inspection/1/')
        self.assertNotEqual(retrieve1.content, retrieve2.content) # the content must not equal
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class MaintenanceReportTestCase(APITestCase):
    TEST_REPORT1 = {  
            "body_no": "18-1654",   
            "mileage": 20000,  
            "inspected_by": "sample",
            "job_order" : 1,
        } 
    
    TEST_REPORT2 = {  
            "body_no": "18-1654",  
            "mileage": 20000,  
            "inspected_by": "sample",
            "job_order" : 1
        } 
    TEST_REPORT3 = {  
            "body_no": "18-1654",  
            "mileage": 30000,  
            "inspected_by": "sample",
            "job_order" : 1
        } 
    INVALID_REPORT1 = {  
            "body_no": "invalid",  
            "inspected_by": "sample",
            "job_order" : 1
    }  
    INVALID_REPORT2 = {  
            "body_no": "18-1654",  
            "inspected_by": "invalid",
            "job_order" : 1
    }  
    INVALID_REPORT3 = {  
            "body_no": "18-1654",  
            "tread_depth" : 4,
            "exterior_body": 4,
            "inspected_by": "sample",
            "job_order" : 1
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
        self.job_order = JobOrder.objects.create()
        self.maintenance = Maintenance.objects.create(body_no = self.car, job_order=self.job_order, inspected_by=self.user) # create maintenance
        with reversion.create_revision(): # create reversion
            self.maintenance.save()
            
    def test_maintenance_report_list(self):
        response = self.client.get('/report/maintenance-list/') # list of maintenanc report
        self.assertEqual( response.status_code, status.HTTP_200_OK)


    def test_maintenance_report_retrieve(self):
        response = self.client.get('/report/maintenance/1/') # retrieve maintenance report
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_maintenance_report_create(self):
        response = self.client.post('/report/maintenance/', self.TEST_REPORT1, format='json') # create maintenance report
        self.assertEquals(response.status_code, status.HTTP_201_CREATED)


    def test_maintenance_report_create_invalid(self):
        # invalid body_no
        response1 = self.client.post('/report/maintenance/', self.INVALID_REPORT1, format='json')
        # invalid inspected_by
        response2 = self.client.post('/report/maintenance/', self.INVALID_REPORT2, format='json')
        # invalid choice field 
        response3 = self.client.post('/report/maintenance/', self.INVALID_REPORT3, format='json')
        self.assertEquals(response1.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEquals(response2.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEquals(response3.status_code, status.HTTP_400_BAD_REQUEST)


    def test_maintenance_report_create_multiple(self):
        # create maintenance report 
        response1 = self.client.post('/report/maintenance/', self.TEST_REPORT1, format='json')
        response2 = self.client.post('/report/maintenance/', self.TEST_REPORT2, format='json')
        response3 = self.client.post('/report/maintenance/', self.TEST_REPORT3, format='json')
        self.assertEquals(response1.status_code, status.HTTP_201_CREATED)
        self.assertEquals(response2.status_code, status.HTTP_201_CREATED)
        self.assertEquals(response3.status_code, status.HTTP_201_CREATED)
        # retrieve maintenance report
        retrieve1 = self.client.get('/report/maintenance/1/')
        retrieve2 = self.client.get('/report/maintenance/2/')
        retrieve3 = self.client.get('/report/maintenance/3/')
        retrieve4 = self.client.get('/report/maintenance/4/')
        # the first 3 report must not found
        self.assertEquals(retrieve1.status_code, status.HTTP_200_OK)
        self.assertEquals(retrieve2.status_code, status.HTTP_200_OK)
        self.assertEquals(retrieve3.status_code, status.HTTP_200_OK)
        self.assertEquals(retrieve4.status_code, status.HTTP_200_OK)    

    
    def test_maintenance_report_update(self):
        response = self.client.put('/report/maintenance/1/', # update maintenance report
            json.dumps(self.TEST_REPORT1),
            content_type = 'application/json'
            )
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_maintenance_report_update_invalid(self): # invalid update 
        response = self.client.put('/report/maintenance/1/',
            json.dumps(self.INVALID_REPORT1),
            content_type = 'application/json'
            )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


    def test_maintenance_report_update_multiple(self): # multiple update
        response = self.client.put('/report/maintenance/1/',
            json.dumps(self.TEST_REPORT2),
            content_type = 'application/json'
            )
        retrieve1 = self.client.get('/report/maintenance/1/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = self.client.put('/report/maintenance/1/',
            json.dumps(self.TEST_REPORT3),
            content_type = 'application/json'
            )
        retrieve2 = self.client.get('/report/maintenance/1/')
        self.assertNotEqual(retrieve1.content, retrieve2.content) # the content must not equal
        self.assertEqual(response.status_code, status.HTTP_200_OK)
