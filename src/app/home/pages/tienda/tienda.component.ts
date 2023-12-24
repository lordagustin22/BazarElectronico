import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { PaginatorService } from 'src/app/services/paginator.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorService }],
})
export class TiendaComponent implements OnInit, OnDestroy {
  // Services
  productoService: ProductoService = inject(ProductoService);

  // Declara variables asociadas al paginador
  pageSize: number = 10;
  pageNumber: number = 1;

  // Los productos
  productList: Product[] = [];
  filteredProductList$: Observable<Product[]>;
  private destroy$ = new Subject<void>();

  constructor() {
    // Se define la lista de productos filtrados
    this.filteredProductList$ = this.productoService.filteredProducts$;
  }

  ngOnInit(): void {
    this.getProducts();
    this.getFilteredProducts();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Aquí se consiguen todos los productos para mostrar en el DOM
  // Dado que no se usa el pipe async en el template, usamos el ngDestroy
  getProducts() {
    this.productoService
      .getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.productList = data;
      });
  }

  // Lo mismo que lo de arriba pero con los productos filtrados
  getFilteredProducts() {
    this.filteredProductList$
      .pipe(takeUntil(this.destroy$))
      .subscribe((filteredData) => {
        this.productList = filteredData || this.productList;
      });
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.pageSize = pageEvent.pageSize;
    this.pageNumber = pageEvent.pageIndex + 1;
  }
}
