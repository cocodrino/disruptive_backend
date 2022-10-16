import BinanceClient from '../ExchangeClient/BinanceClient'
import Dotenv from 'dotenv'

Dotenv.config()

describe('for BinanceClient API (api/no testnet)', () => {
  let binance

  beforeEach(() => {
    binance = new BinanceClient({APIKEY: process.env.APIKEY, APISECRET: process.env.APISECRET})
  });

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
  let binance

  beforeEach(() => {
    Dotenv.config()
    binance = new BinanceClient({APIKEY: process.env.TESTNETAPIKEY, APISECRET: process.env.TESTNETAPISECRET},true)
  });

  afterEach(() => {

  });

  it('can Place a new Order', async () => {
    const pairs = await binance.getPairs()
    expect(pairs).toBeDefined()
    expect(Array.isArray(pairs)).toBeTruthy()
    expect(pairs.length).toBeGreaterThan(0)
  },10000000);


})
