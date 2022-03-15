import React from "react";

function ArticleInfo(props : {articleID:string}) {
    return (
        <div>
            {props.articleID}
        </div>
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