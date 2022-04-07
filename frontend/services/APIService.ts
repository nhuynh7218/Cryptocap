import axios from "axios";
import { ArticleInfo } from "../interfaces/get";
interface APIFormat<T> {
    news: T
    msg: string

}
interface APIPagingFormat<T> {
    news: T
    msg: string,
    page: number,
    showing: number,
    limit: number

}
export class APIService {
    
    public static readonly  baseURL: string = process.env.NODE_ENV == "production" ? "https://api.cryptocap.digital" : "https://api.cryptocap.digital"
    
    static async GetInitialNews(): Promise<{news: ArticleInfo[], randomArticle: ArticleInfo[]}> {
        const req = await axios.get<{news: ArticleInfo[], randomarticle: ArticleInfo[], msg: string}>(this.baseURL + "/GetInitial", {
            headers: {
                // "Access-Control-Allow-Origin" : "*"
            }
        })
        const data = req.data
        if (req.data.msg.toLocaleLowerCase() !== "success"){
            throw new Error()
        }
        console.log(data)
        return {news: data.news, randomArticle: data.randomarticle}
    }
    static async GetLatestNews(page: number, limit: number): Promise<ArticleInfo[]> {
        const req = await axios.get<APIFormat<ArticleInfo[]>>(this.baseURL + "/news", {
            headers: {
                // "Access-Control-Allow-Origin" : "*"
            },
            params:{
                page: page,
                limit: limit
            }
        })
        const data = req.data
        if (req.data.msg.toLocaleLowerCase() !== "success"){
            throw new Error()
        }
        console.log(data)
        return data.news
    }
    static async GetArticle(articleID: string): Promise<ArticleInfo> {
        const req = await axios.get<APIFormat<ArticleInfo>>(this.baseURL + "/news/"+articleID, {
           params : {

           }
        })
        const data = req.data
        if (req.data.msg.toLocaleLowerCase() !== "success"){
            throw new Error()
        }
        console.log(data.news)
        return data.news

    }
}
