import { MethodsService } from 'src/app/services/methods.service';
import { GlobalObjectService } from './global-object.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WefClientService } from '../core/http/wef-client.service';
import { ServicioCompartidoService } from '../core/services/servicio-compartido.service';
import { MantenimientoFavoritosRequest } from '../shared/components/mantenimientoFavoritosRequest';
import { ObtenerOfertasxCategoriaFavoritosRequest } from '../shared/components/obtenerOfertasxCategoriaFavoritos';
import { Constantes } from './constants';


@Injectable({
    providedIn: 'root'
})
export class ProductosFavoritosService {

    public obtenerFavoritosResponse: any = {
        idRespuesta: null,
        listaProductosFavoritos: [],
        errorService: false
    };

    constructor(private servicioCompartido: ServicioCompartidoService,
                private wefClienteService: WefClientService,
                private go: GlobalObjectService,
                private methodsService: MethodsService
    ) { }

    resetObtenerFavoritosResponse() {
        this.obtenerFavoritosResponse = {
            idRespuesta: null,
            listaProductosFavoritos: [],
            
        };
    }


    ejecutarMantenimientoFavorito(request) {
        const urlMantenimientoFavorito = environment.urlComprasyPAgosWef.mantenimientoFavoritos;
        this.wefClienteService.post(urlMantenimientoFavorito, request).subscribe(
            response => {
                //console.log('ejecutarMantenimientoFavorito', response);
            },
            error => {
                console.error('Error mantenimientoFavorito', error);
            }
        );
    }

    flujoFav(indicador) {
        this.go.sessionStorageSave(Constantes.flagFav, indicador);
    }

    eliminarFavorito = function(aEliminar, listaProductosFavoritos) {
        const request = new MantenimientoFavoritosRequest(aEliminar.idProductoDeCompra, 'E', aEliminar.codMetodoPagoFav);
        const idem = listaProductosFavoritos.indexOf(aEliminar);
        //console.log('Eliminando favorito %O', aEliminar);
        listaProductosFavoritos.splice(idem, 1);
        this.go.sessionStorageSave(Constantes.CANT_ACTUAL_label, listaProductosFavoritos.length);
        this.ejecutarMantenimientoFavorito(request);
    };

    noTieneCategoriaHabilitadaParaSerFavorito(catvCodCategoria) {
        return (catvCodCategoria === Constantes.WPSCategoriasDeCompra.paquetesRecomendados
            || catvCodCategoria === Constantes.WPSCategoriasDeCompra.prestameMegas
            || catvCodCategoria === Constantes.WPSCategoriasDeCompra.canjeEventos
            || catvCodCategoria === Constantes.WPSCategoriasDeCompra.canjeEventosSub1
            || catvCodCategoria === Constantes.WPSCategoriasDeCompra.canjeEventosSub2
            || catvCodCategoria === Constantes.WPSCategoriasDeCompra.canjeEventosSub3
            || catvCodCategoria === Constantes.WPSCategoriasDeCompra.canjeEventosSub4
            || catvCodCategoria === Constantes.WPSCategoriasDeCompra.canjeEventosSub5
            || catvCodCategoria === Constantes.WPSCategoriasDeCompra.gifCard
            || catvCodCategoria === Constantes.WPSCategoriasDeCompra.gifCard1
            || catvCodCategoria === Constantes.WPSCategoriasDeCompra.gifCard2
            || catvCodCategoria === Constantes.WPSCategoriasDeCompra.gifCard3
            || catvCodCategoria === Constantes.WPSCategoriasDeCompra.videos);
    }

    handleError(error, callback) {
        //console.log('ProductosFavoritosService > obtenerFavoritos error');
        console.error('Error obtenerFavoritos', error);
        //console.log('Response final []');
        this.resetObtenerFavoritosResponse();
        this.obtenerFavoritosResponse.errorService = true
        console.groupEnd();
        callback();
    }

    obtenerFavoritos(callback) {

        let listaProductosFavoritos = [];
        this.obtenerFavoritosResponse.listaProductosFavoritos = [];
        const requestFavoritos = new ObtenerOfertasxCategoriaFavoritosRequest(
            this.servicioCompartido.msisdn, Constantes.PREFIJO_PERU + this.servicioCompartido.msisdn
        );
        const urlObtenerOfertaporCategoria = environment.urlComprasyPAgosWef.obtenerOfertas;
        this.resetObtenerFavoritosResponse();
        this.wefClienteService.post(urlObtenerOfertaporCategoria, requestFavoritos)
            .subscribe(
                response => {
                    try {
                        const idRespuesta = response.comunResponseType.MessageResponse.Body.defaultServiceResponse.idRespuesta;
                        const idRespuestaDP = response.comunResponseType.MessageResponse.Header.HeaderResponse.status.type;
                        if (Number(idRespuestaDP) === 0 && Number(idRespuesta) === 0) {
                            this.obtenerFavoritosResponse.idRespuesta = idRespuesta;
                            const listProducto = response.comunResponseType.MessageResponse.Body.listaProductosDeCompra;
                            if (listProducto) {
                                listaProductosFavoritos = this.methodsService.converToArray(listProducto);
                                const LP = listaProductosFavoritos.length;
                                for (let h = 0; h < LP; h++) {
                                    let j = 0;
                                    if (this.noTieneCategoriaHabilitadaParaSerFavorito(listaProductosFavoritos[j].catvCodCategoria)) {
                                        this.eliminarFavorito(listaProductosFavoritos[j], listaProductosFavoritos);
                                        j = 0;
                                    } else {
                                        j++;
                                    }
                                }
                                const lengthPlanes = listaProductosFavoritos.length;
                                this.go.sessionStorageSave(Constantes.CANT_ACTUAL_label, listaProductosFavoritos.length.toString());

                                if (lengthPlanes > 0) {
                                    if (lengthPlanes === 1) {
                                        this.go.sessionStorageSave(Constantes.CANT_FAVORITOS_label, listProducto.cantidadFavoritos);
                                    } else {
                                        this.go.sessionStorageSave(Constantes.CANT_FAVORITOS_label, listProducto[0].cantidadFavoritos);
                                    }
                                }

                                listaProductosFavoritos.sort((a, b) => (b.catvCodCategoria > a.catvCodCategoria ? 1 : -1));


                                listaProductosFavoritos.forEach(prod => {
                                    if (prod.listaCaracteristicasProducto != null) {
                                        prod.listaCaracteristicasProducto = this.methodsService
                                            .converToArray(prod.listaCaracteristicasProducto);
                                    } else {
                                        prod.listaCaracteristicasProducto = [];

                                    }
                                });

                                this.obtenerFavoritosResponse.listaProductosFavoritos = listaProductosFavoritos;
                            } else {
                                this.go.sessionStorageSave(Constantes.CANT_ACTUAL_label, '0');
                            }
                        }
                    } catch (error) {
                        this.handleError(error, callback);
                    }
                    callback();
                },
                error => {
                    this.handleError(error, callback);
                    this.obtenerFavoritosResponse.errorService = true
                }
            );
    }

    mantenimientoFavorito(request: any) {
        return this.wefClienteService.post(environment.urlComprasyPAgosWef.mantenimientoFavoritos, request);
    }
}
