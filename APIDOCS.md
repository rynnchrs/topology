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
        "user": ,
        "slug": "",
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
repair order form = api/report/

Structure:
{
    "car": null,
    "body_no": "",
    "make": "",
    "mileage": null,
    "location": "",
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
    "vin_no": null,
    "ro_no": "",
    "incident_details": "",
    "vms": "",
    "dealer": "",
    "schedule_date": null,
    "perform_by": null,
    "perform_date": null,
    "actual_findings": "",
    "actual_remarks": "",
    "repair_by": null,
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
