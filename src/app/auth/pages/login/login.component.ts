import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login().subscribe((resp) => {
      if (resp.id) {
        this.router.navigate(['/heroes/listado']);
      }
    });
  }

  ingresarSinLogin() {
    this.authService.logout();
    this.router.navigate(['/heroes/listado']);
  }
}
