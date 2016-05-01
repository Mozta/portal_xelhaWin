from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Registrado(models.Model):
	nombre = models.CharField(max_length=40)
	contrasena = models.CharField(max_length=40)
	timestamp = models.DateTimeField(auto_now_add=True, auto_now=False)
	actualizado = models.DateTimeField(auto_now_add=False, auto_now=True)

	def __unicode__(self): 
		return self.nombre