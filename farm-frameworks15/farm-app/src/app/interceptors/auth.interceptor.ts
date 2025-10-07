import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs"
import { AuthService } from "../services/auth.service";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable()

export class AuthInterceptor implements HttpInterceptor{
    constructor(
        private authService: AuthService,
        private message: NzMessageService
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        // attach token to all outgoing requests 
        const token = localStorage.getItem("token")
        let clonedReq = req
        if(token){
            clonedReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            })
        }

        return next.handle(clonedReq).pipe(
            catchError((error: HttpErrorResponse) => {
                // if token is expired or invvalid (401 / 403) 
                if(error.status === 401 || error.status === 403 || error.status === 500){
                    this.message.warning("Session expired. Please login again!")
                    this.authService.clearAuth()
                } return throwError(() => error)
            })
        )
    }
}