export interface AuthorizationPayload {
    id: number
    username: string
    companyId: number
    role: string
    iat: number
    exp: number
}


export interface PayloadUser {
    userId: string
    username: string
    name: string
    role: string
}