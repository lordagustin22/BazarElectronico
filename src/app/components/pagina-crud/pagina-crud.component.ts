import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Product } from 'src/app/interfaces/product';
import { BusquedaService } from 'src/app/services/busqueda.service';

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
    private busquedaService: BusquedaService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, Validators.required],
    });
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
    aRouter.snapshot.paramMap.get('id');
  }

  // Se hace cast a number y null pasa a ser 0
  // 0 significa que la operacion es agregar elemento
  ngOnInit(): void {
    // Operacion es editar
    if (this.id !== 0) {
      this.operacion = 'Editar ';
      this.getProductById(this.id);
    }
  }

  getProductById(id: number) {
    this.busquedaService.getProductById(id).subscribe((data: Product) => {
      this.form.setValue({
        name: data.name,
        description: data.description,
        price: data.price,
      });
    });
  }

  addProduct() {
    const product: Product = {
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
    };

    if (this.id !== 0) {
      // Editar
      product.id = this.id;
      this.busquedaService.updateProduct(this.id, product).subscribe(() => {
        this.toastr.info(
          `El producto ${product.name} fue actualizado con exito`
        );
        this.router.navigate(['/']);
      });
    } else {
      // Agregar
      this.busquedaService.saveProduct(product).subscribe(() => {
        this.toastr.success(
          `El producto ${product.name} fue registrado con exito`,
          'Producto registrado'
        );
        this.router.navigate(['/']);
      });
    }
  }
}
