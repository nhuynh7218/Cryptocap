import { useColorMode } from "@chakra-ui/react";
import React from "react";

function Founders() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12 drop-shadow-lg">
        <h1 className=" p-8 text-center font-bold text-2xl">Founders</h1>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
          <div className={`${colorMode == 'dark' ? 'bg-gray-700' : 'bg-slate-300'} rounded-lg p-6`}>
            <div className="flex items-center space-x-6 mb-4">
              <img className="h-28 w-28 object-cover object-center rounded-full" src={"https://images.unsplash.com/photo-1627693685101-687bf0eb1222?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"} alt="photo" />
              <div>
                <p className="text-xl text-gray-700 font-normal mb-1">Darren</p>
                <p className="text-base text-blue-600 font-normal">Software Developer</p>
              </div>
            </div>
            <div>
              <p className={`${colorMode == 'dark' ? 'text-gray-200' : 'text-black'} leading-loose text-base font-bold`}>Hi! Bye.</p>
            </div>
          </div>
          <div className={`${colorMode == 'dark' ? 'bg-gray-700' : 'bg-slate-300'} rounded-lg p-6`}>
            <div className="flex items-center space-x-6 mb-4">
              <img className="h-28 w-28 object-cover object-center rounded-full" src={"https://images.unsplash.com/photo-1627693685101-687bf0eb1222?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"} alt="photo" />
              <div>
                <p className="text-xl text-gray-700 font-normal mb-1">Ardi</p>
                <p className="text-base text-blue-600 font-normal">Software Developer</p>
              </div>
            </div>
            <div>
              <p className={`${colorMode == 'dark' ? 'text-gray-200' : 'text-black'} leading-loose text-base font-bold`}>Hi! Bye.</p>
            </div>
          </div>
          <div className={`${colorMode == 'dark' ? 'bg-gray-700' : 'bg-slate-300'} rounded-lg p-6`}>
            <div className="flex items-center space-x-6 mb-4">
              <img className="h-28 w-28 object-cover object-center rounded-full" src={"https://images.unsplash.com/photo-1627693685101-687bf0eb1222?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"} alt="photo" />
              <div>
                <p className="text-xl text-gray-700 font-normal mb-1">Mike</p>
                <p className="text-base text-blue-600 font-normal">Software Developer</p>
              </div>
            </div>
            <div>
              <p className={`${colorMode == 'dark' ? 'text-gray-200' : 'text-black'} leading-loose text-base font-bold`}>Hi! Bye.</p>
            </div>
          </div>
          <div className={`${colorMode == 'dark' ? 'bg-gray-700' : 'bg-slate-300'} rounded-lg p-6`}>
            <div className="flex items-center space-x-6 mb-4">
              <img className="h-28 w-28 object-cover object-center rounded-full" src={"https://images.unsplash.com/photo-1627693685101-687bf0eb1222?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"} alt="photo" />
              <div>
                <p className="text-xl text-gray-700 font-normal mb-1">Nick</p>
                <p className="text-base text-blue-600 font-normal">Software Developer</p>
              </div>
            </div>
            <div>
              <p className={`${colorMode == 'dark' ? 'text-gray-200' : 'text-black'} leading-loose text-base font-bold`}>Hi! Bye.</p>
            </div>
          </div>
        </div>
        </div>
    )
}

export default Founders