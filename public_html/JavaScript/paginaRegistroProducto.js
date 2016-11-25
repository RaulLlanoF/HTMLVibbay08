/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
window.onload = startDB;
var indexedDB = window.indexedDB || window.webkitIndexedDB;
var dataBase = null;

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