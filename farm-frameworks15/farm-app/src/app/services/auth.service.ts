
import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"
import { UserInfo } from "../models/login.model"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { environment } from "src/environments/environment"
import { Router } from "@angular/router"

@Injectable()

export class AuthService{
    private loggedIn = new BehaviorSubject<boolean>(false)
    private username = new BehaviorSubject<string | null>(null)
    private role = new BehaviorSubject<string | null>(null)

    isLoggedIn$ = this.loggedIn.asObservable()
    username$ = this.username.asObservable()
    role$ = this.role.asObservable()

    constructor(
        private http: HttpClient,
        private router: Router
    ){
        this.checkAut()
    }

    getAuthHeaders(): HttpHeaders {
        const token = localStorage.getItem("token")
        return new HttpHeaders({
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json"
        })
    }

    checkAut(){
        const userData = localStorage.getItem("user")
        if(userData){
            const user = JSON.parse(userData)
            this.loggedIn.next(true)
            this.username.next(user?.username || user?.name || "User")
            this.role.next(user?.role || "user")
        } else{
            this.loggedIn.next(false)
            this.username.next(null)
            this.role.next(null)
        }
    }

    login(user: UserInfo, token: string){
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem("token", token)
        this.loggedIn.next(true)
        this.username.next(user?.username || user?.name || "User")
        this.role.next(user?.role || "user")
    }

    logOut() {
        const headers = this.getAuthHeaders()
        // const token = localStorage.getItem("token");
        // if (token) {
        //     const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
        //     return this.http.post(`${environment.poultryApiUrl}/auth/logout`, {}, { headers });
        // } else {
            // return an empty observable if no token
            return this.http.post(`${environment.poultryApiUrl}/auth/logout`, {}, {headers});
        // }
    }

    clearAuth(){
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        localStorage.removeItem("selectedBatch")
        localStorage.removeItem("token_expire")
        localStorage.removeItem("purchaseId")
        this.loggedIn.next(false)
        this.username.next(null)
        this.role.next(null)
         // 👇 Redirect user back to login page
        this.router.navigate(["/login"]);
    }
}