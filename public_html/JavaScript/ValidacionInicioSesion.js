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
    
    var contrasena = document.getElementById("contrasena");
    if(!revisarContrasena()){
        correcto=false;
        contrasena.className='error';
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

function revisarContrasena() {
    var contrasena = document.getElementById("contrasena");
    var ex = /[A-Za-z0-9!?-]{3,12}/;
    if(!ex.test(contrasena.value) || contrasena===null)
        return false;
    else
        return true;
}

function revisar(){
    document.getElementById("btnInicio").addEventListener("click", revisionGeneral, false);
    var email = document.getElementById("email");
    email.oninput = function() {
        if(!revisarEmail())
            email.className='error';
        else
            email.className='form-input';
    }
    
    
    var contrasena = document.getElementById("contrasena");
    contrasena.oninput = function() {
        if(!revisarContrasena())
            contrasena.className='error';
        else
            contrasena.className='form-input';
    }
}