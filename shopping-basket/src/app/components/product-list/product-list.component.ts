import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { BasketService } from '../../services/basket.service';
import { Product } from '../../models/product';
import { BasketItem } from '../../models/basket-item';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  basketItems: BasketItem[] = [];
  totalItems = 0;
  totalCost = 0;

  constructor(
    private productService: ProductService,
    private basketService: BasketService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
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

  addToBasket(product: Product) {
    this.basketService.addToBasket(product.sku, product.basketLimit);
  }

  removeFromBasket(product: Product) {
    this.basketService.removeFromBasket(product.sku);
  }

  getItemQuantity(sku: number): number {
    const item = this.basketItems.find(i => i.sku === sku);
    return item ? item.quantity : 0;
  }

  goToCheckout() {
    this.router.navigate(['/checkout']);
  }
}