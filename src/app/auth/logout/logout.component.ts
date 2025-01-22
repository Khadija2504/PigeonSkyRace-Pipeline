import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(private authService: AuthService, private router:Router) {
  }

  logout() {
    localStorage.removeItem('token');
    setTimeout(()=> this.router.navigate(['/auth/login']));
  }

}
