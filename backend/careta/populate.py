import csv

from django.contrib.auth.models import User  # add this

from .models import (TPL, Car, Contract, Inspection, Insurance,  # add this
                     Permission, Repair, UserInfo)


def datas():
    with open("./database.csv", encoding = "ISO-8859-1") as f:
        reader = csv.reader(f)
        data = [tuple(row) for row in reader]
        return (data)

def user_data():
    try:
        superuser = User.objects.create_superuser( #creating super user "admin"
                username = 'admin',
                password = 'password'
            )
        Permission.objects.create(user=superuser,  #create permission for admin only
        can_view_users = True,
        can_add_users = True,
        can_edit_users = True,
        can_delete_users = True,
        can_view_inventory = True,
        can_add_inventory = True,
        can_edit_inventory = True,
        can_delete_inventory = True,
        can_view_inspection_reports = True,
        can_add_inspection_reports = True,
        can_edit_inspection_reports = True,
        can_delete_inspection_reports = True,
        can_view_maintenance_reports = True,
        can_add_maintenance_reports = True,
        can_edit_maintenance_reports = True,
        can_delete_maintenance_reports = True,
        can_view_repair_reports = True,
        can_add_repair_reports = True,
        can_edit_repair_reports = True,
        can_delete_repair_reports = True,
        can_view_task = True,
        can_add_task = True,
        can_edit_task = True,
        can_delete_task = True,)
    except:
        pass
    for data in datas():
        password = 'fiberhome' # default password for inital acounts
        user = User.objects.create(     # initializing users account
                username = data[0],
                first_name = "careta",
                last_name = data[0],
                password = password,
            )
        UserInfo.objects.create(user=user)
        Permission.objects.create(user=user, can_add_inspection_reports=True) # set can add inspection report to true
        user.set_password(password)
        user.save()

        if data[2] == "Not yet release":
            plate = None
        else:
            plate = data[2]
            
        if data[3] == "Mitsubishi":
            brand = "M"
        elif data[3] == "Suzuki":
            brand = "S"
        elif data[3] == "Foton":
            brand = "F"

        if data[5] == "L300 Exceed 2.5D MT":
            make = "L30"
        elif data[5] == "Super Carry UV":
            make = "SUV"
        elif data[5] == "Gratour midi truck 1.5L":
            make = "G15"
        elif data[5] == "Gratour midi truck 1.2L":
            make = "G12"

        if data[6] == "L300 Exceed C/C":
            series = "L3"
        elif data[6] == "Suzuki CAB CHAS":
            series = "SC"
        elif data[6] == "Gratour midi":
            series = "GR"

        if data[9] == "Diamond Motor Corporation":
            dealer = "DMC"
        elif data[9] == "Grand Canyon Multi Holdings, INC.":
            dealer = "GCM"
        elif data[9] == "Cebu Autocentrale Corporation":
            dealer = "CAC"
        elif data[9] == "Cherub Autodealer Inc.":
            dealer = "CAI"

        if  data[17] == "Diesel":
            fuel = "D"
        elif data[17] == "Gasoline":
            fuel = "G"

        if  data[18] == "Manual":
            transmission = "M"
        elif data[18] == "Automatic":
            fuel = "A"
        
        if data[32] == "Yes":
            top_load = True
        else:
            top_load = False
        
        if data[37] == "Yes":
            vtf = True
        else:
            vtf = False

        if data[38] == "Yes":
            permanent_status = True
        else:
            permanent_status = False

        if data[50] == "Yes":
            modified = True
        else:
            modified = False
        
        

        Car.objects.create( # initializing car data
             slug = data[14],
             body_no = data[0],
             cs_no = data[1],
             plate_no = plate,
             brand = brand,
             release_year = data[4],
             make = make,
             series = series,
             body_type = data[7],
             color = data[8],
             dealer = dealer,
             po_no = data[10],
             po_date = data[11],
             body_builder = data[12],
             fabricator = data[13],
             vin_no = data[14],
             engine_no = data[15],
             battery_no = data[16],
             fuel_type = fuel,
             transmission = transmission,
             denomination = data[19],
             piston = data[20],
             cylinder = data[21],
             procuring_entity = data[22],
             capacity = data[23].split()[0],
             gross_weight = data[24],
             net_weight = data[25],
             shipping_weight = data[26],
             net_capacity = data[27],
             lto_cr = data[28],
             cr_date = data[29],
             or_no = data[30],
             or_date = data[31],
             top_load = top_load,
             field_office = data[33],
             or_cr = data[34],
             permanent_loc = data[35],
             current_loc = data[36],
             vtf = vtf,
             permanent_status = permanent_status,
             delivery_location = data[39],
             deliver_date = data[40],
             si_no = data[41],
             dr_no = data[42],
             dr_codes = data[43],
             plate_date = data[48],
             decals_date = data[49],
             modified = modified,
             tools_date = data[52],
             userManual_date = data[53],
             warrantyBook_date = data[54],
             unitKey_date = data[55],
             bodyKey_date = data[56],
             cigarettePlug_date = data[57],
             keychain_date = data[58],
             jack = data[59],
             wrench = data[60],
             fire_extinguisher = data[61],
             ewd_date = data[62],
             fan_date = data[63]
        )


