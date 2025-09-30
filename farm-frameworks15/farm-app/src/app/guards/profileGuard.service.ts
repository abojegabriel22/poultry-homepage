import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable()

export class ProfileGuardService implements CanActivate {
    token: string | null = ''

    constructor(
        private router: Router
    ){}

    canActivate(): boolean {
        this.token = localStorage.getItem("token")
        if(this.token == null){
            this.router.navigate(['/login'])
            return false
        }
        return true
    }
}