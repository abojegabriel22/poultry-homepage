import { Component } from "@angular/core"
import { NgForm } from "@angular/forms"
import { Router } from "@angular/router"
import { LoginRequest, LoginResponse, UserInfo } from "src/app/models/login.model"
import { RegisterService } from "src/app/services/register.service"

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent {
    constructor(
        private registerService: RegisterService,
        private router: Router
    ){}

    user: LoginRequest = new LoginRequest("","")
    errorMessage: string = ""
    successMessage: string = ""
    isLoading: boolean = false

    submitForm(form: NgForm){
        this.errorMessage = ""
        this.successMessage = ""
        this.isLoading = true
        console.log("Submitting form...")

        if(form.invalid){
            this.isLoading = false
            console.error("Form is invalid")
            return
        }
        console.log("form submitted: ", this.user)
        this.registerService.loginUser(this.user).subscribe({
            next: (res: LoginResponse) => {
                this.isLoading = false
                console.log("Login successful: ", res)
                this.successMessage = res.message

                // store token in local storage
                localStorage.setItem("token", res.token)
                localStorage.setItem("user", JSON.stringify(res.user))

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
}