from datetime import datetime
from django.conf import settings

from openpyxl import Workbook

def export(inspection):
    datas = inspection
    workbook = Workbook()
    
    # Get active worksheet/tab
    worksheet = workbook.active
    worksheet.title = '{date}-Inspection-Report.xlsx'.format(
        date=datetime.now().strftime('%Y-%m-%d'))

    # Define the titles for columns
    columns = [
        'ID',
        'Body No.',
        'Vin No.',
        'Plate No.',
        'Make',
        'Current Location',
        "Mileage",
        "Cleanliness",
        "Condition Rust",
        "Decals/Livery Intact",
        "Windows/Windscreen",
        "Rear Door",
        "Mirrors",
        "Roof Rack",
        "Rear Step",
        "Seats",
        "Seat Belts",
        "General Condition",
        "Vehicle Documents",
        "Main Beam",
        "Dipped Beam",
        "Side Lights",
        "Tail Lights",
        "Indicators",
        "Break Lights",
        "Reverse Lights",
        "Hazard Lights",
        "Rear Fog Light",
        "Interior Lights",
        "Screen Washer",
        "Wiper Blades",
        "Horn",
        "Radio/CD",
        "Front Fog Lights",
        "Air Conditioning",
        "Engine Bay Cleanliness ",
        "Washer Fluids",
        "Coolant Level",
        "Brake Fluid Level",
        "Power Steering Fluid",
        "Gas Level",
        "Oil Level",
        "Tyres",
        "Front (Visual)",
        "Rear (Visual)",
        "Spare (Visual)",
        "Wheel Brace",
        "Jack",
        "Right Front",
        "Left Front",
        "Right Rear",
        "Left Rear",
        "Driver",
        "Edited By",
        "Notes",
        "Date Updated",
        "Date Created"
    ]
    row_num = 1

    # Assign the titles for each cell of the header
    for col_num, column_title in enumerate(columns, 1):
        cell = worksheet.cell(row=row_num, column=col_num)
        cell.value = column_title

    # Iterate through all movies
    for data in datas:
        row_num += 1
        if data.body_no.make == "L30":
            data.body_no.make = 'L300 Exceed 2.5D MT'
        elif data.body_no.make == "SUV":
            data.body_no.make = 'Super Carry UV'
        elif data.body_no.make == "G15":
            data.body_no.make = 'Gratour midi truck 1.5L'
        elif data.body_no.make == "G12":
            data.body_no.make = 'Gratour midi truck 1.2L'
            
        if data.cleanliness_exterior is True:
            data.cleanliness_exterior = "Okay"
        else:
            data.cleanliness_exterior = "Not Okay"
            
        if data.condition_rust is True:
            data.condition_rust = "Okay"
        else:
            data.condition_rust = "Not Okay"

        if data.decals is True:
            data.decals = "Okay"
        else:
            data.decals = "Not Okay"

        if data.windows is True:
            data.windows = "Okay"
        else:
            data.windows = "Not Okay"

        if data.rear_door is True:
            data.rear_door = "Okay"
        else:
            data.rear_door = "Not Okay"

        if data.mirror is True:
            data.mirror = "Okay"
        else:
            data.mirror = "Not Okay"

        if data.roof_rack is True:
            data.roof_rack = "Okay"
        else:
            data.roof_rack = "Not Okay"

        if data.rear_step is True:
            data.rear_step = "Okay"
        else:
            data.rear_step = "Not Okay"

        if data.seats is True:
            data.seats = "Okay"
        else:
            data.seats = "Not Okay"

        if data.seat_belts is True:
            data.seat_belts = "Okay"
        else:
            data.seat_belts = "Not Okay"

        if data.general_condition is True:
            data.general_condition = "Okay"
        else:
            data.general_condition = "Not Okay"

        if data.vehicle_documents is True:
            data.vehicle_documents = "Okay"
        else:
            data.vehicle_documents = "Not Okay"

        if data.main_beam is True:
            data.main_beam = "Okay"
        else:
            data.main_beam = "Not Okay"

        if data.dipped_beam is True:
            data.dipped_beam = "Okay"
        else:
            data.dipped_beam = "Not Okay"

        if data.side_lights is True:
            data.side_lights = "Okay"
        else:
            data.side_lights = "Not Okay"

        if data.tail_lights is True:
            data.tail_lights = "Okay"
        else:
            data.tail_lights = "Not Okay"

        if data.indicators is True:
            data.indicators = "Okay"
        else:
            data.indicators = "Not Okay"

        if data.break_lights is True:
            data.break_lights = "Okay"
        else:
            data.break_lights = "Not Okay"

        if data.reverse_lights is True:
            data.reverse_lights = "Okay"
        else:
            data.reverse_lights = "Not Okay"

        if data.hazard_light is True:
            data.hazard_light = "Okay"
        else:
            data.hazard_light = "Not Okay"

        if data.rear_fog_lights is True:
            data.rear_fog_lights = "Okay"
        else:
            data.rear_fog_lights = "Not Okay"

        if data.interior_lights is True:
            data.interior_lights = "Okay"
        else:
            data.interior_lights = "Not Okay"

        if data.screen_washer is True:
            data.screen_washer = "Okay"
        else:
            data.screen_washer = "Not Okay"

        if data.wiper_blades is True:
            data.wiper_blades = "Okay"
        else:
            data.wiper_blades = "Not Okay"

        if data.horn is True:
            data.horn = "Okay"
        else:
            data.horn = "Not Okay"

        if data.radio is True:
            data.radio = "Okay"
        else:
            data.radio = "Not Okay"

        if data.front_fog_lights is True:
            data.front_fog_lights = "Okay"
        else:
            data.front_fog_lights = "Not Okay"

        if data.air_conditioning is True:
            data.air_conditioning = "Okay"
        else:
            data.air_conditioning = "Not Okay"

        if data.cleanliness_engine_bay is True:
            data.cleanliness_engine_bay = "Okay"
        else:
            data.cleanliness_engine_bay = "Not Okay"

        if data.washer_fluid is True:
            data.washer_fluid = "Okay"
        else:
            data.washer_fluid = "Not Okay"

        if data.coolant_level is True:
            data.coolant_level = "Okay"
        else:
            data.coolant_level = "Not Okay"

        if data.brake_fluid_level is True:
            data.brake_fluid_level = "Okay"
        else:
            data.brake_fluid_level = "Not Okay"

        if data.power_steering_fluid is True:
            data.power_steering_fluid = "Okay"
        else:
            data.power_steering_fluid = "Not Okay"

        if data.tyres is True:
            data.tyres = "Okay"
        else:
            data.tyres = "Not Okay"

        if data.front_visual is True:
            data.front_visual = "Okay"
        else:
            data.front_visual = "Not Okay"

        if data.rear_visual is True:
            data.rear_visual = "Okay"
        else:
            data.rear_visual = "Not Okay"

        if data.spare_visual is True:
            data.spare_visual = "Okay"
        else:
            data.spare_visual = "Not Okay"

        if data.wheel_brace is True:
            data.wheel_brace = "Okay"
        else:
            data.wheel_brace = "Not Okay"

        if data.jack is True:
            data.jack = "Okay"
        else:
            data.jack = "Not Okay"

        if data.front_right_wheel is True:
            data.front_right_wheel = "Okay"
        else:
            data.front_right_wheel = "Not Okay"

        if data.front_left_wheel is True:
            data.front_left_wheel = "Okay"
        else:
            data.front_left_wheel = "Not Okay"

        if data.rear_right_wheel is True:
            data.rear_right_wheel = "Okay"
        else:
            data.rear_right_wheel = "Not Okay"

        if data.rear_left_wheel is True:
            data.rear_left_wheel = "Okay"
        else:
            data.rear_left_wheel = "Not Okay"

        if data.edited_by != None:
            edited_by = data.edited_by.user_info.full_name
        else:
            edited_by = ""
        # Define the data for each cell in the row 
        row = [
            data.inspection_id,
            data.body_no.body_no,
            data.body_no.vin_no,
            data.body_no.plate_no,
            data.body_no.make,
            data.body_no.current_loc,
            data.mileage,
            data.cleanliness_exterior,
            data.condition_rust,
            data.decals,
            data.windows,
            data.rear_door,
            data.mirror,
            data.roof_rack,
            data.rear_step,
            data.seats,
            data.seat_belts,
            data.general_condition,
            data.vehicle_documents,
            data.main_beam,
            data.dipped_beam,
            data.side_lights,
            data.tail_lights,
            data.indicators,
            data.break_lights,
            data.reverse_lights,
            data.hazard_light,
            data.rear_fog_lights,
            data.interior_lights,
            data.screen_washer,
            data.wiper_blades,
            data.horn,
            data.radio,
            data.front_fog_lights,
            data.air_conditioning,
            data.cleanliness_engine_bay,
            data.washer_fluid,
            data.coolant_level,
            data.brake_fluid_level,
            data.power_steering_fluid,
            data.gas_level,
            data.oil_level,
            data.tyres,
            data.front_visual,
            data.rear_visual,
            data.spare_visual,
            data.wheel_brace,
            data.jack,
            data.front_right_wheel,
            data.front_left_wheel,
            data.rear_right_wheel,
            data.rear_left_wheel,
            data.driver.user_info.full_name,
            edited_by,
            data.notes,
            data.date_updated,
            data.date_created
        ]
        # Assign the data for each cell of the row 
        for col_num, cell_value in enumerate(row, 1):
            cell = worksheet.cell(row=row_num, column=col_num)
            cell.value = cell_value
    try:
        workbook.save('.'+settings.MEDIA_URL+worksheet.title)
        return True
    except:
        return False
