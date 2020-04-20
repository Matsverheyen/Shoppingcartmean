import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Item[] = [];

  constructor() { }

  public addToCart(item): void {
    if (this.items.find(x => x._id === item._id) !== undefined) {
      this.items.find(x => x._id === item._id).qty++
    } else {
      item.qty = 1;
      this.items.push(item)
    }
    this.updateCart();
  }

  public getCartItems(): any {
    return JSON.parse(localStorage.getItem('cart'));
  }

  private updateCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  public removeFromCart(id): void {
    this.items = JSON.parse(localStorage.cart);
    let index: number = this.items.map((item) => {return item._id}).indexOf(id);
    this.items.splice(index, 1);
    this.updateCart();
  }

  public updateQty(id: string, amount: number): void {
    this.items = this.getCartItems();
    this.items.find(x => x._id === id).qty = parseInt(amount);
    this.updateCart();
  }


}