import React, { ReactNode, useEffect, useRef, useState } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  HStack,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import NextLink from 'next/link'
import { useOnClickOutside } from '../../hooks/click-outside';
import { AnimatePresence, motion } from 'framer-motion';
import { useMoralis } from 'react-moralis';
import { useLockBodyScroll } from '../../hooks/body-scroll-lock';
import { AppState, APP_STATE } from '../../atom';
import { useRecoilState } from 'recoil';

const NavLink = ({ children, props }: { children: ReactNode, props: {currentMenu: string, index: number, link: string }}) => (
  <NextLink  href={`${props.index == 0 ? '/' : `/${props.link.toLocaleLowerCase()}`}`}>
  <Link
    className = {`${props.currentMenu == props.link.toLocaleLowerCase() ? 'border-2 border-green-500' : 'border-black'}`}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
   >
    {children}
  </Link>
  </NextLink>
);

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentMenu, setMenu] = useState('')
  const route = useRouter()

// make sure link name matches page name. different casing is fine. User == user.
  const Links = ['News', 'Tokens', 'User'];
  useEffect(() => {

    const currRoute = route.route

    if (currRoute == "/"){
        setMenu('news')
        return
    }
    const routeStripped = currRoute.substring(1)
    setMenu(routeStripped)
  
    return () => {

    }
}, [route.route])


const [showWalletConnectOptions, toggleShowWalletConnect2] = useState(false)
const [currentAppState, setAppState] = useRecoilState(AppState);
function toggleShowWalletConnect(b: boolean) {

    if (b) {
        toggleShowWalletConnect2(b)
        setAppState({ appState: APP_STATE.MODAL, msg: '', title: '' })
        // const body = document.querySelector('body');
    } else {
        toggleShowWalletConnect2(b)
        setAppState({ appState: APP_STATE.NONE, msg: '', title: '' })
        // const body = document.querySelector('body');
    }
}
const { authenticate,
    isWeb3Enabled,
    isAuthenticated,
    isAuthenticating,
    user,
    isWeb3EnableLoading,
    enableWeb3,

    Moralis, } = useMoralis();
useEffect(() => {

  }, [isWeb3Enabled, isAuthenticated, enableWeb3]);
  return (
    <>
      {showWalletConnectOptions && <WalletConnectModal isActived={showWalletConnectOptions} toggleActive={toggleShowWalletConnect} />
            }  
      <Box boxShadow='xl' bg={useColorModeValue('gray.50', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          
          <HStack spacing={8} alignItems={'center'}>
          <Box className={'cursor-pointer'} onClick={() => {route.push('/')}}>CryptoCap</Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link, index) => (
                <NavLink props={{currentMenu, index, link}} key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button className='mt-2' onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              {isWeb3Enabled  ?
                                <div >
                                    <UserMenu />
                                </div>
                                : isWeb3EnableLoading  ?
                                    <div className="bg-pink-400  rounded-2xl drop-shadow-lg px-3">
                                        <div className="justify-center items-center space-x-1 text-sm text-white">



                                            <div className=" font-semibold">Requesting Premission...</div>

                                            <svg fill='none' className="w-12 h-12 animate-spin" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                                                <path clipRule='evenodd'
                                                    d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                                                    fill='purple' fillRule='evenodd' />
                                            </svg>
                                        </div>
                                    </div>
                                    :
                                    <div className={`${colorMode == "light" ? ' bg-pink-400' : 'bg-pink-700'} hover:scale-105 transition-all rounded-2xl drop-shadow-lg h-13 p-2 mt-6`}>
                                        <button onClick={async () => { toggleShowWalletConnect(true) }} className="">

                                            <h1 className="inline pt-1 font-bold  text-gray-100 hover:text-green-800 transition duration-300 ease-in-out  ">Connect Wallet</h1>


                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 inline pl-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </button>

                                    </div>

                            }
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

function WalletConnectModal(props: { isActived: boolean, toggleActive: (state: boolean) => void }) {
  useLockBodyScroll()
  const { authenticate,
      isWeb3Enabled,
      isAuthenticated,
      isAuthenticating,
      user,

      enableWeb3,
      Moralis, } = useMoralis();
  // useEffect(() => {
  //     if (!isWeb3Enabled && isAuthenticated) {
  //       enableWeb3({ provider: "walletconnect", chainId: 56 });
  //       console.log("web3 activated");
  //     }
  //   }, [isWeb3Enabled, isAuthenticated, enableWeb3]);
  // const [userAtom, setUser] = useRecoilState(UserAtom);

/**
* Assign the project to an employee.
* @param {number} type: 1 for WalletConnect, 2 for MetaMask
*/
  async function authenticateWallet(type: number){
   
      try {
          if (type == 1){
              // Wallet Connect
              console.log( "wc")
              const p = await enableWeb3({ provider: "walletconnect", chainId: 56});

          //    const p = await authenticate({provider: 'walletconnect', chainId: 56, signingMessage:'Catbonk!'})
             
             console.log(p, "AUTHENED")
          } else if (type == 2){
              // MetaMask

              await enableWeb3({chainId: 56})
          
  
          }
      } catch (error) {
          console.log(error)
 
      }
     
      props.toggleActive(false)

  }
  const { colorMode, toggleColorMode } = useColorMode();

  return (

      <ClickOutSideModalWrapper {...props}>

      <AnimatePresence>

          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border-emerald-200 border-4 ">
              <div className={`${colorMode == 'light' ? 'bg-white' : 'bg-gray-700'} py-6 p-4 flex flex-col text-center`}>

                  <h1 className="mb-6 pb-2 border-b font-black">{'Connect Wallet'}</h1>

                  <div className="flex flex-row text-center space-x-6 pt-6">
                      <button className={`flex flex-col font-black items-center p-4  m-2 border-2 rounded-md ${colorMode == 'light' ? 'hover:bg-slate-200' : 'hover:bg-slate-600'} hover:scale-110 duration-300 transition-all`} onClick={ async() =>  await authenticateWallet(1) }>
                          <svg width="45px" height="50px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink">


                              <defs>
                                  <radialGradient cx="0%" cy="50%" fx="0%" fy="50%" r="50%" id="radialGradient-1">
                                      <stop stopColor="#5D9DF6" offset="0%"></stop>
                                      <stop stopColor="#006FFF" offset="100%"></stop>
                                  </radialGradient>
                              </defs>
                              <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                  <g id="logo">
                                      <rect id="base" fill="url(#radialGradient-1)" x="0" y="0" width="512" height="512" rx="256"></rect>
                                      <path d="M169.209772,184.531136 C217.142772,137.600733 294.857519,137.600733 342.790517,184.531136 L348.559331,190.179285 C350.955981,192.525805 350.955981,196.330266 348.559331,198.676787 L328.82537,217.99798 C327.627045,219.171241 325.684176,219.171241 324.485851,217.99798 L316.547278,210.225455 C283.10802,177.485633 228.89227,177.485633 195.453011,210.225455 L186.951456,218.549188 C185.75313,219.722448 183.810261,219.722448 182.611937,218.549188 L162.877976,199.227995 C160.481326,196.881474 160.481326,193.077013 162.877976,190.730493 L169.209772,184.531136 Z M383.602212,224.489406 L401.165475,241.685365 C403.562113,244.031874 403.562127,247.836312 401.165506,250.182837 L321.971538,327.721548 C319.574905,330.068086 315.689168,330.068112 313.292501,327.721609 C313.292491,327.721599 313.29248,327.721588 313.29247,327.721578 L257.08541,272.690097 C256.486248,272.103467 255.514813,272.103467 254.915651,272.690097 C254.915647,272.690101 254.915644,272.690105 254.91564,272.690108 L198.709777,327.721548 C196.313151,330.068092 192.427413,330.068131 190.030739,327.721634 C190.030725,327.72162 190.03071,327.721606 190.030695,327.721591 L110.834524,250.181849 C108.437875,247.835329 108.437875,244.030868 110.834524,241.684348 L128.397819,224.488418 C130.794468,222.141898 134.680206,222.141898 137.076856,224.488418 L193.284734,279.520668 C193.883897,280.107298 194.85533,280.107298 195.454493,279.520668 C195.454502,279.520659 195.45451,279.520651 195.454519,279.520644 L251.65958,224.488418 C254.056175,222.141844 257.941913,222.141756 260.338618,224.488222 C260.338651,224.488255 260.338684,224.488288 260.338717,224.488321 L316.546521,279.520644 C317.145683,280.107273 318.117118,280.107273 318.71628,279.520644 L374.923175,224.489406 C377.319825,222.142885 381.205562,222.142885 383.602212,224.489406 Z" id="WalletConnect" fill="#FFFFFF" fillRule="nonzero"></path>
                                  </g>
                              </g>
                          </svg>
                          {"Wallet Connect"}
                      </button>
                      <button className={`px-4  border-2 rounded-md font-black ${colorMode == 'light' ? 'hover:bg-slate-200' : 'hover:bg-slate-600'} hover:scale-110 duration-300 transition-all`} onClick={async() => await authenticateWallet(2) }>
                          <svg xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink" version="1.1" baseProfile="basic" id="Layer_1" x="0px" y="0px" viewBox="0 0 33.9 31.3" spacing="preserve">
                              <path fill="#E17726" stroke="#E17726" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" d="M32.1,0.1L18.9,9.8  l2.4-5.7L32.1,0.1z" />
                              <path fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" d="M1.8,0.1l13,9.8  l-2.3-5.8L1.8,0.1z" />
                              <path fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" d="M27.4,22.7L23.9,28  l7.5,2.1l2.1-7.3L27.4,22.7z" />
                              <path fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" d="M0.4,22.8l2.1,7.3  L10,28l-3.5-5.3L0.4,22.8z" />
                              <path fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" d="M9.6,13.6l-2.1,3.1  l7.4,0.3l-0.2-8L9.6,13.6z" />
                              <path fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" d="M24.3,13.6l-5.2-4.6  l-0.2,8.1l7.4-0.3L24.3,13.6z" />
                              <path fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" d="M10,28l4.5-2.2  l-3.9-3L10,28z" />
                              <path fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" d="M19.4,25.8l4.5,2.2  l-0.6-5.2L19.4,25.8z" />
                              <path fill="#D5BFB2" stroke="#D5BFB2" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" d="M23.9,28l-4.5-2.2  l0.4,2.9l0,1.2L23.9,28z" />
                              <path fill="#D5BFB2" stroke="#D5BFB2" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" d="M10,28l4.2,2l0-1.2  l0.4-2.9L10,28z" />
                              <path fill="#233447" stroke="#233447" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" d="M14.2,20.9l-3.7-1.1  l2.6-1.2L14.2,20.9z" />
                              <path fill="#233447" stroke="#233447" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" d="M19.6,20.9l1.1-2.3  l2.6,1.2L19.6,20.9z" />
                              <path fill="#CC6228" stroke="#CC6228" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" d="M10,28l0.6-5.3  l-4.1,0.1L10,28z" />
                              <path fill="#CC6228" stroke="#CC6228" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" d="M23.2,22.7l0.6,5.3  l3.5-5.2L23.2,22.7z" />
                              <path fill="#CC6228" stroke="#CC6228" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" d="M26.4,16.8l-7.4,0.3  l0.7,3.8l1.1-2.3l2.6,1.2L26.4,16.8z" />
                              <path fill="#CC6228" stroke="#CC6228" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" d="M10.5,19.8l2.6-1.2  l1.1,2.3l0.7-3.8l-7.4-0.3L10.5,19.8z" />
                              <path fill="#E27525" stroke="#E27525" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" d="M7.5,16.8l3.1,6.1  l-0.1-3L7.5,16.8z" />
                              <path fill="#E27525" stroke="#E27525" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" d="M23.4,19.8l-0.1,3  l3.1-6.1L23.4,19.8z" />
                              <path fill="#E27525" stroke="#E27525" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" d="M14.9,17.1l-0.7,3.8  l0.9,4.5l0.2-5.9L14.9,17.1z" />
                              <path fill="#E27525" stroke="#E27525" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" d="M18.9,17.1l-0.4,2.4  l0.2,5.9l0.9-4.5L18.9,17.1z" />
                              <path fill="#F5841F" stroke="#F5841F" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" d="M19.6,20.9l-0.9,4.5  l0.6,0.4l3.9-3l0.1-3L19.6,20.9z" />
                              <path fill="#F5841F" stroke="#F5841F" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" d="M10.5,19.8l0.1,3  l3.9,3l0.6-0.4l-0.9-4.5L10.5,19.8z" />
                              <path fill="#C0AC9D" stroke="#C0AC9D" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" d="M19.7,30l0-1.2  l-0.3-0.3h-5l-0.3,0.3l0,1.2L10,28l1.5,1.2l2.9,2h5.1l3-2l1.4-1.2L19.7,30z" />
                              <path fill="#161616" stroke="#161616" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" d="M19.4,25.8l-0.6-0.4  h-3.7l-0.6,0.4l-0.4,2.9l0.3-0.3h5l0.3,0.3L19.4,25.8z" />
                              <path fill="#763E1A" stroke="#763E1A" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" d="M32.6,10.5l1.1-5.4  l-1.7-5L19.4,9.5l4.9,4.1l6.9,2l1.5-1.8L32,13.4l1.1-1l-0.8-0.6l1.1-0.8L32.6,10.5z" />
                              <path fill="#763E1A" stroke="#763E1A" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" d="M0.1,5.1l1.1,5.4  L0.5,11l1.1,0.8l-0.8,0.6l1.1,1l-0.7,0.5l1.5,1.8l6.9-2l4.9-4.1L1.8,0.1L0.1,5.1z" />
                              <path fill="#F5841F" stroke="#F5841F" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" d="M31.2,15.6l-6.9-2  l2.1,3.1l-3.1,6.1l4.1-0.1h6.1L31.2,15.6z" />
                              <path fill="#F5841F" stroke="#F5841F" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" d="M9.6,13.6l-6.9,2  l-2.3,7.1h6.1l4.1,0.1l-3.1-6.1L9.6,13.6z" />
                              <path fill="#F5841F" stroke="#F5841F" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" d="M18.9,17.1l0.4-7.6  l2-5.4h-8.9l2,5.4l0.4,7.6l0.2,2.4l0,5.9h3.7l0-5.9L18.9,17.1z" />
                          </svg>
                          {"MetaMask"}
                          </button>
                  </div>

              </div>
          </motion.div>
          </AnimatePresence>
      </ClickOutSideModalWrapper>
  )
}

export function ClickOutSideModalWrapper(props: { children: JSX.Element, isActived: boolean, toggleActive: (state: boolean) => void }) {

  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  useOnClickOutside(ref, () => props.toggleActive(false))
  return (
      <>

          {props.isActived &&


              <div >
                  <div className="min-w-screen h-screen   fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none  ">
                      <div ref={ref}>
                          {props.children}
                      </div>
                  </div>
              </div>
          }
      </>
  )
}


function UserMenu(){
   return (
    <Menu>
    <MenuButton
      as={Button}
      rounded={'full'}
      variant={'link'}
      cursor={'pointer'}
      minW={0}>
      <Avatar
        size={'sm'}
        src={''}
      />
    </MenuButton>
    <MenuList alignItems={'center'}>
      <br />
      <Center>
        <Avatar
          size={'2xl'}
          src={''}
        />
      </Center>
      <br />
      <Center>
        <p>Hello 0x....x8ye</p>
      </Center>
      <br />
      <MenuDivider />
      <MenuItem>Your Holdings</MenuItem>
      <MenuItem>Settings</MenuItem>
      <MenuItem>Logout</MenuItem>
    </MenuList>
  </Menu>
   )
}