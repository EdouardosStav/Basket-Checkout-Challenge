import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { BasketService } from '../../services/basket.service';
import { Product } from '../../models/product';
import { BasketItem } from '../../models/basket-item';

@Component({
  selector: 'app-basket-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './basket-checkout.component.html',
  styleUrls: ['./basket-checkout.component.css']
})
export class BasketCheckoutComponent implements OnInit {
  products: Product[] = [];
  basketItems: BasketItem[] = [];
  totalItems = 0;
  totalCost = 0;
  cardNumber = '';
  isCardValid = false;
  showSuccess = false;

  constructor(
    private productService: ProductService,
    private basketService: BasketService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.calculateTotals();
    });

    this.basketService.basketItems$.subscribe(items => {
      this.basketItems = items;
      this.calculateTotals();
    });
  }

  calculateTotals() {
    this.totalItems = this.basketService.getTotalItems();
    this.totalCost = this.basketItems.reduce((total, item) => {
      const product = this.products.find(p => p.sku === item.sku);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  }

  getProduct(sku: number): Product | undefined {
    return this.products.find(p => p.sku === sku);
  }

  getItemTotal(item: BasketItem): number {
    const product = this.getProduct(item.sku);
    return product ? product.price * item.quantity : 0;
  }

  updateQuantity(item: BasketItem, event: any) {
    const newQuantity = parseInt(event.target.value);
    this.basketService.updateQuantity(item.sku, newQuantity);
  }

  removeAll(sku: number) {
    this.basketService.removeAllFromBasket(sku);
  }

  validateCard() {
    this.isCardValid = this.cardNumber.replace(/\s/g, '').length === 16;
  }

  continueShopping() {
    this.router.navigate(['/products']);
  }

  checkout() {
    if (this.isCardValid && this.basketItems.length > 0) {
      this.showSuccess = true;
      setTimeout(() => {
        this.basketService.clearBasket();
        this.router.navigate(['/products']);
      }, 2000);
    }
  }

  getQuantityOptions(product: Product): number[] {
    return Array.from({length: product.basketLimit}, (_, i) => i + 1);
  }
}