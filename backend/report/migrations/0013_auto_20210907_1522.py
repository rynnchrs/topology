# Generated by Django 3.1 on 2021-09-07 07:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('task', '0005_auto_20210826_1836'),
        ('report', '0012_auto_20210826_1836'),
    ]

    operations = [
        migrations.AddField(
            model_name='checklist',
            name='body_no_spare',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='checklist',
            name='body_no_batt',
            field=models.IntegerField(choices=[('yo', 'Yellow only'), ('ro', 'Red only'), ('bo', 'both')], default=0),
        ),
        migrations.AlterField(
            model_name='checklist',
            name='task',
            field=models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, related_name='checklist', to='task.task'),
        ),
        migrations.AlterField(
            model_name='repair',
            name='check_list',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='repair', to='report.checklist'),
        ),
        migrations.AlterField(
            model_name='repair',
            name='ir_no',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='repair', to='task.ir'),
        ),
    ]
