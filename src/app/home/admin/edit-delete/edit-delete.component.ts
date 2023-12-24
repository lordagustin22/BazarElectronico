import { Component, OnInit, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-edit-delete',
  templateUrl: './edit-delete.component.html',
  styleUrls: ['./edit-delete.component.scss'],
})
export class EditDeleteComponent implements OnInit {
  productList: Product[] = [];
  filteredProductList$: Observable<Product[]>;
  productoService: ProductoService = inject(ProductoService);

  constructor(private toastr: ToastrService) {
    // Se define la lista de productos filtrados
    this.filteredProductList$ = this.productoService.filteredProducts$;
  }

  ngOnInit(): void {
    this.getProducts();
    this.getFilteredProducts();
  }

  getProducts() {
    this.productoService.getProducts().subscribe((data) => {
      this.productList = data;
    });
  }

  // Lo mismo que lo de arriba pero con los productos filtrados
  getFilteredProducts() {
    this.filteredProductList$.subscribe((filteredData) => {
      this.productList = filteredData || this.productList;
    });
  }

  deleteProduct(id: number) {
    this.productoService.deleteProduct(id).subscribe(() => {
      this.getProducts();
      this.toastr.warning(
        'El producto fue eliminado con exito',
        'Producto eliminado'
      );
    });
  }
}
