import { Component } from '@angular/core';
import { InvoiceFormComponent } from '../invoice-form/invoice-form.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-add-invoice',
  standalone: true,
  imports: [InvoiceFormComponent, ToastModule],
  templateUrl: './add-invoice.component.html',
  styleUrl: './add-invoice.component.scss',
  providers: [DialogService, MessageService]

})
export class AddInvoiceComponent {

  dialogRef: DynamicDialogRef | undefined;

  constructor(public dialogService: DialogService, public messageService: MessageService) {

  }


  addInvoice() {
    this.dialogRef = this.dialogService.open(InvoiceFormComponent, {
      header: 'Invoice info',
      width: '50vw',
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
    });

    this.dialogRef.onClose.subscribe(nxt => {
      if (nxt === 'success')
        // show success toast
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Invoice added successfuly' });
    });
  }

}
