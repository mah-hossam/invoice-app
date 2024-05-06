import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddInvoiceComponent } from './components/add-invoice/add-invoice.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, AddInvoiceComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
