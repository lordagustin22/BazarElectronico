import { Component, OnInit, inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
	selector: 'app-pagina-crud',
	templateUrl: './pagina-crud.component.html',
	styleUrls: ['./pagina-crud.component.scss'],
})
export class PaginaCrudComponent implements OnInit {
	// Servicios e inyecciones
	fb: FormBuilder = inject(FormBuilder);
	productoService: ProductoService = inject(ProductoService);
	router: Router = inject(Router);
	toastr: ToastrService = inject(ToastrService);
	aRouter: ActivatedRoute = inject(ActivatedRoute);

	createProduct: FormGroup;
	operacion: string = 'Agregar ';
	id: string | null;

	constructor() {
		this.createProduct = this.fb.group({
			name: ['', Validators.required],
			description: ['', Validators.required],
			price: [null, Validators.required],
			images: [null, Validators.required],
		});
		this.id = this.aRouter.snapshot.paramMap.get('id');
	}

	ngOnInit(): void {
		this.esEditar();
	}

	addEditProduct() {
		if (this.createProduct.invalid) {
			return;
		}

		if (this.id === null) {
			this.addProduct();
		} else {
			this.editProduct();
		}
	}

	uploadImage($event: Event) {
		const input = $event.target as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			const file = input.files[0];
		}
	}

	addProduct() {
		const product: Product = {
			name: this.createProduct.value.name,
			description: this.createProduct.value.description,
			price: this.createProduct.value.price,
			images: this.createProduct.value.images,
			fechaCreacion: new Date(),
			fechaActualizacion: new Date(),
		};
		// Agregar
		this.productoService
			.addProduct(product)
			.then(() => {
				this.toastr.success(
					`El producto ${product.name} fue registrado con exito`,
					'Producto registrado'
				);
				this.router.navigate(['/']).then(() => {
					this.router.navigate(['/add']);
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	editProduct() {
		const product: Product = {
			name: this.createProduct.value.name,
			description: this.createProduct.value.description,
			price: this.createProduct.value.price,
			images: this.createProduct.value.images,
			fechaActualizacion: new Date(),
		};

		// Editar
		this.productoService.updateProduct(product).then(() => {
			this.toastr.info(`El producto ${product.name} fue actualizado con exito`);
			// esto te hace ir a la pagina /edit despues del submit
			this.router.navigate(['/edit']);
		});
	}

	esEditar() {
		this.operacion = 'Editar ';
		if (this.id !== null) {
			this.productoService.getProduct(this.id).then((data) => {
				this.createProduct.setValue({
					nombre: data.payload.data()['nombre'],
					apellido: data.payload.data()['apellido'],
					documento: data.payload.data()['documento'],
					salario: data.payload.data()['salario'],
				});
			});
		}
	}
}
