import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BasketItem } from '../models/basket-item';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private basketItems = new BehaviorSubject<BasketItem[]>([]);
  basketItems$ = this.basketItems.asObservable();

  constructor() { }

  getBasketItems(): BasketItem[] {
    return this.basketItems.value;
  }

  addToBasket(sku: number, basketLimit: number): void {
    const currentItems = this.basketItems.value;
    const existingItem = currentItems.find(item => item.sku === sku);

    if (existingItem) {
      if (existingItem.quantity < basketLimit) {
        existingItem.quantity++;
        this.basketItems.next([...currentItems]);
      }
    } else {
      this.basketItems.next([...currentItems, { sku, quantity: 1 }]);
    }
  }

  removeFromBasket(sku: number): void {
    const currentItems = this.basketItems.value;
    const existingItem = currentItems.find(item => item.sku === sku);

    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity--;
        this.basketItems.next([...currentItems]);
      } else {
        this.basketItems.next(currentItems.filter(item => item.sku !== sku));
      }
    }
  }

  updateQuantity(sku: number, quantity: number): void {
    const currentItems = this.basketItems.value;
    const existingItem = currentItems.find(item => item.sku === sku);

    if (existingItem) {
      if (quantity === 0) {
        this.basketItems.next(currentItems.filter(item => item.sku !== sku));
      } else {
        existingItem.quantity = quantity;
        this.basketItems.next([...currentItems]);
      }
    }
  }

  removeAllFromBasket(sku: number): void {
    this.basketItems.next(this.basketItems.value.filter(item => item.sku !== sku));
  }

  getTotalItems(): number {
    return this.basketItems.value.reduce((total, item) => total + item.quantity, 0);
  }

  clearBasket(): void {
    this.basketItems.next([]);
  }
}