import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditDeleteComponent } from '../components/edit-delete/edit-delete.component';
import { PaginaCrudComponent } from '../components/pagina-crud/pagina-crud.component';
import { TiendaComponent } from './pages/tienda/tienda.component';

const routes: Routes = [
  { path: '', component: TiendaComponent },
  { path: 'add', component: PaginaCrudComponent },
  { path: 'edit/:id', component: PaginaCrudComponent },
  { path: 'edit', component: EditDeleteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
