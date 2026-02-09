import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WefClientService } from '../core/http/wef-client.service';

@Injectable({
  providedIn: 'root'
})
export class ObtenerSaldoGEService {

  constructor(private wefClienteService: WefClientService ) { }


  public obtenerCreditoSaldoResponse = {
    idRespuesta: null,
    errorService : false,
    creditoSaldo: {
      lblSaldoPrepago: '', 
      lblSimboloMonedaSaldoPrep: 'S/.'
    }
  };


 
  obtenerCreditoSaldoProducto(callback,data) {
    //console.log("obtenerCreditoSaldoProducto")
    //console.log(data)
    const urlObtenerCreditoSaldo = environment.urlComprasyPAgosWef.obtenerSaldo ;
    this.wefClienteService.post(urlObtenerCreditoSaldo, data)
    .subscribe(
      response => {
        //console.log(response)
        const rptaServicio = response.comunResponseType.MessageResponse
        let idRespuesta = rptaServicio.Body.defaultServiceResponse.idRespuesta;
        if (Number(idRespuesta) === 0) {
          this.obtenerCreditoSaldoResponse.idRespuesta = idRespuesta;
          this.obtenerCreditoSaldoResponse.creditoSaldo.lblSaldoPrepago = rptaServicio.Body.saldoLinea
          //console.log(this.obtenerCreditoSaldoResponse);
          callback();
        }else{
          this.obtenerCreditoSaldoResponse.creditoSaldo.lblSaldoPrepago = '0'
          callback();
        }
        },
      error => {
        //console.log('ObtenerCreditoSaldoService > obtenerCreditoSaldo error');
        //console.log(error)
        this.obtenerCreditoSaldoResponse.errorService = true
        callback();
        }
      );

  }
}
