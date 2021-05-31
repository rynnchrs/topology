import json

import reversion
from car.models import Car
from careta.models import Permission, UserInfo
from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase
from task.models import JobOrder

from .models import Inspection, Repair

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
                "can_show_all_inspection_reports": True,
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
        response1 = self.client.post('/report/inspection-list/', self.TEST_REPORT1, format='json')
        response = self.client.get('/report/inspection-list/can_view_list/') # list of inspection report
        self.assertEqual( response.status_code , status.HTTP_200_OK)
        response = self.client.get('/report/inspection-list/can_view_list/?search=18-1654') # filter with body no
        self.assertNotEquals( response.content , response1.content)
        response = self.client.get('/report/inspection-list/can_view_list/?search=NCT4511') # filter with plate no
        self.assertNotEquals( response.status_code , response1.content)
        response = self.client.get('/report/inspection-list/can_view_list/?search=Marikina') # lfilter with location
        self.assertNotEquals( response.status_code , response1.content)
        response = self.client.get('/report/inspection-list/can_view_list/?search=PAEL65NYHJB005043') # filter with vin no
        self.assertNotEquals( response.status_code , response1.content)
        response = self.client.get('/report/inspection-list/can_view_list/?search=L30') # filter with make
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

class RepairReportTestCase(APITestCase):
    TEST_REPORT1 = {  
            "cost": [
                {
                    "cost_type":"P",
                    "particulars":"sample",
                    "cost":100, 
                    "quantity":1
                }
            ],
            "job_order": "2",
        } 
    TEST_UPDATE = {
            "cost": [
                {
                    "cost_type":"P",
                    "particulars":"sample",
                    "cost":100, 
                    "quantity":1
                }
            ],
            "ir_no": "test0123",
            "site_poc": "makatis",
            "contact_no": "12345",
            "incident_details": "testing",
            "actual_findings": "testing",
            "actual_remarks": "testing",
            "action_taken": "testing",
            "status_repair": "operational",
            "remarks": "testing",
        }
    INVALID_REPORT1 = {  
            "job_order": 3,
            "diagnosed_by": 1,
            "generated_by":1,
            "repair_by":1,
            "noted_by": "",
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
                "can_view_repair_reports": True,
                "can_add_repair_reports": True,
                "can_edit_repair_reports": True,
                "can_delete_repair_reports": True,
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
        self.job = JobOrder.objects.create()
        self.repair = Repair.objects.create(
                job_order=self.job_order,
                diagnosed_by = self.user,
                generated_by = self.user,
                repair_by = self.user,
            ) # create repair
            
    def test_repair_report_list(self):
        response = self.client.get('/report/repair/') # list of maintenanc report
        self.assertEqual( response.status_code, status.HTTP_200_OK)

    def test_repair_report_retrieve(self):
        response = self.client.get('/report/repair/1/') # retrieve repair report
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_repair_report_create(self):
        response = self.client.post('/report/repair/', self.TEST_REPORT1, format='json') # create repair report
        self.assertEquals(response.status_code, status.HTTP_201_CREATED)

    def test_repair_report_create_invalid(self):
        # invalid job_order
        response1 = self.client.post('/report/repair/', self.INVALID_REPORT1, format='json')
        self.assertEquals(response1.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_repair_report_update(self):
        response = self.client.put('/report/repair/1/', # update repair report
            json.dumps(self.TEST_UPDATE),
            content_type = 'application/json'
            )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_repair_report_update_invalid(self): # invalid update 
        response = self.client.put('/report/repair/1/',
            json.dumps(self.INVALID_REPORT1),
            content_type = 'application/json'
            )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
