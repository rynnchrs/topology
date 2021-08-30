# Generated by Django 3.1 on 2021-08-24 06:11

from django.db import migrations
import multiselectfield.db.fields


class Migration(migrations.Migration):

    dependencies = [
        ('report', '0007_auto_20210818_1413'),
    ]

    operations = [
        migrations.AlterField(
            model_name='checklist',
            name='parts_included',
            field=multiselectfield.db.fields.MultiSelectField(blank=True, choices=[(0, 'Unit is in good condition'), (1, 'Cracked windshield'), (2, 'Rough idling. Cleaned and adjust throttle valve'), (3, 'For warranty'), (4, 'For body repair'), (5, 'Concern out of scope'), (6, 'Worn out brake pads'), (7, 'Worn out brake shoe'), (8, 'Low engine oil'), (9, 'Worn out drive belt'), (10, 'Others')], max_length=22, null=True),
        ),
    ]
