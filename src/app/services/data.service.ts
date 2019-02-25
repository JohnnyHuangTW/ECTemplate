import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  headers = new HttpHeaders();
  constructor(private http: HttpClient) {}

  setHeaders(key: string, value: string) {
    this.headers.set(key, value);
  }

  getProductList() {
    return this.http.get('../../assets/data/product-list.json', { headers: this.headers });
  }
}
