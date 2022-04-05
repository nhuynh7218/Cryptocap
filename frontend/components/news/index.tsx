import React from "react";
import {Box,Heading,Link,Image,Text,Divider,HStack,Tag,SpaceProps,useColorModeValue,useColorMode } from '@chakra-ui/react';
import { ArticleInfo } from "../../interfaces/get";


export function NewsCardCell(props: { newsArticle: ArticleInfo }) {
    const { colorMode, toggleColorMode } = useColorMode();

    const { newsArticle } = props
    return (
        <div className="flex flex-col">
            <Link  href={newsArticle.url} rel="noreferrer" target="_blank" className={` w-full text-center text-bold  py-2 ${colorMode == "light" ? 'bg-green-400 hover:bg-green-300 ' : 'bg-green-700 hover:bg-green-600' } rounded-t-md`}>Source</Link>
    
        <div className={`${colorMode == 'light' ? 'hover:bg-gray-300 bg-gray-100 text-black ' : 'hover:bg-gray-600 bg-gray-700 text-gray-100 '} flex justify-center delay-50 duration-100   p-5 rounded-b-lg w-40 md:w-60 lg:w-72 group shadow-2xl`}>
            
            <Link href={`news/article/${props.newsArticle._id}`}>

                <div className="" >
                
                    <Image src={newsArticle.image} className=" shadow-2xl rounded hover:scale-105 duration-500 transition-all"></Image>

               
                    <h1 className="font-bold text-lg underline  mt-5 line-clamp-3">{newsArticle.title}</h1>
                    {/* <h1 className="font-bold text-lg mt-5">{newsArticle.author}</h1> */}

                    <h1 className="font-bold text-sm  line-clamp-4 ">{`${newsArticle.description}`}</h1>
                    <button onClick={()=> {}} className="pt-4">
                        <BlogTags tags={['BTC', 'GLOBAL']} />
                    </button>

                </div>
            </Link>

        </div>
        </div>
    )
}
const BlogAuthor = (props : {name: string, date: Date}) => {
    return (
        <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
            {/* <Image
                borderRadius="full"
                boxSize="40px"
                src=""
                alt={`Avatar of ${props.name}`}
            /> */}
            <Text fontWeight="medium">{"Source: " +props.name}</Text>
            <Text>—</Text>
            <Text>{props.date.toLocaleDateString()}</Text>
        </HStack>
    );
};
function BigNewsCell(props: { newsArticle: ArticleInfo }) {
    const { colorMode, toggleColorMode } = useColorMode();

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
                    <Link href={`news/article/${props.newsArticle._id}`} textDecoration="none" _hover={{ textDecoration: 'none' }}>
                        <Image
                            borderRadius="lg"
                            src={
                               props.newsArticle.image
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
                <Link className = "py-3" href={`news/article/${props.newsArticle.source}`}  rel="noreferrer" target="_blank" textDecoration="none" _hover={{ textDecoration: 'none' }}>
                    <button className={`rounded px-4 py-1 font-black ${colorMode == "light" ? 'bg-green-400 hover:bg-green-300 ' : 'bg-green-700 hover:bg-green-600' }`}>Source</button>
                </Link>
                <BlogTags tags={['BTC', 'GLOBAL']} />
                <Heading marginTop="1">
                    <Link  href={`news/article/${props.newsArticle._id}`}  textDecoration="none" _hover={{ textDecoration: 'none' }}>
                        {props.newsArticle.title}
                    </Link>
                </Heading>
                <Text
                    className=" line-clamp-6"
                    as="p"
                    marginTop="2"
                    color={useColorModeValue('gray.700', 'gray.200')}
                    fontSize="lg">
                    {props.newsArticle.description}
                </Text>
                <BlogAuthor name={props.newsArticle.source} date={new Date(props.newsArticle.published)} />
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



function Index(props: {articles: ArticleInfo[], randomArticles: ArticleInfo[]}) {
   
  
    return (
        <div className={`flex flex-col justify-center items-center overflow-y-hidden`}>
            <div className={`flex flex-col px-6 md:px-12`}>
                <Heading className={`text-center pt-4`} as="h1">Daily Feature</Heading>
                <BigNewsCell newsArticle={props.articles[0]}/>
            </div>
            <div>
                <div className=" flex flex-row pt-6">
                    <h1 className="font-black text-3xl px-4">Latest articles</h1>
                    <Link href="/news/sort/latest" className=" font-normal text-xs pl-2 animate-bounce  "><h1 className="text-purple-500">More</h1></Link>
                </div>
                <Divider marginTop="5" />
                <div className={' grid  gap-4 grid-cols-2 sm:grid-cols-3  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 pt-4 pb-6'}>
                    {
                        props.articles.slice(1).map((val, index) => {
                            return (
                                <NewsCardCell newsArticle={val} key={index} />
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
                        props.randomArticles.map((val, index) => {
                            return (
                                <NewsCardCell newsArticle={val} key={index} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Index





