import { Component, OnInit } from '@angular/core';
import { Books } from "src/app/models/books.model";
import { BooksService } from "src/app/services/books.service";
import { AddonsService } from "src/app/services/addons.service";
import { AuthService } from "src/app/services/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'books-container',
  templateUrl: './books-container.component.html',
  styleUrls: ['./books-container.component.scss']
})
export class BooksContainerComponent implements OnInit {

  books: Books[] = [];

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

  constructor(
    private booksService: BooksService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private aRouter: ActivatedRoute,
    private addonsService: AddonsService
  ) { }
  
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
    console.log('This books', this.books);
  }

}
