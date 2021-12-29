import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MaquinariasService {
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

  getMaquinarias() {
    return this.maquinarias;
  }
}
