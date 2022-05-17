import axios from "axios";
import { ArticleInfo, TokenInfo } from "../interfaces/get";
interface APIFormat<T> {
    news: T
    msg: string

}
interface APIFormat2<T> {
    result: T
    msg: string

}
interface APIPagingFormat<T> {
    news: T
    msg: string,
    page: number,
    showing: number,
    limit: number

}
interface TokenPagingFormat<T> {
    coins: T
    msg: string,
    page: number,
    showing: number,
    total_number: number

}
export interface Result {
    _id: string;
    email: string;
}

export interface UserApiFormat {
    msg: string;
    result: any;
    token_expiration: number;
    token: string;
}
export class APIService {
    
    public static readonly  baseURL: string = process.env.NODE_ENV == "production" ? "https://api.cryptocap.digital" : "https://api.cryptocap.digital"
    static async SignUp(email: string, password: string) : Promise<UserApiFormat> {
        const req = await axios.post<UserApiFormat>(this.baseURL + "/register",{
            email: email,
            password: password
        })
        const data = req.data
        console.log(data)
        return data
    }
    static async LogIn(email: string, password: string) : Promise<UserApiFormat>{
        const req = await axios.post<UserApiFormat>(this.baseURL + "/login",{
            email: email,
            password: password
        })
        const data = req.data
        console.log(data)
        return data
    }
    static async GetUserInfo(token: string) : Promise<any> {
        try {
            const req = await axios.get<any>(this.baseURL + "/user/"+token)
            const data = req.data
            if (data.msg == "Invalid token.") {
                throw new Error(data.msg)
            }
            console.log(data)
            return data
        } catch (error: any) {
            throw new Error(error)
        }
       
    }
    static async GetTokens(page: number, limit: number = 10) : Promise<{tokens: TokenInfo[], total : number}> {
        try {
            const req = await axios.get<TokenPagingFormat<TokenInfo[]>>(this.baseURL + "/coins", {
                params: {
                    page: page,
                    limit: limit
                }
            })
            const data = req.data
            if (data.msg.toLocaleLowerCase() !== 'success') {
                throw new Error('Server Error')
            }
            return {tokens : data.coins, total: data.total_number}
        } catch (error) {
            console.log(error)
            throw new Error()
        }
    }
    static async GetTokenBySymbol(symbol: string) : Promise<TokenInfo>{
        try {
            const req = await axios.get<any>(this.baseURL + "/coins/"+symbol.toLocaleLowerCase(), {
               
            })
            const data = req.data
            if (data.msg.toLocaleLowerCase() !== 'success') {
                throw new Error('Server Error')
            }
            return data.result
        } catch (error) {
            console.log(error)
            throw new Error()
        }
    }
    static async VoteArticle(isUpvote: boolean, articleID: string): Promise<void> {
        const req = await axios.post(this.baseURL + `/news/${isUpvote ? 'upvote' : 'downvote'}/` + articleID)
        console.log(req.data)
    }
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
        console.log("article id", articleID)
        const req = await axios.get<APIFormat2<ArticleInfo>>(this.baseURL + "/news/"+articleID, {
           params : {

           }
        })
        const data = req.data
        if (req.data.msg.toLocaleLowerCase() !== "success"){
            throw new Error()
        }
        return data.result

    }
}
