import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {
  public cartItems: any;

  constructor(private auth: AuthService, private router: Router, private cart: CartService) { }

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    console.log(this.cart.getCartItems());
    this.cartItems = this.cart.getCartItems();
  }

  public removeFromCart(id): void {
    
  }

}
