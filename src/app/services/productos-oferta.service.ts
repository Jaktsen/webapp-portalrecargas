import { WcmService } from './wcm.service';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { WefClientService } from '../core/http/wef-client.service';
import { ProductosOfertaRequest } from '../shared/components/productosOfertaRequest';
import { Constantes } from './constants';
import { MethodsService } from './methods.service';


@Injectable({
  providedIn: 'root'
})
export class ProductosOfertaService {
  flagAgregar: boolean = false;
  constructor(private wefClientService: WefClientService, private methodsService: MethodsService, private wcmService: WcmService) { }

  obtenerOfertas(categoriaSeleccionada: any, zona?: any) {
    const productosOfertaRequest = new ProductosOfertaRequest(categoriaSeleccionada, zona);
    return this.wefClientService.post(environment.urlComprasyPAgosWef.obtenerOfertas, productosOfertaRequest).pipe(
      map((response) => {
        console.log('Servicio ProductosOfertaService -> obtenerOfertas ');
        let listaProductosDeCompra = [];
        const idRespuesta = response.comunResponseType.MessageResponse.Body.defaultServiceResponse.idRespuesta;
        const idRespuestaDP = response.comunResponseType.MessageResponse.Header.HeaderResponse.status.type;
        if (Number(idRespuestaDP) === 0 && Number(idRespuesta) === 0) {
          const listProducto = response.comunResponseType.MessageResponse.Body.listaProductosDeCompra;
          console.log('responseList', response);
            if (Number(categoriaSeleccionada.codCategoria) !== Number(Constantes.WPSCategoriasDeCompra.videos)) {
              //console.log('Videosss');
              
              if (!this.methodsService.isCurrentCategoryGiftCard(categoriaSeleccionada)) {
             
                
                // productos comunes
                //console.log('obteniendo productos no especiales - flujo general');
                //listaProductosDeCompra = this.methodsService.converToArray(listProducto);
                console.log('obteniendo productos no especiales - flujo general');
                if(categoriaSeleccionada.codCategoria != '17'){
                const listaTemporal = this.methodsService.converToArray(listProducto);
                var listaTemporal2 = [];
                //console.log('listaTemporal');
              
                //console.log(listaTemporal);
                for (const px of listaTemporal) {
                     
                  this.flagAgregar = false;
                  //console.log('array');
                  listaTemporal2 = this.methodsService.converToArray(px.listaCaracteristicasProducto)
  
                  if (listaTemporal2 && listaTemporal2.length > 0) {

                    
                    for (const caract of listaTemporal2 ) {
                                          
                     if(caract.estilo == 'titulo_rojo' || caract.estilo == 'titulo_rojo titulo_rojo_69' ){
                      this.flagAgregar = true;
                      
                     }
                    }
                    if(this.flagAgregar){
                                      
                      listaProductosDeCompra.push(px)
                    }
                  }
                }
              }
                listaProductosDeCompra = this.methodsService.converToArray(listProducto);
                // ordenamiento de caracteristicas orderBy 'orden'
                listaProductosDeCompra.forEach(prod => {
                  if (prod.listaCaracteristicasProducto && prod.listaCaracteristicasProducto.length > 1 ) {
                    //console.log('ordennnn');
                    
                    prod.listaCaracteristicasProducto.sort((a, b) => Number(a.orden) - Number(b.orden));
                  }
                });

                // TODO canje eventos y roaming
                // if ($scope.isCurrentCategoryCanjeEventos()) {
                  //   $scope.listaProductosDeCompra = inyectarWCMProductos($scope.listaProductosDeCompra);
                  // }
                  // mostrarOfertasRoaming($scope.listaProductosDeCompra);
                } else {
                console.log('obteniendo productos giftcard');
                const listaGiftCardsPro = [];
                listaProductosDeCompra = this.methodsService.converToArray(listProducto);
                const listaGiftCardsWCM = this.wcmService.listaGiftCards;
                listaGiftCardsWCM.forEach( s =>
                  listaProductosDeCompra.forEach( e => {
                    if (e.idProductoDeCompra === s.idProductoDeCompra) {
                      e.wcm = s;
                      e.dedicatoria = {
                        nombre_solicitante: '',
                        nombre_destinatario: '',
                        mensaje_opc: ''
                      };
                      listaGiftCardsPro.push(e);
                    }
                  })
                );
                // ordenamiento de caracteristicas orderBy 'wcm.ordenOferta'
                listaGiftCardsPro.sort((a, b) => Number(a.wcm.ordenOferta) - Number(b.wcm.ordenOferta));
                listaProductosDeCompra = listaGiftCardsPro;
            }
            } else {
              // TODO claro videos
              listaProductosDeCompra = this.methodsService.converToArray(listProducto);
              console.log('listaProd ', listaProductosDeCompra);
              console.log('else videoss');
              
            }

            // modificar estilos caracteristicas de productos Paquetes Exclusivos Online
            for (const px of listaProductosDeCompra) {
              if (Number(px.codTipoLinea) === Number(Constantes.WPSTipoLinea.prepago)
                && Number(px.catvCodCategoria) === Number(Constantes.WPSCategoriasDeCompra.paquetesExclusivosOnline)) {
                for (const caract of px.listaCaracteristicasProducto ) {
                  caract.estilo += ' titulo_rojoMP';
                }
              }
            }

            // modificar estilos caracteristicas de productos Paquetes Exclusivos Online
            // ordenamiento en la version antigua se ordenaban por el campo ordenOferta (el cual no llega de BD),
            // es decir no existia ordenamiento en front
            console.log('response:');
            console.table(listaProductosDeCompra, ['nombreProducto', 'idProductoDeCompra', 'catvTitulo', 'catnId', 'catvCodCategoria']);
        }
        console.groupEnd();
        return listaProductosDeCompra;
      }),
      catchError(
        error => {
          console.log('Error obtenerOfertas', error);
          const responseError = [];
          console.log('response:', responseError);
          console.groupEnd();
          return responseError;
        }
      )
    );

  }
}
