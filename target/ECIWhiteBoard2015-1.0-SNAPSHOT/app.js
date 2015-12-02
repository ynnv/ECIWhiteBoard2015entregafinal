/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global websocket */

var canvas = document.getElementById("miCanvas");
var ctx = canvas.getContext("2d");
var estaPintando = true;
var limpiar = document.getElementById("limpiar");

limpiar.addEventListener("click",function(evt){
        borrar(evt);
},false);

canvas.addEventListener("mousedown", function (evt) {
    estaPintando = true;
    comienzaAPintar(evt);
}, false);

canvas.addEventListener("mouseup", finPintar, false);
canvas.addEventListener("mouseout", finPintar, false);

function getCoordenadas(clientX, clientY) {
    var rect = canvas.getBoundingClientRect();

    return{
        x: clientX - rect.left,
        y: clientY - rect.top
    };
}

function comienzaAPintar(evt) {
    if (evt == null) estaPintando = false;
    
    /*establece una ruta o la reestablece */
    ctx.beginPath();

    if (estaPintando) {
        canvas.addEventListener("mousemove", pintarFigura, false);
        enviarDatos(evt, "comienzaAPintar");
    }
}

function pintarFigura(evt, newCoords) {
    var coords;
    if (estaPintando)coords = getCoordenadas(evt.clientX, evt.clientY);
    else coords = getCoordenadas(newCoords.x, newCoords.y);

    ctx.lineTo(coords.x, coords.y);
    ctx.lineCap = "round";
    ctx.stroke();

    if (estaPintando) {
        enviarDatos(evt, "pintarFigura");
    }

}

function enviarDatos(evt, nombreDelMetodo) {
    websocket.send(JSON.stringify(
            {
                coords: {
                    x: evt.clientX,
                    y: evt.clientY
                },
                methodName: nombreDelMetodo
            }
    ));
}

function finPintar(evt) {
    if (estaPintando){
        canvas.removeEventListener("mousemove", pintarFigura);
        //ctx.closePath();
    }
}

function borrar(evt) {
    canvas.width=canvas.width;
    enviarDatos(evt,"borrar");
}
