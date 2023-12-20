import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Product } from 'src/app/interfaces/product';
import { DataService } from 'src/app/services/data.service';
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
  productList: Product[] = [];
  filteredProductList: Product[] = [];
  dataService: DataService = inject(DataService);
  sharedDataService: SharedDataService = inject(SharedDataService);

  constructor() {
    this.productList = this.dataService.getProducts();
    this.filteredProductList = this.productList;
  }

  ngOnInit(): void {
    this.productList;
    this.sharedDataService.updateAllProducts(this.productList);
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredProductList = this.productList;
    }
    this.filteredProductList = this.productList.filter((product) =>
      product?.name.toLowerCase().includes(text.toLowerCase())
    );
    this.sharedDataService.updateFilteredProducts(this.filteredProductList);
  }
}
