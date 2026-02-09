import { GlobalObjectService } from 'src/app/services/global-object.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MethodsService } from '../../services/methods.service';
import { ServicioCompartidoService } from '../../core/services/servicio-compartido.service';
import { Constantes } from '../../services/constants';
import { QueryStringService } from 'src/app/services/query-string.service';
import { DataLayerService } from 'src/app/services/data-layer.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  mostrarContenido = false;
  autenticado = false;
  fuenteIngreso = '';
  notRootOrigin = true;



  constructor(private queryStringService: QueryStringService,
              public servicioCompartido: ServicioCompartidoService, private router: Router, private go: GlobalObjectService,
              private ms: MethodsService,private _dataLayer: DataLayerService) { }

  ngOnInit() {
    this.iniciarPagina();
  }



  iniciarPagina() {
    const numeroQuery = this.queryStringService.getQueryString('num');
    const flagRoot = this.queryStringService.getQueryString('root');
    this.notRootOrigin = flagRoot != '1';
    const canal = this.queryStringService.getQueryString('canal');
    const recarga = this.queryStringService.getQueryString('rec');
    const admin = this.queryStringService.getQueryString('admin');


    sessionStorage.setItem('canal', canal);
    sessionStorage.setItem('recarga', recarga);

    this.servicioCompartido.canal = canal;
    this.servicioCompartido.recarga = (recarga === '1');


    this.servicioCompartido.isAdmin = (admin != null && admin != '') ? admin : '0';
    this.servicioCompartido.isblockCR = canal == 9 && (admin == 1 || admin == '1') ;
    this.servicioCompartido.embedded = this.ms.isValueContainedInArray(canal, Constantes.CanalesIntegradosMCW);

    if (this.requestComesFromRootComprasPage()) {
      if (numeroQuery !== '' && numeroQuery != null && numeroQuery !== undefined) {
        this.autenticado = true;
        this.fuenteIngreso = 'HEADER';
      } else {
        console.log('No autenticado solo con root 1');
        this.autenticado = false;
        this.fuenteIngreso = 'WEB';
      }
       if (this.ms.isFlowPortalRecargasAllRec()) {
         this.autenticado = numeroQuery ? true : false;
         this.fuenteIngreso = 'WEB';
         this.servicioCompartido.isRechargeAnonymous = numeroQuery ? false : true;
       }
    } else {
      window.location.replace(Constantes.urlPortal.portalInternetClaro); 
    }

    
    if (this.shouldAdvanceToHomePage()) {
      const objDatosCliente = {
        msisdn: numeroQuery,
        idProductoServicio: '51' + numeroQuery,
        fuenteIngreso: this.fuenteIngreso,
        autenticado: this.autenticado,
        esMiClaro: '',
        tipoLinea: '',
        tipoCliente: '',
        tipoPermiso: '',
        planRoaming: '',
        pivot: ''
      };
      this.servicioCompartido.actualizarDatos(objDatosCliente);

      this.router.navigateByUrl('/home', { skipLocationChange: true });
    } else if (this.shouldStayAndHideContent(canal)) {
        console.log( `Canal ${canal} no se muestra contenido de inicio (login)`);
        this.mostrarContenido = false;
    } else {
        this.mostrarContenido = true;
    }
  }

  requestComesFromRootComprasPage() {
    return this.queryStringService.getQueryString('root') === '1';
  }

  shouldAdvanceToHomePage() {
    return this.autenticado === true
     || (this.ms.isFlowPortalRecargasAllRec());
  }

  shouldStayAndHideContent(canal) {
    return this.ms.isValueContainedInArray(canal, Constantes.CanalesIntegradosMCW);
   }

  habilitarContenido(val: boolean) {
    this.mostrarContenido = val;
  }

  goToLink() {
    this._dataLayer.gtm_Event_paquete_cambiar("compras_banner_visita_tienda_click","visita tienda claro")
    this.go.goToLink('https://tiendaclaro.pe/?utm_source=portal_compras&utm_medium=banner_catalogo&utm_campaign=banner_catalogo');
  }


}
