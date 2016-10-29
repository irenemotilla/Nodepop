"use strict";

var mongoose = require('mongoose');
var databaseFile = require('./database.json');
var anuncios = databaseFile.anuncios;
var usuarios = databaseFile.usuarios;

//conecto a la base de datos
require('../lib/mongoConnection');


//cargo los modelos
var Anuncio = require('../models/anuncio.model');
var Usuario = require('../models/usuario.model.js');


//borrar las tablas existentes
Anuncio.remove({}, function(err){
   if (err) {
       console.log(err);
   }
});

Usuario.remove({}, function(err){
    if (err) {
        console.log(err);
    }
});


//cargar tablas
anuncios.map(function(anuncio){
    var anuncioModel = new Anuncio(anuncio);
    anuncioModel.save();
});

usuarios.map(function(usuario){
    var usuarioModel = new Usuario(usuario);
    usuarioModel.save();
});


mongoose.connection.close();

console.log('Base de datos reseteada con éxito');