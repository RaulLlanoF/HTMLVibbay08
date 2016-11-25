/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


window.onload = empieza;
var indexedDB = window.indexedDB || window.webkitIndexedDB;
var dataBase = null;

function empieza(){
    startDB();
    revisar();
    
}
    
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
        document.location.href = "http://localhost:8383/HTMLVibbay08/public_html/index.html";
        //alert("11");
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
    document.getElementById("btnRegistro").addEventListener("click", revisionGeneral, false);
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


function startDB(){
    
     dataBase = indexedDB.open('Vibbay', 1);
    
     
     dataBase.onupgradeneeded = function(e){
         
         var active = dataBase.result;
         var object = active.createObjectStore('usuario',{keyPath: 'id',autoIncrement : true});
         object.createIndex('by_name','nombre',{unique: false});
         object.createIndex('by_phone','telefono', {unique : true});
         object.createIndex('by_mail','email', {unique : true});
         
     };
     
     dataBase.onsuccess = function(e){
         alert('Database loaded');
         
             
     };
     
     dataBase.onerror = function(e){
         alert('Error loading Database');
         
     };
     
     document.getElementById("btnRegistro").addEventListener("click", lanzar, false);
    
        
}
function add(){
    var active = dataBase.result;
    var data = active.transaction(["usuario"],"readwrite");
    var object = data.objectStore("usuario");
    
    var request = object.put({
        nombre: document.querySelector("#nombre").value,
        telefono: document.querySelector("#telefono").value,
        email: document.querySelector("#email").value,
        contrasena : document.querySelector("#contrasena").value,
        fechanacimiento : document.querySelector("#fechanacimiento").value
    });
    
    request.onerror = function(e){
        
        alert(request.error.name + '\n\n' + request.error.message);
        
        
                
    };
    data.oncomplete = function(e){
        alert("Objeto añadido correctamente");

        
    };
    document.getElementById("formRegUsuario").submit();
    document.location.href = "http://localhost:8383/HTMLVibbay08/public_html/index.html";
    alert("Objeto añadido correctamente");
    
     
}
function lanzar(){
    add();
    saveData();
}

function saveData(){
    
    var mail = document.getElementById("email").value;
    var contrasena = document.getElementById("contrasena").value;
    
    if(localStorage.getItem(mail) === null){
        localStorage.setItem(mail, contrasena);
    }
    else{
        alert("El mail introducido ya esta en uso. Vuelva a intentarlo con otro mail");
    }
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
    else{
        alert("usuario incorrecto");
    }
}
