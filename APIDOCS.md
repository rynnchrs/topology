API LINKS  
  
api sample:  

Login
    -returns an access and refresh JSON web token

    POST request:
        http://127.0.0.1:8000/api/login/  

    paramaters:
        {"username": "admin", "password": "password"}  


Register
    - allow users to create an account
    POST request:
    http://127.0.0.1:8000/api/register/  

    parameters:
        {  
            "username": "",  
            "email": "",  
            "first_name": "",  
            "last_name": "",  
            "password": "",  
            "user_info": {  
                "company": "",  
                "position": "",  
                "gender": null,  
                "birthday": null,  
                "phone": "",  
                "address": ""  
            }  
        }  


Logout 
    - allow users to log off their account

    POST request:
        http://127.0.0.1:8000/api/logout/blacklist  


Car List with Filtering 
    GET request:
        http://127.0.0.1:8000/api/car-list/?<params>  
  

User List with Permission Filtering 
    GET request:
        http://127.0.0.1:8000/api/user-list/?<params>  
    

User List
    GET request:
        http://127.0.0.1:8000/api/users/  


User Create
    POST request:
        http://127.0.0.1:8000/api/users/
    parameter:
        {  
            "username": "",  
            "email": "",  
            "first_name": "",  
            "last_name": "",  
            "password": "",  
            "user_info": {  
                "company": "",  
                "position": "",  
                "gender": null,  
                "birthday": null,  
                "phone": "",  
                "address": ""  
            }  
        }   
 

User Retrieve
    GET request:
        http://127.0.0.1:8000/api/users/(?P<username>[a-z0-9]+)


User Update
    PUT request:
        http://127.0.0.1:8000/api/users/(?P<username>[a-z0-9]+)  


User Delete:
    DELETE requestL
        http://127.0.0.1:8000/api/users/(?P<username>[a-z0-9]+)  
  

Permission List:
    GET request:
        http://127.0.0.1:8000/api/permission/  


Permission Create
    POST request:
        http://127.0.0.1:8000/api/permission/  
    parameters:
        {  
            "user": "username" ,  
            "can_view_users": ,  
            "can_add_users": ,  
            "can_edit_users": ,  
            "can_delete_users": ,  
            "can_view_inventory": ,  
            "can_add_inventory": ,  
            "can_edit_inventory": ,  
            "can_delete_inventory": ,  
            "can_view_reports": ,  
            "can_add_reports": ,  
            "can_edit_reports": ,  
            "can_delete_reports": ,  
            "can_view_task": ,  
            "can_add_task": ,  
            "can_edit_task": ,  
            "can_delete_task":   
        }  


Permission Retrive 
    GET request:
        http://127.0.0.1:8000/api/permission/(?P<username>[a-z0-9]+)/  


Permission Delete 
    Delete request:
        http://127.0.0.1:8000/api/permission/(?P<username>[a-z0-9]+)/  


Permission User Update 
    PUT request:
        http://127.0.0.1:8000/api/permission/user/(?P<username>[a-z0-9]+)/
    parameters:
        {  
            "can_view_users": ,  
            "can_add_users": ,  
            "can_edit_users": ,  
            "can_delete_users":  
        }  

      
Permission Inventory Update 
    PUT request:
        http://127.0.0.1:8000/api/permission/inventory/(?P<username>[a-z0-9]+)/  
    parameters:
        {  
            "can_view_inventory": ,  
            "can_add_inventory": ,  
            "can_edit_inventory": ,  
            "can_delete_inventory":  
        }  


Permission Task Update 
    PUT request:
        http://127.0.0.1:8000/api/permission/report/(?P<username>[a-z0-9]+)/  
    parameters:
        {  
            "can_view_task": ,  
            "can_add_task": ,  
            "can_edit_task": ,  
            "can_delete_task":   
        }  


Permission Maintenance Reports Update 
    PUT request:
        http://127.0.0.1:8000/api/permission/maintenance-report/(?P<username>[a-z0-9]+)/  
    parameters:
        {  
            "can_view_maintenance_reports": ,  
            "can_add_maintenance_reports": ,  
            "can_edit_maintenance_reports": ,  
            "can_delete_maintenance_reports":  
        }  


    
Permission Inspection Reports Update 
    PUT request:
        http://127.0.0.1:8000/api/permission/inspection-report/(?P<username>[a-z0-9]+)/  
    parameters:
        {  
            "can_view_inspection_reports": ,  
            "can_add_inspection_reports": ,  
            "can_edit_inspection_reports": ,  
            "can_delete_inspection_reports":  
        }  


Permission Repair Reports Update 
    PUT request:
        http://127.0.0.1:8000/api/permission/repair-report/(?P<username>[a-z0-9]+)/  
    parameters:
        {  
            "can_view_repair_reports": ,  
            "can_add_repair_reports": ,  
            "can_edit_repair_reports": ,  
            "can_delete_repair_reports":  
        }  

Permission can Add Maintenance Reports List 
    GET request:
    http://127.0.0.1:8000/api/permission/add-list/maintenance/  


Permission can Add Inspection Reports List 
    GET request:
    http://127.0.0.1:8000/api/permission/add-list/inspection/  


Permission can Add Repair Reports List 
    GET request:
    http://127.0.0.1:8000/api/permission/add-list/repair/  


Inspection List with Filtering 
    GET request:
    http://127.0.0.1:8000/api/inspection-list/?<param>  


Inspection Create 
    POST request:
    http://127.0.0.1:8000/api/inspection/

    parameter:
    {  
        "vin_no": "vin_no",  
        "mileage": null,  
        "cleanliness_exterior": false,  
        "condition_rust": false,  
        "decals": false,  
        "windows": false,  
        "rear_door": false,  
        "mirror": false,  
        "roof_rack": false,  
        "rear_step": false,  
        "seats": false,  
        "seat_belts": false,  
        "general_condition": false,  
        "vehicle_documents": false,  
        "main_beam": false,  
        "dipped_beam": false,  
        "side_lights": false,  
        "tail_lights": false,  
        "indicators": false,  
        "break_lights": false,  
        "reverse_lights": false,  
        "hazard_light": false,  
        "rear_fog_lights": false,  
        "interior_lights": false,  
        "screen_washer": false,  
        "wiper_blades": false,  
        "horn": false,  
        "radio": false,  
        "front_fog_lights": false,  
        "air_conditioning": false,  
        "cleanliness_engine_bay": false,  
        "washer_fluid": false,  
        "coolant_level": false,  
        "brake_fluid_level": false,  
        "power_steering_fluid": false,  
        "gas_level": null,  
        "oil_level": null,  
        "tyres": false,  
        "front_visual": false,  
        "rear_visual": false,  
        "spare_visual": false,  
        "wheel_brace": false,  
        "jack": false,  
        "front_right_wheel": false,  
        "front_left_wheel": false,  
        "rear_right_wheel": false,  
        "rear_left_wheel": false,  
        "notes": ""  
    } 



Inspection Retrive 
    GET request:
        http://127.0.0.1:8000/api/inspection/(?P<inspection_id>[a-z0-9]+)/  


Inspection Update Status Set to False and True Only
    - if the status is false it will chage to true and vise versa
    PUT request:
        http://127.0.0.1:8000/api/report/(?P<inspection_id>[a-z0-9]+)/   


Total Table 
    - get all the totals of Recieve Item for Dashboard
    GET request:
        http://127.0.0.1:8000/api/total/  

Expiry Table 
    - get all the expiry table each year
    GET request:
        http://127.0.0.1:8000/api/expiry/ 
    parameter:
        {"year": 2019} 
  
Repair Order Form 
    http://127.0.0.1:8000/api/repair/  
 