import os
import subprocess
import sys

from celery import shared_task
from celery.utils.log import get_task_logger

logger = get_task_logger(__name__)

@shared_task(bind=True)
def gps_record(self):
     process = subprocess.Popen(["python","gps.py"], shell=True)
