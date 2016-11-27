/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
window.onload = startDB;
var indexedDB = window.indexedDB || window.webkitIndexedDB;
var dataBase = null;

function startDB() {

    dataBase = indexedDB.open('Vibbay2', 1);


    dataBase.onupgradeneeded = function (e) {

        var active = dataBase.result;

        var object1 = active.createObjectStore('producto', {keyPath: 'id', autoIncrement: true});
        object1.createIndex('by_categoria', 'categoria', {unique: false});

        var object = active.createObjectStore('usuario', {keyPath: 'id', autoIncrement: true});
        object.createIndex('by_name', 'nombre', {unique: false});
        object.createIndex('by_phone', 'telefono', {unique: true});
        object.createIndex('by_mail', 'email', {unique: true});



    };

    dataBase.onsuccess = function (e) {
        alert('Database loaded');
        loadAll();


    };

    dataBase.onerror = function (e) {
        alert('Error loading Database');

    };
    
    //document.getElementById("btnRegistroProducto").addEventListener("click", addProducto, false);



}
function loadAll() {
    var active = dataBase.result;
    var data = active.transaction(["producto"], "readonly");
    var object = data.objectStore("producto");

    var elements = [];

    object.openCursor().onsuccess = function (e) {
        var result = e.target.result;
        if (result === null) {
            return;
        }

        elements.push(result.value);
        result.continue();



    };
    data.oncomplete = function () {

        var outerHTML = '';

        for (var key in elements) {

            outerHTML += '\n\
                        <tr>\n\
                            <td>' + elements[key].nombreproducto + '</td>\n\
                            <td>' + elements[key].precio + '</td>\n\
                            <td>\n\
                                <button type="button" onclick="load(' + elements[key].id + ')">Details</button>\n\
                            </td>\n\
                        </tr>';

        }

        elements = [];
        document.querySelector("#elementsList").innerHTML = outerHTML;
        document.getElementById("btndeporte").addEventListener("click", loadDeporte, false);
        document.getElementById("btnelectronica").addEventListener("click", loadElectronica, false);
        document.getElementById("btnhogar").addEventListener("click", loadHogar, false);
        
    };

}

function load(id){
    var active = dataBase.result;
    var data = active.transaction(["producto"], "readonly");
    var object = data.objectStore("producto");
    
    
    var request = object.get(parseInt(id));
    
    request.onsuccess = function(){
        
        var result = request.result;
        
        if(result !== undefined){
          alert("Nombre Producto: " + result.nombreproducto + "\n\
                   Descripcion " + result.descripcion + "\n\
                   Categoria: " + result.categoria + "\n\
                   Correo Del Propietario: " + result.correopropietario + "\n\
                   Precio: " + result.precio);

        }
    }
    
    
}
 
    
    
    
    
    
    
function loadDeporte(){
    var active = dataBase.result;
        var data = active.transaction(["producto"], "readonly");
        var object = data.objectStore("producto");
        var index = object.index("by_categoria");

        var elements = [];

        index.openCursor().onsuccess = function (e) {

            var result = e.target.result;

            if (result === null) {
                return;
            }

            elements.push(result.value);
            result.continue();

        };

        data.oncomplete = function () {

            var outerHTML = '';

            for (var key in elements) {
                if(elements[key].categoria === "Deporte"){

                outerHTML += '\n\
                <tr>\n\
                    <td>' + elements[key].nombreproducto + '</td>\n\
                    <td>' + elements[key].precio + '</td>\n\
                    <td>' + elements[key].descripcion + '</td>\n\
                    <td>' + elements[key].categoria + '</td>\n\
                    <td>\n\
                    <button type="button" onclick="load(' + elements[key].id + ')">Details</button>\n\
                            </td>\n\
                </tr>';

            }
        }

            elements = [];
            document.querySelector("#elementsList").innerHTML = outerHTML;
        };
    
}

function loadElectronica(){
    var active = dataBase.result;
        var data = active.transaction(["producto"], "readonly");
        var object = data.objectStore("producto");
        var index = object.index("by_categoria");

        var elements = [];

        index.openCursor().onsuccess = function (e) {

            var result = e.target.result;

            if (result === null) {
                return;
            }

            elements.push(result.value);
            result.continue();

        };

        data.oncomplete = function () {

            var outerHTML = '';

            for (var key in elements) {
                if(elements[key].categoria === "Electronica"){

                outerHTML += '\n\
                <tr>\n\
                    <td>' + elements[key].nombreproducto + '</td>\n\
                    <td>' + elements[key].precio + '</td>\n\
                    <td>' + elements[key].descripcion + '</td>\n\
                    <td>' + elements[key].categoria + '</td>\n\
                    <td>\n\
                    <button type="button" onclick="load(' + elements[key].id + ')">Details</button>\n\
                            </td>\n\
                </tr>';

            }
        }

            elements = [];
            document.querySelector("#elementsList").innerHTML = outerHTML;
        };
    
}
function loadHogar(){
    var active = dataBase.result;
        var data = active.transaction(["producto"], "readonly");
        var object = data.objectStore("producto");
        var index = object.index("by_categoria");

        var elements = [];

        index.openCursor().onsuccess = function (e) {

            var result = e.target.result;

            if (result === null) {
                return;
            }

            elements.push(result.value);
            result.continue();

        };

        data.oncomplete = function () {

            var outerHTML = '';

            for (var key in elements) {
                if(elements[key].categoria === "Hogar"){

                outerHTML += '\n\
                <tr>\n\
                    <td>' + elements[key].nombreproducto + '</td>\n\
                    <td>' + elements[key].precio + '</td>\n\
                    <td>' + elements[key].descripcion + '</td>\n\
                    <td>' + elements[key].categoria + '</td>\n\
                    <td>\n\
                    <button type="button"  onclick="load(' + elements[key].id + ')">Details</button>\n\
                            </td>\n\
                </tr>';

            }
        }

            elements = [];
            document.querySelector("#elementsList").innerHTML = outerHTML;
        };
    
}



