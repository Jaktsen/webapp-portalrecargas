import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Constantes } from 'src/app/services/constants';
import { MethodsService } from 'src/app/services/methods.service';
import { environment } from 'src/environments/environment';
declare var android: any;
declare var window: any;

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})

export class ErrorComponent implements OnInit {
  @Input() errorService:boolean =false;
  @Input() errorSinPaquetes:boolean =false;
  @Output() isClick = new EventEmitter<boolean>(false);

  constructor(private ms: MethodsService) { }

  ngOnInit() {
  }

  cambiarNumero(){
    this.isClick.emit(true)
  }

  irDeVuelta(rec: boolean) {
    if (
      sessionStorage.getItem('canal') == '3' &&
      sessionStorage.getItem('isEmbeddedChannel') == '1'
    ) {


      window.location.replace(
      Constantes.urlPortal.portalInternetClaro +
      '?cn=' +
      Constantes.CANALES.MICLARO_APP +
      '&listnum=' +
      environment.urlComprasyPAgosMiClaroApp.token
      );
      
    } else if (
      environment.urlComprasyPAgosMiClaroApp &&
      environment.urlComprasyPAgosMiClaroApp.token != Constantes.EMPTY_STRING &&
      this.ms.isValueContainedInArray(
        sessionStorage.getItem('canal'),
        Constantes.CanalesIntegradosMCW
      )
    ) {
      // canales integrados MCW masivo y corporativo y miclaroapp
      window.location.replace(
        Constantes.urlPortal.portalInternetClaro +
          '?cn=' +
          sessionStorage.getItem('canal') +
          '&listnum=' +
          environment.urlComprasyPAgosMiClaroApp.token
      );
    } else if (this.ms.isFlowPortalRecargas() && rec) {
      const canal = sessionStorage.getItem('canal');
      window.location.href = Constantes.urlPortal.portalInternetClaro + `?cn=${canal}&rec=1`;
    } else {
      window.location.replace(Constantes.urlPortal.portalInternetClaro);
    }
  }
}