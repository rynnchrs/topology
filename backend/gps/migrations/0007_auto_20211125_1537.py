# Generated by Django 3.1 on 2021-11-25 07:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gps', '0006_auto_20211125_1512'),
    ]

    operations = [
        migrations.AlterField(
            model_name='record',
            name='statisticsday',
            field=models.DateField(blank=True, null=True),
        ),
    ]
