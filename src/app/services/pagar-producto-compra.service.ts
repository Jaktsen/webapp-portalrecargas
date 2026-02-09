import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WefClientService } from '../core/http/wef-client.service';

@Injectable({
  providedIn: 'root'
})
export class PagarProductoCompraService {

  constructor(
    private wcs: WefClientService
  ) { }

  pagarProductoCompra(request: any) {
    return this.wcs.post(environment.urlComprasyPAgosWef.pagarProductoCompra, request);
  }

}
