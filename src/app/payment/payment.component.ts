import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import {
  OrderInfo,
  CustomerInfo,
  DeliveryInfo,
  PaymentInfo
} from '../interface/ec-template.interface';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  data: OrderInfo;
  submitted = false;
  // forms
  form: FormGroup;

  constructor(private dataService: DataService, private fb: FormBuilder) {}

  ngOnInit() {
    this.data = this.dataService.getOrderInfo();

    this.form = this.fb.group({
      customerInfo: this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', Validators.required]
      }),
      paymentInfo: this.fb.group({
        holderName: ['', Validators.required],
        cardNumber: ['', Validators.required],
        expiredDate: ['', Validators.required],
        cvc: ['', Validators.required]
      }),
      deliveryInfo: this.fb.group({
        recipientName: ['', Validators.required],
        recipientNumber: ['', Validators.required],
        addressLine1: ['', Validators.required],
        addressLine2: [''],
        city: ['', Validators.required],
        state: ['', Validators.required],
        postcode: ['', Validators.required],
        country: ['', Validators.required]
      })
    });
    console.log('form', this.form);
  }
  // convenience getter for easy access to form fields
  get formControls() {
    return this.form.controls;
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('submit form');
    } else {
      console.log('invalid');
      this.validateAllFormFields(this.form);
    }
  }

  isFieldValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  // mark all field as touched
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
