# Generated by Django 3.1 on 2021-10-20 06:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('task', '0009_remove_ir_vehicle_supp'),
    ]

    operations = [
        migrations.AddField(
            model_name='ir',
            name='remarks',
            field=models.TextField(blank=True, max_length=200, null=True),
        ),
    ]
