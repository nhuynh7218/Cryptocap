import axios from 'axios';
import {subDays } from 'date-fns';
import { DiscussionEmbed } from 'disqus-react';
import dynamic from 'next/dynamic';
// import Chart from '../../components/tokens/token-info';
import { TokenInfo } from '../../interfaces/get';
const Chart = dynamic(() => import('../../components/tokens/token-info'), {ssr: false})
import { useRouter } from 'next/router'

function Token(props: {
    tokenInfo: TokenInfo,
    prices: {
        value: number;
        time: string;
    }[],
    type: string,
    route : string,
}) {
 console.log(props)
 const router = useRouter()
 const ID = router.asPath
  return (

        <><Chart {...props} /><DiscussionEmbed
      shortname='Cryptocap'
      config={{
        url: 'https://cryptocap.digital' + router.asPath,
        identifier: 'cryptocap' + router.asPath,
        title: 'cryptocap' + router.asPath,
        language: 'eng'
      }} />
      </>
        
  
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
          return { props: {tokenInfo: {}, prices: data} }
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
         
              return { props: {tokenInfo: {}, prices: data} }
            } catch (error) {
                return { redirect : { destination : '/404'}}
           
            }
       
        }
         
    } else {
        const chainID = null
        const contractAddress = null;
        const url = `https://api.dev.dex.guru/v1/chain/56/tokens/0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c/market/history?begin_timestamp=1619246013`
        const params = {
            "api-key" : "XKFvppsvXO263n_ANhIeyaLkNmeOhnvpGCpNKHjhaqs"
        }
        const req = await axios.get(url, {params: params})
        const data = req.data.data
        const mapped = data.map((x : any) => {
            return {
                value: x.price_usd,
                time: new Date(x.timestamp * 1000).toISOString().substring(0, 10)
            }
        })
        return { props: {tokenInfo: {}, prices: mapped} }
    }
  
      
      
    
  return {
    props: {}, // will be passed to the page component as props
  }
}
export default Token
