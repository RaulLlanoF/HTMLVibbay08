/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function saveData(){
    
    var mail = document.getElementById("email").value;
    var contrasena = document.getElementById("contrasena").value;
    
    if(localStorage.getItem(mail) == null)
        localStorage.setItem(mail, contrasena);
    else
        alert("El mail introducido ya esta en uso. Vuelva a intentarlo con otro mail");
}

function checkData(){
    
    var mail = document.getElementById("email").value;
    var contrasena = document.getElementById("contrasena").value;
    
    var outHTML = '';
    
    if(localStorage.getItem(mail) != null && localStorage.getItem(mail) == contrasena){
        alert("usuario correcto")
        outHTML +='hola';
        document.querySelector("#emailUsuario").innerHTML = outHTML
        $('#emailUsuario').append('hola');
    }
    else
        alert("usuario incorrecto");
}