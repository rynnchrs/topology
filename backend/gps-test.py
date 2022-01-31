import os
import sys
from datetime import datetime
import django

sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

import requests
from celery import shared_task
from celery.utils.log import get_task_logger

from gps.models import GPS, Record

logger = get_task_logger(__name__)


url = "https://www.gps51.com:8443"
pars = '{"type":"USER","from":"web","username":"careta","password":"25d55ad283aa400af464c76d713c07ad", "browser":"Firefox/87.0"}'
resp = requests.post(url+"/webapi?action=login", data=pars)

res = resp.json()
token = res['token']

pars = {"username":"careta"}

resp = requests.post(url+"/webapi?action=querymonitorlist&token="+token, data=pars)

res = resp.json()
devices = GPS.objects.all()
date = datetime.today().strftime('%Y-%m-%d')

for device in devices:
    logger.info(device.device_id)
    pars = '{"startday":"'+ date +'","endday":"'+date +'","offset":8,"deviceid":"'+device.device_id+'"}'    
    resp_odb = requests.post(url+"/webapi?action=queryobdinfo&token="+token, data=pars)
    resp_mileage = requests.post(url+"/webapi?action=reportmileagedetail&token="+token, data=pars)
    records_obd = resp_odb.json()
    # print(records_obd)
    records_mileage = resp_mileage.json()
    print(records_mileage)
    recordobd = records_obd['record']
    recordmileage = records_mileage['records'][0]
    # for key, value in records_mileage.items():
    #     print(f'"{key}": "{value}"')
        #   if recordobd:
        #        record_data = {
        #             'obedrecord_id': recordobd['obdrecordid'],
        #             'device_id': device,
        #             'updatetime': recordobd['updatetime'],
        #             'mileage': recordobd['mileage'],
        #             'gasolineconsumptionperhour': recordobd['gasolineconsumptionperhour'],
        #             'gasolineconsumptionperhunkm': recordobd['gasolineconsumptionperhunkm'],
        #             'overloadcalculate': recordobd['overloadcalculate'],
        #             'coolanttemperature': recordobd['coolanttemperature'],
        #             'oilpressure': recordobd['oilpressure'],
        #             'inletbranchpressure': recordobd['inletbranchpressure'],
        #             'inlettemperature': recordobd['inlettemperature'],
        #             'airmassflow': recordobd['airmassflow'],
        #             'throttleposition': recordobd['throttleposition'],
        #             'oilvalue': recordobd['oilvalue'],
        #             'faultcodetime': recordobd['faultcodetime'],
        #             'faultcodes': recordobd['faultcodes'],
        #             'totaldistance': recordobd['totaldistance'],
        #             'speed': recordobd['speed'],
        #             'controlvoltage': recordobd['controlvoltage'],

        #             # === MILEAGE === 

        #             'statisticsday': recordmileage['statisticsday'],
        #             'beginoil': recordmileage['beginoil'],
        #             'endoil': recordmileage['endoil'],
        #             'addoil': recordmileage['addoil'],
        #             'leakoil': recordmileage['leakoil'],
        #             'idleoil': recordmileage['idleoil'],
        #             'totaloil': recordmileage['totaloil'],
        #             'totalnotrunningad': recordmileage['totalnotrunningad'],
        #             'beginnotrunningad': recordmileage['beginnotrunningad'],
        #             'endnotrunningad': recordmileage['endnotrunningad'],
        #             'addnotrunningad': recordmileage['addnotrunningad'],
        #             'leaknotrunningad': recordmileage['leaknotrunningad'],
        #             'idlenotrunningad': recordmileage['idlenotrunningad'],
        #             'totaldistancetoday': str(recordmileage['totaldistance']),
        #             'endtime': str(recordmileage['endtime']),
        #             'starttime': str(recordmileage['starttime']),
        #        }
        #        # try:
        #        #      Record.objects.create(**record_data) 
        #        # except Exception as e:
        #        #      raise e       
        #   logger.info("successfully created")
