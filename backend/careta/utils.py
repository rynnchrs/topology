import datetime
from datetime import datetime
from .models import Car, Contract, Permission, TPL, Insurance, UserInfo, Report 
from django.contrib.auth.models import User
import json

def user_permission(user):
    permission = Permission.objects.get(slug=user.username) # get users permission
    user = User.objects.get(username=user) 
    if permission.can_view_users == True:  
        return True
    elif permission.can_edit_users == True:  
        return True
    elif permission.can_delete_users == True:  
        return True
    elif permission.can_add_users == True:  
        return True
    else:
        return False
def check_or_date(year):
    if year == 2019:
        jan=feb=mar=apr=may=jun=jul=aug=sep=octo=nov=dec=0
        dates = Car.objects.filter(or_date__isnull=False)
        for date in dates:
            if date.or_date.strftime("%Y/%m") == '2019/01':
                jan += 1
            elif date.or_date.strftime("%Y/%m") == '2019/02':
                feb += 1
            elif date.or_date.strftime("%Y/%m") == '2019/03':
                mar += 1
            elif date.or_date.strftime("%Y/%m") == '2019/04':
                apr += 1
            elif date.or_date.strftime("%Y/%m") == '2019/05':
                may += 1
            elif date.or_date.strftime("%Y/%m") == '2019/06':
                jun += 1
            elif date.or_date.strftime("%Y/%m") == '2019/07':
                jul += 1
            elif date.or_date.strftime("%Y/%m") == '2019/08':
                aug += 1
            elif date.or_date.strftime("%Y/%m") == '2019/09':
                sep += 1
            elif date.or_date.strftime("%Y/%m") == '2019/10':
                octo += 1
            elif date.or_date.strftime("%Y/%m") == '2019/11':
                nov += 1
            elif date.or_date.strftime("%Y/%m") == '2019/12':
                dec += 1
        total = jan+feb+mar+apr+may+jun+jul+aug+sep+octo+nov+dec
        or_date = {
            'January': jan,'February': feb,'March': mar,'April': apr,'May': may,'June': jun,
            'July': jul,'August': aug,'September': sep,'October': octo,'November': nov,'December': dec,
            'Total': total
            }
        or_date = json.dumps(or_date)
        or_date = json.loads(or_date)
        jan=feb=mar=apr=may=jun=jul=aug=sep=octo=nov=dec=0
        return (or_date)
    elif year == 2020:
        jan=feb=mar=apr=may=jun=jul=aug=sep=octo=nov=dec=0
        dates = Car.objects.filter(or_date__isnull=False)
        for date in dates:
            if date.or_date.strftime("%Y/%m") == '2020/01':
                jan += 1
            elif date.or_date.strftime("%Y/%m") == '2020/02':
                feb += 1
            elif date.or_date.strftime("%Y/%m") == '2020/03':
                mar += 1
            elif date.or_date.strftime("%Y/%m") == '2020/04':
                apr += 1
            elif date.or_date.strftime("%Y/%m") == '2020/05':
                may += 1
            elif date.or_date.strftime("%Y/%m") == '2020/06':
                jun += 1
            elif date.or_date.strftime("%Y/%m") == '2020/07':
                jul += 1
            elif date.or_date.strftime("%Y/%m") == '2020/08':
                aug += 1
            elif date.or_date.strftime("%Y/%m") == '2020/09':
                sep += 1
            elif date.or_date.strftime("%Y/%m") == '2020/10':
                octo += 1
            elif date.or_date.strftime("%Y/%m") == '2020/11':
                nov += 1
            elif date.or_date.strftime("%Y/%m") == '2020/12':
                dec += 1
        total = jan+feb+mar+apr+may+jun+jul+aug+sep+octo+nov+dec
        or_date = {
            'January': jan,'February': feb,'March': mar,'April': apr,'May': may,'June': jun,
            'July': jul,'August': aug,'September': sep,'October': octo,'November': nov,'December': dec,
            'Total': total
            }
        or_date = json.dumps(or_date)
        or_date = json.loads(or_date)
        jan=feb=mar=apr=may=jun=jul=aug=sep=octo=nov=dec=0
        return (or_date)
    elif year == 2021:
        jan=feb=mar=apr=may=jun=jul=aug=sep=octo=nov=dec=0
        dates = Car.objects.filter(or_date__isnull=False)
        for date in dates:
            if date.or_date.strftime("%Y/%m") == '2021/01':
                jan += 1
            elif date.or_date.strftime("%Y/%m") == '2021/02':
                feb += 1
            elif date.or_date.strftime("%Y/%m") == '2021/03':
                mar += 1
            elif date.or_date.strftime("%Y/%m") == '2021/04':
                apr += 1
            elif date.or_date.strftime("%Y/%m") == '2021/05':
                may += 1
            elif date.or_date.strftime("%Y/%m") == '2021/06':
                jun += 1
            elif date.or_date.strftime("%Y/%m") == '2021/07':
                jul += 1
            elif date.or_date.strftime("%Y/%m") == '2021/08':
                aug += 1
            elif date.or_date.strftime("%Y/%m") == '2021/09':
                sep += 1
            elif date.or_date.strftime("%Y/%m") == '2021/10':
                octo += 1
            elif date.or_date.strftime("%Y/%m") == '2021/11':
                nov += 1
            elif date.or_date.strftime("%Y/%m") == '2021/12':
                dec += 1
        total = jan+feb+mar+apr+may+jun+jul+aug+sep+octo+nov+dec
        or_date = {
            'January': jan,'February': feb,'March': mar,'April': apr,'May': may,'June': jun,
            'July': jul,'August': aug,'September': sep,'October': octo,'November': nov,'December': dec,
            'Total': total
            }
        or_date = json.dumps(or_date)
        or_date = json.loads(or_date)
        jan=feb=mar=apr=may=jun=jul=aug=sep=octo=nov=dec=0
        return (or_date)
    elif year == 2022:
        jan=feb=mar=apr=may=jun=jul=aug=sep=octo=nov=dec=0
        dates = Car.objects.filter(or_date__isnull=False)
        for date in dates:
            if date.or_date.strftime("%Y/%m") == '2022/01':
                jan += 1
            elif date.or_date.strftime("%Y/%m") == '2022/02':
                feb += 1
            elif date.or_date.strftime("%Y/%m") == '2022/03':
                mar += 1
            elif date.or_date.strftime("%Y/%m") == '2022/04':
                apr += 1
            elif date.or_date.strftime("%Y/%m") == '2022/05':
                may += 1
            elif date.or_date.strftime("%Y/%m") == '2022/06':
                jun += 1
            elif date.or_date.strftime("%Y/%m") == '2022/07':
                jul += 1
            elif date.or_date.strftime("%Y/%m") == '2022/08':
                aug += 1
            elif date.or_date.strftime("%Y/%m") == '2022/09':
                sep += 1
            elif date.or_date.strftime("%Y/%m") == '2022/10':
                octo += 1
            elif date.or_date.strftime("%Y/%m") == '2022/11':
                nov += 1
            elif date.or_date.strftime("%Y/%m") == '2022/12':
                dec += 1
        total = jan+feb+mar+apr+may+jun+jul+aug+sep+octo+nov+dec
        or_date = {
            'January': jan,'February': feb,'March': mar,'April': apr,'May': may,'June': jun,
            'July': jul,'August': aug,'September': sep,'October': octo,'November': nov,'December': dec,
            'Total': total
            }
        or_date = json.dumps(or_date)
        or_date = json.loads(or_date)
        jan=feb=mar=apr=may=jun=jul=aug=sep=octo=nov=dec=0
        return (or_date)

def check_cr_date(year):
    if year == 2019:
        jan=feb=mar=apr=may=jun=jul=aug=sep=octo=nov=dec=0
        dates = Car.objects.filter(cr_date__isnull=False)
        for date in dates:
            if date.cr_date.strftime("%Y/%m") == '2019/01':
                jan += 1
            elif date.cr_date.strftime("%Y/%m") == '2019/02':
                feb += 1
            elif date.cr_date.strftime("%Y/%m") == '2019/03':
                mar += 1
            elif date.cr_date.strftime("%Y/%m") == '2019/04':
                apr += 1
            elif date.cr_date.strftime("%Y/%m") == '2019/05':
                may += 1
            elif date.cr_date.strftime("%Y/%m") == '2019/06':
                jun += 1
            elif date.cr_date.strftime("%Y/%m") == '2019/07':
                jul += 1
            elif date.cr_date.strftime("%Y/%m") == '2019/08':
                aug += 1
            elif date.cr_date.strftime("%Y/%m") == '2019/09':
                sep += 1
            elif date.cr_date.strftime("%Y/%m") == '2019/10':
                octo += 1
            elif date.cr_date.strftime("%Y/%m") == '2019/11':
                nov += 1
            elif date.cr_date.strftime("%Y/%m") == '2019/12':
                dec += 1
        total = jan+feb+mar+apr+may+jun+jul+aug+sep+octo+nov+dec
        cr_date = {
            'January': jan,'February': feb,'March': mar,'April': apr,'May': may,'June': jun,
            'July': jul,'August': aug,'September': sep,'October': octo,'November': nov,'December': dec,
            'Total': total
            }
        cr_date = json.dumps(cr_date)
        cr_date = json.loads(cr_date)
        return (cr_date)
    if year == 2020:
        jan=feb=mar=apr=may=jun=jul=aug=sep=octo=nov=dec=0
        dates = Car.objects.filter(cr_date__isnull=False)
        for date in dates:
            if date.cr_date.strftime("%Y/%m") == '2020/01':
                jan += 1
            elif date.cr_date.strftime("%Y/%m") == '2020/02':
                feb += 1
            elif date.cr_date.strftime("%Y/%m") == '2020/03':
                mar += 1
            elif date.cr_date.strftime("%Y/%m") == '2020/04':
                apr += 1
            elif date.cr_date.strftime("%Y/%m") == '2020/05':
                may += 1
            elif date.cr_date.strftime("%Y/%m") == '2020/06':
                jun += 1
            elif date.cr_date.strftime("%Y/%m") == '2020/07':
                jul += 1
            elif date.cr_date.strftime("%Y/%m") == '2020/08':
                aug += 1
            elif date.cr_date.strftime("%Y/%m") == '2020/09':
                sep += 1
            elif date.cr_date.strftime("%Y/%m") == '2020/10':
                octo += 1
            elif date.cr_date.strftime("%Y/%m") == '2020/11':
                nov += 1
            elif date.cr_date.strftime("%Y/%m") == '2020/12':
                dec += 1
        total = jan+feb+mar+apr+may+jun+jul+aug+sep+octo+nov+dec
        cr_date = {
            'January': jan,'February': feb,'March': mar,'April': apr,'May': may,'June': jun,
            'July': jul,'August': aug,'September': sep,'October': octo,'November': nov,'December': dec,
            'Total': total
            }
        cr_date = json.dumps(cr_date)
        cr_date = json.loads(cr_date)
        return (cr_date)
    if year == 2021:
        jan=feb=mar=apr=may=jun=jul=aug=sep=octo=nov=dec=0
        dates = Car.objects.filter(cr_date__isnull=False)
        for date in dates:
            if date.cr_date.strftime("%Y/%m") == '2021/01':
                jan += 1
            elif date.cr_date.strftime("%Y/%m") == '2021/02':
                feb += 1
            elif date.cr_date.strftime("%Y/%m") == '2021/03':
                mar += 1
            elif date.cr_date.strftime("%Y/%m") == '2021/04':
                apr += 1
            elif date.cr_date.strftime("%Y/%m") == '2021/05':
                may += 1
            elif date.cr_date.strftime("%Y/%m") == '2021/06':
                jun += 1
            elif date.cr_date.strftime("%Y/%m") == '2021/07':
                jul += 1
            elif date.cr_date.strftime("%Y/%m") == '2021/08':
                aug += 1
            elif date.cr_date.strftime("%Y/%m") == '2021/09':
                sep += 1
            elif date.cr_date.strftime("%Y/%m") == '2021/10':
                octo += 1
            elif date.cr_date.strftime("%Y/%m") == '2021/11':
                nov += 1
            elif date.cr_date.strftime("%Y/%m") == '2021/12':
                dec += 1
        total = jan+feb+mar+apr+may+jun+jul+aug+sep+octo+nov+dec
        cr_date = {
            'January': jan,'February': feb,'March': mar,'April': apr,'May': may,'June': jun,
            'July': jul,'August': aug,'September': sep,'October': octo,'November': nov,'December': dec,
            'Total': total
            }
        cr_date = json.dumps(cr_date)
        cr_date = json.loads(cr_date)
        return (cr_date)
    if year == 2022:
        jan=feb=mar=apr=may=jun=jul=aug=sep=octo=nov=dec=0
        dates = Car.objects.filter(cr_date__isnull=False)
        for date in dates:
            if date.cr_date.strftime("%Y/%m") == '2022/01':
                jan += 1
            elif date.cr_date.strftime("%Y/%m") == '2022/02':
                feb += 1
            elif date.cr_date.strftime("%Y/%m") == '2022/03':
                mar += 1
            elif date.cr_date.strftime("%Y/%m") == '2022/04':
                apr += 1
            elif date.cr_date.strftime("%Y/%m") == '2022/05':
                may += 1
            elif date.cr_date.strftime("%Y/%m") == '2022/06':
                jun += 1
            elif date.cr_date.strftime("%Y/%m") == '2022/07':
                jul += 1
            elif date.cr_date.strftime("%Y/%m") == '2022/08':
                aug += 1
            elif date.cr_date.strftime("%Y/%m") == '2022/09':
                sep += 1
            elif date.cr_date.strftime("%Y/%m") == '2022/10':
                octo += 1
            elif date.cr_date.strftime("%Y/%m") == '2022/11':
                nov += 1
            elif date.cr_date.strftime("%Y/%m") == '2022/12':
                dec += 1
        total = jan+feb+mar+apr+may+jun+jul+aug+sep+octo+nov+dec
        cr_date = {
            'January': jan,'February': feb,'March': mar,'April': apr,'May': may,'June': jun,
            'July': jul,'August': aug,'September': sep,'October': octo,'November': nov,'December': dec,
            'Total': total
            }
        cr_date = json.dumps(cr_date)
        cr_date = json.loads(cr_date)
        return (cr_date)

def check_TPL_date(year):
    if year == 2019:
        jan=feb=mar=apr=may=jun=jul=aug=sep=octo=nov=dec=0
        dates = TPL.objects.filter(end_date__isnull=False)
        for date in dates:
            if date.end_date.strftime("%Y/%m") == '2019/01':
                jan += 1
            elif date.end_date.strftime("%Y/%m") == '2019/02':
                feb += 1
            elif date.end_date.strftime("%Y/%m") == '2019/03':
                mar += 1
            elif date.end_date.strftime("%Y/%m") == '2019/04':
                apr += 1
            elif date.end_date.strftime("%Y/%m") == '2019/05':
                may += 1
            elif date.end_date.strftime("%Y/%m") == '2019/06':
                jun += 1
            elif date.end_date.strftime("%Y/%m") == '2019/07':
                jul += 1
            elif date.end_date.strftime("%Y/%m") == '2019/08':
                aug += 1
            elif date.end_date.strftime("%Y/%m") == '2019/09':
                sep += 1
            elif date.end_date.strftime("%Y/%m") == '2019/10':
                octo += 1
            elif date.end_date.strftime("%Y/%m") == '2019/11':
                nov += 1
            elif date.end_date.strftime("%Y/%m") == '2019/12':
                dec += 1
        total = jan+feb+mar+apr+may+jun+jul+aug+sep+octo+nov+dec
        end_date = {
            'January': jan,'February': feb,'March': mar,'April': apr,'May': may,'June': jun,
            'July': jul,'August': aug,'September': sep,'October': octo,'November': nov,'December': dec,
            'Total': total
            }
        end_date = json.dumps(end_date)
        end_date = json.loads(end_date)
        return (end_date)
    if year == 2020:
        jan=feb=mar=apr=may=jun=jul=aug=sep=octo=nov=dec=0
        dates = TPL.objects.filter(end_date__isnull=False)
        for date in dates:
            if date.end_date.strftime("%Y/%m") == '2020/01':
                jan += 1
            elif date.end_date.strftime("%Y/%m") == '2020/02':
                feb += 1
            elif date.end_date.strftime("%Y/%m") == '2020/03':
                mar += 1
            elif date.end_date.strftime("%Y/%m") == '2020/04':
                apr += 1
            elif date.end_date.strftime("%Y/%m") == '2020/05':
                may += 1
            elif date.end_date.strftime("%Y/%m") == '2020/06':
                jun += 1
            elif date.end_date.strftime("%Y/%m") == '2020/07':
                jul += 1
            elif date.end_date.strftime("%Y/%m") == '2020/08':
                aug += 1
            elif date.end_date.strftime("%Y/%m") == '2020/09':
                sep += 1
            elif date.end_date.strftime("%Y/%m") == '2020/10':
                octo += 1
            elif date.end_date.strftime("%Y/%m") == '2020/11':
                nov += 1
            elif date.end_date.strftime("%Y/%m") == '2020/12':
                dec += 1
        total = jan+feb+mar+apr+may+jun+jul+aug+sep+octo+nov+dec
        end_date = {
            'January': jan,'February': feb,'March': mar,'April': apr,'May': may,'June': jun,
            'July': jul,'August': aug,'September': sep,'October': octo,'November': nov,'December': dec,
            'Total': total
            }
        end_date = json.dumps(end_date)
        end_date = json.loads(end_date)
        return (end_date)
    if year == 2021:
        jan=feb=mar=apr=may=jun=jul=aug=sep=octo=nov=dec=0
        dates = TPL.objects.filter(end_date__isnull=False)
        for date in dates:
            if date.end_date.strftime("%Y/%m") == '2021/01':
                jan += 1
            elif date.end_date.strftime("%Y/%m") == '2021/02':
                feb += 1
            elif date.end_date.strftime("%Y/%m") == '2021/03':
                mar += 1
            elif date.end_date.strftime("%Y/%m") == '2021/04':
                apr += 1
            elif date.end_date.strftime("%Y/%m") == '2021/05':
                may += 1
            elif date.end_date.strftime("%Y/%m") == '2021/06':
                jun += 1
            elif date.end_date.strftime("%Y/%m") == '2021/07':
                jul += 1
            elif date.end_date.strftime("%Y/%m") == '2021/08':
                aug += 1
            elif date.end_date.strftime("%Y/%m") == '2021/09':
                sep += 1
            elif date.end_date.strftime("%Y/%m") == '2021/10':
                octo += 1
            elif date.end_date.strftime("%Y/%m") == '2021/11':
                nov += 1
            elif date.end_date.strftime("%Y/%m") == '2021/12':
                dec += 1
        total = jan+feb+mar+apr+may+jun+jul+aug+sep+octo+nov+dec
        end_date = {
            'January': jan,'February': feb,'March': mar,'April': apr,'May': may,'June': jun,
            'July': jul,'August': aug,'September': sep,'October': octo,'November': nov,'December': dec,
            'Total': total
            }
        end_date = json.dumps(end_date)
        end_date = json.loads(end_date)
        return (end_date)
    if year == 2022:
        jan=feb=mar=apr=may=jun=jul=aug=sep=octo=nov=dec=0
        dates = TPL.objects.filter(end_date__isnull=False)
        for date in dates:
            if date.end_date.strftime("%Y/%m") == '2022/01':
                jan += 1
            elif date.end_date.strftime("%Y/%m") == '2022/02':
                feb += 1
            elif date.end_date.strftime("%Y/%m") == '2022/03':
                mar += 1
            elif date.end_date.strftime("%Y/%m") == '2022/04':
                apr += 1
            elif date.end_date.strftime("%Y/%m") == '2022/05':
                may += 1
            elif date.end_date.strftime("%Y/%m") == '2022/06':
                jun += 1
            elif date.end_date.strftime("%Y/%m") == '2022/07':
                jul += 1
            elif date.end_date.strftime("%Y/%m") == '2022/08':
                aug += 1
            elif date.end_date.strftime("%Y/%m") == '2022/09':
                sep += 1
            elif date.end_date.strftime("%Y/%m") == '2022/10':
                octo += 1
            elif date.end_date.strftime("%Y/%m") == '2022/11':
                nov += 1
            elif date.end_date.strftime("%Y/%m") == '2022/12':
                dec += 1
        total = jan+feb+mar+apr+may+jun+jul+aug+sep+octo+nov+dec
        end_date = {
            'January': jan,'February': feb,'March': mar,'April': apr,'May': may,'June': jun,
            'July': jul,'August': aug,'September': sep,'October': octo,'November': nov,'December': dec,
            'Total': total
            }
        end_date = json.dumps(end_date)
        end_date = json.loads(end_date)
        return (end_date)

def check_Com_date(year):
    if year == 2019:
        jan=feb=mar=apr=may=jun=jul=aug=sep=octo=nov=dec=0
        dates = Insurance.objects.filter(end_date__isnull=False)
        for date in dates:
            if date.end_date.strftime("%Y/%m") == '2019/01':
                jan += 1
            elif date.end_date.strftime("%Y/%m") == '2019/02':
                feb += 1
            elif date.end_date.strftime("%Y/%m") == '2019/03':
                mar += 1
            elif date.end_date.strftime("%Y/%m") == '2019/04':
                apr += 1
            elif date.end_date.strftime("%Y/%m") == '2019/05':
                may += 1
            elif date.end_date.strftime("%Y/%m") == '2019/06':
                jun += 1
            elif date.end_date.strftime("%Y/%m") == '2019/07':
                jul += 1
            elif date.end_date.strftime("%Y/%m") == '2019/08':
                aug += 1
            elif date.end_date.strftime("%Y/%m") == '2019/09':
                sep += 1
            elif date.end_date.strftime("%Y/%m") == '2019/10':
                octo += 1
            elif date.end_date.strftime("%Y/%m") == '2019/11':
                nov += 1
            elif date.end_date.strftime("%Y/%m") == '2019/12':
                dec += 1
        total = jan+feb+mar+apr+may+jun+jul+aug+sep+octo+nov+dec
        end_date = {
            'January': jan,'February': feb,'March': mar,'April': apr,'May': may,'June': jun,
            'July': jul,'August': aug,'September': sep,'October': octo,'November': nov,'December': dec,
            'Total': total
            }
        end_date = json.dumps(end_date)
        end_date = json.loads(end_date)
        return (end_date)
    if year == 2020:
        jan=feb=mar=apr=may=jun=jul=aug=sep=octo=nov=dec=0
        dates = Insurance.objects.filter(end_date__isnull=False)
        for date in dates:
            if date.end_date.strftime("%Y/%m") == '2020/01':
                jan += 1
            elif date.end_date.strftime("%Y/%m") == '2020/02':
                feb += 1
            elif date.end_date.strftime("%Y/%m") == '2020/03':
                mar += 1
            elif date.end_date.strftime("%Y/%m") == '2020/04':
                apr += 1
            elif date.end_date.strftime("%Y/%m") == '2020/05':
                may += 1
            elif date.end_date.strftime("%Y/%m") == '2020/06':
                jun += 1
            elif date.end_date.strftime("%Y/%m") == '2020/07':
                jul += 1
            elif date.end_date.strftime("%Y/%m") == '2020/08':
                aug += 1
            elif date.end_date.strftime("%Y/%m") == '2020/09':
                sep += 1
            elif date.end_date.strftime("%Y/%m") == '2020/10':
                octo += 1
            elif date.end_date.strftime("%Y/%m") == '2020/11':
                nov += 1
            elif date.end_date.strftime("%Y/%m") == '2020/12':
                dec += 1
        total = jan+feb+mar+apr+may+jun+jul+aug+sep+octo+nov+dec
        end_date = {
            'January': jan,'February': feb,'March': mar,'April': apr,'May': may,'June': jun,
            'July': jul,'August': aug,'September': sep,'October': octo,'November': nov,'December': dec,
            'Total': total
            }
        end_date = json.dumps(end_date)
        end_date = json.loads(end_date)
        return (end_date)
    if year == 2021:
        jan=feb=mar=apr=may=jun=jul=aug=sep=octo=nov=dec=0
        dates = Insurance.objects.filter(end_date__isnull=False)
        for date in dates:
            if date.end_date.strftime("%Y/%m") == '2021/01':
                jan += 1
            elif date.end_date.strftime("%Y/%m") == '2021/02':
                feb += 1
            elif date.end_date.strftime("%Y/%m") == '2021/03':
                mar += 1
            elif date.end_date.strftime("%Y/%m") == '2021/04':
                apr += 1
            elif date.end_date.strftime("%Y/%m") == '2021/05':
                may += 1
            elif date.end_date.strftime("%Y/%m") == '2021/06':
                jun += 1
            elif date.end_date.strftime("%Y/%m") == '2021/07':
                jul += 1
            elif date.end_date.strftime("%Y/%m") == '2021/08':
                aug += 1
            elif date.end_date.strftime("%Y/%m") == '2021/09':
                sep += 1
            elif date.end_date.strftime("%Y/%m") == '2021/10':
                octo += 1
            elif date.end_date.strftime("%Y/%m") == '2021/11':
                nov += 1
            elif date.end_date.strftime("%Y/%m") == '2021/12':
                dec += 1
        total = jan+feb+mar+apr+may+jun+jul+aug+sep+octo+nov+dec
        end_date = {
            'January': jan,'February': feb,'March': mar,'April': apr,'May': may,'June': jun,
            'July': jul,'August': aug,'September': sep,'October': octo,'November': nov,'December': dec,
            'Total': total
            }
        end_date = json.dumps(end_date)
        end_date = json.loads(end_date)
        return (end_date)
    if year == 2022:
        jan=feb=mar=apr=may=jun=jul=aug=sep=octo=nov=dec=0
        dates = Insurance.objects.filter(end_date__isnull=False)
        for date in dates:
            if date.end_date.strftime("%Y/%m") == '2022/01':
                jan += 1
            elif date.end_date.strftime("%Y/%m") == '2022/02':
                feb += 1
            elif date.end_date.strftime("%Y/%m") == '2022/03':
                mar += 1
            elif date.end_date.strftime("%Y/%m") == '2022/04':
                apr += 1
            elif date.end_date.strftime("%Y/%m") == '2022/05':
                may += 1
            elif date.end_date.strftime("%Y/%m") == '2022/06':
                jun += 1
            elif date.end_date.strftime("%Y/%m") == '2022/07':
                jul += 1
            elif date.end_date.strftime("%Y/%m") == '2022/08':
                aug += 1
            elif date.end_date.strftime("%Y/%m") == '2022/09':
                sep += 1
            elif date.end_date.strftime("%Y/%m") == '2022/10':
                octo += 1
            elif date.end_date.strftime("%Y/%m") == '2022/11':
                nov += 1
            elif date.end_date.strftime("%Y/%m") == '2022/12':
                dec += 1
        total = jan+feb+mar+apr+may+jun+jul+aug+sep+octo+nov+dec
        end_date = {
            'January': jan,'February': feb,'March': mar,'April': apr,'May': may,'June': jun,
            'July': jul,'August': aug,'September': sep,'October': octo,'November': nov,'December': dec,
            'Total': total
            }
        end_date = json.dumps(end_date)
        end_date = json.loads(end_date)
        return (end_date)