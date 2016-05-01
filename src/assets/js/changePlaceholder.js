var op1 = document.getElementById("1");
var op2 = document.getElementById("2");
var input = document.getElementById("MyTipo");

op1.onclick = function() {
    input.placeholder = "#Activo";
}
op2.onclick = function() {
    input.placeholder = "#Serie";
}