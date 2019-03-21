import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  ProductInfo,
  CategoryInfo,
  ShoppingCartItem,
  OrderInfo
} from '../interface/ec-template.interface';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

const SHOPPING_CART_KEY = 'shopping-cart-data';
const ORDER_INFO_KEY = 'order-info';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private headers = new HttpHeaders();
  productList$ = new BehaviorSubject<ProductInfo[]>([]);
  categoryList$ = new BehaviorSubject<CategoryInfo[]>([]);
  currentCategory$ = new BehaviorSubject<string>('all');
  currentProductListByCategory$ = new BehaviorSubject<ProductInfo[]>([]);

  shoppingCartData: ShoppingCartItem[] = [];

  constructor(
    private http: HttpClient,
    private notifierService: NotifierService,
    private router: Router
  ) {
    this.initData();
    this.currentCategory$.subscribe(() => {
      if (this.categoryList$.value.length !== 0) {
        this.getProductListByCategory();
      }
    });
  }

  setHeaders(key: string, value: string) {
    this.headers.set(key, value);
  }

  private initData() {
    this.loadShoppingCart();
    forkJoin(this.getAllProductList(), this.getCategoryList()).subscribe((data: any) => {
      this.productList$.next(data[0]);
      console.log('products:', this.productList$.value);
      this.categoryList$.next(data[1]);
      console.log('categories:', this.categoryList$.value);
      this.setCategoryCount();
      this.getProductListByCategory();
    });
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

  setCurrentCategory(category: string) {
    this.currentCategory$.next(category);
  }

  getMenuList() {
    return this.http.get('./assets/data/menu-list.json', { headers: this.headers });
  }

  private getProductListByCategory() {
    if (this.currentCategory$.value === 'all') {
      this.currentProductListByCategory$.next(this.productList$.value);
    } else {
      this.currentProductListByCategory$.next(
        this.categoryList$.value.find(data => {
          return data.name === this.currentCategory$.value;
        }).products
      );
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

  private loadShoppingCart() {
    if (this.getLocalStorage(SHOPPING_CART_KEY)) {
      this.shoppingCartData = this.getLocalStorage(SHOPPING_CART_KEY);
    }
    console.log('SC Data from LocalStorage', this.shoppingCartData);
  }

  addShoppingCartItem(item: ShoppingCartItem) {
    if (
      this.shoppingCartData.find(data => {
        return data.product.id === item.product.id && data.option.value === item.option.value;
      })
    ) {
      for (const i of this.shoppingCartData) {
        if (i.product.id === item.product.id && i.option.value === item.option.value) {
          i.quantity = i.quantity + item.quantity;
        }
      }
    } else {
      this.shoppingCartData = [...this.shoppingCartData, item];
    }
    console.log('item added:', this.shoppingCartData);
    this.setLocalStorage(SHOPPING_CART_KEY, this.shoppingCartData);
    this.notifierService.notify(
      'default',
      `Add ${item.product.name} - ${item.option.name.toUpperCase()} to cart`
    );
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
      data => !(data.product.id === item.product.id && data.option.value === item.option.value)
    );
    console.log('item removed:', this.shoppingCartData);
    this.setLocalStorage(SHOPPING_CART_KEY, this.shoppingCartData);
    this.notifierService.notify(
      'warning',
      `Remove ${item.product.name} - ${item.option.name.toUpperCase()}`
    );
  }

  saveOrderInfo(data: OrderInfo) {
    this.setLocalStorage(ORDER_INFO_KEY, data);
  }

  getOrderInfo() {
    return this.getLocalStorage(ORDER_INFO_KEY);
  }

  submitOrder(order: OrderInfo) {
    console.log('Order Info:', order);
    this.notifierService.notify('default', 'Submit Success');
    // Delete shopping cart items and order from local storage then redirect to shopping Cart
    this.removeLocalStorage(SHOPPING_CART_KEY);
    this.removeLocalStorage(ORDER_INFO_KEY);
    this.shoppingCartData = [];
    setTimeout(() => {
      this.router.navigate(['shopping-cart']);
    }, 2000);
  }
}
