import { GlobalObjectService } from 'src/app/services/global-object.service';
import { WcmService } from './services/wcm.service';
import { MethodsService } from './services/methods.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Constantes } from './services/constants';
import { QueryStringService } from './services/query-string.service';
import { Router } from '@angular/router';

declare var $: any;
declare const window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'webapp-portalrecargas-angular8';
  idleTime = 0;
  showFooter = true;
  urlCanal = null;
  idxp = null;
  mp = null;

  constructor(
    private qss: QueryStringService,
    private wcmService: WcmService,
    private router: Router,
    private go: GlobalObjectService,
    private ms: MethodsService
  ) {}

  ngOnInit() {


    this.qss.extraerQueryStringMultiple([
      'canal',
      'rec',
      'admin',
      'num',
      'root',
      'token',
      'idxp',
      'mp'
    ]);


    this.idxp = this.qss.getQueryString('idxp');
    if(this.idxp == null){
      this.idxp == 0;

    }
    this.mp = this.qss.getQueryString('mp');
        
    if(this.mp == null || this.mp == 'null'){

      this.mp == 0;
  }

    this.urlCanal = this.qss.getQueryString('canal');

    if (!this.urlCanal) {
      this.urlCanal = sessionStorage.getItem('canal');
    }
    const isMCWEmbedded = this.ms.isValueContainedInArray(
      this.urlCanal,
      Constantes.CanalesIntegradosMCW
    );

    this.showFooter = !isMCWEmbedded;

    if (this.urlCanal === Constantes.CANALES.MICLARO_CORPO || this.urlCanal === Constantes.CANALES.MICLARO_WEB) {
      this.showFooter = true;
    }

    this.go.savePortalComprasMotorPagosCallbackUrl();
    this.wcmService.loadContent();
    const mpToken = this.qss.getQueryString('token');

    const queryStringCanal = this.qss.getQueryString('canal');
    sessionStorage.setItem('tCanal', queryStringCanal != null ? queryStringCanal : sessionStorage.getItem('canal'));
    const queryStringRecarga = this.qss.getQueryString('rec');
    sessionStorage.setItem('tRec', queryStringRecarga != null ? queryStringRecarga : sessionStorage.getItem('recarga'));
    this.iniciarTimeoutSesion();

    if (mpToken) {
      this.router.navigateByUrl('/confirma', { queryParams: { token: mpToken }, skipLocationChange: true });
      return;
    } else {
       if (environment.urlComprasyPAgosMiClaroApp && environment.urlComprasyPAgosMiClaroApp.token != Constantes.EMPTY_STRING) {
        sessionStorage.setItem('isEmbeddedChannel', '1');
        sessionStorage.setItem('embeddedToken', environment.urlComprasyPAgosMiClaroApp.token);
      } else {
        sessionStorage.setItem('isEmbeddedChannel', '0');
        sessionStorage.setItem('embeddedToken', '');
      }
    }

    this.router.navigateByUrl('/inicio', { skipLocationChange: true });
  }

  iniciarTimeoutSesion() {
    window.idleTime = 0;
    setInterval(this.timerIncrement, 1000 * 60); // 1 minuto

    // si se realiza alguna accion se reinicia
    $(window.document).mousemove(e => {
      window.idleTime = 0;
    });
    $(window.document).on('touchstart', e => {
      window.idleTime = 0;
    });
    $(window.document).click(e => {
      window.idleTime = 0;
    });
    $(window.document).keypress(e => {
      window.idleTime = 0;
    });
    $(window.document).on('scroll', e => {
      window.idleTime = 0;
    });
  }

  timerIncrement() {
    window.idleTime += 1;
    setTimeout(() => {
      if (window.idleTime >= Constantes.WPSSessionTimeout.threshold) {
        let reloadUrl = '';
        if (
          environment.urlComprasyPAgosMiClaroApp &&
          environment.urlComprasyPAgosMiClaroApp.token != ''
        ) {
          reloadUrl =
            Constantes.urlPortal.portalInternetClaro +
            '?cn=' +
            sessionStorage.getItem('canal') +
            '&listnum=' +
            environment.urlComprasyPAgosMiClaroApp.token;
        } else if (Constantes.PORTAL_FLOW.RECARGAS_CANALES.indexOf(sessionStorage.getItem('tCanal')) > -1
            && sessionStorage.getItem('tRec') == '1') {
          const tCanal = sessionStorage.getItem('tCanal');
          reloadUrl = `${Constantes.urlPortal.portalInternetClaro}?cn=${tCanal}&rec=1`;
        } else if (sessionStorage.getItem('canal') == '2' || sessionStorage.getItem('canal') == '3'
            || sessionStorage.getItem('canal') == '9') {
          reloadUrl =
            Constantes.urlPortal.portalInternetClaro +
            '?cn=' +
            sessionStorage.getItem('canal') +
            '&listnum=' +
            environment.urlComprasyPAgosMiClaroApp.token;
        } else {
          reloadUrl = Constantes.urlPortal.portalInternetClaro;
        }
        window.location.href = reloadUrl;
      }
    }, 2 * 1000);
  }
}
