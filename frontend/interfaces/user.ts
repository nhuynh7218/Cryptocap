export interface User {
    isOurUser: boolean
    email: string,
    password: string,
    token: string,
    token_expiration: Date
}