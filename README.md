# NODEPOP SERVER

## Comandos

* start: Inicia el servidor
* installDB: Inicializa la base de datos con anuncios y usuarios de ejemplo.
* jshint: Comprueba la calidad de codigo.

Para ejecutar estos comandos hay que escribir en el terminal: npm run *nombre del comando*

`npm run installDB`


## Endpoints

|      URL     | VERB |  AUTH |                            PARAMS                            |
|:------------:|:----:|:-----:|:------------------------------------------------------------:|
|    /users    | POST |   NO  |   body { nombre: String, correo: String, password: String}   |
| /users/login |  GET | BASIC |                      correo and password                     |
|     /tags    |  GET |  JWT  |                           --------                           |
|   /anuncios  |  GET |  JWT  | queryString {tag, venta, nombre, precio, start, limit, sort} |


### QueryString de anuncios

Precio:

* 10-50 buscará anuncios con precio incluido entre estos valores
* 10- buscará los que tengan precio mayor que 10
* -50 buscará los que tengan precio menor de 50
* 50 buscará los que tengan precio igual a 50

Sort:

Los anuncios se devoveran siempre ordenados en orden ascendente


