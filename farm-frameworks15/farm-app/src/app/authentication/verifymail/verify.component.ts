import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { VerifyRequest } from "src/app/models/verify.model";
import { RegisterService } from "src/app/services/register.service";
@Component({
    selector: "app-verify-mail",
    templateUrl: "./verify.component.html",
    styleUrls: ["./verify.component.css"]
})
export class VerifyMailComponent implements OnInit{
    email: string = '';
    code: string = '';
    isLoading = false;
    successMessage = '';
    errorMessage = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private registerService: RegisterService,
        private message: NzMessageService
    ){}

    ngOnInit(): void {
        this.route.queryParams.subscribe(
            params => {
                this.email = params['email'] || ''
            }
        )
    }

    verifyCode(){
        this.errorMessage = ''
        this.successMessage = ''

        if(!this.code || this.code.trim().length !== 6){
            this.errorMessage = "Please enter a valid 6-digit code."
            return
        }

        const payload: VerifyRequest = { email: this.email, code: this.code.trim() }
        this.isLoading = true
        this.registerService.verifyEmail(payload).subscribe({
            next: (res) => {
                this.isLoading = false
                this.successMessage = res.message || '✅ Verification successful!'
                this.message.success(this.successMessage)
                setTimeout(() => {
                    this.router.navigate(['/login'])
                }, 2000)
            }, error: (err) => {
                this.isLoading = false
                this.errorMessage = err.error?.message || '❌ Verification failed. Please try again.'
                this.message.error(this.errorMessage)
            }
        })
    }

    resendCode() {
        this.registerService.resendCode(this.email).subscribe({
            next: (res) => this.message.success(res.message || 'A new code has been sent to your email.'),
            error: (err) => this.message.error(err.message || err.error.message || 'Failed to resend code.')
        });
    }
}