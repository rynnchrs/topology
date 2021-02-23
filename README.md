# topology
Careta Fleet Management System

1. create a virtualenv using "pyvenv" or any environment you want.
2. install all libraries in the requirements.txt.
3.there are 2 servers running (one for the backend and one for the frontend).
4. to run for the backend, just run "python3 manage.py runserver" on the backend directory.
5. to run for the frontend, just run "npm start" on the frontend directory.



api sample:  
login = api/login/    
register = api/register/  
logout = api/logout/blacklist  

user list = api/users/  
user create = api/users/  
user retrive = api/users/(?P<format>[a-z0-9]+)  
user update = api/users/(?P<format>[a-z0-9]+)  
user delete = api/users/(?P<format>[a-z0-9]+)  
  
permission list = api/permission/  
permission create = api/permission/  
permission retrive = api/permission/(?P<format>[a-z0-9]+)/  
permission delete = api/permission/(?P<format>[a-z0-9]+)/  

permission user update = api/permission/user/(?P<format>[a-z0-9]+)/  
permission inventory update = api/permission/inventory/(?P<format>[a-z0-9]+)/  
permission task update = api/permission/report/(?P<format>[a-z0-9]+)/  
permission maintenance reports update = api/permission/maintenance-report/(?P<format>[a-z0-9]+)/  
permission inspection reports update = api/permission/inspection-report/(?P<format>[a-z0-9]+)/  
permission repair reports update = api/permission/repair-report/(?P<format>[a-z0-9]+)/  
  
permission can add maintenance reports list = api/permission/add-list/maintenance/  
permission can add inspection reports list = api/permission/add-list/inspection/  
permission can add repair reports list = api/permission/add-list/repair/  

report list = api/report/  
report create = api/report/  
report retrive = api/report/(?P<format>[a-z0-9]+)/  
report update = api/report/(?P<format>[a-z0-9]+)/  
report delete = api/report/(?P<format>[a-z0-9]+)/    
report search = api/report/?search=  
report ordering car = api/report/?ordering=car  
report ordering date = api/report/?ordering=date_created  
  
total table = api/total/  
expiry table = api/expiry/  
  
repair order form = api/repair/  
  
super_user:  
username = admin  
password = password  
  
sample_user:  
username = pedro  
password = userpassword  
  
installed package:  
simplejwt  
pillow  
