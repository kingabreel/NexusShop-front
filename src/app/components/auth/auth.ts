import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthService } from '../../shared/service/auth-service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  isLogin: boolean = true;

  loginForm: FormGroup;
  registerForm: FormGroup;
  hidePassword: boolean = true;

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cellphone: [''],
      password: ['', Validators.required]
    });

    this.authService.handleGoogleCallback()
      .then((data: any) => {

        console.log('Handling Google callback', data);
        if (data?.idToken) {
          this.loginWithGoogle(data.idToken);
        }
      });
  }

  toggleMode() {
    this.isLogin = !this.isLogin;
  }

  callGoogleApi() {
    this.authService.startGoogleLogin();
  }

  loginWithGoogle(token: string) {
    this.authService.loginWithGoogle(token).subscribe({
      next: () => {

      },
      error: (error) => {
        console.error('Google login failed:', error);
      }
    });
  }

  submitLogin() {
    if (this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.openSnackBar(this.getMessage(error));
      }
    });
  }

  submitRegister() {
    if (this.registerForm.invalid) return;

    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
      },
      error: (error) => {
        this.openSnackBar(this.getMessage(error));
      }
    });
  }

  openSnackBar(error: string) {
    this._snackBar.open(error, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3 * 1000
    });
  }

  // TODO: Put this into an helper / error handling service
  getMessage(error: any): string {
    if (error.status === 0) {
      return 'Unable to connect to the server. Please check your internet connection.';
    } else if (error.status >= 500) {
      return 'Server error occurred. Please try again later.';
    } else if (error.status === 401) {
      return 'Invalid email or password. Please try again.';
    } else if (error.error && error.error.message) {
      return error.error.message;
    } else {
      return 'An unexpected error occurred. Please try again.';
    }
  }

  toHome(): void {
    this.router.navigate(['/']);
  }
}
