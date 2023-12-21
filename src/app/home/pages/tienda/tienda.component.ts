import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { Observable, Subject, of, takeUntil } from 'rxjs';
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
export class TiendaComponent implements OnInit, OnDestroy {
  // Services
  productoService: ProductoService = inject(ProductoService);
  sharedDataService: SharedDataService = inject(SharedDataService);

  filteredProductListLength = 0;
  pageSize: number = 10;
  pageNumber: number = 1;
  productList: Product[] = [];
  filteredProductList$: Observable<Product[]>;
  private unsubscribe$ = new Subject<void>();

  constructor() {
    this.filteredProductList$ =
      this.sharedDataService.filteredProductsSubject$.pipe(
        takeUntil(this.unsubscribe$)
      );
    this.filteredProductList$.subscribe(
      (products) => (this.filteredProductListLength = products.length)
    );
  }

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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
