import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { AlquilerService } from 'src/app/services/alquiler.service';
import { MaquinariasService } from '../../services/maquinarias.service';

@Component({
  selector: 'app-form-alquiler',
  templateUrl: './form-alquiler.component.html',
  styleUrls: ['./form-alquiler.component.css'],
})
export class FormAlquilerComponent implements OnInit {
  formAlquiler: FormGroup;
  maquinarias = [{ codigo: '', tipo: '', tarifa: 0 }];
  headerTable: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private maquinariaService: MaquinariasService,
    private alquilerService: AlquilerService
  ) {
    this.formAlquiler = this.createForm();
  }

  ngOnInit(): void {
    this.getHeaderTable();
    this.getMaquinarias();
  }

  createForm() {
    return (this.formAlquiler = this.formBuilder.group({
      cliente: ['', [Validators.required]],
      maquinaria: ['', [Validators.required]],
      fechaEntrega: ['', [Validators.required]],
      fechaDevolucion: ['', [Validators.required]],
    }));
  }

  getHeaderTable() {
    for (
      let index = 0;
      index < this.maquinariaService.getHeaderTable().length;
      index++
    ) {
      this.headerTable[index] = this.maquinariaService.getHeaderTable()[index];
    }
  }

  getMaquinarias() {
    this.maquinarias = this.maquinariaService.getMaquinarias();
  }

  registrarAlquiler() {
    this.alquilerService.postAlquiler(this.formAlquiler.value);
    this.getAlquiler();
  }

  getAlquiler() {
    console.log(this.alquilerService.getAlquiler());
  }
}
