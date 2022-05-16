import React, { Dispatch, SetStateAction, useLayoutEffect, useState } from "react";
import Link  from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useLockBodyScroll } from "../../hooks/body-scroll-lock";

type PropsFunction = (a: boolean) => void;
type props = {
  isMobileMenuHidden: boolean
  scrollY: number
  toggleMenu: () => void
}
const MobileNav = (props: props) => {
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 1, x: "-100%" },
  }
  //@ts-ignore
useLockBodyScroll()

  return (
   <motion.div initial={variants.closed} animate={ variants.open } exit={variants.closed} className={`pt-16 fixed z-50 justify-self-center top-0   w-full h-full md:hidden `} onClick={() => { props.toggleMenu(); }}  >

     
        <motion.div className={` shadow-lg bg-gradient-to-r from-gray-500 via-gray-600 to-gray-500 font-bold  text-center block  md:hidden absolute w-full h-full bg-white`}>

          <div className="flex flex-col p-6 space-y-3 items-center ">
            <a href="https://poocoin.app/tokens/0xdfaabaa57dec10c049335bdaa2e949b4ce2ead30" rel="noreferrer" target="_blank" className=" text-base  text-white font-bold  p-2 rounded-lg border-4 border-green-400    ">Crypto Cap</a>

            <h1 className="text-purple-400 underline text-2xl">Menu</h1>
            <Link href={'/'}><a className='bg-green-400 p-2 rounded-lg font-bold hover:scale-110 ' >News</a></Link>
            <Link href={'/tokens'}><a className='bg-green-400 p-2 rounded-lg font-bold hover:scale-110 ' >Tokens</a></Link>



          </div>






        </motion.div>
     
    </motion.div>
  








  )
}
export default MobileNav;