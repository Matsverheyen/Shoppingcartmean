import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getFirstTemplatePass } from '@angular/core/src/render3/state';
import { HttpClient } from '@angular/common/http';
import { ItemService } from '../item.service';
import { Item } from '../../models/item.model';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  public items;
  public category: string = "";

  constructor(private route: ActivatedRoute, private _item: ItemService, private cart: CartService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getItems(params['category']);
      this.category = params['category'];
    })
  }

  private getItems(cat): void {
    this._item.getItemsByCategory(cat).subscribe(data => {
      this.items = data;
      if (this.items.length == 0) {
        this.router.navigate(['/']);
      }
    })
  }

  public addToCart(item): void {
    this.cart.addToCart(item);
  }

  public getResults(): string {
    return this.items.length == 1 ? 'resultaat' : 'resultaten'
  }


}
