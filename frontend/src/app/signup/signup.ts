import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  name = "";
  email = "";
  password = "";
  nameError =signal("");
  emailError= signal("");
  passwordError= signal("");


  constructor(private auth: Auth,
    private router: Router
  ){
  }
  signup(){
    this.nameError.set("");
    this.emailError.set("");
    this.passwordError.set("");

    
  if(!this.name.trim()){
    this.nameError.set("Name is required");
  }
   if (!this.email.trim()) {
    this.emailError.set('Email is required');
  }

  if (!this.password.trim()) {
    this.passwordError.set('Password is required');
  }

  if (
    this.nameError() ||
    this.emailError() ||
    this.passwordError()
  ) {
    return;
  }

    this.auth.signup(this.name,this.email,this.password).
    subscribe(
      {
        next: response=>{
          console.log(response);
          this.router.navigate(['/login']);
        },error: error=>{
          this.nameError.set("");
          this.emailError.set("");
          this.passwordError.set("");

          const errors = error.error.errors;

        if(errors.name){
          this.nameError.set(errors.name[0]);
        }
        if(errors.email){
          this.emailError.set(errors.email[0]);
        }
        if(errors.password){
          this.passwordError.set(errors.password[0]);
        }
        }
      }
    )
  }
  goToLogin() {
  this.router.navigate(['/login']);
}


}
