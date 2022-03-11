import React from "react";
import NewsLetter from "./news-letter";

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
    useColorMode,
} from '@chakra-ui/react';
function CardCell(props: { newsArticle: any }) {
    const { colorMode, toggleColorMode } = useColorMode();

    const { newsArticle } = props
    return (
        <div className={`${colorMode == 'light' ? 'hover:bg-gray-300 bg-gray-100 text-black ' : 'hover:bg-gray-600 bg-gray-700 text-gray-100 ' } flex justify-center delay-50 duration-100   p-5 rounded-lg w-72 group shadow-2xl`}>

            <Link href={`/`}>

                <a className="" >
                    <Image width={250} height={200} src={newsArticle.image} className=" shadow-2xl  rounded  hover:scale-105 duration-500 transition-all"></Image>
                    <h1 className="font-bold text-lg  mt-5">{newsArticle.title}</h1>
                    <h1 className="font-bold text-lg mt-5">{newsArticle.author}</h1>

                    <h1 className="font-bold text-sm  line-clamp-4 ">{`${newsArticle.description} `}</h1>
                    <h1 className="font-bold text-sm  ">{`tags`}</h1>

                </a>
            </Link>

        </div>
    )
}
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
                className=" line-clamp-6"
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


interface NewsArticle {
    author: string,
    date: Date,
    description: string,
    image: string,
    tags: string[]
}
function Index() {
    const oneArticle: NewsArticle = {
        author: 'Some Name',
        date: new Date(),
        description: 'akljsd  akljsd akljsd akljsd akljsd  akljsd akljsd akljsd akljsd  akljsd akljsd akljsd akljsd  akljsd akljsd akljsd akljsd  akljsd akljsd akljsd akljsd  akljsd akljsd akljsd',
        image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80',
        tags: ['BTC', 'USA']


    }
    const newsList = () => {
        var p = []
        for (var i = 0; i < 5; i++) {
            p.push(oneArticle)
        }
        return p
    }
    return (
        <div className={`flex flex-col justify-center items-center`}>


            <div className={`flex flex-col px-6 md:px-12`}>
                <Heading className={`text-center pt-4`} as="h1">Daily Feature</Heading>
                <BigNewsCell />
            </div>

            <div  >

                <Heading as="h2" marginTop="5">
                    Latest articles
                </Heading>
                <Divider marginTop="5" />
                <div className={' grid  gap-4 grid-cols-2 md:grid-cols-3  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 pt-4 pb-6'}>
                {
                    newsList().map((val, index) => {
                        return (
                            <CardCell newsArticle={val} key={index} />
                        )
                    })
                }
            </div>
            </div>



            <div className={`flex flex-row`}>
                <h1 className={'font-black text-xl'}>Discover</h1>
            </div>

           <div className="flex justify-center">
           <div className={' grid px-2 sm:px-0 gap-4 grid-cols-2 md:grid-cols-3   lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 pt-4 pb-6'}>
                {
                    newsList().map((val, index) => {
                        return (
                            <CardCell newsArticle={val} key={index} />
                        )
                    })
                }
            </div>
           </div>


        </div>
    )
}

export default Index





