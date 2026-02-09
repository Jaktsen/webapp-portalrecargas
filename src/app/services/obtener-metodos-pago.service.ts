import { ServicioCompartidoService } from 'src/app/core/services/servicio-compartido.service';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { WefClientService } from '../core/http/wef-client.service';
import { ObtenerMetodosDePagoRequest } from '../shared/requests/ObtenerMetodosDePagoRequest';
import { MethodsService } from './methods.service';
import { environment } from 'src/environments/environment';
import { Constantes } from './constants';
import { of } from 'rxjs';
import { GlobalObjectService } from 'src/app/services/global-object.service';
import { ObtenerSaldoGEService } from './obtener-saldo-ge.service';

@Injectable({
  providedIn: 'root',
})
export class ObtenerMetodosPagoService {
  // currently selected medioSeleccionado para ser usado por otros componentes/servicios
  medioSeleccionado: any = null ;

  dynamicProductFlux: any;
  confBloqueosMensajes2WCM: any;
  confBloqueosMensajes3WCM: any;

  medioClaroPuntos: any = {};
  medioPagarRecibo: any = {};
  medioSaldoPrepago: any = {};
  medioTarjetaCredito: any = {};

     // Codigos de bloqueos
     configBloqueos: any;
  confBloqueosCodigos2WCM: any;
  confBloqueosCodigos3WCM: any;
  listaOrdenadaMetodoPago: any;
  identificadorUsuarioToBeRequestType : {
    idContrato : "",
    coIdPub : "",
    csId  : "",
    contractIdPub :  ""
  }

  constructor(
    private wefClientService: WefClientService,
    private methodsService: MethodsService,
    private sc: ServicioCompartidoService,
    private ocsp: ObtenerSaldoGEService,
    private go: GlobalObjectService
  ) {
    this.configBloqueos = this.go.getObject('configBloqueos');
    this.listaOrdenadaMetodoPago = this.go.getObject('ordenarMetodos');
  }

  ordenarMetodosPago(items, order) {
    return items.sort((a, b) => {
      const aTipo = a.tipoMetodoPago;
      const bTipo = b.tipoMetodoPago;
      const aOrder = order[aTipo];
      const bOrder = order[bTipo];
      if (a.estado === "0") return 1;
      if (b.estado === "0") return -1;
      return aOrder < bOrder ? -1 : (aOrder > bOrder ? 1 : 0);
    });
  }

  obtenerMetodosDePago(productoSeleccionado,creditoSaldo,dataLineaTobe?) {

    this.sc.isIFILTE = productoSeleccionado.codTipoLinea == '6' || productoSeleccionado.codTipoLinea == '7';
    //console.log("Entrada")
    //console.log(productoSeleccionado)
    //console.log(creditoSaldo)
    //console.log(dataLineaTobe)
    let request; 
    if(dataLineaTobe != null){
      //console.log("con datos de liena TOBE")
      request = new ObtenerMetodosDePagoRequest(
        productoSeleccionado.idProductoDeCompra,
        productoSeleccionado.codTipoLinea,
        this.sc.isAdmin,
        dataLineaTobe.idContrato,
        dataLineaTobe.coIdPub,
        dataLineaTobe.csId,
        dataLineaTobe.contractIdPub
      );
    }else{
      //console.log("sin datos de liena TOBE")
      request = new ObtenerMetodosDePagoRequest(
        productoSeleccionado.idProductoDeCompra,
        productoSeleccionado.codTipoLinea,
        this.sc.isAdmin,
        "",
        "",
        "",
        ""
      );
    }
    //console.log("req")
    //console.log(request)

    return this.wefClientService
      .post(environment.urlComprasyPAgosWef.obtenerMetodosdePago, request)
      .pipe(
        map((response) => {
          //console.log(
           // 'Servicio ObtenerMetodosPagoService -> obtenerMetodosDePago '
          //);
          let listMetodoPago = [];
          let flagPaqueteIlimitado;
          let tipoMetodoPagoStar = "";
          const idRespuesta = response.comunResponseType.MessageResponse.Body.defaultServiceResponse.idRespuesta;
          const idRespuestaDP = response.comunResponseType.MessageResponse.Header.HeaderResponse.status.type;

          if (Number(idRespuestaDP) === 0 && Number(idRespuesta) === 0) {
            listMetodoPago = response.comunResponseType.MessageResponse.Body.listaMetodoPago;
            listMetodoPago = this.methodsService.converToArray(listMetodoPago);

            if(response.comunResponseType.MessageResponse.Body.flagPaqueteIlimitado){
              flagPaqueteIlimitado =response.comunResponseType.MessageResponse.Body.flagPaqueteIlimitado
            }

            // para pontis solo nos quedamos con el metodo de pago saldoRecarga
            if (  productoSeleccionado.catvCodCategoria == Constantes.WPSCategoriasDeCompra.pontis) {
              listMetodoPago = listMetodoPago.filter(
                (metodoPago) => metodoPago.tipoMetodoPago ==  Constantes.WPSMediosDePago.saldoPrepago.codigo
              );
            }

            this.configurarIndicadores(listMetodoPago, productoSeleccionado,creditoSaldo);

            // paquetes exclusivos online hay q eliminar para prepago cargo en recibo de la lista de metodos
            if (this.productBelongsToCatPaqtExclusivoOnlineAndIsPrepago(productoSeleccionado)) {
                listMetodoPago = listMetodoPago.filter(
                  (metodoPago) => metodoPago.tipoMetodoPago !== Constantes.WPSMediosDePago.cargarEnRecibo.codigo
                );
            }
            // si estamos en canje de eventos eliminar todos los metodos salvo claropuntos
            if (this.methodsService.isProductCanjeEventos(productoSeleccionado)) {
              listMetodoPago = listMetodoPago.filter(
                (metodoPago) => metodoPago.tipoMetodoPago == Constantes.WPSMediosDePago.puntosClaro.codigo
              );
            }
            //TODO: REVISAR EL ORDENAMIENTO CON WCM
            // ordenar los metodos de pago leyenda tc 3 claro puntos 1 recibo 2 saldo recarga 4
            //console.log("lista de metodo de pago wcm", this.listaOrdenadaMetodoPago[0]['listaMetodosDePago']);
            //console.log("lista de metodo de pago wcm", this.go.getWindow());

            if (productoSeleccionado.idTipoLinea === null || productoSeleccionado.idTipoLinea === "") {
              listMetodoPago = this.ordenarMetodosPago(listMetodoPago, { 3: 1, 2: 2, 4: 3, 1: 4 });
            } else {
              for (let index = 0; index < this.listaOrdenadaMetodoPago.length; index++) {
                if (productoSeleccionado.idTipoLinea === this.listaOrdenadaMetodoPago[index]['tipoCliente']) {
                  console.warn("tipoCLiente ", this.listaOrdenadaMetodoPago[index]);
                  tipoMetodoPagoStar = this.listaOrdenadaMetodoPago[index]['star'];
                  listMetodoPago = this.ordenarMetodosPago(listMetodoPago, this.listaOrdenadaMetodoPago[index]['listaMetodosDePago']);
                }
              }
            }

            // Ordenar metodos de pago según disponibilidad de saldo
            //console.log("Lista mp", listMetodoPago);

          }
          const result = {
            idRespuesta,
            listMetodoPago,
            flagPaqueteIlimitado,
            tipoMetodoPagoStar
          };
          //console.log('result %O', result);
          console.groupEnd();
          return result;
        }),
        catchError((error) => {
          //console.log('Error ObtenerMetodosPagoService > obtenerMetodosDePago');
          console.error(error);
          const responseError = {
            idRespuesta: Constantes.obtenerMegodosPago_GenericErrorCode,
            listMetodoPago: [],
            flagPaqueteIlimitado: false,
            tipoMetodoPagoStar: ""
          };
          console.error(
            'response error ObtenerMetodosPagoService > obtenerMetodosDePago:', responseError);
          console.groupEnd();
          return of(responseError);
        })
      );
  }

  private productBelongsToCatPaqtExclusivoOnlineAndIsPrepago(productoSeleccionado) {
    return productoSeleccionado.catvCodCategoria == Constantes.WPSCategoriasDeCompra.paquetesExclusivosOnline
        && productoSeleccionado.codTipoLinea == '1';
  }

  configurarIndicadores(listaMetodoPago: any[], productoSeleccionado: any,creditoSaldo) {

    this.confBloqueosMensajes2WCM = this.configBloqueos[1].Mensajes[1];
    this.confBloqueosMensajes3WCM = this.configBloqueos[1].Mensajes[2];
    this.confBloqueosCodigos2WCM = this.configBloqueos[0].Codigos[1].M2;
    this.confBloqueosCodigos3WCM = this.configBloqueos[0].Codigos[2].M3;

    this.medioClaroPuntos = { claroPuntos: 0 };
    if (listaMetodoPago != null) {
      listaMetodoPago.forEach((metodoPago) => {

        // portal recargas es otra historia
        if (productoSeleccionado.dynamicProductFlux) {
           metodoPago.precioMoneda = productoSeleccionado.precioMoneda;
         }

        // MEJORA para pontis y prestame megas
        // Este cambio no tiene sentido le pone el mismo tipoMetodPago, actualiza lo mismo
        // if (productoSeleccionado.catvCodCategoria == Constantes.WPSCategoriasDeCompra.pontis ||
        //   productoSeleccionado.catvCodCategoria == Constantes.WPSCategoriasDeCompra.prestameMegas) {
        //   metodoPago.tipoMetodoPago = Constantes.WPSMediosDePago.saldoPrepago.codigo;
        // }
        if (metodoPago.tipoMetodoPago == Constantes.WPSMediosDePago.puntosClaro.codigo) {
          // metodPago claroPuntos
          this.medioClaroPuntos.idMetodoPago = metodoPago.idMetodoPago;
          this.medioClaroPuntos.nombre = metodoPago.nombre;
          this.medioClaroPuntos.precioPuntos = metodoPago.precioMoneda;
          this.medioClaroPuntos.cantidad = metodoPago.cantidad;
          this.medioClaroPuntos.claroPuntos = metodoPago.totalClaroPuntos;
          const request = {
            nombre: metodoPago.nombre,
            codigo: metodoPago.tipoMetodoPago,
            idMetodoPago: metodoPago.tipoMetodoPago,
            fechaVigencia: metodoPago.fechaVigencia,
            fechaCompra: metodoPago.fechaCompra,
            precioMoneda: metodoPago.precioMoneda,
            simboloMoneda: metodoPago.simboloMoneda,
            cantidad: metodoPago.cantidad,
            unidadCantidad: metodoPago.unidadCantidad,
          };
          // TODO response -> request no es muy coherente
          this.medioClaroPuntos.response = request;
          metodoPago.response = request;
          metodoPago.medioClaroPuntos = this.medioClaroPuntos;

          const showClaroPuntosCustomError = this.methodsService.isProductCanjeEventos(productoSeleccionado) &&
            'codValidacionClaroClub' in metodoPago && metodoPago.codValidacionClaroClub !== '0' &&
            'msgValidacionClaroClub' in metodoPago && metodoPago.msgValidacionClaroClub.length > 0;

          const claroPuntosCustomErrorMessage = 'msgValidacionClaroClub' in metodoPago ? metodoPago.msgValidacionClaroClub : '';
          const thereAreNotEnoughClaroPuntos = this.areThereAreNotEnoughClaroPuntos(this.medioClaroPuntos);

          metodoPago.mostrarMensajeClaroPuntosInsuficiente = thereAreNotEnoughClaroPuntos;

          const isBackendClaroPuntosMetodoDisabled = metodoPago.estado == '0';
          //console.log('thereAreNotEnoughClaroPuntos %s', thereAreNotEnoughClaroPuntos);
          //console.log('isBackendClaroPuntosMetodoDisabled %s', isBackendClaroPuntosMetodoDisabled);
          if (isBackendClaroPuntosMetodoDisabled || thereAreNotEnoughClaroPuntos) {
            metodoPago.estado = '0';
            metodoPago.customErrorPopup = {
              showError: showClaroPuntosCustomError,
              messageTitle: Constantes.WPSMensajeError.value.upps,
              message: claroPuntosCustomErrorMessage
            };
          }
        } else if (metodoPago.tipoMetodoPago == Constantes.WPSMediosDePago.cargarEnRecibo.codigo) {
          if (this.verificaCodigoDeudaPendiente(this.sc.codigoBloqueo)) {
            this.medioPagarRecibo.mensaje = this.confBloqueosMensajes2WCM.mensaje;
          } else if (this.verificaCodigoLimiteCredito(this.sc.codigoBloqueo)) {
            this.medioPagarRecibo.mensaje = this.confBloqueosMensajes3WCM.mensaje;
          } else {
            this.medioPagarRecibo.mensaje = Constantes.mensajes.metodo_pago_cargo_recibo_mensaje;
          }
          this.medioPagarRecibo.mensaje = this.medioPagarRecibo.mensaje.replace('<br>', ' ');

          this.medioPagarRecibo.idMetodoPago = metodoPago.idMetodoPago;
          this.medioPagarRecibo.nombre = metodoPago.nombre;
          this.medioPagarRecibo.verTerminos = metodoPago.flagMuestraTerminosCondiciones;
          const request = {
            nombre: metodoPago.nombre,
            codigo: metodoPago.tipoMetodoPago,
            idMetodoPago: metodoPago.tipoMetodoPago,
            fechaVigencia: metodoPago.fechaVigencia,
            precioMoneda: metodoPago.precioMoneda,
            fechaCompra: metodoPago.fechaCompra,
            simboloMoneda: metodoPago.simboloMoneda,
            cantidad: metodoPago.cantidad,
            unidadCantidad: metodoPago.unidadCantidad,
          };
          this.medioPagarRecibo.response = request;
          metodoPago.response = request;
          metodoPago.medioPagarRecibo = this.medioPagarRecibo;
          if (metodoPago.estado != '0') {
            if ( this.sc.isblockCR || productoSeleccionado.codTipoLinea == '3' ) {
              //console.log(' =====>> Es Corporativo y Admin 1 , Tipo de  Linea %s servicioCompartido isblockCR %s <<======',
                  //productoSeleccionado.codTipoLinea, this.sc.isblockCR);
              if (this.verificaCodigoDeudaPendiente(this.sc.codigoBloqueo) || this.verificaCodigoLimiteCredito(this.sc.codigoBloqueo)) {
                metodoPago.estado = '0';
                //console.log('Se deshabilita Corporativo y Admin 1 por bloqueo de linea');
              }
            } else if (this.verificaCodigoDeudaPendiente(this.sc.codigoBloqueo)
                || this.verificaCodigoLimiteCredito(this.sc.codigoBloqueo)) {
              metodoPago.estado = '0';
            } 
          }
        } else if ( metodoPago.tipoMetodoPago == Constantes.WPSMediosDePago.tarjetaCredito.codigo ) {
          this.medioTarjetaCredito.idMetodoPago = metodoPago.idMetodoPago;
          this.medioTarjetaCredito.nombre = metodoPago.nombre;

          if (productoSeleccionado.dynamicProductFlux) {
            if (metodoPago.fechaCompra == metodoPago.fechaVigencia ) {
              const futureDate = new Date(Date.parse(metodoPago.fechaVigencia));
              futureDate.setDate(futureDate.getDate() + productoSeleccionado.vigencia);
              metodoPago.fechaVigencia = futureDate.toISOString().replace('Z', '-05:00');
            }
          }

          const request = {
            nombre: metodoPago.nombre,
            codigo: metodoPago.tipoMetodoPago,
            idMetodoPago: metodoPago.tipoMetodoPago,
            fechaVigencia: metodoPago.fechaVigencia,
            precioMoneda: metodoPago.precioMoneda,
            fechaCompra: metodoPago.fechaCompra,
            simboloMoneda: metodoPago.simboloMoneda,
            cantidad: metodoPago.cantidad,
            unidadCantidad: metodoPago.unidadCantidad,
          };

          this.medioTarjetaCredito.response = request;
          metodoPago.response = request;
          metodoPago.medioTarjetaCredito = this.medioTarjetaCredito;

          if ( this.methodsService.isFlowPortalRecargas() &&
            Constantes.DYNAMIC_PRICE_RECHARGE_PRODUCT_CODES.includes(
              productoSeleccionado.codigoProducto
             )
           ) {
            metodoPago.estado = '1';
           }

          if (metodoPago.estado == '0') {
             const showErrorPaqueteIlimitado =
              typeof metodoPago[Constantes.WPSPaqueteIlimitadoConstantes.value.PaqueteIlimitadoCodeField] !== 'undefined' &&
              typeof metodoPago[Constantes.WPSPaqueteIlimitadoConstantes.value.PaqueteIlimitadoMessageField] !== 'undefined' &&
              metodoPago[Constantes.WPSPaqueteIlimitadoConstantes.value.PaqueteIlimitadoCodeField] !== null &&
              metodoPago[Constantes.WPSPaqueteIlimitadoConstantes.value.PaqueteIlimitadoMessageField] !== null;
             //console.log('showErrorPaqueteIlimitado %s', showErrorPaqueteIlimitado);
             if (showErrorPaqueteIlimitado) {
              metodoPago.customErrorPopup = {
                showError: showErrorPaqueteIlimitado,
                messageTitle: Constantes.WPSMensajeError.value.atencion,
                message: metodoPago[Constantes.WPSPaqueteIlimitadoConstantes.value.PaqueteIlimitadoMessageField]
              };
            }
          }
        } else if (metodoPago.tipoMetodoPago == Constantes.WPSMediosDePago.saldoPrepago.codigo) {
          this.medioSaldoPrepago.idMetodoPago = metodoPago.idMetodoPago;
          this.medioSaldoPrepago.nombre = metodoPago.nombre;
          const request = {
            nombre: metodoPago.nombre,
            codigo: metodoPago.tipoMetodoPago,
            idMetodoPago: metodoPago.tipoMetodoPago,
            fechaVigencia: metodoPago.fechaVigencia,
            precioMoneda: metodoPago.precioMoneda,
            fechaCompra: metodoPago.fechaCompra,
            simboloMoneda: metodoPago.simboloMoneda,
            cantidad: metodoPago.cantidad,
            unidadCantidad: metodoPago.unidadCantidad,
          };
          this.medioSaldoPrepago.response = request;
          metodoPago.response = request;
          metodoPago.medioSaldoPrepago = this.medioSaldoPrepago;
          metodoPago.mostrarMensajeSaldoPrepagoInsuficiente = false;

          if (metodoPago.estado != '0') {
            const haySaldoPrepagoSuficiente = parseFloat(creditoSaldo)
                >= parseFloat(metodoPago.precioMoneda);
            if (haySaldoPrepagoSuficiente) {
              metodoPago.mostrarMensajeSaldoPrepagoInsuficiente = false;
            } else {
              metodoPago.mostrarMensajeSaldoPrepagoInsuficiente = true;
              metodoPago.estado = '0';
            }
          }
        }
      });
    }
  }

  private areThereAreNotEnoughClaroPuntos(medioClaroPuntos: any) {
    return parseInt(medioClaroPuntos.claroPuntos, 10) < parseInt(medioClaroPuntos.cantidad, 10);
  }

  verificaCodigoLimiteCredito(codigoBloqueo: any): boolean {
    let flag = false;
    if (this.confBloqueosCodigos3WCM && this.confBloqueosCodigos3WCM.length > 0) {
      for (const blockCode of this.confBloqueosCodigos3WCM) {
        if (blockCode.codigo == codigoBloqueo) {
          flag = true;
        }
      }
    }
    return flag;
  }
  verificaCodigoDeudaPendiente(codigoBloqueo: any): boolean {
    let flag = false;
    if (this.confBloqueosCodigos2WCM && this.confBloqueosCodigos2WCM.length > 0) {
      for (const blockCode of this.confBloqueosCodigos2WCM) {
        if (blockCode.codigo == codigoBloqueo) {
          flag = true;
        }
      }
    }
    return flag;
  }

  getMetodosPagoProductoInformacionLink(categoriaElegida) {
    let link = '';
    if ( Number(this.sc.tipoCliente) === 2 && Number(this.sc.tipoLinea) === 2 ) {
      // linea corporativa
      link = 'https://www.claro.com.pe/negocios/movil/recargas/?tab=internet';
    } else if ( categoriaElegida == Constantes.WPSCategoriasDeCompra.smsmms ) {
      link = 'https://www.claro.com.pe/personas/movil/beneficios-adicionales/sms-ilimitado-1sol/';
    } else if ( this.methodsService.isFlowPortalRecargas() ) {
      if (Number(this.sc.tipoLinea) === 1) {
        link = 'https://www.claro.com.pe/personas/movil/prepago/?tab=recarga5';
      } else {
        link = 'https://www.claro.com.pe/personas/movil/beneficios-adicionales/?tab=postpago';
      }
    } else {
      if (Number(this.sc.tipoLinea) === 1) {
        link = 'https://www.claro.com.pe/personas/movil/prepago/paquetes/#megas';
      } else {
        link = 'https://www.claro.com.pe/personas/beneficios/movil/paquetes-internet/';
      }
    }
    return link;
  }


}
