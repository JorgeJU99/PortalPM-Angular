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

  getHeaderTable() {
    return this.headerTable;
  }

  getMaquinarias() {
    return this.maquinarias;
  }
}
