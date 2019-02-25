import { Component, OnInit, Input } from '@angular/core';
import { ProductInfo } from 'src/app/interface/ec-template.interface';

@Component({
  selector: 'app-product-thumbnail',
  templateUrl: './product-thumbnail.component.html',
  styleUrls: ['./product-thumbnail.component.scss']
})
export class ProductThumbnailComponent implements OnInit {
  @Input()
  data: ProductInfo;

  constructor() {}

  ngOnInit() {}
}
