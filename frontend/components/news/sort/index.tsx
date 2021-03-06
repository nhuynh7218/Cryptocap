import { Spinner, useColorMode } from "@chakra-ui/react";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { NewsCardCell } from "..";
import { ArticleInfo } from "../../../interfaces/get";
import { APIService } from "../../../services/APIService";

export function SortedArticles() {
    const { colorMode, toggleColorMode } = useColorMode();
    // Check if an api call is in progress
    const [loading, setLoading] = useState(false)
    const [sortedArticles, setSortedArticles] = useState<ArticleInfo[]>([])
    // IsMax is true if all results has been returned
    const [isMax, setMax] = useState(false)
    // Tracks current page
    const [currentPage, setPage] = useState(1)
    async function fetchArticles(page: number, limit: number) {
        // if is max, stop api call to save resources
        if(isMax){return}
        // Else show loading spinner and disable button to prevent duplicate api calls
        setLoading(true)
        const articles = await APIService.GetLatestNews(page,limit)
        // If return returns 0, we have reached max page. 
        if (articles.length == 0) {
            setMax(true)
            return
        }
        // Else concat the existing article array with new array
        const newArticle = _.concat(sortedArticles, articles)
        // set the old array with new concatted array
        setSortedArticles(newArticle)
        // update page
        setPage(currentPage + 1)
        // set loading to false, request is now finished
        setLoading(false)
    }
    useEffect(()=> {
        fetchArticles(currentPage,10)
       
    }, [])
    return (
        <div className="flex flex-col justify-center">
        {sortedArticles.length !==0 ? 
        <div className="flex flex-col items-center">
            <h1 className="w-full font-black text-lg text-center pt-4">Related</h1>
        <div className={' grid px-2 sm:px-0 gap-4 grid-cols-2 md:grid-cols-3   lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 pt-4 pb-6'}>
            {
                sortedArticles.map((val, index) => {
                    return (
                        <NewsCardCell newsArticle={val} key={index} />
                    )
                })
            }
          
        </div> 
        {!isMax && 
            <div className="py-4">
                {
                    !loading ? 
                    <button onClick={async() => await fetchArticles(currentPage, 10)} className={`${colorMode == "light" ? 'bg-green-400 hover:bg-green-300 ' : 'bg-green-800 hover:bg-green-700' } font-black p-3 rounded `}>
                        Load More
                    </button>  
                    :
                    <button className={`${colorMode == "light" ? 'bg-green-400 hover:bg-green-300 ' : 'bg-green-800 hover:bg-green-700' } font-black p-3 px-6 rounded`}>
                         <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='lg'
                    />
                    </button>  
                }
            </div>
        }
        </div>
        :
        <div className="text-center">
            
            <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    />
            <h1 className="font-black">Fetching Articles...</h1>
        </div>
        }
    </div>
    )
}