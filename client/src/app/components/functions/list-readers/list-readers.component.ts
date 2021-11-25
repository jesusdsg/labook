import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Readers } from "src/app/models/readers.model";
import { UsersService } from "src/app/services/users.service";
import { AuthService } from "src/app/services/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "list-readers",
  templateUrl: "./list-readers.component.html",
  styleUrls: ["./list-readers.component.scss"],
})
export class ListReadersComponent implements OnInit {
  @ViewChild("userNameInput") userNameInput: ElementRef | any;
  readers: Readers[] = [];
  readerForm: FormGroup;
  errorText: string = "";
  id: number = 0;
  createMode: boolean = false;
  editMode: boolean = false;
  createText: string = "Create Reader";

  constructor(
    private usersService: UsersService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private aRouter: ActivatedRoute
  ) {
    //Initializing form
    this.readerForm = this.fb.group({
      //Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
      username: ["", [Validators.required, Validators.minLength(3)]],
      password: ["", [Validators.required]],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ],
      firstname: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      address: ["", [Validators.required]],
      phone: ["", [Validators.required]],
    });
  }

  addReader() {
    let user = {
      id: 0,
      username: this.readerForm.get("username")?.value,
      password: this.readerForm.get("password")?.value,
      email: this.readerForm.get("email")?.value,
      firstname: this.readerForm.get("firstname")?.value,
      lastname: this.readerForm.get("lastname")?.value,
      address: this.readerForm.get("address")?.value,
      phone: this.readerForm.get("phone")?.value,
      rol_id: 3,
    };
    if (!this.editMode) {
      if (this.readerForm.valid) {
        this.errorText = "";
        this.authService.signup(user).subscribe(
          (res: any) => {
            this.cleanData();
            this.createMode = false;
            this.getReaders();
          },
          (err) => {
            this.errorText = err.error.message;
          }
        );
      } else {
        console.log(user, "Not Registered");
        this.errorText = "Please fill all the fields";
      }
    } else {
      if (this.readerForm.valid) {
        user = { ...user, id: this.id };
        this.errorText = "";
        this.usersService.updateReader(user).subscribe((data) => {
          this.cleanData();
        }),
          (error) => {
            console.error(error, "Error");
          };
        this.createMode = false;
      }
    }

    this.getReaders();
  }

  deleteReader(id: any) {
    this.usersService.deleteReader(id).subscribe((data) => {
      this.cleanData();
    }),
      (error) => {
        console.error(error, "Error");
      };
    this.getReaders();
  }

  getReader(id: any) {
    this.usersService.getReader(id).subscribe((data) => {
      this.createMode = true;
      this.editMode = true;
      this.createText = "Update Reader";
      this.readerForm.setValue({
        username: data[0].username,
        password: data[0].password,
        email: data[0].email,
        firstname: data[0].firstname,
        lastname: data[0].lastname,
        address: data[0].address,
        phone: data[0].phone,
      });
      this.id = data[0].id;
    }),
      (error) => {
        console.error(error, "Error");
      };
  }

  cleanData() {
    this.readerForm.reset();
    this.id = 0;
  }

  createReader() {
    if (this.createMode) {
      this.createMode = false;
    } else {
      this.createMode = true;
    }
    this.userNameInput.nativeElement.focus();
    this.cleanData();
    this.editMode = false;
    this.createText = "Create Reader";
  }

  filterReaders(event: any) {
    if (event.target.value.length > 0) {
      this.readers = this.readers.filter((reader) => {
        return reader.username.includes(event.target.value);
      });
    } else {
      this.getReaders();
    }
  }

  ngOnInit(): void {
    this.getReaders();
  }

  getReaders() {
    this.usersService.getReaders().subscribe((data) => {
      this.readers = data;
    }),
      (error) => {
        console.error(error, "Error");
      };
  }
}
