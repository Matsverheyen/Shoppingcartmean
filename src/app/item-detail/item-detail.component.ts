import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.sass']
})
export class ItemDetailComponent implements OnInit {

  public detailItem;

  constructor(private route: ActivatedRoute, private item: ItemService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.item.getItemById(params['item']).subscribe(data => {
        this.detailItem = data;
        console.log(data);
      });
    })
  }

}
