import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getFirstTemplatePass } from '@angular/core/src/render3/state';
import { HttpClient } from '@angular/common/http';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  public items;

  constructor(private route: ActivatedRoute, private _item: ItemService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getItems(params['category']);
    })
  }

  private getItems(cat): void {
    this._item.getItemsByCategory(cat).subscribe(data => {
      this.items = data;
      console.log(this.items);
    })
  }


}
