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

  errorText: string = "";

  status: boolean = false;


  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {

    //Initializing form
    this.userForm = this.fb.group({
      //Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'), 
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required]],
      confirm: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      address: ['', [Validators.required,]],
      phone: ['', [Validators.required]],
    }
    );
  }

  ngOnInit(): void {
  }


  signup() {
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
    if (this.userForm.valid) {
      console.log(user, 'Registered');
      this.errorText = "";
      this.authService.signup(user).subscribe(
        (res: any) => {
          console.log(res);
          if (res.status) {
            this.status = res.status;
          }
        },
        (err) => {
          console.log(err);
          this.status = false;
          this.errorText = err.error.message;
        }
      )
    //this.status = "registered";
    //this.router.navigate(['/done', this.status]);
    }
    else {
      console.log(user, 'Not Registered');
      this.errorText = "Please fill all the fields";
    }


  }

}
