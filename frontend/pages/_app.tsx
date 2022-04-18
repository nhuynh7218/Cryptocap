import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Layout from '../components/layout'
import { Router, useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { AppState, APP_STATE } from '../atom'
import { RecoilRoot, useRecoilState } from 'recoil'
import Loader from '../components/alerts/loader'
const SetupLoadingComp = () =>{
  const router = useRouter()
  const [currentAppState, setAppState] = useRecoilState(AppState);

  // hi
  useEffect(() => {
  
    const setLoad = () => {
      console.log("loading")
      setAppState({appState  : APP_STATE.LOADING, title: '', msg:'' })
    }
    const setNone = () => {
      setAppState({appState  : APP_STATE.NONE, title: '' , msg:'' })
    }
  //   document.addEventListener('visibilitychange', () => { 
  //     if (document.visibilityState === 'hidden') { 
  //         window.localStorage.removeItem('WALLETCONNECT_DEEPLINK_CHOICE'); 
  //     } 
  // });
  router.events.on('routeChangeStart', setLoad)
  router.events.on('routeChangeComplete', setNone)
  router.events.on('routeChangeError', setNone)

 
    return () => {
      
    }
  }, [])
  return (
    <></>
  )
}

import { MoralisProvider } from 'react-moralis'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider appId="xx" serverUrl="xx" >
    <ChakraProvider>
    <RecoilRoot>
    <SetupLoadingComp />
    <Loader/> 
   
 
      <Layout>
        <Component {...pageProps} />
      </Layout>


    </RecoilRoot>
    </ChakraProvider>
    </MoralisProvider>

  )
}

export default MyApp
