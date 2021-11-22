from datetime import datetime

import requests

from gps.models import GPS

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

for group in res["groups"]:
        if "devices" in group:
                for device in group["devices"]:
                        print(device["deviceid"])
                        pars = '{"devices":["'+device["deviceid"]+'"]}'
                                                
                        resp_odb = requests.post(url+"/webapi?action=queryobdinfo&token="+token, data=pars)
                        resp_mileage = requests.post(url+"/webapi?action=reportmileagedetail&token="+token, data=pars)
                        records_obd = resp_odb.json()
                        records_mileage = resp_mileage.json()
                        # print(f'odb: {records_obd["record"]}')
                        # print(" ")
                        # print(f'mileage: {records_mileage["records"]}')
                        recordobd = records_obd["record"]
                        recordmileage = records_obd["record"]
                        if recordobd:
                            GPS.objects.create(
                                obdrecordid = recordobd.obdrecordid,
                                deviceid = recordobd.deviceid,
                                updatetime = recordobd.updatetime,
                                mileage = recordobd.mileage,
                                gasolineconsumptionperhour = recordobd.gasolineconsumptionperhour,
                                gasolineconsumptionperhunkm = recordobd.gasolineconsumptionperhunkm,
                                overloaalculate = recordobd.overloaalculate,
                                coolanttemperature = recordobd.coolanttemperature,
                                oilpressure = recordobd.oilpressure,
                                inletbranchpressure = recordobd.inletbranchpressure,
                                inttemperature = recordobd.inttemperature,
                                airmassflow = recordobd.airmassflow,
                                throttleposition = recordobd.throttleposition,
                                oilvalue = recordobd.oilvalue,
                                faultcodeti = recordobd.faultcodeti,
                                faultcodes = recordobd.faultcodes,
                                totaldistance = recordobd.totaldistance,

                                # === MILEAGE === 

                                statisticsday = recordmileage.statisticsday,

                                beginoil = recordmileage.beginoil,
                                endoil = recordmileage.endoil,
                                addoil = recordmileage.addoil,
                                leakoil = recordmileage.leakoil,
                                idleoil = recordmileage.idleoil,

                                totaloil = recordmileage.totaloil,
                                totalnotrunningad = recordmileage.totalnotrunningad,
                                beginnotrunningad = recordmileage.beginnotrunningad,
                                endnotrunningad = recordmileage.endnotrunningad,
                                addnotrunningad = recordmileage.addnotrunningad,
                                leaknotrunningad = recordmileage.leaknotrunningad,
                                idlenotrunningad = recordmileage.idlenotrunningad,
                            )

