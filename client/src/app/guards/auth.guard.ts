import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {

    //Cheking with the auth service if the user is logged in and token expired
    if (!this.authService.isAuth()) {
      //console.error('Invalid Token!');
      this.router.navigate(['/login']);
      return false;
      
    }
    else {
      return true;
    }
  }
  
}
