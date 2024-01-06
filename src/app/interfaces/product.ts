export interface Product {
	id?: string;
	name: string;
	description: string;
	price: number;
	image: string;
	fechaCreacion?: Date;
	fechaActualizacion: Date;
}
