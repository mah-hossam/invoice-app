import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MockBackendService } from '../../../../sevices/mock-backend.service';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Invoice } from '../../../../models/invoice.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ToastModule],
  templateUrl: './invoice-form.component.html',
  styleUrl: './invoice-form.component.scss'
})
export class InvoiceFormComponent implements OnInit, OnDestroy {

  invoiceForm: FormGroup;
  isEditMode: boolean;
  isViewMode: boolean;
  invoiceDetails: Invoice;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private fb: FormBuilder, private backend: MockBackendService,
    public modalRef: DynamicDialogRef, public modalConfig: DynamicDialogConfig) {

  }

  ngOnInit(): void {
    // build the form
    this.buildForm();
    // create new invoice item once component initiated
    this.addNewItem();

    if (this.modalConfig?.data) {

      if (this.modalConfig.data.isView) this.isViewMode = true;
      else this.isEditMode = true;

      this.invoiceDetails = this.modalConfig.data;
      this.patchFormValues();
    }

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

  // if edit mode patch form values to be able to edit it
  patchFormValues() {
    this.invoiceForm.patchValue({
      paymentStatus: this.invoiceDetails?.paymentStatus,
      paymentType: this.invoiceDetails?.paymentType
    });

    // remove the defualt invoice item
    this.removeItem(0);

    // Patch formArray items 
    this.invoiceDetails?.items.forEach(item => {
      this.items.push(
        this.fb.group({
          itemName: item?.itemName,
          quantity: item?.quantity,
          price: item?.price
        })
      );
    });
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  // submit new invoice
  addInvoice() {
    // do not proceed if form is invalid
    if (this.invoiceForm.invalid) return;

    const reqBody = { ...this.invoiceForm.value };

    this.backend.addInvoice(reqBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        // close popup on success
        this.modalRef.close("success");

      }, err => {
        console.error(err);
      });
  }

  // Edit invoice
  updateInvoice() {

    // do not proceed if form is invalid
    if (this.invoiceForm.invalid) return;

    const reqBody = { id: this.invoiceDetails.id, ...this.invoiceForm.value };

    this.backend.updateInvoice(Number(this.invoiceDetails?.id), reqBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        // close popup on success
        this.modalRef.close("success");

      }, err => {
        console.error(err);
      });

  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
