import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ServicioCompartidoService } from 'src/app/core/services/servicio-compartido.service';
import { Constantes } from '../../services/constants';

declare const window: any;

@Component({
  selector: 'app-banner-descarga',
  templateUrl: './banner-descarga.component.html',
  styleUrls: ['./banner-descarga.component.scss']
})
export class BannerDescargaComponent implements OnInit {

  mostrarBannerPorCanalSinSaldo = false;
  canal = '';

  @Output() estadoBanner = new EventEmitter<boolean>();
  urlBanner = '';

  constructor(
    public servicioCompartido: ServicioCompartidoService
  ) { }

  ngOnInit() {
    this.canal = this.servicioCompartido.canal;
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const urlIOS = 'https://itunes.apple.com/pe/app/mi-claro-per%C3%BA/id785700933?mt=8';
    const urlAndroid = `https://play.google.com/store/apps/details?id=com.claro.pe.miclaro&hl=es"
                        title="" target="" type="button" class="btn btn-warning`;

    if (/android/i.test(userAgent)) {
        this.urlBanner = urlAndroid;
    }

    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      this.urlBanner = urlIOS;
    }

    this.mostrarBannerPorCanalSinSaldo = false;
    if (this.servicioCompartido.canal === Constantes.CANALES.SEGUIR_NAVEGANDO) {
      this.mostrarBannerPorCanalSinSaldo = true;
    }

  }

  cerrarBanner() {
    this.estadoBanner.emit(false);
  }

}
