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
        const testNetParam = {
            baseURL: 'https://testnet.binance.vision',

        }

        if (isTestnet)
            this.exchange = new Spot(apiKeyAndSecret.APIKEY, apiKeyAndSecret.APISECRET, testNetParam)
        else
            this.exchange = new Spot(apiKeyAndSecret.APIKEY, apiKeyAndSecret.APISECRET)


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

        return priceChanges.data
            .map((v) => {
                return {
                    symbol: v.symbol,
                    priceChangePercent: +v.priceChangePercent,
                    price: +v.lastPrice
                }
            })
            .sort((a, b) => (a.priceChangePercent > b.priceChangePercent) ? 1 : -1).slice(0, limit)
    }

    /**
     * get coins in user wallet
     * @returns {Promise<Array>}
     */
    async getUserInfo() {
        const coinsInWallet = await this.exchange.coinInfo()
        const data = coinsInWallet.data.filter(coin => +coin.free > 0 || +coin.locked > 0 || +coin.freeze > 0)

        return data

    }

    async setLimitOrder(pairName, quantity, price) {
        try{
            const fixedPrice = +price.toFixed(8)
            const fixedQuantity = +quantity.toFixed(5)

            const order = await this.exchange.newOrder(pairName, 'BUY', 'LIMIT', {quantity : fixedQuantity, price : fixedPrice, timeInForce: 'GTC'})
            console.debug(order)
            return order
        }catch (e) {
            console.log(`can't set order ${e}`)
        }


    }

    /**
     * connect to ws to bring real time data
     * @param pairs Array of symbols
     * @param callbacks
     * @param.open Function
     * @param.close Function
     * @param.message Function
     */
    receiveRealTimeData(pairs, callbacks) {
        this.exchange.combinedStreams(pairs, callbacks)
    }
}

export default BinanceClient
