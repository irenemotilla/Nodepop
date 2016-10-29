"use strict";

var mongoose = require('mongoose');

var usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

var Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;