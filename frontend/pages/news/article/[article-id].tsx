import { DiscussionEmbed } from "disqus-react";
import React from "react";
import Article from "../../../components/news/article";
import { ArticleInfo } from "../../../interfaces/get";
import { APIService } from "../../../services/APIService";

function ArticleInfo(props : {article:ArticleInfo}) {
    return (
        <><Article {...props} /><DiscussionEmbed
            shortname='Cryptocap'
            config={{
                url: 'https://cryptocap.digital/news/article/' + props.article._id,
                identifier: 'cryptocap' + props.article._id,
                title: 'cryptocap' + props.article._id,
                language: 'eng'	
            }} /></>
    )
}
export async function getServerSideProps(ctx: {params: any, req : Request, res: Response}) {
    try {
        const articleID : string = ctx.params['article-id']
        const article = await APIService.GetArticle(articleID)
        if (!articleID) {
            return { redirect : { destination : '/404'}}
        }
        return {props: {article: article}}
    
  
    } catch (error) {
        return { redirect : { destination : '/404'}}
    }
  

    
  }
export default ArticleInfo