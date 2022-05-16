import { border, Divider, Link, Select, Spinner, Tooltip, useColorMode, useToast } from "@chakra-ui/react";
import axios from "axios";
import { differenceInMilliseconds } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import _ from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Web3 from "web3";
import { AppState, APP_STATE } from "../../atom";
import { Addresses, StoredUserInfo, User, UserToken } from "../../interfaces/user";
import { APIService } from "../../services/APIService";
import { formatNumber } from "../tokens";
let minABI = [
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

const PopularETH: string[] = [
    '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
    '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2',
    '0x4d224452801ACEd8B2F0aebE155379bb5D594381'

]
const PopularBSC: string[] = [
    '0xc748673057861a797275CD8A068AbB95A902e8de',
    '0x4Fabb145d64652a948d72533023f6E7A623C7C53',
    '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'

]

function UserInfo() {

    const { colorMode } = useColorMode();
    const [currentAppState, setAppState] = useRecoilState(AppState);
    const [netWorth, setNetWorth] = useState<number | undefined>()
    const toast = useToast()
    function logOut() {
        // we have a listener which will automatically log user out if they touch the 403 page
        router.push("/403")
    }
    const router = useRouter()
    const [isLoading, setloading] = useState(true)
    const [hoverAddress, setHoverAddress] = useState('')
    interface ExtendedUserToken extends UserToken {
        currentPrice?: number
    }
    interface ExtendedUser extends User {
        tokens: ExtendedUserToken[]
    }
    const [user, setUser] = useState<ExtendedUser | null>(null)


    const [newToken, setNewToken] = useState<{ chainID: 'BSC' | 'ETH', tokenAddress: string }>({ chainID: 'BSC', tokenAddress: '' })
    const [newAddress, setNewAddress] = useState<Addresses>({ walletType: "ETH/BSC", publicAddress: '' })

    const [manuallyAddToken, setManuallyAddToken] = useState(false)
    const [fetchingPrices, setFetchingPrcies] = useState(false)
    async function getNetworth() {
        setFetchingPrcies(true)
        let copy = _.cloneDeep(user)
        if (!copy) { 
            setFetchingPrcies(false)
            return
         }
        const bscAddresses = copy.tokens.filter((x) =>  x.chainID == "BSC").map(x => x.tokenAddress)
        const bscAddressStr = bscAddresses.join(",")

        const ethAddresses = copy.tokens.filter((x) => x.chainID == "ETH").map(x => x.tokenAddress)
        const ethAddressStr = ethAddresses.join(",")


        const map : Map <string, number> = new Map<string,number>()

        const nativeTokensReq = await (await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin&vs_currencies=usd")).data
        console.log("native", nativeTokensReq)
       

        if (bscAddressStr) {
            const tokenPrices = await (await axios.get(`https://api.coingecko.com/api/v3/simple/token_price/binance-smart-chain?contract_addresses=${bscAddressStr}&vs_currencies=usd`)).data
            for (var i of bscAddresses) {
                map.set(i, tokenPrices[i] ? tokenPrices[i].usd : 0)
            }
            
        }
        if (ethAddressStr) {
            const tokenPrices = await (await axios.get(`https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${ethAddressStr}&vs_currencies=usd`)).data
            for (var i in ethAddresses) {
                map.set(i, tokenPrices[i] ? tokenPrices[i].usd : 0)
            }

        }
        map.set("t-bnb", nativeTokensReq.binancecoin.usd ?? 0)
        map.set("t-btc", nativeTokensReq.bitcoin.usd ?? 0)
        map.set("t-eth", nativeTokensReq.ethereum.usd ?? 0)
        map.set("t-busd", 1)
        map.set("t-usdt", 1)

        let net = 0
        for (var tok of copy.tokens) {
            tok.currentPrice = map.get(tok.rawTokenAddress) ?? 0
            console.log(tok.rawTokenAddress,tok.currentPrice)
            net += tok.currentPrice * tok.amtOwned
        }
        setNetWorth(net)
        setUser(copy)
        setFetchingPrcies(false)


    }
    async function getUser() {
        setloading(true)

        const localStorage = window.localStorage.getItem('userInfo')
        console.log(localStorage)
        if (!localStorage || localStorage == 'undefined' || localStorage == null || localStorage == "null") {
            console.log("here")
            logOut()
            setloading(false)
            return
        }
        const storedUserInfo: StoredUserInfo = JSON.parse(localStorage);

        const tokenExp = new Date(storedUserInfo.token_expiration)
        const diff = differenceInMilliseconds(tokenExp, new Date())
        if (diff <= 1000) {
            logOut()
            return
        }

        const token = storedUserInfo.token
        // const latestUserInfo = await APIService.GetUserInfo(token)

        // setUser(latestUserInfo)
        const updatedUser: User = {
            email: 'aaa',
            publicAddresses: [],
            tokens: []
        }
        setUser(updatedUser)
        setloading(false)
    }
    async function addNewAddress(event: any) {
        if (!user) {
            logOut()
            return
        }
        event.preventDefault()


        setAppState({ appState: APP_STATE.LOADING, title: '', msg: 'Adding address...' })


        const exist = user?.publicAddresses.find((x) => x.publicAddress == newAddress.publicAddress)
        if (newAddress.walletType == "Bitcoin") {
            try {

                const req = await axios.get("https://api.blockcypher.com/v1/btc/main/addrs/" + newAddress.publicAddress)
                const data = req.data
                const bal = data['final_balance']
                const parsed = Number(bal) / Math.pow(10, 8)
                console.log(parsed)
                const newUserToken: UserToken = {
                    chainID: "BTC",
                    ownerAddress: newAddress.publicAddress,
                    rawTokenAddress: 't-BTC',
                    tokenAddress: "t-BTC",
                    tokenDecimal: 8,
                    amtOwned: parsed,
                    tokenImg: '',
                    tokenName: "Bitcoin",
                    tokenSupply: 0,
                    tokenSymbol: "BTC",
                    coinGeckoChain: ''
                }
                const usr = _.cloneDeep(user)
                usr.publicAddresses.push(newAddress)
                usr.tokens.push(newUserToken)
                setUser(usr)
                setAppState({ appState: APP_STATE.NONE, title: '', msg: 'Adding address...' })
                toast({
                    title: 'BTC wallet detected and added!',
                    status: 'success',
                    position: "top",
                    duration: 1000,
                    isClosable: true,
                })
                setNewAddress({ walletType: newAddress.walletType, publicAddress: '' })

                return
            } catch (error) {
                console.log(error)
                toast({
                    title: 'An error has occured, either invalid address or server side error.',
                    status: 'error',
                    position: "top",
                    duration: 3300,
                    isClosable: true,
                })
                setAppState({ appState: APP_STATE.NONE, title: '', msg: 'Adding address...' })
                return

            }
        }
        if (exist) {
            toast({
                title: 'You already added this address',
                status: 'warning',
                position: "top",
                duration: 2000,
                isClosable: true,
            })
            setAppState({ appState: APP_STATE.NONE, title: '', msg: '' })
            return
        }
        if (!user) { return }
        const newPubAddresses = _.cloneDeep<Addresses[]>(user.publicAddresses)
        newPubAddresses.push(_.cloneDeep(newAddress))

        const updatedUser: User = {
            email: user.email,
            publicAddresses: newPubAddresses,
            tokens: user.tokens
        }
        setNewAddress({ walletType: newAddress.walletType, publicAddress: '' })
        setUser(updatedUser)
        toast({
            title: 'Address added! Click Auto Detect or add coins manually!',
            status: 'success',
            position: "top",
            duration: 1000,
            isClosable: true,
        })
        setAppState({ appState: APP_STATE.NONE, title: '', msg: '' })

    }
    function deleteAddress(index: number) {
        if (!user) {
            logOut()
            return
        }
        let usr = _.cloneDeep(user)
        usr.tokens = usr.tokens.filter((x) => x.ownerAddress != usr.publicAddresses[index].publicAddress)
        usr.publicAddresses.splice(index, 1)
        setUser(usr)
    }
    async function addNewToken(event: any) {
        setAppState({ appState: APP_STATE.LOADING, title: '', msg: 'Detecting token...' })

        event.preventDefault()
        if (user?.publicAddresses.length == 0) {
            toast({
                title: 'Please have at least one public address to use this feature.',
                status: 'warning',
                position: "top",
                duration: 2000,
                isClosable: true,
            })
            setAppState({ appState: APP_STATE.NONE, title: '', msg: '' })
            return
        }

        // var balance = await web3.eth.getBalance(walletAddress); //Will give value in.
        // Default wallet type is BSC AND ETH, any reputable wallet use the same public address for these two chains
        const addressesToQuery = user?.publicAddresses.filter((x) => x.walletType == 'ETH/BSC')
        let tokens : ExtendedUserToken[] = []
        const deepClonedUser = _.cloneDeep(user)
        if (!deepClonedUser) { return }
        if (newToken.chainID == 'BSC') {

            const mainNet = 'https://speedy-nodes-nyc.moralis.io/e66559c94cdee13ce7bee4fa/bsc/mainnet'
            const web3 = new Web3(new Web3.providers.HttpProvider(mainNet));

            //@ts-ignore
            let contract = new web3.eth.Contract(minABI, newToken.tokenAddress);
            if (!addressesToQuery) {
                toast({
                    title: 'An error has occured, please try again.',
                    status: 'warning',
                    position: "top",
                    duration: 3000,
                    isClosable: true,
                })
                setAppState({ appState: APP_STATE.NONE, title: '', msg: '' })

                return
            }
            for await (var addy of addressesToQuery) {
                try {


                    const balance = await contract.methods.balanceOf(addy.publicAddress).call();
                    const tokenName = await contract.methods.name().call();
                    const decimals = await contract.methods.decimals().call();
                    const symbol = await contract.methods.symbol().call();
                    const amtParsed = Number(balance) / Math.pow(10, decimals)
                    if (amtParsed <= 0) {
                        console.log("no val", balance)
                        console.log("no val", balance)

                        continue
                    }
                    let tokenAddy = newToken.tokenAddress
                    if (newToken.tokenAddress == '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56') {
                        tokenAddy = "t-BUSD"
                    }
                    const newUserToken: ExtendedUserToken = {
                        chainID: newToken.chainID,
                        ownerAddress: addy.publicAddress,
                        rawTokenAddress: newToken.tokenAddress.toLocaleLowerCase(),
                        tokenAddress: tokenAddy.toLocaleLowerCase(),
                        tokenDecimal: decimals,
                        amtOwned: amtParsed,
                        tokenImg: '',
                        tokenName: tokenName,
                        tokenSupply: 0,
                        tokenSymbol: symbol,
                        coinGeckoChain: 'binance-smart-chain',

                    }
                    tokens.push(newUserToken)

                } catch (error) {
                    console.log(error)
                    continue
                }


            }
        } else if (newToken.chainID == 'ETH') {
            const mainNet = 'https://speedy-nodes-nyc.moralis.io/e66559c94cdee13ce7bee4fa/eth/mainnet';
            const web3 = new Web3(new Web3.providers.HttpProvider(mainNet));
            //@ts-ignore
            let contract = new web3.eth.Contract(minABI, newToken.tokenAddress);
            if (!addressesToQuery) {
                toast({
                    title: 'An error has occured, please try again.',
                    status: 'warning',
                    position: "top",
                    duration: 2000,
                    isClosable: true,
                })
                setAppState({ appState: APP_STATE.NONE, title: '', msg: '' })
                return
            }

            for (var addy of addressesToQuery) {
                try {

                    const balance = await contract.methods.balanceOf(addy.publicAddress).call();
                    const tokenName = await contract.methods.name().call();
                    const decimals = await contract.methods.decimals().call();
                    const symbol = await contract.methods.symbol().call();
                    const amtParsed = Number(balance) / Math.pow(10, decimals)
                    if (amtParsed <= 0) {
                        continue
                    }
                    const newUserToken: ExtendedUserToken = {
                        chainID: newToken.chainID,
                        ownerAddress: addy.publicAddress,
                        tokenAddress: newToken.tokenAddress.toLocaleLowerCase(),
                        rawTokenAddress: newToken.tokenAddress.toLocaleLowerCase(),
                        tokenDecimal: decimals,
                        amtOwned: amtParsed,
                        tokenImg: '',
                        tokenName: tokenName,
                        tokenSupply: 0,
                        tokenSymbol: symbol,
                        coinGeckoChain: 'ethereum'

                    }
                    tokens.push(newUserToken)

                    // const deep = _.cloneDeep(user)
                    // const index = deep?.tokens.findIndex((x) => x.tokenAddress == newUserToken.tokenAddress && x.ownerAddress == newUserToken.ownerAddress)
                    // console.log(index)
                    // if (index != undefined && index != -1) {
                    //     deep?.tokens.splice(index, 1)
                    // }
                    // deep?.tokens.push(newUserToken)
                    // setUser(deep)
                    // if (index != undefined && index != -1) {
                    //     toast({
                    //         title: 'Token updated!',
                    //         status: 'success',
                    //         position: "top",
                    //         duration: 1000,
                    //         isClosable: true,
                    //     })
                    //     setAppState({ appState: APP_STATE.NONE, title: 'Adding address...', msg: '' })

                    //     return
                    // }
                    // toast({
                    //     title: 'Token detected and added!',
                    //     status: 'success',
                    //     position: "top",
                    //     duration: 1000,
                    //     isClosable: true,
                    // })
                } catch (error) {
                    console.log(error)

                    continue
                }

            }

        }
        let filt:ExtendedUserToken[] = []
        console.log("d", deepClonedUser.tokens)
        if (deepClonedUser.tokens.length == 0) {
           filt = tokens
        } else {
            const toks = deepClonedUser.tokens

            const seen = new Array(toks.length).fill(false)

            for (var token of tokens) {
                for (var i = 0; i < toks.length; i++) {
                    console.log(toks[i].rawTokenAddress)
                    if (token.ownerAddress == toks[i].ownerAddress && token.rawTokenAddress.toLowerCase() == toks[i].rawTokenAddress.toLowerCase()){
                        seen[i] = true
                        // there should be no dups
                        break
                    }
                }
           
            }
            const unseen = []
            console.log(seen)
            for (var i = 0; i < seen.length; i++){
                if (!seen[i]) {
                    unseen.push(toks[i])
                }
            }
            console.log(unseen)
            filt = _.concat(tokens, unseen)
        }
      
        deepClonedUser.tokens = filt
        console.log("dee", deepClonedUser)
        setUser(deepClonedUser)

                toast({
                    title: 'Done!',
                    status: 'success',
                    position: "top",
                    duration: 1000,
                    isClosable: true,
                })
        setAppState({ appState: APP_STATE.NONE, title: '', msg: 'Adding address...' })


    }
    async function detectTokens() {
        setAppState({ appState: APP_STATE.LOADING, title: '', msg: 'Detecting tokens...' })

        if (!user) {
            logOut()
            setAppState({ appState: APP_STATE.NONE, title: '', msg: '' })

            return
        }
        const deepClonedUser = _.cloneDeep(user)
        const addressesToQuery = user.publicAddresses.filter((x) => x.walletType == 'ETH/BSC')
        const userTokens: UserToken[] = []
        const BSCmainNet = 'https://speedy-nodes-nyc.moralis.io/e66559c94cdee13ce7bee4fa/bsc/mainnet'
        const web3BSC = new Web3(new Web3.providers.HttpProvider(BSCmainNet));
        const ETHmainNet = 'https://speedy-nodes-nyc.moralis.io/e66559c94cdee13ce7bee4fa/eth/mainnet';
        const web3ETH = new Web3(new Web3.providers.HttpProvider(ETHmainNet));
        // get native token balances

        for await (var userAddy of user.publicAddresses) {
            try {
                var balance = await web3BSC.eth.getBalance(userAddy.publicAddress);
                const bal = Number(web3ETH.utils.fromWei(balance))
                if (bal <= 0) { continue }
                // const balanceBN = web3ETH.utils.toBN(balance).div(web3ETH.utils.toBN(10).pow(web3ETH.utils.toBN(18)));
                const newUserToken: UserToken = {
                    chainID: 'BSC',
                    ownerAddress: userAddy.publicAddress,
                    rawTokenAddress: 't-bnb',
                    tokenAddress: 't-bnb',
                    tokenDecimal: 18,
                    amtOwned: bal,
                    tokenImg: '',
                    tokenName: 'Binance Smart Chain',
                    tokenSupply: 0,
                    tokenSymbol: 'BSC',
                    coinGeckoChain: 'binance-smart-chain'

                }
                userTokens.push(newUserToken)

                // const balanceBN = web3ETH.utils.toBN(balance).div(web3ETH.utils.toBN(10).pow(web3ETH.utils.toBN(18)));
            } catch (error) {

            }


        }

        for await (var userAddy of addressesToQuery) {
            try {
                var balance = await web3ETH.eth.getBalance(userAddy.publicAddress);
                const bal = Number(web3ETH.utils.fromWei(balance))
                if (bal <= 0) { continue }
                // const balanceBN = web3ETH.utils.toBN(balance).div(web3ETH.utils.toBN(10).pow(web3ETH.utils.toBN(18)));
                const newUserToken: UserToken = {
                    chainID: 'ETH',
                    ownerAddress: userAddy.publicAddress,
                    tokenAddress: 't-eth',
                    rawTokenAddress: 't-eth',
                    tokenDecimal: 18,
                    amtOwned: bal,
                    tokenImg: '',
                    tokenName: 'Ethereum',
                    tokenSupply: 0,
                    tokenSymbol: 'ETH',
                    coinGeckoChain: 'ethereum'

                }
                userTokens.push(newUserToken)

            } catch (error) {

            }

        }



        for await (var pubs of addressesToQuery) {
            for await (var bscAddy of PopularBSC) {
                try {

                    //@ts-ignore
                    let contract = new web3BSC.eth.Contract(minABI, bscAddy);

                    const balance = await contract.methods.balanceOf(pubs.publicAddress).call();
                    const decimals = await contract.methods.decimals().call();
                    const amtParsed = Number(balance) / Math.pow(10, decimals)
                    if (amtParsed <= 0) {
                        continue
                    }
                    const tokenName = await contract.methods.name().call();
                    const symbol = await contract.methods.symbol().call();
                    if (bscAddy == '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56') {
                        bscAddy = "t-BUSD"
                    }
                    const newUserToken: UserToken = {
                        chainID: 'BSC',
                        ownerAddress: pubs.publicAddress,
                        tokenAddress: bscAddy.toLocaleLowerCase(),
                        rawTokenAddress: bscAddy.toLocaleLowerCase(),
                        tokenDecimal: decimals,
                        amtOwned: amtParsed,
                        tokenImg: '',
                        tokenName: tokenName,
                        tokenSupply: 0,
                        tokenSymbol: symbol,
                        coinGeckoChain: 'binance-smart-chain'
                    }
                    userTokens.push(newUserToken)
                } catch (error) {
                    continue
                }
            }
            for await (var ethAddy of PopularETH) {
                try {

                    //@ts-ignore
                    let contract = new web3ETH.eth.Contract(minABI, ethAddy);

                    const balance = await contract.methods.balanceOf(pubs.publicAddress).call();
                    const decimals = await contract.methods.decimals().call();

                    const amtParsed = Number(balance) / Math.pow(10, decimals)
                    if (amtParsed <= 0) {
                        continue
                    }
                    const tokenName = await contract.methods.name().call();
                    const symbol = await contract.methods.symbol().call();
                    let n = ethAddy
                    if (ethAddy == '0xdAC17F958D2ee523a2206206994597C13D831ec7') {
                        ethAddy = "t-usdt"
                    }
                    const newUserToken: UserToken = {
                        chainID: 'ETH',
                        ownerAddress: pubs.publicAddress,
                        tokenAddress: ethAddy.toLocaleLowerCase(),
                        tokenDecimal: decimals,
                        rawTokenAddress: ethAddy.toLocaleLowerCase(),
                        amtOwned: amtParsed,
                        tokenImg: '',
                        tokenName: tokenName,
                        tokenSupply: 0,
                        tokenSymbol: symbol,
                        coinGeckoChain: 'ethereum'

                    }

                    userTokens.push(newUserToken)
                } catch (error) {
                    continue
                }
            }


        }
        if (userTokens.length == 0) {
            toast({
                title: 'No tokens found..',
                status: 'warning',
                position: "top",
                duration: 2000,
                isClosable: true,
            })
            return
        }
        let filt = []
        if (deepClonedUser.tokens.length == 0) {
            filt = userTokens
         } else {
             const toks = deepClonedUser.tokens
 
             const seen = new Array(toks.length).fill(false)
 
             for (var token of userTokens) {
                 for (var i = 0; i < toks.length-1; i++) {
                     if (token.ownerAddress == toks[i].ownerAddress && token.rawTokenAddress.toLowerCase() == toks[i].rawTokenAddress.toLowerCase()){
                         seen[i] = true
                         // there should be no dups
                         break
                     }
                 }
            
             }
             const unseen = []
 
             for (var i = 0; i < seen.length-1; i++){
                 if (!seen[i]) {
                     unseen.push(toks[i])
                 }
             }
             filt = _.concat(userTokens, unseen)
         }
        deepClonedUser.tokens = filt
          
            toast({
                title: 'Done!',
                status: 'success',
                position: "top",
                duration: 2000,
                isClosable: true,
            })
        
        setUser(deepClonedUser)

        setAppState({ appState: APP_STATE.NONE, title: '', msg: '' })
    }
    useEffect(() => {

        getUser()


    }, [])
    return (
        <div className="flex flex-col text-center">

            {isLoading || !user ?
                <div>
                    <Spinner className="mt-1" paddingTop='5px' thickness='3px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='lg' />
                    <button onClick={() => getUser()}> aa</button>
                    <h1>Fetching your information...</h1>
                </div>
                :
                <div className={`${colorMode == 'light' ? 'bg-gray-200 text-black' : 'bg-gray-800 text-gray-100'}  min-h-screen pt-2 font-mono`}>
                    <div className="container mx-auto">
                        <div className="inputs w-full max-w-4xl p-6 mx-auto space-y-4">

                            <h2 className="text-2xl font-bold">Account Information</h2>
                            <Divider borderColor={`${colorMode == 'light' ? 'black' : 'white'} ` } />
                                {netWorth && <h1 className="font-bold drop-shadow-lg">{"Your Networth: $" + (netWorth > 999 ? formatNumber(netWorth) : netWorth.toPrecision(3))}</h1>}
                            <Divider borderColor={`${colorMode == 'light' ? 'black' : 'white'} ` } />

                            <div className="flex flex-col">


                                <h1 className="">Add an address</h1>
                                <form onSubmit={addNewAddress} className="flex flex-row space-x-4 py-2 ">


                                    <Select className="text-center" value={newAddress.walletType} onChange={(input) => setNewAddress({ walletType: input.target.value, publicAddress: newAddress.publicAddress })} width={40} variant='Filled' defaultValue={"ETH/BSC"} >
                                        <option value='ETH/BSC'>ETH/BSC</option>
                                        <option value='Bitcoin'>Bitcoin</option>

                                    </Select>
                                    <input placeholder="Your Piblic Address. eg: 0xbc7163918273..." required value={newAddress.publicAddress} onChange={(input) => setNewAddress({ walletType: newAddress.walletType, publicAddress: input.target.value })} type="text" className=" w-full text-black rounded-md p-2 font-bold" />
                                    <button type="submit" className={`${colorMode == 'light' ? 'bg-green-300 hover:bg-green-200' : 'bg-green-700 hover:bg-green-600'} p-2 px-4 rounded font-bold`}>Add</button>
                                </form>
                            </div>
                            <div>


                                {user.publicAddresses.length == 0 ?
                                    <div>
                                        <h1>{`You don't have addresses on file!`}</h1>

                                    </div>
                                    :
                                    <div className="flex flex-row  justify-center space-x-4">
                                        <div className="flex flex-col transition-all">
                                            <h1 className=" font-bold underline">Your Addresses</h1>


                                            {user.publicAddresses.map((val, index) => {
                                                return (
                                                    <div key={index}>
                                                        <button onClick={() => deleteAddress(index)} className="hover:scale-150 transition-all ">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="inline h-5 w-5 pb-0.5" fill="none" viewBox="0 0 24 24" stroke="red" strokeWidth="2">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                                            </svg>
                                                        </button>
                                                        {val.walletType == "ETH/BSC" ?

                                                            <Tooltip label="BSC or ETH chain. Most reputable wallet use same public address for these chain.">
                                                                <h1 className="inline font-bold cursor-default" >{val.walletType + ": "}</h1>
                                                            </Tooltip> :
                                                            <h1 className="inline font-bold" >{val.walletType + ": "}</h1>}

                                                        <h1 onMouseEnter={() => setHoverAddress(val.publicAddress)} onMouseLeave={() => setHoverAddress('')} className={`${hoverAddress == val.publicAddress ? 'text-green-600 font-bold' : ''} cursor-default inline transition-all`}>{val.publicAddress.substring(0, 5) + "..." + val.publicAddress.slice(val.publicAddress.length - 5)}</h1>

                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex flex-row justify-between">
                                                <h1 className=" font-bold underline">Your Tokens</h1>
                                                {user.tokens.length > 0 && <button onClick={() => getNetworth()} className={`font-bold hover:underline border-1 p-2 rounded-md ${colorMode == 'light' ? 'bg-green-300' : 'bg-green-600'}`}>Get Prices</button>}

                                            </div>
                                            <div className="space-y-2 space-x-2 grid grid-cols-4 transition-all ">

                                                {user.tokens.map((val, index) => {
                                                    return (
                                                        <Link href={`${val.tokenAddress.substring(0, 2) == 't-' ? `tokens/${val.tokenAddress}` : `tokens/${val.coinGeckoChain}_${val.tokenAddress}`} `} onMouseEnter={() => setHoverAddress(val.ownerAddress)} onMouseLeave={() => setHoverAddress('')} className={` ${hoverAddress == val.ownerAddress ? `text-green-400 font-bold ${colorMode == 'light' ? 'border-green-600' : 'border-green-300'}` : ''} cursor-default border-2  p-2 transition-all `} key={index}>
                                                            <h1>{val.tokenSymbol}</h1>
                                                            <h1>{val.amtOwned <= 1000 ? val.amtOwned.toPrecision(3) : formatNumber(val.amtOwned)}</h1>
                                                            <h1 className={` inline `}>{val.ownerAddress.substring(0, 4) + "..." + val.ownerAddress.slice(val.ownerAddress.length - 3)}</h1>
                                                            {val.currentPrice && 
                                                            <div className=" space-y-2 pt-2 ">
                                                                <div className="border-2 border-indigo-500">
                                                                <Tooltip  label={"Current Price: $" + val.currentPrice.toFixed(val.currentPrice < 0.01 ? 20 : 3)}>
                                                                    <div>
                                                                        <h1>Current</h1>
                                                                    <h1>
                                                                    {"$"+val.currentPrice.toString()} 
                                                                    </h1>
                                                                    </div>
                                                                </Tooltip>
                                                                </div>
                                                            
                                                                <div className="border-2 border-indigo-500 flex flex-col py-1 space-x-1 p-2">
                                                                    <h1>Total</h1>
                                                                    <h1 className="font-bold">{"$" + (val.currentPrice * val.amtOwned > 999 ? formatNumber(val.currentPrice * val.amtOwned) : (val.currentPrice * val.amtOwned).toFixed(3))}</h1>
                                                                </div>
                                                            </div>


                                                            }
                                                        </Link>
                                                    )
                                                })}
                                            </div>
                                        </div>

                                    </div>

                                }
                                <button onClick={async () => {
                                    await detectTokens()

                                }} className={`${colorMode == 'light' ? 'bg-green-400 hover:bg-green-300' : 'bg-green-700 hover:bg-green-800'} p-2 font-bold m-3 border-2  rounded-md`}>Auto Detect Popular Tokens</button>
                                <button onClick={() => setManuallyAddToken(!manuallyAddToken)} className={`${colorMode == 'light' ? `${manuallyAddToken ? 'bg-gray-400 hover:bg-green-300' : 'bg-green-400 hover:bg-green-300'}` : `${manuallyAddToken ? 'bg-gray-400 hover:bg-green-600' : 'bg-green-700 hover:bg-green-600'}`} m-3 p-2 font-bold  border-2  rounded-md`}>Detect Manually</button>
                                <AnimatePresence>
                                    {manuallyAddToken &&
                                        <motion.form onSubmit={(e) => addNewToken(e)} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} action="">
                                            <section className="flex flex-col justify-center ">

                                                <section className="flex flex-row space-x-5 justify-center">
                                                    <h1 className="pt-2">Network:</h1>
                                                    {/* @ts-ignore */}
                                                    <Select width={40} value={newToken.chainID} onChange={(input) => setNewToken({ chainID: input.target.value, tokenAddress: newToken.tokenAddress })} variant='Filled' defaultValue={"BSC"} >
                                                        <option value='BSC'>BSC</option>
                                                        <option value='ETH'>ETH</option>

                                                    </Select>
                                                </section>
                                                <section className="flex flex-row space-x-5 pt-6 justify-center">
                                                    <h1>Token Address:</h1>
                                                    <input placeholder="Token Address. eg: 0xbe7163918273..." required value={newToken?.tokenAddress} onChange={(input) => setNewToken({ chainID: newToken.chainID, tokenAddress: input.target.value })} type="text" className=" w-full text-black rounded-md p-2 font-bold" />
                                                </section>
                                                <section className="flex justify-center">
                                                    <button type="submit" className={`mt-3 flex ${colorMode == 'light' ? 'bg-green-300 hover:bg-green-200' : 'bg-green-700 hover:bg-green-600'} p-2 px-4 rounded font-bold`}>Detect</button>

                                                </section>
                                            </section>
                                        </motion.form>
                                    }
                                </AnimatePresence>
                            </div>
                            {true && 
    
                                <button className={`mt-3  ${colorMode == 'light' ? 'bg-green-300 hover:bg-green-200' : 'bg-green-700 hover:bg-green-600'} p-2 px-4 rounded font-bold`}>Save</button>

       
                            }
                        </div>
                      
                    </div>
                  
                </div>



            }
        </div>

    )
}

export default UserInfo