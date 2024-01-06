import { Component, OnInit, inject } from '@angular/core';
import {
	Storage,
	getDownloadURL,
	listAll,
	ref,
	uploadBytes,
} from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
	storage: Storage = inject(Storage);

	createProduct: FormGroup;
	operacion: string = 'Agregar ';
	id: string | null;
	images: string[] = [];

	constructor() {
		this.createProduct = this.fb.group({
			name: ['', Validators.required],
			description: ['', Validators.required],
			price: [null, Validators.required],
			image: [''],
		});
		this.id = this.aRouter.snapshot.paramMap.get('id');
	}

	ngOnInit(): void {
		this.esEditar();
	}

	// Nos fijamos que la id no sea null para ver si
	// agregamos o editamos el producto
	addEditProduct() {
		if (this.createProduct.invalid) {
			return;
		}

		this.id === null ? this.addProduct() : this.editProduct(this.id);
	}

	// Subimos una imagen
	async uploadImage($event: Event) {
		// Nos fijamos que el file no sea null
		const file = ($event.target as HTMLInputElement).files?.[0];
		if (!file) {
			console.log('No hay archivo seleccionado');
			return;
		}

		// Seteamos el storage que usamos y la ruta que tendra el archivo
		// a su vez el archivo en sí mismo es el atributo name
		// que tiene file
		const imgRef = ref(this.storage, `images/${file.name}`);
		try {
			await uploadBytes(imgRef, file); // funcion para subir imagen BLOB
			const url = await getDownloadURL(imgRef); // conseguimos la url
			console.log(url);
		} catch (err) {
			console.log(err);
		}
	}

	// Conseguir las imagenes de la nube
	async getImages() {
		const imagesRef = ref(this.storage, 'images');
		const res = await listAll(imagesRef);
		this.images = [];
		for (const item of res.items) {
			const url = await getDownloadURL(item);
			this.images.push(url);
		}
	}

	// Añadir un producto
	async addProduct() {
		try {
			const product: Product = {
				name: this.createProduct.value.name,
				description: this.createProduct.value.description,
				price: this.createProduct.value.price,
				image: this.createProduct.value.image,
				fechaCreacion: new Date(),
				fechaActualizacion: new Date(),
			};
			await this.productoService.addProduct(product);
			this.toastr.success(
				`El producto ${product.name} fue registrado con exito`,
				'Producto registrado'
			);

			await this.router.navigate(['/']);
			await this.router.navigate(['/add']);
		} catch (err) {
			console.log(err);
		}
	}

	// Editar un producto
	async editProduct(id: string) {
		try {
			const product: Product = {
				name: this.createProduct.value.name,
				description: this.createProduct.value.description,
				price: this.createProduct.value.price,
				image: this.createProduct.value.image,
				fechaActualizacion: new Date(),
			};

			await this.productoService.updateProduct(id, product);
			this.toastr.info(`El producto ${product.name} fue actualizado con exito`);
			this.router.navigate(['/edit']);
		} catch (err) {
			console.log(err);
		}
	}

	// Con esto determinamos que la id es distinta de null
	// entonces la operacion es de editar y podemos conseguir los campos
	// del producto y editarlos
	async esEditar() {
		if (this.id !== null) {
			this.operacion = 'Editar ';
			const data = await this.productoService.getProduct(this.id);
			try {
				this.createProduct.patchValue({
					name: data.name,
					description: data.description,
					price: data.price,
					image: data.image,
				});
			} catch (err) {
				console.log(err);
			}
		}
	}
}
