# Generated by Django 3.1 on 2021-11-23 02:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('car', '0010_auto_20211015_1542'),
        ('gps', '0003_auto_20211118_1156'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gps',
            name='body_no',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='gps', to='car.car'),
        ),
    ]
