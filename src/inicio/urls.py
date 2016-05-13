from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'^login/$', views.muestra_login),
	url(r'^manttosPrev/$', views.manttos_prev),
	url(r'^pastel3/$', views.muestra_pastel3),
	url(r'^pastel4/$', views.muestra_pastel4),
]