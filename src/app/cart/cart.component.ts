import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { PaymentService } from '../payment.service';

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

  constructor(private auth: AuthService, private router: Router, private cart: CartService, private payment: PaymentService) { }

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    this.updateCart();
  }

  public removeFromCart(id): void {
    this.cart.removeFromCart(id);
    this.updateCart();
  }

  private updateCart(): void {
    this.cartItems = this.cart.getCartItems();
    this.getTotal();
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
    this.totalprice = [];
    JSON.parse(localStorage.cart).forEach(el => {
      this.totalprice.push(el.qty * el.price)
      this.total = this.totalprice.reduce((a, b) => a + b, 0);
    });
  }

  public checkout(): void {
    let info = {
      description: localStorage.cart,
      amount: this.total.toString()
    }
    this.payment.newPayment(info).subscribe((url) => {
      window.location.href = url;
    })
  }

}
