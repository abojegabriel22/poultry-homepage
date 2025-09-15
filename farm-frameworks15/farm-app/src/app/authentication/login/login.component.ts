import { Component, OnInit } from "@angular/core"
import { NgForm } from "@angular/forms"
import { Router } from "@angular/router"
import { LoginRequest, LoginResponse, UserInfo } from "src/app/models/login.model"
import { AuthService } from "src/app/services/auth.service"
import { RegisterService } from "src/app/services/register.service"

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
    constructor(
        private registerService: RegisterService,
        private router: Router,
        private authService: AuthService
    ){}
    
    ngOnInit(): void {
        const expiration = localStorage.getItem("token_expire")
        if(expiration){
            const expiresIn = +expiration - Date.now()
            if(expiresIn > 0){
                this.setAutoLogout(expiresIn) // still valid
            } else {
                this.logout() // expires already
            }
        }
    }

    user: LoginRequest = new LoginRequest("","")
    errorMessage: string = ""
    successMessage: string = ""
    isLoading: boolean = false
    logoutTimer: any

    submitForm(form: NgForm){
        this.errorMessage = ""
        this.successMessage = ""
        this.isLoading = true
        // console.log("Submitting form...")

        if(form.invalid){
            this.isLoading = false
            console.error("Form is invalid")
            return
        }
        // console.log("form submitted: ", this.user.username)
        this.registerService.loginUser(this.user).subscribe({
            next: (res: LoginResponse) => {
                this.isLoading = false
                // console.log("Login successful: ", res)
                this.successMessage = res.message

                this.authService.login(res.user, res.token)
                // store token in local storage
                // localStorage.setItem("token", res.token)
                // localStorage.setItem("user", res.user)

                // store token expiry (one hour time)
                const tokenExpiry = Date.now() + 60 * 60 *1000
                localStorage.setItem("token_expire", tokenExpiry.toString())

                this.setAutoLogout(60 * 60 * 1000)

                // redirect to dashboard based on role after 2 seconds
                setTimeout(() => {
                    if(res.user.role === "admin"){
                        this.router.navigate(["/admin-dashboard"])
                    } else {
                        this.router.navigate(["/user-dashboard"])
                    }
                }, 2000)
            }, error: (err) => {
                this.isLoading = false
                console.error("Login failed: ", err)
                this.errorMessage = err?.error?.message || "An error occurred during login"
            }
        })
    }

    setAutoLogout(duration: number){
        if(this.logoutTimer){
            clearTimeout(this.logoutTimer)
        }
        this.logoutTimer = setTimeout(()=>{
            this.logout()
        }, duration)
    }

    logout(){
        localStorage.removeItem("selectedBatch")
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        localStorage.removeItem("token_expire")

        this.router.navigate(["/login"])
    }
}