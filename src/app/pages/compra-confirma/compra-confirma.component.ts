import { RegistrarLogService } from './../../services/registrar-log.service';
import { MethodsService } from 'src/app/services/methods.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constantes } from 'src/app/services/constants';
import { ProductosFavoritosService } from 'src/app/services/productos-favoritos.service';
import { saveAs } from 'file-saver';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { CorreoEnviarService } from 'src/app/services/correo-enviar.service';
import { ServicioCompartidoService } from 'src/app/core/services/servicio-compartido.service';
import { ServicioCompartidoExitoService } from 'src/app/core/services/servicio-compartido-exito.service';
import { ServiciosPagosService } from 'src/app/services/servicios-pagos.service';
import { ConfirmationItem } from 'src/app/shared/entities/confirmationItem';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { SnackBarPopComponent } from 'src/app/components/snack-bar-pop/snack-bar-pop.component';
import { UiServiceService } from './../../services/ui-service.service';
import { ButtonBehavior } from './../../components/dialog/dialog.component';
import { DataLayerService } from '../../services/data-layer.service';

declare var android: any;
declare var window: any;

@Component({
  selector: 'app-compra-confirma',
  templateUrl: './compra-confirma.component.html',
  styleUrls: ['./compra-confirma.component.scss'],
})
export class CompraConfirmaComponent implements OnInit {
  infoPopUp: any;
  nombrePopUp: any;
  servicioCompartido: any;
  eventoCompra: any;
  year: any;
  emailForm: FormGroup;

  accion = null;
  popConstancia = false;
  esFav = false;
  puedeFavorito = false;
  showFecha = true;
  showfechaVigencia = true;
  esPrestamo = false;
  esGiftCard = false;
  esEventos = false;
  correoActualizado = true;
  mostrarLoading = false;
  correoNoConfirmado = true;
  servicioCorreoActualizado = false;
  cambioPago = false;
  esFavAct = false;
  showFooter = true;
  mostrarFavLoading = false;
  mostrar= true;

  infoBoxPairs = [];
  infoBoxPairsFirstBox = [];
  tiempoActualizacion = '';
  tipoFecha = '';
  tipoProducto = '';
  productoSeleccionado = '';
  tipoCosto = '';
  mensajeCompraRecarga = '';
  mensajeError = '';
  numeroOperacion = '';
  paqueteSeleccionado = '';
  paqueteFecha = '';
  paqueteMetodo = '';
  paqueteMoneda = '';
  correroUsuario = '';
  fechaVigencia = '';
  razonSocial = '';
  numeroLinea = '';
  primerMedio = '';
  segundoMedio = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private enviarCorreo: CorreoEnviarService,
    private servCompartido: ServicioCompartidoService,
    public servicioCompartidoExito: ServicioCompartidoExitoService,
    private servicioPago: ServiciosPagosService,
    private productosFav: ProductosFavoritosService,
    private decimalPipe: DecimalPipe,
    private datePipe: DatePipe,
    private ms: MethodsService,
    private rls: RegistrarLogService,
    private snackBar: MatSnackBar,
    private uiService: UiServiceService,
    private _dataLayer: DataLayerService
  ) {
    this.servicioCompartido = this.servCompartido;
    this.emailForm = this.formBuilder.group({
      mail: [
        '',
        [Validators.required, Validators.minLength(5), Validators.email],
      ],
    });
  }

  ngOnInit() {
    //console.log('Compra confirma');
    //console.log(this.servicioCompartidoExito.tipoMetodoPago);
    
    //console.log(this.servicioCompartidoExito.esExito);
    //console.log(this.servicioCompartidoExito.esExitoMP);
    
    this.servicioCompartidoExito.tipoMetodoPago == 3;
    this.mostrarLoading = true;
    
    if (
      sessionStorage.getItem('favMedioPagos') != null ||
      sessionStorage.getItem('favMedioPagos') != undefined
    ) {
      const stringFavMedio = sessionStorage.getItem('favMedioPagos');
      this.primerMedio = stringFavMedio.substring(
        0,
        stringFavMedio.indexOf(',')
      );
      this.segundoMedio = stringFavMedio.substring(
        stringFavMedio.indexOf(',') + 1,
        stringFavMedio.length
      );
      sessionStorage.removeItem('favMedioPagos');

      if (this.primerMedio != this.segundoMedio) {
        this.cambioPago = true;
      }
    }

    this.year = parseInt(new Date().getFullYear().toString().substr(2, 2), 10);
    this.mostrarLoading = true;
    const token = this.extraerQueryString(Constantes.MOTOR_PAGOS_CONSTANTS.TOKEN);

    if (
      this.ms.isValueContainedInArray(
        sessionStorage.getItem('canal'),
        Constantes.CanalesIntegradosMCW
      )
    ) {
      this.showFooter = false;
    }

    if (sessionStorage.getItem('canal') === Constantes.CANALES.MICLARO_CORPO
        || sessionStorage.getItem('canal') === Constantes.CANALES.MICLARO_WEB) {
      this.showFooter = true;
    }

    if (token != null && token != '') {
      const requestFinTx = JSON.parse(
        window.sessionStorage.getItem(
          Constantes.MOTOR_PAGOS_REG_FIN_TRANSACCION
        )
      );
      requestFinTx.userAgent = navigator.userAgent;

      if (sessionStorage.getItem('canal') != null) {
        requestFinTx.canalTemporal = sessionStorage.getItem('canal');
      } else {
        requestFinTx.canalTemporal = '1';
      }
      if(requestFinTx.canalTemporal == '23'){
        this.mostrar = false;
      }

      
      //console.log("REGISTROO", requestFinTx)
      if (requestFinTx) {
        requestFinTx.objeto = token;
        this.servicioPago
          .regFinTransaccionPagoTC(requestFinTx)
          .toPromise()
          .then((response: any) => {
            const idRespuestaDP =
              response.comunResponseType.MessageResponse.Header.HeaderResponse
                .status.code;
            const compraResponse =
              response.comunResponseType.MessageResponse.Body;

            if (Number(idRespuestaDP) == 0) {
              const idRespuestaConsulta =
                response.comunResponseType.MessageResponse.Body
                  .defaultServiceResponse.idRespuesta;
              const datosCompraCompartidaJson = window.sessionStorage.getItem(
                Constantes.MOTOR_PAGOS_COMPRA_COMPARTIDA
              );
              const datosCompraCompartida = JSON.parse(datosCompraCompartidaJson);
              this.servicioCompartidoExito = Object.assign(
                {},
                this.servicioCompartidoExito,
                datosCompraCompartida
              );

              if (Number(idRespuestaConsulta) == 0) {
                compraResponse.descripcionResultadoOperacion =
                  Constantes.COMPRA_EXITOSA_MENSAJE;
                this.servicioCompartidoExito.esExitoMP = true;
              } else {
                compraResponse.descripcionResultadoOperacion =
                  Constantes.COMPRA_ERROR_MENSAJE;
                this.servicioCompartidoExito.esExitoMP = false;
              }

              this.servicioCompartidoExito.fechaCompra =
                compraResponse.fechaCompra;
              this.servicioCompartidoExito.descripcion =
                compraResponse.descripcionResultadoOperacion;
              this.servicioCompartidoExito.tiempoActualizacion =
                compraResponse.tiempoActualizacion;
              this.servicioCompartidoExito.emailNotificacion =
                compraResponse.emailNotificacion;
              this.servicioCompartidoExito.idTransaccionCompra =
                compraResponse.idTransaccionCompra;
              this.servicioCompartidoExito.numeroOperacion =
                compraResponse.numeroOperacion;
              this.servicioCompartidoExito.pinCode = compraResponse.pincode;
              this.servicioCompartidoExito.pdfBite =
                compraResponse ? compraResponse.archivoPdfClaro : '';
              this.servicioCompartidoExito.conCopia =
                compraResponse.flagCopiaComprador == '1' ? true : false;

              this.servicioCompartidoExito.idRespuesta = idRespuestaConsulta;
              this.servicioCompartidoExito.nroDocumentoAutorizado =
                compraResponse.nroDocumentoAutorizado;

              this.servicioCompartidoExito.ruc = compraResponse.ruc;
              this.servicioCompartidoExito.valorVenta =
                compraResponse.valorVenta;
              this.servicioCompartidoExito.igv = compraResponse.igv;
              this.servicioCompartidoExito.razonSocial =
                compraResponse.razonSocial;

              this.servicioCompartidoExito.fechaCompra =
                compraResponse.horaCompra;
              this.servicioCompartidoExito.esCompraMP = true;
              this.servicioCompartidoExito.mensajeBackend =
                response.comunResponseType.MessageResponse.Body.defaultServiceResponse.mensaje;
              this.inicioConfirma();
            } else {
              this.servicioCompartidoExito.esExitoMP = false;
              this.servicioCompartidoExito.esCompraMP = true;
              this.inicioConfirma();
            }

            window.sessionStorage.removeItem(
              Constantes.MOTOR_PAGOS_COMPRA_COMPARTIDA
            );
            window.sessionStorage.removeItem(
              Constantes.MOTOR_PAGOS_REG_FIN_TRANSACCION
            );
          })
          .catch((err) => {});
      }
    } else {
      this.inicioConfirma();
    }
  }

  extraerQueryString(name: any) {
    const results = new RegExp('[?&]' + name + '=([^&#]*)').exec(
      window.location.href
    );

    if (results == null) {
      return null;
    } else {
      return decodeURI(results[1]);
    }
  }

  inicioConfirma() {
    // if (this.servicioCompartidoExito.idCategoria == 4) {
    //   console.log(this.servicioCompartidoExito);
      
    //   this._dataLayer.gtm_purchase(this.servicioCompartidoExito);
    // }else {
    //   this._dataLayer.gtm_purchase(this.servicioCompartidoExito);
    // }
     if (this.servicioCompartidoExito.idCategoria == 4) {
      console.log('recarga');
      this._dataLayer.gtm_purchase_recarga(this.servicioCompartidoExito);
     }else {
      console.log('compras');
      
       this._dataLayer.gtm_purchase(this.servicioCompartidoExito);
     }
    
    //this._dataLayer.gtm_purchase(this.servicioCompartidoExito);
    this.isEventosFunc();
    this.isPrestamoFun();

    this.productoSeleccionado = this.servicioCompartidoExito.nombreProd;
    this.tipoProducto = this.esEventos
      ? 'Opción'
      : this.servicioCompartidoExito.idCategoria == '4'
      ? 'Operación'
      : 'Producto';
    this.tipoCosto =
      this.servicioCompartidoExito.codigo == '1' ? 'Costo' : 'Costo (inc.IGV)';
    this.paqueteSeleccionado = this.servicioCompartidoExito.nombreCat;
    this.paqueteMetodo = this.servicioCompartidoExito.metodoPago;
    this.correroUsuario = this.servicioCompartidoExito.emailNotificacion;
    this.tiempoActualizacion = this.servicioCompartidoExito.tiempoActualizacion;
    this.numeroOperacion = this.servicioCompartidoExito.numeroOperacion;
    this.razonSocial = this.htmlEntities(
      this.servicioCompartidoExito.razonSocial
    );

    this.tipoFechaFunc();
    this.infoCompra();
    this.inicioExito();

    if (this.servicioCompartidoExito.idCategoria == 4) {
      const itemsFirstBox = [];
      itemsFirstBox.push(
        new ConfirmationItem('Operación', this.productoSeleccionado, '')
      );
      itemsFirstBox.push(
        new ConfirmationItem(
          this.tipoFecha.replace(':', ''),
          this.paqueteFecha,
          ''
        )
      );
      itemsFirstBox.push(
        new ConfirmationItem(
          'Fecha de Vigencia',
          this.datePipe.transform(
            this.servicioCompartidoExito.fecVigProd.substring(0, 10),
            'dd \'de\' MMMM yyyy'
          ),
          ''
        )
      );
      itemsFirstBox.push(
        new ConfirmationItem('Método de Pago', this.paqueteMetodo, '')
      );
      this.infoBoxPairsFirstBox = itemsFirstBox;



      const itemsSecondBox = [];
      if (this.servicioCompartidoExito.numeroCompra) {
        itemsSecondBox.push(
          new ConfirmationItem(
            'Código de usuario',
            this.servicioCompartidoExito.numeroCompra,
            ''
          )
        );
      }
      if (this.servicioCompartidoExito.razonSocial) {
        itemsSecondBox.push(
          new ConfirmationItem(
            ' ',
            this.servicioCompartidoExito.razonSocial,
            ''
          )
        );
      }
      if (this.servicioCompartidoExito.ruc) {
        itemsSecondBox.push(
          new ConfirmationItem('RUC', this.servicioCompartidoExito.ruc, '')
        );
      }
      if (this.servicioCompartidoExito.nroDocumentoAutorizado) {
        itemsSecondBox.push(
          new ConfirmationItem(
            'Nro documento autorizado',
            this.servicioCompartidoExito.nroDocumentoAutorizado,
            ''
          )
        );
      }
      if (this.servicioCompartidoExito.valorVenta) {
        itemsSecondBox.push(
          new ConfirmationItem(
            'Valor venta',
            this.servicioCompartidoExito.simboloMoneda +
              ' ' +
              this.decimalPipe.transform(
                this.servicioCompartidoExito.valorVenta,
                '0.2'
              ),
            ''
          )
        );
        itemsSecondBox.push(new ConfirmationItem('Descuento', 'S/ 0.00', ''));
      }
      if (this.servicioCompartidoExito.igv) {
        itemsSecondBox.push(
          new ConfirmationItem(
            'I.G.V.',
            this.servicioCompartidoExito.simboloMoneda +
              ' ' +
              this.decimalPipe.transform(
                this.servicioCompartidoExito.igv,
                '0.2'
              ),
            ''
          )
        );
      }
      if (
        this.servicioCompartidoExito.valorVenta &&
        this.servicioCompartidoExito.igv
      ) {
        itemsSecondBox.push(
          new ConfirmationItem(
            'Total',
            this.servicioCompartidoExito.simboloMoneda +
              ' ' +
              this.decimalPipe.transform(
                parseFloat(this.servicioCompartidoExito.igv) +
                  parseFloat(this.servicioCompartidoExito.valorVenta),
                '0.2'
              ),
            ''
          )
        );
      }
      this.infoBoxPairs = itemsSecondBox;

    }
  }

  htmlEntities(str: string) {
    return String(str)
      .replace('&amp;', '&')
      .replace('&ntilde;', 'ñ')
      .replace('&Ntilde;', 'Ñ')
      .replace('&Aacute;', 'Á')
      .replace('&Eacute;', 'É')
      .replace('&Iacute;', 'Í')
      .replace('&Oacute;', 'Ó')
      .replace('&Uacute;', 'Ú')
      .replace('&aacute;', 'á')
      .replace('&eacute;', 'é')
      .replace('&iacute;', 'í')
      .replace('&oacute;', 'ó')
      .replace('&uacute;', 'ú');
  }

  tipoFechaFunc() {
    try {
      if (this.servicioCompartidoExito.fechaCompra == null || this.servicioCompartidoExito.fechaCompra == ''
          || this.servicioCompartidoExito.fechaCompra == undefined) {
        this.showFecha = false;
      }

      if (this.servicioCompartidoExito.fecVigProd == null || this.servicioCompartidoExito.fecVigProd == ''
          || this.servicioCompartidoExito.fecVigProd == undefined) {
        this.showfechaVigencia = false;
      }

      if (this.showFecha && this.esEventos) {
        this.tipoFecha = 'Fecha de Canje';
        this.paqueteFecha = this.servicioCompartidoExito.fechaCompra;
      } else if (this.servicioCompartidoExito.idCategoria == '4') {
        this.tipoFecha = 'Fecha de recarga';
        this.paqueteFecha = this.servicioCompartidoExito.fechaCompra;
      } else if (this.servicioCompartidoExito.idCategoria == '13') {
        this.tipoFecha = 'Fecha de vencimiento';
        this.paqueteFecha = this.datePipe.transform(this.servicioCompartidoExito.fecVigProd.substring(0, 10), 'dd \'de\' MMMM yyyy');
      } else if (this.servicioCompartido.isIFILTE) {
        this.tipoFecha = 'Fecha de compra';
        this.paqueteFecha = this.servicioCompartidoExito.fechaCompra;
      } else if (this.showfechaVigencia && this.servicioCompartidoExito.idCategoria != Constantes.WPSCategoriasDeCompra.videos
          && this.servicioCompartidoExito.idCategoria != '4') {
        if (this.esGiftCard) {
          this.tipoFecha = 'Vigencia';
          this.paqueteFecha = this.servicioCompartidoExito.vigencia;
        } else {
          this.tipoFecha = this.servicioCompartidoExito.idCategoria == '24' ? 'Fecha de compra' : 'Fecha de vencimiento';
          this.paqueteFecha = this.servicioCompartidoExito.idCategoria == '24' ? this.servicioCompartidoExito.fechaCompra
              : this.servicioCompartidoExito.fecVigProd;
        }
      } else if (this.servicioCompartidoExito.idCategoria == Constantes.WPSCategoriasDeCompra.videos) {
        this.tipoFecha = 'Vigencia';
        this.paqueteFecha = '30 días';
      } else if (this.esPrestamo) {
        this.tipoFecha = 'Vigencia';
        this.paqueteFecha = this.servicioCompartidoExito.vigencia;
      }

      if (this.servicioCompartidoExito.idCategoria == '4') {
        this.fechaVigencia = this.datePipe.transform(this.servicioCompartidoExito.fecVigProd.substring(0, 10), 'dd \'de\' MMMM yyyy');
      }

      if (this.servicioCompartidoExito.idCategoria != Constantes.WPSCategoriasDeCompra.videos
          && !this.esGiftCard && this.servicioCompartidoExito.idCategoria != Constantes.WPSCategoriasDeCompra.prestameMegas ) {
        this.paqueteFecha = this.datePipe.transform(this.paqueteFecha.substring(0, 10), 'dd \'de\' MMMM yyyy');
      }
    } catch (error) {
      console.groupCollapsed('Error de parseo tipoFechaFunc');
      console.error(error);
      console.groupEnd();
    }
  }

  infoCompra() {
    const compraRec =
      this.servicioCompartidoExito.idCategoria == '4'
        ? 'La recarga'
        : 'La compra';
    const numOperacion =
      this.servicioCompartidoExito.numeroCompra &&
      this.servicioCompartidoExito.numeroCompra != undefined
        ? this.servicioCompartidoExito.numeroCompra
        : this.servCompartido.msisdn;
    this.numeroLinea = numOperacion;

    if (
      this.servicioCompartidoExito.idCategoria !=
      Constantes.WPSCategoriasDeCompra.videos
    ) {
      if (!this.esPrestamo) {
        this.mensajeCompraRecarga =
          compraRec +
          ' se realizó a la línea <span style="color: red;">' +
          numOperacion +
          '</span>';
      } else {
        this.mensajeCompraRecarga =
          this.servicioCompartidoExito.constanciaPrestamoSubTitle;
      }
    } else {
      this.mensajeCompraRecarga =
        this.servicioCompartidoExito.descripcion +
        '<br> a la línea ' +
        numOperacion;
    }
  }

  abrirPopupConstancia() {
console.log('servicioCompartidoExito');

      console.log(this.servicioCompartidoExito);
      console.log('this.servCompartido.isRecargas()');
      
      console.log(this.servCompartido.isRecargas());
      
      if(this.servicioCompartidoExito.idCategoria == 4){
        this._dataLayer.gtm_Event_recargaEtiosa('recargas_pago_exitoso_click','cambiar');
      }else{
        this._dataLayer.gtm_Event_compra_exitosa_cambiar_volver('compras_pago_exitoso_click', "cambiar")
      }
      
    

    this.infoPopUp = {
      idCategoria: this.servicioCompartidoExito.idCategoria,
      idTransaccionCompra: this.servicioCompartidoExito.idTransaccionCompra,
      canjeEventosNotificacionUrl: '',
      canjeFechaSorteo: '',
      canjeAsuntoCorreo: '',
      canjeTextoNotificacionCorreo: '',
      linkCondicionesCanje: '',
    };

    if (this.esEventos) {
      this.infoPopUp.canjeEventosNotificacionUrl =
        this.servicioCompartidoExito.canjeEventosNotificacionUrl;
      this.infoPopUp.canjeFechaSorteo = this.datePipe.transform(
        this.servicioCompartidoExito.canjeFechaSorteo.substring(0, 10),
        'dd \'de\' MMMM yyyy'
      );
      this.infoPopUp.canjeAsuntoCorreo =
        this.servicioCompartidoExito.canjeAsuntoCorreo;
      this.infoPopUp.canjeTextoNotificacionCorreo =
        this.servicioCompartidoExito.canjeTextoNotificacionCorreo;
      this.infoPopUp.linkCondicionesCanje =
        this.servicioCompartidoExito.linkCondicionesCanje;
    }

    this.nombrePopUp = 'Constancia';
    this.popConstancia = true;
  }

  cerrarPopUp(est: any) {
    if (est === false) {
      this.popConstancia = est.state;
    } else {
      if (est.email != '') {
        this.correroUsuario = est.email;
        this.correoActualizado = false;
      }

      this.popConstancia = est.state;
    }
  }

  esFavorito() {
    if (this.puedeCategoriaFavorita()) {
      if (!isNaN(parseInt(window.sessionStorage.getItem(Constantes.CANT_ACTUAL_label), 10))
          && window.sessionStorage.getItem(Constantes.CANT_ACTUAL_label) != null) {
        if (window.sessionStorage.getItem(Constantes.allowedFavorites) != '0' &&
            window.sessionStorage.getItem(Constantes.CANT_ACTUAL_label) == '0') {
          return true;
        } else {
          if (window.sessionStorage.getItem(Constantes.allowedFavorites) != '0'
              && window.sessionStorage.getItem(Constantes.CANT_ACTUAL_label)
              <= window.sessionStorage.getItem(Constantes.CANT_FAVORITOS_label)) {
            return true;
          }
        }
      }
    }

    return false;
  }

  puedeCategoriaFavorita() {
    //console.log('this.servicioCompartidoExito.idCategoria::' + this.servicioCompartidoExito.idCategoria);
    //console.log('this.servicioCompartidoExito.flagPontis::' + this.servicioCompartidoExito.flagPontis);
    if (this.servicioCompartidoExito.idCategoria == Constantes.WPSCategoriasDeCompra.paquetesRecomendados ||
      this.servicioCompartidoExito.idCategoria == Constantes.WPSCategoriasDeCompra.prestameMegas ||
      this.servicioCompartidoExito.idCategoria == Constantes.WPSCategoriasDeCompra.videos ||
      this.servicioCompartidoExito.idCategoria == Constantes.WPSCategoriasDeCompra.recargas ||
      this.servicioCompartidoExito.idCategoria == Constantes.WPSCategoriasDeCompra.roaming ||
      this.servicioCompartidoExito.idCategoria == Constantes.WPSCategoriasDeCompra.musica ||
      this.servicioCompartidoExito.idCategoria == Constantes.WPSCategoriasDeCompra.pontis ||
      this.servicioCompartidoExito.flagPontis == '1' ||
      this.esEventos || this.esGiftCard) { return false; } else { return true; }
  }

  consultarFavorito() {
    if (this.esFavorito()) {
      const request = {
        idProducto: this.servicioCompartidoExito.idProducto,
        accion: 'C',
        idMetodoPago: this.servicioCompartidoExito.tipoMetodoPago
      };

      this.productosFav.mantenimientoFavorito(request).toPromise().then((response: any) => {
        const readyFavorites = response.comunResponseType.MessageResponse.Body.defaultServiceResponse.idRespuesta;
        if (readyFavorites == '4') {
          this.esFav = true;
        }
        this.puedeFavorito = true;

        if (readyFavorites != '4'
            && window.sessionStorage.getItem(Constantes.CANT_ACTUAL_label) ==
            window.sessionStorage.getItem(Constantes.CANT_FAVORITOS_label)) {
          this.puedeFavorito = false;
        }

        this.mostrarLoading = false;
      }, (error) => {
        //console.log('Error al consultar');
      });
    }
  }

  estadoFav() {
    console.log("Kkkkkkkkkkkkkkkkkkkkkkkk")
    console.log(this.productoSeleccionado)
    console.log(this.servicioCompartidoExito)
    if(!this.esFav){
      this._dataLayer.gtm_Event_compra_exitosa('compras_pago_exitoso_click','agregar este paquete a favoritos','on',this.productoSeleccionado,this.servicioCompartidoExito.nombreCat)
    }else{
      this._dataLayer.gtm_Event_compra_exitosa('compras_pago_exitoso_click','agregar este paquete a favoritos','off',this.productoSeleccionado,this.servicioCompartidoExito.nombreCat)
    }
     
    
   
    this.mostrarFavLoading = true;
    const request = {
      idProducto: this.servicioCompartidoExito.idProducto,
      accion: null,
      idMetodoPago: this.servicioCompartidoExito.tipoMetodoPago
    };

    if (this.esFav) {
      request.accion = 'E';
    } else {
      request.accion = 'A';
    }

    this.productosFav.mantenimientoFavorito(request).toPromise().then((response: any) => {
      this.esFav = !this.esFav;
      this.mostrarFavLoading = false;

      const data = {
        mensaje: this.esFav ? 'Tu compra ha sido guardada como favorita <b>exitosamente.</b>'
            : 'Tu compra no ha sido guardada como favorita <b>exitosamente.</b>',
        lineas: '2'
      };

      this.snackBar.openFromComponent(SnackBarPopComponent, {
        data,
        duration: 10000,
        panelClass: ['estilo_caja_fav']
      });
    }, (error) => {
      //console.log('Error al eliminar/modificar');
    });
  }

  estadoFavAct() {
    this.mostrarFavLoading = true;
    const request = {
      idProducto: this.servicioCompartidoExito.idProducto,
      accion: 'M',
      idMetodoPago: null
    };

    if (this.esFavAct) {
      request.idMetodoPago = this.primerMedio;
    } else {
      request.idMetodoPago = this.servicioCompartidoExito.tipoMetodoPago;
    }

    this.productosFav.mantenimientoFavorito(request).toPromise().then((response: any) => {
      this.esFavAct = !this.esFavAct;
      this.mostrarFavLoading = false;

      const data = {
        mensaje: this.esFavAct ? 'El nuevo método de pago ha sido <b>actualizado exitosamente</b>'
            : 'El nuevo método de pago no ha sido <b>actualizado exitosamente</b>',
        lineas: '2'
      };

      this.snackBar.openFromComponent(SnackBarPopComponent, {
        data,
        duration: 10000,
        panelClass: ['estilo_caja_fav']
      });
    }, (error) => {
      //console.log('Error al eliminar/modificar');
    });
  }

  inicioExito() {
    if (
      this.servicioCompartidoExito.esCompraMP === '' &&
      this.servicioCompartido.autenticado === ''
    ) {
      window.location.replace(Constantes.urlPortal.portalInternetClaro);
    }

    if (
      this.servicioCompartidoExito.esCompraMP &&
      !this.servicioCompartidoExito.esExitoMP
    ) {
      let title = Constantes.WPSMensajeError.value.MOTOR_PAGOS_FALLA_DEFAULT_TITLE;
      let popupErrorContent = '';
      let botonMensaje = 'Entendido';
      const isInvertedButton = false;

      switch (this.servicioCompartidoExito.idRespuesta) {
        case Constantes.REG_FIN_TRANSACCION.IDF_RECARGA_SIN_ACTIVACION:
          popupErrorContent = Constantes.WPSMensajeError.value.MOTOR_PAGOS_FALLA_SWITCH_PAQUETES;
          botonMensaje = 'Ir a comprar';
          break;
        case Constantes.REG_FIN_TRANSACCION.IDF_ERROR_ST_EXTORNO:
          popupErrorContent = Constantes.WPSMensajeError.value.MOTOR_PAGOS_FALLA_SWITCH_EXTORNO;
          break;
        case Constantes.REG_FIN_TRANSACCION.IDF_ERROR_CONSULTAR_MOTORPAGOS_SALDOS_INSUFICIENTES:
          popupErrorContent = Constantes.WPSMensajeError.value.MOTOR_PAGOS_FALLA_SALDOS_INSUFICIENTES_CONTENT;
          title = Constantes.WPSMensajeError.value.MOTOR_PAGOS_FALLA_SALDOS_INSUFICIENTES_TITLE;
          break;
        case Constantes.REG_FIN_TRANSACCION.IDF_ERROR_CONSULTAR_MOTORPAGOS_TARJETA_VENCIDA:
          popupErrorContent = Constantes.WPSMensajeError.value.MOTOR_PAGOS_FALLA_TARJETA_VENCIDA_CONTENT;
          title = Constantes.WPSMensajeError.value.MOTOR_PAGOS_FALLA_TARJETA_VENCIDA_TITLE;
          break;
        default:
          popupErrorContent =  Constantes.WPSMensajeError.value.MOTOR_PAGOS_GENERICO;
          break;
      }

      const data = {
        content: popupErrorContent,
        mainButtonBehavior: ButtonBehavior.Reload,
        title,
        buttonMessage: botonMensaje,
        isInvertedButton,
        imagen: null
      };

      this.uiService.openPopup(data);
    }

    this.mostrarLoading = false;
  }

  imprimirPagina() {
    window.print();
  }

  isPrestamoFun() {
    if (
      Constantes.WPSCategoriasDeCompra.prestameMegas ==
      this.servicioCompartidoExito.idCategoria
    ) {
      this.esPrestamo = true;
    }
  }

  isEventosFunc() {
    if (
      this.servicioCompartidoExito.idCategoria ==
        Constantes.WPSCategoriasDeCompra.canjeEventosSub1 ||
      this.servicioCompartidoExito.idCategoria ==
        Constantes.WPSCategoriasDeCompra.canjeEventosSub2 ||
      this.servicioCompartidoExito.idCategoria ==
        Constantes.WPSCategoriasDeCompra.canjeEventosSub3 ||
      this.servicioCompartidoExito.idCategoria ==
        Constantes.WPSCategoriasDeCompra.canjeEventosSub4 ||
      this.servicioCompartidoExito.idCategoria ==
        Constantes.WPSCategoriasDeCompra.canjeEventosSub5
    ) {
      this.eventoCompra = JSON.parse(
        window.sessionStorage.getItem('eventoEsc')
      );
      this.esEventos = true;
    }

    this.isGiftCardFun();
  }

  isGiftCardFun() {
    if (
      this.servicioCompartidoExito.idCategoria ==
        Constantes.WPSCategoriasDeCompra.gifCard1 ||
      this.servicioCompartidoExito.idCategoria ==
        Constantes.WPSCategoriasDeCompra.gifCard2 ||
      this.servicioCompartidoExito.idCategoria ==
        Constantes.WPSCategoriasDeCompra.gifCard
    ) {
      this.esGiftCard = true;
    }

    this.consultarFavorito();
  }

  copiarCodigo() {
    const copyText = document.getElementById('copyCode') as HTMLInputElement;
    copyText.select();
    document.execCommand('copy');
  }

  comoVideo() {
    const archivoBase64 = this.servicioCompartidoExito.pdfBite;

    if (archivoBase64) {
      const reciboBlob = this.b64toBlob(archivoBase64, 'application/pdf');
      saveAs(reciboBlob, 'aprende_a_usar_tu_codigo.pdf');
    } else {
      this.nombrePopUp = 'Error Mensaje';
      this.infoPopUp = {
        mensaje_upps_titulo: 'Upssss!!!',
        customMessageError: 'No se ha podido descargar el PDF',
      };
      this.popConstancia = true;
    }
  }

  comoMusica() {
    const archivoBase64 = this.servicioCompartidoExito.pdfBite;

    if (archivoBase64) {
      const reciboBlob = this.b64toBlob(archivoBase64, 'application/pdf');
      saveAs(reciboBlob, 'aprende_a_usar_tu_codigo.pdf');
    } else {
      this.nombrePopUp = 'Error Mensaje';
      this.infoPopUp = {
        mensaje_upps_titulo: 'Upssss!!!',
        customMessageError: 'No se ha podido descargar el PDF',
      };
      this.popConstancia = true;
    }
  }

  irClaroVideo() {
    window.open('https://www.clarovideo.com/peru/homeuser', '_blank');
  }

  irClaroMusica() {
    window.open('https://www.claromusica.com/', '_blank');
  }

  b64toBlob(b64Data: any, contentType: string, sliceSize?: number) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);   
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  irDeVuelta(rec: boolean) {
    if(!(this.servicioCompartidoExito.idCategoria == '4')){
      this._dataLayer.gtm_Event_compra_exitosa_cambiar_volver('compras_pago_exitoso_click', "volver al inicio")
    }

    if(this.servicioCompartidoExito.idCategoria == '4' && rec){
      this._dataLayer.gtm_Event_recargaEtiosa('recargas_pago_exitoso_click','finalizar');
    }
    if(this.servicioCompartidoExito.idCategoria == '4' && !rec){
      this._dataLayer.gtm_Event_recargaEtiosa('recargas_pago_exitoso_click','comprar paquetes');
    }


    if (
      (sessionStorage.getItem('canal') == '3' || sessionStorage.getItem('canal') == '23')  &&
      sessionStorage.getItem('isEmbeddedChannel') == '1'
    ) {
      if (
        typeof android !== 'undefined' &&
        typeof android.closeMobileWebView !== 'undefined'
      ) {
        android.closeMobileWebView();
      } else if (
        typeof window.webkit !== 'undefined' &&
        typeof window.webkit.messageHandlers.miclaroiOSListener.postMessage !==
          'undefined'
      ) {
        window.webkit.messageHandlers.miclaroiOSListener.postMessage(
          'closeWebView'
        );
      } else {
        window.location.replace(
          Constantes.urlPortal.portalInternetClaro +
            '?cn=' +
            Constantes.CANALES.MICLARO_APP +
            '&listnum=' +
            environment.urlComprasyPAgosMiClaroApp.token
        );
      }
    } else if (
      environment.urlComprasyPAgosMiClaroApp &&
      environment.urlComprasyPAgosMiClaroApp.token != Constantes.EMPTY_STRING &&
      this.ms.isValueContainedInArray(
        sessionStorage.getItem('canal'),
        Constantes.CanalesIntegradosMCW
      )
    ) {
      // canales integrados MCW masivo y corporativo y miclaroapp
      window.location.replace(
        Constantes.urlPortal.portalInternetClaro +
          '?cn=' +
          sessionStorage.getItem('canal') +
          '&listnum=' +
          environment.urlComprasyPAgosMiClaroApp.token
      );
    } else if (this.ms.isFlowPortalRecargas() && rec) {
      const canal = sessionStorage.getItem('canal');
      window.location.href = Constantes.urlPortal.portalInternetClaro + `?cn=${canal}&rec=1`;
    } else {
      window.location.replace(Constantes.urlPortal.portalInternetClaro);
    }
  }

  getRequestAuto() {
    let request: any;

    if (!this.esEventos) {
      request = {
        mailCelEnvio: this.servicioCompartidoExito.emailNotificacion,
        codigoSecreto: null,
        mail: null,
        email: this.emailForm.controls.mail.value,
        contrasena: null,
        flagEstadoMail:
          Constantes.WPSMensajvalorNotificacioneseError.value.insertar,
        idTransaccionCompra: this.servicioCompartidoExito.idTransaccionCompra
      };
    } else {
      request = {
        mailCelEnvio: this.servicioCompartidoExito.emailNotificacion,
        codigoSecreto: null,
        mail: null,
        email: this.emailForm.controls.mail.value,
        contrasena: null,
        flagEstadoMail:
          Constantes.WPSMensajvalorNotificacioneseError.value.insertar,
        idTransaccionCompra: this.servicioCompartidoExito.idTransaccionCompra,
        notificacionURLImage: this.servicioCompartidoExito
          .canjeEventosNotificacionUrl
          ? this.servicioCompartidoExito.canjeEventosNotificacionUrl
          : '',
        fechaSorteoCanje: this.servicioCompartidoExito.canjeFechaSorteo
          ? this.servicioCompartidoExito.canjeFechaSorteo
          : '',
        asuntoCorreoCanje: this.servicioCompartidoExito.canjeAsuntoCorreo
          ? this.servicioCompartidoExito.canjeAsuntoCorreo
          : '',
        textoNotificacionCorreoCanje: this.servicioCompartidoExito
          .canjeTextoNotificacionCorreo
          ? this.servicioCompartidoExito.canjeTextoNotificacionCorreo
          : '',
        linkCondicionesSorteo: this.servicioCompartidoExito.linkCondicionesCanje
          ? this.servicioCompartidoExito.linkCondicionesCanje
          : '',
      };
    }

    return request;
  }

  fnSumarTotal(p1: string, p2: string) {
    return parseFloat(p1) + parseFloat(p2);
  }

  actualizarCorreo() {
    if (
      this.emailForm.controls.mail.value &&
      this.emailForm.controls.mail.value != ''
    ) {
      const request = this.getRequestAuto();
      this.enviarCorreo
        .enviarNotificacion(request)
        .toPromise()
        .then((res: any) => {
          const rtpaBody =
            res.comunResponseType.MessageResponse.Body.defaultServiceResponse
              .idRespuesta;
          if (rtpaBody == '0') {
            this.correroUsuario =
              res.comunResponseType.MessageResponse.Body.email;
            this.correoNoConfirmado = false;
            this.servicioCorreoActualizado = true;
          }
        })
        .catch((err) => {
          //console.log('error enviarNotificacion ', err);
        });
    }
  }
}
