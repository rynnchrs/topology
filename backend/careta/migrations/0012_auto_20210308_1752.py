# Generated by Django 3.1 on 2021-03-08 09:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('careta', '0011_auto_20210304_1812'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userinfo',
            name='birthday',
            field=models.DateField(null=True),
        ),
        migrations.AlterField(
            model_name='userinfo',
            name='gender',
            field=models.CharField(choices=[('M', 'Male'), ('F', 'Female')], max_length=1, null=True),
        ),
    ]
