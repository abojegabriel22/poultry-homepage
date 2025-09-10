
export class LoginRequest {
    constructor(
        public username: string,
        public password: string
    ){}
}

// userInfo 
export class UserInfo {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public username: string,
        public role: string,
        public createdAt: string,
        public updatedAt: string,
        public lastLogin: string,
        public auth: boolean
    ){}
}

// login response
export class LoginResponse {
    constructor(
        public message: string,
        public token: string,
        public user: UserInfo
    ){}
}