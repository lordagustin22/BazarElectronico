import { Pipe, PipeTransform } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'paginator',
})
export class PaginatorPipe implements PipeTransform {
  transform(
    array$: Observable<Product[]>,
    pageSize: number | string = 10,
    pageNumber: number = 1
  ): Observable<Product[]> {
    return array$.pipe(
      map((array) => {
        if (!array.length) throw new Error('No hay productos');

        if (pageSize === 'all') return array;

        pageSize = pageSize || 10;
        pageNumber = pageNumber || 1;
        --pageNumber;
        // @ts-ignore
        return array.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
      })
    );
  }
}
