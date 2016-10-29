"use strict";

var express = require('express');
var router = express.Router();
var Usuario = require('../models/usuario.model');
var customError = require('../lib/customError');

var config = require('../config.json');

var basicAuth  = require('basic-auth');
var sha256 = require('sha256');
var jwt = require('jsonwebtoken');


router.post('/', function(req, res, next){
  req.body.password = req.body.password && sha256(req.body.password);

  req.body.correo = req.body.correo && req.body.correo.toLowerCase();


  var nuevoUsuario = new Usuario(req.body);

  nuevoUsuario.save(function (err, usuarioGuardado) {
    if (err) {
      next({
        error: customError.errors.NEW_USER_ERROR
      });
      return;
    }
    res.json(usuarioGuardado);
  });
});

router.get('/login', function (req, res) {
  var user = basicAuth(req);

  if (!user || !user.name || !user.pass){
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.send(401);
    return;
  }

  Usuario.find({correo: user.name.toLowerCase(), password: sha256(user.pass)}, function (err, user) {
    if (err) {
     return;
    }

    if (!user.length) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      res.send(401);
      return;
    }

    var token = jwt.sign({id: user.id}, config.secretKey, {expiresIn: config.tokenTTL});

    res.send(token);
  });
});





module.exports = router;
