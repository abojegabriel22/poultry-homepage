import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';

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
    private authService: AuthService,
    private message: NzMessageService
  ){}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status
    })

    this.authService.username$.subscribe(name => {
      this.username = name
    })
  }
  closeNavbar(){
    const navbar = document.getElementById('navbarNavAltMarkup');
    if (navbar && navbar.classList.contains('show')) {
      navbar.classList.remove('show');
    }
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

  confirm(): void {
    this.authService.logOut()
    this.router.navigate(["/login"])
  }

      cancel(): void {
        this.message.info('Action cancelled');
    }
  // logOut(){
  //   this.authService.logOut()
  //   this.router.navigate(["/login"])
  // }
}
