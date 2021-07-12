import datetime
import json
from datetime import datetime, timedelta

from report.models import Inspection

from car.models import TPL, Car, Insurance


def check_or_date(year,data):
    jan = data.filter(or_date__month='1',or_date__year=year).count()
    feb = data.filter(or_date__month='2',or_date__year=year).count()
    mar = data.filter(or_date__month='3',or_date__year=year).count()
    apr = data.filter(or_date__month='4',or_date__year=year).count()
    may = data.filter(or_date__month='5',or_date__year=year).count()
    jun = data.filter(or_date__month='6',or_date__year=year).count()
    jul = data.filter(or_date__month='7',or_date__year=year).count()
    aug = data.filter(or_date__month='8',or_date__year=year).count()
    sep = data.filter(or_date__month='9',or_date__year=year).count()
    octo = data.filter(or_date__month='10',or_date__year=year).count()
    nov = data.filter(or_date__month='11',or_date__year=year).count()
    dec = data.filter(or_date__month='12',or_date__year=year).count()
    total = data.filter(or_date__year=year).count()
    or_date = {
        'January': jan,'February': feb,'March': mar,'April': apr,'May': may,'June': jun,
       'July': jul,'August': aug,'September': sep,'October': octo,'November': nov,'December': dec,
       'Total': total
        }
    return (or_date)

def check_cr_date(year,data):
    jan = data.filter(cr_date__month='1',cr_date__year=year).count()
    feb = data.filter(cr_date__month='2',cr_date__year=year).count()
    mar = data.filter(cr_date__month='3',cr_date__year=year).count()
    apr = data.filter(cr_date__month='4',cr_date__year=year).count()
    may = data.filter(cr_date__month='5',cr_date__year=year).count()
    jun = data.filter(cr_date__month='6',cr_date__year=year).count()
    jul = data.filter(cr_date__month='7',cr_date__year=year).count()
    aug = data.filter(cr_date__month='8',cr_date__year=year).count()
    sep = data.filter(cr_date__month='9',cr_date__year=year).count()
    octo = data.filter(cr_date__month='10',cr_date__year=year).count()
    nov = data.filter(cr_date__month='11',cr_date__year=year).count()
    dec = data.filter(cr_date__month='12',cr_date__year=year).count()
    total = data.filter(cr_date__year=year).count()
    cr_date = {
        'January': jan,'February': feb,'March': mar,'April': apr,'May': may,'June': jun,
       'July': jul,'August': aug,'September': sep,'October': octo,'November': nov,'December': dec,
       'Total': total
        }
    return (cr_date)

def check_TPL_date(year,data):
    jan = data.filter(end_date__month='1',end_date__year=year).count()
    feb = data.filter(end_date__month='2',end_date__year=year).count()
    mar = data.filter(end_date__month='3',end_date__year=year).count()
    apr = data.filter(end_date__month='4',end_date__year=year).count()
    may = data.filter(end_date__month='5',end_date__year=year).count()
    jun = data.filter(end_date__month='6',end_date__year=year).count()
    jul = data.filter(end_date__month='7',end_date__year=year).count()
    aug = data.filter(end_date__month='8',end_date__year=year).count()
    sep = data.filter(end_date__month='9',end_date__year=year).count()
    octo = data.filter(end_date__month='10',end_date__year=year).count()
    nov = data.filter(end_date__month='11',end_date__year=year).count()
    dec = data.filter(end_date__month='12',end_date__year=year).count()
    total = data.filter(end_date__year=year).count()
    end_date = {
        'January': jan,'February': feb,'March': mar,'April': apr,'May': may,'June': jun,
       'July': jul,'August': aug,'September': sep,'October': octo,'November': nov,'December': dec,
       'Total': total
        }
    return (end_date)

def check_Com_date(year,data):
    jan = data.filter(end_date__month='1',end_date__year=year).count()
    feb = data.filter(end_date__month='2',end_date__year=year).count()
    mar = data.filter(end_date__month='3',end_date__year=year).count()
    apr = data.filter(end_date__month='4',end_date__year=year).count()
    may = data.filter(end_date__month='5',end_date__year=year).count()
    jun = data.filter(end_date__month='6',end_date__year=year).count()
    jul = data.filter(end_date__month='7',end_date__year=year).count()
    aug = data.filter(end_date__month='8',end_date__year=year).count()
    sep = data.filter(end_date__month='9',end_date__year=year).count()
    octo = data.filter(end_date__month='10',end_date__year=year).count()
    nov = data.filter(end_date__month='11',end_date__year=year).count()
    dec = data.filter(end_date__month='12',end_date__year=year).count()
    total = data.filter(end_date__year=year).count()
    end_date = {
        'January': jan,'February': feb,'March': mar,'April': apr,'May': may,'June': jun,
       'July': jul,'August': aug,'September': sep,'October': octo,'November': nov,'December': dec,
       'Total': total
        }
    return (end_date)

def close_to_expire(datas):
    today = datetime.today()
    months = datetime(today.year + int(today.month / 12), ((today.month % 12) + 3), 1)
    count = datas.filter(end_date__range=[today,months]).count()
    return count

def expiry_body_no(datas):
    today = datetime.today()
    months = datetime(today.year + int(today.month / 12), ((today.month % 12) + 3), 1)
    expiry = datas.filter(end_date__range=[today,months])
    return expiry
    
def inspection(first_day, last_day):

    inspection = Inspection.objects.filter(date_created__gte=first_day, date_created__lte=last_day)
    
    inspection = inspection.order_by('body_no','-inspection_id').distinct('body_no').values_list('pk', flat=True)

    inspection = Inspection.objects.filter(pk__in=inspection)
    
    cleanliness_exterior = inspection.filter(cleanliness_exterior=True).count()

    condition_rust = inspection.filter(condition_rust=True).count()
        
    decals = inspection.filter(decals=True).count() 
        
    windows = inspection.filter(windows=True).count()
        
    rear_door = inspection.filter(rear_door=True).count()
        
    mirror = inspection.filter(mirror=True).count()
        
    roof_rack = inspection.filter(roof_rack=True).count()
        
    rear_step = inspection.filter(rear_step=True).count()
        
    seats = inspection.filter(seats=True).count()
        
    seat_belts = inspection.filter(seat_belts=True).count()
        
    general_condition = inspection.filter(general_condition=True).count()

    vehicle_documents = inspection.filter(vehicle_documents=True).count()

    main_beam = inspection.filter(main_beam=True).count()
        
    dipped_beam = inspection.filter(dipped_beam=True).count()
        
    side_lights = inspection.filter(side_lights=True).count()
        
    tail_lights = inspection.filter(tail_lights=True).count()
        
    indicators = inspection.filter(indicators=True).count()
        
    break_lights = inspection.filter(break_lights=True).count()
        
    reverse_lights = inspection.filter(reverse_lights=True).count()
        
    hazard_light = inspection.filter(hazard_light=True).count()
        
    rear_fog_lights = inspection.filter(rear_fog_lights=True).count()
        
    interior_lights = inspection.filter(interior_lights=True).count()
        
    screen_washer = inspection.filter(screen_washer=True).count()

    wiper_blades = inspection.filter(wiper_blades=True).count()
        
    horn = inspection.filter(horn=True).count()
        
    radio = inspection.filter(radio=True).count()
        
    front_fog_lights = inspection.filter(front_fog_lights=True).count()

    cleanliness_engine_bay = inspection.filter(cleanliness_engine_bay=True).count()

    washer_fluid = inspection.filter(washer_fluid=True).count()
        
    coolant_level = inspection.filter(coolant_level=True).count()
        
    brake_fluid_level = inspection.filter(brake_fluid_level=True).count()
        
    power_steering_fluid = inspection.filter(power_steering_fluid=True).count()
        
    liquid_leak = inspection.filter(liquid_leak=True).count()
        
    gas_level = inspection.filter(gas_level=True).count()
    
    oil_level = inspection.filter(oil_level=True).count()
        
    tyres = inspection.filter(tyres=True).count()
        
    front_visual = inspection.filter(front_visual=True).count()
        
    rear_visual = inspection.filter(rear_visual=True).count()
        
    spare_visual = inspection.filter(spare_visual=True).count()
        
    wheel_brace = inspection.filter(wheel_brace=True).count()
        
    jack = inspection.filter(jack=True).count()
        
    front_right_wheel = inspection.filter(front_right_wheel=True).count()

    front_left_wheel = inspection.filter(front_left_wheel=True).count()
        
    rear_right_wheel = inspection.filter(rear_right_wheel=True).count()
        
    rear_left_wheel = inspection.filter(rear_left_wheel=True).count()    
    
    return {'cleanliness_exterior': cleanliness_exterior,
                'condition_rust': condition_rust,
                'decals': decals,
                'windows': windows,
                'rear_door' : rear_door,
                'mirror': mirror,
                'roof_rack': roof_rack,
                'rear_step': rear_step,
                'seats':seats,
                'seat_belts':seat_belts,
                'general_condition':general_condition,
                'vehicle_documents':vehicle_documents,
                'main_beam':main_beam,
                'dipped_beam':dipped_beam,
                'side_lights':side_lights,
                'tail_lights':tail_lights,
                'indicators':indicators,
                'break_lights':break_lights,
                'reverse_lights':reverse_lights,
                'hazard_light':hazard_light,
                'rear_fog_lights':rear_fog_lights,
                'interior_lights':interior_lights,
                'screen_washer':screen_washer,
                'wiper_blades':wiper_blades,
                'horn':horn,
                'radio':radio,
                'front_fog_lights':front_fog_lights,
                'cleanliness_engine_bay':cleanliness_engine_bay,
                'washer_fluid':washer_fluid,
                'coolant_level':coolant_level,
                'brake_fluid_level':brake_fluid_level,
                'power_steering_fluid':power_steering_fluid,
                'liquid_leak':liquid_leak,
                'gas_level':gas_level,
                'oil_level':oil_level,
                'tyres':tyres,
                'front_visual':front_visual,
                'rear_visual':rear_visual,
                'spare_visual':spare_visual,
                'wheel_brace':wheel_brace,
                'jack':jack,
                'front_right_wheel':front_right_wheel,
                'front_left_wheel':front_left_wheel,
                'rear_right_wheel':rear_right_wheel,
                'rear_left_wheel':rear_left_wheel,
                }
