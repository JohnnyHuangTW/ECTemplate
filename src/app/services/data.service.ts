import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductInfo, CategoryInfo } from '../interface/ec-template.interface';
import { BehaviorSubject, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  headers = new HttpHeaders();
  productList$ = new BehaviorSubject<ProductInfo[]>([]);
  categoryList$ = new BehaviorSubject<CategoryInfo[]>([]);

  constructor(private http: HttpClient) {
    forkJoin(this.getProductList(), this.getCategoryList()).subscribe((data: any) => {
      this.productList$.next(data[0]);
      console.log('products:', this.productList$.value);
      this.categoryList$.next(data[1]);
      console.log('categories:', this.categoryList$.value);
      this.setCategoryCount();
    });
  }

  setHeaders(key: string, value: string) {
    this.headers.set(key, value);
  }

  private getProductList() {
    return this.http.get('../../assets/data/product-list.json', { headers: this.headers });
  }
  private getCategoryList() {
    return this.http.get('../../assets/data/category-list.json', { headers: this.headers });
  }
  private setCategoryCount() {
    // reset
    for (const category of this.categoryList$.value) {
      category.count = 0;
      category.products = [];
    }
    for (const product of this.productList$.value) {
      for (const c of this.categoryList$.value) {
        if (product.category === c.name) {
          c.count++;
          c.products.push(product);
        }
      }
    }
  }
}
