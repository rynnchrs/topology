from django.db import models

# Create your models here.

class Email(models.Model):
    email_id = models.AutoField(primary_key=True)
    email_add = models.EmailField(unique=True)

    date_updated = models.DateField(auto_now=True)
    date_created = models.DateField(auto_now_add=True)