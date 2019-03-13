import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ShoppingCartItem } from '../interface/ec-template.interface';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  data: ShoppingCartItem[];

  constructor(private dataService: DataService) {}

  ngOnInit() {}
}
