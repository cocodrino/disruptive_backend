import express from 'express';
import {BinanceRealAccount, BinanceTestnetAccount} from "../../services/defaultInstances/Binance";

const router = express.Router();


router.post('/limit', async function(req, res) {
  const discount = +req.query.discount || 5
  const quote = +req.query.quote || "BTC"

  try{
    console.debug("getting top losers, this can take a time")
    const losers = await BinanceTestnetAccount.getTopLosers(quote,1)
    const {symbol,price} = losers[0]
    const discountPrice = +(price * (1 - (discount/100)).toFixed(8) ) //if price is 100 and discount is 30 discountPrice = 70

    let quantity = (0.0005/discountPrice) //this is to buy always buy nearly $10

    console.debug(`losing pair is ${symbol} ${discountPrice}`)
    console.debug(`placing order ${symbol},${quantity}, ${discountPrice}`)
    const order = await BinanceTestnetAccount.setLimitOrder(symbol,quantity,discountPrice)

    res.response(`order placed \n\n${order}`)

  }catch (e) {
    console.error(`error limit-order ${e}`)
    res.send(400,"error placing limit order, please try again")
  }

});


export default router;
