# Generated by Django 3.1 on 2021-05-03 07:02

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import phone_field.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slug', models.CharField(max_length=30)),
                ('company', models.CharField(blank=True, max_length=50, null=True)),
                ('position', models.CharField(blank=True, max_length=20, null=True)),
                ('gender', models.CharField(choices=[('M', 'Male'), ('F', 'Female')], max_length=1, null=True)),
                ('birthday', models.DateField(null=True)),
                ('phone', phone_field.models.PhoneField(blank=True, help_text='Contact phone number', max_length=31, unique=True)),
                ('address', models.CharField(blank=True, max_length=100, null=True)),
                ('date_created', models.DateField(auto_now_add=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='user_info', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Permission',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slug', models.CharField(max_length=30)),
                ('can_view_users', models.BooleanField(default=False)),
                ('can_add_users', models.BooleanField(default=False)),
                ('can_edit_users', models.BooleanField(default=False)),
                ('can_delete_users', models.BooleanField(default=False)),
                ('can_view_inventory', models.BooleanField(default=False)),
                ('can_add_inventory', models.BooleanField(default=False)),
                ('can_edit_inventory', models.BooleanField(default=False)),
                ('can_delete_inventory', models.BooleanField(default=False)),
                ('can_view_inspection_reports', models.BooleanField(default=False)),
                ('can_add_inspection_reports', models.BooleanField(default=False)),
                ('can_edit_inspection_reports', models.BooleanField(default=False)),
                ('can_delete_inspection_reports', models.BooleanField(default=False)),
                ('can_view_maintenance_reports', models.BooleanField(default=False)),
                ('can_add_maintenance_reports', models.BooleanField(default=False)),
                ('can_edit_maintenance_reports', models.BooleanField(default=False)),
                ('can_delete_maintenance_reports', models.BooleanField(default=False)),
                ('can_view_repair_reports', models.BooleanField(default=False)),
                ('can_add_repair_reports', models.BooleanField(default=False)),
                ('can_edit_repair_reports', models.BooleanField(default=False)),
                ('can_delete_repair_reports', models.BooleanField(default=False)),
                ('can_view_task', models.BooleanField(default=False)),
                ('can_add_task', models.BooleanField(default=False)),
                ('can_edit_task', models.BooleanField(default=False)),
                ('can_delete_task', models.BooleanField(default=False)),
                ('date_created', models.DateField(auto_now_add=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
