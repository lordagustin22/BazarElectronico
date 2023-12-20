import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  productList: Product[] = [
    {
      id: 1,
      name: 'Pileta Nº1',
      image: '../assets/producto1.png',
      price: 100,
      description: 'Pileta 300lts 1.1m x 0.9m x 0.3m',
    },
    {
      id: 2,
      name: 'Pileta Nº2',
      image: '../assets/pileta2.jpeg',
      price: 100,
      description: 'Pileta 800lts 1.6m x 1.1m x 0.45m',
    },
    {
      id: 3,
      name: 'Pileta Nº3',
      image: '../assets/pileta3.jpeg',
      price: 100,
      description: 'Pileta 1250lts 2m x 1.25m x 0.5m',
    },
    {
      id: 4,
      name: 'Pileta Nº4',
      image: '../assets/pileta4.jpeg',
      price: 100,
      description: 'Pileta 2800lts 2.5m x 1.6m x 0.7m',
    },
    {
      id: 5,
      name: 'Pileta Nº5',
      image: '../assets/pileta5.jpeg',
      price: 100,
      description: 'Pileta 4200lts 3m x 2m x 0.7m',
    },
    {
      id: 6,
      name: 'Pileta Nº5 XL',
      image: '../assets/pileta5xl.jpeg',
      price: 100,
      description: 'Pileta 6300lts 4.5m x 2m x 0.7m',
    },
    {
      id: 7,
      name: 'Ventilador Turbo Kacemaster',
      image: '../assets/turbo.jpeg',
      price: 100,
      description: '5 aspas indeformables de 40cm',
    },
    {
      id: 8,
      name: 'Sokany Mezcladora',
      image: '../assets/mezcladora.jpeg',
      price: 100,
      description: 'Mezcladora modelo SK-133',
    },
    {
      id: 9,
      name: 'Ventilador Crivel',
      image: '../assets/ventilador.jpeg',
      price: 100,
      description: 'Ventilador Crivel 20"',
    },
    {
      id: 10,
      name: 'Parlante potenciado DJS 620BT',
      image: '../assets/parlante.jpeg',
      price: 100,
      description: '29cm x 18.5cm x 16cm',
    },
    {
      id: 11,
      name: 'Ollas Hudson',
      image: '../assets/ollas.jpeg',
      price: 100,
    },
    {
      id: 12,
      name: 'LumaBella mezcladora de mano',
      image: '../assets/Licuadora.jpg',
      price: 100,
      description: '4 en 1',
    },
    {
      id: 13,
      name: 'Delhi Pava Eléctrica',
      image: '../assets/Pava.jpeg',
      price: 100,
    },
    {
      id: 14,
      name: 'Conservadora Heladera Gemplast',
      image: '../assets/Conservadora.jpeg',
      price: 100,
      description: '34lts',
    },
  ];

  getProducts(): Product[] {
    return this.productList;
  }

  getProduct(id: number): Product | undefined {
    return this.productList.find((product) => product.id === id);
  }

  constructor() {}
}
