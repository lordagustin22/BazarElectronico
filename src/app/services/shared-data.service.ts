import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/product';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  dataService: DataService = inject(DataService);

  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();
  private filteredProductsSubject = new BehaviorSubject<Product[]>([]);
  filteredProducts$ = this.filteredProductsSubject.asObservable();

  get productsObservable() {
    return this.dataService.getProducts();
  }

  set filteredProductsObservableData(data: Product[]) {
    this.filteredProductsSubject.next(data);
  }

  set updateFilteredProducts(filteredProducts: Product[]) {
    this.filteredProductsSubject.next(filteredProducts);
  }

  set updateAllProducts(allProducts: Product[]) {
    this.productsSubject.next(allProducts);
    this.updateFilteredProducts = allProducts;
  }
}
