import { Constantes } from './../../services/constants';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded;charset=utf-8',
    // 'Access-Control-Allow-Origin': "*"
  })
};


@Injectable({
  providedIn: 'root'
})
export class WefClientService {

  constructor(private http: HttpClient) { }

  get(url: string): Observable<any> {
    const urlFullServ = this.obtieneURLServidor(url);

    return this.http.get(urlFullServ).pipe(catchError(error => {
      return throwError(error);
   }));
  }


  getTextJs(url: string): Observable<any> {
    return this.http.get(url, {
      headers: new HttpHeaders({
        Accept: 'text/js',
        'Content-Type': 'text/js'
      }),
      responseType: 'text'
    });
  }

  post(url: string, body: any): Observable<any> {

    const urlFullServ = this.obtieneURLServidor(url);

    if (environment.production) {
        let data = new HttpParams();
        data =  data.set('requestJson', JSON.stringify(body));
        return this.http.post(urlFullServ, data, httpOptions);
    } else {
        url = this.prepararMockUrl(url, body);
        return this.http.get(url);
    }
  }
  private prepararMockUrl(url: string, body: any) {
    if (url.indexOf('obtenerOfertaporCategoria') > -1) {
      if (body.codigoCategoria.indexOf(Constantes.PREFIJO_PERU) > -1 && body.codigoCategoria.length >= 7) {
        url = 'assets/mocks/obtenerOfertaporCategoriaFav.json';
      } else {
        switch (body.codigoCategoria) {
          case Constantes.WPSCategoriasDeCompra.recargas:
            url = 'assets/mocks/obtenerProductos/obtenerProductosOfertaRecarga.json';
            break;
          case Constantes.WPSCategoriasDeCompra.gifCard1:
            url = 'assets/mocks/obtenerProductos/giftcard/giftcard-gb.json';
            break;
          case Constantes.WPSCategoriasDeCompra.gifCard2:
            url = 'assets/mocks/obtenerProductos/giftcard/giftcard-redes.json';
            break;
          case Constantes.WPSCategoriasDeCompra.canjeEventosSub1:
          case Constantes.WPSCategoriasDeCompra.canjeEventosSub2:
          case Constantes.WPSCategoriasDeCompra.canjeEventosSub3:
          case Constantes.WPSCategoriasDeCompra.canjeEventosSub4:
          case Constantes.WPSCategoriasDeCompra.canjeEventosSub5:
            url = 'assets/mocks/obtenerProductos/obtenerProductosEventos.json';
            break;
          case Constantes.WPSCategoriasDeCompra.internetRoaming:
            url = 'assets/mocks/obtenerProductos/internet-roaming.json';
            break;
          case Constantes.WPSCategoriasDeCompra.paquetesExclusivosOnline:
            url = 'assets/mocks/obtenerProductos/exclusivo_online/obtenerProductosExclusivoOnline.json';
            break;
          case '8':
            url = 'assets/mocks/obtenerProductos/obtenerOfertaxCategoriaRoaming.json';
            break;
          case Constantes.WPSCategoriasDeCompra.claroMusica:
            url = 'assets/mocks/obtenerOfertaxCategoriaClaroMusica.json';
            break;
            case Constantes.WPSCategoriasDeCompra.paquetesGamer:
              url = 'assets/mocks/obtenerOfertaxCategoriaPaquetesGamer.json';
              break;
          case Constantes.WPSCategoriasDeCompra.videos:
            url = 'assets/mocks/obtenerProductos/obtenerProductosOfertaClaroVideo.json';
            break;
          case Constantes.WPSCategoriasDeCompra.recuperaTuVelocidad:
            url = 'assets/mocks/obtenerProductos/obtenerProductosOfertaRecuperaTuVelocidad.json';
            break;
          case Constantes.WPSCategoriasDeCompra.velocidad:
            url = 'assets/mocks/obtenerProductos/obtenerProductosOfertaAltaVelocidad.json';
            break;
          case Constantes.WPSCategoriasDeCompra.llamadasIlimitadas:
          case Constantes.WPSCategoriasDeCompra.minutosInternacionales:
            url = 'assets/mocks/obtenerProductos/obtenerProductosSMSyMinutos.json';
            break;
            case Constantes.WPSCategoriasDeCompra.recuperaTuVelocidad:
              url = 'assets/mocks/obtenerProductos/obtenerProductosOfertaRecuperaTuVelocidad.json';
              break;
          default:
            break;
        }
      }

    }
    return url;
  }


  postCommentData(url: string, comment: any, data: any): Observable<any> {

    const urlFullServ = this.obtieneURLServidor(url);
    const request = { data: JSON.stringify(data), comentario: JSON.stringify(comment) } ;

    if (environment.production) {
        let dataPost = new HttpParams();
        dataPost =  dataPost.set('requestJson', JSON.stringify(request));
        return this.http.post(urlFullServ, dataPost, httpOptions);
    } else {
        return this.http.get(url);
    }
  }


  obtieneURLServidor(urlParam: any) {
    return urlParam;
  }

}
