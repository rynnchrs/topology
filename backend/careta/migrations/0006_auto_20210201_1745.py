# Generated by Django 3.1 on 2021-02-01 09:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('careta', '0005_auto_20210201_1744'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='permissions',
            name='date_updated',
        ),
        migrations.RemoveField(
            model_name='userinfo',
            name='date_updated',
        ),
    ]
