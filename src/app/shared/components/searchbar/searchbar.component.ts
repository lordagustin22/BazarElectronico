import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BehaviorSubject } from 'rxjs';
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
export class SearchbarComponent implements OnInit {
  // productList: Product[] = [];
  // filteredProductList: Product[] = [];
  productList$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  filteredProductList$: BehaviorSubject<Product[]> = new BehaviorSubject<
    Product[]
  >([]);
  sharedDataService: SharedDataService = inject(SharedDataService);

  constructor() {
    /*
    this.productList = this.dataService.getProducts();
    this.filteredProductList = this.productList;
    */
    // Inicializar sin observables vs con observables
    this.productList$.next(this.sharedDataService.productsObservable);
    this.filteredProductList$.next(this.productList$.value);
  }

  ngOnInit(): void {
    /*
    this.productList;
    this.sharedDataService.updateAllProducts(this.productList);
    */
    // Settear productList sin observables vs suscribirse para escuchar los cambios
    this.productList$.subscribe((products) => {
      this.sharedDataService.updateAllProducts = products;
    });
  }

  filterResults(text: string) {
    const productList = this.productList$.value;
    if (!text) {
      this.filteredProductList$.next(productList);
    }
    const filteredProductList = productList.filter((product) =>
      product?.name.toLowerCase().includes(text.toLowerCase())
    );
    this.filteredProductList$.next(filteredProductList);
    this.sharedDataService.filteredProductsObservableData =
      this.filteredProductList$.value;
  }
}
