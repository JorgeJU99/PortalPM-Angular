import { Component, OnInit } from '@angular/core';
import { AlquilerService } from '../../services/alquiler.service';

@Component({
  selector: 'app-table-alquiler',
  templateUrl: './table-alquiler.component.html',
  styleUrls: ['./table-alquiler.component.css'],
})
export class TableAlquilerComponent implements OnInit {
  headerTable: string[] = [];

  constructor(private alquilerService: AlquilerService) {}

  ngOnInit(): void {
    this.getHeaderTable();
  }

  getHeaderTable() {
    for (
      let index = 0;
      index < this.alquilerService.getHeaderTable().length;
      index++
    ) {
      this.headerTable[index] = this.alquilerService.getHeaderTable()[index];
    }
  }
}
