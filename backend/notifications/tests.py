
import json
from datetime import datetime

import reversion
from careta.models import Car, JobOrder, Permission, UserInfo
from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase

from report.models import Inspection
from .models import *

class InspectionNotifyTestCase(APITestCase):
    TEST_REPORT1 = {  
            "body_no": "18-1655",  
            "mileage": 10000,  
            "driver": "sample",
            "edited_by": "",
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
    
    TEST_CAR1 = {
            "vin_no": "PAEL65NYHJB0050431",
            "body_no": "18-1655",
            "plate_no": "NCT45111",
            "make": "L30",
            "current_loc": "Marikina"
                }

    def setUp(self):
        self.user = User.objects.create_user(**self.TEST_USER) # create user
        UserInfo.objects.create(user=self.user)
        self.client.force_authenticate(self.user) # authenticate user
        self.permission = Permission.objects.create(user = self.user,**self.TEST_PERMISSION) # create permission
        self.car = Car.objects.create(**self.TEST_CAR) # create car
        self.car1 = Car.objects.create(**self.TEST_CAR1) # create car
        self.inspection = Inspection.objects.create(body_no = self.car, driver=self.user) # create initial inspection report
            
    def test_inspection_notification(self):
        date = datetime.now()
        start_date = date.strftime('%Y-%m-%d')
        end_date = date.strftime('%Y-%m-%d') 
        response1 = self.client.get('/notifications/inspection/?start_date='+start_date+'&end_date='+end_date)
        self.client.post('/report/inspection/', self.TEST_REPORT1, format='json')
        response2 = self.client.get('/notifications/inspection/?start_date='+start_date+'&end_date='+end_date)
        self.assertNotEqual(response1.content , response2.content)


