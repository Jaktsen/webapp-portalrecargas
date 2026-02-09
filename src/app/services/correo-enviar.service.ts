import { Injectable } from '@angular/core';
import { WefClientService } from '../core/http/wef-client.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CorreoEnviarService {

  constructor(private wcs: WefClientService) { }

  enviarNotificacion(request: any) {
    return this.wcs.post(environment.urlComprasyPAgosWef.enviarNotificaciones, request);
}
}
