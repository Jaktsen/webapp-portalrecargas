import { RegistrarLogService } from './../../services/registrar-log.service';
import { EnviarTokenService } from 'src/app/services/enviar-token.service';
import { ObtenerMetodosPagoService } from './../../services/obtener-metodos-pago.service';
import { ConfirmationItem } from './../../shared/entities/confirmationItem';
import { MethodsService } from 'src/app/services/methods.service';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioCompartidoExitoService } from 'src/app/core/services/servicio-compartido-exito.service';
import { ServicioCompartidoService } from 'src/app/core/services/servicio-compartido.service';
import { ConfirmarAdelantoService } from 'src/app/services/confirmar-adelanto.service';
import { ServiciosPagosService } from 'src/app/services/servicios-pagos.service';
import { WcmService } from 'src/app/services/wcm.service';
import { PopupService } from './../../services/popup.service';
import { PagarProductoCompraService } from 'src/app/services/pagar-producto-compra.service';
import { Constantes } from 'src/app/services/constants';
import { DatePipe, DecimalPipe, SlicePipe } from '@angular/common';
import { GlobalObjectService } from 'src/app/services/global-object.service';
import { UiServiceService } from './../../services/ui-service.service';
import { ButtonBehavior } from '../dialog/dialog.component';
import { DataLayerService } from '../../services/data-layer.service';

declare var pago: any;
@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.scss'],
})
export class ConfirmacionComponent implements OnInit {
  showPopup = false;
  infoPopUp: any;
  nombrePopUp: any;
  shouldGoBackToCategoriesAfterClosingPopup = false;
  @Output() cerrarConfirmacion = new EventEmitter<boolean>();
  @Input() seleccionData: any;
  @Input() creditoSaldo: any;
  @Input() primerPago: string;
  @Input() tipoSeccion: string;
  @Input() isDeepLink: boolean;
  @Input() isExpress: boolean;
  @Input() isRecarga: boolean;
  segundoPago = '';

  textoForm: FormGroup;

  esDebitoCredito = false;
  indCompraExito = false;
  tipoMetodo = '';
  autenticado: boolean;
  isProductPrestame: boolean;
  isLoading = false;
  terminosAceptados = false;
  mostrarTYC = false;
  mostrarTYCCargoRecibo = false;
  mostrarLoading = false;
  isIFILTE = false;
  numeroPaso = '';
  mensajeConfirmar = '';
  paqueteVigencia = '';
  paqueteMoneda = '';
  monedaSaldoRecarga = '';
  numeroCelular = '';
  placeHolder = 'Ingresa código temporal';
  popUpGeneral = false;
  enProceso = true;
  isProductRecarga = false;
  fechaDeCompraLabel = 'Fecha de Compra:';
  title = 'Confirma tu compra';
  productoLabel = 'Producto';
  showMensajePuedespagarconvisaomastercard = false;
  labelComprarTC = 'Comprar';
  tipoRoaming = '';
  eventoCanje: any;
  esEventos = false;
  esCargoRecibo = false;
  terminosCargoRecibo = '';
  subtitle = 'Por favor, confirma que deseas realizar la compra de:';
  infoBoxPairs = [];
  showFooter = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public servicioCompartido: ServicioCompartidoService,
    public confirmarAdelantoService: ConfirmarAdelantoService,
    private popupService: PopupService,
    private pagarProductoCompraService: PagarProductoCompraService,
    private wcmService: WcmService,
    private servicioPago: ServiciosPagosService,
    private servicioCompartidoExito: ServicioCompartidoExitoService,
    public methodsService: MethodsService,
    private datePipe: DatePipe,
    private slicePipe: SlicePipe,
    private decimalPipe: DecimalPipe,
    private omp: ObtenerMetodosPagoService,
    private go: GlobalObjectService,
    private ets: EnviarTokenService,
    private logSP: RegistrarLogService,
    private uiService: UiServiceService,
    private _dataLayer: DataLayerService
  ) {
    this.textoForm = this.formBuilder.group({
      telephone: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
    });
  }


  ngOnInit() {

    // if(this.seleccionData.productoSeleccionado.catnId !== 11){
    //   console.log(this.seleccionData.metodoSeleccionada);
    //   console.log(this.seleccionData.productoSeleccionado);
      
      
    //   this._dataLayer.gtm_add_payment_info(this.seleccionData.metodoSeleccionada, this.seleccionData.productoSeleccionado);
    // }
    
    this.terminosCargoRecibo = this.wcmService.terminos.cargo_recibo;

    if (this.omp.medioSeleccionado != null) {
      this.seleccionData.metodoSeleccionada = this.omp.medioSeleccionado;
    }

    if (this.methodsService.isCurrentCategoryGiftCard(this.seleccionData.categoriaSeleccionada)) {
      this.seleccionData.giftCardPersonalizationData.de = this.seleccionData.productoSeleccionado.dedicatoria.nombre_solicitante;
      this.seleccionData.giftCardPersonalizationData.mensaje = this.seleccionData.productoSeleccionado.dedicatoria.mensaje_opc;
      this.seleccionData.giftCardPersonalizationData.para = this.seleccionData.productoSeleccionado.dedicatoria.nombre_destinatario;
    }

    if ( this.methodsService.isPortalEmbedded()) {
      this.showFooter = true;
    }

    if (this.servicioCompartido.isIFILTE) {
      this.isIFILTE = true;
    }

    //console.log('==============VENTANA CONFIRMACION==================');
    //console.log(this.seleccionData);
    //console.log('====================================================');
    this.esDebitoCredito = ((this.seleccionData.metodoSeleccionada.tipoMetodoPago == '3') ? true : false);
    this.isProductPrestame = ((this.seleccionData.productoSeleccionado.isProductPrestame) ? true : false);
    this.segundoPago = this.seleccionData.metodoSeleccionada.tipoMetodoPago;

    this.tipoMetodo = this.seleccionData.metodoSeleccionada.tipoMetodoPago;
    this.numeroPaso = this.getNumeroPaso();
    this.tipoRoaming = this.getTipoRoaming();
    this.numeroCelular = this.servicioCompartido.msisdn;
    this.autenticado = this.servicioCompartido.autenticado;
    this.monedaSaldoRecarga = this.seleccionData.metodoSeleccionada.simboloMoneda;

    if (this.autenticado || this.isIFILTE) {
      this.esCargoRecibo = ((this.seleccionData.metodoSeleccionada.tipoMetodoPago == '2') ? true : false);
    }

    this.isEventosFunc();
    this.isProductRecarga = this.methodsService.isFlowPortalRecargas();
    this.showMensajePuedespagarconvisaomastercard =
    this.esDebitoCredito && this.seleccionData.categoriaSeleccionada.codCategoria != 13
    && !this.methodsService.isCurrentCategoryGiftCard(this.seleccionData.categoriaSeleccionada)
    && !this.methodsService.isProductCanjeEventos(this.seleccionData.productoSeleccionado)
    && !this.isProductPrestame;

    if (this.isProductRecarga) {
      this.title = 'Confirma tu recarga';
      this.labelComprarTC = 'Recargar';
      this.subtitle = 'Por favor, confirma que deseas realizar la recarga de:';
      this.infoBoxPairs.push(new ConfirmationItem('Operación', this.seleccionData.productoSeleccionado.nombreProducto, ''));
      const slicedDate = this.slicePipe.transform(this.seleccionData.metodoSeleccionada.fechaCompra, 0, 10);
      const fechaCompra = this.datePipe.transform(slicedDate, Constantes.formatos.fechaConstanciaFormato);
      this.infoBoxPairs.push(new ConfirmationItem('Fecha de Recarga', fechaCompra, ''));
      this.infoBoxPairs.push(new ConfirmationItem('Costo (inc. IGV)',
      this.getCostoConIGVValue() , ''));
      this.infoBoxPairs.push(new ConfirmationItem('Método de pago', this.seleccionData.metodoSeleccionada.nombre, ''));

      // this._dataLayer.gtm_checkout_shipping('add_shipping_info', '', this.seleccionData.productoSeleccionado);

    } else if (this.seleccionData.categoriaSeleccionada.codCategoria == 13) {
      this.subtitle = 'Estás a punto de comprar un código de alquiler de película:';
    } else if (this.methodsService.isCurrentCategoryGiftCard(this.seleccionData.categoriaSeleccionada)) {
      this.subtitle = '¡Estás a punto de comprar una gift card!';
    } else if (this.isProductPrestame) {
      this.title = 'Confirma tu Préstamo';
      this.subtitle = this.seleccionData.productoSeleccionado.tituloConfirma;
    } else if (this.methodsService.isProductCanjeEventos(this.seleccionData.productoSeleccionado)) {
      this.subtitle = 'Estás a punto de realizar el canje de tus <strong>Claro Puntos</strong> <br><br><br>';
    }
   
      console.log(this.seleccionData.metodoSeleccionada);
      console.log(this.seleccionData.productoSeleccionado);
            
      this._dataLayer.gtm_add_payment_info(this.seleccionData.metodoSeleccionada, this.seleccionData.productoSeleccionado);
  
  }

  private getCostoConIGVValue() {
    const simboloMoneda = this.seleccionData.metodoSeleccionada.simboloMoneda;
    const precioMoneda = this.seleccionData.productoSeleccionado.precioMoneda;
    return simboloMoneda + this.decimalPipe.transform(precioMoneda, '1.2-2');
  }

  private getTipoRoaming() {
    return this.seleccionData.categoriaSeleccionada.idCategoriaDeCompra == '7' ? this.seleccionData.productoSeleccionado.vigencia : '';
  }

  private getNumeroPaso() {
    if (this.methodsService.isFlowPortalRecargas()) {
      return '3';
    } else if (this.seleccionData.categoriaSeleccionada.idCategoriaDeCompra == '7') {
      return '6';
    } else {
      return '4';
    }
  }

  volver() {
    this.popupService.changeResetActionMessage('reset_metodo');
    this.cerrarConfirmacion.emit(false);
  }

  abreTerminos() {
    if(this.servicioCompartido.isRecargas()){
      this._dataLayer.gtm_Event_term('recargas_confirmacion_pago_click','terminos y condiciones');
    } else {
      this._dataLayer.gtm_Event_term('compras_confirmacion_pago_click', 'terminos y condiciones');
    }
    this.mostrarTYC = true;
  }

  abreTerminosCargo() {
    this.mostrarTYCCargoRecibo = true;
  }

  estadoTermino() {
    if(this.isExpress){
      if(!this.terminosAceptados){
        this._dataLayer.gtm_Event_check_express('compras_confirmacion_pago_change', 'acepto los terminos y condiciones', 'on', 'express');
      }
      if(this.terminosAceptados){
        this._dataLayer.gtm_Event_check_express('compras_confirmacion_pago_change', 'acepto los terminos y condiciones', 'off', 'express');
      } 
    }   else  if(this.isDeepLink){
      if(!this.terminosAceptados){
        this._dataLayer.gtm_Event_check_express('compras_confirmacion_pago_change', 'acepto los terminos y condiciones', 'on', 'deeplink');
      }
      if(this.terminosAceptados){
        this._dataLayer.gtm_Event_check_express('compras_confirmacion_pago_change', 'acepto los terminos y condiciones', 'off', 'deeplink');
      } 
    } else if(this.servicioCompartido.isRecargas() && !this.terminosAceptados){
      this._dataLayer.gtm_Event_check('recargas_confirmacion_pago_change','acepto los terminos y condiciones', 'on');
    } else if(this.servicioCompartido.isRecargas() && this.terminosAceptados){
      this._dataLayer.gtm_Event_check('recargas_confirmacion_pago_change','acepto los terminos y condiciones', 'off');
    } else{  

      if(!this.terminosAceptados){
        this._dataLayer.gtm_Event_check('compras_confirmacion_pago_change', 'acepto los terminos y condiciones', 'on');
      }
      if(this.terminosAceptados){
        this._dataLayer.gtm_Event_check('compras_confirmacion_pago_change', 'acepto los terminos y condiciones', 'off');
      } 
    }
    console.log(this.terminosAceptados);
    
    this.terminosAceptados = !this.terminosAceptados;
  }

  aceptarTYC() {
    this.terminosAceptados = true;
    this.mostrarTYC = false;
    this.mostrarTYCCargoRecibo = false;
  }

  cerrarTYC() {
    this.mostrarTYC = false;
  }


  comprar() {
    this.mostrarLoading = true;

    console.log('recargarrrrr');
    console.log(this.seleccionData);

    const removeAccents = (str) => {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };

    const metodoPago = removeAccents(this.seleccionData.metodoSeleccionada.nombre.toLowerCase());
    const slicedDate = this.slicePipe.transform(this.seleccionData.metodoSeleccionada.fechaCompra, 0, 10);
    const fechaCompra = this.datePipe.transform(slicedDate, Constantes.formatos.fechaConstanciaFormato);

    if(this.servicioCompartido.isRecargas()){
      console.log(this.seleccionData.metodoSeleccionada.nombre);
      const listaTemporal = this.methodsService.converToArray(this.seleccionData.productoSeleccionado.listaCaracteristicasProducto);
      console.log(listaTemporal);

      this._dataLayer.gtm_Event_recargar('recargas_confirmacion_pago_click','recargar',this.seleccionData.productoSeleccionado.lblNombre.toLowerCase(), fechaCompra, this.seleccionData.productoSeleccionado.catvTitulo.toLowerCase(),
          metodoPago, listaTemporal[0].nombre.toLowerCase());
      this._dataLayer.gtm_add_payment_info(this.seleccionData.metodoSeleccionada, this.seleccionData.productoSeleccionado);

    }
    console.log('confirmacion', this.seleccionData.metodoSeleccionada)
    if (this.seleccionData.metodoSeleccionada.idMetodoPago == 1) {
      this._dataLayer.gtm_event_RecargarC('compras_confirmacion_pago_click', 'confirmar',
          this.seleccionData.productoSeleccionado.catvTitulo.toLowerCase(),
          fechaCompra, this.seleccionData.productoSeleccionado.nombreProducto.toLowerCase(), metodoPago, this.seleccionData.productoSeleccionado.lblCosto);
    } else if (this.seleccionData.metodoSeleccionada.idMetodoPago == 3) {
      if(!this.servicioCompartido.isRecargas()){
        this._dataLayer.gtm_event_RecargarC('compras_confirmacion_pago_click', 'comprar',
        this.seleccionData.productoSeleccionado.catvTitulo.toLowerCase(),
        fechaCompra, this.seleccionData.productoSeleccionado.nombreProducto.toLowerCase(), metodoPago,
        this.seleccionData.productoSeleccionado.simboloMoneda.toLowerCase() + ' ' + this.seleccionData.productoSeleccionado.cantidad);
      }

    } else if(this.seleccionData.metodoSeleccionada.idMetodoPago == 4) {
      this._dataLayer.gtm_event_RecargarC('compras_confirmacion_pago_click', 'confirmar',
          this.seleccionData.productoSeleccionado.catvTitulo.toLowerCase(),
          fechaCompra, this.seleccionData.productoSeleccionado.nombreProducto.toLowerCase(), metodoPago,
          this.seleccionData.productoSeleccionado.simboloMoneda.toLowerCase() + ' ' + this.seleccionData.productoSeleccionado.cantidad);
    } else {
      this._dataLayer.gtm_event_RecargarC('compras_confirmacion_pago_click', 'comprar',
          this.seleccionData.productoSeleccionado.catvTitulo.toLowerCase(),
          fechaCompra, this.seleccionData.productoSeleccionado.nombreProducto.toLowerCase(), metodoPago,
          this.seleccionData.productoSeleccionado.simboloMoneda.toLowerCase() + ' ' + this.seleccionData.productoSeleccionado.cantidad);
    }

    // Variables de metodos de pago para favoritos
    if (this.tipoSeccion == 'favoritos') {
      sessionStorage.setItem('favMedioPagos', this.primerPago + ',' + this.segundoPago);
    }

    if (Constantes.WPSMediosDePago.tarjetaCredito.codigo === this.seleccionData.metodoSeleccionada.codigo) {
      this.hacerCompraTC();
    } else if (Constantes.WPSMediosDePago.puntosClaro.codigo === this.seleccionData.metodoSeleccionada.codigo) {
        this.otrasCompras(true);
    } else {
        this.otrasCompras(false);
    }

    
  }

  abrirUps() {
    this.mostrarPopupUps('Por favor inténtalo otra vez');
  }

  mostrarPopupUps(messageError, title= 'Lo sentimos, la operación no pudo ser completada') {
    this.uiService.openPopup({
        content: messageError,
        mainButtonBehavior: ButtonBehavior.Reload,
        title,
        buttonMessage: 'Entendido',
        isInvertedButton: false,
        imagen: null
    });
    this.mostrarLoading = false;
  }

  requesConfirmarCompraExitosa(response: any) {
      this.servicioCompartidoExito.actualizarDatos(response,
      this.seleccionData.productoSeleccionado,
      this.seleccionData.categoriaSeleccionada,
      this.seleccionData.metodoSeleccionada,
      true, '');
      //console.log('response: ', response);
      //console.log('servicioCompartidoExit: ', this.servicioCompartidoExito);

  }

  hacerCompraTC() {
    const request = this.getrequestComprasyPagos(Constantes.WPSIndicadorRequest.value.indicadorCompraTC, '');
    // if(this.isExpress){
    //   request.flagFavorito = 'E'
    //   this._dataLayer.gtm_Event_compra('compras_express_pago_exitoso','express');
    // }
    // if(this.isDeepLink){
    //   request.flagFavorito = 'D'
    //   this._dataLayer.gtm_Event_compra('compras_deeplink_pago_exitoso','deeplink');
    // }

    //console.log('Request hacerCompraTC: ', request);
    const popupErrordData = {
      content:  Constantes.WPSMensajeError.value.MOTOR_PAGOS_GENERICO_REGISTRO_INICIO,
      mainButtonBehavior: ButtonBehavior.Reload,
      title: Constantes.WPSMensajeError.value.MOTOR_PAGOS_FALLA_DEFAULT_TITLE,
      buttonMessage: 'Entendido',
      isInvertedButton: false,
      imagen: null
    };

    this.logSP.registrarLogSP('Inicio : hacerCompraTC - getrequestComprasyPagos', request);
    this.servicioPago.regInicioTransaccionPagoTC(request).toPromise().then((response: any) => {
      const idRespuestaDP = response.comunResponseType.MessageResponse.Header.HeaderResponse.status.code;

      if (parseInt(idRespuestaDP, 10) == 0) {
        const idRespuesta = response.comunResponseType.MessageResponse.Body.defaultServiceResponse.idRespuesta;
        this.logSP.registrarLogSP('Obteniendo respuesta idRespuestaTC: ', idRespuesta);

        if (parseInt(idRespuesta, 10) == 0) {
          const inicioTransaccionTCResponse = response.comunResponseType.MessageResponse.Body;
          this.logSP.registrarLogSP('inicioTransaccionTCResponseTC:', inicioTransaccionTCResponse);

          const motorPagosFlujoPagoRequest = {
            urlPortal: this.go.callbackUrl,
            tipoCompra: this.getMotorPagosTipoCompra(this.seleccionData.productoSeleccionado.catvCodCategoria),
            medioPago: this.seleccionData.productoSeleccionado.idMetodoPago,
            numeroOrdenPortal: inicioTransaccionTCResponse.numeroOrden,
            telefono: this.servicioCompartido.msisdn,
            monto: this.formatPriceTwoDecimals(this.seleccionData.productoSeleccionado.precioMoneda),
            token: inicioTransaccionTCResponse.motorPagosToken || Constantes.EMPTY_STRING,
            codigoPortal: Constantes.MOTOR_PAGOS_CODIGO_PORTAL,
            urlTimeoutSesion: Constantes.urlPortal.portalInternetClaro,
            transactionFunction: '',
          };

          //console.log('motorPagosFlujoPagoRequest:', motorPagosFlujoPagoRequest );
          this.logSP.registrarLogSP('motorPagosFlujoPagoRequest:', motorPagosFlujoPagoRequest);

          try {
            this.servicioCompartidoExito.actualizarDatos({numeroCompra: this.servicioCompartido.msisdn},
                this.seleccionData.productoSeleccionado, this.seleccionData.categoriaSeleccionada, this.seleccionData.metodoSeleccionada,
                null, this.seleccionData.giftCardPersonalizationData);
            window.sessionStorage.setItem(Constantes.MOTOR_PAGOS_COMPRA_COMPARTIDA, JSON.stringify(this.servicioCompartidoExito));

            const regFinTx = this.getrequestFinTransaccion(motorPagosFlujoPagoRequest.numeroOrdenPortal,
                Constantes.EMPTY_STRING, Constantes.EMPTY_STRING);
            regFinTx.isPaymentEngine = Constantes.CADENA_UNO;

            window.sessionStorage.setItem(Constantes.MOTOR_PAGOS_REG_FIN_TRANSACCION, JSON.stringify(regFinTx));
            //console.log({ reg_fin_tx: regFinTx });
            this.logSP.registrarLogSP('reg_fin_tx:', regFinTx);

            // PRODUCCION
            setTimeout(() => {
              //console.log('cerrar loading');
            }, 650);
            this.mostrarLoading = false;
            pago.flujoPago(motorPagosFlujoPagoRequest);

            if(this.isExpress){
              request.flagFavorito = 'E'
              this._dataLayer.gtm_Event_compra_2('compras_express_pago_exitoso','express');
            }
            if(this.isDeepLink){
              request.flagFavorito = 'D'
              this._dataLayer.gtm_Event_compra_2('compras_deeplink_pago_exitoso','deeplink');
            }

            if(this.servicioCompartido.isRecargas()){
              this._dataLayer.gtm_Event_pagoSucces('recargas_confirmacion_pago','success');
            }

          } catch (error) {
            if(this.servicioCompartido.isRecargas()){
              this._dataLayer.gtm_Event_pago('recargas_confirmacion_pago','failure', 'fallo del servidor');
            }
            console.error('Ocurrio error al iniciar flujoPago de motorpagos: ', error);
            this.logSP.registrarLogSP('Ocurrio error al iniciar flujoPago de motorpagos:', error);
            (document.getElementById('loaderVisa') as HTMLElement).style.display = 'none';
            this.uiService.openPopup(popupErrordData);
            this.mostrarLoading = false;

          }
        } else {
          this.logSP.registrarLogSP('Ocurrio error al iniciar regInicioTransaccionPagoTC de motorpagos : ', idRespuesta);
          this.uiService.openPopup(popupErrordData);
          this.mostrarLoading = false;
          if(this.servicioCompartido.isRecargas()){
            this._dataLayer.gtm_Event_pago('recargas_confirmacion_pago','failure', 'fallo del servidor');
          }
        }
      } else {
        this.logSP.registrarLogSP('Ocurrio error al iniciar regInicioTransaccionPagoTC de motorpagos idRespuestaDP : ', idRespuestaDP);
        this.mostrarLoading = false;
        this.uiService.openPopup(popupErrordData);
        if(this.servicioCompartido.isRecargas()){
          this._dataLayer.gtm_Event_pago('recargas_confirmacion_pago','failure', 'fallo del servidor');
        }
      }
    }).catch(err => {
      this.logSP.registrarLogSP('Ocurrio error tecnico : ', err);
      this.indCompraExito = false;
      this.mostrarLoading = false;
      this.uiService.openPopup(popupErrordData);
    });
  }

  getrequestFinTransaccion(orden: any, tokenId: any, email: any) {
    const request = {
      idProductoDeCompra: null,
      idCategoriaDeCompra: null,
      numeroOrden: null,
      idMetodoPago: null,
      objeto: null,
      emailNotificacion: null,
      nombreComprador: null,
      nombreBeneficiario: null,
      emailBeneficiario: null,
      mensaje: null,
      flagCopiaComprador: null,
      flagFavorito: null,
      isPaymentEngine: null,
      codigoCategoria: null,
      marketActivity: null
    };

    request.idProductoDeCompra = this.seleccionData.productoSeleccionado.idProductoDeCompra;
    request.idCategoriaDeCompra = this.seleccionData.categoriaSeleccionada.idCategoriaDeCompra;
    request.idMetodoPago = this.seleccionData.metodoSeleccionada.idMetodoPago;
    request.numeroOrden = orden;
    request.objeto = tokenId;
    request.emailNotificacion = email;
    request.flagFavorito = window.sessionStorage.getItem(Constantes.flagFav);
    // if(this.isExpress){
    //   request.flagFavorito = 'E'
    //   this._dataLayer.gtm_Event_compra('compras_express_pago_exitoso','express');
    // }
    // if(this.isDeepLink){
    //   this._dataLayer.gtm_Event_compra('compras_deeplink_pago_exitoso','deeplink');
    //   request.flagFavorito = 'D'
    // }
    request.nombreComprador = this.seleccionData.giftCardPersonalizationData.de;
    request.nombreBeneficiario = '';
    request.emailBeneficiario = this.seleccionData.giftCardPersonalizationData.para;
    request.mensaje = this.seleccionData.giftCardPersonalizationData.mensaje.replace(/\n/g, '\\n');
    request.flagCopiaComprador = this.seleccionData.giftCardPersonalizationData.conCopia ? '1' : '0';
    request.codigoCategoria = this.seleccionData.categoriaSeleccionada.codCategoria;
    request.marketActivity = this.getMarketActivity();

    return request;
  }

  private getMarketActivity() {
    const flagPontis = this.seleccionData.productoSeleccionado.flagPontis;
    return (flagPontis == undefined || flagPontis == '0') ? null : '1';
  }

  getrequestComprasyPagos(indicador: any, zona: any) {
    const request = {
      userAgent: null,
      idProductoDeCompra: null,
      idCategoriaDeCompra: null,
      idCategoria: null,
      codigoCategoria: null,
      idMetodoPago: null,
      claroPuntosCliente: null,
      importePago: null,
      precioPuntos: null,
      precioMoneda: null,
      tipoValidacion: null,
      vigenciaProducto: null,
      codTipoLinea: null,
      nombreComprador: null,
      nombreBeneficiario: null,
      emailBeneficiario: null,
      mensaje: null,
      flagCopiaComprador: null,
      isPaymentEngine: null,
      flagFavorito: null,
      admin: null,
      notificacionURLImage: null,
      fechaSorteoCanje: null,
      asuntoCorreoCanje: null,
      textoNotificacionCorreoCanje: null,
      linkCondicionesSorteo: null,
      canalTemporal: null,
      marketActivity: null
    };

    if (sessionStorage.getItem('canal') != null) {
      request.canalTemporal = sessionStorage.getItem('canal');
    } else {
      request.canalTemporal = '1';
    }

    request.admin = this.servicioCompartido.isAdmin;
    request.flagFavorito = window.sessionStorage.getItem(Constantes.flagFav);
    if (indicador == Constantes.WPSIndicadorRequest.value.indicadorOfertas) {
      if (zona != '' && zona != undefined) {
        request.idCategoria = this.seleccionData.categoriaSeleccionada.idCategoriaDeCompra;
        request.codigoCategoria = zona;
      } else {
        request.idCategoria = this.seleccionData.categoriaSeleccionada.idCategoriaDeCompra;
        request.codigoCategoria = this.seleccionData.categoriaSeleccionada.codCategoria;
      }
    } else if (
      indicador == Constantes.WPSIndicadorRequest.value.indicadorFavoritos
    ) {
      request.idCategoria = this.servicioCompartido.msisdn;
      request.codigoCategoria = '51' + this.servicioCompartido.msisdn;
    } else if (indicador == Constantes.WPSIndicadorRequest.value.indicadorRoaming) {
      if (this.servicioCompartido.tipoVal == Constantes.WPSTipoClic.value.clicCategoria) {
          request.tipoValidacion = this.servicioCompartido.tipoVal;
      } else if (this.servicioCompartido.tipoVal == Constantes.WPSTipoClic.value.clicPaises) {
        request.idCategoriaDeCompra = this.seleccionData.productoSeleccionado.catnId;
        request.idProductoDeCompra = this.seleccionData.productoSeleccionado.idProductoDeCompra;
        request.idMetodoPago = this.seleccionData.metodoSeleccionada.idMetodoPago;
        request.codTipoLinea = this.seleccionData.productoSeleccionado.codTipoLinea;
        request.tipoValidacion = this.servicioCompartido.tipoVal;
        if (sessionStorage.getItem('zone_pais')) {
          request.asuntoCorreoCanje = sessionStorage.getItem('zone_pais');
        }
        if (this.tipoRoaming != '' && this.tipoRoaming != undefined) {
          request.vigenciaProducto = this.seleccionData.productoSeleccionado.vigencia;
        }
      } else {
          request.tipoValidacion = this.servicioCompartido.tipoVal;
          request.idProductoDeCompra = this.seleccionData.productoSeleccionado.idProductoDeCompra;
      }
    }  else if (
      indicador == Constantes.WPSIndicadorRequest.value.indicadorCompraTC
    ) {
      request.codigoCategoria = this.seleccionData.categoriaSeleccionada.codCategoria;
      request.idCategoriaDeCompra = this.seleccionData.categoriaSeleccionada.idCategoriaDeCompra;
      if (this.methodsService.isFlowPortalRecargas()) {
        request.idProductoDeCompra = this.seleccionData.productoSeleccionado.idProductoDeCompra;
        request.idMetodoPago = this.seleccionData.productoSeleccionado.idMetodoPago;
      } else {
         request.idProductoDeCompra = this.seleccionData.productoSeleccionado.idProductoDeCompra + '-' +
             this.seleccionData.productoSeleccionado.idMetodoPago;
      }
      request.importePago = this.seleccionData.productoSeleccionado.precioMoneda;
      request.codTipoLinea = this.seleccionData.productoSeleccionado.codTipoLinea;
      if (
        this.currentLineIsInWhitelist(
          Constantes.MOTOR_PAGOS_WHITELIST_NODE_ORDER,
          Constantes.MOTOR_PAGOS_WHITELIST_NODE_NAME
        )
      ) {
        request.idMetodoPago = this.seleccionData.productoSeleccionado.idMetodoPago;
        request.nombreComprador = this.seleccionData.giftCardPersonalizationData.de;
        request.nombreBeneficiario = '';
        request.emailBeneficiario = this.seleccionData.giftCardPersonalizationData.para;
        request.mensaje = this.seleccionData.giftCardPersonalizationData.mensaje.replace(
          /\n/g,
          '\\n'
        );
        request.flagCopiaComprador = this.seleccionData
          .giftCardPersonalizationData.conCopia
          ? '1'
          : '0';
        request.isPaymentEngine = '1';
      }
    } else if (indicador == Constantes.WPSIndicadorRequest.value.indicadorOtrasCompras) {
        request.codigoCategoria = this.seleccionData.categoriaSeleccionada.codCategoria;
        request.idCategoriaDeCompra = this.seleccionData.categoriaSeleccionada.idCategoriaDeCompra;
        request.idProductoDeCompra = this.seleccionData.productoSeleccionado.idProductoDeCompra;
        request.idMetodoPago = this.seleccionData.metodoSeleccionada.idMetodoPago;
        request.codTipoLinea = this.seleccionData.productoSeleccionado.codTipoLinea;
        request.marketActivity = this.getMarketActivity();

        if (Constantes.WPSMediosDePago.puntosClaro.codigo === this.seleccionData.metodoSeleccionada.codigo) {
            request.claroPuntosCliente = this.seleccionData.metodoSeleccionada.totalClaroPuntos;
        }

        // HLR
        // canje eventos inicio >>    campos extra
        request.notificacionURLImage = this.catHasWCM() ? this.seleccionData.categoriaSeleccionada.wcm.urlNotificacion : '';
        request.fechaSorteoCanje = this.catHasWCM() ? this.seleccionData.categoriaSeleccionada.wcm.fechaSorteo : '';
        request.asuntoCorreoCanje = this.catHasWCM() ? this.seleccionData.categoriaSeleccionada.wcm.asuntoCorreo : '';
        request.textoNotificacionCorreoCanje = this.catHasWCM() ? this.seleccionData.categoriaSeleccionada.wcm.textoNotificacion : '';
        request.linkCondicionesSorteo = this.catHasWCM() ? this.seleccionData.categoriaSeleccionada.wcm.LinkCondicionesSorteo : '';
        // canje eventos fin >> campos extra
    }
    //console.log("Request Antes de la compra");

    //console.log(request);
    return request;
  }

  private catHasWCM() {
    return this.seleccionData.categoriaSeleccionada && this.seleccionData.categoriaSeleccionada.wcm;
  }

  getMotorPagosTipoCompra(PortalComprasCategoryCode: any) {
    switch (PortalComprasCategoryCode) {
      case Constantes.PC_CATEGORIAS_COMPRA.internet:
        return Constantes.MOTOR_PAGOS_TIPOS_COMPRA['PAQUETE MEGAS'];
      case Constantes.PC_CATEGORIAS_COMPRA.voz:
        return Constantes.MOTOR_PAGOS_TIPOS_COMPRA['PAQUETE VOZ'];
      case Constantes.PC_CATEGORIAS_COMPRA.sms:
        return Constantes.MOTOR_PAGOS_TIPOS_COMPRA['PAQUETE SMS'];
      case Constantes.PC_CATEGORIAS_COMPRA.roaming:
        return Constantes.MOTOR_PAGOS_TIPOS_COMPRA['PAQUETE ROAMING'];
      case Constantes.PC_CATEGORIAS_COMPRA.sociales:
        return Constantes.MOTOR_PAGOS_TIPOS_COMPRA['REDES SOCIALES'];
      case Constantes.PC_CATEGORIAS_COMPRA.videos:
        return Constantes.MOTOR_PAGOS_TIPOS_COMPRA['ALQUILER PELICULAS'];
      case Constantes.PC_CATEGORIAS_COMPRA.gifCard:
        return Constantes.MOTOR_PAGOS_TIPOS_COMPRA['GIFT CARD'];
      case Constantes.PC_CATEGORIAS_COMPRA.gifCard1:
        return Constantes.MOTOR_PAGOS_TIPOS_COMPRA['GIFT CARD'];
      case Constantes.PC_CATEGORIAS_COMPRA.gifCard2:
        return Constantes.MOTOR_PAGOS_TIPOS_COMPRA['GIFT CARD'];
      case Constantes.PC_CATEGORIAS_COMPRA.gifCard3:
        return Constantes.MOTOR_PAGOS_TIPOS_COMPRA['GIFT CARD'];
      default:
        return Constantes.MOTOR_PAGOS_TIPOS_COMPRA.OTROS;
      }
  }

  formatPriceTwoDecimals(price: any) {
    if (price == null || price == '') {
      return Constantes.EMPTY_STRING;
    }
    return (parseFloat((Math.round(parseFloat(price) * Constantes.INTEGER_100) / Constantes.INTEGER_100).toString())
        .toFixed(Constantes.INTEGER_2)).toString();
  }

  isEventosFunc() {
    //console.log(this.seleccionData.categoriaSeleccionada.codCategoria);
    //console.log(Constantes.WPSCategoriasDeCompra);
    if (
      this.seleccionData.categoriaSeleccionada.codCategoria ==
      Constantes.WPSCategoriasDeCompra.canjeEventosSub1 ||
      this.seleccionData.categoriaSeleccionada.codCategoria ==
      Constantes.WPSCategoriasDeCompra.canjeEventosSub2 ||
      this.seleccionData.categoriaSeleccionada.codCategoria ==
      Constantes.WPSCategoriasDeCompra.canjeEventosSub3 ||
      this.seleccionData.categoriaSeleccionada.codCategoria ==
      Constantes.WPSCategoriasDeCompra.canjeEventosSub4 ||
      this.seleccionData.categoriaSeleccionada.codCategoria ==
      Constantes.WPSCategoriasDeCompra.canjeEventosSub5
    ) {
      this.esEventos = true;
      this.eventoCanje = JSON.parse(window.sessionStorage.getItem('eventoEsc'));
    }
  }

  otrasCompras(estado: boolean) {
    if (this.enProceso) {
      this.enProceso = false;
      let request = null;

      if (this.seleccionData.categoriaSeleccionada.codCategoria === Constantes.PC_CATEGORIAS_COMPRA.roaming) {
        request = this.getrequestComprasyPagos(Constantes.WPSIndicadorRequest.value.indicadorRoaming, '');
      } else {
        request = this.getrequestComprasyPagos(Constantes.WPSIndicadorRequest.value.indicadorOtrasCompras, '');
      }

      request.userAgent = navigator.userAgent;
      if(this.isExpress){
        request.flagFavorito = 'E'
        this._dataLayer.gtm_Event_compra_2('compras_express_pago_exitoso','express');
      }
      if(this.isDeepLink){
        request.flagFavorito = 'D'
        this._dataLayer.gtm_Event_compra_2('compras_deeplink_pago_exitoso','deeplink');
      }
      //console.log('getrequestComprasyPagos: ', request);

      this.pagarProductoCompraService.pagarProductoCompra(request).toPromise().then((res: any) => {
        this.enProceso = true;
        const idRespuesta = res.comunResponseType.MessageResponse.Body.defaultServiceResponse.idRespuesta;
        const idRespuestaDP = res.comunResponseType.MessageResponse.Header.HeaderResponse.status.type;
        if (parseInt(idRespuestaDP, 10) == 0) {

          if (parseInt(idRespuesta, 10) == 0) {

            //console.log('Se realizo la compra 2--------------');

            this.requesConfirmarCompraExitosa(res.comunResponseType.MessageResponse.Body);

            if (this.isRoamingDiario()) {
               // Constancia Roaming
               setTimeout(() => {
                this.mostrarLoading = false;
                this.router.navigateByUrl('/confirma', { skipLocationChange: true });
              }, 2000);
            } else if (this.isRoamingMensual()) {
                // Constancia Roaming
                setTimeout(() => {
                  this.mostrarLoading = false;
                  this.router.navigateByUrl('/confirma', { skipLocationChange: true });
                }, 2000);
            } else {
              setTimeout(() => {
                this.mostrarLoading = false;
                this.router.navigateByUrl('/confirma', { skipLocationChange: true });
              }, 2000);
            }

          } else if (idRespuesta == 17) {
            this.mostrarLoading = false;
            const data = {
              content: Constantes.WPSMensajeError.value.ROAMING_MENSAJE_PAQUETE_VIGENTE,
              mainButtonBehavior: ButtonBehavior.SimplyClose,
              title: Constantes.WPSMensajeError.value.ROAMING_TITULO_PAQUETE_VIGENTE,
              buttonMessage: 'Entendido',
              isInvertedButton: null,
              imagen: null
            };
            this.uiService.openPopup(data);

          } else if (idRespuesta == 18) {
            this.mostrarLoading = false;
            const data = {
              content: Constantes.WPSMensajeError.value.ROAMING_MENSAJE_PAQUETE_PRO,
              mainButtonBehavior: ButtonBehavior.SimplyClose,
              title: Constantes.WPSMensajeError.value.mensaje7,
              buttonMessage: 'Entendido',
              isInvertedButton: null,
              imagen: null
            };
            this.uiService.openPopup(data);
          } else {
            const defaultServiceResponseMessage = res.comunResponseType.MessageResponse.Body.defaultServiceResponse.mensaje;
            if (this.seleccionData.productoSeleccionado.catvCodCategoria == Constantes.PC_CATEGORIAS_COMPRA.cambio_velocidad
              &&
              Constantes.CUSTOM_FULLVEL_DEGRAD_ERROR_MESSAGE == defaultServiceResponseMessage
            ) {
              this.mostrarPopupUps(defaultServiceResponseMessage);
            } else {
              this.abrirUps();
            }
          }


        } else {
          this.abrirUps();
        }
      }).catch(err => {
        //console.log('error pagarProductoCompra ', err);
        this.abrirUps();
      });
    }
  }

  private isRoamingDiario() {
    return this.seleccionData.productoSeleccionado.vigencia == '1' && this.seleccionData.categoriaSeleccionada.codCategoria == '5';
  }

  private isRoamingMensual() {
    return this.seleccionData.productoSeleccionado.vigencia == '30' && this.seleccionData.categoriaSeleccionada.codCategoria == '5';
  }

  currentLineIsInWhitelist(order: number, whitelistName: string) {
    if (
      typeof this.wcmService.whitelistConfig !== 'undefined' &&
      this.wcmService.whitelistConfig &&
      this.wcmService.whitelistConfig[order] &&
      this.wcmService.whitelistConfig[order][whitelistName] &&
      this.wcmService.whitelistConfig[order][whitelistName].state ===
        Constantes.MOTOR_PAGOS_CONSTANTS.MOTORPAGOS_SWITCH_ENABLED
    ) {
      return true;
    } else {
      return false;
    }
  }

  getrequestConfirmarAdelanto(codigoProducto: any) {
    //console.log('codigoProducto : ' + codigoProducto);
    const request = {
      productId: null,
      canalTemporal: null
    };
    if (sessionStorage.getItem('canal') != null) {
      request.canalTemporal = sessionStorage.getItem('canal');
    } else {
      request.canalTemporal = '1';
    }
    request.productId = codigoProducto;
    return request;
  }

  confirmarAdelanto(idProductoServicioAdelanto: any) {
    const requestConfirmarAdelanto = this.getrequestConfirmarAdelanto(
      idProductoServicioAdelanto
    );
    this.confirmarAdelantoService
      .confirmarAdelanto(requestConfirmarAdelanto)
      .toPromise()
      .then((response: any) => {
        let serviceErrorMessage = '';
        try {
          if (response) {

            const idRespuesta =
              response.comunResponseType.MessageResponse.Body
                .defaultServiceResponse.idRespuesta;
            const idRespuestaDP =
              response.comunResponseType.MessageResponse.Header.HeaderResponse
                .status.type;
            serviceErrorMessage = response.comunResponseType.MessageResponse
              .Body.defaultServiceResponse.mensaje
              ? response.comunResponseType.MessageResponse.Body
                  .defaultServiceResponse.mensaje
              : '';
            if (parseInt(idRespuestaDP, 10) == 0) {
              if (idRespuesta == 0) {
                const pagarProductoDeCompraResponse =
                  response.comunResponseType.MessageResponse.Body;
                this.servicioCompartidoExito.actualizarDatos(pagarProductoDeCompraResponse,
                  this.seleccionData.productoSeleccionado,
                  this.seleccionData.categoriaSeleccionada,
                  null,
                  true,
                  null
                );

                this.mostrarLoading = true;
                setTimeout(() => {
                  this.mostrarLoading = false;
                  this.cerrarPopUp(false);
                  this.router.navigateByUrl('/confirma', { skipLocationChange: true });
                }, 3000);
              } else {
                this.mostrarPopupUps(Constantes.WPSMensajeError.value.PRESTAME_MEGAS_EROR_TECNICO_CONTENT,
                    Constantes.WPSMensajeError.value.PRESTAME_MEGAS_EROR_TECNICO_TITULO);
              }
            } else {
              this.mostrarPopupUps(Constantes.WPSMensajeError.value.PRESTAME_MEGAS_EROR_TECNICO_CONTENT,
                  Constantes.WPSMensajeError.value.PRESTAME_MEGAS_EROR_TECNICO_TITULO);
            }
          }
        } catch (error) {
          this.mostrarPopupUps(Constantes.WPSMensajeError.value.PRESTAME_MEGAS_EROR_MOBUP_CONTENT,
              Constantes.WPSMensajeError.value.PRESTAME_MEGAS_EROR_MOBUP_TITULO);
        }
      })
      .catch((err) => {
        //console.log('error confirmarAdelanto ', err);
        this.mostrarPopupUps(Constantes.WPSMensajeError.value.PRESTAME_MEGAS_EROR_GENERICO_CONTENT,
            Constantes.WPSMensajeError.value.PRESTAME_MEGAS_EROR_GENERICO_TITULO);
      });
  }

  checkPlaceHolder() {

    if (this.placeHolder) {
      this.placeHolder = null;
      this._dataLayer.gtm_event_cargoRecibo('compras_confirmacion_pago_click', 'ingrese codigo temporal');
      return;
      
    } else {

      this.placeHolder = 'Ingresa código temporal';
    
      return;
    }
    
  }

  cerrarPopUp(est: any) {
    this.showPopup = est;
    if (this.shouldGoBackToCategoriesAfterClosingPopup) {
      this.shouldGoBackToCategoriesAfterClosingPopup = false;
      this.popupService.changeMessage('go_back');
    }
  }

  enviarSMSToken() {
    console.groupCollapsed('Envío SMS token');
    this.textoForm.controls.telephone.updateValueAndValidity();
    this.methodsService.enviarSMSToken(() => { });
    console.groupEnd();
    this._dataLayer.gtm_event_cargoRecibo('compras_confirmacion_pago_click', 'intentelo nuevamente');
  }

  comprarAutenticadoNoTC() {
    this.mostrarLoading = true;
    if (this.isProductPrestame) {
      this.confirmarAdelanto(this.seleccionData.productoSeleccionado.idProductoDeCompra);
    } else {
      this.comprar();
    }
  }

  validarTokenxSMS() {
    const token = this.textoForm.controls.telephone.value;
    console.groupCollapsed('confirmacionComponent > validarTokenxSMS', token);
    this.mostrarLoading = true;
    this.ets.validarTokenxSMS(token).subscribe(isTokenValid => {
      if (isTokenValid) {
        //console.log('OK %s', token);
        //console.log('confirmacionComponent > validarTokenxSMS token %s valido', token);

        if (this.isProductPrestame) {
          this.confirmarAdelanto(this.seleccionData.productoSeleccionado.idProductoDeCompra);
        } else {
          this.comprar();
        }
      } else {
        this.textoForm.controls.telephone.setErrors({ incorrect: true });
        this.mostrarLoading = false;
        //console.log('confirmacionComponent > validarTokenxSMS Token inválido %s', token);
      }

      //console.groupEnd();
    });
  }
}
