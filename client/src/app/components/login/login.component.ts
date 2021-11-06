import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userForm: FormGroup;

  errorText = "";

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    
    //Initializing form
    this.userForm = this.fb.group({
      //Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'), 
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {
  }

  login() {

    //Getting form values
    const user = {
      username:  this.userForm.get('username')?.value,
      password: this.userForm.get('password')?.value
    }

    if (this.userForm.valid) {
      this.authService.login(user).subscribe(
        (res: any) => {
          //Saving token
          if(res.token) {
            localStorage.setItem('token', res.token);
            this.router.navigate(['/admin']);
          }
          else {
            this.errorText = "Invalid Username or Password.";
          }
         
        },
        (err) => {
          //console.log('error', err);
          this.errorText = err.error.msg;
        }
      );
    }
  }

}
