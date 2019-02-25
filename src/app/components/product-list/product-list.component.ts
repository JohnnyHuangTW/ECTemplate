import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ProductInfo } from 'src/app/interface/ec-template.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnChanges {
  @Input()
  data: ProductInfo[] = [];
  @Input()
  itemsPerPage = 12;

  productArray: ProductInfo[];
  returnedArray: ProductInfo[] = [];
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes);
    this.productArray = changes.data.currentValue;
    if (this.productArray) {
      this.returnedArray = this.productArray.slice(0, this.itemsPerPage);
    }
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.productArray.slice(startItem, endItem);
  }
}
