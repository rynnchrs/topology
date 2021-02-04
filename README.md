# topology
Careta Fleet Management System

1. create a virtualenv using "pyvenv" or any environment you want.
2. install all libraries in the requirements.txt.
3. there are 2 servers running (one for the backend and one for the frontend).
4. to run for the backend, just run "python3 manage.py runserver" on the backend directory.
5. to run for the frontend, just run "npm start" on the frontend directory.


api sample:
login: api/token/
register = api/register/
update = api/users/(?P[^/.]+) logout = api/logout/blacklist/ permission = api/permision/(?P[^/.]+)
user permission = api/permision/user/(?P[^/.]+)
inventory permission = api/permision/(?P[^/.]+)
reports permission = api/permision/(?P[^/.]+)
task permission = api/permision/(?P[^/.]+)

super_user:
username = admin
password = password

sample_user:
username = pedro
password = userpassword