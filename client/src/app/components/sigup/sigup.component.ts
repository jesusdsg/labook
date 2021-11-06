import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sigup',
  templateUrl: './sigup.component.html',
  styleUrls: ['./sigup.component.scss']
})
export class SigupComponent implements OnInit {

  userForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder)  {

    //Initializing form
    this.userForm = this.fb.group({
      //Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'), 
      username: ['', [Validators.required, Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      firstname: ['', [Validators.required, Validators.maxLength(10)]],
      lastname: ['', [Validators.required, Validators.maxLength(10)]],
      address: ['', [Validators.required, Validators.maxLength(10)]],
      phone: ['', [Validators.required, Validators.maxLength(10)]],
    });

    

   }

  ngOnInit(): void {
  }

  signin() {
    //Getting form values
    const user = {
      username: this.userForm.get('username')?.value,
      password: this.userForm.get('password')?.value,
      email: this.userForm.get('email')?.value,
      firstname: this.userForm.get('firstname')?.value,
      lastname: this.userForm.get('lastname')?.value,
      address: this.userForm.get('address')?.value,
      phone: this.userForm.get('phone')?.value
    }

    console.log(user);
  }

}
