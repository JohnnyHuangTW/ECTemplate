import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ProductInfo } from 'src/app/interface/ec-template.interface';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  currentCategory = '';
  productList: ProductInfo[] = [];

  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.currentCategory = params['category'];
      this.productList = this.dataService.getProductListByCategory(this.currentCategory);
    });
  }
}
