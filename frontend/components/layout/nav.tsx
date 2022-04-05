import React, { ReactNode, useEffect, useState } from 'react';
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
  return (
    <>
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
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

            <UserMenu/>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
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