import { background, useColorMode } from "@chakra-ui/react";
import React from "react";
import {
  LinkedinShareButton,
  LinkedinIcon,
} from 'next-share'

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
                <div className="flex flex-row pt-1">
                  <button className="mr-2" type="button" onClick = {(e)=> {e.preventDefault(); window.open('https://www.linkedin.com/','_blank');}}><img className="h-8 w-8 object-cover object-center rounded-full" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/LinkedIn_icon_circle.svg/2048px-LinkedIn_icon_circle.svg.png"} alt="photo" /> </button>
                  <button type="button" onClick = {(e)=> {e.preventDefault(); window.open('https://github.com/','_blank');}}><img className="h-8 w-8 object-cover object-center rounded-full" src={"https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"} alt="photo" /> </button>
                </div>
              </div>
            </div>
            <div>
              <p className={`${colorMode == 'dark' ? 'text-gray-200' : 'text-black'} leading-loose text-base font-bold`}>Hi! Bye.</p>
            </div>
          </div>
          <div className={`${colorMode == 'dark' ? 'bg-gray-700' : 'bg-slate-300'} rounded-lg p-6`}>
            <div className="flex items-center space-x-6 mb-4">
              <img className="h-28 w-28 object-cover object-center rounded-full" src={"https://media-exp1.licdn.com/dms/image/C4D03AQEBoOg-biwgcg/profile-displayphoto-shrink_800_800/0/1644298005367?e=1657152000&v=beta&t=FCc_k0FCXnPhi6sEOGDDAXsIYWnbCdtUgmqa2OlYpNU"} alt="photo" />
              <div>
                <p className="text-xl text-gray-700 font-normal mb-1">Ardi</p>
                <p className="text-base text-blue-600 font-normal">Software Developer</p>
                <div className="flex flex-row pt-1">
                  <button className="mr-2" type="button" onClick = {(e)=> {e.preventDefault(); window.open('https://www.linkedin.com/in/ardiartani/','_blank');}}><img className="h-8 w-8 object-cover object-center rounded-full" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/LinkedIn_icon_circle.svg/2048px-LinkedIn_icon_circle.svg.png"} alt="photo" /> </button>
                  <button type="button" onClick = {(e)=> {e.preventDefault(); window.open('https://github.com/ArdiArtani','_blank');}}><img className="h-8 w-8 object-cover object-center rounded-full" src={"https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"} alt="photo" /> </button>
                </div>
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
                <div className="flex flex-row pt-1">
                  <button className="mr-2" type="button" onClick = {(e)=> {e.preventDefault(); window.open('https://www.linkedin.com/in/mike-altamirano-076039167/','_blank');}}><img className="h-8 w-8 object-cover object-center rounded-full" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/LinkedIn_icon_circle.svg/2048px-LinkedIn_icon_circle.svg.png"} alt="photo" /> </button>
                  <button type="button" onClick = {(e)=> {e.preventDefault(); window.open('https://github.com/mikealta1','_blank');}}><img className="h-8 w-8 object-cover object-center rounded-full" src={"https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"} alt="photo" /> </button>
                </div>
              </div>
            </div>
            <div>
              <p className={`${colorMode == 'dark' ? 'text-gray-200' : 'text-black'} leading-loose text-base font-bold`}>Hi! Bye.</p>
            </div>
          </div>
          <div className={`${colorMode == 'dark' ? 'bg-gray-700' : 'bg-slate-300'} rounded-lg p-6`}>
            <div className="flex items-center space-x-6 mb-4">
              <img className="h-28 w-28 object-cover object-center rounded-full" src={"https://media-exp1.licdn.com/dms/image/C4E03AQHDc-JCw3UC5Q/profile-displayphoto-shrink_800_800/0/1639422640267?e=1657152000&v=beta&t=sHrP_5gauzc2O_JGXat9RlP2N1cLOVW-Hg4jegzHe4Y"} alt="photo" />
              <div>
                <p className="text-xl text-gray-700 font-normal mb-1">Nick</p>
                <p className="text-base text-blue-600 font-normal">Software Developer</p>
                <div className="flex flex-row pt-1">
                  <button className="mr-2" type="button" onClick = {(e)=> {e.preventDefault(); window.open('https://www.linkedin.com/in/nicholas-huynh-44b5b6192/','_blank');}}><img className="h-8 w-8 object-cover object-center rounded-full" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/LinkedIn_icon_circle.svg/2048px-LinkedIn_icon_circle.svg.png"} alt="photo" /> </button>
                  <button type="button" onClick = {(e)=> {e.preventDefault(); window.open('https://github.com/nhuynh7218 ','_blank');}}><img className="h-8 w-8 object-cover object-center rounded-full" src={"https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"} alt="photo" /> </button>
                </div>
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