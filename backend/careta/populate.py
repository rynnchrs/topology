import csv
import datetime
from datetime import date, datetime

from django.contrib.auth.models import User  # add this

from .models import TPL, Car, Insurance, Permission, UserInfo  # add this


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
        
        if len(data[29]) == 10 or len(data[29]) == 11:
            cr_date = datetime.strptime(data[29], '%d-%b-%Y')
            cr_date = cr_date.strftime('%Y-%m-%d')
        else:
            cr_date = datetime.strptime(data[29], '%d-%b-%y')
            cr_date = cr_date.strftime('%Y-%m-%d')

        if len(data[31]) == 10 or len(data[31]) == 11:
            or_date = datetime.strptime(data[31], '%d-%b-%Y')
            or_date = or_date.strftime('%Y-%m-%d')
        else:
            or_date = datetime.strptime(data[31], '%d-%b-%y')
            or_date = or_date.strftime('%Y-%m-%d')

        if data[48] == "NO RECEIVING COPY":
            plate_date = "NRC"
        elif len(data[48]) == 10 or len(data[48]) == 11:
            plate_date = datetime.strptime(data[48], '%d-%b-%Y')
            plate_date = plate_date.strftime('%Y-%m-%d')
        else:
            plate_date = "NA"

        if data[49] == "no receiving copy found":
            decals_date = "NRC"
        elif len(data[49]) == 8 or len(data[49]) == 9:
            decals_date = datetime.strptime(data[49], '%d-%b-%y')
            decals_date = decals_date.strftime('%Y-%m-%d')
        else:
            decals_date = "NA"

        if data[52] == "NO RECEIVING COPY":
            tools_date = "NRC"
        elif len(data[52]) == 10 or len(data[52]) == 11:
            tools_date = datetime.strptime(data[52], '%d-%b-%Y')
            tools_date = tools_date.strftime('%Y-%m-%d')
        else:
            tools_date = "NA"

        if data[53] == "NO RECEIVING COPY":
            userManual_date = "NRC"
        elif len(data[53]) == 10 or len(data[53]) == 11:
            userManual_date = datetime.strptime(data[53], '%d-%b-%Y')
            userManual_date = userManual_date.strftime('%Y-%m-%d')
        else:
            userManual_date = "NA"
            
        if data[54] == "NO RECEIVING COPY":
            warrantyBook_date = "NRC"
        elif len(data[54]) == 10 or len(data[54]) == 11:
            warrantyBook_date = datetime.strptime(data[54], '%d-%b-%Y')
            warrantyBook_date = warrantyBook_date.strftime('%Y-%m-%d')
        else:
            warrantyBook_date = "NA"
            
        if data[55] == "NO RECEIVING COPY":
            unitKey_date = "NRC"
        elif len(data[55]) == 10 or len(data[55]) == 11:
            unitKey_date = datetime.strptime(data[55], '%d-%b-%Y')
            unitKey_date = unitKey_date.strftime('%Y-%m-%d')
        else:
            unitKey_date = "NA"
            
        if data[56] == "NO RECEIVING COPY":
            bodyKey_date = "NRC"
        elif len(data[56]) == 10 or len(data[56]) == 11:
            bodyKey_date = datetime.strptime(data[56], '%d-%b-%Y')
            bodyKey_date = bodyKey_date.strftime('%Y-%m-%d')
        else:
            bodyKey_date = "NA"
            
        if data[57] == "NO RECEIVING COPY":
            cigarettePlug_date = "NRC"
        elif len(data[57]) == 10 or len(data[57]) == 11:
            cigarettePlug_date = datetime.strptime(data[57], '%d-%b-%Y')
            cigarettePlug_date = cigarettePlug_date.strftime('%Y-%m-%d')
        else:
            cigarettePlug_date = "NA"
            
        if data[58] == "NO RECEIVING COPY":
            keychain_date = "NRC"
        elif len(data[58]) == 10 or len(data[58]) == 11:
            keychain_date = datetime.strptime(data[58], '%d-%b-%Y')
            keychain_date = keychain_date.strftime('%Y-%m-%d')
        else:
            keychain_date = "NA"
            
        if data[59] == "NO RECEIVING COPY":
            jack = "NRC"
        elif len(data[59]) == 10 or len(data[59]) == 11:
            jack = datetime.strptime(data[59], '%d-%b-%Y')
            jack = jack.strftime('%Y-%m-%d')
        else:
            jack = "NA"
            
        if data[60] == "NO RECEIVING COPY":
            wrench = "NRC"
        elif len(data[60]) == 10 or len(data[60]) == 11:
            wrench = datetime.strptime(data[60], '%d-%b-%Y')
            wrench = wrench.strftime('%Y-%m-%d')
        else:
            wrench = "NA"
            
        if data[61] == "NO RECEIVING COPY":
            fire_extinguisher = "NRC"
        elif len(data[61]) == 10 or len(data[61]) == 11:
            fire_extinguisher = datetime.strptime(data[61], '%d-%b-%Y')
            fire_extinguisher = fire_extinguisher.strftime('%Y-%m-%d')
        else:
            fire_extinguisher = "NA"
            
        if data[62] == "NO RECEIVING COPY":
            ewd_date = "NRC"
        elif len(data[62]) == 10 or len(data[62]) == 11:
            ewd_date = datetime.strptime(data[62], '%d-%b-%Y')
            ewd_date = ewd_date.strftime('%Y-%m-%d')
        else:
            ewd_date = "NA"
            
        if data[63] == "NO RECEIVING COPY":
            fan_date = "NRC"
        elif len(data[63]) == 10 or len(data[63]) == 11:
            fan_date = datetime.strptime(data[63], '%d-%b-%Y')
            fan_date = fan_date.strftime('%Y-%m-%d')
        else:
            fan_date = "NA"

        di1 = datetime.strptime(data[66], '%d-%b-%y')
        di1 = di1.strftime('%Y-%m-%d')

        sd1 = datetime.strptime(data[67], '%d-%b-%y')
        sd1 = sd1.strftime('%Y-%m-%d')

        ed1 = datetime.strptime(data[68], '%d-%b-%y')
        ed1 = ed1.strftime('%Y-%m-%d')

        di2 = datetime.strptime(data[71], '%d-%b-%y')
        di2 = di2.strftime('%Y-%m-%d')

        sd2 = datetime.strptime(data[72], '%d-%b-%y')
        sd2 = sd2.strftime('%Y-%m-%d')

        ed2 = datetime.strptime(data[73], '%d-%b-%y')
        ed2 = ed2.strftime('%Y-%m-%d')

        di3 = datetime.strptime(data[77], '%d-%b-%y')
        di3 = di3.strftime('%Y-%m-%d')

        sd3 = datetime.strptime(data[78], '%d-%b-%y')
        sd3 = sd3.strftime('%Y-%m-%d')

        ed3 = datetime.strptime(data[79], '%d-%b-%y')
        ed3 = ed3.strftime('%Y-%m-%d')
            # start_date = data[67],
            # end_date = data[68],
            # date_issued = data[71],
            # start_date = data[72],
            # end_date = data[73],
            # date_issued = data[77],
            # start_date = data[78],
            # end_date = data[79],


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
             cr_date = cr_date,
             or_no = data[30],
             or_date = or_date,
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

             plate_date = plate_date,
             decals_date = decals_date,
             modified = modified,
             tools_date = tools_date,
             userManual_date = userManual_date,
             warrantyBook_date = warrantyBook_date,
             unitKey_date = unitKey_date,
             bodyKey_date = bodyKey_date,
             cigarettePlug_date = cigarettePlug_date,
             keychain_date = keychain_date,
             jack = jack,
             wrench = wrench,
             fire_extinguisher = fire_extinguisher,
             ewd_date = ewd_date,
             fan_date = fan_date
        )
        car = Car.objects.get(body_no=data[0])
        TPL.objects.create(
            car = car,
            slug = car,
            insurance_name = data[64],
            po_no = data[65],
            date_issued = di1,
            start_date = sd1,
            end_date = ed1,
        )
        
        Insurance.objects.create(
            car = car,
            slug = car,
            company = data[69],
            po_no = data[70],
            date_issued = di2,
            start_date = sd2,
            end_date = ed2,
        )
        
        Insurance.objects.create(
            car = car,
            slug = car,
            company = data[74],
            po_no = data[75],
            insurance_no = data[76],
            date_issued = di3,
            start_date = sd3,
            end_date = ed3,
        )


