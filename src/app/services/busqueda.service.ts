import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class BusquedaService {
  private myAppUrl: string;
  private myApiUrl: string;

  /*
  async getAllProduct(): Promise<Product[]> {
    const data = await fetch(this.myAppUrl);
    return (await data.json()) ?? {};
  }

  async getProductById(id: number): Promise<Product | undefined> {
    const data = await fetch(`${this.myAppUrl}/${id}`);
    return (await data.json()) ?? {};
  }
  */

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/productos/';
  }

  // Funciones asincronas de find all y findById
  // La diferencia entre estas funciones con observables
  // y las de arriba es que estas son esencialmente promesas
  // pero usan los observables de Angular

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getProductById(id: number): Observable<Product> {
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
