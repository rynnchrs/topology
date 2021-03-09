API LINKS  
  
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
  
API STRUCTURES
  
Register :  
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
  
Login  :  	
{  
   "username": "",  
    "password": ""  
}  
User create:  
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
  
User Update:  
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
  
Permission Create:  
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
  
Permission User Update:  
{  
        "can_view_users": ,  
        "can_add_users": ,  
        "can_edit_users": ,  
        "can_delete_users":  
}  
  
Permission Inventory Update  
{  
        "can_view_inventory": ,  
        "can_add_inventory": ,  
        "can_edit_inventory": ,  
        "can_delete_inventory":  
}  
  
Permission Report Update:  
{  
        "can_view_reports": ,  
        "can_add_reports": ,  
        "can_edit_reports": ,  
        "can_delete_reports":  
}  
  
Permission Task Update:  
{  
        "can_view_task": ,  
        "can_add_task": ,  
        "can_edit_task": ,  
        "can_delete_task":   
}  
    
  



Report Form  
API:  
inspection report order form = api/inspection/  
  
Structure:  
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
  


Repair Form  
API:  
repair order form = api/repair/  
  
Structure:  
{  
    "vin_no": "vin_no",  
    "ro_no": "",  
    "current_status":"1",  
    "incident_details": "",  
    "vms": "username",  
    "dealer": "",  
    "schedule_date": null,  
    "perform_by": "username",  
    "perform_date": null,  
    "actual_findings": "",  
    "actual_remarks": "",  
    "repair_by": "username",  
    "repair_date": null,  
    "action_taken": "",  
    "date_done": null,  
    "status_repair": "",  
    "remarks": "",  
    "cost": [{  
            "cost_type": null,  
            "particulars":"",  
            "cost": null,  
            "quantity": null  
        }]  
}  
