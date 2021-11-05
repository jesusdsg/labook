import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    //To get the token from the local storage
    type DecodedToken = {
      id: number;
      username: string;
      rol_id: number;
    }

    const rol = route.data.role;
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = decode<DecodedToken>(token);

      if (rol !== decodedToken.rol_id) {
        this.router.navigate(['/dashboard']);
        return false;
      }
      else {
        return true;
      }
    }
    return true;
  }
}
