import { WefClientService } from './../core/http/wef-client.service';
import { GlobalObjectService } from './global-object.service';
import { Injectable } from '@angular/core';
declare global {
  interface Window {
    terms: any;
    listas: any;
  }
}

@Injectable({
  providedIn: 'root',
})
export class WcmService {
  public terminos: any;
  public listaVideos: any;
  public listaGiftCards: any;
  public listaWCMOpciones: any;
  public listaWCMEvents: any;
  public listaWCMRecomendaciones: any;
  public paisesRoaming: any;
  public paisesRoamingSinFrontera: any;
  public whitelistConfig: any;
  public mensajeDegradaciones: any = null;
  public configBloqueos: any;
  public configMusicaWCM: any;
  public listaRecomendado: any;
  public ordenarRecomendados: any;
  public listaPopupRecargas: any;
  public listaPaquetesEtiquetados: any;
  
  public listaPaquetesGamer: any;
  public listaCarrousel: any;
  constructor(private globalObjectService: GlobalObjectService, private wcs: WefClientService) {}

  getMensajeDegradacionesMovil() {
    return this.mensajeDegradaciones[0][0];
  }
  getMensajeDegradacionesFijo() {
    return this.mensajeDegradaciones[0][1];
  }

  getMensajeDegradacionesPaqueteInalambrico() {
    return this.mensajeDegradaciones[0][2];
  }

  loadContent() {
    //console.log(this.globalObjectService.getObject('wcm'));
    this.terminos = this.globalObjectService.getObject('wcm').terms;
    this.listaVideos = this.globalObjectService.getObject(
      'wcm'
    ).listas.listaVideos;
    this.listaGiftCards = this.globalObjectService.getObject(
      'wcm'
    ).listas.listaGiftCards;
    this.listaWCMOpciones = this.globalObjectService.getObject(
      'wcm'
    ).listas.listaWCMOpciones;
    this.listaWCMEvents = this.globalObjectService.getObject(
      'wcm'
    ).listas.listaWCMEvents;
    this.listaWCMRecomendaciones = this.globalObjectService.getObject(
      'wcm'
    ).listas.listaWCMRecomendaciones;
    this.paisesRoaming = this.globalObjectService.getObject('paisesRoaming');
    this.paisesRoamingSinFrontera = this.globalObjectService.getObject(
      'paisesRoamingSinFrontera'
    );
    this.whitelistConfig = this.globalObjectService.getObject(
      'whitelistConfig'
    );
    this.configBloqueos = this.globalObjectService.getObject('configBloqueos');
    this.configMusicaWCM = this.globalObjectService.getObject(
      'wcm'
    ).listas.configWCMMusica;
    this.listaRecomendado = this.globalObjectService.getObject(
      'wcm'
    ).listas.listaFondoRecomendados;

    this.ordenarRecomendados = this.globalObjectService.getObject(
      'ordenarRecomendados'
    );
    this.listaPopupRecargas = this.globalObjectService.getObject(
      'wcm'
    ).listas.listaPopupRecarga;
    this.listaPaquetesEtiquetados = this.globalObjectService.getObject(
      'wcm'
    ).listas.listaPaquetesEtiquetados;
    this.listaPaquetesGamer = this.globalObjectService.getObject(
      'wcm'
    ).listas.listaPaquetesGamer;
    this.listaCarrousel = this.globalObjectService.getObject(
        'wcm'
    ).listas.listaCarrousel;

    console.groupCollapsed('WCM cargado');
    console.log('WCM contenido');
    console.log('terminos', this.terminos);
    console.log('listaVideos', this.listaVideos);
    console.log('listaGiftCards', this.listaGiftCards);
    console.log('listaWCMOpciones', this.listaWCMOpciones);
    console.log('listaWCMEvents', this.listaWCMEvents);
    console.log('configMusicaWCM', this.configMusicaWCM);
    console.log('listaWCMRecomendaciones', this.listaWCMRecomendaciones);
    console.log('paisesRoaming', this.paisesRoaming);
    console.log('paisesRoamingSinFrontera', this.paisesRoamingSinFrontera);
    console.log('whitelistConfig', this.whitelistConfig);
    console.log('mensajeDegradaciones', this.mensajeDegradaciones);
    console.log('configBloqueos', this.configBloqueos);
    console.log('listaRecomendado', this.listaRecomendado);
    console.log('ordenarRecomendados', this.ordenarRecomendados);
    console.log('listaPopupRecarga', this.listaPopupRecargas);
    console.log('listaPaquetesEtiquetados', this.listaPaquetesEtiquetados);
    console.log('listaPaquetesGamer', this.listaPaquetesGamer);
    console.log('listaCarrousel', this.listaCarrousel);
    console.groupEnd();
  }
  async getDataSynchronous(url) {
    const data = await this.wcs.getTextJs(url).toPromise();
    return data;
  }
  async loadDataIntoVariable(url, variable) {
    const data = await this.getDataSynchronous(url);
    (window as any).eval(data);
    this[variable] = this.globalObjectService.getObject(variable);
    //console.log('variable', this.mensajeDegradaciones);
  }

}
