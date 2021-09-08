import json
from datetime import date

import reversion
from car.models import Car
from careta.models import Permission, UserInfo
from django.contrib.auth.models import User
from django.test import TestCase
from report.models import CheckList
from rest_framework import status
from rest_framework.test import APITestCase

from .models import IR, Fieldman, JobOrder, Task

# Create your tests here.

class TaskTestCase(APITestCase):
    TEST_TASK_Location = {
            "job_order": {
                "type": False
            },
            "fieldman": [
                {"field_man": "sample"}
            ],
            "desc": "sample",
            "remarks": "sample",
            "start_date": str(date.today()),
            "end_date": str(date.today()),
            "body_no": "",
            "location": "Marikina",
            "ir_no": "",
            "check_list": ""
        } 
    
    
    TEST_TASK_IR = {
            "job_order": {
                "type": True
            },
            "fieldman": [
                {"field_man": "sample"}
            ],
            "desc": "sample",
            "remarks": "sample",
            "start_date": str(date.today()),
            "end_date": str(date.today()),
            "body_no": "18-1654",
            "ir_no": "0001",
            "check_list": ""
        } 

    
    TEST_TASK_CL = {
            "job_order": {
                "type": True
            },
            "fieldman": [
                {"field_man": "sample"}
            ],
            "desc": "sample",
            "remarks": "sample",
            "start_date": str(date.today()),
            "end_date": str(date.today()),
            "body_no": "18-1654",
            "ir_no": "",
            "check_list": 1
        } 
            
    INVALID_TASK1 = {
            "job_order": {
                "type": True
            },
            "fieldman": [
            ],
            "desc": "",
            "remarks": "",
            "start_date": str(date.today()),
            "end_date": str(date.today()),
            "manager": "sample",
            "body_no": "18-1655",  #invalid body_no
            "ir_no": "123123", #incalid IR
            "check_list": 5, #invalid checlist
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
                "can_view_task": True,
                "can_add_task": True,
                "can_edit_task": True,
                "can_delete_task": True,
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
        #pre created job order
        self.job = JobOrder.objects.create()
        #pre created task
        self.task = Task.objects.create(body_no=self.car, job_order=self.job, manager=self.user) 
        #IR instance
        self.ir = IR.objects.create(ir_no="0001", body_no=self.car)
        #Checklist Instance
        self.check_list = CheckList.objects.create(task=self.task, body_no=self.car, job_order=self.job, email=self.user)
        #fieldman
        self.fieldman = Fieldman.objects.create(task=self.task, field_man=self.user)

    def test_task_list(self):
        response = self.client.get('/task/task-list/') # list of task
        self.assertEqual( response.status_code , status.HTTP_200_OK)

    def test_task_retrieve(self): # retrieve task
        response = self.client.get('/task/task-scheduling/1/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_task_inspection_create(self): # create task inspection by location
        response = self.client.post('/task/task-inspection/', self.TEST_TASK_Location, format='json')
        self.assertEquals(response.status_code, status.HTTP_201_CREATED)

    def test_task_IR_create(self): # create task inspection by location
        response = self.client.post('/task/task-scheduling/', self.TEST_TASK_IR, format='json')
        self.assertEquals(response.status_code, status.HTTP_201_CREATED)
    
    
    def test_task_CL_create(self): # create task inspection by location
        response = self.client.post('/task/task-scheduling/', self.TEST_TASK_CL, format='json')
        self.assertEquals(response.status_code, status.HTTP_201_CREATED)


    def test_task_create_invalid(self): # try invalid task
        # invalid body_no
        response = self.client.post('/task/task-scheduling/', self.INVALID_TASK1, format='json')
        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)


    def test_inspection_report_update(self): # update inspection report 
        response = self.client.put('/task/task-scheduling/1/',
            json.dumps(self.TEST_TASK_IR),
            content_type = 'application/json'
            )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_inspection_report_update_invalid(self): # update inspection report 
        response = self.client.put('/task/task-scheduling/1/',
            json.dumps(self.INVALID_TASK1),
            content_type = 'application/json'
            )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
    def test_warning_list(self):
        response = self.client.get('/task/task-scheduling/warning_list/?start_date='+str(date.today())+
                                    '&end_date='+str(date.today())+'&fieldman='+self.user.username)
        self.assertEqual(response.status_code , status.HTTP_200_OK)

    def test_date_update(self): # update inspection report 
        self.TEST_DATE = {
            "start_date_actual": str(date.today()),
            "end_date_actual": str(date.today())
            }
        response = self.client.put('/task/task-scheduling/1/date_update/',
            json.dumps(self.TEST_DATE),
            content_type = 'application/json'
            )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_status_fm(self): # update inspection report 
        response = self.client.put('/task/task-scheduling/1/status_fm/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_status_mn(self): # update inspection report 
        response = self.client.put('/task/task-scheduling/1/status_mn/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_status_approval(self):
        response = self.client.get('/task/task-scheduling/status_approval/')
        self.assertEqual(response.status_code , status.HTTP_200_OK)

    def test_status_approved(self):
        response = self.client.get('/task/task-scheduling/status_approval/')
        self.assertEqual(response.status_code , status.HTTP_200_OK) 


class IRTestCase(APITestCase):
    TEST_IR1 = {
            "ir_no": "0002",
            "body_no": "18-1654",
            "project_name": "Careta Projects",
            "repair_type":["me","el","ba"],
        } 
            
    INVALID_IR = {
            "body_no": "18-1655"  #invalid body_no
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
        self.user = User.objects.create_user(**self.TEST_USER) # create user
        UserInfo.objects.create(user=self.user)
        self.client.force_authenticate(self.user) # authenticate user
        self.permission = Permission.objects.create(user = self.user,**self.TEST_PERMISSION) # create permission
        self.car = Car.objects.create(**self.TEST_CAR) # create car
        self.ir = IR.objects.create(ir_no="0001", body_no=self.car)

        with reversion.create_revision(): # create reversion for careta report
            self.ir.save()

    def test_ir_list(self):
        response = self.client.get('/task/ir-report/') # list of ir
        # print(response.content)
        self.assertEqual( response.status_code , status.HTTP_200_OK)

    def test_ir_retrieve(self): # retrieve ir
        response = self.client.get('/task/ir-report/1/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_ir_create(self): # create task
        response = self.client.post('/task/ir-report/', self.TEST_IR1, format='json')
        print(response.content)
        self.assertEquals(response.status_code, status.HTTP_201_CREATED)


    def test_ir_create_invalid(self): # try invalid task
        # invalid body_no
        response = self.client.post('/task/ir-report/', self.INVALID_IR, format='json')
        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)


    def test_ir_report_update(self): # update inspection report 
        response = self.client.put('/task/ir-report/1/',
            json.dumps(self.TEST_IR1),
            content_type = 'application/json'
            )
        print(response.content)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_ir_report_update_invalid(self): # update inspection report 
        response = self.client.put('/task/ir-report/1/',
            json.dumps(self.INVALID_IR),
            content_type = 'application/json'
            )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

