from datetime import datetime
import requests

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

pars = '{"deviceid":"19171897963"}'
resp_odb = requests.post(url+"/webapi?action=queryobdinfo&token="+token, data=pars)
resp_mileage = requests.post(url+"/webapi?action=reportmileagedetail&token="+token, data=pars)
records_obd = resp_odb.json()
records_mileage = resp_mileage.json()
print(f'odb: {records_obd["record"]}')
print(" ")
print(f'mileage: {records_mileage["records"]}')

# for group in res["groups"]:
#         if "devices" in group:
#                 for device in group["devices"]:
#                         print(device["deviceid"])
#                         pars = '{"devices":["'+device["deviceid"]+'"]}'
#                         #resp = requests.post("http://localhost:1234/webapi?action=reportalarm&token=">
#                         resp = requests.post(url+"/webapi?action=queryobdinfo&token="+token, data=pars)
#                         alarmrecords = resp.json()
#                         print(resp.content)

