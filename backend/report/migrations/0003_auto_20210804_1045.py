# Generated by Django 3.1 on 2021-08-04 02:45

from django.db import migrations
import phone_field.models


class Migration(migrations.Migration):

    dependencies = [
        ('report', '0002_auto_20210712_1321'),
    ]

    operations = [
        migrations.AlterField(
            model_name='repair',
            name='contact_no',
            field=phone_field.models.PhoneField(blank=True, max_length=31, null=True),
        ),
    ]
