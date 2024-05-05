import { Injectable } from '@angular/core';
import { Observable, delay, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockBackendService {

  private users = [
    { id: 1, username: 'admin', password: '123' },
    { id: 2, username: 'user', password: '123' }
  ];

  constructor() { }


  login(username: string, password: string): Observable<Boolean> {
    // check if the user is exist 
    let isUser = this.users.find(user => user.username === username && user.password === password);

    if (isUser) {
      localStorage.setItem("username", username);
      return of(true).pipe(delay(2000)); // simulate Req & Res delay
    }
    else return throwError("Invalid username or password");
  }

}
