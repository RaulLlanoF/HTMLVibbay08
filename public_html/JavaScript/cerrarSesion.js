/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
window.onload = lanzar;

function lanzar(){
    document.getElementById("link").addEventListener("click", cerrarSesion, false);
}
function cerrarSesion(){
    
    sessionStorage.removeItem("email");
    document.location.href = "http://localhost:8383/HTMLVibbay08/public_html/index.html";
    
    
}


