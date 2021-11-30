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
  selectedAuthor: any;
  selectedCategory: any;
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
      year: ["", [Validators.required]],
      category_id: [""],
      author_id: [""],
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
    };
    if (!this.editMode) {
      if (this.bookForm.valid) {
        console.log('registering');
        this.errorText = "";
        this.booksService.addBook(book).subscribe(
          (res: any) => {
            Notify.success('Book created sussesfully!');
            this.cleanData();
            this.createMode = false;
            this.getBooks();
          },
          (err) => {
            this.errorText = err.error.message;
          }
        );
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
        year: data[0].year,
        category_id: data[0].category_id,
        author_id: data[0].author_id,
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
  }


  getCategories() {
    this.addonsService.getCategories().subscribe((data) => {
      this.categories =  data;
      console.log(this.categories);
    }),
      (error) => {
        console.error(error, "Error");
      };
  }

  getAuthors() {
    this.addonsService.getAuthors().subscribe((data) => {
      this.authors = data;
      console.log(this.authors);
    }),
      (error) => {
        console.error(error, "Error");
      };
  }

  getBooks() {
    this.booksService.getBooks().subscribe((data) => {
      this.books = data;
    }),
      (error) => {
        console.error(error, "Error");
      };
  }


}
