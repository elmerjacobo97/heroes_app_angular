import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Auth } from '../../../auth/interfaces/auth.interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent {
  get auth() {
    return this.authService.auth;
  }

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}
