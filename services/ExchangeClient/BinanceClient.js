import {Spot} from '@binance/connector'

class BinanceClient {
  /**
   *
   * @param apiKeyAndSecret.APIKEY
   * @param apiKeyAndSecret.APISECRET
   * @param {object} [apiKeyAndSecret]
   * @param isTestnet boolean
   */
  constructor(apiKeyAndSecret, isTestnet = false) {
    this.exchange = new Spot(apiKeyAndSecret.APIKEY, apiKeyAndSecret.APISECRET,
      {
        baseURL: isTestnet ? 'https://testnet.binance.vision' : undefined,
        wsURL: isTestnet ? 'wss://testnet.binance.vision' : undefined
      })


  }

  async getPairs(quote = "BTC") {
    const data = await this.exchange.exchangeInfo()
    return data.data.symbols.filter(pairInfo => pairInfo?.quoteAsset === quote && pairInfo.status === "TRADING")
  }

  /**
   *
   * @param quote "BTC" "USDT" or any other
   * @param limit number for limit response
   * @returns {Promise<Array>}
   */
  async getTopLosers(quote = "BTC", limit = 10) {
    const pairData = await this.getPairs()
    const pairSymbols = pairData.map(pair => pair.symbol)
    const priceChanges = await this.exchange.ticker24hr("", pairSymbols)
    console.log(priceChanges)
    return priceChanges.data.sort((a, b) => +b.priceChangePercent > +a.priceChangePercent).slice(0, limit)
  }

  /**
   * get coins in user wallet
   * @returns {Promise<Array>}
   */
  async getUserInfo() {
    const coinsInWallet = await this.exchange.coinInfo()
    const data = coinsInWallet.data.filter(coin => +coin.free > 0 || +coin.locked > 0 || +coin.freeze > 0)
    console.log(data)
    return data

  }

  async setLimitOrder(pairName, price) {
    const url = 'https://testnet.binance.vision/api/v3/order/test '

    const order = await this.exchange.newOrderTest(pair, 'BUY', 'LIMIT', {quantity: 1, price})
  }

  /**
   * connect to ws to bring real time data
   * @param pairs Array of symbols
   * @param callbacks
   * @param.open Function
   * @param.close Function
   * @param.message Function
   */
  receiveRealTimeData(pairs,callbacks) {
    this.exchange.combinedStreams(pairs,callbacks)
  }
}

export default BinanceClient
