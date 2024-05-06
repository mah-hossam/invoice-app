import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddInvoiceComponent } from './components/add-invoice/add-invoice.component';
import { InvoicesListComponent } from './components/invoices-list/invoices-list.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, AddInvoiceComponent, InvoicesListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
