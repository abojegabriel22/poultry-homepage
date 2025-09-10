
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { environment } from "src/environments/environment";
import { Register } from "../models/register.model";
import { LoginRequest, LoginResponse } from "../models/login.model";

@Injectable()

export class RegisterService{
    constructor(
        private http: HttpClient
    ){}

    registerUser(user: Omit <Register, "confirmPassword">): Observable<Register>{
        return this.http.post<Register>(`${environment.poultryApiUrl}/register`, user)
    }

    // login method
    loginUser(user: LoginRequest): Observable<LoginResponse>{
        return this.http.post<LoginResponse>(`${environment.poultryApiUrl}/login`, user)
    }
}