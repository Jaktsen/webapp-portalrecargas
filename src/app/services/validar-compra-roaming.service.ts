import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WefClientService } from '../core/http/wef-client.service';
import { Constantes } from './constants';
import { ServicioCompartidoService } from './../core/services/servicio-compartido.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarCompraRoamingService {

  constructor(private wcs: WefClientService,
              private servicioCompartido: ServicioCompartidoService) { }



  public validarRoamingResponse: any = {
    idRespuesta: null,
    mensaje: null,
    errorService: false
  };



  public validarRoamingActivoResponse: any = {
    idRespuesta: null,
    listServiciosAdicionales: [],
    status: false
  };


  validarProductodeCompraRoaming(parmRoaming: any, callback) {

    if (parmRoaming.tipoVal == Constantes.WPSTipoClic.value.clicMensual || parmRoaming.tipoVal == Constantes.WPSTipoClic.value.clicDiario) {
      parmRoaming.tipoVal = Constantes.WPSTipoClic.value.clicPaises;
    }
    const urlValidarProductoCompra = environment.urlComprasyPAgosWef.validarProductoCompra;
    const requestValRoaing = this.getrequestValidarRoaming(parmRoaming);
    this.wcs.post(urlValidarProductoCompra, requestValRoaing).subscribe(
      response => {
        console.log('Response validarProductodeCompraRoaming: ' + JSON.stringify(response));
        const idRespuesta = response.comunResponseType.MessageResponse.Body.defaultServiceResponse.idRespuesta;
        this.validarRoamingResponse.idRespuesta = idRespuesta;
        this.validarRoamingResponse.mensaje = response.comunResponseType.MessageResponse.Body.defaultServiceResponse.mensaje;
        callback();
      },
      error => {
        console.log('Error validarProductodeCompraRoaming', error);
        this.validarRoamingResponse.errorService = true
        callback();
      }
    );
  }

  getrequestValidarRoaming(parmRoaming: any) {
    const request = {
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
      admin: null
    };

    request.admin = this.servicioCompartido.isAdmin;
    request.flagFavorito = window.sessionStorage.getItem(Constantes.flagFav);


    if (parmRoaming.tipoVal == Constantes.WPSTipoClic.value.clicCategoria) {
      request.tipoValidacion = parmRoaming.tipoVal;
    } else if (parmRoaming.tipoVal == Constantes.WPSTipoClic.value.clicPaises) {
      request.idCategoriaDeCompra = parmRoaming.zone_code;
      request.tipoValidacion = parmRoaming.tipoVal;
      if (parmRoaming.tipoRoming != '' && parmRoaming.tipoRoming != undefined) {
        request.vigenciaProducto = parmRoaming.vigenciaProducto;
      }
    } else {
      request.tipoValidacion = parmRoaming.tipoVal;
      request.idProductoDeCompra = parmRoaming.idProductoDeCompra;
    }
    return request;
  }

  validarRoamingActivo(callback) {
    const urlValidarRoaming = environment.urlComprasyPAgosWef.validarRoaming;
    let request;
    this.wcs.post(urlValidarRoaming, request).subscribe(
      response => {
        console.log('Response urlValidarRoaming: ' + JSON.stringify(response));
        const idRespuesta = response.comunResponseType.MessageResponse.Body.defaultServiceResponse.idRespuesta;
        this.validarRoamingActivoResponse.idRespuesta = idRespuesta;
        if (Number(idRespuesta) === 0) {
          console.log('validarRoamingActivo idRespuesta 0');
          const listServiciosAdicionales = response.comunResponseType.MessageResponse.Body.listado;

          this.validarRoamingActivoResponse.listServiciosAdicionales = listServiciosAdicionales;
          this.validarRoamingActivoResponse.status = listServiciosAdicionales.status;
        } else {
          console.log('validarRoamingActivo idRespuesta diferente de 0');
          console.log('ERROR en Servicio validarRoamingActivo');
        }
        callback();
      },
      error => {
        console.log('Error validarRoamingActivo', error);
        callback();
      }
    );
  }

}
