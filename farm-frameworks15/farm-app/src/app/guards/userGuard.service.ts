import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable()

export class UserGuardService implements CanActivate {
    token: string | null = ''
    user:any = null

    constructor(
        private router: Router
    ){}

    canActivate(): boolean {
        this.token = localStorage.getItem("token")
        const storedUser = localStorage.getItem("user");

        // ✅ parse user safely
        if (storedUser) {
            try {
                this.user = JSON.parse(storedUser);
            } catch (err) {
                console.error("Invalid user object in localStorage:", err);
                this.user = null;
            }
        }

        if(this.token == null){
            this.router.navigate(['/login'])
            return false
        }

        if(this.token !== null && this.user?.role === "user"){
            this.router.navigate(['/user-dashboard'])
            return false
        }
        if(this.token !== null && this.user?.role === "admin"){
            return true
        }
        return true
    }
}