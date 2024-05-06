import { Component, Input } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InvoiceFormComponent } from '../invoice-form/invoice-form.component';
import { Invoice } from '../../../../models/invoice.model';

@Component({
  selector: 'app-view-invoice',
  standalone: true,
  imports: [InvoiceFormComponent],
  templateUrl: './view-invoice.component.html',
  styleUrl: './view-invoice.component.scss',
  providers: [DialogService]
})
export class ViewInvoiceComponent {

  dialogRef: DynamicDialogRef | undefined;
  @Input() invoiceDetails: Invoice;


  constructor(public dialogService: DialogService) { }

  viewInvoice() {

    this.dialogRef = this.dialogService.open(InvoiceFormComponent, {
      header: 'Invoice info',
      width: '50vw',
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      data: { ...this.invoiceDetails, isView: true }
    });

  }

}
