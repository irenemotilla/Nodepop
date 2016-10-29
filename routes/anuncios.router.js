"use strict";

var express = require('express');
var router = express.Router();

var Anuncio = require('../models/anuncio.model');
var customError = require('../lib/customError');

var validaToken = require('../lib/validaToken');


router.get('/', validaToken, function (req, res, next) {
    var tag = req.query.tag;
    var venta = req.query.venta;
    var nombre = req.query.nombre;
    var precio = req.query.precio;

    var start = parseInt(req.query.start) || 0;
    var limit = parseInt(req.query.limit);
    var sort = req.query.sort;


    var filter = {};

    if(tag) {
        filter.tags = tag;
    }

    if(venta && (venta.toLowerCase() === 'true' || venta.toLowerCase() === 'false')) {
        filter.venta = (venta.toLowerCase() === 'true');
    }

    if(nombre) {
        filter.nombre = new RegExp('^' + nombre, "i");
    }

    if(precio) {
        filter.precio = calcularFiltroPrecio(precio);
    }


    Anuncio.listar(filter, limit, start, sort, function(err, anuncios){
        if(err){
            next({error: customError.errors.DATABASE_ERROR});
            return;
        }

        res.json(anuncios);
    });
});


function calcularFiltroPrecio(precio) {
    var guionPosition = precio.indexOf('-');
    if(guionPosition === -1) {
        return precio;
    }

    if(guionPosition === 0) {
        return {'$lte': precio.substring(1)};
    }

    if(guionPosition === precio.length-1) {
        return {'$gte': precio.substring(0, precio.length-1)};
    }

    var arr = precio.split('-');
    return {'$gte': arr[0], '$lte': arr[1]};
}

module.exports = router;