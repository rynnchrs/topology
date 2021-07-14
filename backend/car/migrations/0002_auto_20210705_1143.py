# Generated by Django 3.1 on 2021-07-05 03:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('car', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contract',
            name='bid_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='contract',
            name='end_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='contract',
            name='start_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='insurance',
            name='date_issued',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='insurance',
            name='end_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='insurance',
            name='start_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='tpl',
            name='date_issued',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='tpl',
            name='end_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='tpl',
            name='start_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
