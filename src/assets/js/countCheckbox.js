var contar = document.getElementById("desktop");
var input = document.getElementById("contador");

var checkboxes = document.getElementById("formMantos").checkbox;

checkboxes[0].onclick = function() {
	var cont = 0;
	for (var x=0; x < checkboxes.length; x++) {
		if (checkboxes[x].checked) {
			cont = cont + 1;
		}
	}
	$('#contador').text(cont + " / " +checkboxes.length);
}
checkboxes[1].onclick = function() {
	var cont = 0;
	for (var x=0; x < checkboxes.length; x++) {
		if (checkboxes[x].checked) {
			cont = cont + 1;
		}
	}
	$('#contador').text(cont + " / " +checkboxes.length);
}
checkboxes[2].onclick = function() {
	var cont = 0;
	for (var x=0; x < checkboxes.length; x++) {
		if (checkboxes[x].checked) {
			cont = cont + 1;
		}
	}
	$('#contador').text(cont + " / " +checkboxes.length);
}
checkboxes[3].onclick = function() {
	var cont = 0;
	for (var x=0; x < checkboxes.length; x++) {
		if (checkboxes[x].checked) {
			cont = cont + 1;
		}
	}
	$('#contador').text(cont + " / " +checkboxes.length);
}
checkboxes[4].onclick = function() {
	var cont = 0;
	for (var x=0; x < checkboxes.length; x++) {
		if (checkboxes[x].checked) {
			cont = cont + 1;
		}
	}
	$('#contador').text(cont + " / " +checkboxes.length);
}
checkboxes[5].onclick = function() {
	var cont = 0;
	for (var x=0; x < checkboxes.length; x++) {
		if (checkboxes[x].checked) {
			cont = cont + 1;
		}
	}
	$('#contador').text(cont + " / " +checkboxes.length);
}
checkboxes[6].onclick = function() {
	var cont = 0;
	for (var x=0; x < checkboxes.length; x++) {
		if (checkboxes[x].checked) {
			cont = cont + 1;
		}
	}
	$('#contador').text(cont + " / " +checkboxes.length);
}