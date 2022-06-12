import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { OrderData } from 'src/app/models/order.interface';
import { DataStoreService } from 'src/app/services/data-store.service';
import { ProductsService } from 'src/app/services/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  @Input() title = '';
  cartItems: any;
  subscription!: Subscription;
  cartTotal: number = 0;
  cartItemSubscription!: Subscription;

  constructor(private dataStore: DataStoreService) { }

  ngOnInit(): void {
    this.subscription = this.dataStore.cartItems$.subscribe(items => {
      this.cartItems = items;

    });

    this.cartItemSubscription = this.dataStore.cartItems$.subscribe(items => {
      this.cartTotal = 0
      items.forEach((item)=>{
        this.cartTotal += Number(item.price.replace('$',''))
        this.dataStore.carttotal = this.cartTotal
      })
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.cartItemSubscription.unsubscribe();
  }

  onSearch(text: string) {
    this.dataStore.filterProducts(text);
  }

}
