from datetime import datetime, timedelta

from django.http import HttpResponse
from openpyxl import Workbook

from .models import Car, Insurance, TPL


def export():
    datas = Car.objects.all()
    
    response = HttpResponse(
        content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    )
    response['Content-Disposition'] = 'attachment; filename={date}-Inspection-Report.xlsx'.format(
        date=datetime.now().strftime('%Y-%m-%d'),
    )
    workbook = Workbook()
    
    # Get active worksheet/tab
    worksheet = workbook.active
    worksheet.title = 'Inspection Report'

    # Define the titles for columns
    columns = [
        "ID",
        "Vin No.",
        "Body No.",
        "CS No.",
        "Plate No.",
        "Brand",
        "Year",
        "Make",
        "Series",
        "Body Type",
        "Color",
        "Dealer",
        "Dealer Phone",
        "Dealer Email",
        "PO #",
        "PO Date",
        "Body Builder",
        "Fabricator",
        "Sale Price",
        "Vat Price",
        "Engine #",
        "Battery #",
        "Fuel Type",
        "Transmission",
        "Denomination",
        "Piston",
        "Cylinder",
        "Pocuring Entity",
        "Capacity",
        "Gross Wt.",
        "Net Wt.",
        "Shippping Wt.",
        "Net Capacity",
        "LTO CR",
        "CR Date",
        "O.R. No.",
        "O.R. Date",
        "TopLoadReg",
        "Field Office",
        "ORCR Copy",
        "Permanent",
        "Current",
        "With VTF?",
        "Permanent?",
        "Delivery Location",
        "Delivery Date",
        "SI No.",
        "DR #",
        "DR Codes",
        "Plate No. Delivery",
        "Decals",
        "Modified",
        "EWD",
        "Tools",
        "User's Manual",
        "Warranty Book",
        "Unit Key",
        "Body Key",
        "Cigarette Plug",
        "Key Chain",
        "Fan",
        "Jack",
        "Tire Wrench",
        "Fire Extinguisher",
        "TPL Insurance Company",
        "TPL Policy No.",
        "TPL Date Issued",
        "TPL From",
        "TPL To",
        "2019 Insurance Company",
        "2019 Policy No.",
        "2019 Date Issued",
        "2019 From",
        "2019 To",
        "2020 Insurance Company",
        "2020 Policy No.",
        "2020 Reference No.",
        "2020 Date Issued",
        "2020 From",
        "2020 To",
        "Remarks",
        "Operational",
        "Status",
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
        tpl = TPL.objects.get(car=data.car_id)
        ins19 = Insurance.objects.get(car=data.car_id, date_issued__lte = datetime.strptime("2019-12-31", '%Y-%m-%d'))
        ins20 = Insurance.objects.get(car=data.car_id, date_issued__lte = datetime.strptime("2020-12-31", '%Y-%m-%d') , date_issued__gt = datetime.strptime("2019-12-31", '%Y-%m-%d'))
        # Define the data for each cell in the row 
        row = [
            data.car_id,
            data.vin_no,
            data.body_no,
            data.cs_no,
            data.plate_no,
            data.brand,
            data.release_year,
            data.make,
            data.series,
            data.body_type,
            data.color,
            data.dealer,
            data.dealer_phone,
            data.dealer_email,
            data.po_no,
            data.po_date,
            data.body_builder,
            data.fabricator,
            data.sale_price,
            data.vat_price,
            data.engine_no,
            data.battery_no,
            data.fuel_type,
            data.transmission,
            data.denomination,
            data.piston,
            data.cylinder,
            data.procuring_entity,
            data.capacity,
            data.gross_weight,
            data.net_weight,
            data.shipping_weight,
            data.net_capacity,
            data.lto_cr,
            data.cr_date,
            data.or_no,
            data.or_date,
            data.top_load,
            data.field_office,
            data.or_cr,
            data.permanent_loc,
            data.current_loc,
            data.vtf,
            data.permanent_status,
            data.delivery_location,
            data.deliver_date,
            data.si_no,
            data.dr_no,
            data.dr_codes,
            data.plate_date,
            data.decals_date,
            data.modified,
            data.ewd_date,
            data.tools_date,
            data.userManual_date,
            data.warrantyBook_date,
            data.unitKey_date,
            data.bodyKey_date,
            data.cigarettePlug_date,
            data.keychain_date,
            data.fan_date,
            data.jack,
            data.wrench,
            data.fire_extinguisher,

            tpl.insurance_name,
            tpl.po_no,
            tpl.date_issued,
            tpl.start_date,
            tpl.end_date,

            ins19.company,
            ins19.po_no,
            ins19.date_issued,
            ins19.start_date,
            ins19.end_date,
            
            ins20.company,
            ins20.po_no,
            ins20.date_issued,
            ins20.start_date,
            ins20.end_date,

            data.remarks,
            data.operational,
            data.status,
            data.date_updated,
            data.date_created,
        ]
        # Assign the data for each cell of the row 
        for col_num, cell_value in enumerate(row, 1):
            cell = worksheet.cell(row=row_num, column=col_num)
            cell.value = cell_value
    workbook.save(response)
    return response
