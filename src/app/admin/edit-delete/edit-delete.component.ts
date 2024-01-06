import { Component, OnInit, inject } from '@angular/core';
import { Storage, getDownloadURL, listAll, ref } from '@angular/fire/storage';
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
	toastr: ToastrService = inject(ToastrService);
	storage: Storage = inject(Storage);

	images: string[] = [];

	constructor() {
		// Se define la lista de productos filtrados
		this.filteredProductList$ = this.productoService.filteredProducts$;
	}

	ngOnInit(): void {
		this.getProducts();
		this.getFilteredProducts();
	}

	// CRUD
	// Conseguir todos los productos
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

	// Borrar un producto
	deleteProduct(id: string) {
		this.productoService.deleteProduct(id).then(() => {
			this.toastr.warning(
				'El producto fue eliminado con exito',
				'Producto eliminado'
			);
		});
	}
}
