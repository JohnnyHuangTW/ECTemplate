import { Component, OnInit, Input } from '@angular/core';
import { ProductInfo } from 'src/app/interface/ec-template.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-thumbnail',
  templateUrl: './product-thumbnail.component.html',
  styleUrls: ['./product-thumbnail.component.scss']
})
export class ProductThumbnailComponent implements OnInit {
  @Input()
  data: ProductInfo;
  @Input()
  width = '300';
  @Input()
  height = '320';

  constructor(private router: Router) {}

  ngOnInit() {}

  directTo() {
    this.router.navigate([`/category/product/${this.data.id}`]);
  }

  getImgMinHeight() {
    return `calc(100% * ${this.height} / ${this.width})`;
  }
}
