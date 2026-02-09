import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { WefClientService } from './../core/http/wef-client.service';
import { MethodsService } from 'src/app/services/methods.service';
import { TestBed } from '@angular/core/testing';

import { ServiciosPagosService } from './servicios-pagos.service';

describe('ServiciosPagosService', () => {

  const wefSpy = jasmine.createSpyObj('WefClientService', ['post']);
  const msSpy = jasmine.createSpyObj('MethodsService', ['isFlowPortalRecargas']);
  let wefClientSpy: jasmine.SpyObj<WefClientService>;
  let msClientSpy: jasmine.SpyObj<MethodsService>;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: WefClientService, useValue: wefSpy },
      { provide: MethodsService, useValue: msSpy },
    ]
  }));

  it('regInicioTransaccionPagoTC should call WEF endpoint for servicio gestionrecargas registro ', () => {
    const service: ServiciosPagosService = TestBed.get(ServiciosPagosService);
    expect(service).toBeTruthy();

    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;
    msClientSpy = TestBed.get(MethodsService) as jasmine.SpyObj<MethodsService>;

    const wefSpyAxn = wefClientSpy.post.and.returnValue(of(JSON.parse('{"idRespuesta": "0"}')));
    msClientSpy.isFlowPortalRecargas.and.returnValue(true);

    const request = {};
    service.regInicioTransaccionPagoTC(request).subscribe(response => {
      console.log(response);
      expect(response).not.toBeNull();
      expect(response.idRespuesta).toEqual('0');
    });

    expect(wefSpyAxn).toHaveBeenCalledWith(environment.urlComprasyPAgosWef.registrarRecargaTC, request);
  });
  it('regInicioTransaccionPagoTC should call WEF endpoint for servicio gestionpagos registro ', () => {
    const service: ServiciosPagosService = TestBed.get(ServiciosPagosService);
    expect(service).toBeTruthy();

    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;
    msClientSpy = TestBed.get(MethodsService) as jasmine.SpyObj<MethodsService>;

    const wefSpyAxn = wefClientSpy.post.and.returnValue(of(JSON.parse('{"idRespuesta": "0"}')));
    msClientSpy.isFlowPortalRecargas.and.returnValue(false);

    const request = {};
    service.regInicioTransaccionPagoTC(request).subscribe(response => {
      console.log(response);
      expect(response).not.toBeNull();
      expect(response.idRespuesta).toEqual('0');
    });

    expect(wefSpyAxn).toHaveBeenCalledWith(environment.urlComprasyPAgosWef.regInicioTransaccionPagoTC, request);
  });



  it('regFinTransaccionPagoTC should call WEF endpoint for servicio gestionrecargas pagos ', () => {
    const service: ServiciosPagosService = TestBed.get(ServiciosPagosService);
    expect(service).toBeTruthy();

    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;
    msClientSpy = TestBed.get(MethodsService) as jasmine.SpyObj<MethodsService>;

    const wefSpyAxn = wefClientSpy.post.and.returnValue(of(JSON.parse('{"idRespuesta": "0"}')));
    msClientSpy.isFlowPortalRecargas.and.returnValue(true);

    const request = {};
    service.regFinTransaccionPagoTC(request).subscribe(response => {
      console.log(response);
      expect(response).not.toBeNull();
      expect(response.idRespuesta).toEqual('0');
    });

    expect(wefSpyAxn).toHaveBeenCalledWith(environment.urlComprasyPAgosWef.finalizarRecargaTC, request);
  });
  it('regFinTransaccionPagoTC should call WEF endpoint for servicio gestionpagos pagos ', () => {
    const service: ServiciosPagosService = TestBed.get(ServiciosPagosService);
    expect(service).toBeTruthy();

    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;
    msClientSpy = TestBed.get(MethodsService) as jasmine.SpyObj<MethodsService>;

    const wefSpyAxn = wefClientSpy.post.and.returnValue(of(JSON.parse('{"idRespuesta": "0"}')));
    msClientSpy.isFlowPortalRecargas.and.returnValue(false);

    const request = {};
    service.regFinTransaccionPagoTC(request).subscribe(response => {
      console.log(response);
      expect(response).not.toBeNull();
      expect(response.idRespuesta).toEqual('0');
    });

    expect(wefSpyAxn).toHaveBeenCalledWith(environment.urlComprasyPAgosWef.regFinTransaccionPagoTC, request);
  });
});
