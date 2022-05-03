import { Spinner, Tooltip, useColorMode } from "@chakra-ui/react";
import _ from "lodash";
import Link from "next/link";
import React, { useState } from "react";
import { TokenInfo } from "../../interfaces/get";
import { APIService } from "../../services/APIService";
export function formatNumber(n: number) {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
};
function Index(props: { tokens: TokenInfo[], total: number }) {
    const { colorMode } = useColorMode();
    const [fullTokenList, setFullTokenList] = useState<{ page: number, tokenInfoList: TokenInfo[] }[]>([{ page: 1, tokenInfoList: props.tokens }])
    const [currentPage, setCurrentPage] = useState(1)
    const [currentTokenList, setCurrentTokenList] = useState<{ page: number, tokenInfoList: TokenInfo[] }>(fullTokenList[fullTokenList.length - 1])
    const limit = 10
    const [fetchingPage, setFetchingPage] = useState(false)

    const [maxPage, setMaxPage] = useState(0)
    

    async function goNextPage() {
        setFetchingPage(true)


        const nextTokenListExist = fullTokenList.find((x) => x.page == currentPage + 1)
        if (nextTokenListExist) {
            console.log("cached token found, using cache")
            setCurrentTokenList(nextTokenListExist)
            setCurrentPage(currentPage + 1)
            setFetchingPage(false)

            return
        }

        
        const nextPage = await APIService.GetTokens(currentPage + 1, limit)
        if (!nextPage.tokens || nextPage.tokens.length == 0) {
            console.log("max reached")
            setMaxPage(fullTokenList[fullTokenList.length - 1].page)
            // setMaxPage(true)
            setFetchingPage(false)

            return

        }
        const fullTokenCopy = _.cloneDeep(fullTokenList)
        const newFullToken = { page: fullTokenCopy[fullTokenCopy.length - 1].page + 1, tokenInfoList: nextPage.tokens }
        const concat = _.concat(fullTokenCopy, newFullToken)
        console.log(newFullToken)
        setCurrentTokenList(newFullToken)
        setFullTokenList(concat)
        setCurrentPage(currentPage + 1)
        // setCurrentSortInfo({
        //     headerName: currentSortInfo.headerName,
        //     skip: newSkip,
        //     sortType: currentSortInfo.sortType
        // })
        setFetchingPage(false)

    }

    async function goPreviousPage() {
        setFetchingPage(true)


        if (currentPage <= 1) {
            console.log("min reached")
            return
        }
        const previousTokenList = fullTokenList.find((x) => x.page == currentPage - 1)
        if (!previousTokenList) { return }
        setCurrentTokenList(previousTokenList)
        setCurrentPage(currentPage - 1)
        setFetchingPage(false)


    }
    function TableRow(props: { token: TokenInfo }) {
        const { colorMode, toggleColorMode } = useColorMode();

        return (
            
            <tr className={`${colorMode == 'light' ? 'bg-white hover:bg-gray-200 text-black' : 'bg-gray-700 hover:bg-gray-600 text-gray-100 font-bold  transition-all duration-200'}`}>
                <td className="px-5 py-5 border-b text-sm ">
                    <Link href={`/tokens/t-${props.token.symbol}`}>
                        <a className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10">
                                <img className="w-full h-full rounded-full"
                                    src={props.token.image}
                                    alt="" />
                            </div>
                            <div className="ml-3">

                                <p className=" whitespace-no-wrap">
                                    {props.token.name}
                                </p>

                            </div>

                        </a>
                    </Link>
                </td>
                <td className="px-5 py-5 border-b text-sm">
                    <Link href={`/tokens/t-${props.token.symbol}`}>
                        <a className="whitespace-no-wrap"> {"$" + props.token.current_price.toLocaleString()}</a>
                    </Link>
                </td>
                <td className="px-5 py-5 border-b text-sm">
                    <Link href={`/tokens/t-${props.token.symbol}`}>
                        <a className={`text-gray-100 ${props.token.price_change_percentage_24h < 0 ? 'text-red-400' : 'text-green-400'} whitespace-no-wrap`}>
                            {props.token.price_change_percentage_24h.toFixed(2) + "%"}
                        </a>
                    </Link>
                </td>
                <td className="px-5 py-5 border-b text-sm">
                    <Link href={`/tokens/t-${props.token.symbol}`}>

                        <a className=" whitespace-no-wrap">
                            {"$" + formatNumber(props.token.market_cap)}
                        </a>
                    </Link>
                </td>
                <td className="px-5 py-5 border-b text-sm">
                    <Link href={`/tokens/t-${props.token.symbol}`}>
                        <a className={`text-gray-100 ${props.token.market_cap_change_percentage_24h < 0 ? 'text-red-400' : 'text-green-400'} whitespace-no-wrap`}>
                            {props.token.market_cap_change_percentage_24h.toFixed(2) + "%"}
                        </a>
                    </Link>
                </td>
                <td className="px-5 py-5 border-b text-sm">
                    <Link href={`/tokens/t-${props.token.symbol}`}>

                        <a className=" whitespace-no-wrap">
                            {props.token.max_supply ? formatNumber(props.token.max_supply) : "Not Reported"}
                        </a>
                    </Link>
                </td>
                <td className="px-5 py-5 border-b text-sm">
                    <Link href={`/tokens/t-${props.token.symbol}`}>

                        <a className=" whitespace-no-wrap">
                            {"$" + (props.token.ath.toLocaleString())} <h1 className={`inline ${props.token.ath_change_percentage < 0 ? 'text-red-400' : 'text-green-400'}`}>{` (${props.token.ath_change_percentage.toFixed(2)}%)`}</h1>
                        </a>
                    </Link>
                </td>
                <td className="px-5 py-5 border-b text-sm">
                    <Link href={`/tokens/t-${props.token.symbol}`}>

                        <a className=" whitespace-no-wrap">
                            {"$" + (props.token.atl.toLocaleString())} <h1 className={`inline ${props.token.atl_change_percentage < 0 ? 'text-red-400' : 'text-green-400'}`}>{` (${props.token.atl_change_percentage.toFixed(2)}%)`}</h1>
                        </a>
                    </Link>
                </td>
            </tr>

        )
    }
    return (
        <div className={`${colorMode == 'light' ? 'bg-white' : 'bg-gray-900'} p-8 rounded-md w-full`}>
            <div className=" flex items-center justify-between pb-6">
             
                <div className="flex items-center justify-between">
                    {/* <div className={`flex ${colorMode == 'light' ? 'bg-gray-50' : 'bg-gray-800'} items-center p-2 rounded-md`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clip-rule="evenodd" />
                        </svg>
                        <input className={`${colorMode == 'light' ? 'bg-gray-50' : 'bg-gray-800'} outline-none ml-1 block `} type="text" name="" id="" placeholder="search..." />
                    </div> */}
                    {/* <div className="lg:ml-40 ml-10 space-x-8">
                        <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">New Report</button>
                        <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Create</button>
                    </div> */}
                </div>
            </div>
            <div >
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto ">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden ">
                        <table className="min-w-full leading-normal ">
                            <thead className={`${colorMode == 'light' ? 'border-gray-200 bg-gray-100 text-gray-600' : 'border-gray-500 shadow-xl  bg-gray-700 text-gray-100'} text-left text-xs font-semibold`}>
                                <tr>
                                    <th
                                        className="px-5 py-3  border-b-2  uppercase tracking-wider">
                                        Name

                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2  uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 cursor-default  uppercase tracking-wider">

                                        <Tooltip label='24H Price change' fontSize='md'>
                                            24H
                                        </Tooltip>
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2  uppercase tracking-wider">
                                        Marketcap
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 cursor-default uppercase tracking-wider">
                                        <Tooltip label='24H Marketcap change' fontSize='md'>
                                            24H
                                        </Tooltip>
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2  uppercase tracking-wider">
                                        Supply
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 cursor-default uppercase tracking-wider">
                                        <Tooltip label='All Time High since listing on an CEX' fontSize='md'>
                                            *ATH
                                        </Tooltip>
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 cursor-default uppercase tracking-wider">
                                        <Tooltip aria-required label='All Time Low since listing on an CEX' fontSize='md'>
                                            *ATL
                                        </Tooltip>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentTokenList.tokenInfoList.map((token, index) => {
                                    return <TableRow key={index} token={token} />
                                })}
                            </tbody>
                        </table>
                        <div
                            className={`${colorMode == 'light' ? 'bg-white' : 'bg-gray-700'} px-5 py-5  border-t flex flex-col xs:flex-row items-center xs:justify-between`}>
                            <span className="text-xs xs:text-sm ">
                                {`Showing 10 out of ${props.total} tokens`}
                            </span>
                            <div className="inline-flex mt-2 xs:mt-0">
                                <button
                                     onClick={async () => goPreviousPage()}
                                    className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-500 bg-orange-600 font-semibold py-1 px-4 rounded-l">
                                    {fetchingPage ? 
                                      <Spinner className="mt-1"paddingTop='2px'thickness='3px'speed='0.65s'emptyColor='gray.200'color='blue.500'size='sm'/>
                                        :
                                      <h1>Prev</h1>
                                    }
                                </button>
                                &nbsp; <h1 className="font-bold px-2">{maxPage == currentPage ? 'Last Page Reached' : currentPage}</h1> &nbsp;
                                <button
                                    disabled={maxPage == currentPage}
                                    onClick={async () => goNextPage()}
                                    className={`${maxPage == currentPage ? ' cursor-not-allowed bg-gray-500' : 'hover:bg-orange-500  bg-orange-600 '} text-sm text-indigo-50 transition duration-150 font-semibold py-1 px-4 rounded-r`}>
                                    
                                    {fetchingPage ? 
                                      <Spinner className="mt-1"paddingTop='2px'thickness='3px'speed='0.65s'emptyColor='gray.200'color='blue.500'size='sm'/>
                                        :
                                      <h1 >Next</h1>
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index