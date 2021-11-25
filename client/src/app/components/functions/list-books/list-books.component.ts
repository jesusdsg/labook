import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Books } from "src/app/models/books.model";
import { BooksService } from "src/app/services/books.service";
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
  ) {
    //Initializing form
    this.bookForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(3)]],
      isbn: ["", [Validators.required]],
      cover: ["", [Validators.required]],
      year: ["", [Validators.required]],
      category_id: ["", [Validators.required]],
      author_id: ["", [Validators.required]],
    });
  }

  addBook() {
    let book = {
      id: 0,
      title: this.bookForm.get("title")?.value,
      isbn: this.bookForm.get("isbn")?.value,
      cover: this.bookForm.get("cover")?.value,
      year: this.bookForm.get("year")?.value,
      category_id: this.bookForm.get("category_id")?.value,
      author_id: this.bookForm.get("author_id")?.value,
    };
    if (!this.editMode) {
      if (this.bookForm.valid) {
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

  getBook(id: any) {
    this.booksService.getBook(id).subscribe((data) => {
      this.createMode = true;
      this.editMode = true;
      this.createText = "Update Reader";
      this.bookForm.setValue({
        title: data[0].title,
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
