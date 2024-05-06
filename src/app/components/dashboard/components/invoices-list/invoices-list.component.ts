import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { MockBackendService } from '../../../../sevices/mock-backend.service';
import { Invoice } from '../../../../models/invoice.model';


@Component({
  selector: 'app-invoices-list',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './invoices-list.component.html',
  styleUrl: './invoices-list.component.scss'
})
export class InvoicesListComponent implements OnInit {

  invoices: Invoice[] = [];

  constructor(private backend: MockBackendService) {

  }

  ngOnInit(): void {
    this.backend.backendOperationDone$.subscribe(nxt => {
      this.getAllInvoices();
    });
  }

  getAllInvoices() {
    this.backend.getInvoices().subscribe((res) => {
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


}
