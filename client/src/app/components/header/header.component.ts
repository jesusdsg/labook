import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserSharingService } from 'src/app/services/user-sharing.service';
import decode from 'jwt-decode';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogged: boolean = false;
  username: string = '';

  constructor(private router: Router, private authService: AuthService, private userSharingService: UserSharingService)
  {
    this.userSharingService.isLogged.subscribe(value => {
      this.isLogged = value;
    });
    this.userSharingService.username.subscribe(value => {
      this.username = value;
    });
  }

  ngOnInit(): void {
  }

  signout() {
    this.authService.signout();
    this.router.navigate(['/login']);
    this.username = '';
    this.isLogged = false;
  }


}
