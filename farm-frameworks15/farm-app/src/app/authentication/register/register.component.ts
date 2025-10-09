import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Register } from "src/app/models/register.model";
import { RegisterService } from "src/app/services/register.service";
import { Router } from "@angular/router";
@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.css", "../login/login.component.css"]
})
export class RegisterComponent implements OnInit {

    constructor(
        private registerService: RegisterService,
        private router: Router
    ){}

    ngOnInit(): void {}

    user = new Register("","","","","","")
    successMessage: string = ""
    errorMessage: string = ""
    isLoading: boolean = false


    submitForm(form: NgForm){
        this.successMessage = ""
        this.errorMessage = ""
        this.isLoading = true
        console.log("Submitting form...")

        if(form.invalid || this.user.password !== this.user.confirmPassword){
            this.isLoading = false
            console.error("Form is invalid ❌")
            this.errorMessage = "please fill all the required fields correctly"
            return
        }

        // create payload object without confirmPassword

        const { confirmPassword, ...payload } = this.user
        console.log("Form is valid: ", payload)

        console.log(form.value)
        // call service
        this.registerService.registerUser(payload).subscribe({
            next: (res: any) => {
                this.isLoading = false
                this.successMessage = res.message
                console.log("User registered successfully ", res)
                // navigate to email verification page
                setTimeout(() => {
                    this.router.navigate(["/verify"], {queryParams: {email: this.user.email}})
                }, 2000)
            }, error: (err) => {
                this.isLoading = false
                console.error("Error registering user: ", err)
                this.errorMessage = err?.error?.message || "An error occurred while registering the user"
            }
        })
    }
}