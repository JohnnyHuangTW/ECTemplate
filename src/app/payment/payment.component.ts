import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { OrderInfo } from '../interface/ec-template.interface';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  data: OrderInfo;
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
        cardNumber: ['', [Validators.required, Validators.minLength(12)]],
        expiredDate: ['', Validators.required],
        cvc: ['', [Validators.required, Validators.minLength(3)]]
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
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('submit form');
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  isFieldValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  isRequiredValid(field: string) {
    return this.form.get(field).hasError('required') && this.form.get(field).touched;
  }

  isMinLengthValid(field: string) {
    return this.form.get(field).hasError('minlength') && this.form.get(field).touched;
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

  // Set delivery info if check box is checked
  toggleDeliveryCB(isChecked: boolean) {
    const recipientName = this.form.get('deliveryInfo.recipientName');
    const recipientNumber = this.form.get('deliveryInfo.recipientNumber');
    if (isChecked) {
      recipientName.setValue(this.form.get('customerInfo.name').value);
      recipientNumber.setValue(this.form.get('customerInfo.phoneNumber').value);
    } else {
      recipientName.reset();
      recipientNumber.reset();
    }
  }

  limitedInputLength(field: string, limit: number) {
    const formControl = this.form.get(field);

    if (formControl.value.length > limit) {
      formControl.setValue(formControl.value.slice(0, limit));
    }
  }
}
