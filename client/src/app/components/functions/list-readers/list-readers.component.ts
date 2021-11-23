import { Component, OnInit } from '@angular/core';
import { Readers } from 'src/app/models/readers.model';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'list-readers',
  templateUrl: './list-readers.component.html',
  styleUrls: ['./list-readers.component.scss']
})
export class ListReadersComponent implements OnInit {
  readers: Readers[] = [];
  readerForm: FormGroup;
  errorText: string = "";
  createMode: boolean = false;

  constructor(private usersService: UsersService, private router: Router, private fb: FormBuilder, private authService: AuthService) {
    //Initializing form
    this.readerForm = this.fb.group({
      //Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'), 
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      address: ['', [Validators.required,]],
      phone: ['', [Validators.required]],
    }
    );
  }

  addReader() {
    const user = {
      username: this.readerForm.get('username')?.value,
      password: this.readerForm.get('password')?.value,
      email: this.readerForm.get('email')?.value,
      firstname: this.readerForm.get('firstname')?.value,
      lastname: this.readerForm.get('lastname')?.value,
      address: this.readerForm.get('address')?.value,
      phone: this.readerForm.get('phone')?.value,
      rol_id: 3
    }
    if (this.readerForm.valid) {
      console.log(user, 'Registered');
      this.errorText = "";
      this.authService.signup(user).subscribe(
        (res: any) => {
          console.log(res);
          this.getReaders();
          this.cleanData();
          this.createMode = false;
        },
        (err) => {
          console.log(err);
          this.errorText = err.error.message;
        }
      )
    }
    else {
      console.log(user, 'Not Registered');
      this.errorText = "Please fill all the fields";
    }
  }

  deleteReader(id: any) {
    this.usersService.deleteReader(id).subscribe(data => {
      this.getReaders();
    }), error => {
      console.error(error, 'Error');
    }
  }

  cleanData() {
    this.readerForm.reset();
  }

  createReader() {
    if (this.createMode) {
      this.createMode = false;
    } else {
      this.createMode = true;
    }
  }

  ngOnInit(): void {
    this.getReaders();
  }

  getReaders() {
    this.usersService.getReaders().subscribe(data => {
      this.readers = data;
    }), error => {
      console.error(error, 'Error');

    }
  }

}
