# NODEPOP SERVER

## Practica Devops

* Para acceder a la web de Start Bootstrap la IP es: 52.52.173.204
* Para acceder a Nodepop: http://ec2-52-52-173-204.us-west-1.compute.amazonaws.com/

Los archivos estaticos estan en la carpeta public, ejemplo:
http://ec2-52-52-173-204.us-west-1.compute.amazonaws.com/images/anuncios/camara.jpg


## Comandos

* start: Inicia el servidor
* installDB: Inicializa la base de datos con anuncios y usuarios de ejemplo.
* jshint: Comprueba la calidad de codigo.

Para ejecutar estos comandos hay que escribir en el terminal: npm run *nombre del comando*

`npm run installDB`


## Endpoints

|      URL     | VERB |  AUTH |                            PARAMS                            |
|:------------:|:----:|:-----:|:------------------------------------------------------------:|
|    apiv1/users    | POST |   NO  |   body { nombre: String, correo: String, password: String}   |
| apiv1/users/login |  GET | BASIC |                      correo and password                     |
|     apiv1/tags    |  GET |  JWT  |                           --------                           |
|   apiv1/anuncios  |  GET |  JWT  | queryString {tag, venta, nombre, precio, start, limit, sort} |

### Envio de token

El token de seguridad se tiene que enviar en el header 'x-access-token'

### QueryString de anuncios

Precio:

* 10-50 buscará anuncios con precio incluido entre estos valores
* 10- buscará los que tengan precio mayor que 10
* -50 buscará los que tengan precio menor de 50
* 50 buscará los que tengan precio igual a 50

Sort:

Los anuncios se devoveran siempre ordenados en orden ascendente


