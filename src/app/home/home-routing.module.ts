import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditDeleteComponent } from './admin/edit-delete/edit-delete.component';
import { PaginaCrudComponent } from './admin/pagina-crud/pagina-crud.component';
import { DetallesComponent } from './pages/detalles/detalles.component';
import { TiendaComponent } from './pages/tienda/tienda.component';

const routes: Routes = [
  { path: '', component: TiendaComponent },
  { path: 'add', component: PaginaCrudComponent },
  { path: 'edit/:id', component: PaginaCrudComponent },
  { path: 'edit', component: EditDeleteComponent },
  { path: 'detalles/:id', component: DetallesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
