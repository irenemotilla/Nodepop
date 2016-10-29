"use strict";

var languages = {
    SPANISH: 'es',
    ENGLISH: 'en'
};

var errors = {
    DATABASE_ERROR: 'error1',
    NEW_USER_ERROR: 'error2',
    INVALID_TOKEN: 'error3',
    NO_TOKEN: 'error4'
};

var errorsDic = {
    error1: {
        en: 'There is a problem with the database',
        es: 'Hay un error con la base de datos'
    },
    error2: {
        en: 'Incorrect data for creating user',
        es: 'Datos incorrectos para crear un usuario'
    },
    error3: {
        en: 'The token is invalid',
        es: 'El token no es valido'
    },
    error4: {
        en: 'You must provide a token',
        es: 'Debes enviar un token'
    }
};


var getError = function(errorCode, lang) {

    var err = errorsDic[errorCode];

    if(!err){
        return 'error';
    }

    return err[lang];
};

module.exports = {
    getError: getError,
    languages: languages,
    errors: errors
};