import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {
    username: 'admin',
    password: 'admin'
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.user);
    this.authService.login(this.user).subscribe( (res:any) => {
      console.log('Login response', res);
      //Saving token
      localStorage.setItem('token', res.token);
      this.router.navigate(['/admin']);
    });
   
  }

}
