import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/productos/';
  }

  uploadImage(id: number, image: File): Observable<void> {
    const formData = new FormData();
    formData.append('image', image);

    return this.http.post<void>(
      `${this.myAppUrl}${this.myApiUrl}${id}`,
      formData
    );
  }
}
