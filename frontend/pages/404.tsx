import React from "react";
import { NextPage } from "next";

// import LottieViwer, { Animations } from '../components/lottie-viwer'
import { motion, AnimatePresence } from "framer-motion";

import router from "next/router";
const PageNotFound: NextPage = () => {


  const variants = {
    open: { opacity: 1},
    closed: { opacity: 0},
  }
  
    return (
     
      <div className="  w-full h-full">
   
   

 
   <AnimatePresence>
  <motion.div initial={variants.closed} animate={variants.open } >
  
 
   <div className=" flex flex-col justify-center items-center  py-16">
   <h1 className="p-8 font-black">{'Page not found...'}</h1>

     {/* <LottieViwer animationJsonPath={Animations.notFound} autoplay={true} isClickToPauseDisabled={true} loop={true} height={400} width={400} /> */}
     <button className=" h-16 w-52 rounded-lg hover:bg-green-200 bg-green-500 text-yellow-900 hover:text-yellow-800 select-none " onClick={()=> router.push('/')}><a className="font-bold  ">Go Home</a></button>
   
   </div>
   
  </motion.div>
  </AnimatePresence>

  </div>
    )
  }

  export default PageNotFound;