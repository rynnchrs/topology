# Generated by Django 3.1 on 2021-10-06 08:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('task', '0009_remove_ir_vehicle_supp'),
        ('report', '0014_auto_20210914_1559'),
    ]

    operations = [
        migrations.AddField(
            model_name='repair',
            name='task',
            field=models.OneToOneField(default='1', on_delete=django.db.models.deletion.PROTECT, related_name='repair', to='task.task'),
        ),
    ]