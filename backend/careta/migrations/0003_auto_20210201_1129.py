# Generated by Django 3.1 on 2021-02-01 03:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('careta', '0002_insurance'),
    ]

    operations = [
        migrations.AlterField(
            model_name='car',
            name='release_year',
            field=models.IntegerField(default=2021),
        ),
    ]
