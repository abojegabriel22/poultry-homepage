import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false
  username: string | null = null

  constructor(
    private router: Router,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status
    })

    this.authService.username$.subscribe(name => {
      this.username = name
    })
  }

  // checkAut(){
  //   const userData = localStorage.getItem("user")
  //   if(userData){
  //     const user = JSON.parse(userData)
  //     this.isLoggedIn = true
  //     this.username = user?.username || user?.name || "User"
  //   } else{
  //     this.isLoggedIn = false
  //     this.username = null
  //   }
  // }

  logOut(){
    this.authService.logOut()
    this.router.navigate(["/login"])
  }
}
