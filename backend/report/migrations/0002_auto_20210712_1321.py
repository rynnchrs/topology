# Generated by Django 3.1 on 2021-07-12 05:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('report', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cost',
            name='particulars',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
