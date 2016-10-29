"use strict";

var jwt = require('jsonwebtoken');
var config = require('../config.json');
var customError = require('./customError');

function validaToken(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) {
        next({
            error: customError.errors.NO_TOKEN,
            code: 403
        });
        return;
    }
    jwt.verify(token, config.secretKey, function(err, decoded){
        if(err) {
            next({
                error: customError.errors.INVALID_TOKEN,
                code: 403
            });
            return;
        }

        req.session = decoded;
        next();
    });
}


module.exports = validaToken;
