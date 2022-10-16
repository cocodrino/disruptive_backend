import Dotenv from 'dotenv'
import BinanceClient from "../ExchangeClient/BinanceClient";

Dotenv.config()


// no testnet endpoints using .env credentials, please use carefully
const BinanceRealAccount = new BinanceClient({APIKEY: process.env.APIKEY, APISECRET: process.env.APISECRET})

// testnet using the credentials provides in the .env
const BinanceTestnetAccount = new BinanceClient({APIKEY: process.env.TESTNETAPIKEY, APISECRET: process.env.TESTNETAPISECRET},true)

export {
    BinanceRealAccount,
    BinanceTestnetAccount
}