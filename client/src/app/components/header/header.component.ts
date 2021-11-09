import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import decode from 'jwt-decode';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean = false;
  username: string = '';

  constructor(private router: Router, private authService: AuthService) {

  }

  ngOnInit(): void {
    type DecodedToken = {
      id: number;
      username: string;
      rol_id: number;
    }
    const token = localStorage.getItem('token');
    if (token) {
      if (this.authService.isAuth()) {
        this.isAuth = true;
        const decodedToken = decode<DecodedToken>(token);
        if (decodedToken) {
          this.username = decodedToken.username;
        }
      }

    }
  }

  signout() {
    this.authService.signout();
    this.router.navigate(['/login']);
  }


}
