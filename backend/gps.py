import os
from datetime import datetime

import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()
import requests

from gps.models import GPS, Record

url = "https://www.gps51.com:8443"
#url = "http://localhost:4444"
pars = '{"type":"USER","from":"web","username":"swseansw","password":"e10adc3949ba59abbe56e057f20f883e", "browser":"Firefox/87.0"}'
resp = requests.post(url+"/webapi?action=login", data=pars)

#print(resp)
#print(resp.content)
#print(resp.headers)

res = resp.json()
token = res['token']


pars = {"username":"swseansw"}
resp = requests.post(url+"/webapi?action=querymonitorlist&token="+token, data=pars)

res = resp.json()
# pars = '{"deviceid":"19171897963"}'
# resp_odb = requests.post(url+"/webapi?action=queryobdinfo&token="+token, data=pars)
# resp_mileage = requests.post(url+"/webapi?action=reportmileagedetail&token="+token, data=pars)
# records_obd = resp_odb.json()
# records_mileage = resp_mileage.json()
# print(f'odb: {records_obd["record"]}')
# print(" ")
# print(f'mileage: {records_mileage["records"]}')
devices = GPS.objects.all()

for device in devices:
    
    print(device.device_id)
    
    pars = '{"deviceid":"'+device.device_id+'"}'                        
    resp_odb = requests.post(url+"/webapi?action=queryobdinfo&token="+token, data=pars)
    resp_mileage = requests.post(url+"/webapi?action=reportmileagedetail&token="+token, data=pars)
    records_obd = resp_odb.json()
    records_mileage = resp_mileage.json()
    recordobd = records_obd['record']
    recordmileage = records_mileage['records'][0]
    print(recordobd)
    print("")
    print(recordmileage)
    if recordobd:
        record_data = {
            'obedrecord_id': recordobd['obdrecordid'],
            'device_id': device,
            # 'updatetime': recordobd['updatetime'],
            'mileage': recordobd['mileage'],
            'gasolineconsumptionperhour': recordobd['gasolineconsumptionperhour'],
            'gasolineconsumptionperhunkm': recordobd['gasolineconsumptionperhunkm'],
            'overloadcalculate': recordobd['overloadcalculate'],
            'coolanttemperature': recordobd['coolanttemperature'],
            'oilpressure': recordobd['oilpressure'],
            'inletbranchpressure': recordobd['inletbranchpressure'],
            'inlettemperature': recordobd['inlettemperature'],
            'airmassflow': recordobd['airmassflow'],
            'throttleposition': recordobd['throttleposition'],
            'oilvalue': recordobd['oilvalue'],
            # 'faultcodetime': recordobd['faultcodetime'],
            # 'faultcodes': recordobd['faultcodes'],
            'totaldistance': recordobd['totaldistance'],

            # === MILEAGE === 

            'statisticsday': recordmileage['statisticsday'],
            'beginoil': recordmileage['beginoil'],
            'endoil': recordmileage['endoil'],
            'addoil': recordmileage['addoil'],
            'leakoil': recordmileage['leakoil'],
            'idleoil': recordmileage['idleoil'],
            'totaloil': recordmileage['totaloil'],
            'totalnotrunningad': recordmileage['totalnotrunningad'],
            'beginnotrunningad': recordmileage['beginnotrunningad'],
            'endnotrunningad': recordmileage['endnotrunningad'],
            'addnotrunningad': recordmileage['addnotrunningad'],
            'leaknotrunningad': recordmileage['leaknotrunningad'],
            'idlenotrunningad': recordmileage['idlenotrunningad'],
        }
        try:
            Record.objects.create(**record_data) 
        except Exception as e:
            raise e
