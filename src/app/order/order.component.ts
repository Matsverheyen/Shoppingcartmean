import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass']
})
export class OrderComponent implements OnInit {
  public orderId: string;
  public userId: string;

  constructor(private route: ActivatedRoute, private item: ItemService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.orderId = params['id'];
      this.userId = params['user'];
    });
    console.log('called 1');
    this.addOrder();
  }

  public addOrder(): void {
    console.log('Function called', JSON.parse(localStorage.getItem('cart')));
    this.item.addOrder({
      'orderId': this.orderId,
      'userId': this.userId,
      'items': JSON.parse(localStorage.getItem('cart'))
    }).subscribe(data => {
      console.log('called data', data)
    });
  }

}
