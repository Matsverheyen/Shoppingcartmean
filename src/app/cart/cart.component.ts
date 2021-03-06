import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { PaymentService } from '../payment.service';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {
  public cartItems: any;
  public totalprice: number[] = [];
  public total: number;
  public methods: Object[];
  public ordersItem;

  constructor(private auth: AuthService, private router: Router, private cart: CartService, private payment: PaymentService, private item: ItemService) { }

  ngOnInit() {
    this.updateCart();
    this.getOrders();
  }

  public removeFromCart(id): void {
    this.cart.removeFromCart(id);
    this.updateCart();
  }

  private updateCart(): void {
    this.cartItems = this.cart.getCartItems();
    this.getTotal();
  }

  private getOrders(): void {
    let user = {
      'userToken': localStorage.getItem('access_token')
    }
    console.log('user order', user);
    this.item.getOrder(user).subscribe(data => {
      this.ordersItem = data;
      console.log(data);
      this.getOrderData(data)
    });
  }

  public getOrderData(data): void {
    
  }

  public onSearchChange(value: number, id: string): void {
    console.log('event called!', value, id);
    if (value == 0) {
      this.removeFromCart(id);
    } else {
      console.log('updateQty called')
      this.cart.updateQty(id, value);
    }
    this.getTotal();
  }

  public getTotal(): any {
    this.total = this.cart.getTotal();
  }

  public checkout(): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    this.getTotal();
    let info = {
      description: localStorage.cart,
      amount: this.total.toFixed(2).toString(),
      userToken: localStorage.getItem('access_token')
    }
    console.log(info);
    this.payment.newPayment(info).subscribe((url) => {
      window.location.href = url;
    })
  }

}
