import React from "react";
import Article from "../../components/news/article";

function ArticleInfo(props : {articleID:string}) {
    return (
        <Article/>
    )
}
export async function getServerSideProps(ctx: {params: any, req : Request, res: Response}) {
    try {
        const articleID : string = ctx.params['article-id']
        if (!articleID) {
            return { redirect : { destination : '/404'}}
        }
        return {props: {articleID: articleID}}
    
  
    } catch (error) {
      
        return { redirect : { destination : '/404'}}
    }
  

    
  }
export default ArticleInfo