"use strict";

var mongoose = require('mongoose');
var connection = mongoose.connection;

//Si hay un error lo saco por consola
connection.on('error', console.log.bind(console));

//Si la conexion tiene exito
connection.once('open', function() {
    console.log('conectado a mongodb');
});


mongoose.connect('mongodb://localhost:27017/nodepop');
