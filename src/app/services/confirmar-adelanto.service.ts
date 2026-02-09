
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WefClientService } from '../core/http/wef-client.service';

@Injectable({
  providedIn: 'root'
})
export class ConfirmarAdelantoService {

  constructor(
    private wefClientService: WefClientService
    ) {}

    confirmarAdelanto(request: any) {
      return this.wefClientService.post(environment.urlComprasyPAgosWef.confirmarAdelanto, request);
    }

  }
