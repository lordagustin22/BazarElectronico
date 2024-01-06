import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
	name: 'paginator',
})
export class PaginatorPipe implements PipeTransform {
	transform(
		array: Product[],
		pageSize: number | string = 10,
		pageNumber: number = 1
	): Product[] {
		setTimeout(() => {
			if (!array) {
				throw new Error('No hay productos');
			}
		}, 5000);

		if (pageSize === 'all') return array;

		pageSize = pageSize || 10;
		pageNumber = pageNumber || 1;
		--pageNumber;
		// @ts-ignore
		return array.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
	}
}
