# Generated by Django 3.1 on 2021-08-26 10:36

from django.db import migrations
import multiselectfield.db.fields


class Migration(migrations.Migration):

    dependencies = [
        ('task', '0004_auto_20210818_1642'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ir',
            name='repair_type',
            field=multiselectfield.db.fields.MultiSelectField(choices=[('me', 'Mehcanical'), ('el', 'Electrical'), ('ba', 'Battery'), ('ti', 'Tires'), ('pm', 'PMS'), ('ac', 'Accident'), ('ot', 'Others')], default='ot', max_length=20),
        ),
    ]
