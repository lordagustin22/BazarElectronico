import { Component, OnInit } from '@angular/core';
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
  form: FormGroup;
  operacion: string = 'Agregar ';
  id: number;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, Validators.required],
      images: [null, Validators.required],
    });
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  // Se hace cast a number y null pasa a ser 0
  // 0 significa que la operacion es agregar elemento
  ngOnInit(): void {
    // Operacion es editar
    if (this.id !== 0) {
      this.operacion = 'Editar ';
      this.getProduct(this.id);
    }
  }

  uploadImage($event: Event) {
    const input = $event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
    }
  }

  getProduct(id: number) {
    // Conseguimos un producto por su id y le seteamos los valores
    // ya existentes que este tençia
    this.productoService.getProduct(id).subscribe((data: Product) => {
      this.form.setValue({
        name: data.name,
        description: data.description,
        price: data.price,
        images: data.images || null,
      });
    });
  }

  addProduct() {
    const product: Product = {
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      images: this.form.value.images,
    };

    // Toastr nos muestra notificaciones
    if (this.id !== 0) {
      // Editar
      product.id = this.id;
      this.productoService.updateProduct(this.id, product).subscribe(() => {
        this.toastr.info(
          `El producto ${product.name} fue actualizado con exito`
        );
        // esto te hace ir a la pagina /edit despues del submit
        this.router.navigate(['/edit']);
      });
    } else {
      // Agregar
      this.productoService.saveProduct(product).subscribe(() => {
        this.toastr.success(
          `El producto ${product.name} fue registrado con exito`,
          'Producto registrado'
        );
        this.router.navigate(['/']).then(() => {
          this.router.navigate(['/add']);
        });
      });
    }
  }
}
