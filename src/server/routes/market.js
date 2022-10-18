import express from 'express';
import {BinanceTestnetAccount} from "../../services/defaultInstances/Binance";

var router = express.Router();


router.get('/top-losers', async function(req, res) {
  const quote = req.query.quote || "BTC"
  const count = +(req.query.count || "10")

  console.info("retrieving top losers, this can take a time")
  const  losers = await BinanceTestnetAccount.getTopLosers(quote,count)
  res.json(losers)
});


export default router;
