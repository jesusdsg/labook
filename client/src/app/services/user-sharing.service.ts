import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserSharingService {
  public username: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(public authService: AuthService) {
    type DecodedToken = {
      id: number;
      username: string;
      rol_id: number;
    }
    const token = localStorage.getItem('token');
    if (token) {
      if (this.authService.isAuth()) {
        this.isLogged.next(true);
        const decodedToken = decode<DecodedToken>(token);
        if (decodedToken) {
          this.username.next(decodedToken.username);
        }

      }

    }
   }
}
