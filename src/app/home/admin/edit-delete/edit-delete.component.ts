import { Component, OnInit, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-edit-delete',
  templateUrl: './edit-delete.component.html',
  styleUrls: ['./edit-delete.component.scss'],
})
export class EditDeleteComponent implements OnInit {
  productList: Product[] = [];
  productoService: ProductoService = inject(ProductoService);

  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productoService.getProducts().subscribe((data) => {
      this.productList = data;
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
