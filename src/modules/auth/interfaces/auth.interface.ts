export interface AuthorizationPayload {
    userId: string
    username: string
    name: string
    role: string
    roleId: string
    iat: number
    exp: number
}


export interface PayloadUser {
    userId: string
    username: string
    name: string
    role: string
    roleId: string
}