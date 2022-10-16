import BinanceClient from '../ExchangeClient/BinanceClient'
import Dotenv from 'dotenv'
import {BinanceRealAccount, BinanceTestnetAccount} from "../defaultInstances/Binance";

Dotenv.config()

describe('for BinanceClient API (api/no testnet)', () => {
  let binance = BinanceRealAccount


  it('can get Pairs', async () => {
    const pairs = await binance.getPairs()
    expect(pairs).toBeDefined()
    expect(Array.isArray(pairs)).toBeTruthy()
    expect(pairs.length).toBeGreaterThan(0)
  },10000000);

  it('can get top losing Pairs',async()=>{
    const topLosers = await binance.getTopLosers("BTC",10)
    expect(topLosers).not.toBeUndefined()
    expect(Array.isArray(topLosers)).toBeTruthy()
    expect(topLosers.length).toEqual(10)
    expect(Number(topLosers[0].priceChangePercent)).toBeLessThanOrEqual(Number(topLosers[1].priceChangePercent))
  },1000000)

  it('can get user info',async()=>{
    const userInfo = await binance.getUserInfo()
    expect(userInfo).not.toBeUndefined()
  },1000000)


});

describe('for BinanceClient API (testnet)',() => {
  let binance = BinanceTestnetAccount

  it("can get pairs",async()=>{
    let pairs = await binance.getPairs()
    expect(pairs).toBeDefined()
  },10000000)


  it('can Place a new Order', async () => {

    const losers = await binance.getTopLosers("BTC",1)
    const {symbol,price} = losers[0]
    const discountPrice = +(price * (1 - (30/100)).toFixed(8) ) //if price is 100 and discount is 30 discountPrice = 70

    let quantity = (0.0005/discountPrice) //this is to buy always buy nearly $10

    console.debug(`losing pair is ${symbol} ${discountPrice}`)
    const order = await binance.setLimitOrder(symbol,quantity,discountPrice)

    expect(order).toBeDefined()
  },10000000);

  it("can place order",async()=>{
      const order = await binance.setLimitOrder("ETHBTC",0.007853701253058034,0.06366425)
      expect(order).toBeDefined()


  },10000000)


})
