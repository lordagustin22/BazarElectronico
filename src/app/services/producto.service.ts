import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private myAppUrl: string;
  private myApiUrl: string;
  private productList: Product[] = [];
  // prettier-ignore
  private filteredProductsSubject$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  filteredProducts$ = this.filteredProductsSubject$.asObservable();

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'productos/';

    // Definicion de productList en el constructor para poder utilizarlo
    this.getProducts().subscribe((products) => {
      this.productList = products;
    });
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

  // Definicion del CRUD
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  saveProduct(product: Product): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, product);
  }

  updateProduct(id: number, product: Product): Observable<void> {
    return this.http.put<void>(
      `${this.myAppUrl}${this.myApiUrl}${id}`,
      product
    );
  }
}
