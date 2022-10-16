import WebSocket, { WebSocketServer } from 'ws';
import Dotenv from "dotenv";
Dotenv.config()
const WS =(BinanceClient) => {
    const wsServer = new WebSocketServer({
        port: process.env.WSPORT || 8081,
    })

    console.log("INITIALIZING WEBSOCKET")

    const binanceResponseCallback = {
        open: () => console.log('open binance connection'),
        close: () => console.log('closed binance connection'),
        message: response => {
            //console.log(response)
            const resp = JSON.parse(response)

            const info = {pair:resp?.data?.s,price : resp?.data?.p}
            //const info = response

            wsServer.clients.forEach((client=>{
                if(client.readyState !== WebSocket.OPEN) return
                client.send(JSON.stringify(info))
            }))

        }
    }

    BinanceClient.receiveRealTimeData(['btcusdt@aggTrade','ethusdt@aggTrade'],binanceResponseCallback)

    wsServer.on("connection", () => {
        console.log("new client connected");
    });

    wsServer.on("disconnection",()=>{
        console.log("client disconnected")
    })



    return wsServer;
};

export default WS