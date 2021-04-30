# Generated by Django 3.1 on 2021-04-29 11:55

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('car', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('careta', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Inspection',
            fields=[
                ('inspection_id', models.AutoField(primary_key=True, serialize=False)),
                ('mileage', models.IntegerField(default=0)),
                ('gps', models.CharField(blank=True, max_length=255, null=True)),
                ('cleanliness_exterior', models.BooleanField(default=False)),
                ('condition_rust', models.BooleanField(default=False)),
                ('decals', models.BooleanField(default=False)),
                ('windows', models.BooleanField(default=False)),
                ('rear_door', models.BooleanField(default=False)),
                ('mirror', models.BooleanField(default=False)),
                ('roof_rack', models.BooleanField(default=False)),
                ('rear_step', models.BooleanField(default=False)),
                ('seats', models.BooleanField(default=False)),
                ('seat_belts', models.BooleanField(default=False)),
                ('general_condition', models.BooleanField(default=False)),
                ('vehicle_documents', models.BooleanField(default=False)),
                ('main_beam', models.BooleanField(default=False)),
                ('dipped_beam', models.BooleanField(default=False)),
                ('side_lights', models.BooleanField(default=False)),
                ('tail_lights', models.BooleanField(default=False)),
                ('indicators', models.BooleanField(default=False)),
                ('break_lights', models.BooleanField(default=False)),
                ('reverse_lights', models.BooleanField(default=False)),
                ('hazard_light', models.BooleanField(default=False)),
                ('rear_fog_lights', models.BooleanField(default=False)),
                ('interior_lights', models.BooleanField(default=False)),
                ('screen_washer', models.BooleanField(default=False)),
                ('wiper_blades', models.BooleanField(default=False)),
                ('horn', models.BooleanField(default=False)),
                ('radio', models.BooleanField(default=False)),
                ('front_fog_lights', models.BooleanField(default=False)),
                ('cleanliness_engine_bay', models.BooleanField(default=False)),
                ('washer_fluid', models.BooleanField(default=False)),
                ('coolant_level', models.BooleanField(default=False)),
                ('brake_fluid_level', models.BooleanField(default=False)),
                ('power_steering_fluid', models.BooleanField(default=False)),
                ('liquid_leak', models.BooleanField(default=False)),
                ('gas_level', models.IntegerField(choices=[(1, 1), (2, 2), (3, 3), (4, 4)], default=1)),
                ('oil_level', models.IntegerField(choices=[(1, 1), (2, 2), (3, 3), (4, 4)], default=1)),
                ('tyres', models.BooleanField(default=False)),
                ('front_visual', models.BooleanField(default=False)),
                ('rear_visual', models.BooleanField(default=False)),
                ('spare_visual', models.BooleanField(default=False)),
                ('wheel_brace', models.BooleanField(default=False)),
                ('jack', models.BooleanField(default=False)),
                ('front_right_wheel', models.BooleanField(default=False)),
                ('front_left_wheel', models.BooleanField(default=False)),
                ('rear_right_wheel', models.BooleanField(default=False)),
                ('rear_left_wheel', models.BooleanField(default=False)),
                ('notes', models.TextField(blank=True, null=True)),
                ('date_updated', models.DateField(auto_now=True)),
                ('date_created', models.DateField(auto_now_add=True)),
                ('body_no', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='inspection', to='car.car')),
                ('driver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='driver', to=settings.AUTH_USER_MODEL)),
                ('edited_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='edited_by', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Repair',
            fields=[
                ('repair_id', models.AutoField(primary_key=True, serialize=False)),
                ('ro_no', models.CharField(max_length=10, unique=True)),
                ('current_status', models.CharField(max_length=30)),
                ('incident_details', models.TextField(blank=True, max_length=200, null=True)),
                ('dealer', models.CharField(max_length=30)),
                ('schedule_date', models.DateField()),
                ('perform_date', models.DateField()),
                ('actual_findings', models.TextField(blank=True, max_length=200, null=True)),
                ('actual_remarks', models.TextField(blank=True, max_length=200, null=True)),
                ('repair_date', models.DateField()),
                ('action_taken', models.TextField(blank=True, max_length=200, null=True)),
                ('date_done', models.DateField()),
                ('status_repair', models.CharField(max_length=20)),
                ('remarks', models.TextField(blank=True, max_length=200, null=True)),
                ('date_updated', models.DateField(auto_now=True)),
                ('date_created', models.DateField(auto_now_add=True)),
                ('perform_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='actual', to=settings.AUTH_USER_MODEL)),
                ('repair_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='repair', to=settings.AUTH_USER_MODEL)),
                ('vin_no', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='repair', to='car.car')),
                ('vms', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='vms', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Maintenance',
            fields=[
                ('maintenance_id', models.AutoField(primary_key=True, serialize=False)),
                ('supplier_name', models.CharField(blank=True, max_length=50, null=True)),
                ('mileage', models.IntegerField(blank=True, default=0, null=True)),
                ('exterior_body', models.IntegerField(choices=[(1, 'CHECK AND OK'), (2, 'MAY REQUIRE ATTENTION'), (3, 'REQUIRES IMMEDIATE ATTENTION')], default=1)),
                ('windshield', models.IntegerField(choices=[(1, 'CHECK AND OK'), (2, 'MAY REQUIRE ATTENTION'), (3, 'REQUIRES IMMEDIATE ATTENTION')], default=1)),
                ('wipers', models.IntegerField(choices=[(1, 'CHECK AND OK'), (2, 'MAY REQUIRE ATTENTION'), (3, 'REQUIRES IMMEDIATE ATTENTION')], default=1)),
                ('lights', models.IntegerField(choices=[(1, 'CHECK AND OK'), (2, 'MAY REQUIRE ATTENTION'), (3, 'REQUIRES IMMEDIATE ATTENTION')], default=1)),
                ('interior_lights', models.IntegerField(choices=[(1, 'CHECK AND OK'), (2, 'MAY REQUIRE ATTENTION'), (3, 'REQUIRES IMMEDIATE ATTENTION')], default=1)),
                ('ac_operation', models.IntegerField(choices=[(1, 'CHECK AND OK'), (2, 'MAY REQUIRE ATTENTION'), (3, 'REQUIRES IMMEDIATE ATTENTION')], default=1)),
                ('heating', models.IntegerField(choices=[(1, 'CHECK AND OK'), (2, 'MAY REQUIRE ATTENTION'), (3, 'REQUIRES IMMEDIATE ATTENTION')], default=1)),
                ('interior_other', models.CharField(blank=True, max_length=30, null=True)),
                ('engine_oil', models.IntegerField(choices=[(1, 'CHECK AND OK'), (2, 'MAY REQUIRE ATTENTION'), (3, 'REQUIRES IMMEDIATE ATTENTION')], default=1)),
                ('brake_fluid', models.IntegerField(choices=[(1, 'CHECK AND OK'), (2, 'MAY REQUIRE ATTENTION'), (3, 'REQUIRES IMMEDIATE ATTENTION')], default=1)),
                ('power_stearing', models.IntegerField(choices=[(1, 'CHECK AND OK'), (2, 'MAY REQUIRE ATTENTION'), (3, 'REQUIRES IMMEDIATE ATTENTION')], default=1)),
                ('washer', models.IntegerField(choices=[(1, 'CHECK AND OK'), (2, 'MAY REQUIRE ATTENTION'), (3, 'REQUIRES IMMEDIATE ATTENTION')], default=1)),
                ('belts_hoses', models.IntegerField(choices=[(1, 'CHECK AND OK'), (2, 'MAY REQUIRE ATTENTION'), (3, 'REQUIRES IMMEDIATE ATTENTION')], default=1)),
                ('coolant', models.IntegerField(choices=[(1, 'CHECK AND OK'), (2, 'MAY REQUIRE ATTENTION'), (3, 'REQUIRES IMMEDIATE ATTENTION')], default=1)),
                ('air_filter', models.IntegerField(choices=[(1, 'CHECK AND OK'), (2, 'MAY REQUIRE ATTENTION'), (3, 'REQUIRES IMMEDIATE ATTENTION')], default=1)),
                ('cabin_filter', models.IntegerField(choices=[(1, 'CHECK AND OK'), (2, 'MAY REQUIRE ATTENTION'), (3, 'REQUIRES IMMEDIATE ATTENTION')], default=1)),
                ('fuel_filter', models.IntegerField(choices=[(1, 'CHECK AND OK'), (2, 'MAY REQUIRE ATTENTION'), (3, 'REQUIRES IMMEDIATE ATTENTION')], default=1)),
                ('spark_plug', models.IntegerField(choices=[(1, 'CHECK AND OK'), (2, 'MAY REQUIRE ATTENTION'), (3, 'REQUIRES IMMEDIATE ATTENTION')], default=1)),
                ('underhood_other', models.CharField(blank=True, max_length=30, null=True)),
                ('battery_charge', models.IntegerField(choices=[(1, 'CHECK AND OK'), (2, 'MAY REQUIRE ATTENTION'), (3, 'REQUIRES IMMEDIATE ATTENTION')], default=1)),
                ('battery_condition', models.IntegerField(choices=[(1, 'CHECK AND OK'), (2, 'MAY REQUIRE ATTENTION'), (3, 'REQUIRES IMMEDIATE ATTENTION')], default=1)),
                ('cables', models.IntegerField(choices=[(1, 'CHECK AND OK'), (2, 'MAY REQUIRE ATTENTION'), (3, 'REQUIRES IMMEDIATE ATTENTION')], default=1)),
                ('brakes', models.IntegerField(choices=[(1, 'CHECK AND OK'), (2, 'MAY REQUIRE ATTENTION'), (3, 'REQUIRES IMMEDIATE ATTENTION')], default=1)),
                ('brake_lines', models.IntegerField(choices=[(1, 'CHECK AND OK'), (2, 'MAY REQUIRE ATTENTION'), (3, 'REQUIRES IMMEDIATE ATTENTION')], default=1)),
                ('steering', models.IntegerField(choices=[(1, 'CHECK AND OK'), (2, 'MAY REQUIRE ATTENTION'), (3, 'REQUIRES IMMEDIATE ATTENTION')], default=1)),
                ('shocks', models.IntegerField(choices=[(1, 'CHECK AND OK'), (2, 'MAY REQUIRE ATTENTION'), (3, 'REQUIRES IMMEDIATE ATTENTION')], default=1)),
                ('driveline', models.IntegerField(choices=[(1, 'CHECK AND OK'), (2, 'MAY REQUIRE ATTENTION'), (3, 'REQUIRES IMMEDIATE ATTENTION')], default=1)),
                ('exhaust', models.IntegerField(choices=[(1, 'CHECK AND OK'), (2, 'MAY REQUIRE ATTENTION'), (3, 'REQUIRES IMMEDIATE ATTENTION')], default=1)),
                ('fuel_lines', models.IntegerField(choices=[(1, 'CHECK AND OK'), (2, 'MAY REQUIRE ATTENTION'), (3, 'REQUIRES IMMEDIATE ATTENTION')], default=1)),
                ('under_vehicle_other', models.CharField(blank=True, max_length=30, null=True)),
                ('tread_depth', models.IntegerField(choices=[(1, '7/32" or greater'), (2, '3/32" to 6/32"'), (3, '2/32" or less')], default=1)),
                ('tread_lf', models.IntegerField(choices=[(1, 'CHECK AND OK'), (2, 'MAY REQUIRE ATTENTION'), (3, 'REQUIRES IMMEDIATE ATTENTION')], default=1)),
                ('tread_lr', models.IntegerField(choices=[(1, 'CHECK AND OK'), (2, 'MAY REQUIRE ATTENTION'), (3, 'REQUIRES IMMEDIATE ATTENTION')], default=1)),
                ('tread_rf', models.IntegerField(choices=[(1, 'CHECK AND OK'), (2, 'MAY REQUIRE ATTENTION'), (3, 'REQUIRES IMMEDIATE ATTENTION')], default=1)),
                ('tread_rr', models.IntegerField(choices=[(1, 'CHECK AND OK'), (2, 'MAY REQUIRE ATTENTION'), (3, 'REQUIRES IMMEDIATE ATTENTION')], default=1)),
                ('wear_lf', models.IntegerField(choices=[(1, 'CHECK AND OK'), (2, 'MAY REQUIRE ATTENTION'), (3, 'REQUIRES IMMEDIATE ATTENTION')], default=1)),
                ('wear_lr', models.IntegerField(choices=[(1, 'CHECK AND OK'), (2, 'MAY REQUIRE ATTENTION'), (3, 'REQUIRES IMMEDIATE ATTENTION')], default=1)),
                ('wear_rf', models.IntegerField(choices=[(1, 'CHECK AND OK'), (2, 'MAY REQUIRE ATTENTION'), (3, 'REQUIRES IMMEDIATE ATTENTION')], default=1)),
                ('wear_rr', models.IntegerField(choices=[(1, 'CHECK AND OK'), (2, 'MAY REQUIRE ATTENTION'), (3, 'REQUIRES IMMEDIATE ATTENTION')], default=1)),
                ('tpms', models.BooleanField(default=False)),
                ('air_lf', models.IntegerField(blank=True, default=0, null=True)),
                ('air_lr', models.IntegerField(blank=True, default=0, null=True)),
                ('air_rf', models.IntegerField(blank=True, default=0, null=True)),
                ('air_rr', models.IntegerField(blank=True, default=0, null=True)),
                ('alignment', models.BooleanField(default=False)),
                ('balance', models.BooleanField(default=False)),
                ('rotation', models.BooleanField(default=False)),
                ('new_tire', models.BooleanField(default=False)),
                ('repair_desc', models.TextField(blank=True, null=True)),
                ('comments', models.TextField(blank=True, null=True)),
                ('date', models.DateField(default=datetime.date.today)),
                ('date_updated', models.DateField(auto_now=True)),
                ('date_created', models.DateField(auto_now_add=True)),
                ('body_no', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='maintenance', to='car.car')),
                ('edited_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='edited', to=settings.AUTH_USER_MODEL)),
                ('inspected_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='inspected', to=settings.AUTH_USER_MODEL)),
                ('job_order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='maintenance', to='careta.joborder')),
            ],
        ),
        migrations.CreateModel(
            name='InspectiontImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('images', models.ImageField(upload_to='images/')),
                ('report', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='images', to='report.inspection')),
            ],
        ),
        migrations.CreateModel(
            name='Cost',
            fields=[
                ('cost_id', models.AutoField(primary_key=True, serialize=False)),
                ('cost_type', models.CharField(choices=[('P', 'Parts'), ('L', 'Labor')], default='L', max_length=1)),
                ('particulars', models.CharField(max_length=50)),
                ('cost', models.IntegerField(default=0)),
                ('quantity', models.IntegerField(default=0)),
                ('date_updated', models.DateField(auto_now=True)),
                ('date_created', models.DateField(auto_now_add=True)),
                ('ro_no', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cost', to='report.repair')),
            ],
        ),
    ]
