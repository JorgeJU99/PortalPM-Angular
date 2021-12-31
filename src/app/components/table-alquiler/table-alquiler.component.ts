import { Component, OnInit } from '@angular/core';
import { AlquilerService } from '../../services/alquiler.service';
import { Alquiler } from '../../entities/Alquiler';
@Component({
  selector: 'app-table-alquiler',
  templateUrl: './table-alquiler.component.html',
  styleUrls: ['./table-alquiler.component.css'],
})
export class TableAlquilerComponent implements OnInit {
  headerTable: string[] = [];
  alquilerMaquinaria: Alquiler[] = [];

  constructor(private alquilerService: AlquilerService) {}

  /**
   * Función que carga los métodos al inicializar el componente
   */
  ngOnInit(): void {
    this.getHeaderTable();
    this.getAlquiler();
  }

  /**
   * Función que permite obtener los encabezados de la tabla
   * los encabezados son obtenidos del método de getHeaderTable
   * que se encuentran en el servicio alquilerService
   */
  getHeaderTable() {
    for (
      let index = 0;
      index < this.alquilerService.getHeaderTable().length;
      index++
    ) {
      this.headerTable[index] = this.alquilerService.getHeaderTable()[index];
    }
  }

  /**
   * Función que permite obtener los datos del alquiler de maquinarias
   * los datos son obtenidos del método de getAlquiler
   * que se encuentran en el servicio alquilerService
   */
  getAlquiler() {
    this.alquilerMaquinaria = this.alquilerService.getAlquiler();
  }
}
