import { Component, OnInit, inject } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { Product } from 'src/app/interfaces/product';
import { PaginatorService } from 'src/app/services/paginator.service';
import { ProductoService } from 'src/app/services/producto.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorService }],
})
export class TiendaComponent implements OnInit {
  currentPage: number = 0;
  pageSize: number = 10;
  pageNumber: number = 1;
  productoService: ProductoService = inject(ProductoService);
  sharedDataService: SharedDataService = inject(SharedDataService);
  productList: Product[] = [];
  filteredProductList: Product[] = [];

  constructor() {
    this.sharedDataService.filteredProductsSubject$.subscribe((filteredProducts) => {
      this.filteredProductList = filteredProducts;
    });
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productoService.getProducts().subscribe((data) => {
      this.productList = data;
    });
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.pageSize = pageEvent.pageSize;
    this.pageNumber = pageEvent.pageIndex + 1;
  }
}
