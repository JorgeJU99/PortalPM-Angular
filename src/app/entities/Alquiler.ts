export class Alquiler {
  cliente: string;
  maquinaria: string;
  fechaEntrega: Date;
  fechaDevolucion: Date;
  tarifa: number;
  dias: number;
  importe: number;
  descuento: number;
  garantia: number;
  totalPagar: number;

  constructor(
    cliente: string,
    maquinaria: string,
    fechaEntrega: Date,
    fechaDevolucion: Date,
    tarifa: number,
    dias: number,
    importe: number,
    descuento: number,
    garantia: number,
    totalPagar: number
  ) {
    this.cliente = cliente;
    this.maquinaria = maquinaria;
    this.fechaEntrega = fechaEntrega;
    this.fechaDevolucion = fechaDevolucion;
    this.tarifa = tarifa;
    this.dias = dias;
    this.importe = importe;
    this.descuento = descuento;
    this.garantia = garantia;
    this.totalPagar = totalPagar;
  }
}
