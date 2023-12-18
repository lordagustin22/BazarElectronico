import { Component, OnInit, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { BusquedaService } from 'src/app/services/busqueda.service';

@Component({
  selector: 'app-edit-delete',
  templateUrl: './edit-delete.component.html',
  styleUrls: ['./edit-delete.component.scss'],
})
export class EditDeleteComponent implements OnInit {
  productList: Product[] = [];
  busquedaService: BusquedaService = inject(BusquedaService);

  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.busquedaService.getProducts().subscribe((data) => {
      this.productList = data;
    });
  }

  deleteProduct(id: number) {
    this.busquedaService.deleteProduct(id).subscribe(() => {
      this.getProducts();
      this.toastr.warning(
        'El producto fue eliminado con exito',
        'Producto eliminado'
      );
    });
  }
}
