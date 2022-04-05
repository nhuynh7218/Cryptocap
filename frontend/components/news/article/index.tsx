import React, { useEffect, useState } from "react";
import { Divider, Image, Link, Spinner } from "@chakra-ui/react"
import { motion } from "framer-motion";
import { APIService } from "../../../services/APIService";
import { ArticleInfo } from "../../../interfaces/get";
import { NewsCardCell } from "..";
export default function Article(props: {article: ArticleInfo}) {
    const [relatedArticle, setRelated] = useState<ArticleInfo[] | null>(null)
    useEffect(()=>{
        async function getRelated() {
            const articles = await APIService.GetLatestNews(2,10)
            setRelated(articles) 
        }
        getRelated()
        
    }, [])
    let article = props.article
    let d = new Date(article.published)
    const [totalVotes, setVotes] = useState(article.votes ?? 99)
    const container = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
          transition: {
            staggerChildren: 0.025
          }
        }
      };
      async function k () {
          await APIService.GetLatestNews(1,10)
      }
    return (
        <div className="flex flex-col items-center space-y-4 py-4">
           
            <div className=" font-black text-center">
                <motion.p animate={{x: ["-700%", "0%"]}} transition={{duration: 0.75}}>{d.toDateString()}</motion.p>
                <motion.p animate={{x: ["700%", "0%"]}} transition={{duration: 0.75}}> 4 Mins Ago</motion.p>
            </div>
            <motion.p animate={{y: ["-700%", "80%","-30%", "0%"]}} transition={{duration: 1, delay:0.75}} className=" font-extrabold text-2xl underline">{article.title}</motion.p>
<motion.div animate={{scale:[0,1]}} transition={{duration: 0.55, delay:0.75}}>
<Image width={350} height={300} src={article.image} className=" shadow-2xl rounded  duration-500 transition-all"></Image>

</motion.div>
           <div className="flex flex-col">
            {/* <Link className=" font-bold text-md "> <SplitText 
                initial={{ y: '100%' }}
                animate="visible"
                variants={{
                  visible: (i: number) => ({
                    y: 0,
                    transition: {
                      delay: i * 0.33
                    }
                  })
                }}
              >
              {"By: " + article.author}
              </SplitText></Link> */}
              <Link href={`/article/${article.source}`}  rel="noreferrer" target="_blank" className=" font-bold text-md "> <SplitText 
                initial={{ y: '100%' }}
                animate="visible"
                variants={{
                  visible: (i: number) => ({
                    y: 0,
                    transition: {
                      delay: i * 0.33
                    }
                  })
                }}
              >
             {"Source: " + article.source}
              </SplitText></Link>
           </div>


            <div className="flex flex-row justify-between space-x-4">
                <button onClick={() => setVotes(totalVotes +1 )}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-green-400" fill="green" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg></button>
                <p className="font-black text-md cursor-default transition-all">{totalVotes}</p>
                <button onClick={() => setVotes(totalVotes - 1 )}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-pink-400" fill="red" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                </svg></button>

            </div>
            <div className="font-semibold   px-10 md:px-20 lg:px-0 lg:w-3/4 xl:w-3/5">
           
            </div>
     
            <motion.p initial={container.hidden}  animate={container.visible} variants={container} className="font-semibold  text-center  px-10 md:px-20 lg:px-0 lg:w-3/4 xl:w-3/5 ">
                {article.description}
            </motion.p>
            <Divider  className="py-6 mx-5"/>

            <div className="flex flex-col justify-center">
                {relatedArticle ? 
                <div>
                    <h1 className="w-full font-black text-lg">Related</h1>
                <div className={' grid px-2 sm:px-0 gap-4 grid-cols-2 md:grid-cols-3   lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 pt-4 pb-6'}>
                    {
                        relatedArticle.map((val, index) => {
                            return (
                                <NewsCardCell newsArticle={val} key={index} />
                            )
                        })
                    }
                </div> 
                </div>
                :
                <div>
                    
                    <Spinner
                                thickness='4px'
                                speed='0.65s'
                                emptyColor='gray.200'
                                color='blue.500'
                                size='xl'
                            />
                </div>
                }
            </div>

        </div>
    )
}
//@ts-ignore
function SplitText({ children, ...rest }) {
    let words = children.split(' ')
    return words.map((word: string, i: number) => {
      return (
        <div 
          key={children + i}
          style={{ display: 'inline-block', overflow: 'hidden' }}
        >
          <motion.div
           
            {...rest}
            style={{ display: 'inline-block', willChange: 'transform' }}
            custom={i}
          >
            {word + (i !== words.length - 1 ? '\u00A0' : '')}
          </motion.div>
        </div>
      )
    })
  }