# Generated by Django 3.1 on 2021-05-06 03:34

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('car', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='JobOrder',
            fields=[
                ('job_id', models.AutoField(primary_key=True, serialize=False)),
                ('job_no', models.IntegerField(default=0)),
                ('type', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('task_id', models.AutoField(primary_key=True, serialize=False)),
                ('desc', models.TextField(blank=True, null=True)),
                ('remarks', models.TextField(blank=True, null=True)),
                ('start_date', models.DateField(default=datetime.date.today)),
                ('end_date', models.DateField(default=datetime.date.today)),
                ('start_date_actual', models.DateField(default=datetime.date.today)),
                ('end_date_actual', models.DateField(default=datetime.date.today)),
                ('actual_days', models.IntegerField(default=0)),
                ('task_status_fm', models.BooleanField(default=False)),
                ('task_status_mn', models.BooleanField(default=False)),
                ('date_updated', models.DateField(auto_now=True)),
                ('date_created', models.DateField(auto_now_add=True)),
                ('body_no', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='task', to='car.car')),
                ('job_order', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='task', to='task.joborder')),
                ('manager', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='task', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Fieldman',
            fields=[
                ('fieldman_id', models.AutoField(primary_key=True, serialize=False)),
                ('field_man', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='fieldman', to=settings.AUTH_USER_MODEL)),
                ('task', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='fieldman', to='task.task')),
            ],
        ),
    ]
