# Generated by Django 3.1 on 2021-09-22 06:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('car', '0006_auto_20210922_1304'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pdf',
            name='car',
            field=models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, related_name='pdf', to='car.car'),
        ),
    ]