# Proyecto Disruptive Backend

se generarán 3 endpoints (backend) y luego una interfaz para el  front end.

Sección Back end:
1. Obtener las 10 monedas que más pérdidas de valor tuvieron en las últimas  24 horas.
2. Obtener la información de la cuenta de un usuario de Binance. 3. Poner una orden tipo “Limit” con la moneda que más perdió en las últimas  24hrs.

## Cómo correr
Para correr en dev usar `pnpm/npm/yarn run watch:dev`

## Nota
De acuerdo a la [documentación de la API de Binance](https://github.com/binance/binance-connector-node#testnet) los endpoints /sapi/ no poseen Testnet por lo que
endpoint para ver la wallet del usuario no funcionaría con testnet [source](https://binance-docs.github.io/apidocs/spot/en/#funding-wallet-user_data)

## Variables de entorno
Crear un archivo .env o seteat las variables de entorno en su OS

```.env
APIKEY=...
APISECRET=...
TESTNETAPIKEY=...
TESTNETAPISECRET=...
DB=mongodb://localhost:27017/disruptive
STORE_ADMIN_TOKEN=true
WSPORT= 8081
```



Existe una variable de entorno STORE_ADMIN_TOKEN que si es true guarda los tokens existentes de las variables de entorno
dentro de la db, también se encarga de actualizarlo si cambia

La consola muestra el ID del usuario insertado en la DB apenas se ejecuta el servidor



### Nota 
1) getUserInfo creo que hay un mejor endpoint para traer esa data pero quedé un poco corto de tiempo para probar
2) se colocaron unos test unitarios en src/services/tests
3) archivo endpoints.rest incluye los endpoints para probar
