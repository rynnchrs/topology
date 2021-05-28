import datetime
import json
from datetime import date

from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Permission, UserInfo  # add this


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
        response = self.client.post(('/careta/register/'), data, format='json')
        self.assertEquals(response.status_code, status.HTTP_201_CREATED)
class LoginTestCase(APITestCase):
    TEST_USER = {
                "username": "testuser",
                "email": "testuser@basicbrix.com",
                "first_name": "basic",
                "last_name": "brix",
                "password": "p@ssword",
            }

    def setUp(self):
        self.user = User.objects.create_user(**self.TEST_USER)
        UserInfo.objects.create(user=self.user, phone="09123456789")

    def test_email_login(self):
        self.account = {'username': 'testuser@basicbrix.com', 'password': 'p@ssword'}
        response = self.client.post('/careta/login/', self.account, format='json')
        self.assertEqual(response.status_code, 200)

    def test_username_login(self):
        self.account = {'username': 'testuser', 'password': 'p@ssword'}
        response = self.client.post('/careta/login/', self.account, format='json')
        self.assertEqual(response.status_code, 200)

    def test_phone_login(self):
        self.account = {'username': '09123456789', 'password': 'p@ssword'}
        response = self.client.post('/careta/login/', self.account, format='json')
        self.assertEqual(response.status_code, 200)

class UserTestCase(APITestCase):
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
                "can_view_users": True,
                "can_add_users": True,
                "can_edit_users": True,
                "can_delete_users": True,
            }
        self.permission = Permission.objects.create(**self.TEST_PERMISSION)
        self.client.force_authenticate(self.user) # authenticate user

    def test_user_list(self):
        response = self.client.get('/careta/user-list/')
        self.assertEqual( response.status_code , status.HTTP_200_OK)

    def test_user_retrieve_detail(self):
        response = self.client.get('/careta/users/sample/') 
        self.assertEqual( response.status_code , status.HTTP_200_OK)

    def test_permission_list(self):
        response = self.client.get('/careta/permission/')
        self.assertEqual( response.status_code , status.HTTP_200_OK)

    def test_permission_retrieve_detail(self):
        response = self.client.get('/careta/permission/sample/')
        self.assertEqual( response.status_code , status.HTTP_200_OK)

    def test_permission_inspection_list(self):
        response = self.client.get('/careta/permission/add_inspection_list/')
        self.assertEqual( response.status_code , status.HTTP_200_OK)

    def test_permission_repair_list(self):
        response = self.client.get('/careta/permission/add_repair_list/')
        self.assertEqual( response.status_code , status.HTTP_200_OK)


