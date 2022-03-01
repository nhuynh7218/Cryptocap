import React from "react";

import { useRecoilState } from "recoil";

import { motion, AnimatePresence } from "framer-motion";
import { AppState, APP_STATE } from "../../atom";
import { Spinner } from "@chakra-ui/react";
const Loader = () => {
    
  const [currentAppState, setAppState] = useRecoilState(AppState);
  const variants = {
    open: { opacity: 1},
    closed: { opacity: 0},
  }
    return (
     
      <div className="  w-full h-full">
   
  {currentAppState.appState == APP_STATE.LOADING &&
   <AnimatePresence>
  <motion.div initial={variants.closed} animate={currentAppState.appState == APP_STATE.LOADING ? variants.open : variants.closed} className="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" ></div>
   <div className=" flex flex-col justify-center items-center py-32  ">
    <h1>LOADINGG</h1>
   <Spinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='blue.500'
  size='xl'
/>      <p className="font-black z-50 bg-gray-400 rounded-lg p-3">{currentAppState.msg}</p>
   
   </div>
   
  </motion.div>
  </AnimatePresence>}

  {currentAppState.appState == APP_STATE.NOTFOUND &&
   <AnimatePresence>
  <motion.div initial={variants.closed} animate={currentAppState.appState == APP_STATE.NOTFOUND ? variants.open : variants.closed} className="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" ></div>
   <div className=" flex flex-col justify-center items-center py-32 ">
 
   <Spinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='blue.500'
  size='xl'
/>
   
   </div>
   
  </motion.div>
  </AnimatePresence>}
      </div>

  
    )
  }

  export default Loader;