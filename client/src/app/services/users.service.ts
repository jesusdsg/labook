import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getReaders(): Observable<any> {
    //Sending user to server
    return this.http.get(`${this.uri}/users/readers`);
  }
}
