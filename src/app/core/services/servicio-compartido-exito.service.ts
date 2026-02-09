import { Injectable } from '@angular/core';
import { Constantes } from 'src/app/services/constants';

@Injectable({
  providedIn: 'root',
})
export class ServicioCompartidoExitoService {
  metodoPago: any;
  fechaCompra: any;
  tiempoActualizacion: any;
  nombreProd: any;
  esCompraMP: any = '';
  descripcion: any;
  fecVigProd: any;
  esExitoMP: any;
  esExito: any;
  costo: any;
  lblCosto: any;
  codigo: any;
  simboloMoneda: any;
  precioMoneda: any;
  constanciaPrestamoSubTitle: any;
  linkCondicionesCanje: any;
  canjeEventosNotificacionUrl: any;
  canjeAsuntoCorreo: any;
  canjeFechaSorteo: any;
  canjeMostrarFechaSorteoConstConfirmacion: boolean;
  canjeTextoNotificacionCorreo: any;
  nombreCat: any;
  idCategoria: any;
  tipoMetodoPago: any;
  emailNotificacion: any;
  idTransaccionCompra: any;
  numeroOperacion: any;
  pinCode: any;
  pdfBite: any;
  conCopia: boolean;
  vigencia: any;
  idProducto: any;
  mailGiftCardPara: any;
  numeroCompra: any;
  idRespuesta: any;
  nroDocumentoAutorizado: any;
  valorVenta: any;
  ruc: any;
  igv: any;
  razonSocial: any;
  mensajeBackend: any;
  flagPontis: any;

  constructor() {}

  actualizarDatos(
    compraResponse: any,
    prodSelecc: any,
    catSelecc: any,
    medioSelecc: any,
    esExito: any,
    giftCardPersonalizationData: any,
  ) {
    if (compraResponse != null) {
      this.fechaCompra = compraResponse.fechaCompra
        ? compraResponse.fechaCompra
        : '';
      this.descripcion =
        compraResponse.descripcion != null
          ? compraResponse.descripcion
          : compraResponse.descripcionResultadoOperacion;
      this.tiempoActualizacion = compraResponse.tiempoActualizacion;
    }

    this.flagPontis = (prodSelecc.flagPontis == undefined) ? '0' : prodSelecc.flagPontis;
    this.esExito = esExito;
    this.nombreProd = prodSelecc.lblNombre;
    this.fecVigProd = prodSelecc.fechaVigencia;
    this.costo = prodSelecc.lblCosto;
    this.lblCosto = prodSelecc.lblCosto;
    this.codigo = prodSelecc.codigo;
    this.simboloMoneda = prodSelecc.simboloMoneda;
    this.precioMoneda = prodSelecc.precioMoneda;
    this.constanciaPrestamoSubTitle = prodSelecc.subtituloConfirma
      ? prodSelecc.subtituloConfirma
      : '';
    this.linkCondicionesCanje = catSelecc.wcm
      ? catSelecc.wcm.LinkCondicionesSorteo
      : '';
    this.canjeEventosNotificacionUrl =
      catSelecc.wcm && catSelecc.wcm.urlNotificacion
        ? catSelecc.wcm.urlNotificacion
        : '';
    this.canjeAsuntoCorreo =
      catSelecc.wcm && catSelecc.wcm.asuntoCorreo
        ? catSelecc.wcm.asuntoCorreo
        : '';
    this.canjeFechaSorteo =
      catSelecc.wcm && catSelecc.wcm.fechaSorteo
        ? catSelecc.wcm.fechaSorteo
        : '';
    this.canjeMostrarFechaSorteoConstConfirmacion =
      catSelecc.wcm && catSelecc.wcm.mostrarFechaSorteo
        ? catSelecc.wcm.mostrarFechaSorteo == '1'
        : false;
    this.canjeTextoNotificacionCorreo =
      catSelecc.wcm && catSelecc.wcm.textoNotificacion
        ? catSelecc.wcm.textoNotificacion
        : '';
    this.nombreCat = catSelecc.titulo;
    this.idCategoria = catSelecc.codCategoria;
    this.metodoPago = medioSelecc ? medioSelecc.nombre : '';
    this.tipoMetodoPago = medioSelecc ? medioSelecc.idMetodoPago : '';
    this.numeroCompra = compraResponse ? compraResponse.numeroCompra : '';
    this.emailNotificacion = compraResponse
      ? compraResponse.emailNotificacion
      : '';
    this.idTransaccionCompra = compraResponse
      ? compraResponse.idTransaccionCompra
      : '';
    this.numeroOperacion = compraResponse ? compraResponse.numeroOperacion : '';
    this.pinCode = compraResponse ? compraResponse.pincode : '';

    this.pdfBite = compraResponse ? compraResponse.archivoPdfClaro : '';
    this.conCopia = compraResponse
      ? compraResponse.flagCopiaComprador == '1'
        ? true
        : false
      : false;
    this.vigencia = this.printVigenciaUtil(
      prodSelecc.vigencia,
      prodSelecc.tipoVigencia
    );
    this.idProducto = prodSelecc.idProductoDeCompra;

    this.mailGiftCardPara =
      giftCardPersonalizationData != null
        ? giftCardPersonalizationData.para
        : '';
  }
  printVigenciaUtil(vigencia: any, tipoVigencia: string) {
    if (tipoVigencia == 'DIAS') {
      return vigencia + (vigencia > 1 ? ' días' : ' día');
    }

    if (tipoVigencia == Constantes.WPSTiposVigencia.value.mensual) {
      return vigencia + (vigencia > 1 ? ' meses' : ' mes');
    }

    return '';
  }

  actualizarDatosCompra(compraResponse) {
    if (compraResponse) {
      this.fechaCompra = compraResponse.fechaCompra;
      this.descripcion = compraResponse.descripcionResultadoOperacion;
      this.tiempoActualizacion = compraResponse.tiempoActualizacion;
      this.emailNotificacion = compraResponse.emailNotificacion;
      this.idTransaccionCompra = compraResponse.idTransaccionCompra;
      this.numeroOperacion = compraResponse.numeroOperacion;
      this.pinCode = compraResponse.pincode;
      this.pdfBite = compraResponse.archivoPdfClaro;
      this.conCopia = (compraResponse.flagCopiaComprador == '1' ? true : false);
    }
  }


}
