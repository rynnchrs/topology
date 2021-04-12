import datetime
import json
from datetime import date

import reversion
from django.contrib.auth.models import User
from django.urls import reverse
from report.models import Inspection, Maintenance
from rest_framework import serializers, status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Car, Permission, UserInfo  # add this


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
        response = self.client.get('/api/permission/add_maintenance_list/')
        self.assertEqual( response.status_code , status.HTTP_200_OK)

    def test_permission_inspection_list(self):
        response = self.client.get('/api/permission/add_inspection_list/')
        self.assertEqual( response.status_code , status.HTTP_200_OK)

    def test_permission_repair_list(self):
        response = self.client.get('/api/permission/add_repair_list/')
        self.assertEqual( response.status_code , status.HTTP_200_OK)


