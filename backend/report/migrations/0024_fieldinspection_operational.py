# Generated by Django 3.1 on 2021-11-23 05:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('report', '0023_auto_20211109_1401'),
    ]

    operations = [
        migrations.AddField(
            model_name='fieldinspection',
            name='operational',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
    ]
