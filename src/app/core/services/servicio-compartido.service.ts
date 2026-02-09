import { Injectable } from '@angular/core';
import { Constantes } from 'src/app/services/constants';

@Injectable({
  providedIn: 'root'
})
export class ServicioCompartidoService {
  msisdn = '';
  idProductoServicio = '';
  fuenteIngreso = '';
  autenticado = false;
  esMiClaro = '';
  tipoLinea = '';
  tipoCliente = '';
  tipoPermiso = '';
  planRoaming = '';
  codigoPlanComercial = '';
  codigoPlanTarifario = '';
  embedded = false;

  canal = '';
  isAdmin = '0';
  isblockCR = false;
  isIFILTE = false;
  codigoBloqueo = '';
  recarga = false;
  isRechargeAnonymous = false;
  tipoVal: any;

  isONE = false;
  codigoTipoPlan = '';
  codigoTipoLinea = '';
  constructor() { }

  actualizarDatos(objDatosCliente) {
      this.msisdn = objDatosCliente.msisdn;
      this.idProductoServicio = objDatosCliente.idProductoServicio;
      this.fuenteIngreso = objDatosCliente.fuenteIngreso;
      this.autenticado = objDatosCliente.autenticado;
      this.esMiClaro = objDatosCliente.esMiClaro;
      this.tipoCliente = objDatosCliente.tipoCliente;
      this.tipoLinea = objDatosCliente.tipoLinea;
      this.tipoPermiso = objDatosCliente.tipoPermiso;
      this.planRoaming = objDatosCliente.planRoaming;
      this.codigoPlanComercial = objDatosCliente.codigoPlanComercial;
      this.codigoPlanTarifario = objDatosCliente.codigoPlanTarifario;
      this.codigoBloqueo = objDatosCliente.codigoBloqueo;

      this.codigoTipoLinea = objDatosCliente.codigoTipoLinea;
      this.codigoTipoPlan = objDatosCliente.codigoTipoPlan;

      this.isONE = objDatosCliente.pivot != null && objDatosCliente.pivot == '1';
      if (objDatosCliente.canal != undefined && objDatosCliente.canal != null && objDatosCliente != '') {
        this.canal = objDatosCliente.canal;
      }

      if ( objDatosCliente.msisdn !== null && objDatosCliente.msisdn !== undefined) {
        if ( objDatosCliente.msisdn.substring(0, 1) === '8' && objDatosCliente.msisdn.length == 9) {
          this.isIFILTE = true;
        } else {
          this.isIFILTE = false;
        }
      }
  }

  isRecargas() {
    if (Constantes.PORTAL_FLOW.RECARGAS_CANALES.includes(this.canal) && this.recarga) {
      return true;
    } else {
      return false;
    }
  }

}
