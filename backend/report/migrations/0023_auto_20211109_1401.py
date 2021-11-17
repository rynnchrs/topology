# Generated by Django 3.1 on 2021-11-09 06:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('task', '0011_merge_20211025_0920'),
        ('report', '0022_auto_20211109_1359'),
    ]

    operations = [
        migrations.AlterField(
            model_name='fieldinspection',
            name='job_order',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='field_inspection', to='task.joborder'),
        ),
        migrations.AlterField(
            model_name='fieldinspection',
            name='task',
            field=models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, related_name='field_inspection', to='task.task'),
        ),
    ]