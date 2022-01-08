import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Books } from "src/app/models/books.model";
import { BooksService } from "src/app/services/books.service";
import { AddonsService } from "src/app/services/addons.service";
import { AuthService } from "src/app/services/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: "list-books",
  templateUrl: "./list-books.component.html",
  styleUrls: ["./list-books.component.scss"],
})
export class ListBooksComponent implements OnInit {
  categories: any[] = [];
  authors: any[] = [];
  location: any[] = [];
  selectedAuthor: any ;
  selectedCategory: any;
  selectedLocation: any;
  books: Books[] = [];
  bookForm: FormGroup;
  errorText: string = "";
  id: number = 0;
  createMode: boolean = false;
  editMode: boolean = false;
  createText: string = "Create Reader";

  constructor(
    private booksService: BooksService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private aRouter: ActivatedRoute,
    private addonsService: AddonsService
  ) {
    //Initializing form
    this.bookForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(3)]],
      description: ["", [Validators.required]],
      isbn: ["", [Validators.required]],
      cover: ["", [Validators.required]],
      digital: [""],
      year: ["", [Validators.required]],
      category_id: [""],
      author_id: [""],
      location_id: [""],
    });
  }

  addBook() {
    let book = {
      id: 0,
      title: this.bookForm.get("title")?.value,
      description: this.bookForm.get("description")?.value,
      isbn: this.bookForm.get("isbn")?.value,
      cover: this.bookForm.get("cover")?.value,
      year: this.bookForm.get("year")?.value,
      category: this.selectedCategory,
      author: this.selectedAuthor,
      location: this.selectedLocation,
    };
    if (!this.editMode) {
      if (this.bookForm.valid) {
        if (this.selectedCategory == 0 || this.selectedCategory == undefined || this.selectedAuthor == 0 || this.selectedAuthor == undefined || this.selectedLocation == 0 || this.selectedLocation == undefined) {
          Notify.warning("Please select category and author");
          this.getBooks();
        } else {
        this.errorText = "";
        this.booksService.addBook(book).subscribe(
          (res: any) => {
            if(res.status == 200) {
              Notify.success(res.msg);
              this.cleanData();
              this.createMode = false;
              this.getBooks();
            }
          },
          (err) => {
            this.errorText = err.error.message;
          }
        );}
      } else {
        this.errorText = "Please fill all the fields";
      }
    } else {
      if (this.bookForm.valid) {
        book = { ...book, id: this.id };
        this.errorText = "";
        this.booksService.updateBook(book).subscribe((data) => {
          this.cleanData();
        }),
          (error) => {
            console.error(error, "Error");
          };
          
        Notify.success('Reader updated sussesfully!');
        this.createMode = false;
      }
    }

    this.getBooks();
  }

  deleteBook(id: any) {
    this.booksService.deleteBook(id).subscribe((data) => {
      Notify.success('Reader deleted sussesfully!');
      this.cleanData();
    }),
      (error) => {
        console.error(error, "Error");
      };
    this.getBooks();
  }

  changeAuthor(event: any) {
    this.selectedAuthor = event.target.value;
  }

  changeCategory(event: any) {
    this.selectedCategory = event.target.value;
  }

  changeLocation(event: any) {
    this.selectedLocation = event.target.value;
  }


  getBook(id: any) {
    this.booksService.getBook(id).subscribe((data) => {
      this.createMode = true;
      this.editMode = true;
      this.createText = "Update Reader";
      this.bookForm.setValue({
        title: data[0].title,
        description: data[0].description,
        isbn: data[0].isbn,
        cover: data[0].cover,
        digital: data[0].isbn,
        year: data[0].year,
        category_id: data[0].category_id,
        author_id: data[0].author_id,
        location_id: data[0].location_id,
      });
      this.id = data[0].id;
    }),
      (error) => {
        console.error(error, "Error");
      };
  }

  cleanData() {
    this.bookForm.reset();
    this.id = 0;
  }

  createBook() {
    if (this.createMode) {
      this.createMode = false;
    } else {
      this.createMode = true;
    }
    this.cleanData();
    this.editMode = false;
    this.createText = "Create Book";
  }

  filterBooks(event: any) {
    if (event.target.value.length > 0) {
      this.books = this.books.filter((book) => {
        return book.title.includes(event.target.value);
      });
    } else {
      this.getBooks();
    }
  }

  ngOnInit(): void {
    this.getBooks();
    this.getCategories();
    this.getAuthors();
    this.getLocation();
  }


  //Get data to fill selects
  getLocation() {
    this.addonsService.getLocation().subscribe((data) => {
      this.location =  data;
      this.location.unshift({id: 0, name: 'Select Location'});
    }),
      (error) => {
        console.error(error, "Error");
      };
  }
  getCategories() {
    this.addonsService.getCategories().subscribe((data) => {
      this.categories =  data;
      this.categories.unshift({id: 0, name: 'Select Category'});
    }),
      (error) => {
        console.error(error, "Error");
      };
  }
  getAuthors() {
    this.addonsService.getAuthors().subscribe((data) => {
      this.authors = data;
      this.authors.unshift({id: 0, name: 'Select Author'});
    }),
      (error) => {
        console.error(error, "Error");
      };
  }

  //Get all books
  getBooks() {
    this.booksService.getBooks().subscribe((data) => {
      this.books = data;
      console.log(this.books);
    }),
      (error) => {
        console.error(error, "Error");
      };
  }


}
