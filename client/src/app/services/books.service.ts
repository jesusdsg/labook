import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private uri = 'http://localhost:4000/books';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<any> {
    return this.http.get(`${this.uri}`);
  }

  getBook(id: number): Observable<any> {
    return this.http.get(this.uri + '/' + id);
  }

  addBook(user: {}) {
    return this.http.post(`${this.uri}`, user);
  }

  updateBook(user: {}) {
    return this.http.put(`${this.uri}/`, user);
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(this.uri + '/' + id);
  }


}
