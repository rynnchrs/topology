# Generated by Django 3.1 on 2021-09-27 11:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('task', '0006_auto_20210907_1522'),
    ]

    operations = [
        migrations.AddField(
            model_name='ir',
            name='operational',
            field=models.BooleanField(default=True),
        ),
    ]
