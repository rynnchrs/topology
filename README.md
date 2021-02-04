# topology
Careta Fleet Management System

1. create a virtualenv using "pyvenv" or any environment you want.
2. install all libraries in the requirements.txt.
3. there are 2 servers running (one for the backend and one for the frontend).
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
permission retrive = api/permission/(?P<format>[a-z0-9]+)  

permission user delete = api/permission/user/(?P<format>[a-z0-9]+)  
permission user update = api/permission/user/(?P<format>[a-z0-9]+)  
  
permission inventory delete = api/permission/inventory/(?P<format>[a-z0-9]+)  
permission inventory update = api/permission/inventory/(?P<format>[a-z0-9]+)  
 
permission reports delete = api/permission/report/(?P<format>[a-z0-9]+)  
permission reports update = api/permission/report/(?P<format>[a-z0-9]+)  
  
permission task delete = api/permission/report/(?P<format>[a-z0-9]+)  
permission task update = api/permission/report/(?P<format>[a-z0-9]+)  
  
super_user:  
username = admin  
password = password  
  
sample_user:  
username = pedro  
password = userpassword  

