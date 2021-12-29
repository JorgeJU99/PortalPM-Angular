import { Component, OnInit } from '@angular/core';
import { MaquinariasService } from '../../services/maquinarias.service';

@Component({
  selector: 'app-form-alquiler',
  templateUrl: './form-alquiler.component.html',
  styleUrls: ['./form-alquiler.component.css'],
})
export class FormAlquilerComponent implements OnInit {
  maquinarias = [{ codigo: '', tipo: '', tarifa: 0 }];
  constructor(private maquinariaService: MaquinariasService) {}

  ngOnInit(): void {
    this.getMaquinarias();
  }

  getMaquinarias() {
    this.maquinarias = this.maquinariaService.getMaquinarias();
  }
}
