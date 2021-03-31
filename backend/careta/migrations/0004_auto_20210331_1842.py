# Generated by Django 3.1 on 2021-03-31 10:42

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('careta', '0003_auto_20210331_1816'),
    ]

    operations = [
        migrations.AlterField(
            model_name='maintenance',
            name='date',
            field=models.DateField(default=datetime.date(2021, 3, 31)),
        ),
        migrations.AlterField(
            model_name='maintenance',
            name='supplier_name',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
