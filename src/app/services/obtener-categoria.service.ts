import { Injectable } from '@angular/core';
import { ServicioCompartidoService } from './../core/services/servicio-compartido.service';
import { environment } from 'src/environments/environment';
import { WefClientService } from '../core/http/wef-client.service';
import { Constantes } from './constants';
import { MethodsService } from 'src/app/services/methods.service';
import { WcmService } from '../services/wcm.service';

@Injectable({
  providedIn: 'root'
})
export class ObtenerCategoriaService {

  categoriaSeleccionada: any = null;

  public obtenerCategoriaResponse: any = {
    idRespuesta: null,
    listaCategoria: [],
    errorService:false
  };



  constructor(private wcs: WefClientService,
              private servicioCompartido: ServicioCompartidoService,
              private methodsService: MethodsService,
              private wcmService: WcmService) { }


  obtenerCategoria(callback) {
    let lstCategoria = [];
    this.obtenerCategoriaResponse.listaProductosCompra = [];
    const urlObtenerCategoria = environment.urlComprasyPAgosWef.obtenerCategoria;
    const requestOfertaporCategoria = this.getrequestComprasyPagos();
    this.wcs.post(urlObtenerCategoria, requestOfertaporCategoria).subscribe(
      response => {

        const idRespuesta = response.comunResponseType.MessageResponse.Body.defaultServiceResponse.idRespuesta;
        const idRespuestaDP = response.comunResponseType.MessageResponse.Header.HeaderResponse.status.type;
        this.obtenerCategoriaResponse.idRespuesta = idRespuesta;
        if (Number(idRespuestaDP) === 0 && Number(idRespuesta) === 0) {
              const listCategoria = response.comunResponseType.MessageResponse.Body.listaCategoriasDeCompra;
              if (listCategoria != undefined) {
                lstCategoria = this.methodsService.converToArray(listCategoria);
                this.applyCanjeEventosWhitelistToCategories(listCategoria);

                if (this.wcmService.whitelistConfig[4].favorites.state == '1') {
                  for (let index = 0; index < lstCategoria.length; index++) {
                      if (lstCategoria[index].codCategoria == '22'
                      && this.wcmService.whitelistConfig[4].favorites.allowedNumbers.indexOf(this.servicioCompartido.msisdn) == -1) {
                        lstCategoria.splice(index, 1);
                      }
                  }
              }
                if (this.wcmService.whitelistConfig[7].claroVideos.state == '0') {
                  for (let index = 0; index < lstCategoria.length; index++) {
                      if (lstCategoria[index].codCategoria == '13'
                      && this.wcmService.whitelistConfig[7].claroVideos.allowedNumbers.indexOf(this.servicioCompartido.msisdn) == -1) {
                        lstCategoria.splice(index, 1);
                      }
                  }
                }

                if (this.wcmService.whitelistConfig[11].gamer.state == '1') {
                  for (let index = 0; index < lstCategoria.length; index++) {
                      if (lstCategoria[index].codCategoria == '95'
                      && this.wcmService.whitelistConfig[11].gamer.allowedNumbers.indexOf(this.servicioCompartido.msisdn) == -1) {
                        lstCategoria.splice(index, 1);
                      }
                  }
                }

                /*
                if (this.wcmService.whitelistConfig[8].roaming.state == '0') {
                  for (let index = 0; index < lstCategoria.length; index++) {
                      if (lstCategoria[index].codCategoria == '5'
                      && this.wcmService.whitelistConfig[8].roaming.allowedNumbers.indexOf(this.servicioCompartido.msisdn) == -1) {
                        lstCategoria.splice(index, 1);
                      }
                  }
                }
               
                
                  if (this.servicioCompartido.isONE) {
                     for (let index = 0; index < lstCategoria.length; index++) {
                         if ( lstCategoria[index].codCategoria == '5' ) {
                          lstCategoria.splice(index, 1);
                         }
                     }
                   }
                     */

                // CAMBIO TEMPORAL OCULTAR CATEGORIA ROAMMING EEUU PARA LINEAS ONE inicio
                /*for (let index = 0; index < lstCategoria.length; index++) {
                  if(lstCategoria[index].codCategoria==Constantes.WPSCategoriasDeCompra.internetRoaming && this.servicioCompartido.isONE){
                    console.log('Ocultamos internet roaming codCat 26 para lineas ONE');
                    lstCategoria.splice(index, 1);
                  }
                }*/
                // CAMBIO TEMPORAL OCULTAR CATEGORIA ROAMMING EEUU PARA LINEAS ONE fin


                this.obtenerCategoriaResponse.listaProductosCompra = lstCategoria;
              }
        } else {
          console.log('obtenerCategoria idRespuesta diferente de 0');
        }
        callback();
      },
      error => {
        console.log('Error obtenerCategoria', error);
        this.obtenerCategoriaResponse.errorService = true
        callback();
      }
    );
  }


  getrequestComprasyPagos() {
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

    return request;
  }


  applyCanjeEventosWhitelistToCategories(categoriesList) {
    if ((typeof this.wcmService.whitelistConfig  !== 'undefined')
        && this.wcmService.whitelistConfig
        && this.wcmService.whitelistConfig[0]
        && this.wcmService.whitelistConfig[0].canjeEventos
        && this.wcmService.whitelistConfig[0].canjeEventos.allowedNumbers.length > 0
        && this.wcmService.whitelistConfig[0].canjeEventos.state === '1') {
        const nroAutenticadoIndexInWhitelistArray = this.wcmService.whitelistConfig[0].canjeEventos.allowedNumbers
            .indexOf(this.servicioCompartido.msisdn);
        if (nroAutenticadoIndexInWhitelistArray == -1) {
            const categoriesListLength = categoriesList.length;
            for (let i = categoriesListLength - 1; i >= 0; i--) {
                if (categoriesList[i].codCategoria === Constantes.WPSCategoriasDeCompra.canjeEventos) {
                    categoriesList.splice(i, 1);
                }
            }
        }
    }
    return;

}


}



