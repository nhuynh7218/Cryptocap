export interface ArticleInfo {
    _id: string,
    published: Date,
    author: string,
    content: string,
    upvote: number,
    downvote: number,
    totalVotes: number,
    title: string,
    url: string,
    description: string,
    tags: string[]
    image: string,
    source: string,
    clicks: number,
    votes: number
}
export interface TokenInfo {
    _id: string;
    ath: number;
    ath_change_percentage: number;
    ath_date: string;
    atl: number;
    atl_change_percentage: number;
    atl_date: string;
    circulating_supply: number;
    current_price: number;
    fully_diluted_valuation: number;
    high_24h: number;
    id: string;
    image: string;
    last_updated: string;
    low_24h: number;
    market_cap: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    market_cap_rank: number;
    max_supply: number;
    name: string;
    price_change_24h: number;
    price_change_percentage_24h: number;
    roi?: null;
    symbol: string;
    total_supply: number;
    total_volume: number;
}

export interface BasicTokenInfo {
    name: string
    marketcap: number
    latestPrice: number
    circulating_supply: number

}
