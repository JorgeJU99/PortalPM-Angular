import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { Alquiler } from 'src/app/entities/Alquiler';
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
  mensajeAdvertencia = '';
  controlMensaje = false;

  constructor(
    private formBuilder: FormBuilder,
    private maquinariaService: MaquinariasService,
    private alquilerService: AlquilerService
  ) {
    this.formAlquiler = this.createForm();
  }

  /**
   * Método que carga los métodos al inicializar el componente
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
      cliente: ['', [Validators.required, Validators.minLength(5)]],
      maquinaria: ['', [Validators.required]],
      fechaEntrega: ['', [Validators.required]],
      fechaDevolucion: ['', [Validators.required]],
    }));
  }

  /**
   * Método que permite obtener los encabezados de la tabla
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
   * Método que permite obtener los datos de las maquinarias
   * los datos son obtenidos del método de getMaquinarias
   * que se encuentran en el servicio maquinariaService
   */
  getMaquinarias() {
    this.maquinarias = this.maquinariaService.getMaquinarias();
  }

  /**
   * Método para registrar el alquiler de la maquinaria
   */
  registrarAlquiler() {
    let cliente = this.formAlquiler.value.cliente;
    let maquinaria = this.formAlquiler.value.maquinaria;
    let fechaEntrega = this.formAlquiler.value.fechaEntrega;
    let fechaDevolucion = this.formAlquiler.value.fechaDevolucion;
    let tarifa = this.calcularTarifa(maquinaria);
    let dias = this.calcularDiasFecha(fechaEntrega, fechaDevolucion);
    let importe = this.calcularImporte(dias, tarifa);
    let descuento = this.calcularDescuento(dias, importe);
    let totalPagar = this.calcularImporteTotal(importe, descuento);
    let garantia = this.calcularGarantia(totalPagar);
    let objAlquiler = new Alquiler(
      cliente,
      maquinaria,
      fechaEntrega,
      fechaDevolucion,
      tarifa,
      dias,
      importe,
      descuento,
      garantia,
      totalPagar
    );
    if (this.formAlquiler.invalid) {
      this.setErrorControl(Object.values(this.formAlquiler.controls));
    }
    if (this.formAlquiler.valid && dias > 0) {
      this.alquilerService.postAlquiler(objAlquiler);
      this.controlMensaje = false;
      this.formAlquiler.reset();
    }
  }

  /**
   * Función para calcular la tarifa de la maquinaria según el código
   * @param maquinaria
   * @returns retorna el valor de la tarifa
   */
  calcularTarifa(maquinaria: string) {
    let tarifa = 0;
    if (maquinaria == 'C01') {
      tarifa = 100;
    }
    if (maquinaria == 'C02') {
      tarifa = 50;
    }
    if (maquinaria == 'C03') {
      tarifa = 150;
    }
    return tarifa;
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
    } else if (fechaFinal <= fechaInicial) {
      dias = 0;
      this.controlMensaje = true;
      this.mensajeAdvertencia =
        'La fecha de devolución del alquiler debe ser mayor a la fecha de entrega.';
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
    let descuento = 0;
    if (dias > 7) {
      descuento = importe * 0.1;
    } else {
      descuento = 0;
    }
    return descuento;
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
    return importeTotal * 0.1;
  }

  /**
   * Métodos getter que permite obtener el formControlName
   * de las inputs del formulario reactivo
   * @returns retorna las directivas de control del formControlName.
   */
  get cliente() {
    return this.formAlquiler.get('cliente');
  }

  get maquinaria() {
    return this.formAlquiler.get('maquinaria');
  }

  get fechaEntrega() {
    return this.formAlquiler.get('fechaEntrega');
  }

  get fechaDevolucion() {
    return this.formAlquiler.get('fechaDevolucion');
  }

  /**
   * Método que permite enviar el control de error de las validaciones
   * @param controls
   */
  setErrorControl(controls: AbstractControl[]) {
    for (const control of controls) {
      if (control instanceof FormGroup) {
        this.setErrorControl(Object.values(control.controls));
      } else control.markAsTouched();
    }
  }
}
