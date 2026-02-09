import { ServicioCompartidoService } from './../core/services/servicio-compartido.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WefClientService } from '../core/http/wef-client.service';
import { Constantes } from './constants';
import { IdentificarUsuarioRequest } from '../shared/components/identificarUsuarioRequest';
import { DatosClienteNoAutenticadoRequest } from '../shared/components/datosClienteNoAutenticadoRequest';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public obtenerTipoUsuarioResponse: any = {
    idRespuesta: null,
    datosCliente: null,
    errorService: false
  };

  public obtenerClienteNoAutenticadoResponse: any = {
    idRespuesta: null,
    datosCliente: null,
    errorService: false
  };


  constructor(private wcs: WefClientService, public scs: ServicioCompartidoService) { }

  prepararObjetoCompartido(datoCliente, autenticado) {
    const objDatosCliente = {
        msisdn: datoCliente.msisdn,
        idProductoServicio: '51' + datoCliente.msisdn,
        fuenteIngreso: 'OTRO',
        autenticado,
        esMiClaro: datoCliente.emailClaro,
        tipoLinea: datoCliente.tipoLinea,
        tipoCliente: datoCliente.tipoCliente,
        tipoPermiso: Constantes.WPSTipoPermiso.value.administrador,
        planRoaming: datoCliente.planRoaming,
        codigoPlanComercial: datoCliente.codigoPlanComercial,
        codigoPlanTarifario: datoCliente.codigoPlanTarifario,
        canal: datoCliente.canal,
        codigoBloqueo: datoCliente.codigoBloqueo,
        pivot: datoCliente.pivot,
        codigoTipoLinea: datoCliente.codigoTipoLinea,
        codigoTipoPlan: datoCliente.codigoTipoPlan
    };
    this.scs.actualizarDatos(objDatosCliente);
  }


  // login con captcha
  obtenerTipoUsuario(request: IdentificarUsuarioRequest, callback) {
    const urlObtenerTipoCliente = environment.urlComprasyPAgosWef.obtenerTipoCliente;
    this.wcs.post(urlObtenerTipoCliente, request).subscribe(
      response => {
        const idRespuesta = response.comunResponseType.MessageResponse.Body.defaultServiceResponse.idRespuesta;
        this.obtenerTipoUsuarioResponse.idRespuesta = idRespuesta;
        if (Number(idRespuesta) === 0) {
          const datoCliente = response.comunResponseType.MessageResponse.Body.defaultServiceResponse;
          this.obtenerTipoUsuarioResponse.datosCliente = datoCliente;
          this.prepararObjetoCompartido(datoCliente, request.autenticado);
        } else {
          this.obtenerTipoUsuarioResponse.datosCliente = null;
        }
        callback();
      },
      error => {
        //console.log('Error obtenerTipoUsuario', error);
        this.obtenerTipoUsuarioResponse.idRespuesta = null;
        this.obtenerTipoUsuarioResponse.datosCliente = null;
        this.obtenerTipoUsuarioResponse.errorService = true
        callback();
      }
    );
  }

  // login sin captcha
  getObtenerTipoClienteNoAutenticado(requestClienteNoAutenticado: DatosClienteNoAutenticadoRequest, callback) {
    //console.log("EN EL SERVICIO")
    const urlObtenerClienteNoAutenticado = environment.urlComprasyPAgosWef.obtenerTipoClienteNoAutenticado;
    this.wcs.post(urlObtenerClienteNoAutenticado, requestClienteNoAutenticado).subscribe(
      response => {
        const idRespuesta = response.comunResponseType.MessageResponse.Body.defaultServiceResponse.idRespuesta;
        this.obtenerClienteNoAutenticadoResponse.idRespuesta = idRespuesta;
        if (idRespuesta == 0) {
              const datoCliente = response.comunResponseType.MessageResponse.Body.defaultServiceResponse;
              this.obtenerClienteNoAutenticadoResponse.datosCliente = datoCliente;
              this.prepararObjetoCompartido(datoCliente, requestClienteNoAutenticado.autenticado);
        } else {
          //console.log('obtenerTipoClienteNoAutenticado idRespuesta != 0 =>', idRespuesta);
          this.obtenerClienteNoAutenticadoResponse.idRespuesta = idRespuesta
        }
        callback();
      },
      error => {
        //console.log('Error servicio obtenerTipoClienteNoAutenticado', error);
        this.obtenerClienteNoAutenticadoResponse.errorService = true
        //console.log(this.obtenerClienteNoAutenticadoResponse.errorService)
        callback();
      }
    );

  }

}
