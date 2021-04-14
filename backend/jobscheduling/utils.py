import datetime
import json
from datetime import datetime
from django.contrib.auth.models import User
from .models import JobOrder

def get_jo_maxid(jtype):
    try:
        result = JobOrder.objects.filter(job_type=jtype).order_by('-job_number').first()
        return result.job_number
    except:
        return 0