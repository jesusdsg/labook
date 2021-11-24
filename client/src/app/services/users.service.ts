import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private uri = 'http://localhost:4000/users';

  constructor(private http: HttpClient) { }

  getReaders(): Observable<any> {
    //Sending user to server
    return this.http.get(`${this.uri}/readers`);
  }

  getReader(id: number): Observable<any> {
    return this.http.get(this.uri + '/reader/' + id);
  }

  updateReader(user: {}) {
    return this.http.put(`${this.uri}/reader`, user);
  }

  deleteReader(id: number): Observable<any> {
    return this.http.delete(this.uri + '/readers/' + id);
  }
}
