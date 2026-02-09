import { MethodsService } from './methods.service';
import { Injectable } from '@angular/core';
import { WefClientService } from '../core/http/wef-client.service';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ServiciosPagosService {

  constructor(private wefClienteService: WefClientService, private ms: MethodsService) { }

  regInicioTransaccionPagoTC(request: any) {
    if (this.ms.isFlowPortalRecargas()) {
      return this.wefClienteService.post(environment.urlComprasyPAgosWef.registrarRecargaTC, request);
    } else {
      return this.wefClienteService.post(environment.urlComprasyPAgosWef.regInicioTransaccionPagoTC, request);
    }
  }

  regFinTransaccionPagoTC(request: any) {
    if (this.ms.isFlowPortalRecargas()) {
      return this.wefClienteService.post(environment.urlComprasyPAgosWef.finalizarRecargaTC, request);
    } else {
      return this.wefClienteService.post(environment.urlComprasyPAgosWef.regFinTransaccionPagoTC, request);
    }
  }
}
