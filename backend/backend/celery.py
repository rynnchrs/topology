from __future__ import absolute_import

import os

from django.conf import settings

from celery import Celery
from celery.schedules import crontab

# Set default Django settings 
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings') 
app = Celery('backend')
# Celery will apply all configuration keys with defined namespace  
app.config_from_object(settings, namespace='CELERY')   
# Load tasks from all registered apps 
app.autodiscover_tasks()


app.conf.beat_schedule = {
    'get-gps-record': { 
        'task': 'gps.tasks.gps_record', 
        'schedule': crontab(minute='*/10')
    },  
}


@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))
