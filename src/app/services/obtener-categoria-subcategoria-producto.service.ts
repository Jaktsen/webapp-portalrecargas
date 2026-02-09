import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WefClientService } from '../core/http/wef-client.service';


@Injectable({
  providedIn: 'root'
})
export class ObtenerCategoriaSubcategoriaProductoService {

  public obtenerCategoriasXproductoResponse: any = {
    idRespuesta: null,
    categoria_padre :'',
    categoria_hija:'',
    errorService: false
  };


  constructor(private wcs: WefClientService) { }

  obtenerCategoriaYsubCategoriaXproducto(callback,id) {
    const urlObtenerCategoria = environment.urlComprasyPAgosWef.obtenerCategoriasXproducto;
    const requestOfertaporCategoria = this.getrequestComprasyPagos(id);
    this.wcs.post(urlObtenerCategoria, requestOfertaporCategoria).subscribe(
      response => {      
        this.obtenerCategoriasXproductoResponse.idRespuesta = response.comunResponseType.MessageResponse.Body.defaultServiceResponse.idRespuesta;
        if(response.comunResponseType.MessageResponse.Body.categoriasXproduto){
          this.obtenerCategoriasXproductoResponse.categoria_padre = response.comunResponseType.MessageResponse.Body.categoriasXproduto.cod_categoria_padre
          this.obtenerCategoriasXproductoResponse.categoria_hija = response.comunResponseType.MessageResponse.Body.categoriasXproduto.cod_categoria
        }
        
        console.log(this.obtenerCategoriasXproductoResponse)
        callback();
      },
      error => {
        console.log('Error obtenerCategoriaXproducto', error);
        this.obtenerCategoriasXproductoResponse.errorService = true
        callback();
      }
    );
  }

  getrequestComprasyPagos(id) {
    const request = {
      idProducto: id,

    };

    return request;
  }
}
