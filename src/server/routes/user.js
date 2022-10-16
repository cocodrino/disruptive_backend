import express from 'express';
import Credential from "../models/Credential";
import BinanceClient from "../../services/ExchangeClient/BinanceClient";

const router = express.Router();


router.get('/info/:userId',async function(req, res, next) {
  try{
    const userId = req.params.userId

    const userData = await Credential.findById(userId)

    console.log(userData.apiKey)

    const binance = new BinanceClient({APIKEY : userData.apiKey, APISECRET: userData.apiSecret},false)
    const userInfo = await binance.getUserInfo()


    res.send(userInfo)
  }catch (e) {
    console.error(e)
    res.send(400,"can't find the user, please check the userId provided")
  }



});


export default router;
