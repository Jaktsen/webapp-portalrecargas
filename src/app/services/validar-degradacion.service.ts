import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WefClientService } from '../core/http/wef-client.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarDegradacionService {

  constructor(private wefClienteService: WefClientService) { }

  public validarDegradacionResponse = {
    idRespuesta: null,
    idSesion : null,
    idTransaccional:null,
    mensaje:null,
    degradado:null,
    IdentificadorUsuarioToBeRequestType : {
      idContrato : "",
      coIdPub : "",
      csId  : "",
      contractIdPub :  ""
    }

  };

  validarDegradacionServ(callback,data) {
    const urlValidarDegradacion = environment.urlComprasyPAgosWef.validarDegradacion;
    this.wefClienteService.post(urlValidarDegradacion, data)
    .subscribe(
      response => {
        //console.log(response)
        const rptaServicio = response.comunResponseType.MessageResponse
        let idRespuesta = rptaServicio.Body.defaultServiceResponse.idRespuesta;
        if (idRespuesta === "0") {
          this.validarDegradacionResponse.idRespuesta = idRespuesta;
          this.validarDegradacionResponse.idSesion = rptaServicio.Body.defaultServiceResponse.idSesion
          this.validarDegradacionResponse.idTransaccional = rptaServicio.Body.defaultServiceResponse.idTransaccional
          this.validarDegradacionResponse.mensaje = rptaServicio.Body.defaultServiceResponse.mensaje
          this.validarDegradacionResponse.degradado = rptaServicio.Body.degradacion.degradado
          if(rptaServicio.Body.degradacion.identificadorUsuarioToBeRequest){
            this.validarDegradacionResponse.IdentificadorUsuarioToBeRequestType.idContrato = rptaServicio.Body.degradacion.identificadorUsuarioToBeRequest.idContrato
            this.validarDegradacionResponse.IdentificadorUsuarioToBeRequestType.coIdPub = rptaServicio.Body.degradacion.identificadorUsuarioToBeRequest.coIdPub
            this.validarDegradacionResponse.IdentificadorUsuarioToBeRequestType.csId = rptaServicio.Body.degradacion.identificadorUsuarioToBeRequest.csId
            this.validarDegradacionResponse.IdentificadorUsuarioToBeRequestType.contractIdPub = rptaServicio.Body.degradacion.identificadorUsuarioToBeRequest.contractIdPub
          }
          callback();
        }else {
          this.validarDegradacionResponse.idSesion =
            rptaServicio.Body.defaultServiceResponse.idSesion;
          this.validarDegradacionResponse.idTransaccional =
            rptaServicio.Body.defaultServiceResponse.idTransaccional;
          this.validarDegradacionResponse.mensaje =
            rptaServicio.Body.defaultServiceResponse.mensaje;
            this.validarDegradacionResponse.idRespuesta = idRespuesta  
            callback();
        }    
          

  
        },
      error => {
        //console.log('validarDegradacionService > validarDegradacion error');
        //console.log(error)
        this.validarDegradacionResponse.idRespuesta == '1'
        callback();
        }
      );

  }

}
