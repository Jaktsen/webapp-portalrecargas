import { Injectable } from '@angular/core';
import { WefClientService } from '../core/http/wef-client.service';
import { ServicioCompartidoService } from './../core/services/servicio-compartido.service';
import { environment } from 'src/environments/environment';
import { Constantes } from './constants';
import { RecomendadoRequest } from '../shared/components/recomendadosRequest';
import { MethodsService } from 'src/app/services/methods.service';
import { WcmService } from '../services/wcm.service';


@Injectable({
  providedIn: 'root'
})
export class ProductosRecomendadosService {

  public obtenerRecomendadosResponse: any = {
    idRespuesta: null,
    listaProductosCompra: [],
    errorService: false
  };

  constructor(private wcs: WefClientService,
              private servicioCompartido: ServicioCompartidoService,
              private methodsService: MethodsService,
              private wcmService: WcmService) { }

  getProductosRecomendados(requestRecomendado: RecomendadoRequest, callback) {
    let listaProductosRecomendado = [];
    this.obtenerRecomendadosResponse.listaProductosCompra = [];
    const urlObtenerPaquetesSugeridos = environment.urlComprasyPAgosWef.obtenerPaquetesSugeridos;
    this.wcs.post(urlObtenerPaquetesSugeridos, requestRecomendado).subscribe(
      response => {
        try {
          const idRespuesta = response.comunResponseType.MessageResponse.Body.defaultServiceResponse.idRespuesta;
          const idRespuestaDP = response.comunResponseType.MessageResponse.Header.HeaderResponse.status.type;
          this.obtenerRecomendadosResponse.idRespuesta = idRespuesta;
          if (Number(idRespuestaDP) === 0 && Number(idRespuesta) === 0) {
              const listProductoRecom = response.comunResponseType.MessageResponse.Body.listaProductosDeCompra;
              if (listProductoRecom != undefined) {
                listaProductosRecomendado = this.methodsService.converToArray(listProductoRecom);
                this.applyWhitelist(listaProductosRecomendado, 1, 'prestame',
                    'catvCodCategoria', Constantes.WPSCategoriasDeCompra.prestameMegas);
                this.obtenerRecomendadosResponse.listaProductosCompra = listaProductosRecomendado;
              }
          } else {
            console.log('obtenerRecomendadosResponse idRespuestaDP diferente de 0');
            console.log('ERROR en Servicio obtenerRecomendadosResponse');
          }

          callback();
        } catch (error) {
          console.groupCollapsed('Error procesando respuesta obtenerRecomendadosResponse');
          console.error(error);
          this.obtenerRecomendadosResponse.idRespuesta = null;
          this.obtenerRecomendadosResponse.listaProductosCompra = [];
          console.groupEnd();
          callback();

        }
      },
      error => {
        console.log('Error obtenerRecomendadosResponse', error);
        this.obtenerRecomendadosResponse.errorService= true
        callback();
      }
    );

  }

  applyWhitelist(arrayToFilter, whitelistConfigOrder, whitelistConfigName, filteringField, filteringExpectedValue) {
    if ((typeof this.wcmService.whitelistConfig  !== 'undefined')
    && this.wcmService.whitelistConfig
    && this.wcmService.whitelistConfig[whitelistConfigOrder]
    && this.wcmService.whitelistConfig[whitelistConfigOrder][whitelistConfigName]
    && this.wcmService.whitelistConfig[whitelistConfigOrder][whitelistConfigName].allowedNumbers.length > 0
    && this.wcmService.whitelistConfig[whitelistConfigOrder][whitelistConfigName].state === '1') {
        const nroAutenticadoIndexInWhitelistArray
            = this.wcmService.whitelistConfig[whitelistConfigOrder][whitelistConfigName]
            .allowedNumbers.indexOf(this.servicioCompartido.msisdn);
        if (nroAutenticadoIndexInWhitelistArray == -1) {
            const arrayToFilterLength = arrayToFilter.length;
            for (let i = arrayToFilterLength - 1; i >= 0; i--) {
                    if (arrayToFilter[i][filteringField] === filteringExpectedValue) {
                        arrayToFilter.splice(i, 1);

                    }
            }
        }
  }
    return;
  }


}
