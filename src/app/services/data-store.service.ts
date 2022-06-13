import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { OrderData } from '../models/order.interface';
import { ProductData } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  private _products: BehaviorSubject<ProductData[] | any> = new BehaviorSubject(null);
  products$: Observable<ProductData[]> = this._products.asObservable();

  private _orders: BehaviorSubject<OrderData[] | any> = new BehaviorSubject(null);
  orders$: Observable<OrderData[]> = this._orders.asObservable();

  private _cartItems: BehaviorSubject<ProductData[] | any> = new BehaviorSubject([]);
  cartItems$: Observable<ProductData[]> = this._cartItems.asObservable();
  private fullProductList!: ProductData[]

  carttotal: number = 0;

  constructor() { }

  getcarttotal() {
    return this.carttotal;
  }

  setProducts(products: ProductData[]) {
    this._products.next(products);
  }

  setOrders(orders: OrderData[]) {
    this._orders.next(orders);
  }

  addOrder(order: OrderData) {
    const currentOrders = this._orders.value;
    const updatedOrders = [...currentOrders, order];
    this.setOrders(updatedOrders);
  }

  clearCart() {
    this._cartItems.next([]);
  }

  addToCart(item: ProductData) {
    this._cartItems.pipe(
      take(1)
    ).subscribe((cartItems: ProductData[]) => {
      cartItems.push(item);
      this._cartItems.next(cartItems);
    });
  }

  filterProducts(text: string) {
    this._products.pipe(
      take(1)
    ).subscribe(products => {
      if (text === "") {
        this._products.next(this.fullProductList)
      } else {
        const filteredProducts = products.filter((product: ProductData) => {
          const lowerCaseText = text.toLowerCase();
          const productName = product.name.toLowerCase();
          return productName.includes(lowerCaseText)
        })

        this._products.next(filteredProducts);
      }
    })
  }

  setFullProductsList(products: ProductData[]) {
    this.fullProductList = products;
  }
}
