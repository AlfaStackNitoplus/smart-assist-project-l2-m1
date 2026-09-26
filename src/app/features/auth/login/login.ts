import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { UserService } from '../../../core/services/user.service';
import { UserRole } from '../../../core/models/user.model';
import { MockData } from '../../../assets/mock-data';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  private router = inject(Router);
  private userService = inject(UserService);
  private authService = inject(Auth);

  username = '';
  password = '';
  isLoading = false;

  onLogin() {

    if (!this.username || !this.password) {
      alert('Please enter email and password');
      return;
    }

    this.isLoading = true;

    const request = {
      email: this.username,
      password: this.password
    };

    this.authService.login(request).subscribe({
      next: (response) => {

        this.isLoading = false;

        if (!response.success) {
          alert(response.message || 'Login failed');
          return;
        }

        // Store token
        localStorage.setItem(
          'accessToken',
          response.token.accessToken
        );

        localStorage.setItem(
          'refreshToken',
          response.token.refreshToken
        );

        // Store user in shared UserService
        this.userService.setCurrentUser(response.user);

        // Navigate based on role
        const route = this.getRouteByRole(response.user.role);

        this.router.navigate([route]);
      },

      error: (error) => {

        this.isLoading = false;

        console.error('Login API error:', error);

        alert(
          error?.error?.message ||
          'Unable to login. Please try again.'
        );
      }
    });
  }

private getRouteByRole(role: UserRole): string {
  // Use standard JS switch inside TypeScript methods
  switch (role) {
    case UserRole.SUPERVISOR: 
      return '/supervisor';
    case UserRole.SUPPORT_ENGINEER: 
      return '/support';
    default: 
      return '/user';
  }
}
}