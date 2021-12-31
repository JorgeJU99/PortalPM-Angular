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

  /**
   * Función que carga los métodos al inicializar el componente
   */
  ngOnInit(): void {
    this.getHeaderTable();
    this.getMaquinarias();
  }

  /**
   * Función que permite construir el formulario
   * @returns los datos (values) de los formControlName del formulario
   */
  createForm() {
    return (this.formAlquiler = this.formBuilder.group({
      cliente: ['', [Validators.required]],
      maquinaria: ['', [Validators.required]],
      fechaEntrega: ['', [Validators.required]],
      fechaDevolucion: ['', [Validators.required]],
    }));
  }

  /**
   * Función que permite obtener los encabezados de la tabla
   * los encabezados son obtenidos del método de getHeaderTable
   * que se encuentran en el servicio maquinariaService
   */
  getHeaderTable() {
    for (
      let index = 0;
      index < this.maquinariaService.getHeaderTable().length;
      index++
    ) {
      this.headerTable[index] = this.maquinariaService.getHeaderTable()[index];
    }
  }

  /**
   * Función que permite obtener los datos de las maquinarias
   * los datos son obtenidos del método de getMaquinarias
   * que se encuentran en el servicio maquinariaService
   */
  getMaquinarias() {
    this.maquinarias = this.maquinariaService.getMaquinarias();
  }

  /**
   * Función para registrar el alquiler de la maquinaria
   */
  registrarAlquiler() {
    let cliente = this.formAlquiler.value.cliente;
    let maquinaria = this.formAlquiler.value.maquinaria;
    let fechaEntrega = this.formAlquiler.value.fechaEntrega;
    let fechaDevolucion = this.formAlquiler.value.fechaDevolucion;
    let tarifa = 0;
    let dias = this.calcularDiasFecha(fechaEntrega, fechaDevolucion);
    let importe = 0;
    let descuento = 0;
    let garantia = 0;
    let totalPagar = 0;
    this.alquilerService.postAlquiler(this.formAlquiler.value);
  }

  /**
   * Función para calcular días entre la fecha de entrega y fecha de devolución
   * @param fechaEntega
   * @param fechaDevolucion
   * @returns retorna el cálculo en días entre la fechaEntega y fechaDevolucion
   */
  calcularDiasFecha(fechaEntega: Date, fechaDevolucion: Date) {
    let fechaInicial = new Date(fechaEntega);
    let fechaFinal = new Date(fechaDevolucion);
    let dias = 0;
    if (fechaFinal > fechaInicial) {
      let diferenciaFechas = fechaFinal.getTime() - fechaInicial.getTime();
      dias = Math.round(diferenciaFechas / (1000 * 60 * 60 * 24));
    } else if (fechaFinal != null && fechaFinal < fechaInicial) {
      dias = 0;
    }
    return dias;
  }

  /**
   * Función para calcular el importe del alquiler
   * Se multiplica los días por la tarifa
   * @param dias
   * @param tarifa
   * @returns retorna el calculo del importe entre los dias y la tarifa
   */
  calcularImporte(dias: number, tarifa: number) {
    return dias * tarifa;
  }

  /**
   * Función para calcular el descuento del alquiler, si los días del
   * alquiler son superiores a 7 días, aplicar un descuento del 10%
   * @param dias
   * @param importe
   * @returns retorna el calculo del descuento entre los dias y el importe
   */
  calcularDescuento(dias: number, importe: number) {
    if (dias > 7) {
      let descuento = importe * 0.1;
      return descuento;
    } else {
      return 0;
    }
  }

  /**
   * Función para calcular el importe total del alquiler
   * se calcula el importe menos el descuento
   * @param importe
   * @param descuento
   * @returns retorna el calculo del importe total entre el importe y el descuento
   */
  calcularImporteTotal(importe: number, descuento: number) {
    return importe - descuento;
  }

  /**
   * Función para calcular la garantia del alquiler
   * Este valor será de un 10 % del valor total a pagar
   * @param importeTotal
   * @returns retorna el cálcula de la garantia
   */
  calcularGarantia(importeTotal: number) {
    let garantia = importeTotal * 0.1;
    return garantia;
  }
}
