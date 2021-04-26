from datetime import datetime

from django.conf import settings
from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side


def export(inspection):
    datas = inspection
    workbook = Workbook()
    
    # Get active worksheet/tab
    worksheet = workbook.active
    worksheet.title = '{date}-Inspection-Report.xlsx'.format(
        date=datetime.now().strftime('%Y-%m-%d'))

    cell_1 = ["B1","I1","P1","T1","Z1","AO1","AQ1","BA1"]
    cell_2 = ["H1","O1","S1","Y1","AN1","AP1","AZ1","BE1"]
    header = ["VEHICLE INFOMATION","EXTERIOR","INTERIOR","ENGINE BAY","ELECTRICS",
            "WHEELS AND TIRES","GAS AND OIL","CHECKLIST REPORT"]
    color = ["00FFFF00","003366FF","00FFCC99","00C0C0C0","0000FF00","00FF0000","00800080","00FFFFFF"]

    for i in range(8):
        worksheet.merge_cells(cell_1[i] +":"+cell_2[i])

        cell = worksheet[cell_1[i]] 
        cell.value = header[i]
        
        cell.fill = PatternFill("solid", fgColor=color[i])
        cell.alignment = Alignment(horizontal='center')
        cell.font = Font(bold=True)
        thin = Side(border_style="thin", color="000000")
        cell.border = Border(top=thin, left=thin, right=thin, bottom=thin)

    # Define the titles for columns
    columns = [
        'ID',
        'Body No.',
        'Vin No.',
        'Plate No.',
        'Make',
        'Current Location',
        "Mileage",
        "GPS",

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
        
        "Engine Bay Cleanliness ",
        "Washer Fluids",
        "Coolant Level",
        "Brake Fluid Level",
        "Power Steering Fluid",
        "Liquid Leak Under Vehicle",

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
    row_num = 2

    # Assign the titles for each cell of the header
    for col_num, column_title in enumerate(columns, 1):
        cell = worksheet.cell(row=row_num, column=col_num)
        cell.value = column_title
        cell.fill = PatternFill("solid", fgColor=color[i])
        cell.alignment = Alignment(horizontal='center')
        cell.font = Font(bold=True)
        thin = Side(border_style="thin", color="000000")
        cell.border = Border(top=thin, left=thin, right=thin, bottom=thin)

        if col_num >= 2:
            cell.fill = PatternFill("solid", fgColor=color[0])
        if col_num >= 9:
            cell.fill = PatternFill("solid", fgColor=color[1])
        if col_num >= 16:
            cell.fill = PatternFill("solid", fgColor=color[2])
        if col_num >= 20:
            cell.fill = PatternFill("solid", fgColor=color[3])
        if col_num >= 26:
            cell.fill = PatternFill("solid", fgColor=color[4])
        if col_num >= 41:
            cell.fill = PatternFill("solid", fgColor=color[5])
        if col_num >= 43:
            cell.fill = PatternFill("solid", fgColor=color[6])
        if col_num >= 53:
            cell.fill = PatternFill("solid", fgColor=color[7])

    # Iterate through all movies
    for data in datas:
        row_num += 1
           
        choices = ["L30","SUV","G15","G12",True,False,None]
        real_value = ["L300 Exceed 2.5D MT","Super Carry UV","Gratour midi truck 1.5L",
            "Gratour midi truck 1.2L","Okay","Not Okay",None
            ]

        index = choices.index(data.body_no.make) 
        data.body_no.make = real_value[index]

        index = choices.index(data.cleanliness_exterior) 
        data.cleanliness_exterior = real_value[index]

        index = choices.index(data.condition_rust) 
        data.condition_rust = real_value[index]

        index = choices.index(data.decals) 
        data.decals = real_value[index]
            
        index = choices.index(data.windows) 
        data.windows = real_value[index]

        index = choices.index(data.rear_door) 
        data.rear_door = real_value[index]

        index = choices.index(data.mirror) 
        data.mirror = real_value[index]

        index = choices.index(data.roof_rack) 
        data.roof_rack = real_value[index]

        index = choices.index(data.rear_step) 
        data.rear_step = real_value[index]

        index = choices.index(data.seats) 
        data.seats = real_value[index]

        index = choices.index(data.seat_belts) 
        data.seat_belts = real_value[index]

        index = choices.index(data.general_condition) 
        data.general_condition = real_value[index]

        index = choices.index(data.vehicle_documents) 
        data.vehicle_documents = real_value[index]

        index = choices.index(data.main_beam) 
        data.main_beam = real_value[index]

        index = choices.index(data.dipped_beam) 
        data.dipped_beam = real_value[index]

        index = choices.index(data.side_lights) 
        data.side_lights = real_value[index]

        index = choices.index(data.tail_lights) 
        data.tail_lights = real_value[index]

        index = choices.index(data.indicators) 
        data.indicators = real_value[index]

        index = choices.index(data.break_lights) 
        data.break_lights = real_value[index]

        index = choices.index(data.reverse_lights) 
        data.reverse_lights = real_value[index]

        index = choices.index(data.hazard_light) 
        data.hazard_light = real_value[index]

        index = choices.index(data.rear_fog_lights) 
        data.rear_fog_lights = real_value[index]

        index = choices.index(data.interior_lights) 
        data.interior_lights = real_value[index]

        index = choices.index(data.screen_washer) 
        data.screen_washer = real_value[index]

        index = choices.index(data.wiper_blades) 
        data.wiper_blades = real_value[index]

        index = choices.index(data.horn) 
        data.horn = real_value[index]

        index = choices.index(data.radio) 
        data.radio = real_value[index]

        index = choices.index(data.front_fog_lights) 
        data.front_fog_lights = real_value[index]

        index = choices.index(data.liquid_leak) 
        data.liquid_leak = real_value[index]

        index = choices.index(data.cleanliness_engine_bay) 
        data.cleanliness_engine_bay = real_value[index]

        index = choices.index(data.washer_fluid) 
        data.washer_fluid = real_value[index]

        index = choices.index(data.coolant_level) 
        data.coolant_level = real_value[index]

        index = choices.index(data.brake_fluid_level) 
        data.brake_fluid_level = real_value[index]

        index = choices.index(data.power_steering_fluid) 
        data.power_steering_fluid = real_value[index]

        index = choices.index(data.tyres) 
        data.tyres = real_value[index]

        index = choices.index(data.front_visual) 
        data.front_visual = real_value[index]

        index = choices.index(data.rear_visual) 
        data.rear_visual = real_value[index]

        index = choices.index(data.spare_visual) 
        data.spare_visual = real_value[index]

        index = choices.index(data.wheel_brace) 
        data.wheel_brace = real_value[index]

        index = choices.index(data.jack) 
        data.jack = real_value[index]

        index = choices.index(data.front_right_wheel) 
        data.front_right_wheel = real_value[index]

        index = choices.index(data.front_left_wheel) 
        data.front_left_wheel = real_value[index]

        index = choices.index(data.rear_right_wheel) 
        data.rear_right_wheel = real_value[index]

        index = choices.index(data.rear_left_wheel) 
        data.rear_left_wheel = real_value[index]

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
            data.gps,

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
            
            data.cleanliness_engine_bay,
            data.washer_fluid,
            data.coolant_level,
            data.brake_fluid_level,
            data.power_steering_fluid,
            data.liquid_leak,

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
            cell.alignment = Alignment(horizontal='center')
            thin = Side(border_style="thin", color="000000")
            cell.border = Border(top=thin, left=thin, right=thin, bottom=thin)
    try:
        workbook.save('.'+settings.MEDIA_URL+worksheet.title)
        return True
    except:
        return False
