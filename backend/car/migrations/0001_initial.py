# Generated by Django 3.1 on 2021-05-06 03:34

from django.db import migrations, models
import django.db.models.deletion
import phone_field.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
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
                ('brand', models.CharField(choices=[('M', 'Mitsubishi'), ('S', 'Suzuki'), ('F', 'Foton')], default='M', max_length=2)),
                ('release_year', models.IntegerField(blank=True, default=2021, null=True)),
                ('make', models.CharField(choices=[('L30', 'L300 Exceed 2.5D MT'), ('SUV', 'Super Carry UV'), ('G15', 'Gratour midi truck 1.5L'), ('G12', 'Gratour midi truck 1.2L')], default='L30', max_length=3)),
                ('series', models.CharField(choices=[('L3', 'L300 Exceed C/C'), ('SC', 'Suzuki CAB CHAS'), ('GR', 'Gratour midi')], default='L3', max_length=2)),
                ('body_type', models.CharField(blank=True, max_length=30, null=True)),
                ('color', models.CharField(blank=True, max_length=30, null=True)),
                ('dealer', models.CharField(choices=[('DMC', 'Diamond Motor Corporation'), ('GCM', 'Grand Canyon Multi Holdings, INC.'), ('CAC', 'Cebu Autocentrale Corporation'), ('CAI', 'Cherub Autodealer Inc.')], default='DMC', max_length=3)),
                ('dealer_phone', phone_field.models.PhoneField(blank=True, help_text='Contact phone number', max_length=31, null=True)),
                ('dealer_email', models.EmailField(blank=True, max_length=60, null=True)),
                ('po_no', models.CharField(blank=True, max_length=100, null=True)),
                ('po_date', models.CharField(blank=True, max_length=20, null=True)),
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
                ('lto_cr', models.CharField(blank=True, max_length=30, null=True)),
                ('cr_date', models.CharField(blank=True, max_length=20, null=True)),
                ('or_no', models.IntegerField(blank=True, default=0, null=True)),
                ('or_date', models.CharField(blank=True, max_length=20, null=True)),
                ('top_load', models.BooleanField(blank=True, default=False, null=True)),
                ('field_office', models.CharField(blank=True, max_length=50, null=True)),
                ('or_cr', models.CharField(blank=True, max_length=20, null=True)),
                ('permanent_loc', models.CharField(blank=True, max_length=30, null=True)),
                ('current_loc', models.CharField(blank=True, max_length=30, null=True)),
                ('vtf', models.BooleanField(blank=True, default=False, null=True)),
                ('permanent_status', models.BooleanField(blank=True, default=False, null=True)),
                ('delivery_location', models.CharField(blank=True, max_length=50, null=True)),
                ('deliver_date', models.CharField(blank=True, max_length=20, null=True)),
                ('si_no', models.IntegerField(blank=True, default=0, null=True)),
                ('dr_no', models.CharField(blank=True, max_length=50, null=True)),
                ('dr_codes', models.CharField(blank=True, max_length=50, null=True)),
                ('plate_date', models.CharField(blank=True, max_length=20, null=True)),
                ('decals_date', models.CharField(blank=True, max_length=20, null=True)),
                ('modified', models.BooleanField(blank=True, default=False, null=True)),
                ('ewd_date', models.CharField(blank=True, max_length=20, null=True)),
                ('tools_date', models.CharField(blank=True, max_length=20, null=True)),
                ('userManual_date', models.CharField(blank=True, max_length=20, null=True)),
                ('warrantyBook_date', models.CharField(blank=True, max_length=20, null=True)),
                ('unitKey_date', models.CharField(blank=True, max_length=20, null=True)),
                ('bodyKey_date', models.CharField(blank=True, max_length=20, null=True)),
                ('cigarettePlug_date', models.CharField(blank=True, max_length=20, null=True)),
                ('keychain_date', models.CharField(blank=True, max_length=20, null=True)),
                ('fan_date', models.CharField(blank=True, max_length=20, null=True)),
                ('jack', models.CharField(blank=True, max_length=20, null=True)),
                ('wrench', models.CharField(blank=True, max_length=20, null=True)),
                ('fire_extinguisher', models.CharField(blank=True, max_length=20, null=True)),
                ('remarks', models.TextField(blank=True, max_length=200, null=True)),
                ('operational', models.BooleanField(blank=True, default=False, null=True)),
                ('status', models.CharField(choices=[('A', 'Active'), ('M', 'Maintenance'), ('R', 'Repair')], default='A', max_length=1)),
                ('date_updated', models.DateField(auto_now=True)),
                ('date_created', models.DateField(auto_now_add=True)),
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
                ('date_issued', models.CharField(blank=True, max_length=20, null=True)),
                ('start_date', models.CharField(blank=True, max_length=20, null=True)),
                ('end_date', models.CharField(blank=True, max_length=20, null=True)),
                ('cost', models.IntegerField(blank=True, default=0, null=True)),
                ('date_updated', models.DateField(auto_now=True)),
                ('date_created', models.DateField(auto_now_add=True)),
                ('car', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tpl', to='car.car')),
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
                ('reference_no', models.CharField(blank=True, max_length=30, null=True)),
                ('date_issued', models.CharField(blank=True, max_length=20, null=True)),
                ('start_date', models.CharField(blank=True, max_length=20, null=True)),
                ('end_date', models.CharField(blank=True, max_length=20, null=True)),
                ('cost', models.IntegerField(blank=True, default=0, null=True)),
                ('insurance_no', models.IntegerField(blank=True, default=1, null=True)),
                ('date_updated', models.DateField(auto_now=True, null=True)),
                ('date_created', models.DateField(auto_now_add=True, null=True)),
                ('car', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='insurance', to='car.car')),
            ],
        ),
        migrations.CreateModel(
            name='Contract',
            fields=[
                ('contract_id', models.AutoField(primary_key=True, serialize=False)),
                ('slug', models.CharField(max_length=30)),
                ('client_name', models.CharField(blank=True, max_length=100, null=True)),
                ('contract_no', models.CharField(blank=True, max_length=50, null=True)),
                ('start_date', models.CharField(blank=True, max_length=20, null=True)),
                ('end_date', models.CharField(blank=True, max_length=20, null=True)),
                ('bid_no', models.CharField(blank=True, max_length=50, null=True)),
                ('bid_name', models.CharField(blank=True, max_length=50, null=True)),
                ('bid_date', models.CharField(blank=True, max_length=20, null=True)),
                ('cost', models.IntegerField(blank=True, default=0, null=True)),
                ('date_updated', models.DateField(auto_now=True, null=True)),
                ('date_created', models.DateField(auto_now_add=True, null=True)),
                ('car', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='contract', to='car.car')),
            ],
        ),
    ]
