import { Component, OnInit } from '@angular/core';
import { AlquilerService } from '../../services/alquiler.service';

@Component({
  selector: 'app-table-alquiler',
  templateUrl: './table-alquiler.component.html',
  styleUrls: ['./table-alquiler.component.css'],
})
export class TableAlquilerComponent implements OnInit {
  constructor(alquilerService: AlquilerService) {}

  ngOnInit(): void {}
}
