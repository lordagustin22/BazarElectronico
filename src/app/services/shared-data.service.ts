import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private filteredProductsSubject = new BehaviorSubject<Product[]>([]);
  filteredProducts$ = this.filteredProductsSubject.asObservable();
  private allProductsSubject = new BehaviorSubject<Product[]>([]);
  allProducts$ = this.allProductsSubject.asObservable();

  updateFilteredProducts(filteredProducts: Product[]) {
    this.filteredProductsSubject.next(filteredProducts);
  }

  updateAllProducts(allProducts: Product[]) {
    this.allProductsSubject.next(allProducts);
    this.updateFilteredProducts(allProducts);
  }
}
