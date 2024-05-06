import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of, throwError } from 'rxjs';
import { Invoice } from '../models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class MockBackendService {

  private users = [
    { id: 1, username: 'admin', password: '123' },
    { id: 2, username: 'user', password: '123' }
  ];

  private invoicesList: Invoice[] = [];

  private invoiceId = 0;

  backendOperationDone$ = new BehaviorSubject(false);

  constructor() { }

  // LOGIN
  login(username: string, password: string): Observable<Boolean> {
    // check if the user is exist 
    let isUser = this.users.find(user => user.username === username && user.password === password);

    if (isUser) {
      localStorage.setItem("username", username);
      return of(true).pipe(delay(2000)); // simulate Req & Res delay
    }
    else return throwError("Invalid username or password");
  }

  // ADD INVOICE
  addInvoice(invoiceData: Invoice): Observable<null> {
    this.invoiceId = this.invoiceId + 1;
    this.invoicesList.push({ id: this.invoiceId, ...invoiceData });
    this.backendOperationDone$.next(true);
    return of(null); // simulate success status 200
  }

  // LIST INVOICE
  getInvoices(): Observable<Invoice[]> {
    return of(this.invoicesList);
  }

  // GET INVOICE BY ID
  getInvoiceById(invoiceId: number) {

  }

  // UPDATE INVOICE
  updateInvoice(invoiceId: number, value: Object) {

  }

  // DELETE INVOICE
  deleteInvoice(invoiceId: number) { }

}
