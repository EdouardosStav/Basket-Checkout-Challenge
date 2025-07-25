import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { BasketCheckoutComponent } from './components/basket-checkout/basket-checkout.component';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: 'checkout', component: BasketCheckoutComponent }
];