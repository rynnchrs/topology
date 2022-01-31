# Generated by Django 3.1 on 2022-01-14 02:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gps', '0010_auto_20220113_1555'),
    ]

    operations = [
        migrations.AddField(
            model_name='record',
            name='controlvoltage',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='record',
            name='speed',
            field=models.IntegerField(default=0),
        ),
    ]
