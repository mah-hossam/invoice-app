import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MockBackendService } from '../../../../sevices/mock-backend.service';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ToastModule],
  templateUrl: './invoice-form.component.html',
  styleUrl: './invoice-form.component.scss'
})
export class InvoiceFormComponent implements OnInit, AfterContentInit {

  invoiceForm: FormGroup;

  constructor(private fb: FormBuilder, private backend: MockBackendService, public modalRef: DynamicDialogRef) {

  }

  ngOnInit(): void {
    this.buildForm();
  }

  ngAfterContentInit(): void {
    // create new invoice item once component content initiated
    this.addNewItem();
  }

  buildForm() {
    this.invoiceForm = this.fb.group({
      items: this.fb.array([]),
      paymentStatus: ['', Validators.required],
      paymentType: ['', Validators.required]
    });
  }

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  addNewItem(): void {
    this.items.push(this.createItem());
  }

  createItem(): FormGroup {
    return this.fb.group({
      itemName: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  // submit new invoic
  addInvoice() {
    // do not proceed if form is invalid
    if (this.invoiceForm.invalid) return;

    const reqBody = { ...this.invoiceForm.value };
    // TODO: to be removed
    console.log("Req Body ", reqBody);

    this.backend.addInvoice(reqBody).subscribe(res => {
      // close popup on success
      this.modalRef.close("success");

    }, err => {
      console.error(err);
    });
  }



}
