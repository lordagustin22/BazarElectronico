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
  private id: number;
  product: Product | null = null;

  constructor(private route: ActivatedRoute) {
    this.id = Number(route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getProduct(this.id);
  }

  getProduct(id: number) {
    this.productoService.getProduct(id).subscribe((p) => {
      this.product = p;
      console.log(this.product);
    });
  }
}
