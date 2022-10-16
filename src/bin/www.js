#!/usr/bin/env node

import app from '../server/app';
import debugLib from 'debug';
import http from 'http';
import Dotenv from "dotenv";
import mongoose from "mongoose";
import storeAdminInDB from "./storeAdminInDB";
import WS from "../ws/wsServer";
import {BinanceRealAccount} from "../services/defaultInstances/Binance";

const debug = debugLib('myapp:server');
const port = normalizePort(process.env.PORT || '3000');

Dotenv.config()
app.set('port', port);

const startServer = () => {
    const server = http.createServer(app);
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
}

const startWebSocket = ()=>{
    WS(BinanceRealAccount)
}

mongoose
    .connect(process.env.DB, {useNewUrlParser: true})
    .then(() => {
        console.info("connected to Mongo DB")

        if (Boolean(process.env.STORE_ADMIN_TOKEN)) {
            const apiKey = process.env.APIKEY
            const apiSecret = process.env.APISECRET
            storeAdminInDB(apiKey, apiSecret)
                .then((id) => {
                    console.log(`user token admin saved ${id}`)
                    startServer()
                    startWebSocket()
                })
                .catch((e) => console.log(`error saving user in db ${e}`))
        } else {
            startServer()
            startWebSocket()
        }


    })


function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}


function onListening() {
    console.info('Listening on port' + port);
}
