"use strict";

var mongoose = require('mongoose');

var anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

anuncioSchema.statics.listar = function(filter, start, limit, sort, cb){
    Anuncio.find(filter)
        .skip(start)
        .limit(limit)
        .sort(sort)
        .exec(cb);
};


var Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;