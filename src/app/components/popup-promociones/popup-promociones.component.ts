import { MethodsService } from './../../services/methods.service';
import { PopupService } from 'src/app/services/popup.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Constantes } from 'src/app/services/constants';
import { CorreoEnviarService } from 'src/app/services/correo-enviar.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-popup-promociones',
  templateUrl: './popup-promociones.component.html',
  styleUrls: ['./popup-promociones.component.scss']
})
export class PopupPromocionesComponent implements OnInit {

  @Input() infoPopUp: any;
  @Input() nombrePopUp: string;

  @Output() popupAbierto = new EventEmitter<any>();

  correoForm: FormGroup;
  esEventos = false;

  constructor(private formBuilder: FormBuilder, private enviarCorreo: CorreoEnviarService, private popupService: PopupService,
              private ms: MethodsService) {
    this.correoForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.minLength(5), Validators.email]]
    });
  }

  ngOnInit() {
    console.log("popup a mostrar")
    console.log(this.infoPopUp)
  }

  cerrarPop() {
    this.popupAbierto.emit(false);
  }

  cerrarMessagePop() {
    if (this.infoPopUp.reload) {
      this.finalizarError();
    } else {
      this.cerrarPop();
    }
  }

  cerrarPopEmail() {
    const info = {
      state: false,
      email: ''
    };
    this.popupAbierto.emit(info);
  }

  actualizarEmail() {
    const request = this.getRequestAuto();

    this.enviarCorreo.enviarNotificacion(request).toPromise().then((res: any) => {
      console.log(res);

      const rtpaBody = res.comunResponseType.MessageResponse.Body.defaultServiceResponse.idRespuesta;
      if (rtpaBody == '0') {}
    }).catch(err => {
      console.log('error enviarNotificacion ', err);
    });

    const info = {
      state: false,
      email: this.correoForm.controls.correo.value
    };
    this.popupAbierto.emit(info);
  }

  getRequestAuto() {
    this.isEventosFunc();
    let request: any;

    if (!this.esEventos) {
      request = {
        mailCelEnvio: null,
        codigoSecreto: null,
        mail: null,
        email: this.correoForm.controls.correo.value,
        contrasena: null,
        flagEstadoMail:  Constantes.WPSMensajvalorNotificacioneseError.value.actualizar,
        idTransaccionCompra: this.infoPopUp.idTransaccionCompra,
        codigoCategoria: this.infoPopUp.idCategoria
      };
    } else {
      request = {
        mailCelEnvio: null,
        codigoSecreto: null,
        mail: null,
        email: this.correoForm.controls.correo.value,
        contrasena: null,
        flagEstadoMail:  Constantes.WPSMensajvalorNotificacioneseError.value.actualizar,
        idTransaccionCompra: this.infoPopUp.idTransaccionCompra,
        notificacionURLImage: (this.infoPopUp.canjeEventosNotificacionUrl) ? this.infoPopUp.canjeEventosNotificacionUrl : '',
        fechaSorteoCanje: (this.infoPopUp.canjeFechaSorteo) ?  this.infoPopUp.canjeFechaSorteo : '',
        asuntoCorreoCanje: (this.infoPopUp.canjeAsuntoCorreo) ?  this.infoPopUp.canjeAsuntoCorreo : '',
        textoNotificacionCorreoCanje: (this.infoPopUp.canjeTextoNotificacionCorreo) ?  this.infoPopUp.canjeTextoNotificacionCorreo : '',
        linkCondicionesSorteo: (this.infoPopUp.linkCondicionesCanje) ?  this.infoPopUp.linkCondicionesCanje : ''
      };
    }

    return request;
  }

  finalizarError() {
    const canal = sessionStorage.getItem('canal');
    if (this.ms.isFlowPortalRecargas()) {
      window.location.replace(Constantes.urlPortal.portalInternetClaro + `?cn=${canal}&rec=1`);
    } else {
      if (environment.urlComprasyPAgosMiClaroApp && environment.urlComprasyPAgosMiClaroApp.token != Constantes.EMPTY_STRING
      && this.ms.isPortalIntegrated(canal) ) {
          window.location.replace(Constantes.urlPortal.portalInternetClaro +
              '?cn=' + canal + '&listnum=' + environment.urlComprasyPAgosMiClaroApp.token);
        } else {
          window.location.replace(Constantes.urlPortal.portalInternetClaro);
        }
    }
  }

  isEventosFunc() {
    if (
      this.infoPopUp.idCategoria ==
      Constantes.WPSCategoriasDeCompra.canjeEventosSub1 ||
      this.infoPopUp.idCategoria ==
      Constantes.WPSCategoriasDeCompra.canjeEventosSub2 ||
      this.infoPopUp.idCategoria ==
      Constantes.WPSCategoriasDeCompra.canjeEventosSub3 ||
      this.infoPopUp.idCategoria ==
      Constantes.WPSCategoriasDeCompra.canjeEventosSub4 ||
      this.infoPopUp.idCategoria ==
      Constantes.WPSCategoriasDeCompra.canjeEventosSub5
    ) {
      this.esEventos = true;
    }
  }

  callToActionRecomendacion(promocion: any) {
    console.log('Call to action %O', promocion);
    if (promocion.CallToAction !== '1') {
      return;
    }
    let message = '';
    if (promocion.codigoCategoria == '') {
      message =  (promocion.idProductoDeCompra != '') ? `action_recomendados_${promocion.idProductoDeCompra}` : '';
    } else if (promocion.codigoCategoria === Constantes.WPSCategoriasDeCompra.recargas) {
      console.log("1")
      message = (promocion.idProductoDeCompra != '')
          ? `action_recargas_${promocion.idProductoDeCompra}_${promocion.codigoCategoria}`
          : `action_recargas_999999_${promocion.codigoCategoria}`;
    } else {
      console.log("2")
      message = (promocion.idProductoDeCompra != '')
          ?  `action_categorias_${promocion.idProductoDeCompra}_${promocion.codigoCategoria}`
          :  `action_categorias_999999_${promocion.codigoCategoria}`;
    }
    console.log('Call to action %s', message);
    if (message != '') {
      this.popupService.changeActionMessage(message);
    }
    this.cerrarPop();
  }

}
