# Generated by Django 3.1 on 2021-03-09 07:13

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
            name='Car',
            fields=[
                ('car_id', models.AutoField(primary_key=True, serialize=False)),
                ('slug', models.CharField(max_length=30)),
                ('vin_no', models.CharField(max_length=30, unique=True)),
                ('body_no', models.CharField(blank=True, max_length=30, null=True, unique=True)),
                ('cs_no', models.CharField(blank=True, max_length=30, null=True, unique=True)),
                ('plate_no', models.CharField(blank=True, max_length=30, null=True, unique=True)),
                ('brand', models.CharField(choices=[('M', 'Mitsubishi'), ('K', 'Kia')], default='M', max_length=2)),
                ('release_year', models.IntegerField(blank=True, default=2021, null=True)),
                ('make', models.CharField(blank=True, max_length=30, null=True)),
                ('series', models.CharField(blank=True, max_length=30, null=True)),
                ('body_type', models.CharField(blank=True, max_length=30, null=True)),
                ('color', models.CharField(blank=True, max_length=30, null=True)),
                ('dealer', models.CharField(choices=[('DM', 'Diamond Motor Corporation'), ('SA', 'Sample Corporation')], default='DM', max_length=2)),
                ('dealer_phone', phone_field.models.PhoneField(blank=True, help_text='Contact phone number', max_length=31, null=True)),
                ('dealer_email', models.EmailField(blank=True, max_length=60, null=True)),
                ('po_no', models.CharField(blank=True, max_length=100, null=True)),
                ('po_date', models.CharField(max_length=20, null=True)),
                ('body_builder', models.CharField(blank=True, max_length=50, null=True)),
                ('fabricator', models.CharField(blank=True, max_length=50, null=True)),
                ('sale_price', models.IntegerField(blank=True, default=0, null=True)),
                ('vat_price', models.IntegerField(blank=True, default=0, null=True)),
                ('engine_no', models.CharField(blank=True, max_length=50, null=True)),
                ('battery_no', models.CharField(blank=True, max_length=50, null=True)),
                ('fuel_type', models.CharField(choices=[('D', 'Diesel'), ('G', 'Gas')], default='D', max_length=1)),
                ('transmission', models.CharField(choices=[('A', 'Automatic'), ('M', 'Manual')], default='M', max_length=1)),
                ('denomination', models.CharField(blank=True, max_length=30, null=True)),
                ('piston', models.IntegerField(blank=True, default=0, null=True)),
                ('cylinder', models.IntegerField(blank=True, default=0, null=True)),
                ('procuring_entity', models.CharField(blank=True, max_length=50, null=True)),
                ('capacity', models.IntegerField(blank=True, default=0, null=True)),
                ('gross_weight', models.IntegerField(blank=True, default=0, null=True)),
                ('net_weight', models.IntegerField(blank=True, default=0, null=True)),
                ('shipping_weight', models.IntegerField(blank=True, default=0, null=True)),
                ('net_capacity', models.IntegerField(blank=True, default=0, null=True)),
                ('lto_cr', models.IntegerField(blank=True, default=0, null=True)),
                ('cr_date', models.CharField(max_length=20, null=True)),
                ('or_no', models.IntegerField(blank=True, default=0, null=True)),
                ('or_date', models.CharField(max_length=20, null=True)),
                ('top_load', models.BooleanField(blank=True, default=False, null=True)),
                ('field_office', models.CharField(blank=True, max_length=50, null=True)),
                ('or_cr', models.CharField(max_length=20, null=True)),
                ('permanent_loc', models.CharField(blank=True, max_length=30, null=True)),
                ('current_loc', models.CharField(blank=True, max_length=30, null=True)),
                ('vtf', models.BooleanField(blank=True, default=False, null=True)),
                ('permanent_status', models.BooleanField(blank=True, default=False, null=True)),
                ('delivery_location', models.CharField(blank=True, max_length=50, null=True)),
                ('deliver_date', models.CharField(max_length=20, null=True)),
                ('si_no', models.IntegerField(blank=True, default=0, null=True)),
                ('dr_no', models.CharField(blank=True, max_length=50, null=True)),
                ('dr_codes', models.CharField(blank=True, max_length=50, null=True)),
                ('plate_date', models.CharField(max_length=20, null=True)),
                ('decals_date', models.CharField(max_length=20, null=True)),
                ('modified', models.BooleanField(blank=True, default=False, null=True)),
                ('ewd_date', models.CharField(max_length=20, null=True)),
                ('tools_date', models.CharField(max_length=20, null=True)),
                ('userManual_date', models.CharField(max_length=20, null=True)),
                ('warrantyBook_date', models.CharField(max_length=20, null=True)),
                ('unitKey_date', models.CharField(max_length=20, null=True)),
                ('bodyKey_date', models.CharField(max_length=20, null=True)),
                ('cigarettePlug_date', models.CharField(max_length=20, null=True)),
                ('keychain_date', models.CharField(max_length=20, null=True)),
                ('fan_date', models.CharField(max_length=20, null=True)),
                ('jack', models.CharField(max_length=20, null=True)),
                ('wrench', models.CharField(max_length=20, null=True)),
                ('fire_extinguisher', models.CharField(max_length=20, null=True)),
                ('remarks', models.TextField(blank=True, max_length=200, null=True)),
                ('operational', models.BooleanField(blank=True, default=False, null=True)),
                ('status', models.CharField(choices=[('A', 'Active'), ('M', 'Maintenance'), ('R', 'Repair')], default='A', max_length=1)),
                ('date_updated', models.DateField(auto_now=True)),
                ('date_created', models.DateField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Inspection',
            fields=[
                ('inspection_id', models.AutoField(primary_key=True, serialize=False)),
                ('mileage', models.IntegerField(default=0)),
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
                ('air_conditioning', models.BooleanField(default=False)),
                ('cleanliness_engine_bay', models.BooleanField(default=False)),
                ('washer_fluid', models.BooleanField(default=False)),
                ('coolant_level', models.BooleanField(default=False)),
                ('brake_fluid_level', models.BooleanField(default=False)),
                ('power_steering_fluid', models.BooleanField(default=False)),
                ('gas_level', models.IntegerField(choices=[(1, 1), (2, 2), (3, 3), (4, 4)])),
                ('oil_level', models.IntegerField(choices=[(1, 1), (2, 2), (3, 3), (4, 4)])),
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
                ('status', models.BooleanField(default=True)),
                ('date_updated', models.DateField(auto_now=True)),
                ('date_created', models.DateField(auto_now_add=True)),
                ('driver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='driver', to=settings.AUTH_USER_MODEL)),
                ('vin_no', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='report', to='careta.car')),
            ],
        ),
        migrations.CreateModel(
            name='UserInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slug', models.CharField(max_length=30)),
                ('company', models.CharField(max_length=50, null=True)),
                ('position', models.CharField(max_length=20, null=True)),
                ('gender', models.CharField(choices=[('M', 'Male'), ('F', 'Female')], max_length=1, null=True)),
                ('birthday', models.DateField(null=True)),
                ('phone', phone_field.models.PhoneField(blank=True, help_text='Contact phone number', max_length=31)),
                ('address', models.CharField(max_length=100, null=True)),
                ('date_created', models.DateField(auto_now_add=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='user_info', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='TPL',
            fields=[
                ('tpl_id', models.AutoField(primary_key=True, serialize=False)),
                ('slug', models.CharField(max_length=30)),
                ('insurance_name', models.CharField(blank=True, max_length=50, null=True)),
                ('telephone', phone_field.models.PhoneField(blank=True, help_text='Contact phone number', max_length=31, null=True)),
                ('email', models.EmailField(blank=True, max_length=60, null=True)),
                ('po_no', models.CharField(blank=True, max_length=50, null=True)),
                ('date_issued', models.CharField(max_length=20, null=True)),
                ('start_date', models.CharField(max_length=20, null=True)),
                ('end_date', models.CharField(max_length=20, null=True)),
                ('cost', models.IntegerField(blank=True, default=0, null=True)),
                ('date_updated', models.DateField(auto_now=True)),
                ('date_created', models.DateField(auto_now_add=True)),
                ('car', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tpl', to='careta.car')),
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
                ('vin_no', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='repair', to='careta.car')),
                ('vms', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='vms', to=settings.AUTH_USER_MODEL)),
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
        migrations.CreateModel(
            name='Insurance',
            fields=[
                ('insurance_id', models.AutoField(primary_key=True, serialize=False)),
                ('slug', models.CharField(max_length=30)),
                ('company', models.CharField(blank=True, max_length=100, null=True)),
                ('telephone', phone_field.models.PhoneField(blank=True, help_text='Contact phone number', max_length=31, null=True)),
                ('email', models.EmailField(blank=True, max_length=50, null=True)),
                ('po_no', models.CharField(blank=True, max_length=30, null=True)),
                ('date_issued', models.CharField(max_length=20, null=True)),
                ('start_date', models.CharField(max_length=20, null=True)),
                ('end_date', models.CharField(max_length=20, null=True)),
                ('cost', models.IntegerField(blank=True, default=0, null=True)),
                ('insurance_no', models.IntegerField(blank=True, default=1, null=True)),
                ('date_updated', models.DateField(auto_now=True, null=True)),
                ('date_created', models.DateField(auto_now_add=True, null=True)),
                ('car', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='insurance', to='careta.car')),
            ],
        ),
        migrations.CreateModel(
            name='InspectiontImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('images', models.ImageField(upload_to='images/')),
                ('report', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='images', to='careta.inspection')),
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
                ('ro_no', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cost', to='careta.repair')),
            ],
        ),
        migrations.CreateModel(
            name='Contract',
            fields=[
                ('contract_id', models.AutoField(primary_key=True, serialize=False)),
                ('slug', models.CharField(max_length=30)),
                ('client_name', models.CharField(blank=True, max_length=100, null=True)),
                ('contract_no', models.CharField(blank=True, max_length=50, null=True)),
                ('start_date', models.CharField(max_length=20, null=True)),
                ('end_date', models.CharField(max_length=20, null=True)),
                ('bid_no', models.CharField(blank=True, max_length=50, null=True)),
                ('bid_name', models.CharField(blank=True, max_length=50, null=True)),
                ('bid_date', models.CharField(max_length=20, null=True)),
                ('cost', models.IntegerField(blank=True, default=0, null=True)),
                ('date_updated', models.DateField(auto_now=True, null=True)),
                ('date_created', models.DateField(auto_now_add=True, null=True)),
                ('car', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='contract', to='careta.car')),
            ],
        ),
    ]
