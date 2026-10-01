import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(
      '/users/login',
      {
        email: email,
        password: password
      }
    );
  }

  signup(name: string, email: string, password: string) {
    return this.http.post(
      '/users',
      {
        name: name,
        email: email,
        password: password
      }
    );
  }
}