import axios from 'axios';
import {subDays } from 'date-fns';
import dynamic from 'next/dynamic';
// import Chart from '../../components/tokens/token-info';
import { BasicTokenInfo, TokenInfo } from '../../interfaces/get';
const Chart = dynamic(() => import('../../components/tokens/token-info'), {ssr: false})

function Token(props: {
    basicTokenInfo: BasicTokenInfo,
    prices: {
        value: number;
        time: string;
    }[],
    type: string,
    route : string,
}) {
 console.log(props)
  return (

        <Chart {...props}/>
        
  
  )
}

export async function getServerSideProps(context: any) {

    // type 0: stored
    // type 1: not stored
    const ctxParam : string = context.params['token-id']
    if (ctxParam.substring(0,2) == "t-") {
        try {
            const ticker = ctxParam.slice(2)
           
          const url = `https://api.binance.com/api/v3/klines?symbol=${ticker.toUpperCase()}USDT&interval=1d`
          const getTokenPrice = await axios.get<any>(url)
         
          var data :  { value: number, time: string }[] | undefined = undefined
            console.log(getTokenPrice.data)
        
          data = getTokenPrice.data.map((x : any) => { 
            
              return { 
          
                value: Number(x[4]), time: new Date(x[0]).toISOString().substring(0, 10)
              } 
          })
          console.log(data)
          return { props: {basicTokenInfo: null, prices: data} }
        } catch (error) {
            try {
                const ticker = ctxParam.slice(2)
              const params = {
                from: subDays(new Date(), 365).toISOString().substring(0, 10),
                to: (new Date()).toISOString().substring(0, 10),
                "page-number": 0,
                "page-size": 300,
                "prices-at-asc": true,
                key: "ckey_68bd9c19402749d196904449974"
              }
              const url = `https://api.covalenthq.com/v1/pricing/historical/USD/${ticker}/`
              const getTokenPrice = await axios.get<any>(url, {params: params})
              console.log(getTokenPrice.data.data.prices)
             
              var data :  { value: number, time: string }[] | undefined = undefined
          
            
              data = getTokenPrice.data.data.prices.map((x : any) => { 
                
                  return { 
              
                    value: x.price, time: x.date 
                  } 
              })
         
              return { props: {basicTokenInfo:null, prices: data} }
            } catch (error) {
                return { redirect : { destination : '/404'}}
           
            }
       
        }
         
    } else {
      try {
        const p = ctxParam.split("_")
        const coinGecko = p[0]
        const tokenAddress = p[1]
        const req = await axios.get<{prices: number[][], market_caps: number[][], total_volumes: number[][]}>(`https://api.coingecko.com/api/v3/coins/${coinGecko}/contract/${tokenAddress}/market_chart/?vs_currency=usd&days=365`)
        const req2 = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinGecko}/contract/${tokenAddress}`)
        const data = req.data
        const data2 = req2.data
        console.log(coinGecko, tokenAddress)
        const tokenInfo: BasicTokenInfo = {
          marketcap : data.market_caps[data.market_caps.length - 1][1],
          latestPrice : data.prices[data.market_caps.length - 1][1],
          circulating_supply: data2["market_data"]["circulating_supply"],
          name: data2["name"]
        }
        var prices :  { value: number, time: string }[] | undefined = undefined
        prices = data.prices.map((x : any) => { 
            
          return { 
      
            value: Number(x[1]), time: new Date(x[0]).toISOString().substring(0, 10)
          } 
      })
        console.log(prices[prices.length-1])

        return { props: {prices: prices, basicTokenInfo: tokenInfo} }
      } catch (error) {
        return { redirect : { destination : '/404'}}

      }
       
    }
  

}
export default Token
