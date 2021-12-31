import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MaquinariasService {
  headerTable = ['Código', 'Manquinaria', 'Tarifa'];
  maquinarias = [
    {
      codigo: 'C01',
      tipo: 'Tractores',
      tarifa: 100,
    },
    {
      codigo: 'C02',
      tipo: 'Mescladores',
      tarifa: 50,
    },
    {
      codigo: 'C03',
      tipo: 'Volquetas',
      tarifa: 150,
    },
  ];

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
   * @returns retorna el array maquinarias
   */
  getMaquinarias() {
    return this.maquinarias;
  }
}
