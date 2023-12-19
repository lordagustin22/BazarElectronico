import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';

import { PaginatorPipe } from '../pipes/paginator.pipe';
import { PaginaCrudComponent } from './admin/pagina-crud/pagina-crud.component';
import { HomeRoutingModule } from './home-routing.module';
import { TiendaComponent } from './pages/tienda/tienda.component';

@NgModule({
  declarations: [TiendaComponent, PaginatorPipe, PaginaCrudComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
  ],
})
export class HomeModule {}
