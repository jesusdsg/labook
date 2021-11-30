import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddonsService {
  private uri = 'http://localhost:4000/addons';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get(this.uri + '/' + 'categories');
  }

  getAuthors(): Observable<any> {
    return this.http.get(this.uri + '/' + 'authors');
  }
}
