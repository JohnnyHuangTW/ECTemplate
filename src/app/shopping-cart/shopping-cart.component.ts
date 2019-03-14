import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ShoppingCartItem, OrderInfo } from '../interface/ec-template.interface';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  data: ShoppingCartItem[] = [];
  // order summary
  subTotal = 0;
  shippingFee = 50;
  taxPercentage = 5; // 5%
  tax = 0;
  total = 0;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.data = this.dataService.shoppingCartData;
    this.getOrderSummary();
  }

  updateItem(item: ShoppingCartItem) {
    this.dataService.editShoppingCartItem(item);
    this.getOrderSummary();
  }

  removeItem(item: ShoppingCartItem) {
    this.dataService.deleteShoppingCartItem(item);
    this.data = this.dataService.shoppingCartData;
    this.getOrderSummary();
  }

  getTotalPrice(item: ShoppingCartItem) {
    if (item.product.onSale) {
      return item.quantity * +item.product.salePrice;
    } else {
      return item.quantity * +item.product.costPrice;
    }
  }

  getOrderSummary() {
    this.subTotal = 0;
    for (const i of this.data) {
      if (i.product.onSale) {
        this.subTotal = this.subTotal + +i.product.salePrice * i.quantity;
      } else {
        this.subTotal = this.subTotal + +i.product.costPrice * i.quantity;
      }
    }
    this.tax = (this.subTotal * this.taxPercentage) / 100;
    this.total = this.subTotal + this.shippingFee + this.tax;
  }

  onCheckOut() {
    this.dataService.saveOrderInfo(<OrderInfo>{
      items: this.data,
      totalPrice: this.total
    });
  }
}
