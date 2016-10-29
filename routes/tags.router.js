"use strict";

var express = require('express');
var router = express.Router();

var Anuncio = require('../models/anuncio.model');
var customError = require('../lib/customError');

var validaToken = require('../lib/validaToken');


router.get('/', validaToken, function(req, res, next){
    Anuncio.distinct('tags', function(err, tags) {
        if(err) {
            next({error: customError.errors.DATABASE_ERROR});
            return;
        }
        res.json(tags);
    });
});


module.exports = router;