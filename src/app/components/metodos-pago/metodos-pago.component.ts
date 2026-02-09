import { UiServiceService } from './../../services/ui-service.service';
import { environment } from './../../../environments/environment';
import { ObtenerMetodosPagoService } from './../../services/obtener-metodos-pago.service';
import { ServicioCompartidoService } from './../../core/services/servicio-compartido.service';
import { GlobalObjectService } from './../../services/global-object.service';
import { PopupService } from './../../services/popup.service';
import { WcmService } from 'src/app/services/wcm.service';
import { Constantes } from 'src/app/services/constants';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MethodsService } from 'src/app/services/methods.service';
import { EnviarTokenService } from 'src/app/services/enviar-token.service';
import { ButtonBehavior } from '../dialog/dialog.component';
import { DataLayerService } from '../../services/data-layer.service';

declare var $: any;

@Component({
  selector: 'app-metodos-pago',
  templateUrl: './metodos-pago.component.html',
  styleUrls: ['./metodos-pago.component.scss'],
})
export class MetodosPagoComponent implements OnInit, OnChanges, AfterViewInit {
  showPopup = false;
  infoPopUp: any;
  nombrePopUp: any;

  shouldGoBackToCategoriesAfterClosingPopup = false;
  // optional input parameters
  @Input() metodosPago = false;
  @Input() categoriaElegida = '';

  portalRecargasFlag = false;
  esLineaPrepago;

  confirmaData: any = {};
  medioSeleccionado: any;
  metodoPagoElegidoIndex: any;
  isLoading = false;

  srcIconStar;

  autenticado = false;
  @Input() listaMetodosPago;
  @Input() productoElegido;
  @Input() bloqueoFlag = false;
  @Input() order: string;
  @Input() tipoSeccionIdMetodo: any;

  @Input() idRespuesta;
  @Input() tipoMetodoPagoStar;
  @Input() numPaso = '3';
  // non optional input parameters
  @Input() creditoSaldo: any;
  @Input() isDegradado: string;
  @Input() isRecarga: boolean;

  @Output() mandarConfirmacion = new EventEmitter<boolean>();
  @Output() metodoSeleccionado = new EventEmitter<any>();
  @Output() quitarLoading = new EventEmitter<any>();

  mensajeRevisarCondiciones = '';
  isNotEnabledFavoritoMetodo = false;
  favoritosMetodoErrorMensaje = '';

  constructor(
    private methods: MethodsService,
    private wcmService: WcmService,
    private popupService: PopupService,
    private go: GlobalObjectService,
    private enviarToken: EnviarTokenService,
    private sc: ServicioCompartidoService,
    private omp: ObtenerMetodosPagoService,
    private uiService: UiServiceService,
    private _dataLayer: DataLayerService,
    
  ) {
    this.srcIconStar = Constantes.iconStar;
    }

  resetearMetodoSeleccionado() {
    //console.log('Reset metodo de pago');
    if (this.metodoPagoElegidoIndex !== undefined) {
      if(document.getElementById('metodoPagoItem-' + this.metodoPagoElegidoIndex) != null){
        
        document.getElementById(
          'metodoPagoItem-' + this.metodoPagoElegidoIndex
        ).style.border = 'solid 1px rgba(33, 33, 33, 0.03)';
      }
    }
    this.omp.medioSeleccionado = null;
    this.metodoPagoElegidoIndex = undefined;
    this.confirmaData = {};
    this.medioSeleccionado = null;
  }

  ngOnInit(): void {

    console.warn("tipoMetodoPagoStar", this.tipoMetodoPagoStar);

    this.popupService.currentResetMetodosPagoMessage.subscribe((message) => {
      if (message === 'reset_metodo') {
        this.resetearMetodoSeleccionado();
      }
    });
    //console.log('productoElegido: ', this.productoElegido);
    this.autenticado = this.sc.autenticado;
    //console.log('aute:' + this.sc.autenticado);
    this.esLineaPrepago = this.methods.esLineaPrepago();
    this.portalRecargasFlag = this.methods.isFlowPortalRecargas();
    this.mensajeRevisarCondiciones = this.portalRecargasFlag
      ? 'Más información de las recargas aquí'
      : 'Revisa las condiciones de los paquetes aquí';

    if (this.numPaso == '5') {
      this.methods.scroll(document.getElementById('paso_5_roaming'));
    } else if (this.numPaso == '4') {
      this.methods.scroll(document.getElementById('paso_4_sub'));
    } else {
      this.methods.scroll(document.getElementById('paso_3_prod'));
    }
    if (
      this.tipoSeccionIdMetodo != null &&
      this.tipoSeccionIdMetodo != undefined
    ) {
      setTimeout(() => {
        if (this.tipoSeccionIdMetodo.tipoSec === 'favoritos' || this.tipoSeccionIdMetodo.tipoSec === 'recargas') {
          this.listaMetodosPago.forEach((element) => {
            
            if (element.tipoMetodoPago == this.tipoSeccionIdMetodo.idMetodo) {
              
              if (element.estado == '1') {
                this.seleccionarMedio(element);
              } else {
                this.mostrarMensajeMetodo(element.tipoMetodoPago);
                setTimeout(() => {
                  this.methods.scroll(document.getElementById('metodosDiv'));
                }, 350);
              }
            }
          });
        }
      }, 1000);
    }
  }

  mostrarMensajeMetodo(tipo: string) {
    switch (tipo) {
      case '1':
        this.favoritosMetodoErrorMensaje = 'Tus Claro Puntos son insuficientes';
        break;
      case '2':
        this.favoritosMetodoErrorMensaje =
          'Tu línea de crédito es insuficiente';
        break;
      case '4':
        this.favoritosMetodoErrorMensaje =
          'Tu saldo de recarga es insuficiente';
        break;
      default:
        this.favoritosMetodoErrorMensaje = '';
    }

    this.isNotEnabledFavoritoMetodo = true;
    this.quitarLoading.emit(false);
  }

  showDegradacionesPopup(productoElegido) {
    let info = null;
    if (this.methods.isIFILTE(productoElegido)) {
      // IFI-LTE
      if(productoElegido.catvCodCategoria == '50'){
        //console.log(this.wcmService.getMensajeDegradacionesPaqueteInalambrico())
        info = {
          titulo1Degradaciones: this.wcmService.getMensajeDegradacionesPaqueteInalambrico()
            .titulo1Error,
          titulo2Degradaciones: this.wcmService.getMensajeDegradacionesPaqueteInalambrico()
            .titulo2Error,
          descripcionDegradaciones: this.wcmService.getMensajeDegradacionesPaqueteInalambrico()
            .descripcionError,
        };
      }else{
        info = {
          titulo1Degradaciones: this.wcmService.getMensajeDegradacionesFijo()
            .titulo1Error,
          titulo2Degradaciones: this.wcmService.getMensajeDegradacionesFijo()
            .titulo2Error,
          descripcionDegradaciones: this.wcmService.getMensajeDegradacionesFijo()
            .descripcionError,
        };
      }
      
    } else {
      // MOVIL
      if(productoElegido.catvCodCategoria == '50'){
        info = {
          titulo1Degradaciones: this.wcmService.getMensajeDegradacionesPaqueteInalambrico()
            .titulo1Error,
          titulo2Degradaciones: this.wcmService.getMensajeDegradacionesPaqueteInalambrico()
            .titulo2Error,
          descripcionDegradaciones: this.wcmService.getMensajeDegradacionesPaqueteInalambrico()
            .descripcionError,
        };
      }else{
        info = {
          titulo1Degradaciones: this.wcmService.getMensajeDegradacionesMovil()
            .titulo1Error,
          titulo2Degradaciones: this.wcmService.getMensajeDegradacionesMovil()
            .titulo2Error,
          descripcionDegradaciones: this.wcmService.getMensajeDegradacionesMovil()
            .descripcionError,
        };
      }
      
    }

    this.uiService.openPopup(
      {
        content: info.descripcionDegradaciones,
        title: info.titulo1Degradaciones + ' ' + info.titulo2Degradaciones,
        buttonMessage: 'Entendido',
        isInvertedButton: false,
        mainButtonBehavior: ButtonBehavior.SimplyCloseAndResetProducts,
        imagen: null
      }
    );
    $('html, body').animate({ scrollTop: 0 }, 'slow');
  }

  async ngOnChanges(changes: SimpleChanges) {
    this.isNotEnabledFavoritoMetodo = false;
    this.favoritosMetodoErrorMensaje = '';
    //console.log(changes);
    if(changes.listaMetodosPago && changes.idRespuesta && changes.productoElegido){
      this.listaMetodosPago= changes.listaMetodosPago.currentValue;
      const idRespuesta = changes.idRespuesta.currentValue;
      const productoElegido = changes.productoElegido.currentValue;
      //if (idRespuesta == '12' && productoElegido) {
        //console.log(this.isDegradado);
        //console.log(this.listaMetodosPago);
        //console.log(typeof(this.isDegradado));
      if (this.isDegradado == "false" && productoElegido) {
        // solo se llama la primera vez que se necesita la data
        if (this.wcmService.mensajeDegradaciones === null) {
          await this.wcmService.loadDataIntoVariable(
            environment.wcmResources.mensajeDegradacionesURL,
            'mensajeDegradaciones'
          );
        }
  
        this.showDegradacionesPopup(productoElegido);
        console.groupEnd();
        return;
      }
  
      this.autenticado = this.sc.autenticado;
  
      // procesamiento popups de metodos de pagos
      this.shouldGoBackToCategoriesAfterClosingPopup = false;
      //console.log('procesamiento popups de metodos de pagos');
      this.listaMetodosPago.forEach((metodoPago) => {
        if (
          metodoPago.tipoMetodoPago ==
            Constantes.WPSMediosDePago.puntosClaro.codigo &&
          metodoPago.customErrorPopup &&
          metodoPago.customErrorPopup.showError
        ) {
          //console.log('popup error canje eventos validacion claroclub');
          this.uiService.openPopup({
            content: 'Para afiliarte envia un SMS con la letra R al número 2525',
            title: 'Lo sentimos, no te encuentras afiliado a Claro Club',
            buttonMessage: 'Entendido',
            isInvertedButton: false,
            mainButtonBehavior: metodoPago.customErrorPopup.showError ? ButtonBehavior.ResetCategories : ButtonBehavior.SimplyClose,
            imagen: null
          });
        }
        if (
          metodoPago.tipoMetodoPago ==
            Constantes.WPSMediosDePago.tarjetaCredito.codigo &&
          metodoPago.customErrorPopup &&
          metodoPago.customErrorPopup.showError
        ) {
          //console.log('paquete ilimitado error popup en TC');
          this.showUps(
            metodoPago.customErrorPopup.messageTitle,
            metodoPago.customErrorPopup.message,
            metodoPago.customErrorPopup.showError
          );
        }
      });
      console.groupEnd();
  
      // todos productos salvo pontis  van a metodos de pago
      //console.log('metodosPago component onChanges mostramos o no metodosPago');
      if (
        productoElegido.catvCodCategoria !=
        Constantes.WPSCategoriasDeCompra.pontis
      ) {
        // setTimeout(() => {
        // }, 1000);
        this.metodosPago = true;
        //console.log('Mostramos metodos de pago -> no pontis ');
      } else {
        // pontis va directo a confirmacion (se ocultan metodos de pago)
        // setTimeout(() => {
        // }, 1000);
        this.metodosPago = false;
        this.seleccionarMedio(this.listaMetodosPago[0]);
  
        //console.log('No mostramos metodos de pago -> pontis ');
      }
  
      this.configurarMensajeMetodoPagoFavoritoNoHabilitado();
  
      console.groupEnd();
    
    }
    
  }

  configurarMensajeMetodoPagoFavoritoNoHabilitado() {
    if (this.go.sessionStorageRetrieve(Constantes.flagFav) == 'S') {
      const metodoFavSeleccionadoFilter = this.listaMetodosPago.filter(
        (metodoPago) =>
          metodoPago.tipoMetodoPago == this.productoElegido.idMetodoPagoFav
      );
      if (metodoFavSeleccionadoFilter.length > 0) {
        const metodoPagoFavorito = metodoFavSeleccionadoFilter[0];
        if (metodoPagoFavorito.estado == '0') {
          this.isNotEnabledFavoritoMetodo = true;
          if (
            metodoPagoFavorito.tipoMetodoPago ==
            Constantes.WPSMediosDePago.saldoPrepago.codigo
          ) {
            this.favoritosMetodoErrorMensaje =
              'Tu saldo de recarga es insuficiente';
          } else if (
            metodoPagoFavorito.tipoMetodoPago ==
            Constantes.WPSMediosDePago.cargarEnRecibo.codigo
          ) {
            this.favoritosMetodoErrorMensaje =
              'Tu línea de crédito es insuficiente';
          } else if (
            metodoPagoFavorito.tipoMetodoPago ==
            Constantes.WPSMediosDePago.puntosClaro.codigo
          ) {
            this.favoritosMetodoErrorMensaje =
              'Tus Claro Puntos son insuficientes';
          }
        }
      }
    }
  }

  ngAfterViewInit() {
    this.seleccionarMetodoPagoDeProductoFavorito();
  }

  seleccionarMetodoPagoDeProductoFavorito() {
    if (this.go.sessionStorageRetrieve(Constantes.flagFav) == 'S') {
      const metodoFavSeleccionadoFilter = this.listaMetodosPago.filter(
        (metodoPago) =>
          metodoPago.tipoMetodoPago == this.productoElegido.idMetodoPagoFav
      );
      if (metodoFavSeleccionadoFilter.length > 0) {
        this.seleccionarMedio(metodoFavSeleccionadoFilter[0]);
        //console.log(
          //'Seleccion automatizada de favorito %O',
          //metodoFavSeleccionadoFilter[0]
        //);
      }
    }
  }

  showUps(title: any, message: any, shouldGoBackToCategoriesAfterClosingPopup) {
    if (
      shouldGoBackToCategoriesAfterClosingPopup != null &&
      shouldGoBackToCategoriesAfterClosingPopup
    ) {
      this.shouldGoBackToCategoriesAfterClosingPopup = true;
    } else {
      this.shouldGoBackToCategoriesAfterClosingPopup = false;
    }
    this.nombrePopUp = 'Error Mensaje';
    this.showPopup = true;
    this.infoPopUp = {
      mensaje_upps_titulo: title,
      customMessageError: message,
    };
  }

  visitProductConditions() {
    this.go.goToLink(
      this.omp.getMetodosPagoProductoInformacionLink(this.categoriaElegida)
    );
  }

  elegirMetodo(metodoPago) {
    const removeAccents = (str) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    } 
    var metodo_pago = removeAccents(metodoPago.nombre.toLowerCase());

    if(this.sc.isRecargas()){
      this._dataLayer.gtm_Event_term('recargas_metodo_pago_click',metodo_pago);
    }else{
      //this._dataLayer.gtm_Event_term('compras_metodo_pago_click',metodo_pago);
    }
      
    
    
    
    this.productoElegido.idMetodoPago = metodoPago.response.idMetodoPago;
    this.productoElegido.fechaVigencia = metodoPago.response.fechaVigencia;
    this.productoElegido.fechaCompra = metodoPago.response.fechaCompra;
    this.productoElegido.precioMoneda = metodoPago.response.precioMoneda;
    this.productoElegido.simboloMoneda = metodoPago.response.simboloMoneda;
    this.productoElegido.cantidad = metodoPago.response.cantidad;
    this.productoElegido.unidadCantidad = metodoPago.response.unidadCantidad;
    this.asignarValoresSeleccionados(metodoPago);
   
  }

  asignarValoresSeleccionados(metodoPago) {
    if (
      Number(this.categoriaElegida) ===
      Number(Constantes.WPSCategoriasDeCompra.roaming)
    ) {
      this.productoElegido.lblNombre = this.productoElegido.subtitulo;
      if (
        this.productoElegido.vigencia ==
        Constantes.WPSVigenciaRoaming.value.diario
      ) {
        const detalle = this.productoElegido.nombreProducto;
        const datalleFinal = detalle.split('diarios');
        this.productoElegido.lblDetalle = datalleFinal[0];
      } else if (
        this.productoElegido.vigencia ==
        Constantes.WPSVigenciaRoaming.value.mensual
      ) {
        const detalle = this.productoElegido.nombreProducto;
        const datalleFinal = detalle.split('por');
        this.productoElegido.lblDetalle = datalleFinal[0];
      }
    } else {
      this.productoElegido.lblNombre = this.productoElegido.nombreProducto;
    }
    this.confirmaData.prodSeleccionadoFechaSeleccionada = this.productoElegido.fechaCompra.substr(
      0,
      10
    );
    if (
      Constantes.WPSMediosDePago.puntosClaro.codigo ===
      this.medioSeleccionado.codigo
    ) {
      this.productoElegido.lblCosto =
        metodoPago.medioClaroPuntos.cantidad + ' puntos';
      this.productoElegido.codigo = this.medioSeleccionado.codigo;
    } else {
      this.productoElegido.codigo = this.medioSeleccionado.codigo;
    }
  }

  isDedicatoriaGiftcardValid() {
    if (
      this.productoElegido &&
      this.productoElegido.dedicatoria &&
      !this.methods.isValidEmail(
        this.productoElegido.dedicatoria.nombre_destinatario
      )
    ) {
      console.error(
        'Formulario giftcard invalido! %O',
        this.productoElegido.dedicatoria
      );
      document.getElementById('gift-card-info').scrollIntoView();
      document.getElementById('inputNomDes').focus();
      return false;
    } else {
      return true;
    }
  }

  seleccionarVisualmente(metodoPago: any) {
    if (this.metodoPagoElegidoIndex !== undefined) {
      document.getElementById(
        'metodoPagoItem-' + this.metodoPagoElegidoIndex
      ).style.border = 'solid 1px rgba(33, 33, 33, 0.03)';
    }
    this.metodoPagoElegidoIndex = metodoPago.tipoMetodoPago;    
    document.getElementById(
      'metodoPagoItem-' + this.metodoPagoElegidoIndex
    ).style.border = '1px solid';
  }

  seleccionarMedio(metodoPago: any) {

    this._dataLayer.gtm_checkout_shipping('begin_checkout', metodoPago, this.productoElegido); 
    if(!this.sc.isRecargas()){
    const removeAccents = (str) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    } 
    var metodo_pago = removeAccents(metodoPago.nombre.toLowerCase());

    this._dataLayer.gtm_Event_medio_pago('compras_metodo_pago_click',metodo_pago)
  }

    if (metodoPago.estado == '0') {
      return;
    }
    if (!this.isDedicatoriaGiftcardValid()) {
      return;
    }

    this.omp.medioSeleccionado = null;

    if (this.metodosPago) {
      this.seleccionarVisualmente(metodoPago);
    }

    this.confirmaData = {};
    this.confirmaData.mensajeTarjeta = false;
    this.confirmaData.mensajePrepago = false;
    this.confirmaData.mensajePuntos = false;
    this.confirmaData.costoClaroPuntos = false;
    this.confirmaData.showTerminos = this.methods.convertTipoMetodoPagoAIndicador(
      metodoPago.tipoMetodoPago
    );
    this.medioSeleccionado = metodoPago.response;

    if (metodoPago.tipoMetodoPago == 3) {
      this.confirmaData.metodoSeleccionado =
        Constantes.WPSMediodePagos.value.tarjeta;
      this.confirmaData.mensajeTarjeta = true;
      this.elegirMetodo(metodoPago);
      if (
        this.methods.isWhitelistSwitchOn(
          Constantes.MOTOR_PAGOS_WHITELIST_NODE_ORDER,
          Constantes.MOTOR_PAGOS_WHITELIST_NODE_NAME
        ) &&
        this.confirmaData.metodoSeleccionado == 'Tarjeta de Crédito / Débito'
      ) {
        this.confirmaData.showTerminos = 2;
        this.confirmaData.mostrarBotonConfirmacionMotorPagos = true;
        this.confirmaData.mostrarBotonConfirmacion = false;
        this.confirmaData.mostrarBotonRecibo = false;
        this.confirmaData.checkedTerminos = false;
      } else {
        this.confirmaData.mostrarBotonConfirmacionMotorPagos = false;
      }
      

      if (this.sc.isRecargas()) {
        const removeAccents = (str) => {
          return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        } 
        var metodo_pago = removeAccents(metodoPago.nombre.toLowerCase());
        console.log('this.productoElegido', this.productoElegido);
        
        this._dataLayer.gtm_checkout_shipping_rec('begin_checkout', metodoPago, this.productoElegido);
        //this._dataLayer.gtm_checkout_shipping('begin_checkout', metodoPago, this.productoElegido);
      }

      this.mandarConfirmacion.emit(true);
    } else if (metodoPago.tipoMetodoPago == 2) {
      this.elegirMetodo(metodoPago);
      this.confirmaData.metodoSeleccionado =
        Constantes.WPSMediodePagos.value.recibo;
      // ========== <INI : FBJ> ===================
      if (
        this.productoElegido.codTipoLinea == '6' ||
        this.productoElegido.codTipoLinea == '7'
      ) {
        // IFI-LTE
        this.confirmaData.mostrarBotonRecibo = true;
        this.confirmaData.mostrarBotonConfirmacion = false;
        this.mandarConfirmacion.emit(true);
      } else {
        // ========== <FIN : FBJ> ===================
        if (!this.autenticado) {
          this.confirmaData.mostrarBotonConfirmacion = false;
          this.confirmaData.mostrarAutenticacionToken = true;
          this.enviarSMSToken();
        } else {
          this.confirmaData.mostrarBotonRecibo = true;
          this.confirmaData.mostrarBotonConfirmacion = false;
          this.mandarConfirmacion.emit(true);
        }
      }
    } else if (metodoPago.tipoMetodoPago == 4) {
      this.elegirMetodo(metodoPago);
      this.confirmaData.metodoSeleccionado =
        Constantes.WPSMediodePagos.value.prepago;
      // ========== <INI : FBJ> ===================
      if (
        this.productoElegido.codTipoLinea == '6' ||
        this.productoElegido.codTipoLinea == '7'
      ) {
        // IFI-LTE
        this.confirmaData.mensajePrepago = true;
        this.mandarConfirmacion.emit(true);
      } else {
        // ========== <FIN : FBJ> ===================
        if (this.autenticado != true) {
          this.confirmaData.mostrarBotonConfirmacion = false;
          this.confirmaData.mostrarAutenticacionToken = true;
          this.enviarSMSToken();
        } else {
          this.confirmaData.mensajePrepago = true;
          this.mandarConfirmacion.emit(true);
        }
      }
    } else if (metodoPago.tipoMetodoPago == 1) {
      this.elegirMetodo(metodoPago);
      this.confirmaData.metodoSeleccionado =
        Constantes.WPSMediodePagos.value.puntos;
      this.confirmaData.costoClaroPuntos = true;
      // ========== <INI : FBJ> ===================
      if (
        this.productoElegido.codTipoLinea == '6' ||
        this.productoElegido.codTipoLinea == '7'
      ) {
        // IFI-LTE
        this.confirmaData.mensajePuntos = true;
        this.mandarConfirmacion.emit(true);
      } else {
        // ========== <FIN : FBJ> ===================
        if (this.autenticado != true) {
          this.confirmaData.mostrarBotonConfirmacion = false;
          this.confirmaData.mostrarAutenticacionToken = true;
          this.enviarSMSToken();
        } else {
          this.confirmaData.mensajePuntos = true;
          this.mandarConfirmacion.emit(true);
        }
      }
    }
    this.medioSeleccionado.confirmaData = this.confirmaData;
    this.medioSeleccionado.originalMetodoPago = metodoPago;
    this.medioSeleccionado.tipoMetodoPago = metodoPago.tipoMetodoPago;
    this.omp.medioSeleccionado = this.medioSeleccionado;
    this.metodoSeleccionado.emit(this.medioSeleccionado);
  }

  enviarSMSToken() {
    const request = this.methods.requestTokenSMS(1, this.sc.msisdn);

    this.enviarToken
      .enviarTokenxSMS(request)
      .toPromise()
      .then((res: any) => {
        const rtpaBody =
          res.comunResponseType.MessageResponse.Body.defaultServiceResponse
            .idRespuesta;
        const idRespuestaDP =
          res.comunResponseType.MessageResponse.Header.HeaderResponse.status
            .type;
        if (parseInt(idRespuestaDP, 10) == 0 && rtpaBody == 0) {
          this.mandarConfirmacion.emit(true);
        } else {
          this.showUps(
            '¡Uppsss!!',
            'Ocurrió un error. Por favor inténtalo de nuevo',
            false
          );
        }
      })
      .catch((err) => {
        //console.log('error enviarTokenxSMS ', err);
        this.showUps(
          '¡Uppsss!!',
          'Ocurrió un error. Por favor inténtalo de nuevo',
          false
        );
      });
  }

  getIconoTipoPago(metodoPago) {
    const tipoMetodoPago = metodoPago.tipoMetodoPago;
    const estado = metodoPago.estado;
    let status = '';
    if (Number(estado) === 0) {
      status = '-apagado';
    }
    if (Number(tipoMetodoPago) === 3) {
      return Constantes.Icons[`tarjeta${status}`];
    } else if (Number(tipoMetodoPago) === 2) {
      return Constantes.Icons[`cargo-a-recibo${status}`];
    } else if (Number(tipoMetodoPago) === 4) {
      return Constantes.Icons[`saldos-de-recarga${status}`];
    } else if (Number(tipoMetodoPago) === 1) {
      return Constantes.Icons[`claro-puntos${status}`];
    }
  }

  cerrarPopUp(est: any) {
    this.showPopup = est;
    if (this.shouldGoBackToCategoriesAfterClosingPopup) {
      this.shouldGoBackToCategoriesAfterClosingPopup = false;
      this.popupService.changeMessage('go_back');
    }
  }

  checkPaymentMethod(tipoLinea: any) {
    return tipoLinea ? "col-12 col-sm-4 top-16" : "col-12 col-sm-6 top-16";
  }

}
