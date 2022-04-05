import {
    Box,
    Container,
    Link,
    SimpleGrid,
    Stack,
    Text,
    Flex,
    Tag,
    useColorModeValue,
    useColorMode,
  } from '@chakra-ui/react';
  import { ReactNode } from 'react';

  
  const ListHeader = ({ children }: { children: ReactNode }) => {
    return (
      <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
        {children}
      </Text>
    );
  };
  
  export default function Footer() {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        // here you see I am conbining tailwind css with charkaUI built in hooks. colormode 
      <Box className={`${colorMode == 'dark' ? 'bg-yellow-800' : 'bg-yellow-400 '} w-full relative  transition-all `}>
        <Container as={Stack} maxW={'6xl'} py={10}>
          <SimpleGrid columns={{ base: 2, sm: 2, md: 4 }} spacing={8}>
            <Stack align={'flex-start'}>
              <ListHeader>Services</ListHeader>
              {/* <Link href={'#'}>Overview</Link>
              <Stack direction={'row'} align={'center'} spacing={2}>
                <Link href={'#'}>Features</Link>
                <Tag
                  size={'sm'}
                  bg={useColorModeValue('green.300', 'green.800')}
                  ml={2}
                  color={'white'}>
                  New
                </Tag>
              </Stack> */}
              <Link href={'/'}>News</Link>
              <Link href={'#'}>Token List</Link>
              <Link href={'#'}>Public API</Link>
            </Stack>
            <Stack align={'flex-start'}>
              <ListHeader>Info</ListHeader>
              <Link href={'#'}>About Us</Link>
              <Link href={'#'}>Contact Us</Link>
            </Stack>
            <Stack align={'flex-start'}>
              <ListHeader>Founders</ListHeader>
              <Link href={'/founders'}>Darren</Link>
              <Link href={'/founders'}>Ardi</Link>
              <Link href={'/founders'}>Mike</Link>
              <Link href={'/founders'}>Nick</Link>
            </Stack>
            <Stack align={'flex-start'}>
              <ListHeader>Follow Us</ListHeader>
              <Link href={'#'}>Facebook</Link>
              <Link href={'#'}>Twitter</Link>
              <Link href={'#'}>Instagram</Link>
            </Stack>
          </SimpleGrid>
        </Container>
        <Box pb={6}>
          {/* <Flex
            align={'center'}
            _before={{
              content: '""',
              borderBottom: '1px solid',
              borderColor: useColorModeValue('gray.200', 'gray.700'),
              flexGrow: 1,
              mr: 8,
            }}
            _after={{
              content: '""',
              borderBottom: '1px solid',
              borderColor: useColorModeValue('gray.200', 'gray.700'),
              flexGrow: 1,
              ml: 8,
            }}>
           
          </Flex> */}
          <Text pt={6} fontSize={'sm'} textAlign={'center'}>
            © 2022 Cryptocap All rights reserved
          </Text>
        </Box>
      </Box>
    );
  }