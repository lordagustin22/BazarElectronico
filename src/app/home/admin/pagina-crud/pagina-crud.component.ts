import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { ImageUploadService } from 'src/app/services/image-upload.service';
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
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
    private imageUploadService: ImageUploadService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, Validators.required],
      image: [null, Validators.required],
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
    this.productoService.getProductById(id).subscribe((data: Product) => {
      this.form.setValue({
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image || null,
      });
    });
  }

  addProduct() {
    const product: Product = {
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      image: this.form.value.image,
    };

    if (this.id !== 0) {
      // Editar
      product.id = this.id;
      this.productoService.updateProduct(this.id, product).subscribe(() => {
        this.toastr.info(
          `El producto ${product.name} fue actualizado con exito`
        );
        this.router.navigate(['/']);
      });
    } else {
      // Agregar
      this.productoService.saveProduct(product).subscribe(() => {
        this.toastr.success(
          `El producto ${product.name} fue registrado con exito`,
          'Producto registrado'
        );
        this.router.navigate(['/']);
      });
    }
  }

  onFileSelected(event: any): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement?.files?.length) {
      this.selectedFile = inputElement.files[0];
      this.form.patchValue({ image: this.selectedFile });
      this.uploadImage();
    }
  }

  private uploadImage(): void {
    const imageControl = this.form.get('image');

    if (imageControl && imageControl.value instanceof File) {
      const imageFile = imageControl.value;
      this.imageUploadService.uploadImage(this.id, imageFile).subscribe(
        (response) => {
          console.log('Imagen subida con exito', response);
          // Handle success, e.g., update UI or navigate to another page
        },
        (error) => {
          console.error('Error subiendo imagen', error);
          // Handle error, e.g., show an error message to the user
        }
      );
    } else {
      console.error('Formato de imagen invalido');
      // You might want to handle this case, e.g., show an error message to the user
    }
  }
}
