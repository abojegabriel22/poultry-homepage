
export class Register {
    constructor(
        public name: string,
        public email: string,
        public username: string,
        public password: string,
        public role: string,
        public confirmPassword: string
    ){}
}