# Generated by Django 3.1 on 2021-10-18 07:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('task', '0009_remove_ir_vehicle_supp'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='task_status_bm',
            field=models.BooleanField(default=False),
        ),
    ]
