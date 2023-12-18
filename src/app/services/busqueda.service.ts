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

  /* getAllProduct(): Product[] {
    return this.productList;
  }

  getProductById(id: number): Product | undefined {
    return this.productList.find((product) => product.id === id);
  } */

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/productos/';
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
}
