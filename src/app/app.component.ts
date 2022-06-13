import { Component, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'humber-angular-assignment-2';

  constructor(private productsService: ProductsService){}

  ngOnInit() : void {
    this.productsService.getProducts();
    this.productsService.getOrderData();
  }
}
