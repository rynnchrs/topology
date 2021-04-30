import datetime
import json
from datetime import datetime

from .models import TPL, Car, Insurance


def check_or_date(year):
    jan=feb=mar=apr=may=jun=jul=aug=sep=octo=nov=dec=0
    dates = Car.objects.filter(or_date__isnull=False)
    for date in dates:
        date = date.or_date
        date = datetime.strptime(date, '%Y-%m-%d')
        if date.strftime("%b-%Y") == 'Jan-'+str(year):
            jan += 1
        elif date.strftime("%b-%Y") == 'Feb-'+str(year):
            feb += 1
        elif date.strftime("%b-%Y") == 'Mar-'+str(year):
            mar += 1
        elif date.strftime("%b-%Y") == 'Apr-'+str(year):
            apr += 1
        elif date.strftime("%b-%Y") == 'May-'+str(year):
            may += 1
        elif date.strftime("%b-%Y") == 'Jun-'+str(year):
            jun += 1
        elif date.strftime("%b-%Y") == 'Jul-'+str(year):
            jul += 1
        elif date.strftime("%b-%Y") == 'Aug-'+str(year):
            aug += 1
        elif date.strftime("%b-%Y") == 'Sep-'+str(year):
            sep += 1
        elif date.strftime("%b-%Y") == 'Oct-'+str(year):
            octo += 1
        elif date.strftime("%b-%Y") == 'Nov-'+str(year):
            nov += 1
        elif date.strftime("%b-%Y") == 'Dec-'+str(year):
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
    jan=feb=mar=apr=may=jun=jul=aug=sep=octo=nov=dec=0
    dates = Car.objects.filter(cr_date__isnull=False)
    for date in dates:
        date = date.cr_date
        date = datetime.strptime(date, '%Y-%m-%d')
        if date.strftime("%b-%Y") == 'Jan-'+str(year):
            jan += 1
        elif date.strftime("%b-%Y") == 'Feb-'+str(year):
            feb += 1
        elif date.strftime("%b-%Y") == 'Mar-'+str(year):
            mar += 1
        elif date.strftime("%b-%Y") == 'Apr-'+str(year):
            apr += 1
        elif date.strftime("%b-%Y") == 'May-'+str(year):
            may += 1
        elif date.strftime("%b-%Y") == 'Jun-'+str(year):
            jun += 1
        elif date.strftime("%b-%Y") == 'Jul-'+str(year):
            jul += 1
        elif date.strftime("%b-%Y") == 'Aug-'+str(year):
            aug += 1
        elif date.strftime("%b-%Y") == 'Sep-'+str(year):
            sep += 1
        elif date.strftime("%b-%Y") == 'Oct-'+str(year):
            octo += 1
        elif date.strftime("%b-%Y") == 'Nov-'+str(year):
            nov += 1
        elif date.strftime("%b-%Y") == 'Dec-'+str(year):
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
    jan=feb=mar=apr=may=jun=jul=aug=sep=octo=nov=dec=0
    dates = TPL.objects.filter(end_date__isnull=False)
    for date in dates:
        date = date.end_date
        date = datetime.strptime(date, '%Y-%m-%d')
        if date.strftime("%b-%y") == 'Jan-'+str(year)[-2:]:
            jan += 1
        elif date.strftime("%b-%y") == 'Feb-'+str(year)[-2:]:
            feb += 1
        elif date.strftime("%b-%y") == 'Mar-'+str(year)[-2:]:
            mar += 1
        elif date.strftime("%b-%y") == 'Apr-'+str(year)[-2:]:
            apr += 1
        elif date.strftime("%b-%y") == 'May-'+str(year)[-2:]:
            may += 1
        elif date.strftime("%b-%y") == 'Jun-'+str(year)[-2:]:
            jun += 1
        elif date.strftime("%b-%y") == 'Jul-'+str(year)[-2:]:
            jul += 1
        elif date.strftime("%b-%y") == 'Aug-'+str(year)[-2:]:
            aug += 1
        elif date.strftime("%b-%y") == 'Sep-'+str(year)[-2:]:
            sep += 1
        elif date.strftime("%b-%y") == 'Oct-'+str(year)[-2:]:
            octo += 1
        elif date.strftime("%b-%y") == 'Nov-'+str(year)[-2:]:
            nov += 1
        elif date.strftime("%b-%y") == 'Dec-'+str(year)[-2:]:
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
    jan=feb=mar=apr=may=jun=jul=aug=sep=octo=nov=dec=0
    dates = Insurance.objects.filter(end_date__isnull=False)
    for date in dates:
        date = date.end_date
        date = datetime.strptime(date, '%Y-%m-%d')
        if date.strftime("%b-%y") == 'Jan-'+str(year)[-2:]:
            jan += 1
        elif date.strftime("%b-%y") == 'Feb-'+str(year)[-2:]:
            feb += 1
        elif date.strftime("%b-%y") == 'Mar-'+str(year)[-2:]:
            mar += 1
        elif date.strftime("%b-%y") == 'Apr-'+str(year)[-2:]:
            apr += 1
        elif date.strftime("%b-%y") == 'May-'+str(year)[-2:]:
            may += 1
        elif date.strftime("%b-%y") == 'Jun-'+str(year)[-2:]:
            jun += 1
        elif date.strftime("%b-%y") == 'Jul-'+str(year)[-2:]:
            jul += 1
        elif date.strftime("%b-%y") == 'Aug-'+str(year)[-2:]:
            aug += 1
        elif date.strftime("%b-%y") == 'Sep-'+str(year)[-2:]:
            sep += 1
        elif date.strftime("%b-%y") == 'Oct-'+str(year)[-2:]:
            octo += 1
        elif date.strftime("%b-%y") == 'Nov-'+str(year)[-2:]:
            nov += 1
        elif date.strftime("%b-%y") == 'Dec-'+str(year)[-2:]:
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
