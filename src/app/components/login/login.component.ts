import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { AuthService } from '../../services/auth.service';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    MessageModule,
    PasswordModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, ingrese todos los campos.';
      return;
    }

    this.isLoading = true;
    this.authService
      .login({ email: this.email, password: this.password })
      .subscribe({
        next: (response) => {
          console.log('Login successful, access token:', response.accessToken);
          this.router.navigate(['/dashboard']);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Login failed', error);
          this.errorMessage = 'Correo o contraseña inválidos.';
          this.isLoading = false;
        },
      });
  }
}
