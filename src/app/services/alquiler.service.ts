import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlquilerService {
  headerTable = [
    'Cliente',
    'Maquinaria',
    'Fecha entrega',
    'Fecha devolución',
    'Tarifa',
    'Días',
    'Importe',
    'Descuento',
    'Garantía',
    'Total pagar',
  ];
  alquiler = [{}];

  constructor() {}

  getHeaderTable() {
    return this.headerTable;
  }

  getAlquiler() {
    return this.alquiler;
  }

  postAlquiler(data: Array<AlquilerService> = []) {
    return this.alquiler.push(data);
  }
}
