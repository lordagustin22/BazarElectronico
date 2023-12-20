import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';

import { PaginatorPipe } from '../pipes/paginator.pipe';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { SearchbarComponent } from '../shared/components/searchbar/searchbar.component';
import { EditDeleteComponent } from './admin/edit-delete/edit-delete.component';
import { PaginaCrudComponent } from './admin/pagina-crud/pagina-crud.component';
import { HomeRoutingModule } from './home-routing.module';
import { DetallesComponent } from './pages/detalles/detalles.component';
import { TiendaComponent } from './pages/tienda/tienda.component';

@NgModule({
  declarations: [
    PaginatorPipe,
    TiendaComponent,
    PaginaCrudComponent,
    EditDeleteComponent,
    DetallesComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    NavbarComponent,
    SearchbarComponent,
  ],
})
export class HomeModule {}
