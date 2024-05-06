import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { MockBackendService } from '../../../../sevices/mock-backend.service';
import { Invoice } from '../../../../models/invoice.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { UpdateInvoiceComponent } from '../update-invoice/update-invoice.component';
import { AuthService } from '../../../../sevices/auth-service.service';
import { Subject, takeUntil } from 'rxjs';



@Component({
  selector: 'app-invoices-list',
  standalone: true,
  imports: [CommonModule, TableModule, ConfirmDialogModule, ToastModule, ButtonModule, UpdateInvoiceComponent],
  templateUrl: './invoices-list.component.html',
  styleUrl: './invoices-list.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class InvoicesListComponent implements OnInit, OnDestroy {

  invoices: Invoice[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private backend: MockBackendService, private confirmationService: ConfirmationService,
    private messageService: MessageService, public authService: AuthService) {

  }

  ngOnInit(): void {
    this.backend.backendOperationDone$.subscribe(nxt => {
      this.getAllInvoices();
    });
  }

  getAllInvoices() {
    this.backend.getInvoices()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.invoices = [...res];
      }, err => console.error(err));
  }

  // sum all item prices
  calcTotalPrice(invoice: Invoice) {
    let totalAmout = 0;
    invoice?.items?.forEach(item => {
      totalAmout = totalAmout + (item.price * Number(item.quantity));
    });
    return totalAmout;
  }


  // delete invoice
  deleteInvoice(id: number, event: Event) {

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Do you want to delete invoice id # ${id} ?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.backend.deleteInvoice(id).subscribe((res) => {
          // update list after deletetion
          this.backend.backendOperationDone$.subscribe(nxt => {
            this.getAllInvoices();
          });
          // show success toast
          this.messageService.add({ severity: 'success', summary: 'Deleted', detail: `Invoice #${id} has been deleted` });
        }, err => console.error(err));
      },
      reject: () => {
        // Do nothing
      }
    });
  }

  // show success toast for update
  showUpdatedToast(id: number) {
    this.messageService.add({ severity: 'success', summary: 'Updated Successfuly', detail: `Invoice # ${id} is updated successfuly`, key: 'updated' });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
