# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-03-19 05:43
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inicio', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='registrado',
            name='email',
        ),
        migrations.RemoveField(
            model_name='registrado',
            name='usuario',
        ),
        migrations.AlterField(
            model_name='registrado',
            name='nombre',
            field=models.CharField(max_length=40),
        ),
    ]
