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

function startDB(){
    
     dataBase = indexedDB.open('Vibbay2', 1);
    
     
     dataBase.onupgradeneeded = function(e){
         
         var active = dataBase.result;
         
         var object1 = active.createObjectStore('producto',{keyPath:'id',autoIncrement:true});
         object1.createIndex('by_categoria','categoria',{unique:false});
         
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
     
     document.getElementById("btnRegistroProducto").addEventListener("click", addProducto, false);
     
    
        
}
function addProducto(){
    var active = dataBase.result;
    var data = active.transaction(["producto"],"readwrite");
    var object = data.objectStore("producto");
    
    var request = object.put({
        nombreproducto: document.querySelector("#nombreproducto").value,
        descripcion: document.querySelector("#descripcion").value,
        categoria: document.querySelector("#categoria").value,
        precio: document.querySelector("#precio").value,
        foto: document.querySelector("#caja").value,
        correopropietario: sessionStorage.getItem("email")
    });
    request.onerror = function(e){
        
        alert(request.error.name + '\n\n' + request.error.message);
        
        
                
    };
    data.oncomplete = function(e){
        alert("Objeto añadido correctamente");
        document.getElementById("formRegProducto").submit();
        

        
    };
    
    
    
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

function login(){

    alert("11");
    var active = dataBase.result;
    alert("12");
    var data = active.transaction(["usuario"], "readonly");
    alert("13");
    var object = data.objectStore("usuario");
    alert("14");
    var elements = [];
    
    object.openCursor().onsuccess = function (e){
        
        var result = e.target.result;
        
        if(result == null){
            return;
        }
        elements.push(result.value);
        result.continue();
    };
    //var emailEnviado =document.querySelector('#email').value;
    //var contrasenaEnviada = document. querySelector('#contrasena').value;
    var emailEnviado =document.getElementById("email").value;
    var contrasenaEnviada = document.getElementById("contrasena").value;
    
    
    for(var key in elements){
        
        if(elements[key].email == emailEnviado && elements[key].contrasena == contrasenaEnviada){
            
           alert("Usuario Correcto");
            
        }
        alert("Usuario Incorrecto");
    }
    
}

function revisar(){
    document.getElementById("btnRegistroProducto").addEventListener("click", revisionGeneral, false);
    var nombre = document.getElementById("nombreproducto");
    nombre.oninput = function() {
        if(!revisarNombre())
            nombre.className='error';
        else
            nombre.className='form-input';
    }
    var descripcion = document.getElementById("descripcion");
    descripcion.oninput = function() {
        if(!revisarDescripcion())
            descripcion.className='error';
        else
            descripcion.className='form-input';
    }
    var precio = document.getElementById("precio");
    precio.oninput = function() {
        if(revisarPrecio())
            precio.className='error';
        else
            precio.className='form-input';
    }
    
    
}
function revisionGeneral() {
    var correcto = true;
    var nombre = document.getElementById("nombreproducto");
    if(!revisarNombre()){
        correcto=false;
        nombre.className='error';
    }
    var descripcion = document.getElementById("descripcion");
    if(!revisarDescripcion()){
        correcto=false;
        descripcion.className='error';
    }
    var precio = document.getElementById("precio");
    if(!revisarPrecio()){
        correcto=false;
        precio.className='error';
    }
    
    if(correcto){
        document.getElementById("formRegProducto").submit();
        document.location.href = "http://localhost:8383/HTMLVibbay08/public_html/index.html";
        //alert("11");
    }
    }
    
function revisarNombre() {
    var nombre = document.getElementById("nombreproducto");
    var ex = /[A-Za-z]{3,}/;
    if(!ex.test(nombre.value) || nombre.value==="")
        return false;
    else
        return true;
}
function revisarDescripcion() {
    var descripcion = document.getElementById("descripcion");
    var ex = /^[\s\S]{10,20}$/;
    if(!ex.test(descripcion.value) || descripcion.value==="")
        return false;
    else
        return true;
}

function revisarPrecio() {
    var precio = document.getElementById("precio");
    var ex =/^[10-1000]+$/;
    if(!ex.test(precio.value) || precio.value==="")
        return false;
    else
        return true;
}

