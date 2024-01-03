import { Injectable, inject } from '@angular/core';
import {
	Firestore,
	addDoc,
	collection,
	collectionData,
	deleteDoc,
	doc,
	updateDoc,
} from '@angular/fire/firestore';
import { getDoc } from '@firebase/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
	providedIn: 'root',
})
export class ProductoService {
	firestore: Firestore = inject(Firestore);

	private productList: Product[] = [];
	// prettier-ignore
	private filteredProductsSubject$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
	filteredProducts$ = this.filteredProductsSubject$.asObservable();

	constructor() {
		this.getProducts().subscribe((products) => {
			this.productList = products;
		});
	}

	addProduct(product: Product): Promise<any> {
		const coleccion = collection(this.firestore, 'productos');
		return addDoc(coleccion, product);
	}

	getProducts(): Observable<Product[]> {
		const coleccion = collection(this.firestore, 'productos');
		return collectionData(coleccion, { idField: 'id' }) as Observable<
			Product[]
		>;
	}

	getProduct(id: string): Promise<any> {
		const documento = doc(this.firestore, 'productos', id);
		return getDoc(documento);
	}

	updateProduct(product: Product): Promise<any> {
		const documento = doc(
			this.firestore,
			'productos',
			`productos/${product.id}`
		);
		return updateDoc(documento, { merge: true });
	}

	deleteProduct(product: Product): Promise<any> {
		const documento = doc(
			this.firestore,
			'productos',
			`productos/${product.id}`
		);
		return deleteDoc(documento);
	}

	// Filtrado de producto en base a si un substring está incluido o
	// es igual al string
	filterProducts(text: string) {
		const filteredProductList = this.productList.filter((product) =>
			product?.name.toLowerCase().includes(text.toLowerCase())
		);
		this.filteredProductsSubject$.next(filteredProductList);
	}

	resetFilter() {
		this.filteredProductsSubject$.next(this.productList);
	}
}
