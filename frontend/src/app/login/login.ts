import { Component,signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = "";
  password = "";
  emailError = signal("");
  passwordError = signal("");

  constructor(private auth: Auth,
     private router: Router
  ){

  }

  login() {
  this.emailError.set('');
  this.passwordError.set('');

  if (!this.email.trim()) {
    this.emailError.set('Email is required');
  }

  if (!this.password.trim()) {
    this.passwordError.set('Password is required');
  }

  if (this.emailError() || this.passwordError()) {
    return;
  }

  console.log("Login button clicked");

  this.auth.login(this.email, this.password).subscribe({
    next: response => {
      console.log(response);
      this.router.navigate(['/studentdashboard']);
    },

    error: error => {
      this.emailError.set('');
      this.passwordError.set('');

      const errors = error.error.errors;

      if (errors.email) {
        this.emailError.set(errors.email[0]);
      }

      if (errors.password) {
        this.passwordError.set(errors.password[0]);
      }
    }
  });
}
goToSignup() {
  this.router.navigate(['/signup']);
}
}
