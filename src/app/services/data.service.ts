import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  ProductInfo,
  CategoryInfo,
  ShoppingCartItem,
  MenuInfo
} from '../interface/ec-template.interface';
import { BehaviorSubject, forkJoin } from 'rxjs';

const SHOPPING_CART_KEY = 'shopping-cart-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  headers = new HttpHeaders();
  productList$ = new BehaviorSubject<ProductInfo[]>([]);
  categoryList$ = new BehaviorSubject<CategoryInfo[]>([]);
  menuList$ = new BehaviorSubject<MenuInfo[]>([]);
  shoppingCartData: ShoppingCartItem[] = [];

  constructor(private http: HttpClient) {
    forkJoin(this.getAllProductList(), this.getCategoryList(), this.getMenuList()).subscribe(
      (data: any) => {
        this.productList$.next(data[0]);
        console.log('products:', this.productList$.value);
        this.categoryList$.next(data[1]);
        console.log('categories:', this.categoryList$.value);
        this.menuList$.next(data[2]);
        console.log('menus:', this.menuList$.value);
        this.setCategoryCount();
      }
    );
  }

  setHeaders(key: string, value: string) {
    this.headers.set(key, value);
  }

  private setLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  private getLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  private removeLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

  private getAllProductList() {
    return this.http.get('./assets/data/product-list.json', { headers: this.headers });
  }
  private getMenuList() {
    return this.http.get('./assets/data/menu-list.json', { headers: this.headers });
  }
  private getCategoryList() {
    return this.http.get('./assets/data/category-list.json', { headers: this.headers });
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

  getProductListByCategory(category: string) {
    if (category === 'all') {
      return this.productList$.value;
    } else {
      for (const i of this.categoryList$.value) {
        if (i.name === category) {
          return i.products;
        }
      }
    }
  }

  getProductById(productId: string) {
    return this.productList$.value.find(function(item, index, array) {
      return item.id === productId;
    });
  }

  getRelatedProductsByCategory(productId: string, category: string, amount: number) {
    const relatedProducts: ProductInfo[] = [];
    for (const c of this.categoryList$.value) {
      if (c.name === category) {
        for (let i = 0; relatedProducts.length < amount; i++) {
          if (c.products[i] && c.products[i].id !== productId) {
            relatedProducts.push(c.products[i]);
          }
        }
      }
    }
    return relatedProducts;
  }

  loadShoppingCart() {
    if (this.getLocalStorage(SHOPPING_CART_KEY)) {
      this.shoppingCartData = this.getLocalStorage(SHOPPING_CART_KEY);
    }
    console.log('SC Data from LocalStorage', this.shoppingCartData);
  }

  addShoppingCartItem(item: ShoppingCartItem) {
    if (
      this.shoppingCartData.find(data => {
        return data.product.id === item.product.id;
      })
    ) {
      for (const i of this.shoppingCartData) {
        if (i.product.id === item.product.id) {
          i.quantity = i.quantity + item.quantity;
        }
      }
    } else {
      this.shoppingCartData = [...this.shoppingCartData, item];
    }
    console.log('item added:', this.shoppingCartData);
    this.setLocalStorage(SHOPPING_CART_KEY, this.shoppingCartData);
  }

  editShoppingCartItem(item: ShoppingCartItem) {
    this.shoppingCartData = this.shoppingCartData.map((data: ShoppingCartItem) => {
      if (data.product.id === item.product.id) {
        data = Object.assign({}, data, item);
      }
      return data;
    });
    console.log('item edited:', this.shoppingCartData);
    this.setLocalStorage(SHOPPING_CART_KEY, this.shoppingCartData);
  }

  deleteShoppingCartItem(item: ShoppingCartItem) {
    this.shoppingCartData = this.shoppingCartData.filter(
      data => data.product.id !== item.product.id
    );
    console.log('item removed:', this.shoppingCartData);
    this.setLocalStorage(SHOPPING_CART_KEY, this.shoppingCartData);
  }
}
