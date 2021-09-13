import json

from careta.models import UserInfo
from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase

from .models import TPL, Car, Contract, Insurance


class CarTestCase(APITestCase):
    TEST_USER = {
                "username": "sample",
                "email": "sample@email.com",
                "first_name": "sample",
                "last_name": "sample",
                "password": "sample!23",
            }
    TEST_PERMISSION = {
                "slug": "sample",
                "can_view_inventory": True,
                "can_add_inventory": True,
                "can_edit_inventory": True,
                "can_delete_inventory": True,
            }
    TEST_CAR = {
            "slug": "18-1654",
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
        self.car = Car.objects.create( 
            slug = "18-1655",
            vin_no = "PAEL65NYHJB0050431",
            body_no ="18-1655",
            plate_no = "NCT45111",
            make = "L30",
            current_loc = "Marikina"
            ) # create car

    def test_car_list(self):
        response = self.client.get('/car/careta/')
        self.assertEqual( response.status_code , status.HTTP_200_OK)

    def test_car_retrieve(self):
        response = self.client.get('/car/careta/18-1655/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_car_create(self):
        response = self.client.post('/car/careta/', self.TEST_CAR, format='json')
        self.assertEqual( response.status_code , status.HTTP_201_CREATED)

    def test_car_update(self):
        response = self.client.put('/car/careta/18-1655/', self.TEST_CAR, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class ContractTestCase(APITestCase):
    TEST_USER = {
                "username": "sample",
                "email": "sample@email.com",
                "first_name": "sample",
                "last_name": "sample",
                "password": "sample!23",
            }
    TEST_PERMISSION = {
                "slug": "sample",
                "can_view_inventory": True,
                "can_add_inventory": True,
                "can_edit_inventory": True,
                "can_delete_inventory": True,
            }
    
    TEST_CAR = {
            "slug": "18-1654",
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
        self.car1 = Car.objects.create( 
            slug = "18-1655",
            vin_no = "PAEL65NYHJB0050431",
            body_no ="18-1655",
            plate_no = "NCT45111",
            make = "L30",
            current_loc = "Marikina"
            ) # create car
        self.car2 = Car.objects.create(**self.TEST_CAR)
        self.contract = Contract.objects.create( 
            slug = self.car1.body_no,
            car = self.car1
            ) 

    def test_contract_list(self):
        response = self.client.get('/car/careta-contract/')
        self.assertEqual( response.status_code , status.HTTP_200_OK)

    def test_contract_retrieve(self):
        response = self.client.get('/car/careta-contract/18-1655/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_contract_create(self):          
        self.TEST_CONTRACT = {
                "slug": "18-1654",
                "car": str(self.car2.pk)
                    }    
        response = self.client.post('/car/careta-contract/', self.TEST_CONTRACT, format='json')
        self.assertEqual( response.status_code , status.HTTP_201_CREATED)

    def test_contract_update(self):   
        self.TEST_CONTRACT = {
                "slug": "18-1654",
                "car": str(self.car2.pk)
                    }    
        response = self.client.put('/car/careta-contract/18-1655/', self.TEST_CONTRACT, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TPLTestCase(APITestCase):
    TEST_USER = {
                "username": "sample",
                "email": "sample@email.com",
                "first_name": "sample",
                "last_name": "sample",
                "password": "sample!23",
            }
    # TEST_PERMISSION = {
    #             "slug": "sample",
    #             "can_view_inventory": True,
    #             "can_add_inventory": True,
    #             "can_edit_inventory": True,
    #             "can_delete_inventory": True,
    #         }
    
    TEST_CAR = {
            "slug": "18-1654",
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
        self.car1 = Car.objects.create( 
            slug = "18-1655",
            vin_no = "PAEL65NYHJB0050431",
            body_no ="18-1655",
            plate_no = "NCT45111",
            make = "L30",
            current_loc = "Marikina"
            ) # create car
        self.car2 = Car.objects.create(**self.TEST_CAR)
        self.contract = TPL.objects.create( 
            slug = self.car1.body_no,
            car = self.car1
            ) 

    def test_tpl_list(self):
        response = self.client.get('/car/careta-tpl/')
        self.assertEqual( response.status_code , status.HTTP_200_OK)

    def test_tpl_retrieve(self):
        response = self.client.get('/car/careta-tpl/18-1655/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_tpl_create(self):
        self.TEST_TPL = {
                "slug": "18-1654",
                "car": str(self.car2.pk)
                    } 
        response = self.client.post('/car/careta-tpl/', self.TEST_TPL, format='json')
        self.assertEqual( response.status_code , status.HTTP_201_CREATED)

    def test_tpl_update(self):
        self.TEST_TPL = {
                "slug": "18-1654",
                "car": str(self.car2.pk)
                    } 
        response = self.client.put('/car/careta-tpl/18-1655/', self.TEST_TPL, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class InsuranceTestCase(APITestCase):
    TEST_USER = {
                "username": "sample",
                "email": "sample@email.com",
                "first_name": "sample",
                "last_name": "sample",
                "password": "sample!23",
            }
    # TEST_PERMISSION = {
    #             "slug": "sample",
    #             "can_view_inventory": True,
    #             "can_add_inventory": True,
    #             "can_edit_inventory": True,
    #             "can_delete_inventory": True,
    #         }
    
    TEST_CAR = {
            "slug": "18-1654",
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
        self.car1 = Car.objects.create( 
            slug = "18-1655",
            vin_no = "PAEL65NYHJB0050431",
            body_no ="18-1655",
            plate_no = "NCT45111",
            make = "L30",
            current_loc = "Marikina"
            ) # create car
        self.car2 = Car.objects.create(**self.TEST_CAR)
        self.insurance = Insurance.objects.create( 
            slug = self.car1.body_no+"-1",
            car = self.car1,
            insurance_no = 1
            ) 

    def test_insurance_list(self):
        response = self.client.get('/car/careta-insurance/')
        self.assertEqual( response.status_code , status.HTTP_200_OK)

    def test_insurance_retrieve(self):
        response = self.client.get('/car/careta-insurance/18-1655-1/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_insurance_create(self):
        self.TEST_INSURANCE = {
                "slug": "18-1654-2",
                "car": str(self.car2.pk),
                "insurance_no": str(self.insurance.pk)
                    }  
        response = self.client.post('/car/careta-insurance/', self.TEST_INSURANCE, format='json')
        self.assertEqual( response.status_code , status.HTTP_201_CREATED)
        
    def test_insurance_update(self):
        self.TEST_INSURANCE = {
                "slug": "18-1654-2",
                "car": str(self.car2.pk),
                "insurance_no": str(self.insurance.pk)
                    }  
        response = self.client.put('/car/careta-insurance/18-1655-1/', self.TEST_INSURANCE, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
