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

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);
export enum CURRENT_MENU {
    NEWS,
    LIST,

}
export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentMenu, setMenu] = useState(CURRENT_MENU.NEWS)
  const route = useRouter()
  function setCurrentMenu(currMenu: CURRENT_MENU) {
    if (currMenu == currentMenu) { return }
    setMenu(currMenu)
}
  const Links = ['News', 'List'];
  useEffect(() => {

    const currRoute = route.route

    if (currRoute == "/")
        setCurrentMenu(CURRENT_MENU.NEWS)
    if (currRoute == "/raffle")
        setCurrentMenu(CURRENT_MENU.LIST)
  
    return () => {

    }
}, [route.route])
  return (
    <>
      <Box boxShadow='xl' bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          
          <HStack spacing={8} alignItems={'center'}>
          <Box>CryptoCap</Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

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
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}