import { Injectable } from '@angular/core';
import { Alquiler } from '../entities/Alquiler';
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
  alquiler: Alquiler[] = [];

  constructor() {}

  /**
   * Función que permite obtener los datos de un array
   * @returns retorna el array headerTable
   */
  getHeaderTable() {
    return this.headerTable;
  }

  /**
   * Función que permite obtener los datos de un array
   * @returns retorna el array alquiler
   */
  getAlquiler() {
    return this.alquiler;
  }

  /**
   * Función que permite ir agregando datos al array alquiler
   * @param data
   * @returns retorna los datos agregados del array alquiler
   */
  postAlquiler(data: any) {
    return this.alquiler.push(data);
  }
}
