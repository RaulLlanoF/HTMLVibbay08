/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
window.onload = revisar;
    
function revisionGeneral() {
    var correcto = true;
    var email = document.getElementById("email");
    if(!revisarEmail()){
        correcto=false;
        email.className='error';
    }
    var nombre = document.getElementById("nombre");
    if(!revisarNombre()){
        correcto=false;
        nombre.className='error';
    }
    var contrasena = document.getElementById("contrasena");
    if(!revisarContrasena()){
        correcto=false;
        contrasena.className='error';
    }
    var telefono = document.getElementById("telefono");
    if (!revisarTelefono()){
        correcto=false;
        telefono.className='error';
    }
    var fechanacimiento = document.getElementById("fechanacimiento");
    if (!revisarFecha()){
        correcto = false;
        fechanacimiento.className='error';
    }
    
    if(correcto){
        document.getElementById("formRegUsuario").submit();
        alert("11");
    }
    }
function revisarEmail () {
    var email = document.getElementById("email");
    var ex = /\S+@\S+\.\S+/;
    if(!ex.test(email.value) || email.value==="")
        return false;
    else
        return true;
}

function revisarNombre() {
    var nombre = document.getElementById("nombre");
    var ex = /[A-Za-z]{3,}/;
    if(!ex.test(nombre.value) || nombre.value==="")
        return false;
    else
        return true;
}

function revisarContrasena() {
    var contrasena = document.getElementById("contrasena");
    var ex = /[A-Za-z0-9!?-]{3,12}/;
    if(!ex.test(contrasena.value) || contrasena===null)
        return false;
    else
        return true;
}
function revisarTelefono(){
    var telefono = document.getElementById("telefono");
    var ex = /^[9|6|7][0-9]{8}$/;
    if(!ex.test(telefono.value)|| telefono==null)
        return false;
    else
        return true;
}
function revisarFecha(){
    var fechanacimiento = document.getElementById("fechanacimiento");
    var hoy = new Date();
    var fechaIntroducida;
    
    if(fechanacimiento != "")
        fechaIntroducida = new Date(fechanacimiento.value);
    
    if(fechaIntroducida>hoy || fechanacimiento.value == "" || fechaIntroducida.getUTCDate() == hoy.getUTCDate())
        return false;
    else
        return true;
}
function revisar(){
    document.getElementById("btnRegistroProducto").addEventListener("click", revisionGeneral, false);
    var email = document.getElementById("email");
    email.oninput = function() {
        if(!revisarEmail())
            email.className='error';
        else
            email.className='form-input';
    }
    
    var nombre = document.getElementById("nombre");
    nombre.oninput = function() {
        if(!revisarNombre())
            nombre.className='error';
        else
            nombre.className='form-input';
    }
    
    
    var contrasena = document.getElementById("contrasena");
    contrasena.oninput = function() {
        if(!revisarContrasena())
            contrasena.className='error';
        else
            contrasena.className='form-input';
    }
    var telefono = document.getElementById("telefono");
    telefono.oninput = function(){
        if(!revisarTelefono())
            telefono.className='error';
        else
            telefono.className='form-input';
        
    }
    var fechanacimiento = document.getElementById("fechanacimiento");
    fechanacimiento.oninput = function(){
        if(!revisarFecha())
            fechanacimiento.className='error';
        else
            fechanacimiento.className='form-input';
    }
}