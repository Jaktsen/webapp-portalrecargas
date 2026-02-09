import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WefClientService } from '../core/http/wef-client.service';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EnviarTokenService {

  constructor(private wcs: WefClientService) { }

  enviarTokenxSMS(request: any) {
    return this.wcs.post(environment.urlComprasyPAgosWef.enviarTokenxSMS, request);
  }

  validarTokenxSMS(token: string) {
    const request = {
      codigoSecreto: token
    };

    return this.wcs
        .post(environment.urlComprasyPAgosWef.validarTokenIngresado, request)
        .pipe(
          map((response) => {
            console.log('Servicio EnviarTokenService -> validarTokenxSMS ');
            const idRespuesta = response.comunResponseType.MessageResponse.Body.defaultServiceResponse.idRespuesta;
            const idRespuestaDP = response.comunResponseType.MessageResponse.Header.HeaderResponse.status.type;
            return Number(idRespuesta) === 0 && Number(idRespuestaDP) === 0;
          }),
          catchError((error) => {
            console.error('Error Servicio EnviarTokenService -> validarTokenxSMS ', error);
            return of(false);
          })
        );
  }
}
