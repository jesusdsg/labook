import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private uri = 'http://localhost:4000';

  constructor(private http: HttpClient, private JwtHelper: JwtHelperService) { }

  login(user: {}) {
    //Sending user to server
    return this.http.post(`${this.uri}/auth/signin`, user);
  }

  isAuth(): boolean {
    //Checking if user is authenticated
    const token = localStorage.getItem('token');
    if (token) {
      if (this.JwtHelper.isTokenExpired(token)) {
        return false;
      }
      else {
        return true;
      }
    }
    else {
      return false;
    }
  }
}
