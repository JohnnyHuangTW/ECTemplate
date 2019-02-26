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
    combineLatest(this.route.params, this.dataService.categoryList$).subscribe((data: any) => {
      this.currentCategory = data[0]['category'];
      if (this.currentCategory === 'all') {
        this.productList = this.dataService.productList$.value;
      } else {
        for (const i of data[1]) {
          if (i.name === this.currentCategory) {
            this.productList = i.products;
          }
        }
      }
    });
  }
}
