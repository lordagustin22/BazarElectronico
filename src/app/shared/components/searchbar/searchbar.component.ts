import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
  ],
})
export class SearchbarComponent {
  // productList: Product[] = [];
  // filteredProductList: Product[] = [];
  // productList$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  // filteredProductList$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([])
  productList$: Observable<Product[]>;
  filteredProductList$: Observable<Product[]>;
  sharedDataService: SharedDataService = inject(SharedDataService);

  constructor() {
    /*
    this.productList = this.dataService.getProducts();
    this.filteredProductList = this.productList;
    */
    // Inicializar sin observables vs con observables
    this.productList$ = this.sharedDataService.productsObservable;
    this.filteredProductList$ = this.productList$;
  }

  filterResults(text: string) {
    this.productList$.subscribe((products) => {
      if (!text) {
        this.filteredProductList$ = this.productList$;
      }
      const filteredProductList = products.filter((product) =>
        product?.name.toLowerCase().includes(text.toLowerCase())
      );
      this.filteredProductList$ = of(filteredProductList);
      this.sharedDataService.filteredProductsObservableData =
        filteredProductList;
    });
  }
}
