
export interface VerifyRequest {
    email: string,
    code: string
}

export interface VerifyResponse {
    message: string
}