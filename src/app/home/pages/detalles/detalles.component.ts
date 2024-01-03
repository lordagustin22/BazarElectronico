import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
	selector: 'app-detalles',
	templateUrl: './detalles.component.html',
	styleUrls: ['./detalles.component.scss'],
})
export class DetallesComponent implements OnInit {
	productoService: ProductoService = inject(ProductoService);
	route: ActivatedRoute = inject(ActivatedRoute);
	id: string | null;
	product: Product | null = null;

	constructor() {
		this.id = this.route.snapshot.paramMap.get('id');
	}

	ngOnInit(): void {
		this.getProduct(this.id!);
	}

	getProduct(id: string) {
		this.productoService.getProduct(id).then((p) => {
			this.product = p;
			console.log(this.product);
		});
	}
}
