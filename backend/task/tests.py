import json

from car.models import Car
from careta.models import Permission, UserInfo
from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Task, JobOrder, Fieldman


# Create your tests here.

class TaskTestCase(APITestCase):
    TEST_TASK1 = {
            "job_order": {
                "type": True
            },
            "fieldman": [
                {"field_man": "sample"}
            ],
            "desc": "",
            "remarks": "",
            "start_date": "2021-05-10",
            "end_date": "2021-05-10",
            "start_date_actual": "2021-05-10",
            "end_date_actual": "2021-05-10",
            "actual_days": 1,
            "task_status_fm": False,
            "task_status_mn": False,
            "manager": "sample",
            "body_no": "18-1654"
        } 
            
    INVALID_TASK1 = {
            "job_order": {
                "type": True
            },
            "fieldman": [
            ],
            "desc": "",
            "remarks": "",
            "start_date": "2021-05-10",
            "end_date": "2021-05-10",
            "start_date_actual": "2021-05-10",
            "end_date_actual": "2021-05-10",
            "actual_days": 1,
            "task_status_fm": False,
            "task_status_mn": False,
            "manager": "sample",
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
        self.job = JobOrder.objects.create()
        self.task = Task.objects.create(body_no=self.car, job_order=self.job, manager=self.user) 
        self.fieldman = Fieldman.objects.create(task=self.task, field_man=self.user)

    def test_task_list(self):
        response = self.client.get('/task/task-scheduling/') # list of task
        self.assertEqual( response.status_code , status.HTTP_200_OK)

    def test_task_retrieve(self): # retrieve task
        response = self.client.get('/task/task-scheduling/1/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_task_create(self): # create task
        response = self.client.post('/task/task-scheduling/', self.TEST_TASK1, format='json')
        self.assertEquals(response.status_code, status.HTTP_201_CREATED)


    def test_task_create_invalid(self): # try invalid task
        # invalid body_no
        response = self.client.post('/task/task-scheduling/', self.INVALID_TASK1, format='json')
        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)


    def test_inspection_report_update(self): # update inspection report 
        response = self.client.put('/task/task-scheduling/1/',
            json.dumps(self.TEST_TASK1),
            content_type = 'application/json'
            )
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_inspection_report_update_invalid(self): # update inspection report 
        response = self.client.put('/task/task-scheduling/1/',
            json.dumps(self.INVALID_TASK1),
            content_type = 'application/json'
            )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)