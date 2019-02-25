import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-thumbnail',
  templateUrl: './product-thumbnail.component.html',
  styleUrls: ['./product-thumbnail.component.scss']
})
export class ProductThumbnailComponent implements OnInit {
  data = {
    id: 1,
    name: 'Product Name',
    description: 'Product description',
    img: 'https://picsum.photos/300/320?random',
    onSale: true,
    costPrice: '300',
    salePrice: '150'
  };

  constructor() {}

  ngOnInit() {}
}
