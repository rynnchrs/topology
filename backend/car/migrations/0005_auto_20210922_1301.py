# Generated by Django 3.1 on 2021-09-22 05:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('car', '0004_pdfupload'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='PDFupload',
            new_name='PDF',
        ),
    ]
