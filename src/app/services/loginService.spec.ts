import { CaptchaService } from './catpchaService';
import { async, TestBed } from '@angular/core/testing';
import { WefClientService } from '../core/http/wef-client.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './loginService';
import { IdentificarUsuarioRequest } from '../shared/components/identificarUsuarioRequest';
import { ServicioCompartidoService } from '../core/services/servicio-compartido.service';
import { throwError } from 'rxjs/internal/observable/throwError';

describe('LoginService', () => {
  let comp: LoginService;
  let wefClientSpy: jasmine.SpyObj<WefClientService>;

  let testData = {
    linea: '',
    idRespuesta: '',
  };

  function getMockResponse() {
    return `
{
  "comunResponseType": {
      "MessageResponse": {
          "Header": {
              "HeaderResponse": {
                  "consumer": "",
                  "pid": "8b490d79-08fe-4340-bf65-efb62f4a6b55",
                  "timestamp": "2019-09-02T16:30:24-05:00",
                  "VarArg": "",
                  "status": {
                      "type": "0",
                      "code": "0",
                      "message": "EJECUCIÓN CON ÉXITO",
                      "msgid": "DPI01-4479ad6e-8993-4f88-bb85-efc974d8150f"
                  }
              }
          },
          "Body": {
              "defaultServiceResponse": {
                  "idRespuesta": "${testData.idRespuesta}",
                  "emailClaro":"false",
                  "mensaje":"Transacción Exitosa",
                  "msisdn":"${testData.linea}",
                  "planRoaming":"",
                  "tipoCliente":"1",
                  "tipoLinea":"1",
                  "codigoBloqueo":"BLOQ_COB"
              }
          }
      }
  }
}
`;
  }

  beforeEach(() => {
    const spy = jasmine.createSpyObj('WefClientService', ['post']);

    TestBed.configureTestingModule({
      // provide the component-under-test and dependent service
      providers: [
        CaptchaService,
        { provide: WefClientService, useValue: spy },
        ServicioCompartidoService,
      ],
      imports: [HttpClientModule],
    });
    // inject both the component and the dependent service.
    comp = TestBed.get(LoginService);
    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<
      WefClientService
    >;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
  });

  it('should authenticate user correctly idRespuesta 0', async(() => {
    console.log('test 12c7beef-c6f3-41ad-90e6-efcff358ce92');
    testData = {
      linea: '974794467',
      idRespuesta: '0',
    };
    wefClientSpy.post.and.returnValue(of(JSON.parse(getMockResponse())));
    const identificarUsuarioRequest = new IdentificarUsuarioRequest(
      testData.linea,
      '123456',
      'OTRO',
      false
    );
    console.log(identificarUsuarioRequest);
    comp.obtenerTipoUsuario(identificarUsuarioRequest, () => {
      expect(comp.obtenerTipoUsuarioResponse.idRespuesta).toEqual(
        testData.idRespuesta
      );
      expect(comp.scs.msisdn).toEqual(testData.linea);
    });
  }));
  it('should find captcha error idRespuesta 6', async(() => {
    console.log('8753c84d-704e-4420-abaa-c1b2ac1cff51');

    testData = {
      linea: '974794467',
      idRespuesta: '6',
    };
    wefClientSpy.post.and.returnValue(of(JSON.parse(getMockResponse())));
    const identificarUsuarioRequest = new IdentificarUsuarioRequest(
      testData.linea,
      '123456',
      'OTRO',
      false
    );
    console.log(identificarUsuarioRequest);
    comp.obtenerTipoUsuario(identificarUsuarioRequest, () => {
      expect(comp.obtenerTipoUsuarioResponse.idRespuesta).toEqual(
        testData.idRespuesta
      );
      expect(comp.obtenerTipoUsuarioResponse.datosCliente).toBeNull();
      expect(comp.scs.msisdn).toEqual('');
    });
  }));
  it('should find  no claro idRespuesta 2', async(() => {
    console.log('d9b6a458-0549-467b-a561-9d1c6fb8a498');
    testData = {
      linea: '974794467',
      idRespuesta: '2',
    };
    wefClientSpy.post.and.returnValue(of(JSON.parse(getMockResponse())));
    const identificarUsuarioRequest = new IdentificarUsuarioRequest(
      testData.linea,
      '123456',
      'OTRO',
      false
    );
    console.log(identificarUsuarioRequest);
    comp.obtenerTipoUsuario(identificarUsuarioRequest, () => {
      expect(comp.obtenerTipoUsuarioResponse.idRespuesta).toEqual(
        testData.idRespuesta
      );
      expect(comp.obtenerTipoUsuarioResponse.datosCliente).toBeNull();
      expect(comp.scs.msisdn).toEqual('');
    });
  }));
  it('should find other errors  idRespuesta otros', async(() => {
    testData = {
      linea: '974794467',
      idRespuesta: '9',
    };
    wefClientSpy.post.and.returnValue(of(JSON.parse(getMockResponse())));
    const identificarUsuarioRequest = new IdentificarUsuarioRequest(
      testData.linea,
      '123456',
      'OTRO',
      false
    );
    console.log(identificarUsuarioRequest);
    comp.obtenerTipoUsuario(identificarUsuarioRequest, () => {
      expect(comp.obtenerTipoUsuarioResponse.idRespuesta).toEqual(
        testData.idRespuesta
      );
      expect(comp.obtenerTipoUsuarioResponse.datosCliente).toBeNull();
      expect(comp.scs.msisdn).toEqual('');
    });
  }));
  it('should find handle server errors', async(() => {
    testData = {
      linea: '974794467',
      idRespuesta: '9',
    };
    wefClientSpy.post.and.returnValue(throwError({ status: 500 }));
    const identificarUsuarioRequest = new IdentificarUsuarioRequest(
      testData.linea,
      '123456',
      'OTRO',
      false
    );
    console.log(identificarUsuarioRequest);
    comp.obtenerTipoUsuario(identificarUsuarioRequest, () => {
      expect(comp.obtenerTipoUsuarioResponse.idRespuesta).toBeNull();
      expect(comp.obtenerTipoUsuarioResponse.datosCliente).toBeNull();
      expect(comp.scs.msisdn).toEqual('');
    });
  }));
});
