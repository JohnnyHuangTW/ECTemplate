import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { OrderInfo } from '../interface/ec-template.interface';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  data: OrderInfo;
  form: FormGroup;

  constructor(private dataService: DataService, private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.scrollToTop();
    this.data = this.dataService.getOrderInfo();
    // redirect to shopping cart page if no item in the cart
    if (this.data.items.length === 0) {
      this.router.navigate(['shopping-cart']);
    }

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
      this.data.customerInfo = this.form.get('customerInfo').value;
      this.data.deliveryInfo = this.form.get('deliveryInfo').value;
      this.data.paymentInfo = this.form.get('paymentInfo').value;
      this.dataService.submitOrder(this.data);
    } else {
      this.validateAllFormFields(this.form);
      this.scrollToTop();
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

  // Control input's limit characters
  limitedInputLength(field: string, limit: number) {
    const formControl = this.form.get(field);
    if (formControl.value.length > limit) {
      formControl.setValue(formControl.value.slice(0, limit));
    }
  }

  checkExpiredDatePattern(inputEvent: any) {
    const formControl = this.form.get('paymentInfo.expiredDate');
    if (inputEvent.inputType === 'insertText') {
      if (formControl.value.length > 5) {
        // can't be more than 5 characters
        formControl.setValue(formControl.value.slice(0, 5));
      } else if (formControl.value.length === 3) {
        // add '/' after the second number
        const front = formControl.value.slice(0, 2);
        const back = formControl.value.slice(2, 4);
        formControl.setValue(`${front}/${back}`);
      }
    }
  }

  getTotalItems() {
    let total = 0;
    for (const i of this.data.items) {
      total += +i.quantity;
    }
    return total;
  }

  scrollToTop() {
    const scrollToTop = window.setInterval(() => {
      const pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 6);
  }
}
