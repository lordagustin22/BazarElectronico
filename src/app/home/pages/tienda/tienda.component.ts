import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Storage, getDownloadURL, listAll, ref } from '@angular/fire/storage';
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
	// Servicios e inyecciones
	productoService: ProductoService = inject(ProductoService);
	firestore: Firestore = inject(Firestore);
	storage: Storage = inject(Storage);

	// Declara variables asociadas al paginador
	pageSize: number = 10;
	pageNumber: number = 1;

	// Los productosimport { getStorage, ref, getDownloadURL } from "firebase/storage";

	productList: Product[] = [];
	filteredProductList$: Observable<Product[]>;
	images: string[] = [];
	private destroy$ = new Subject<void>();

	constructor() {
		// Se define la lista de productos filtrados
		this.filteredProductList$ = this.productoService.filteredProducts$;
	}

	ngOnInit(): void {
		this.getImages();
		this.getProducts();
		this.getFilteredProducts();
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
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

	// Conseguimos todos los productos 
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
