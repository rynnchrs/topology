import json
from datetime import date

import reversion
from car.models import Car
from careta.models import Permission, UserInfo
from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase
from task.models import IR, JobOrder, Task

from .models import CheckList, CheckListParts, Inspection, Repair

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

        self.id = str(self.inspection.pk)
            
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
        response = self.client.get('/report/inspection/'+self.id+'/')
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
        retrieve1 = self.client.get('/report/inspection/'+self.id+'/')
        retrieve2 = self.client.get('/report/inspection/'+str(response1.data['inspection_id'])+'/')
        retrieve3 = self.client.get('/report/inspection/'+str(response2.data['inspection_id'])+'/')
        retrieve4 = self.client.get('/report/inspection/'+str(response3.data['inspection_id'])+'/')
        # first 3 reports must deleted
        self.assertEquals(retrieve1.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEquals(retrieve2.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEquals(retrieve3.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEquals(retrieve4.status_code, status.HTTP_200_OK)

    
    def test_inspection_report_update(self): # update inspection report 
        response = self.client.put('/report/inspection/'+self.id+'/',
            json.dumps(self.TEST_REPORT1),
            content_type = 'application/json'
            )
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_inspection_report_update_invalid(self): #update invalid inspection report
        response = self.client.put('/report/inspection/'+self.id+'/',
            json.dumps(self.INVALID_REPORT1),
            content_type = 'application/json'
            )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


    def test_inspection_report_update_multiple(self): # multiple update
        response = self.client.put('/report/inspection/'+self.id+'/',
            json.dumps(self.TEST_REPORT2),
            content_type = 'application/json'
            )
        retrieve1 = self.client.get('/report/inspection/'+self.id+'/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = self.client.put('/report/inspection/'+self.id+'/',
            json.dumps(self.TEST_REPORT3),
            content_type = 'application/json'
            )
        retrieve2 = self.client.get('/report/inspection/'+self.id+'/')
        self.assertNotEqual(retrieve1.content, retrieve2.content) # the content must not equal
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class RepairReportTestCase(APITestCase):
    INVALID_REPORT1 = {  
            "parts": [
                {
                    "cost_type": "P",
                    "particulars": "parts1",
                    "cost": 100,
                    "quantity": 2,
                    "total_cost": 200
                }
            ],
            "labor": [
                {
                    "cost_type": "L",
                    "particulars": "labor",
                    "cost": 100,
                    "quantity": 1,
                    "total_cost": 100
                }
            ],
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
    TEST_TASK = {
            "job_order": {
                "type": True
            },
            "fieldman": [
                {"field_man": "sample"}
            ],
            "desc": "",
            "remarks": "",
            "start_date": str(date.today()),
            "end_date": str(date.today()),
            "manager": "sample",
            "body_no": "18-1654"
        } 
        
    def setUp(self):
        self.user = User.objects.create_user(**self.TEST_USER) #create user
        self.client.force_authenticate(self.user) # authenticate user
        self.permission = Permission.objects.create(user = self.user,**self.TEST_PERMISSION) # create permission
        self.car = Car.objects.create(**self.TEST_CAR) # create car instance
        # create 1st initial job order
        self.job_order = JobOrder.objects.create()
        # create 2st initial job order
        self.job = JobOrder.objects.create()
        # create job order for check list
        self.job_cl = JobOrder.objects.create()
        # create ir objects
        self.ir = IR.objects.create(ir_no="0001", body_no=self.car)
        # create initial task object
        self.task = Task.objects.create(body_no=self.car, job_order=self.job_order, manager=self.user) 
        # create task for ir
        self.task_ir = Task.objects.create(body_no=self.car, job_order=self.job_cl, manager=self.user, ir_no=self.ir) 
        # create initial checklist 
        self.check_list = CheckList.objects.create(task=self.task, check_list_no=0, body_no=self.car, job_order=self.job_order, email=self.user)
        # create  task for checklist
        self.task_cl = Task.objects.create(body_no=self.car, job_order=self.job, manager=self.user, check_list=self.check_list) 
        # create initial repair object
        self.repair = Repair.objects.create(
                job_order=self.job_order,
                diagnosed_by = self.user,   
                generated_by = self.user,
                repair_by = self.user,
                body_no = self.car
            ) # create repair
        with reversion.create_revision(): # create reversion for careta report
            self.repair.save()
        #id of repair
        self.id = str(self.repair.pk)
            
    def test_repair_report_list(self):  # list of all repair
        response = self.client.get('/report/repair/') 
        self.assertEqual( response.status_code, status.HTTP_200_OK)

    def test_repair_report_retrieve(self):  # retrieve initial repair object
        response = self.client.get('/report/repair/'+self.id+'/') # retrieve repair report
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_repair_report_create(self):  # create repair report
        self.TEST_REPORT = {
                "parts": [],
                "labor": [],
                "site_poc": "makati",
                "contact_no": "12345",
                "incident_details": "",
                "actual_findings": "",
                "actual_remarks": "",
                "action_taken": "",
                "status_repair": "Non-Operational",
                "remarks": "321",
                "job_order": str(self.job),
                "ir_no": "",
                "check_list": "",
                "body_no": "18-1654",
            }
        response = self.client.post('/report/repair/', self.TEST_REPORT, format='json') # create repair report
        self.assertEquals(response.status_code, status.HTTP_201_CREATED)

    def test_repair_report_IR_create(self):  # create repair report with ir instance
        self.TEST_REPORT_IR = {
                "parts": [],
                "labor": [],
                "site_poc": "makati",
                "contact_no": "12345",
                "incident_details": "",
                "actual_findings": "",
                "actual_remarks": "",
                "action_taken": "",
                "status_repair": "Non-Operational",
                "remarks": "321",
                "job_order": str(self.job),
                "ir_no": "0001",
                "check_list": "",
                "body_no": "18-1654",
            }
        response = self.client.post('/report/repair/', self.TEST_REPORT_IR, format='json') # create repair report
        self.assertEquals(response.status_code, status.HTTP_201_CREATED)

    def test_repair_report_CheckList_create(self): # create repair report with checklist instance
        self.TEST_REPORT_CL = {
                "parts": [],
                "labor": [],
                "site_poc": "makati",
                "contact_no": "12345",
                "incident_details": "",
                "actual_findings": "",
                "actual_remarks": "",
                "action_taken": "",
                "status_repair": "Non-Operational",
                "remarks": "321",
                "job_order": str(self.job_cl),
                "ir_no": "",
                "check_list": 0,
                "body_no": "18-1654",
            }
        response = self.client.post('/report/repair/', self.TEST_REPORT_CL, format='json') # create repair report
        self.assertEquals(response.status_code, status.HTTP_201_CREATED)

    def test_repair_report_create_invalid(self): # try creating invalid repair request
        # invalid job_order
        response1 = self.client.post('/report/repair/', self.INVALID_REPORT1, format='json')
        self.assertEquals(response1.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_repair_report_update(self):  # update initial repair report object
        self.TEST_UPDATE = {
                "parts": [
                    {
                        "cost_type": "P",
                        "particulars": "parts1",
                        "cost": 100,
                        "quantity": 2,
                        "total_cost": 200
                    }
                ],
                "labor": [
                    {
                        "cost_type": "L",
                        "particulars": "labor",
                        "cost": 100,
                        "quantity": 1,
                        "total_cost": 100
                    }
                ],
                "site_poc": "makati",
                "contact_no": "12345",
                "status_repair": "Non-Operational",
                "remarks": "321",
                "job_order": str(self.job_order),
                "ir_no": "",
                "check_list": "",
                "body_no": "18-1654"
            }
        response = self.client.put('/report/repair/'+self.id+'/', # update repair report
            json.dumps(self.TEST_UPDATE),
            content_type = 'application/json'
            )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_repair_report_update_invalid(self):  # invalid request update  
        response = self.client.put('/report/repair/'+self.id+'/',
            json.dumps(self.INVALID_REPORT1),
            content_type = 'application/json'
            )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class CheckListReportTestCase(APITestCase):
    CHECK_LIST_PARTS =[
            {"name": "parts 1"}
        ]
    INVALID_REPORT1 = {
            "contact_no": "09123456789",
            "status": "Operational",
            "parts_included": [
                0,
                1,
                2
            ],
            "parts":[
                {
                    "quantity": 1,
                    "check_list_parts": "invalid part 1"  #invalid parts
                }
            ],
            "body_no":"18-16541",  # invalid body_no
            "email":"invalid@email.com",  # invalid emamil
            "job_order": 3,  #invalid job_order
            "task": 3  #invalid task
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
    TEST_TASK = {
            "job_order": {
                "type": True
            },
            "fieldman": [
                {"field_man": "sample"}
            ],
            "desc": "",
            "remarks": "",
            "start_date": str(date.today()),
            "end_date": str(date.today()),
            "manager": "sample",
            "body_no": "18-1654"
        } 

    def setUp(self):
        self.user = User.objects.create_user(**self.TEST_USER) #create user
        self.client.force_authenticate(self.user) # authenticate user
        self.permission = Permission.objects.create(user = self.user,**self.TEST_PERMISSION) # create permission
        self.car = Car.objects.create(**self.TEST_CAR) # create car instance
        # create initial job order
        self.job_order = JobOrder.objects.create()
        # create joborder for checklist
        self.job_cl = JobOrder.objects.create()
        # create initial task
        self.task = Task.objects.create(body_no=self.car, job_order=self.job_order, manager=self.user) 
        # create task for checklist
        self.task_cl = Task.objects.create(body_no=self.car, job_order=self.job_cl, manager=self.user,) 
        # create initial checklist
        self.check_list = CheckList.objects.create(task=self.task, body_no=self.car, job_order=self.job_order, email=self.user)
        # creating check list parts
        self.parts = CheckListParts.objects.create(name="sample part 1")
        with reversion.create_revision(): # create reversion for careta report
            self.check_list.save()
        #id of initial checklist obejct 
        self.id = str(self.check_list.pk)
            
    def test_checklist_report_list(self):  # list of all checklist 
        response = self.client.get('/report/checklist/') # list of maintenanc report
        self.assertEqual( response.status_code, status.HTTP_200_OK)

    def test_check_list_parts_create(self):  # create checklist parts
        response = self.client.post('/report/checklist-parts/', self.CHECK_LIST_PARTS, format='json') # create repair report
        self.assertEquals(response.status_code, status.HTTP_201_CREATED)

    def test_check_list_report_retrieve(self):  # retrrieving initial checklist object
        response = self.client.get('/report/checklist/'+self.id+'/') # retrieve repair report
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_check_list_report_create(self):  # create check list
        self.TEST_REPORT = {
            "contact_no": "09123456789",
            "status": "Operational",
            "parts_included": [
                0,
                1,
                2
            ],
            "parts":[
                {
                    "quantity": 1,
                    "check_list_parts": "sample part 1"
                }
            ],
            "body_no":"18-1654",
            "email":"sample@email.com",
            "job_order": str(self.job_cl),
            "task": str(self.task_cl)
        }
        response = self.client.post('/report/checklist/', self.TEST_REPORT, format='json') # create repair report
        self.assertEquals(response.status_code, status.HTTP_201_CREATED)

    def test_check_list_report_create_invalid(self):  # try invalid checklist request
        # invalid job_order
        response1 = self.client.post('/report/checklist/', self.INVALID_REPORT1, format='json')
        self.assertEquals(response1.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_check_list_report_update(self):  # update initial checklist object
        self.TEST_REPORT = {
            "contact_no": "09123456789",
            "status": "Operational",
            "parts_included": [
                0,
                1,
                2
            ],
            "parts":[
                {
                    "quantity": 1,
                    "check_list_parts": "sample part 1"
                }
            ],
            "body_no":"18-1654",
            "email":"sample@email.com",
            "job_order": str(self.job_cl),
            "task": str(self.task_cl)
        }
        response = self.client.put('/report/checklist/'+self.id+'/', # update repair report
            json.dumps(self.TEST_REPORT),
            content_type = 'application/json'
            )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_repair_report_update_invalid(self):  # try invalid request update 
        response = self.client.put('/report/checklist/'+self.id+'/',
            json.dumps(self.INVALID_REPORT1),
            content_type = 'application/json'
            )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
