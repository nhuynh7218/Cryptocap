
import { Link, Tooltip, useColorMode } from "@chakra-ui/react"
import { createChart, IChartApi, ISeriesApi } from "lightweight-charts"
import _ from "lodash"
import { useRouter } from "next/router"
import React, { useRef } from "react"
import { useEffect, useState } from "react"
import { formatNumber } from "."
import { TokenInfo } from "../../interfaces/get"
import { APIService } from "../../services/APIService"


function Chart(props: { tokenInfo: TokenInfo, prices: { value: number, time: string }[] }) {
    const chartRef = useRef<HTMLDivElement>(null);
    var chart: IChartApi;
    const { colorMode, toggleColorMode } = useColorMode();
    const max = _.maxBy(props.prices, (x) => { return x.value })
    const min = _.minBy(props.prices, (x) => { return x.value })
    const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null)
    const [fetchingTokenInfo, setFetchingTokenInfo] = useState(false)
    const route = useRouter()

    async function getTokenInfo() {
        setFetchingTokenInfo(true)
        const routeName = route.query["token-id"]

        if (routeName && typeof (routeName) === "string") {
            if (routeName.substring(0, 2) == "t-") {
                const symbol = routeName.slice(2)
                const tokens = await APIService.GetTokenBySymbol(symbol)
                setTokenInfo(tokens)
                setFetchingTokenInfo(false)

            }
        }

    }
    useEffect(() => {
        getTokenInfo()
        function handleResize() {

            // Set window width/height to state
            const newRect = window.innerWidth >= 705 ? 705 / 1.15 : window.innerWidth / 1.15;
            chart.applyOptions({ width: newRect });

        }
        if (chartRef.current) {
            chart = createChart(chartRef.current, {
                grid: {


                    horzLines:
                    {
                        visible: false
                    },
                    vertLines: {
                        visible: false
                    }
                },

                height: 300,
                width: 600,
                rightPriceScale: {
                    scaleMargins: {
                        top: 0.2,
                        bottom: 0.2,

                    },
                    borderVisible: true
                },
                timeScale: {

                    borderVisible: true
                },
                layout: {
                    backgroundColor: colorMode == 'light' ? '#daece7' : '#132520',
                    textColor: colorMode == 'light' ? "#434343" : '#FFFFFF'
                },

                crosshair: {
                    vertLine: {
                        labelVisible: true
                    }
                }
            });


            prepareChart(chart);

            // Add event listener
            window.addEventListener("resize", handleResize);
            handleResize()
            // new ResizeObserver(entries => {
            //     if (entries.length === 0 || entries[0].target !== chartRef.current) { return; }
            // const newRect = window.innerWidth >= 705 ? 705/ 1.15 : window.innerWidth / 1.15  ;
            // chart.applyOptions({  width: newRect });
            //   }).observe(chartRef.current);

        }
        return () => window.removeEventListener("resize", handleResize);
    }, [])
    var s: ISeriesApi<"Area">
    function prepareChart(chart: IChartApi) {
        if (!chartRef.current) { return }


        const oneYrHighMkCap = formatNumber(Number((Number(max?.value) * props.tokenInfo.circulating_supply).toFixed(2)))
        const value = Number(max?.value ?? 0)
        var series = chart.addAreaSeries({
            bottomColor: colorMode == 'light' ? "#FFFFFF" : '#4b6a84',
            lineColor: props.prices[props.prices.length - 1] < (max ?? 0) ? '#53ac94' : '#ba455e',
            lineWidth: 2
        });



        series.setData(props.prices);

        series.applyOptions({
            priceFormat: {
                type: 'price',
                precision: (min?.value ?? 0) > 0.1 ? 2 : 15,
                minMove: (min?.value ?? 0) > 0.1 ? 0.01 : 0.000000000000001,

            },
        });


        function businessDayToString(businessDay: any) {
            return businessDay.year + "-" + businessDay.month + "-" + businessDay.day;
        }

        var toolTipWidth = 80;


        setOneYearInfo({ highDate: businessDayToString(max?.time), marketcap: String(oneYrHighMkCap), highPrice: (value >= 1 ? value.toFixed(2) : value.toFixed(13)), highTitle: '1 Yr High', lowTitle: '1 Yr Low', lowPrice: (min?.value ?? 0) >= 1 ? min?.value.toFixed(2) : min?.value.toFixed(13), lowDate: businessDayToString(min?.time) })

        var tokenName = props.tokenInfo.name
        var tokenPrice = Number(props.tokenInfo.current_price)
        var today = businessDayToString(props.prices[props.prices.length - 1].time)
        const mkcapRaw = props.tokenInfo.current_price * props.tokenInfo.circulating_supply
        var todayMarketCap = String(formatNumber(Number(mkcapRaw.toFixed(2))))
        var formattedPriceToday = tokenPrice >= 1 ? tokenPrice.toFixed(2) : tokenPrice.toFixed(13)
        setHoverInfo({ title: tokenName, price: formattedPriceToday, marketcap: todayMarketCap, date: today })

        chart.subscribeCrosshairMove(function (param) {

            if (!chartRef.current) { return }
            if (
                param.point === undefined ||
                !param.time ||
                param.point.x < 0 ||
                param.point.x > chartRef.current.clientWidth ||
                param.point.y < 0 ||
                param.point.y > chartRef.current.clientHeight
            ) {
                setHoverInfo({ title: tokenName, price: formattedPriceToday, marketcap: todayMarketCap, date: today })

            } else {

                const dateStr = businessDayToString(param.time);
                var price = Number(param.seriesPrices.get(series));
                var formattedPrice = price >= 1 ? price.toFixed(2) : price.toFixed(15)
                var marketcap = props.tokenInfo.circulating_supply * price
                setHoverInfo({ title: tokenName, price: formattedPrice, marketcap: String(formatNumber(Number(marketcap.toFixed(2)))), date: dateStr })

                var coordinate = series.priceToCoordinate(price);
                var shiftedCoordinate = param.point.x - 50;
                if (coordinate === null) {
                    return;
                }
                shiftedCoordinate = Math.max(
                    0,
                    Math.min(chartRef.current.clientWidth - toolTipWidth, shiftedCoordinate)
                );


            }
        });
        // var binanceSocket = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@kline_15m");
        // binanceSocket.onmessage = function (event) {	
        //   var message = JSON.parse(event.data);

        //   var candlestick = message.k;

        //   console.log(candlestick)

        //   series.update({value: candlestick.o, time:})
        // }

    }

    const [hoverInfo, setHoverInfo] = useState<{ title: string, date: string, price: string, marketcap: string }>({
        date: '',
        marketcap: '',
        price: '',
        title: ''
    })

    const [oneYearInfo, setOneYearInfo] = useState<any>({
        date: '',
        marketcap: '',
        price: '',
        title: ''
    })

    const [loading, setLoading] = useState(false)

    const [mkValueClac, setMkValueCalc] = useState<number | null>(null)
    const [stack, setStack] = useState(0)
    const [buyNowprice, setBuyNowPrice] = useState(0)
    const [worth, setWorth] = useState(0)
    useEffect(() => {
        if (!tokenInfo ){return}
        setBuyNowPrice(tokenInfo.current_price * stack)
        if(!mkValueClac) { return }
        const mkChange = mkValueClac / tokenInfo.market_cap
        setWorth(mkChange * stack * tokenInfo.current_price)


    }, [stack, mkValueClac ])
    return (
        <div className="">

            {loading && <div className=" w-10 h-10 ">

                <h1>loading!</h1>


            </div>}
            <div className="" style={{ textAlign: 'center', width: '100%' }}>
                <h1 className=" font-extrabold pb-2 pt-2">Simple Chart</h1>

                <h1 className=" font-extrabold pb-2  pt-2">Showing Daily Price for past 365 Days</h1>
                <h1 className="font-bold">{tokenInfo?.name}</h1>
                {/* <div className="flex justify-center pb-4">  <a className="font-bold " href="">Click here for more advanced astrology</a></div> */}

                <div className="flex flex-row" style={{ display: 'inline-block' }} ref={chartRef}>
                </div>
            </div>
            <div className="text-base  text-center font-bold flex flex-row justify-center space-x-10 pb-5">
                <div className="flex flex-col">
                    <p>{"Hover Info"}</p>
                    <p>{hoverInfo.date}</p>
                    <p>{"$" + hoverInfo.price}</p>
                    {/* <p>{"$" +hoverInfo.marketcap}</p> */}

                </div>
                <div className="flex flex-col">
                    <p>{oneYearInfo.highTitle}</p>
                    <p>{oneYearInfo.highDate}</p>
                    <p>{"$" + oneYearInfo.highPrice}</p>

                </div>
                <div className="flex flex-col">
                    <p>{oneYearInfo.lowTitle}</p>
                    <p>{oneYearInfo.lowDate}</p>
                    <p>{"$" + oneYearInfo.lowPrice}</p>

                </div>

            </div>
            {tokenInfo && <div className=" cursor-default text-center font-bold text-lg">

                <Tooltip label="Some calculation is made using ratio instead of supply, if max supply has not been reported. This means at any point xthe token may mint more of itself, thus diluting your position and render our calculation inaccurate.">Calculator</Tooltip>
                <h1>{`Current Marketcap: ${formatNumber(tokenInfo.market_cap)}`}</h1>
                <div className="text-center space-y-2 ">
                    <div>
                        <h1>{`If MKCap = `} <h1 className="inline text-green-500 font-bold">{`$${mkValueClac ? formatNumber(mkValueClac) : '?'}`}</h1></h1>
                        <h1>{`You have `} <h1 className="inline text-green-500 font-bold">{`${formatNumber(stack)} `}</h1> <h1 className="inline">{`${tokenInfo?.symbol.toUpperCase()}`}</h1> </h1>

                    </div>
                    <div className=" space-x-4">
                    <input value={mkValueClac ?? ''} onChange={(x) => setMkValueCalc(Number(x.target.value) == 0 ? null : Number(x.target.value))} className="  focus:border-green-500 focus:border-2 focus:solid  font-black text-black p-2 rounded-md drop-shadow-md bg-gray-300 focus:bg-white" type="number" inputMode="numeric" pattern="[0-9]*" placeholder="Enter Market Cap" />
                    <input value={stack == 0 ? '' : stack} onChange={(x) => setStack(Number(x.target.value))} className="  focus:border-green-500 focus:border-2 focus:solid font-black text-black p-2 rounded-md drop-shadow-md bg-gray-300 focus:bg-white" type="number" inputMode="numeric" pattern="[0-9]*" placeholder={`Enter Amount ${tokenInfo?.symbol.toUpperCase()}`} />
                    </div>
                    <div>
                        <h1>{`Buy Now Price `} <h1 className="inline text-green-500 font-bold">{`$${formatNumber(Number((buyNowprice).toFixed(8)))}`}</h1></h1>
                        <h1>{`Worth`} <h1 className="inline text-green-500 font-bold">{` $${
                            
                            formatNumber(Number((worth).toFixed(2)))
                        }`}</h1></h1>

                    </div>
                    <div>
                        <h1>Buy Now At</h1>
                        <div className="flex flex-row justify-center space-x-6">
                            <Link href="/">CoinBase</Link>
                            <Link>Binance</Link>
                            <Link>Kraken</Link>
                        </div>
                     
                    </div>
                </div>
            </div>}
        </div>

    )
}

export default Chart