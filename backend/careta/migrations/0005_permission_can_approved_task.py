# Generated by Django 3.1 on 2021-10-18 07:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('careta', '0004_auto_20211005_1703'),
    ]

    operations = [
        migrations.AddField(
            model_name='permission',
            name='can_approved_task',
            field=models.BooleanField(default=False),
        ),
    ]