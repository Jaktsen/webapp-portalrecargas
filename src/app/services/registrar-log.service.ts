import { WefClientService } from './../core/http/wef-client.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrarLogService {

  constructor(private wcs: WefClientService) { }

  registrarLogSP(comentario: any, data: any) {
    console.log('Registrando log SP', comentario, data);
    this.wcs.postCommentData(environment.urlComprasyPAgosWef.registrarLogSP, comentario, data).subscribe(() => { });
  }

}
