import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/item.model';
import { Order } from '../models/order.model'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl: string = `http://localhost:8000`;

  constructor(private http: HttpClient) { }

  public getItems(): Observable<Object> {
    return this.http.get(`${this.apiUrl}/api/products`);
  }

  public addItem(item: Item): Observable<Object> {
    return this.http.post(`${this.apiUrl}/api/product`, item);
  }

  public getItemsByCategory(category: String): Observable<Object> {
    return this.http.get(`${this.apiUrl}/api/products/${category}`);
  }

  public getItemById(id: String): Observable<Object> {
    return this.http.get(`${this.apiUrl}/api/product/${id}`);
  }

  public addOrder(order: Order): Observable<Object> {
    return this.http.post(`${this.apiUrl}/api/order`, order);
  }
}
