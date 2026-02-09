import { GlobalObjectService } from 'src/app/services/global-object.service';
import { ProductosFavoritosService } from './../../services/productos-favoritos.service';
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  AfterViewInit,
  ChangeDetectorRef,
  Renderer2,
  ElementRef
} from '@angular/core';
import { MethodsService } from '../../services/methods.service';
import {
  FormGroup
} from '@angular/forms';
import {
  MatDialog
} from '@angular/material/dialog';
import { LoginService } from '../../services/loginService';
import { ServicioCompartidoService } from 'src/app/core/services/servicio-compartido.service';
import { Constantes } from '../../services/constants';
import { ProductoRecarga } from '../../shared/components/producto-recarga';
import { ProductosRecomendadosService } from '../../services/productos-recomendados.service';
import { RecomendadoRequest } from '../../shared/components/recomendadosRequest';
import { WcmService } from '../../services/wcm.service';
import { ObtenerCategoriaService } from 'src/app/services/obtener-categoria.service';
import { ObtenerMetodosPagoService } from 'src/app/services/obtener-metodos-pago.service';
import { PopupService } from 'src/app/services/popup.service';
import { QueryStringService } from 'src/app/services/query-string.service';
import {
  ObtenerCategoriaSubcategoriaProductoService
} from 'src/app/services/obtener-categoria-subcategoria-producto.service';
import { environment } from './../../../environments/environment';
import { ValidarDegradacionService } from 'src/app/services/validar-degradacion.service';
import { ObtenerSaldoGEService } from 'src/app/services/obtener-saldo-ge.service';
import { ButtonBehavior } from 'src/app/components/dialog/dialog.component';
import { DataLayerService } from '../../services/data-layer.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnChanges, AfterViewInit {
  [x: string]: any;

  messageForm: FormGroup;
  numberForm: FormGroup;

  codemessage: any;
  tipoLinea: string;
  k: string;

  captchaImage: any;
  prListaProductosRecargas: ProductoRecarga[]; // Lista de Productos de Recargas
  recargas: any; // Variable anterior
  infoPopUp: any;
  nombrePopUp: any;
  subEscogida: any = null;
  catEscogida: any;
  tipoSeccionIdMetodo: any;

  listaRecomendados = [];
  listaFavoritos = [];
  listaCategorias = [];
  confirmationbox = false;
  mostrarContenido = false;
  mostrarBannerDescarga = false;
  mostrarConfirma = false;
  mostrarLoadingFav = false;
  popBloqueada = false;
  popUpLinea = false;
  activarRecargas = false;
  isLoading = false;
  esRecargas = false;
  flujoCarousel = '';
  tipoComponenteLogin = 'loginAuto';
  numeroTele = '';
  prPortalRecargas = ''; // (true= canal 8 y rec=1,  false= canal 8 y rec 0)
  private prRecargaAnonima = false; // (true= numeroRecarga vacio, false= numeroRecarga valido )
  private prNumeroRecarga = ''; // Numero para portal de Recargas
  primerPago = '';
  // canalesBemobi = ['2', '3', '4', '5', '6', '7', '9'];


  cargandoFavoritosFlag = false;
  cargandoRecomendadoFlag = false;
  cargandoCategoriaFlag = false;

  mostrarMetodosPagoRecFav = false;

  seleccionData = {
    productoSeleccionado: null,
    categoriaSeleccionada: null,
    metodoSeleccionada: null,
    giftCardPersonalizationData: {
      de: '',
      para: '',
      mensaje: '',
      conCopia: false,
    },
  };

  // parametros para comunicarse con metodos pago component
  // enabled = [true, true, true, true];
  creditoSaldo;

  listaMetodosPago;
  tipoMetodoPagoStar;
  obtenerMetodosPagoIdRespuesta: any;
  productoElegido: any = null;
  // parametros para comunicarse con metodos pago component
  // Mensajes de bloqueos
  configBloqueos: any;
  confBloqueosMensajes1WCM: any;
  confBloqueosCodigos1WCM: any;

  @Input() show;

  embedded = false;
  codSuspendido: string;
  isActive = true; // para las funciones
  mostrarPopUpSuspendido = false; // para mostrar el pop up
  confSuspendidosMensajes1WCM: any;
  listaCodigosSuspendidos;

  servicioCompartidoCarrousel: any;

  productoParametro = null;
  categoria_padre = null;
  categoria_hija = null;
  isDeepLink = false; // para determinar si el flag favorito es D
  sinCategorias = true;
  flagFijaSinPaquetes = false;
  flagErrorService = false;
  cambiaNumero = false;
  metodopago = null;
  confirmaData: any = {};
  metodoPagoCompraExpress: any = {};
  Express = false;
  isExpress = false;
  isRecarga = false;
  isDegradado: string;
  identificadorUsuarioToBeRequestType;

  reqValidarDegradacion = {
    tipoLinea: '',
    codTipoLinea: '',
    idProductoServicio: '',
    admin: '',
    tmcode: '',
    flagPivot: '',
    idCategoria: ''
  };

  reqObtenerSaldo = {
    tipoLinea: '',
    numLinea: '',
  };

  constructor(
    private methods: MethodsService,
    public dialog: MatDialog,
    public servicioCompartido: ServicioCompartidoService,
    private loginService: LoginService,
    private productosRecomendadosService: ProductosRecomendadosService,
    private productosFavoritosService: ProductosFavoritosService,
    private validarDegradacionService: ValidarDegradacionService,
    private obtenerSaldoGEService: ObtenerSaldoGEService,
    private wcmService: WcmService,
    private go: GlobalObjectService,
    private obtenerCategoriaService: ObtenerCategoriaService,
    private omp: ObtenerMetodosPagoService,
    private popupService: PopupService,
    private ms: MethodsService,
    private ref: ChangeDetectorRef,
    private qss: QueryStringService,
    private obtenerCategoriasXproductoService: ObtenerCategoriaSubcategoriaProductoService,
    private readonly elementRef: ElementRef,
    private renderer: Renderer2,
    private _dataLayer: DataLayerService
  ) {
    this.configBloqueos = this.go.getObject('configBloqueos');
    this.servicioCompartidoCarrousel = this.servicioCompartido;
  }

  loadScript(url) {
    if (url != '') {
      const script = this.renderer.createElement('script');
      script.src = url;
      script.async = true;
      this.renderer.appendChild(this.elementRef.nativeElement, script);
    } else {
      // console.log('script url to load is empty');
    }
  }

  loadScriptJson(url) {
    if (url != '') {
      const script = document.createElement('script');
      script.src = url;
      // script.type= 'text/javascript';
      // script.async = true;
      document.getElementsByTagName('head')[0].appendChild(script);
    } else {
      // console.log('script url to load is empty');
    }
  }

  ngOnInit() {
    this.metodopago = this.qss.getQueryString('mp');
    // console.log(this.metodopago);
    // console.log('metodo pagooo queryyy');

    if (this.metodopago == null || this.metodopago == 'null') {

      this.metodopago = 0;
    }
    this.productoParametro = this.qss.getQueryString('idxp');
    if (this.productoParametro == null) {
      this.productoParametro = 0;

    }
    if (this.metodopago != 0 && this.productoParametro != 0) {
      this.Express = true;
    }
    this.loadScript(environment.motorPagosUrl);

    this.tipoComponenteLogin = this.servicioCompartido.autenticado
      ? 'loginAuto'
      : window.sessionStorage.getItem('tipoLogin') == 'loginAuto'
        ? 'loginAuto'
        : 'loginNoAuto';
    this.confBloqueosMensajes1WCM = this.configBloqueos[1].Mensajes[0];
    this.confBloqueosCodigos1WCM = this.configBloqueos[0].Codigos[0].M1;
    this.confSuspendidosMensajes1WCM = this.configBloqueos[1].Mensajes[3];
    this.listaCodigosSuspendidos = this.configBloqueos[0].Codigos[3].M4;
    this.embedded = this.ms.isPortalEmbedded();

    this.popupService.currentMessage.subscribe((message) => {
      if (message === Constantes.popupCustomExceptions.go_back_to_categories) {
        this.flujoCarousel = '';
        console.groupEnd();
      }
    });

    this.mostrarBannerDescarga =
      window.innerWidth < 500
        ? true
        : false;
    document.getElementById('nav-bar-claro').style.display =
      window.innerWidth < 500 ? 'none' : 'block';
    document.getElementById('nav-bar-claro').style.top =
      window.innerWidth < 500 ? '100px' : '0px';
    this.numeroTele = this.servicioCompartido.msisdn;

    sessionStorage.removeItem('favMedioPagos');

    const bannerTip = localStorage.getItem('ban');
    if (bannerTip != undefined && bannerTip != null) {
      if (Number(bannerTip) === 1) {
        this.habilitarBanner(false);
      }
    }

    this.go.deshabilitarRetrocederNavegador();
    if (this.servicioCompartido.autenticado) {
      this.identificarTipoUsuario();
    } else {
      // console.log("es app de recargas")
      this.verificaPortalRecargas();

    }
    this.deepLink();


  }

  deepLink() {
    this.productoParametro = this.qss.getQueryString('idxp');
    // console.log("deep link")
    if (this.productoParametro != 0) {
      this.obtenerCategoriasXproductoService.obtenerCategoriaYsubCategoriaXproducto(() => {
        // console.log(this.obtenerCategoriasXproductoService.obtenerCategoriasXproductoResponse)
        const idRespuesta = this.obtenerCategoriasXproductoService.obtenerCategoriasXproductoResponse.idRespuesta;
        if (this.obtenerCategoriasXproductoService.obtenerCategoriasXproductoResponse.errorService) {
          this.flagErrorService = true;
        } else {
          if (Number(idRespuesta) === 0) {
            this.categoria_padre = this.obtenerCategoriasXproductoService.obtenerCategoriasXproductoResponse.categoria_padre;
            this.categoria_hija = this.obtenerCategoriasXproductoService.obtenerCategoriasXproductoResponse.categoria_hija;
            // quitando deeplink para claro video - cambio temporal
            if (this.categoria_hija == '13') {
              // console.log("bloquenado seleccion de claro video ")
              this.productoParametro = null;
            }
            this.isDeepLink = true;
            if (this.metodopago == '0' || this.metodopago == '') {
              this._dataLayer.gtm_Event_compra_2('compras_redirect_deeplink', 'deeplink');
            }
          } else {
            this.productoParametro = null;
          }
        }
      }, this.productoParametro);
    }
  }


  // INICIO COMPRA EXPRESS


  actualizarProdSeleccionado(metodoPago) {
    this.productoElegido.idMetodoPago = metodoPago.response.idMetodoPago;
    this.productoElegido.fechaVigencia = metodoPago.response.fechaVigencia;
    this.productoElegido.fechaCompra = metodoPago.response.fechaCompra;
    this.productoElegido.precioMoneda = metodoPago.response.precioMoneda;
    this.productoElegido.simboloMoneda = metodoPago.response.simboloMoneda;
    this.productoElegido.cantidad = metodoPago.response.cantidad;
    this.productoElegido.unidadCantidad = metodoPago.response.unidadCantidad;
    if (metodoPago.response.idMetodoPago == '1') {
      this.productoElegido.lblCosto = metodoPago.response.cantidad + ' puntos';
    } else {
      this.productoElegido.lblCosto = metodoPago.response.cantidad;
    }

  }


  seleccionarMetodoPagoCompraExpress(IdMPago: string) {
    // console.log('Filtra Metodo Pago Recibido URL: '+IdMPago);
    const metodoSeleccionadoFilter = this.listaMetodosPago.filter(
      (element) =>
        element.tipoMetodoPago == IdMPago
        && element.estado == '1'
    );
    if (metodoSeleccionadoFilter.length > 0) {
      // console.log('Seleccion automatizada de: ', metodoSeleccionadoFilter[0]);
      return metodoSeleccionadoFilter[0];
    }
    window.location.href = Constantes.urlPortal.portalInternetClaro;
  }


  selectionCompraExpress(selection: any) {
    this._dataLayer.gtm_Event_compra_2('compras_redirect_express', 'express');
    this.mostrarMetodosPagoRecFav = true;
    // this.flujoCarousel = 'favoritos';
    this.primerPago = this.metodopago;
    this.popupService.changeCloseTiendaVirtualMessage('close_banner_tienda');
    if (selection) {
      this.productoElegido = selection;
      this.seleccionData.productoSeleccionado = selection;
      this.seleccionData.productoSeleccionado.isProductPrestame = false;
      this.ref.detectChanges();
      this.omp.obtenerMetodosDePago(selection, this.creditoSaldo.lblSaldoPrepago).subscribe((response) => {
        this.tipoSeccionIdMetodo = {
          idMetodo: this.primerPago,
          tipoSec: this.flujoCarousel,
        };
        // console.log('Response Metodos-de-Pagos'+this.metodopago+' para compra expressss :');

        // console.log(response);
        this.listaMetodosPago = response.listMetodoPago;
        this.tipoMetodoPagoStar = response.tipoMetodoPagoStar;
        this.obtenerMetodosPagoIdRespuesta = response.idRespuesta;
        this.mostrarMetodosPagoRecFav = false;
        this.ref.detectChanges();
        this.metodoPagoCompraExpress = {};
        const metodoTemporal = this.seleccionarMetodoPagoCompraExpress(this.metodopago);
        const metodoOriginal = this.seleccionarMetodoPagoCompraExpress(this.metodopago);

        // console.log(metodoOriginal);

        // console.log(metodoTemporal);
        // const abc = this.seleccionarMetodoPagoCompraExpress(this.metodopago);
        this.confirmaData = {};
        this.confirmaData.showTerminos = this.methods.convertTipoMetodoPagoAIndicador(this.metodopago);
        this.confirmaData.mensajeTarjeta = false;
        this.confirmaData.mensajePrepago = false;
        this.confirmaData.mensajePuntos = false;
        this.confirmaData.costoClaroPuntos = false;
        // console.log("Servicio compartido");
        // console.log(this.servicioCompartido);
        if (this.metodopago == 3) {
          this.confirmaData.metodoSeleccionado = Constantes.WPSMediodePagos.value.tarjeta;
          this.confirmaData.mensajeTarjeta = true;
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
        } else if (this.metodopago == 2) {
          this.confirmaData.metodoSeleccionado = Constantes.WPSMediodePagos.value.recibo;
          if (
            this.productoElegido.codTipoLinea == '6' ||
            this.productoElegido.codTipoLinea == '7'
          ) {
            // IFI-LTE
            this.confirmaData.mostrarBotonRecibo = true;
            this.confirmaData.mostrarBotonConfirmacion = false;
          } else {
            if (!this.servicioCompartido.autenticado) {
              this.confirmaData.mostrarBotonConfirmacion = false;
              this.confirmaData.mostrarAutenticacionToken = true;
              this.enviarSMSToken();
            } else {
              this.confirmaData.mostrarBotonRecibo = true;
              this.confirmaData.mostrarBotonConfirmacion = false;
            }
          }
        } else if (this.metodopago == 4) {
          this.confirmaData.metodoSeleccionado = Constantes.WPSMediodePagos.value.prepago;
          if (
            this.productoElegido.codTipoLinea == '6' ||
            this.productoElegido.codTipoLinea == '7'
          ) {
            // IFI-LTE
            this.confirmaData.mensajePrepago = true;
            this.mandarConfirmacion.emit(true);
          } else {
            if (!this.servicioCompartido.autenticado) {
              this.confirmaData.mostrarBotonConfirmacion = false;
              this.confirmaData.mostrarAutenticacionToken = true;
              this.enviarSMSToken();
            } else {
              this.confirmaData.mensajePrepago = true;
            }
          }
        } else if (this.metodopago == 1) {
          this.confirmaData.metodoSeleccionado = Constantes.WPSMediodePagos.value.puntos;
          this.confirmaData.costoClaroPuntos = true;
          if (
            this.productoElegido.codTipoLinea == '6' ||
            this.productoElegido.codTipoLinea == '7'
          ) {
            // IFI-LTE
            this.confirmaData.mensajePuntos = true;
          } else {
            if (!this.servicioCompartido.autenticado) {
              this.confirmaData.mostrarBotonConfirmacion = false;
              this.confirmaData.mostrarAutenticacionToken = true;
              this.enviarSMSToken();

            } else {
              this.confirmaData.mensajePuntos = true;
            }
          }
        }


        this.metodoPagoCompraExpress = metodoTemporal.response;
        this.metodoPagoCompraExpress.confimaData = this.confirmaData;
        this.metodoPagoCompraExpress.originalMetodoPago = metodoOriginal;
        this.seleccionData.metodoSeleccionada.originalMetodoPago.totalClaroPuntos;
        // console.log('Metodo Filtrado -> '+this.metodopago+' para compra exopressss ');
        // console.log(this.metodoPagoCompraExpress);

        this.selectionMetodoPago(this.metodoPagoCompraExpress);
        // this.seleccionData.metodoSeleccionada = this.metodoPagoCompraExpress;
        this.seleccionData.metodoSeleccionada.tipoMetodoPago = this.metodopago;
        this.actualizarProdSeleccionado(metodoTemporal);
        this.Express = false;

        this.servicioCompartidoExito(
          this.seleccionData.productoSeleccionado,
          this.seleccionData.categoriaSeleccionada,
          this.seleccionData.metodoSeleccionada,
          true, '');

        // console.log('servicioCompartidoExit: ', this.servicioCompartidoExito);
      });
      this.seleccionData.productoSeleccionado.precioMoneda = selection.precio;
      this.seleccionData.productoSeleccionado.tituloConfirma = selection.tituloConfirma;
      this.seleccionData.productoSeleccionado.lblNombre = selection.nombreProducto;
      this.seleccionData.productoSeleccionado.simboloMoneda = selection.moneda1;
      this.seleccionData.productoSeleccionado.codigo = this.metodopago;

      // console.log('-------------------------------------------------------------'+this.metodopago);
      this.seleccionData.categoriaSeleccionada = {
        titulo: selection.catvTitulo,
        idCategoriaDeCompra: selection.catnId,
        codCategoria: selection.catvCodCategoria,
      };
      // console.log('====================================================');
      // console.log(this.seleccionData.categoriaSeleccionada);

      this.seleccionData.metodoSeleccionada = {
        simboloMoneda: selection.moneda1,
        tipoMetodoPago: this.metodopago,
        cantidad: 0,
        totalClaroPuntos: 0,
        fechaCompra: '',
        nombre: '',
        originalMetodoPago: { totalClaroPuntos: 0 },
      };


      this.omp.medioSeleccionado = this.seleccionData.metodoSeleccionada;
      if (!this.servicioCompartido.autenticado) {
        this.enviarSMSToken();
      }

      this.habilitarConfirmacion(true);
      // this.habilitarFlujoCarousel('favoritos');
    }
  }

  // FIN COMPRA EXPRESS


  cerrarTodosPopup(e) {
    this.cerrarPopUpCallToAction(e);
    // this.cerrarPopUp(e)
  }

  // cargarScriptExternoBemobi() {
  //   const body = document.body as HTMLDivElement;
  //   const script = document.createElement('script');
  //   script.innerHTML = '';
  //   script.src = '//servicios.pe.claro-bemobi.com/static-assets/portal/segments/vas/vas.section.js';
  //   script.async = true;
  //   script.defer = true;
  //   script.id = 'bemobiscript';
  //   script.setAttribute('carrier', 'claro-pe');
  //   script.setAttribute('pagename', 'nocredit');
  //   script.setAttribute('userid', '51' + this.servicioCompartido.msisdn);
  //   script.setAttribute('auth', 'true');
  //   body.appendChild(script);
  // }

  ngOnChanges() {
    document.getElementById('nav-bar-claro').style.display =
      window.innerWidth < 500 ? 'none' : 'block';
  }


  ngAfterViewInit() {
  }

  habilitarContenido(arg: any) {
    this.popBloqueada = false;
    if (arg) {
      this.listaCategorias = [];
      this.listaFavoritos = [];
      this.listaRecomendados = [];
      this.esRecargas = false;
      this.verificaPortalRecargas();
    }
  }

  habilitarFlujoCarousel(arg: string) {
    console.log('Funcion: habilitarFlujoCarousel');
    console.log(arg);
    setTimeout(() => {
      this.flujoCarousel = arg;
    });


  }

  habilitarReset(arg: boolean) {
    if (arg) {
      this.flagFijaSinPaquetes = false;
      this.listaCategorias = [];
      this.listaFavoritos = [];
      this.listaRecomendados = [];

      if (this.ms.isFlowPortalRecargas()) {
        this.esRecargas = true;
        this.activarRecargas = false;
      } else {
        this.esRecargas = false;
        this.activarRecargas = false;
      }
    }
  }

  verificaPortalRecargas() {

    // console.log(this.servicioCompartido);


    this.prPortalRecargas = '';
    this.prNumeroRecarga = '';
    this.prRecargaAnonima = false;
    this.mostrarMetodosPagoRecFav = false;

    // console.log("Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    // console.log(this.ms.isFlowPortalRecargas());
    if (this.ms.isFlowPortalRecargas()) {
      if (
        this.servicioCompartido.msisdn == null ||
        this.servicioCompartido.msisdn == '' ||
        this.servicioCompartido.msisdn == undefined
      ) {
        this.listaCategorias = [];
        this.esRecargas = true;
        this.activarRecargas = false;
      } else {
        this.servicioCompartido.isRechargeAnonymous = false;
        if (
          this.verificaCodigoBloqueoPopup(this.servicioCompartido.codigoBloqueo)
        ) {
          // console.log(
          // 'linea Bloqueado por codigoBloqueo =>',
          // this.servicioCompartido.codigoBloqueo
          // );
          this.activaPopupBloqueo();
        } else {
          // console.log("ESSS RECARGAS")
          this.obtenerCreditoSaldo();
          this.obtenerCategorias();

        }
      }
    } else {
      // console.log('Deshabilitamos numero captcha box');
      if (
        this.ms.isValueContainedInArray(
          this.servicioCompartido.canal,
          Constantes.CanalesIntegradosMCW
        )
      ) {
        this.confirmationbox = true;
      } else {
        this.confirmationbox = false;
      }

      if (this.isCanalMiClaroWebOrCorpo()) {
        this.confirmationbox = false;
      }

      if (
        this.verificaCodigoBloqueoPopup(this.servicioCompartido.codigoBloqueo)
      ) {
        // console.log(
        // 'linea Bloqueado por codigoBloqueo =>',
        // this.servicioCompartido.codigoBloqueo
        // );
        this.activaPopupBloqueo();
      } else {
        this.cargarRecomendadosYObtenerSaldo();
      }
    }
  }


  cargarRecomendadosYObtenerSaldo() {
    if (this.ms.isFlowPortalRecargasWithRecDisabled()) {
      // console.log('Deshabilitamos portal recargas para oferta normal si rec=0');
    } else {
      this.obtenerRecomendados();
      // this.obtenerCreditoSaldoProducto();
      this.obtenerCreditoSaldo();
    }
  }

  esBloqueante() {
    this.wcmService.configBloqueos[0].Codigos[0].M1.forEach((element) => {
      if (element.codigo === this.servicioCompartido.codigoBloqueo) {
        return true;
      }
    });

    return false;
  }

  validarDegradacion(arg: any) {
    this.reqValidarDegradacion.tipoLinea = this.servicioCompartido.tipoLinea;
    this.reqValidarDegradacion.codTipoLinea = this.productoElegido.codTipoLinea;
    this.reqValidarDegradacion.idProductoServicio = this.servicioCompartido.idProductoServicio;
    this.reqValidarDegradacion.admin = this.servicioCompartido.isAdmin;
    this.reqValidarDegradacion.tmcode = this.servicioCompartido.codigoPlanTarifario;
    if (this.servicioCompartido.isONE) {
      this.reqValidarDegradacion.flagPivot = '1';
    } else {
      this.reqValidarDegradacion.flagPivot = '0';
    }
    this.reqValidarDegradacion.idCategoria = this.productoElegido.catnId;
    this.validarDegradacionService.validarDegradacionServ(() => {

      const idRespuesta = this.validarDegradacionService.validarDegradacionResponse.idRespuesta;
      if (idRespuesta === '0') {
        this.isDegradado = this.validarDegradacionService.validarDegradacionResponse.degradado;
        this.identificadorUsuarioToBeRequestType = this.validarDegradacionService.validarDegradacionResponse.IdentificadorUsuarioToBeRequestType;
        if (this.isDegradado === 'true') {
          console.log('es TRUEEEEEE');
          this.omp.obtenerMetodosDePago(arg, this.creditoSaldo.lblSaldoPrepago, this.identificadorUsuarioToBeRequestType).subscribe((response) => {
            this.tipoSeccionIdMetodo = {
              idMetodo: this.primerPago,
              tipoSec: this.flujoCarousel,
            };
            this.listaMetodosPago = response.listMetodoPago;
            this.obtenerMetodosPagoIdRespuesta = response.idRespuesta;
            this.mostrarMetodosPagoRecFav = true;
            this.ref.detectChanges();

            if (this.flujoCarousel != 'favoritos') {
              setTimeout(() => {
                this.methods.scroll(document.getElementById('metodosDiv'));
                this.ref.detectChanges();
              }, 250);
            }
          });
        }

      } else {
        const data = {
          content: Constantes.WPSMensajeError.value.DEGRADACION_MENSAJE,
          mainButtonBehavior: ButtonBehavior.SimplyCloseAndResetProducts,
          title: Constantes.WPSMensajeError.value.DEGRADACION_TITULO,
          buttonMessage: 'Entendido',
          isInvertedButton: null,
          imagen: null,
        };
        this.uiService.openPopup(data);
      }


    }, this.reqValidarDegradacion);


  }

  asignardegradacion(arg: any) {
    this.isDegradado = arg;
  }

  /* GestionExternos*/
  obtenerCreditoSaldo() {
    console.log(this.servicioCompartido);
    this.reqObtenerSaldo.numLinea = this.numeroTele;
    this.reqObtenerSaldo.tipoLinea = this.servicioCompartido.tipoLinea;
    this.obtenerSaldoGEService.obtenerCreditoSaldoProducto(() => {
      if (this.obtenerSaldoGEService.obtenerCreditoSaldoResponse.errorService) {
        this.flagErrorService = true;
      } else {
        this.creditoSaldo = this.obtenerSaldoGEService.obtenerCreditoSaldoResponse.creditoSaldo;
      }
    }, this.reqObtenerSaldo);
  }

  quitarLoading(arg: any) {
    this.mostrarLoadingFav = arg;
  }

  selectionFavHandler(event: any) {
    console.log('event', event);

    this.mostrarLoadingFav = true;
    const categoriaSeleccionada = {
      titulo: event.catvTitulo,
      idCategoriaDeCompra: event.catnId,
      codCategoria: event.catvCodCategoria,
    };

    // Cambiar al campo nuevo que se mande
    if (event.codMetodoPagoFav) {
      this.primerPago = event.codMetodoPagoFav;
    }
    if (this.esRecargas) {
      this.primerPago = '3';
    }

    this.selectionCategoria(categoriaSeleccionada);

    this.selectionEventHandler(event);
  }

  selectionRecHandler(event: any) {
    const categoriaSeleccionada = {
      titulo: event.catvTitulo,
      idCategoriaDeCompra: event.catnId,
      codCategoria: event.catvCodCategoria,
    };

    this.selectionCategoria(categoriaSeleccionada);
    this.selectionEventHandler(event);
  }

  selectionEventHandler(selection: any) {

    console.log('selection', selection);
    if (selection && this.esRecargas && selection.confirmaRecarga) {
      this.primerPago = '';
    }
    this.mostrarMetodosPagoRecFav = false;
    this.popupService.changeCloseTiendaVirtualMessage('close_banner_tienda');
    // console.log("homeeeeeeeee")
    if (selection) {
      this.productoElegido = selection;
      this.seleccionData.productoSeleccionado = selection;
      this.seleccionData.productoSeleccionado.isProductPrestame = false;

      if (this.methods.isProductPrestame(selection)) {
        // console.log(' IS PRODUCT PRESTAME.');
        this.seleccionData = {
          productoSeleccionado: null,
          categoriaSeleccionada: null,
          metodoSeleccionada: null,
          giftCardPersonalizationData: {
            de: '',
            para: '',
            mensaje: '',
            conCopia: false,
          },
        };
        this.seleccionData.productoSeleccionado = selection;
        this.seleccionData.productoSeleccionado.isProductPrestame = true;
        this.seleccionData.productoSeleccionado.precioMoneda = selection.precio;
        this.seleccionData.productoSeleccionado.tituloConfirma =
          selection.tituloConfirma;

        this.seleccionData.productoSeleccionado.lblNombre =
          selection.nombreProducto;
        this.seleccionData.productoSeleccionado.simboloMoneda =
          selection.moneda1;
        // Flujo prestame megas, no llamamos metodospago sino que vamos directo a la confirmacion
        this.seleccionData.metodoSeleccionada = {
          simboloMoneda: selection.moneda1,
          tipoMetodoPago: 4,
          cantidad: 0,
          totalClaroPuntos: 0,
          fechaCompra: '',
          nombre: '',
        };

        this.seleccionData.categoriaSeleccionada = {
          titulo: selection.catvTitulo,
          idCategoriaDeCompra: selection.catnId,
          codCategoria: selection.catvCodCategoria,
        };
        // console.log('==============FLUJO RECOMENDADOS====================');
        // console.log(this.seleccionData);
        // console.log('====================================================');

        this.omp.medioSeleccionado = this.seleccionData.metodoSeleccionada;

        if (!this.servicioCompartido.autenticado) {
          this.enviarSMSToken();
        }
        this.habilitarConfirmacion(true);
      } else {
        if (
          this.flujoCarousel === 'favoritos' ||
          this.flujoCarousel === 'recomendados' ||
          this.flujoCarousel === 'recargas'
        ) {
          // console.log("homeeeeeeeee MP")
          this.ref.detectChanges();

          if (this.servicioCompartido.tipoLinea === '2') {
            // console.log("Aaquiii")
            this.validarDegradacion(selection);

          } else {

            this.omp.obtenerMetodosDePago(selection, this.creditoSaldo.lblSaldoPrepago, this.identificadorUsuarioToBeRequestType).subscribe((response) => {
              this.tipoSeccionIdMetodo = {
                idMetodo: this.primerPago,
                tipoSec: this.flujoCarousel,
              };
              this.listaMetodosPago = response.listMetodoPago;
              this.tipoMetodoPagoStar = response.tipoMetodoPagoStar;
              this.obtenerMetodosPagoIdRespuesta = response.idRespuesta;
              this.mostrarMetodosPagoRecFav = true;
              this.ref.detectChanges();
              console.log('this.flujoCarousel', this.flujoCarousel);
              console.log(this.flujoCarousel !== 'favoritos');
              if (this.flujoCarousel !== 'favoritos') {
                setTimeout(() => {
                  this.methods.scroll(document.getElementById('metodosDiv'));
                  this.ref.detectChanges();
                }, 250);
              }
            });
          }
        }
      }
    }
    if (this.metodopago != 0) {
      console.log('-------------INICIO COMPRA EXPRESS----------------');

      this.selectionCompraExpress(this.productoElegido);
      this.isExpress = true;
      this.isDeepLink = false;
    }
  }

  enviarSMSToken() {
    this.methods.enviarSMSToken(() => {
    });
  }

  selectionCategoria(selectCat: any) {
    this.catEscogida = selectCat;
    this.seleccionData.categoriaSeleccionada = selectCat;
  }

  selectionMetodo(selectMet: any) {
    this.seleccionData.metodoSeleccionada = selectMet;
  }

  selectionMetodoPago(metodo: any) {
    this.seleccionData.metodoSeleccionada = metodo;
  }

  selectionSub(selSub: any) {
    this.subEscogida = selSub;
    if (selSub != null) {
      this.seleccionData.categoriaSeleccionada.idCategoriaDeCompra = this.subEscogida.idCategoriaDeCompra;
    }
  }

  identificarTipoUsuario() {
    if (
      this.ms.isValueContainedInArray(
        this.servicioCompartido.canal,
        Constantes.CanalesIntegradosMCW
      )
    ) {
      this.confirmationbox = true;
    } else {
      this.confirmationbox = false;
    }

    if (this.isCanalMiClaroWebOrCorpo()) {
      this.confirmationbox = false;
    }

    if (
      this.ms.isFlowPortalRecargas() &&
      (this.servicioCompartido.msisdn == null ||
        this.servicioCompartido.msisdn == '')
    ) {
      this.listaCategorias = [];
      this.esRecargas = true;
      this.activarRecargas = false;
      console.log('recargas false');
    } else {
      const requestTipoClienteNoAutenticado = {
        msisdn: this.servicioCompartido.msisdn,
        codigocaptcha: '',
        fuenteIngreso: this.servicioCompartido.fuenteIngreso,
        autenticado: this.servicioCompartido.autenticado,
        isPontisEnabled: null,
      };
      // Inicializa Valores precargados
      this.listaRecomendados = [];
      this.listaFavoritos = [];
      this.listaCategorias = [];
      this.loginService.getObtenerTipoClienteNoAutenticado(
        requestTipoClienteNoAutenticado,
        () => {
          const obtenerTipoClienteNoAutenticadoResponse = this.loginService
            .obtenerClienteNoAutenticadoResponse;
          if (obtenerTipoClienteNoAutenticadoResponse.errorService) {
            this.flagErrorService = true;
          } else {
            console.log(obtenerTipoClienteNoAutenticadoResponse.idRespuesta);
            if (obtenerTipoClienteNoAutenticadoResponse.idRespuesta == 8) {
              this.flagFijaSinPaquetes = true;
            } else {
              // cod bloqueo
              this.codSuspendido = obtenerTipoClienteNoAutenticadoResponse.datosCliente.codigoBloqueo;
              console.log(obtenerTipoClienteNoAutenticadoResponse);

              if (this.listaCodigosSuspendidos.some(cod => cod.codigo === this.codSuspendido) && this.listaCodigosSuspendidos.length > 0) {
                this.nombrePopUp = 'codigoSuspendido';
                const mensaje = this.confSuspendidosMensajes1WCM;
                this.infoPopUp = mensaje;

                this.isActive = false;
                this.mostrarPopUpSuspendido = true;
              }
              const idRespuesta =
                obtenerTipoClienteNoAutenticadoResponse.idRespuesta;

              if (idRespuesta == 0) {
                this.numeroTele = this.servicioCompartido.msisdn;
                if (
                  this.verificaCodigoBloqueoPopup(
                    this.servicioCompartido.codigoBloqueo
                  )
                ) {
                  console.log(
                    'linea Bloqueado por codigoBloqueo =>',
                    this.servicioCompartido.codigoBloqueo
                  );
                  this.activaPopupBloqueo();
                } else {
                  if (this.ms.isFlowPortalRecargas()) {
                    this.isRecarga = true;

                    this.obtenerCategorias();
                    this.creditoSaldo = {
                      lblSaldoPrepago: '0',
                      lblSimboloMonedaSaldoPrep: 'S/.'
                    };


                  } else {
                    this.cargarRecomendadosYObtenerSaldo();
                  }
                }
              } else {
                console.log('obtenerTipoClienteNoAutenticado idRespuesta != 0 =>', idRespuesta);

              }
            }

          }
        }
      );
    }
  }

  private isCanalMiClaroWebOrCorpo() {
    return this.servicioCompartido.canal === Constantes.CANALES.MICLARO_CORPO
      || this.servicioCompartido.canal === Constantes.CANALES.MICLARO_WEB;
  }

  obtenerRecomendados() {
    this.cargandoRecomendadoFlag = true;
    this.listaRecomendados = [];
    const requesRecomendados = this.getRequestDatosCliente(2);
    this.productosRecomendadosService.getProductosRecomendados(
      requesRecomendados,
      () => {
        const obtenerRecomendado = this.productosRecomendadosService
          .obtenerRecomendadosResponse;
        const idRespuesta = obtenerRecomendado.idRespuesta;
        if (this.productosRecomendadosService.obtenerRecomendadosResponse.errorService) {
          this.flagErrorService = true;
        } else {
          if (Number(idRespuesta) === 0) {
            this.listaRecomendados = obtenerRecomendado.listaProductosCompra;
          } else {
            this.listaRecomendados = [];
            console.log('Error servicio idRespuesta is null');
          }
          this.cargandoRecomendadoFlag = false;
          this.obtenerFavoritos();
        }
      }
    );
  }

  getRequestDatosCliente(indicador) {
    const request = new RecomendadoRequest(null, null, null, null, null);
    if (indicador == 2) {
      request.msisdn = Constantes.PREFIJO_PERU + this.servicioCompartido.msisdn;
      request.isPontisEnabled = this.methods.getPontisFlag(
        this.wcmService.whitelistConfig,
        Constantes.PONTIS_WHITELIST_NODE_ORDER,
        Constantes.PONTIS_WHITELIST_NODE_NAME,
        this.servicioCompartido.msisdn,
        this.servicioCompartido.tipoLinea
      );
    } else {
      request.msisdn = this.servicioCompartido.msisdn;
      request.codigocaptcha = '';
      request.fuenteIngreso = this.servicioCompartido.fuenteIngreso;
      request.autenticado = this.servicioCompartido.autenticado;
    }
    return request;
  }

  eliminarFavorito(prod) {
    console.log('home component eliminarFavorito', prod);
    this.productosFavoritosService.eliminarFavorito(prod, this.listaFavoritos);
  }

  obtenerFavoritos() {
    this.cargandoFavoritosFlag = true;
    this.listaFavoritos = [];
    this.productosFavoritosService.obtenerFavoritos(() => {
      const response = this.productosFavoritosService.obtenerFavoritosResponse;
      const idRespuesta = response.idRespuesta;
      if (this.productosFavoritosService.obtenerFavoritosResponse.errorService) {
        this.flagErrorService = true;
      } else {
        if (Number(idRespuesta) === 0) {
          this.listaFavoritos = this.productosFavoritosService.obtenerFavoritosResponse.listaProductosFavoritos;
        } else {
          console.log('Error servicio idRespuesta is null');
          this.listaFavoritos = [];
        }
        this.cargandoFavoritosFlag = false;
        this.obtenerCategorias();
      }
    });
  }

  obtenerCategorias() {
    this.cargandoCategoriaFlag = true;
    this.listaCategorias = [];
    this.obtenerCategoriaService.obtenerCategoria(() => {
      const obtCategoria = this.obtenerCategoriaService
        .obtenerCategoriaResponse;
      const idRespuesta = obtCategoria.idRespuesta;
      if (obtCategoria.errorService) {
        this.flagErrorService = true;
      } else {
        if (Number(idRespuesta) === 0) {
          this.listaCategorias = obtCategoria.listaProductosCompra;
          // Para Portal Recarga
          if (this.ms.isFlowPortalRecargas()) {
            this.listaCategorias = this.listaCategorias.filter(
              (catSeleccionado) => catSeleccionado.codCategoria === '4'
            );
            this.seleccionData.categoriaSeleccionada = this.listaCategorias[0];
            this.prPortalRecargas = '1';
            this.prNumeroRecarga = '';
            this.prRecargaAnonima = false; // this.prNumeroRecarga ? false : true;
            this.esRecargas = true;
            this.activarRecargas = this.servicioCompartido.isRechargeAnonymous
              ? false
              : true;
          }
          // Todo refactorizar
          if (this.isActive) {
            // if (this.servicioCompartido.canal === '1') {
            //   if (!this.isCarrouselEnabled()) {
            //     console.log('Cargo bemobi canal 1');
            //     this.cargarScriptExternoBemobi();
            //   }
            // }
            // if (this.isChannelBemobiAndIsLineBemobiWhitelisted()) {
            //   if (!this.isCarrouselEnabled()) {
            //     console.log('Cargo bemobi Whitelisted');
            //     this.cargarScriptExternoBemobi();
            //   }
            // }
          }

          // this.deepLink()
        } else {
          this.listaCategorias = [];
          console.log('Error servicio idRespuesta is null');
          return;
        }
      }

      const promoValidationResponse = this.ms.isPromotionsModalDisplayed();
      if (promoValidationResponse.found) {
        const recomendacionModal =
          promoValidationResponse.promociones[promoValidationResponse.index];
        let callValido = false;
        for (
          let index = 0;
          index <
          this.productosRecomendadosService.obtenerRecomendadosResponse
            .listaProductosCompra.length;
          index++
        ) {
          if (
            recomendacionModal.idProductoDeCompra ===
            this.productosRecomendadosService.obtenerRecomendadosResponse
              .listaProductosCompra[index].idProductoDeCompra
          ) {
            callValido = true;
          }
        }
        if (recomendacionModal.codigoCategoria != '') {
          callValido = true;
        }
        if (!this.listaCodigosSuspendidos.some(cod => cod.codigo === this.codSuspendido)) {
          this.nombrePopUp = 'Promociones';
          this.infoPopUp = {
            recomendacionModal,
            callValido,
          };
        }

      } else {
        console.log('No promotion was found');
      }
      this.cargandoCategoriaFlag = false;
    });
  }

  habilitarBanner(estado: boolean) {
    localStorage.setItem('ban', '1');
    document.getElementById('nav-bar-claro').style.top = '0px';
    this.mostrarBannerDescarga = estado;
    console.log('estado de mostrarDBanner');
  }

  deshabilitarConfirmacion(est: boolean) {
    this.mostrarConfirma = est;
    this.methods.scroll(document.getElementById('metodosDiv'));
  }

  habilitarConfirmacion(estado: boolean) {
    this.mostrarConfirma = estado;
    this.mostrarLoadingFav = false;
    setTimeout(() => {
      this.methods.scroll(document.getElementById('confirmaPage'));
    }, 250);
  }

  cerrarPopUp(est: any) {
    this.popUpLinea = est;
  }

  cerrarPopUpCallToAction(est: any) {
    this.mostrarPopUpSuspendido = false;
    this.nombrePopUp = '';
  }

  verificaCodigoBloqueoPopup(codbloqueo) {
    let flag = false;
    if (
      this.confBloqueosCodigos1WCM &&
      this.confBloqueosCodigos1WCM.length > 0
    ) {
      for (const blockCode of this.confBloqueosCodigos1WCM) {
        if (blockCode.codigo == codbloqueo) {
          flag = true;
        }
      }
    }
    return flag;
  }

  activaPopupBloqueo() {
    this.popBloqueada = true;
    this.popUpLinea = true;
    this.infoPopUp = this.confBloqueosMensajes1WCM;
    this.nombrePopUp = 'Linea Bloqueada';
  }

  // isGood() {
  //   if (!this.isActive) {

  //     return false;

  //   }
  //   if (this.isChannelBemobiAndIsLineBemobiWhitelisted()) {

  //     return true;
  //   }

  //   if (this.servicioCompartido.canal == '1') {
  //     return true;
  //   }

  //   return false;
  // }

  // Todo verificar si bemobi esta activo
  isCarrouselEnabled() {
    if (this.wcmService.whitelistConfig[12].carrousel.state == '1') {
      if (this.wcmService.whitelistConfig[12].carrousel.allowedNumbers.indexOf(this.servicioCompartido.msisdn) == -1) {
        return false;
      } else {
        return true;
      }
    }
    return true;
  }

  // private isChannelBemobiAndIsLineBemobiWhitelisted() {
  //   return this.canalesBemobi.indexOf(this.servicioCompartido.canal) > -1;
  // }

  habilitarErrorServicio(event) {
    this.flagErrorService = event;
  }

  cambiarNumero(event) {
    if (event) {
      this.cambiaNumero = true;
    }
  }
}
