# Generated by Django 3.1 on 2021-08-10 07:30

from django.db import migrations
import django_resized.forms
import image.utils


class Migration(migrations.Migration):

    dependencies = [
        ('image', '0002_auto_20210721_1543'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='image',
            field=django_resized.forms.ResizedImageField(blank=True, crop=None, force_format=None, keep_meta=True, null=True, quality=0, size=[500, 300], upload_to=image.utils.upload_path),
        ),
    ]
