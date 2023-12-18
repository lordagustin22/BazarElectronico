import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root',
})
export class PaginatorService extends MatPaginatorIntl {
  constructor() {
    super();
  }

  override firstPageLabel: string = 'Primera página';
  override lastPageLabel: string = 'Última página';
  override nextPageLabel: string = 'Siguiente página';
  override previousPageLabel: string = 'Anterior página';
  override itemsPerPageLabel: string = 'Items por página';
  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    return `Página ${page + 1} de ${Math.ceil(length / pageSize)}`;
  };
}
