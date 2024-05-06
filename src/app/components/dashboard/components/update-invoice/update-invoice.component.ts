import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Invoice } from '../../../../models/invoice.model';
import { InvoiceFormComponent } from '../invoice-form/invoice-form.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-update-invoice',
  standalone: true,
  imports: [InvoiceFormComponent, ToastModule],
  templateUrl: './update-invoice.component.html',
  styleUrl: './update-invoice.component.scss',
  providers: [DialogService, MessageService]

})
export class UpdateInvoiceComponent implements OnInit {

  @Input() invoiceDetails: Invoice;
  @Output() updatedSuccessfuly = new EventEmitter();
  dialogRef: DynamicDialogRef | undefined;


  constructor(public dialogService: DialogService, public messageService: MessageService) { }


  ngOnInit(): void {

  }

  updateInvoice() {

    this.dialogRef = this.dialogService.open(InvoiceFormComponent, {
      header: 'Invoice info',
      width: '50vw',
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      data: { ...this.invoiceDetails, isView: false }
    });

    this.dialogRef.onClose.subscribe(nxt => {
      if (nxt === 'success') this.updatedSuccessfuly.emit(true);
    });

  }


}
