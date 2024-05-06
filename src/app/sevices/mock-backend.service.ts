import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of, throwError } from 'rxjs';
import { Invoice } from '../models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class MockBackendService {

  private invoicesList: Invoice[] = [];

  private invoiceId = 0;

  // to trigger updates
  backendOperationDone$ = new BehaviorSubject(false);

  constructor() { }

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

  // UPDATE INVOICE
  updateInvoice(invoiceId: number, updatedValue: Invoice) {
    const index = this.invoicesList.findIndex(invoice => invoice.id === invoiceId);
    if (index !== -1) {
      this.invoicesList[index] = updatedValue;
    }
    this.backendOperationDone$.next(true);
    return of(null); // simulate success status 200
  }

  // DELETE INVOICE
  deleteInvoice(invoiceId: number) {

    const index = this.invoicesList.findIndex(invoice => invoice.id === invoiceId);
    if (index !== -1) {
      this.invoicesList.splice(index, 1);
    }
    this.backendOperationDone$.next(true);
    return of(null); // simulate success status 200

  }

}
