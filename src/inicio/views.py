from django.shortcuts import render

# Create your views here.
def muestra_login(request):
	return render(request, "login.html")
	
def inicio(request):
	return render(request, "login.html", {})

def manttos_prev(request):
	return render(request, "manttosPrev.html", {})

def muestra_pastel3(request):
	return render(request, "pastel3.html")

def muestra_pastel4(request):
	return render(request, "pastel4.html")