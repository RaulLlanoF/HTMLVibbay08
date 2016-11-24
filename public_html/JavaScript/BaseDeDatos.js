/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var indexedDB = window.indexedDB || window.webkitIndexedDB;
var dataBase = null;

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
     
}