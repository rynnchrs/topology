import os
import subprocess

import django
from django.db.models.deletion import ProtectedError

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

import csv
import datetime
from datetime import datetime

from django.contrib.auth.models import User  # add this

from car.models import TPL, Car, Contract, Insurance
from careta.models import Permission, UserInfo


def datas():
    with open("./database.csv", encoding = "ISO-8859-1") as f:
        reader = csv.reader(f)
        data = [tuple(row) for row in reader]
        return (data)

def qrcode_update():
    for data in datas():
        car = Car.objects.get(body_no=data[0])
        if car.qr_code is None:
            car.save()
    return "Success"

print(qrcode_update())


