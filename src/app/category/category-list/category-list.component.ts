import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ProductInfo } from 'src/app/interface/ec-template.interface';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  productList: ProductInfo[] = [];

  constructor(private route: ActivatedRoute, public dataService: DataService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.dataService.setCurrentCategory(params['category']);
    });
    this.dataService.currentProductListByCategory$.subscribe((data: ProductInfo[]) => {
      this.productList = data;
    });
  }
}
