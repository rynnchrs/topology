# Generated by Django 3.1 on 2021-11-11 06:03

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Email',
            fields=[
                ('email_id', models.AutoField(primary_key=True, serialize=False)),
                ('email_add', models.EmailField(max_length=254, unique=True)),
                ('date_updated', models.DateField(auto_now=True)),
                ('date_created', models.DateField(auto_now_add=True)),
            ],
        ),
    ]
