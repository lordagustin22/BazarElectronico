import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
  ],
})
export class SearchbarComponent {
  // Inyección de productoService
  productoService: ProductoService = inject(ProductoService);

  // Esta función se encarga de filtrar el texto buscado, pero la lógica está
  // en productoService
  // si no hay texto, no hay ningún filtro (se muestran todos los productos)
  // caso contrario, se filtran acorde al parámetro
  filterResults(text: string) {
    if (!text) {
      this.productoService.resetFilter();
    }
    this.productoService.filterProducts(text);
  }
}
