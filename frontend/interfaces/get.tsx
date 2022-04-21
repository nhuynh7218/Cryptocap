export interface ArticleInfo {
    _id: string,
    published: Date,
    author: string,
    content: string,
    upvote: number,
    downvote: number,
    totalVotes:number,
    title: string,
    url: string,
    description : string,
    tags : string[]
    image: string,
    source: string,
    clicks: number,
    votes: number
}

