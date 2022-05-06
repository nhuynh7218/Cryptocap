export interface StoredUserInfo {
    isOurUser: boolean
    email: string,
    token: string,
    token_expiration: number
}
export interface UserToken {
    chainID: string,
    tokenAddress : string,
    tokenDecimal: number,
    tokenSupply: number,
    tokenImg: string,
    ownerAddress: string,
    amtOwned: number,
    tokenName: string,
    tokenSymbol: string,
    
}
export interface Addresses {
    walletType: string,
    publicAddress: string
}
export interface User {
    publicAddresses : Addresses[]
    email: string,
    tokens:  UserToken[]
}

