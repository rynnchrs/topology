from django.db import models

from .utils import upload_path

class Image(models.Model):
    image_id = models.IntegerField(default=0)
    image_name = models.CharField(max_length=20)
    image = models.ImageField(upload_to=upload_path, null=True, blank=True)
    Mode_List=[
        ('cu','Careta User'),
        ('ci','Car Inventory'),
        ('dr','Driver Reports'),
        ('cr','Careta Reports'),
    ]
    mode  = models.CharField(max_length=2, choices=Mode_List)
    
    def __str__(self):
        return self.image_name
