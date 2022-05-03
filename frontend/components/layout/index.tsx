import NavBar from "./nav"
import Footer from "./footer"
import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useRecoilState } from "recoil";
import { AppState, APP_STATE } from "../../atom";

function Layout({ children }:{children:JSX.Element}){
    const [currentAppState, setAppState] = useRecoilState(AppState);

    return (
        <div className="flex flex-col h-screen justify-between">
                  <AnimatePresence>
      {currentAppState.appState == APP_STATE.MODAL && <motion.div initial={{scale:0}} transition={{duration: 0.25}} animate={{ opacity: [0,0.5], scale: [0,1] }} exit={{ opacity: [0.5,0], scale: [1,0] }} className="fixed z-50 blur-xl w-screen h-screen opacity-50 bg-gray-500"></motion.div>}
      </AnimatePresence>
            <NavBar/>
                <main > {children} </main>
            <Footer/>
        </div>
    )
}

export default Layout


