

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

car list with filtering = api/car-list/?<params>  
  
user list = api/users/  
user list with filter = api/user-list/?<params>  
user create = api/users/  
user retrive = api/users/(?P<username>[a-z0-9]+)  
user update = api/users/(?P<username>[a-z0-9]+)  
user delete = api/users/(?P<username>[a-z0-9]+)  
  
permission list = api/permission/  
permission create = api/permission/  
permission retrive = api/permission/(?P<slug>[a-z0-9]+)/  
permission delete = api/permission/(?P<slug>[a-z0-9]+)/  

permission user update = api/permission/user/(?P<slug>[a-z0-9]+)/  
permission inventory update = api/permission/inventory/(?P<slug>[a-z0-9]+)/  
permission task update = api/permission/report/(?P<slug>[a-z0-9]+)/  
permission maintenance reports update = api/permission/maintenance-report/(?P<slug>[a-z0-9]+)/  
permission inspection reports update = api/permission/inspection-report/(?P<slug>[a-z0-9]+)/  
permission repair reports update = api/permission/repair-report/(?P<slug>[a-z0-9]+)/  
  
permission can add maintenance reports list = api/permission/add-list/maintenance/  
permission can add inspection reports list = api/permission/add-list/inspection/  
permission can add repair reports list = api/permission/add-list/repair/  

inspection list with filtering = api/inspection-list/?<param>  
inspection create = api/inspection/    
inspection retrive = api/inspection/(?P<inspection_id>[a-z0-9]+)/  
inspection update status set false only  = api/report/(?P<inspection_id>[a-z0-9]+)/   

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


