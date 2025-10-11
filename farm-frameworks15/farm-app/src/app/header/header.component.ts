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
  role: string | null = null; // 👈 track role
  isLoggingOut = false; // 👈 loader state
  isDarkMode = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private message: NzMessageService
  ){}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status

      const savedTheme = localStorage.getItem('theme');
      this.isDarkMode = savedTheme === 'dark';
      this.applyTheme();
    })

    this.authService.username$.subscribe(name => {
      this.username = name
    })
    // 👇 subscribe to role from AuthService (if you expose it)
    this.authService.role$.subscribe(role => {
      this.role = role;
    });

    // OR fetch directly from localStorage if not streaming it:
    // const storedUser = localStorage.getItem("user");
    // if (storedUser) {
    //   try {
    //     const user = JSON.parse(storedUser);
    //     this.role = user?.role || null;
    //   } catch (err) {
    //     console.error("Invalid user object:", err);
    //   }
    // }
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
  this.isLoggingOut = true;

  this.authService.logOut().subscribe({
    next: () => {
      this.message.success("✅ Logged out successfully");
      this.authService.clearAuth();
    },
    error: (err) => {
      this.isLoggingOut = false; // stop loader
      this.message.error("❌ Logout failed: " + (err.error?.message || err.statusText));
      console.error("Logout API error:", err);
    },
    complete: () => {
      this.isLoggingOut = false;
    }
  });
}


      cancel(): void {
        this.message.info('Action cancelled');
    }
  // logOut(){
  //   this.authService.logOut()
  //   this.router.navigate(["/login"])
  // }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme(): void {
    if (this.isDarkMode) {
      document.body.classList.add('dark-theme');
      document.getElementById('iconLight')?.classList.add('d-none');
      document.getElementById('iconDark')?.classList.remove('d-none');
    } else {
      document.body.classList.remove('dark-theme');
      document.getElementById('iconLight')?.classList.remove('d-none');
      document.getElementById('iconDark')?.classList.add('d-none');
    }
  }
}
