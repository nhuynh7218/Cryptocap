import React from "react";
import NewsLetter from "./news-letter";
const BlogAuthor: React.FC<BlogAuthorProps> = (props) => {
    return (
        <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
            <Image
                borderRadius="full"
                boxSize="40px"
                src="https://pbs.twimg.com/profile_images/1308769664240160770/AfgzWVE7_400x400.jpg"
                alt={`Avatar of ${props.name}`}
            />
            <Text fontWeight="medium">{props.name}</Text>
            <Text>—</Text>
            <Text>{props.date.toLocaleDateString()}</Text>
        </HStack>
    );
};
function BigNewsCell() {

    return (
    <Box
        marginTop={{ base: '1', sm: '5' }}
        display="flex"
        flexDirection={{ base: 'column', sm: 'row' }}
        justifyContent="space-between">
        <Box
            display="flex"
            flex="1"
            marginRight="3"
            position="relative"
            alignItems="center">
            <Box
                width={{ base: '100%', sm: '85%' }}
                zIndex="2"
                marginLeft={{ base: '0', sm: '5%' }}
                marginTop="5%">
                <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                    <Image
                        borderRadius="lg"
                        src={
                            'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
                        }
                        alt="some good alt text"
                        objectFit="contain"
                    />
                </Link>
            </Box>
            <Box zIndex="1" width="100%" position="absolute" height="100%">
                <Box
                    bgGradient={useColorModeValue(
                        'radial(orange.500 2px, transparent 2px)',
                        'radial(orange.300 2px, transparent 4px)'
                    )}
                    backgroundSize="20px 20px"
                    opacity="0.4"
                    height="100%"
                />
            </Box>
        </Box>
        <Box
            display="flex"
            flex="1"
            flexDirection="column"
            justifyContent="center"
            marginTop={{ base: '3', sm: '0' }}>
            <BlogTags tags={['BTC', 'GLOBAL']} />
            <Heading marginTop="1">
                <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                    Blog article title
                </Link>
            </Heading>
            <Text
                as="p"
                marginTop="2"
                color={useColorModeValue('gray.700', 'gray.200')}
                fontSize="lg">
              {`  description description description description description description description description description description
                description description description description description description description description description description
                description description description description description description description description description description
                description description description description description description description description description description
                description description description description description description description description description description
                description description description description description description description description description description...`}
            </Text>
            <BlogAuthor name="POTUS" date={new Date('2022-06-09T19:01:27Z')} />
        </Box>
    </Box>)
}
const SmallNewsCell = () => {
    return (

        <Wrap spacing="30px" marginTop="5">
            <WrapItem width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}>
                <Box w="100%">
                    <Box borderRadius="lg" overflow="hidden">
                        <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                            <Image
                                transform="scale(1.0)"
                                src={
                                    'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
                                }
                                alt="some text"
                                objectFit="contain"
                                width="100%"
                                transition="0.3s ease-in-out"
                                _hover={{
                                    transform: 'scale(1.05)',
                                }}
                            />
                        </Link>
                    </Box>
                    <BlogTags tags={['USA', 'LATEST']} marginTop="3" />
                    <Heading fontSize="xl" marginTop="2">
                        <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                            Some title
                        </Link>
                    </Heading>
                    <Text as="p" fontSize="md" marginTop="2">
                     {` Description Description Description Description Description 
                     Description Description Description Description Description Description Description 
                     Description Description Description Description Description Description 
                     Description Description Description Description Description Description 
                     Description `}
                    </Text>
                    <BlogAuthor
                        name="Some Name"
                        date={new Date('2021-04-06T19:01:27Z')}
                    />
                </Box>
            </WrapItem>
        </Wrap>

    );
};


function Index() {
    return (
        <div className={`flex flex-col justify-center items-center`}>


            <div className={`flex flex-col px-6 md:px-12`}>
                <Heading className={`text-center pt-4`} as="h1">Daily Feature</Heading>
                <BigNewsCell />
            </div>

            <Container maxW={'7xl'} p="12">

                <Heading as="h2" marginTop="5">
                    Latest articles
                </Heading>
                <Divider marginTop="5" />
                <SmallNewsCell />
            </Container>



            <div className={`flex flex-row`}>
                <h1 className={'font-black text-xl'}>Discover</h1>
            </div>
            <div className={'p-4'}>
                <NewsLetter />
            </div>
        </div>
    )
}

export default Index


import {
    Box,
    Heading,
    Link,
    Image,
    Text,
    Divider,
    HStack,
    Tag,
    Wrap,
    WrapItem,
    SpaceProps,
    useColorModeValue,
    Container,
    VStack,
} from '@chakra-ui/react';

interface IBlogTags {
    tags: Array<string>;
    marginTop?: SpaceProps['marginTop'];
}

const BlogTags: React.FC<IBlogTags> = (props) => {
    return (
        <HStack spacing={2} marginTop={props.marginTop}>
            {props.tags.map((tag) => {
                return (
                    <Tag size={'md'} variant="solid" colorScheme="orange" key={tag}>
                        {tag}
                    </Tag>
                );
            })}
        </HStack>
    );
};

interface BlogAuthorProps {
    date: Date;
    name: string;
}


