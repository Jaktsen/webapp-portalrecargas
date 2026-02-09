import { GlobalObjectService } from 'src/app/services/global-object.service';
import { AppModule } from './../app.module';
import { WcmService } from 'src/app/services/wcm.service';
import { TestBed } from '@angular/core/testing';
import { Constantes } from './constants';

import { MethodsService } from './methods.service';
import { HttpClientModule } from '@angular/common/http';
import { ServicioCompartidoService } from '../core/services/servicio-compartido.service';
import {EnviarTokenService} from './enviar-token.service';


declare var window: any;

describe('MethodsService > reloadUrl ', () => {

  let goSpy: jasmine.SpyObj<GlobalObjectService>;


  beforeEach(() => {

    const spy = jasmine.createSpyObj('GlobalObjectService', ['reloadUrl']);

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        MethodsService,
        { provide: GlobalObjectService, useValue: spy }
      ]
    });
  });
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('should run reloadportal OK canal 1', () => {
    goSpy = TestBed.get(GlobalObjectService) as jasmine.SpyObj<GlobalObjectService>;
    goSpy.reloadUrl.and.callFake((url: string) => {
      console.log('the url: ' + url);
      expect(url.endsWith('cn=1')).toBeTruthy();
    });
    sessionStorage.setItem('canal', '1');
    sessionStorage.setItem('isEmbeddedChannel', '0');
    sessionStorage.setItem('embeddedToken', '');
    const service: MethodsService = TestBed.get(MethodsService);
    service.reloadPortal();
    expect(service).toBeTruthy();
    sessionStorage.clear();
  });
  it('should run reloadportal OK canal 2', () => {
    const token = 'token';
    const canal = '2';
    goSpy = TestBed.get(GlobalObjectService) as jasmine.SpyObj<GlobalObjectService>;
    goSpy.reloadUrl.and.callFake((url: string) => {
      console.log('the url: ' + url);
      expect(url.endsWith(`cn=${canal}&listnum=${token}`)).toBeTruthy();
    });
    sessionStorage.setItem('canal', canal);
    sessionStorage.setItem('isEmbeddedChannel', '1');
    sessionStorage.setItem('embeddedToken', token);
    const service: MethodsService = TestBed.get(MethodsService);
    service.reloadPortal();
    expect(service).toBeTruthy();
    sessionStorage.clear();
  });
  it('should run reloadportal OK canal 3', () => {
    const token = 'token';
    const canal = '3';
    goSpy = TestBed.get(GlobalObjectService) as jasmine.SpyObj<GlobalObjectService>;
    goSpy.reloadUrl.and.callFake((url: string) => {
      console.log('the url: ' + url);
      expect(url.endsWith(`cn=${canal}&listnum=${token}`)).toBeTruthy();
    });
    sessionStorage.setItem('canal', canal);
    sessionStorage.setItem('isEmbeddedChannel', '1');
    sessionStorage.setItem('embeddedToken', token);
    const service: MethodsService = TestBed.get(MethodsService);
    service.reloadPortal();
    expect(service).toBeTruthy();
    sessionStorage.clear();
  });
  it('should run reloadportal OK canal 4', () => {
    const token = '';
    const canal = '4';
    goSpy = TestBed.get(GlobalObjectService) as jasmine.SpyObj<GlobalObjectService>;
    goSpy.reloadUrl.and.callFake((url: string) => {
      console.log('the url: ' + url);
      expect(url.endsWith(`cn=${canal}`)).toBeTruthy();
    });
    sessionStorage.setItem('canal', canal);
    sessionStorage.setItem('isEmbeddedChannel', '0');
    sessionStorage.setItem('embeddedToken', token);
    const service: MethodsService = TestBed.get(MethodsService);
    service.reloadPortal();
    expect(service).toBeTruthy();
    sessionStorage.clear();
  });
  it('should run reloadportal OK canal 5', () => {
    const token = '';
    const canal = '5';
    goSpy = TestBed.get(GlobalObjectService) as jasmine.SpyObj<GlobalObjectService>;
    goSpy.reloadUrl.and.callFake((url: string) => {
      console.log('the url: ' + url);
      expect(url.endsWith(`cn=${canal}`)).toBeTruthy();
    });
    sessionStorage.setItem('canal', canal);
    sessionStorage.setItem('isEmbeddedChannel', '0');
    sessionStorage.setItem('embeddedToken', token);
    const service: MethodsService = TestBed.get(MethodsService);
    service.reloadPortal();
    expect(service).toBeTruthy();
    sessionStorage.clear();
  });
  it('should run reloadportal OK canal 6', () => {
    const token = '';
    const canal = '6';
    goSpy = TestBed.get(GlobalObjectService) as jasmine.SpyObj<GlobalObjectService>;
    goSpy.reloadUrl.and.callFake((url: string) => {
      console.log('the url: ' + url);
      expect(url.endsWith(`cn=${canal}`)).toBeTruthy();
    });
    sessionStorage.setItem('canal', canal);
    sessionStorage.setItem('isEmbeddedChannel', '0');
    sessionStorage.setItem('embeddedToken', token);
    const service: MethodsService = TestBed.get(MethodsService);
    service.reloadPortal();
    expect(service).toBeTruthy();
    sessionStorage.clear();
  });
  it('should run reloadportal OK canal 7', () => {
    const token = '';
    const canal = '7';
    goSpy = TestBed.get(GlobalObjectService) as jasmine.SpyObj<GlobalObjectService>;
    goSpy.reloadUrl.and.callFake((url: string) => {
      console.log('the url: ' + url);
      expect(url.endsWith(`cn=${canal}`)).toBeTruthy();
    });
    sessionStorage.setItem('canal', canal);
    sessionStorage.setItem('isEmbeddedChannel', '0');
    sessionStorage.setItem('embeddedToken', token);
    const service: MethodsService = TestBed.get(MethodsService);
    service.reloadPortal();
    expect(service).toBeTruthy();
    sessionStorage.clear();
  });
  it('should run reloadportal OK canal 8', () => {
    const token = '';
    const canal = '8';
    goSpy = TestBed.get(GlobalObjectService) as jasmine.SpyObj<GlobalObjectService>;
    goSpy.reloadUrl.and.callFake((url: string) => {
      console.log('the url: ' + url);
      expect(url.endsWith(`cn=${canal}&rec=1`)).toBeTruthy();
    });
    sessionStorage.setItem('canal', canal);
    sessionStorage.setItem('recarga', '1');
    sessionStorage.setItem('isEmbeddedChannel', '0');
    sessionStorage.setItem('embeddedToken', token);
    const service: MethodsService = TestBed.get(MethodsService);
    service.reloadPortal();
    expect(service).toBeTruthy();
    sessionStorage.clear();
  });
  it('should run reloadportal OK canal random que tiene flujo recargas', () => {
    const token = '';
    const randomIndex = Math.floor(Math.random() * (Constantes.PORTAL_FLOW.RECARGAS_CANALES.length));
    const canal = Constantes.PORTAL_FLOW.RECARGAS_CANALES[randomIndex];
    goSpy = TestBed.get(GlobalObjectService) as jasmine.SpyObj<GlobalObjectService>;
    goSpy.reloadUrl.and.callFake((url: string) => {
      console.log('the url: ' + url);
      expect(url.endsWith(`cn=${canal}&rec=1`)).toBeTruthy();
    });
    sessionStorage.setItem('canal', canal);
    sessionStorage.setItem('recarga', '1');
    sessionStorage.setItem('isEmbeddedChannel', '0');
    sessionStorage.setItem('embeddedToken', token);
    const service: MethodsService = TestBed.get(MethodsService);
    service.reloadPortal();
    expect(service).toBeTruthy();
    sessionStorage.clear();
  });
  it('should run reloadportal OK canal 9', () => {
    const token = 'token';
    const canal = '9';
    goSpy = TestBed.get(GlobalObjectService) as jasmine.SpyObj<GlobalObjectService>;
    goSpy.reloadUrl.and.callFake((url: string) => {
      console.log('the url: ' + url);
      expect(url.endsWith(`cn=${canal}&listnum=${token}`)).toBeTruthy();
    });
    sessionStorage.setItem('canal', canal);
    sessionStorage.setItem('isEmbeddedChannel', '1');
    sessionStorage.setItem('embeddedToken', token);
    const service: MethodsService = TestBed.get(MethodsService);
    service.reloadPortal();
    expect(service).toBeTruthy();
    sessionStorage.clear();
  });
});

describe('MethodsService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [AppModule]

  }));

  beforeEach(() => {
    sessionStorage.clear();
  });

  it('should be created', () => {
    const service: MethodsService = TestBed.get(MethodsService);
    expect(service).toBeTruthy();
  });


  it('should have method isFlowPortalRecargasAllRec return true if canal is in recargas flujo arreglo ', () => {
    const service: MethodsService = TestBed.get(MethodsService);
    expect(service).toBeTruthy();
    const randomIndex = Math.floor(Math.random() * (Constantes.PORTAL_FLOW.RECARGAS_CANALES.length));
    sessionStorage.setItem('canal', Constantes.PORTAL_FLOW.RECARGAS_CANALES[randomIndex]);
    expect(service.isFlowPortalRecargasAllRec()).toBeTruthy();
  });
  it('should have method isFlowPortalRecargasAllRec return false if canal is not in recargas flujo arreglo ', () => {
    const service: MethodsService = TestBed.get(MethodsService);
    expect(service).toBeTruthy();
    sessionStorage.setItem('canal', '3223234');
    expect(service.isFlowPortalRecargasAllRec()).toBeFalsy();
  });
  it('should isFlowPortalRecargasWithRecDisabled return true if canal is in recargas flujo arreglo and rec is not enabled (0)', () => {
    const service: MethodsService = TestBed.get(MethodsService);
    expect(service).toBeTruthy();
    const randomIndex = Math.floor(Math.random() * (Constantes.PORTAL_FLOW.RECARGAS_CANALES.length));
    sessionStorage.setItem('canal', Constantes.PORTAL_FLOW.RECARGAS_CANALES[randomIndex]);
    sessionStorage.setItem('recarga', '0');
    expect(service.isFlowPortalRecargasWithRecDisabled()).toBeTruthy();
  });
  it('should isFlowPortalRecargasWithRecDisabled return false if canal is not in recargas flujo arreglo and rec is not enabled (0)',
      () => {
        const service: MethodsService = TestBed.get(MethodsService);
        expect(service).toBeTruthy();
        sessionStorage.setItem('canal', '545454');
        sessionStorage.setItem('recarga', '0');
        expect(service.isFlowPortalRecargasWithRecDisabled()).toBeFalsy();
      });
  it('should isFlowPortalRecargasWithRecDisabled return false if canal is in recargas flujo arreglo and rec is enabled 1',
      () => {
        const service: MethodsService = TestBed.get(MethodsService);
        expect(service).toBeTruthy();
        sessionStorage.setItem('canal', '545454');
        sessionStorage.setItem('recarga', '1');
        expect(service.isFlowPortalRecargasWithRecDisabled()).toBeFalsy();
      });


  it('should have method isFlowPortalRecargas return true if canal is in recargas flujo arreglo y flag recarga es 1 ', () => {
    const service: MethodsService = TestBed.get(MethodsService);
    expect(service).toBeTruthy();
    const randomIndex = Math.floor(Math.random() * (Constantes.PORTAL_FLOW.RECARGAS_CANALES.length));
    sessionStorage.setItem('canal', Constantes.PORTAL_FLOW.RECARGAS_CANALES[randomIndex]);
    sessionStorage.setItem('recarga', '1');
    expect(service.isFlowPortalRecargas()).toBeTruthy();
  });
  it('should have method isFlowPortalRecargas return false if canal is null y flag recarga es 1 ', () => {
    const service: MethodsService = TestBed.get(MethodsService);
    expect(service).toBeTruthy();
    sessionStorage.setItem('recarga', '1');
    expect(service.isFlowPortalRecargas()).toBeFalsy();
  });
  it('should have method isFlowPortalRecargas return false if canal is in recargas flujo arreglo y flag recarga no es 1 ', () => {
    const service: MethodsService = TestBed.get(MethodsService);
    expect(service).toBeTruthy();
    const randomIndex = Math.floor(Math.random() * (Constantes.PORTAL_FLOW.RECARGAS_CANALES.length));
    sessionStorage.setItem('canal', Constantes.PORTAL_FLOW.RECARGAS_CANALES[randomIndex]);
    sessionStorage.setItem('recarga', '3');
    expect(service.isFlowPortalRecargas()).toBeFalsy();
  });
  it('should have method isFlowPortalRecargas return false if canal is in recargas flujo arreglo y flag recarga es null ', () => {
    const service: MethodsService = TestBed.get(MethodsService);
    expect(service).toBeTruthy();
    const randomIndex = Math.floor(Math.random() * (Constantes.PORTAL_FLOW.RECARGAS_CANALES.length));
    sessionStorage.setItem('canal', Constantes.PORTAL_FLOW.RECARGAS_CANALES[randomIndex]);
    expect(service.isFlowPortalRecargas()).toBeFalsy();
  });
  it('should have method isFlowPortalRecargas return false if canal is in not recargas flujo arreglo y flag recarga es 1 ', () => {
    const service: MethodsService = TestBed.get(MethodsService);
    expect(service).toBeTruthy();
    sessionStorage.setItem('canal', '1');
    sessionStorage.setItem('recarga', '1');
    expect(service.isFlowPortalRecargas()).toBeFalsy();
  });


  it('should run convertTipoMetodoPagoAIndicador OK', () => {
    const service: MethodsService = TestBed.get(MethodsService);
    expect(service.convertTipoMetodoPagoAIndicador('1')).toEqual('4');
    expect(service.convertTipoMetodoPagoAIndicador('4')).toEqual('3');
    expect(service.convertTipoMetodoPagoAIndicador('2')).toEqual('2');
    expect(service.convertTipoMetodoPagoAIndicador('3')).toEqual('1');
  });
  it('should validate emails OK', () => {
    const service: MethodsService = TestBed.get(MethodsService);
    expect(service).toBeTruthy();
    expect(service.isValidEmail('mymail@gmail.com')).toBeTruthy();
    expect(service.isValidEmail('mymail@gmail')).toBeFalsy();
    expect(service.isValidEmail('mymail@')).toBeFalsy();
    expect(service.isValidEmail('mymail')).toBeFalsy();
    expect(service.isValidEmail('MYMAYIL@GMAIL.COM')).toBeTruthy();
    expect(service.isValidEmail('')).toBeFalsy();
    expect(service.isValidEmail(null)).toBeFalsy();
    expect(service.isValidEmail(undefined)).toBeFalsy();
  });
  it('should run isIFILTE OK', () => {
    const service: MethodsService = TestBed.get(MethodsService);
    expect(service).toBeTruthy();
    const productoElegido = {
      codTipoLinea : '6'
    };
    expect(service.isIFILTE(productoElegido)).toBeTruthy();
    productoElegido.codTipoLinea = '7';
    expect(service.isIFILTE(productoElegido)).toBeTruthy();
    productoElegido.codTipoLinea = '1';
    expect(service.isIFILTE(productoElegido)).toBeFalsy();

    const productoElegido2 = {
    };
    expect(service.isIFILTE(productoElegido2)).toBeFalsy();
  });
  it('should run isProductPrestame OK', () => {
    const service: MethodsService = TestBed.get(MethodsService);
    expect(service).toBeTruthy();
    const productoElegido = {
      catvCodCategoria : Constantes.WPSCategoriasDeCompra.prestameMegas
    };
    expect(service.isProductPrestame(productoElegido)).toBeTruthy();
    productoElegido.catvCodCategoria = Constantes.WPSCategoriasDeCompra.prestameMegas + 'xxx';
    expect(service.isProductPrestame(productoElegido)).toBeFalsy();

    const productoElegidoEmpty = {
    };
    expect(service.isProductPrestame(productoElegidoEmpty)).toBeFalsy();
  });
});


// isRoamingCategoryEnabled inicio

describe('MethodsService > isRoamingCategoryEnabled', () => {
  const wcmStub =  {
    whitelistConfig: [
      {}, {}, {}, {},
      {}, {}, {}, {},
      {
        roaming: {
          allowedNumbers: [
            '997352963',
            '974794465',
            '980543856',
            '988202024',
            '974794467', '953166037', '966789703'
          ],
          state: '1'
        }
      }
    ]
  };
  const sc =  {
    msisdn: '966789703'
  };
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: WcmService, useValue: wcmStub },
      { provide: ServicioCompartidoService, useValue: sc },
    ],
    imports: [HttpClientModule]
  }));
  it('isRoamingCategoryEnabled should return true if whitelist is on and the current line in whitelist', () => {
    const service: MethodsService = TestBed.get(MethodsService);
    expect(service).toBeTruthy();
    expect(service.isRoamingCategoryEnabled()).toBeTruthy();
  });
});
describe('MethodsService > isRoamingCategoryEnabled', () => {
  const wcmStub =  {
    whitelistConfig: [
      {}, {}, {}, {},
      {}, {}, {}, {},
      {
        roaming: {
          allowedNumbers: [
          ],
          state: '1'
        }
      }
    ]
  };
  const sc =  {
    msisdn: '966789703'
  };
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: WcmService, useValue: wcmStub },
      { provide: ServicioCompartidoService, useValue: sc },
    ],
    imports: [HttpClientModule]
  }));
  it('isRoamingCategoryEnabled should return false if whitelist is on and allowedNumbers is empty', () => {
    const service: MethodsService = TestBed.get(MethodsService);
    expect(service).toBeTruthy();
    expect(service.isRoamingCategoryEnabled()).toBeFalsy();
  });
});
describe('MethodsService > isRoamingCategoryEnabled', () => {
  const wcmStub =  {
    whitelistConfig: [
      {}, {}, {}, {},
      {}, {}, {}, {},
      {
        roaming: {
          allowedNumbers: [
            '997352963',
            '974794465',
            '980543856',
            '988202024',
            '974794467', '953166037', '966789703'
          ],
          state: '1'
        }
      }
    ]
  };
  const sc =  {
    msisdn: '966789702'
  };
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: WcmService, useValue: wcmStub },
      { provide: ServicioCompartidoService, useValue: sc },
    ],
    imports: [HttpClientModule]
  }));
  it('isRoamingCategoryEnabled should return false if whitelist is on and the current line not in whitelist', () => {
    const service: MethodsService = TestBed.get(MethodsService);
    expect(service).toBeTruthy();
    expect(service.isRoamingCategoryEnabled()).toBeFalsy();
  });
});
describe('MethodsService > isRoamingCategoryEnabled', () => {
  const wcmStub =  {
    whitelistConfig: [
      {}, {}, {}, {},
      {}, {}, {}, {},
      {
        roaming: {
          allowedNumbers: [
            '997352963',
            '974794465',
            '980543856',
            '988202024',
            '974794467', '953166037', '966789703'
          ],
          state: '0'
        }
      }
    ]
  };
  const sc =  {
    msisdn: '966789702'
  };
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: WcmService, useValue: wcmStub },
      { provide: ServicioCompartidoService, useValue: sc },
    ],
    imports: [HttpClientModule]
  }));
  it('isRoamingCategoryEnabled should return true if whitelist is off and the current line not in whitelist', () => {
    const service: MethodsService = TestBed.get(MethodsService);
    expect(service).toBeTruthy();
    expect(service.isRoamingCategoryEnabled()).toBeTruthy();
  });
});
describe('MethodsService > isRoamingCategoryEnabled', () => {
  const wcmStub =  {
    whitelistConfig: [
      {}, {}, {}, {},
      {}, {}, {}, {},
      {
        roaming: {
          allowedNumbers: [
            '997352963',
            '974794465',
            '980543856',
            '988202024',
            '974794467', '953166037', '966789703'
          ],
          state: '0'
        }
      }
    ]
  };
  const sc =  {
    msisdn: '966789703'
  };
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: WcmService, useValue: wcmStub },
      { provide: ServicioCompartidoService, useValue: sc },
    ],
    imports: [HttpClientModule]
  }));
  it('isRoamingCategoryEnabled should return true if whitelist is off and the current line in whitelist', () => {
    const service: MethodsService = TestBed.get(MethodsService);
    expect(service).toBeTruthy();
    expect(service.isRoamingCategoryEnabled()).toBeTruthy();
  });
});
describe('MethodsService > isRoamingCategoryEnabled', () => {
  const wcmStub =  {
    whitelistConfig: [
      {}, {}, {}, {},
      {}, {}, {}, {}
    ]
  };
  const sc =  {
    msisdn: '966789703'
  };
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: WcmService, useValue: wcmStub },
      { provide: ServicioCompartidoService, useValue: sc },
    ],
    imports: [HttpClientModule]
  }));
  it('isRoamingCategoryEnabled should return true if whitelist config does not exist', () => {
    const service: MethodsService = TestBed.get(MethodsService);
    expect(service).toBeTruthy();
    expect(service.isRoamingCategoryEnabled()).toBeTruthy();
  });
});
// isRoamingCategoryEnabled fin
describe('MethodsService > isWhitelistSwitchOn switch is on', () => {
  const wcmStub =  {
    whitelistConfig: [
      {}, {}, {}, {
        motorPagos: {
          state: '1'
        }
      }
    ]
  };
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: WcmService, useValue: wcmStub }
    ],
    imports: [HttpClientModule]
  }));
  it('should run isWhitelistSwitchOn  OK', () => {
    const service: MethodsService = TestBed.get(MethodsService);
    expect(service).toBeTruthy();
    expect(service.isWhitelistSwitchOn(Constantes.MOTOR_PAGOS_WHITELIST_NODE_ORDER, Constantes.MOTOR_PAGOS_WHITELIST_NODE_NAME))
        .toBeTruthy();
  });
});
describe('MethodsService > isWhitelistSwitchOn whitelist is not well configured should return off switch', () => {
  const wcmStub =  {
    whitelistConfig: [
      {}, {}, {}, {
        motorPagosdddd: {
          state: '0'
        }
      }
    ]
  };
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: WcmService, useValue: wcmStub }
    ],
    imports: [HttpClientModule]
  }));
  it('should run isWhitelistSwitchOn  OK', () => {
    const service: MethodsService = TestBed.get(MethodsService);
    expect(service).toBeTruthy();
    expect(service.isWhitelistSwitchOn(Constantes.MOTOR_PAGOS_WHITELIST_NODE_ORDER, Constantes.MOTOR_PAGOS_WHITELIST_NODE_NAME))
        .toBeFalsy();
  });
});
describe('MethodsService > promociones testear whitelist activo', () => {
  const wcmStub =  {
    whitelistConfig: [
      {}, {}, {}, {}, {}, {}, {
        modal: {
          allowedNumbers: [
            '963838321', '997352963', '974794467', '936787379', '976682280', '942364451'
          ],
          state: '1'
        }
      }
    ],
    listaWCMRecomendaciones :
        [
          {
            idPromocion: '97e8d20c-4ba2-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '31/03/2021 00:00',
            codigoPlanTarifario: '2441',
            TipoLinea: '2',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '5000',
            TipoFiltro: '1',
            Prioridad: '1',
            CallToAction: '',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: 'Portal de Compras,Mi Claro App,Recargas'
          },
          {
            idPromocion: '97e8d20c-4ba2-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo2.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '31/03/2021 00:00',
            codigoPlanTarifario: '2441',
            TipoLinea: '2',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '5000',
            TipoFiltro: '1',
            Prioridad: '1',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: '1 Portal de Compras,3 Mi Claro App,8 Recargas'
          },
          {
            idPromocion: '12233c-4ba2-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '31/03/2020 00:00',
            codigoPlanTarifario: '2441',
            TipoLinea: '2',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '5000',
            TipoFiltro: '2',
            Prioridad: '3',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: '1 Portal de Compras,3 Mi Claro App,8 Recargas'
          }
        ]
  };
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: WcmService, useValue: wcmStub },
      {
        provide: ServicioCompartidoService, useValue: {
          msisdn:  '966789703'
        }
      }
    ],
    imports: [HttpClientModule]
  }));
  it('should return not found given we use a value that is not inside the whitelist ', () => {
    const service: MethodsService = TestBed.get(MethodsService);
    expect(service).toBeTruthy();
    const promoFoundResult = service.isPromotionsModalDisplayed();
    expect(promoFoundResult.found).toBeFalsy();
    expect(promoFoundResult.index).toEqual(Constantes.PROMO_INDEX_NOT_FOUND);
  });
});
describe('MethodsService > promociones testear whitelist activo y linea dentro del whitelist', () => {
  const wcmStub =  {
    whitelistConfig: [
      {}, {}, {}, {}, {}, {}, {
        modal: {
          allowedNumbers: [
            '963838321', '997352963', '974794467', '936787379', '976682280', '942364451'
          ],
          state: '1'
        }
      }
    ],
    listaWCMRecomendaciones :
        [
          // promo por tipo linea no coincide con el tipo de linea real
          {
            idPromocion: '97e8d245450c-4ba2-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '31/03/3021 00:00',
            codigoPlanTarifario: '2441',
            TipoLinea: '2',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '5000',
            TipoFiltro: '1',
            Prioridad: '1',
            CallToAction: '',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: '1 Portal de Compras,3 Mi Claro App,8 Recargas'
          },

          // promocion plan tarifario correcto pero prioridad mayor a la seleccionada Bingo  (osea tiene menos peso)
          {
            idPromocion: '55555-3333-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '01/01/2099 00:00',
            codigoPlanTarifario: 'ABC',
            TipoLinea: '1',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '30000',
            TipoFiltro: '2',
            Prioridad: '3',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: ''
          },
          // promo valida por tipo linea con mismo tipo linea  OK
          {
            idPromocion: '97e8d11120c-4ba2-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo2.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '31/03/3021 00:00',
            codigoPlanTarifario: '2441',
            TipoLinea: '1',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '5000',
            TipoFiltro: '1',
            Prioridad: '2',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: '1 Portal de Compras,3 Mi Claro App,8 Recargas'
          },
          // promo no activada
          {
            idPromocion: '97e8d20c-4ba2-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo2.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '31/03/3021 00:00',
            codigoPlanTarifario: '2441',
            TipoLinea: '1',
            codigoPlanComercial: '',
            Encendido: '0',
            VecesDia: '5000',
            TipoFiltro: '1',
            Prioridad: '3',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: '1 Portal de Compras,3 Mi Claro App,8 Recargas'
          },
          // promocion caducada
          {
            idPromocion: '12233c-4ba2-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '31/03/2020 00:00',
            codigoPlanTarifario: '2441',
            TipoLinea: '2',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '5000',
            TipoFiltro: '2',
            Prioridad: '3',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: '1 Portal de Compras,3 Mi Claro App,8 Recargas'
          },
          // promocion que ya se mostró más de las veces permitidas
          {
            idPromocion: 'aaaaa6566612233c-4ba2-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '01/01/2099 00:00',
            codigoPlanTarifario: '2441',
            TipoLinea: '2',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '3',
            TipoFiltro: '2',
            Prioridad: '3',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: '1 Portal de Compras,3 Mi Claro App,8 Recargas'
          },
          // promocion Canal no valido
          {
            idPromocion: 'aaaa44444a6566612233c-4ba2-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '01/01/2099 00:00',
            codigoPlanTarifario: '2441',
            TipoLinea: '2',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '30000',
            TipoFiltro: '2',
            Prioridad: '3',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: 'Canal inexistente,Potal Compras XXX'
          },
          // promocion plan tarifario no coincide
          {
            idPromocion: '55555-4ba2-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '01/01/2099 00:00',
            codigoPlanTarifario: '2441',
            TipoLinea: '1',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '30000',
            TipoFiltro: '2',
            Prioridad: '3',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: 'Todos los canales'
          },
          // promocion plan tarifario no coincide
          {
            idPromocion: '55555-4ba2-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '01/01/2099 00:00',
            codigoPlanTarifario: '2441',
            TipoLinea: '1',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '30000',
            TipoFiltro: '2',
            Prioridad: '3',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: 'Todos los canales,YYY,AAA,BBB'
          },
          // promocion sin canales plan tarifario no coincide
          {
            idPromocion: '55555-3333-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '01/01/2099 00:00',
            codigoPlanTarifario: '2441',
            TipoLinea: '1',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '30000',
            TipoFiltro: '2',
            Prioridad: '3',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: ''
          },
          // promocion plan tarifario correcto pero prioridad mayor a la seleccionada Bingo  (osea tiene menos peso)
          {
            idPromocion: '55555-666666-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '01/01/2099 00:00',
            codigoPlanTarifario: 'ABC',
            TipoLinea: '1',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '30000',
            TipoFiltro: '2',
            Prioridad: '3',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: 'Todos los canales'
          },
          // promocion plan tarifario correcto pero prioridad mayor a la seleccionada Bingo  (osea tiene menos peso)
          {
            idPromocion: '55555-6666677778888-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '01/01/2099 00:00',
            codigoPlanTarifario: 'ABC',
            TipoLinea: '1',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '30000',
            TipoFiltro: '2',
            Prioridad: '3',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: ''
          },

        ]
  };
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: WcmService, useValue: wcmStub },
      {
        provide: ServicioCompartidoService, useValue: {
          msisdn: '963838321',
          canal: '1',
          tipoLinea: '1',
          codigoPlanTarifario: 'ABC'
        }
      }
    ],
    imports: [HttpClientModule]
  }));
  beforeEach(() => {
    const today = new Date();
    const currentDay = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const promoInfo = {
      'aaaaa6566612233c-4ba2-41c1-8ae8-ebe08446a07c': {
        // promo llego a limite
        PROMO_CURRENT_DAY: currentDay,
        PROMO_CURRENT_TIMES: 5
      },
      '97e8d11120c-4ba2-41c1-8ae8-ebe08446a07c': {
        // promo OK no se ha pasado del limite de 5000 vistas por dia
        PROMO_CURRENT_DAY: currentDay,
        PROMO_CURRENT_TIMES: 5
      }
    };
    window.localStorage[Constantes.PROMO_LOCAL_STORAGE_OBJECT_NAME] = JSON.stringify(promoInfo);

  });
  it('should validate the promo configurations  ', () => {
    // Mocks
    const service: MethodsService = TestBed.get(MethodsService);
    expect(service).toBeTruthy();
    const promoFoundResult = service.isPromotionsModalDisplayed();
    expect(promoFoundResult.found).toBeTruthy();
    expect(promoFoundResult.index).toEqual(1);
    promoFoundResult.promociones.forEach(d => {
      console.log('(Validate the promo configurations): ' + d.comment);
    });
    expect(promoFoundResult.promociones[0].comment.indexOf('Tipo de linea no coincide con tipo linea de promocion. Linea: undefined, Promocion: 2') > -1)
        .toBeTruthy();
    expect(promoFoundResult.promociones[1].comment.indexOf('Bingo-! prioridad 3') > -1).toBeTruthy();
    expect(promoFoundResult.promociones[2].comment.indexOf('Tipo de linea no coincide con tipo linea de promocion. Linea: undefined, Promocion: 1') > -1).toBeTruthy();
    expect(promoFoundResult.promociones[3].comment).toEqual('Promocion no está activada');
    expect(promoFoundResult.promociones[4].comment).toEqual('Fecha de promoción no es válida');
    expect(promoFoundResult.promociones[5].comment.indexOf('Promoción llegó a límite diario de vistas.') > -1).toBeTruthy();
    expect(promoFoundResult.promociones[6].comment.indexOf('Canal no valido. Promo:') > -1).toBeTruthy();
    expect(promoFoundResult.promociones[7].comment.indexOf('Plan tarifario de linea no coincide con plan de promocion') > -1).toBeTruthy();
    expect(promoFoundResult.promociones[8].comment.indexOf('Plan tarifario de linea no coincide con plan de promocion') > -1).toBeTruthy();
    expect(promoFoundResult.promociones[9].comment.indexOf('Plan tarifario de linea no coincide con plan de promocion') > -1).toBeTruthy();
    expect(promoFoundResult.promociones[10].comment.indexOf('Promo con prioridad mayor a las actuales') > -1).toBeTruthy();
    expect(promoFoundResult.promociones[11].comment.indexOf('Promo con prioridad mayor a las actuales') > -1).toBeTruthy();
  });
});
describe('MethodsService > promociones testear whitelist activo y linea dentro del whitelist testear prioridad 1', () => {
  const wcmStub =  {
    whitelistConfig: [
      {}, {}, {}, {}, {}, {}, {
        modal: {
          allowedNumbers: [
            '963838321', '997352963', '974794467', '936787379', '976682280', '942364451'
          ],
          state: '1'
        }
      }
    ],
    listaWCMRecomendaciones :
        [
          // promo por tipo linea no coincide con el tipo de linea real
          {
            idPromocion: '97e8d245450c-4ba2-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '31/03/3021 00:00',
            codigoPlanTarifario: '2441',
            TipoLinea: '2',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '5000',
            TipoFiltro: '1',
            Prioridad: '1',
            CallToAction: '',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: '1 Portal de Compras,3 Mi Claro App,8 Recargas'
          },

          // promocion plan tarifario correcto con prioridad 1 (luego d esto las promociones no son evaluadas)
          {
            idPromocion: '55555-3333-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '01/01/2099 00:00',
            codigoPlanTarifario: 'ABC',
            TipoLinea: '1',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '30000',
            TipoFiltro: '2',
            Prioridad: '1',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: ''
          },
          // promo valida por tipo linea con mismo tipo linea  OK
          {
            idPromocion: '97e8d11120c-4ba2-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo2.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '31/03/3021 00:00',
            codigoPlanTarifario: '2441',
            TipoLinea: '1',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '5000',
            TipoFiltro: '1',
            Prioridad: '2',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: '1 Portal de Compras,3 Mi Claro App,8 Recargas'
          },
          // promo no activada
          {
            idPromocion: '97e8d20c-4ba2-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo2.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '31/03/3021 00:00',
            codigoPlanTarifario: '2441',
            TipoLinea: '1',
            codigoPlanComercial: '',
            Encendido: '0',
            VecesDia: '5000',
            TipoFiltro: '1',
            Prioridad: '3',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: '1 Portal de Compras,3 Mi Claro App,8 Recargas'
          },
          // promocion caducada
          {
            idPromocion: '12233c-4ba2-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '31/03/2020 00:00',
            codigoPlanTarifario: '2441',
            TipoLinea: '2',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '5000',
            TipoFiltro: '2',
            Prioridad: '3',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: '1 Portal de Compras,3 Mi Claro App,8 Recargas'
          },
          // promocion que ya se mostró más de las veces permitidas
          {
            idPromocion: 'aaaaa6566612233c-4ba2-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '01/01/2099 00:00',
            codigoPlanTarifario: '2441',
            TipoLinea: '2',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '3',
            TipoFiltro: '2',
            Prioridad: '3',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: '1 Portal de Compras,3 Mi Claro App,8 Recargas'
          },
          // promocion Canal no valido
          {
            idPromocion: 'aaaa44444a6566612233c-4ba2-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '01/01/2099 00:00',
            codigoPlanTarifario: '2441',
            TipoLinea: '2',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '30000',
            TipoFiltro: '2',
            Prioridad: '3',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: 'Canal inexistente,Potal Compras XXX'
          },
          // promocion plan tarifario no coincide
          {
            idPromocion: '55555-4ba2-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '01/01/2099 00:00',
            codigoPlanTarifario: '2441',
            TipoLinea: '1',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '30000',
            TipoFiltro: '2',
            Prioridad: '3',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: 'Todos los canales'
          },
          // promocion plan tarifario no coincide
          {
            idPromocion: '55555-4ba2-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '01/01/2099 00:00',
            codigoPlanTarifario: '2441',
            TipoLinea: '1',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '30000',
            TipoFiltro: '2',
            Prioridad: '3',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: 'Todos los canales,YYY,AAA,BBB'
          },
          // promocion sin canales plan tarifario no coincide
          {
            idPromocion: '55555-3333-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '01/01/2099 00:00',
            codigoPlanTarifario: '2441',
            TipoLinea: '1',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '30000',
            TipoFiltro: '2',
            Prioridad: '3',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: ''
          },
          // promocion plan tarifario correcto pero prioridad mayor a la seleccionada Bingo  (osea tiene menos peso)
          {
            idPromocion: '55555-666666-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '01/01/2099 00:00',
            codigoPlanTarifario: 'ABC',
            TipoLinea: '1',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '30000',
            TipoFiltro: '2',
            Prioridad: '3',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: 'Todos los canales'
          },
          // promocion plan tarifario correcto pero prioridad mayor a la seleccionada Bingo  (osea tiene menos peso)
          {
            idPromocion: '55555-6666677778888-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '01/01/2099 00:00',
            codigoPlanTarifario: 'ABC',
            TipoLinea: '1',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '30000',
            TipoFiltro: '2',
            Prioridad: '3',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: ''
          },

        ]
  };
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: WcmService, useValue: wcmStub },
      {
        provide: ServicioCompartidoService, useValue: {
          msisdn: '963838321',
          canal: '1',
          tipoLinea: '1',
          codigoPlanTarifario: 'ABC'
        }
      }
    ],
    imports: [HttpClientModule]
  }));
  beforeEach(() => {
    const today = new Date();
    const currentDay = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const promoInfo = {
      'aaaaa6566612233c-4ba2-41c1-8ae8-ebe08446a07c': {
        // promo llego a limite
        PROMO_CURRENT_DAY: currentDay,
        PROMO_CURRENT_TIMES: 5
      },
      '97e8d11120c-4ba2-41c1-8ae8-ebe08446a07c': {
        // promo OK no se ha pasado del limite de 5000 vistas por dia
        PROMO_CURRENT_DAY: currentDay,
        PROMO_CURRENT_TIMES: 5
      }
    };
    window.localStorage[Constantes.PROMO_LOCAL_STORAGE_OBJECT_NAME] = JSON.stringify(promoInfo);

  });
  it('should validate the promo configurations  ', () => {
    const service: MethodsService = TestBed.get(MethodsService);
    expect(service).toBeTruthy();
    const promoFoundResult = service.isPromotionsModalDisplayed();
    expect(promoFoundResult.found).toBeTruthy();
    expect(promoFoundResult.index).toEqual(1);
    console.log(promoFoundResult.promociones);
    expect(promoFoundResult.promociones[0].comment.indexOf('Tipo de linea no coincide con tipo linea de promocion. Linea:') > -1)
        .toBeTruthy();

    expect(promoFoundResult.promociones[1].comment.indexOf('Bingo-!') > -1).toBeTruthy();
    expect(promoFoundResult.promociones[2].comment).toBeFalsy();
    expect(promoFoundResult.promociones[3].comment).toBeFalsy();
    expect(promoFoundResult.promociones[4].comment).toBeFalsy();
    expect(promoFoundResult.promociones[5].comment).toBeFalsy();
    expect(promoFoundResult.promociones[6].comment).toBeFalsy();
    expect(promoFoundResult.promociones[7].comment).toBeFalsy();
    expect(promoFoundResult.promociones[8].comment).toBeFalsy();
    expect(promoFoundResult.promociones[9].comment).toBeFalsy();
    expect(promoFoundResult.promociones[10].comment).toBeFalsy();
    expect(promoFoundResult.promociones[11].comment).toBeFalsy();
  });
});
describe('MethodsService > promociones testear whitelist activo y linea dentro del whitelist testear prioridad 1 Canal 2', () => {
  const wcmStub =  {
    whitelistConfig: [
      {}, {}, {}, {}, {}, {}, {
        modal: {
          allowedNumbers: [
            '963838321', '997352963', '974794467', '936787379', '976682280', '942364451'
          ],
          state: '1'
        }
      }
    ],
    listaWCMRecomendaciones :
        [
          // promo por tipo linea no coincide con el tipo de linea real
          {
            idPromocion: '97e8d245450c-4ba2-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '31/03/3021 00:00',
            codigoPlanTarifario: '2441',
            TipoLinea: '2',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '5000',
            TipoFiltro: '1',
            Prioridad: '1',
            CallToAction: '',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: '2 Mi Claro Web'
          },

          // promocion plan tarifario correcto con prioridad 1 (luego d esto las promociones no son evaluadas)
          {
            idPromocion: '55555-3333-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '01/01/2099 00:00',
            codigoPlanTarifario: 'ABC',
            TipoLinea: '1',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '30000',
            TipoFiltro: '2',
            Prioridad: '1',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: '2 Mi Claro Web'
          },
          // promo valida por tipo linea con mismo tipo linea  OK
          {
            idPromocion: '97e8d11120c-4ba2-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo2.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '31/03/3021 00:00',
            codigoPlanTarifario: '2441',
            TipoLinea: '1',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '5000',
            TipoFiltro: '1',
            Prioridad: '2',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: '1 Portal de Compras,3 Mi Claro App,8 Recargas'
          },
          // promo no activada
          {
            idPromocion: '97e8d20c-4ba2-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo2.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '31/03/3021 00:00',
            codigoPlanTarifario: '2441',
            TipoLinea: '1',
            codigoPlanComercial: '',
            Encendido: '0',
            VecesDia: '5000',
            TipoFiltro: '1',
            Prioridad: '3',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: '1 Portal de Compras,3 Mi Claro App,8  Recargas'
          },
          // promocion caducada
          {
            idPromocion: '12233c-4ba2-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '31/03/2020 00:00',
            codigoPlanTarifario: '2441',
            TipoLinea: '2',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '5000',
            TipoFiltro: '2',
            Prioridad: '3',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: '1 Portal de Compras,3 Mi Claro App,8 Recargas'
          },
          // promocion que ya se mostró más de las veces permitidas
          {
            idPromocion: 'aaaaa6566612233c-4ba2-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '01/01/2099 00:00',
            codigoPlanTarifario: '2441',
            TipoLinea: '2',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '3',
            TipoFiltro: '2',
            Prioridad: '3',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: '1 Portal de Compras,3 Mi Claro App,8 Recargas'
          },
          // promocion Canal no valido
          {
            idPromocion: 'aaaa44444a6566612233c-4ba2-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '01/01/2099 00:00',
            codigoPlanTarifario: '2441',
            TipoLinea: '2',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '30000',
            TipoFiltro: '2',
            Prioridad: '3',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: 'Canal inexistente,Potal Compras XXX'
          },
          // promocion plan tarifario no coincide
          {
            idPromocion: '55555-4ba2-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '01/01/2099 00:00',
            codigoPlanTarifario: '2441',
            TipoLinea: '1',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '30000',
            TipoFiltro: '2',
            Prioridad: '3',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: 'Todos los canales'
          },
          // promocion plan tarifario no coincide
          {
            idPromocion: '55555-4ba2-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '01/01/2099 00:00',
            codigoPlanTarifario: '2441',
            TipoLinea: '1',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '30000',
            TipoFiltro: '2',
            Prioridad: '3',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: 'Todos los canales,YYY,AAA,BBB'
          },
          // promocion sin canales plan tarifario no coincide
          {
            idPromocion: '55555-3333-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '01/01/2099 00:00',
            codigoPlanTarifario: '2441',
            TipoLinea: '1',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '30000',
            TipoFiltro: '2',
            Prioridad: '3',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: ''
          },
          // promocion plan tarifario correcto pero prioridad mayor a la seleccionada Bingo  (osea tiene menos peso)
          {
            idPromocion: '55555-666666-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '01/01/2099 00:00',
            codigoPlanTarifario: 'ABC',
            TipoLinea: '1',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '30000',
            TipoFiltro: '2',
            Prioridad: '3',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: 'Todos los canales'
          },
          // promocion plan tarifario correcto pero prioridad mayor a la seleccionada Bingo  (osea tiene menos peso)
          {
            idPromocion: '55555-6666677778888-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '01/01/2099 00:00',
            codigoPlanTarifario: 'ABC',
            TipoLinea: '1',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '30000',
            TipoFiltro: '2',
            Prioridad: '3',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: ''
          },

        ]
  };
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: WcmService, useValue: wcmStub },
      {
        provide: ServicioCompartidoService, useValue: {
          msisdn: '963838321',
          canal: '2',
          tipoLinea: '1',
          codigoPlanTarifario: 'ABC'
        }
      }
    ],
    imports: [HttpClientModule]
  }));
  beforeEach(() => {
    const today = new Date();
    const currentDay = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const promoInfo = {
      'aaaaa6566612233c-4ba2-41c1-8ae8-ebe08446a07c': {
        // promo llego a limite
        PROMO_CURRENT_DAY: currentDay,
        PROMO_CURRENT_TIMES: 5
      },
      '97e8d11120c-4ba2-41c1-8ae8-ebe08446a07c': {
        // promo OK no se ha pasado del limite de 5000 vistas por dia
        PROMO_CURRENT_DAY: currentDay,
        PROMO_CURRENT_TIMES: 5
      }
    };
    window.localStorage[Constantes.PROMO_LOCAL_STORAGE_OBJECT_NAME] = JSON.stringify(promoInfo);

  });
  it('should validate the promo configurations  ', () => {
    const service: MethodsService = TestBed.get(MethodsService);
    expect(service).toBeTruthy();
    const promoFoundResult = service.isPromotionsModalDisplayed();
    expect(promoFoundResult.found).toBeTruthy();
    expect(promoFoundResult.index).toEqual(1);
    promoFoundResult.promociones.forEach(d => {
      console.log(`(Validate the promo configuarations): ${d.comment}`);
    });
    expect(promoFoundResult.promociones[0].comment.indexOf('Tipo de linea no coincide con tipo linea de promocion. Linea:') > -1)
        .toBeTruthy();

    expect(promoFoundResult.promociones[1].comment.indexOf('Bingo-!') > -1).toBeTruthy();
    expect(promoFoundResult.promociones[2].comment).toBeFalsy();
    expect(promoFoundResult.promociones[3].comment).toBeFalsy();
    expect(promoFoundResult.promociones[4].comment).toBeFalsy();
    expect(promoFoundResult.promociones[5].comment).toBeFalsy();
    expect(promoFoundResult.promociones[6].comment).toBeFalsy();
    expect(promoFoundResult.promociones[7].comment).toBeFalsy();
    expect(promoFoundResult.promociones[8].comment).toBeFalsy();
    expect(promoFoundResult.promociones[9].comment).toBeFalsy();
    expect(promoFoundResult.promociones[10].comment).toBeFalsy();
    expect(promoFoundResult.promociones[11].comment).toBeFalsy();
  });
});
describe('MS > promociones whitelist activo y linea dentro del whitelist testear pero entre todas las opciones ninguna es valida', () => {
  const wcmStub =  {
    whitelistConfig: [
      {}, {}, {}, {}, {}, {}, {
        modal: {
          allowedNumbers: [
            '963838321', '997352963', '974794467', '936787379', '976682280', '942364451'
          ],
          state: '1'
        }
      }
    ],
    listaWCMRecomendaciones :
        [
          // promo por tipo linea no coincide con el tipo de linea real
          {
            idPromocion: '97e8d245450c-4ba2-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '31/03/2010 00:00',
            codigoPlanTarifario: '2441',
            TipoLinea: '2',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '5000',
            TipoFiltro: '1',
            Prioridad: '1',
            CallToAction: '',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: '1 Portal de Compras,3 Mi Claro App,8 Recargas'
          },

          // promocion plan tarifario correcto con prioridad 1 (luego d esto las promociones no son evaluadas)
          {
            idPromocion: '55555-3333-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '01/01/1000 00:00',
            codigoPlanTarifario: 'ABC',
            TipoLinea: '1',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '30000',
            TipoFiltro: '2',
            Prioridad: '1',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: ''
          },
          // promo valida por tipo linea con mismo tipo linea  OK
          {
            idPromocion: '97e8d11120c-4ba2-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo2.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '31/03/1200 00:00',
            codigoPlanTarifario: '2441',
            TipoLinea: '1',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '5000',
            TipoFiltro: '1',
            Prioridad: '2',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: '1 Portal de Compras,3 Mi Claro App,8 Recargas'
          },
          // promo no activada
          {
            idPromocion: '97e8d20c-4ba2-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo2.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '31/03/1456 00:00',
            codigoPlanTarifario: '2441',
            TipoLinea: '1',
            codigoPlanComercial: '',
            Encendido: '0',
            VecesDia: '5000',
            TipoFiltro: '1',
            Prioridad: '3',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: '1 Portal de Compras,3 Mi Claro App,8 Recargas'
          },
          // promocion caducada
          {
            idPromocion: '12233c-4ba2-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '31/03/1245 00:00',
            codigoPlanTarifario: '2441',
            TipoLinea: '2',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '5000',
            TipoFiltro: '2',
            Prioridad: '3',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: '1 Portal de Compras,3 Mi Claro App,8 Recargas'
          },
          // promocion que ya se mostró más de las veces permitidas
          {
            idPromocion: 'aaaaa6566612233c-4ba2-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/1245 00:00',
            FechaHoraFin: '01/01/1245 00:00',
            codigoPlanTarifario: '2441',
            TipoLinea: '2',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '3',
            TipoFiltro: '2',
            Prioridad: '3',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: '1 Portal de Compras,3 Mi Claro App,8 Recargas'
          },
          // promocion Canal no valido
          {
            idPromocion: 'aaaa44444a6566612233c-4ba2-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '01/01/1245 00:00',
            codigoPlanTarifario: '2441',
            TipoLinea: '2',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '30000',
            TipoFiltro: '2',
            Prioridad: '3',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: 'Canal inexistente,Potal Compras XXX'
          },
          // promocion plan tarifario no coincide
          {
            idPromocion: '55555-4ba2-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '01/01/1245 00:00',
            codigoPlanTarifario: '2441',
            TipoLinea: '1',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '30000',
            TipoFiltro: '2',
            Prioridad: '3',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: 'Todos los canales'
          },
          // promocion plan tarifario no coincide
          {
            idPromocion: '55555-4ba2-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '01/01/1245 00:00',
            codigoPlanTarifario: '2441',
            TipoLinea: '1',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '30000',
            TipoFiltro: '2',
            Prioridad: '3',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: 'Todos los canales,YYY,AAA,BBB'
          },
          // promocion sin canales plan tarifario no coincide
          {
            idPromocion: '55555-3333-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '01/01/1245 00:00',
            codigoPlanTarifario: '2441',
            TipoLinea: '1',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '30000',
            TipoFiltro: '2',
            Prioridad: '3',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: ''
          },
          // promocion plan tarifario correcto pero prioridad mayor a la seleccionada Bingo  (osea tiene menos peso)
          {
            idPromocion: '55555-666666-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '01/01/1245 00:00',
            codigoPlanTarifario: 'ABC',
            TipoLinea: '1',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '30000',
            TipoFiltro: '2',
            Prioridad: '3',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: 'Todos los canales'
          },
          // promocion plan tarifario correcto pero prioridad mayor a la seleccionada Bingo  (osea tiene menos peso)
          {
            idPromocion: '55555-6666677778888-41c1-8ae8-ebe08446a07c',
            Imagen: '/assets/img/promo1.jpg',
            FechaHoraInicio: '01/01/2020 00:00',
            FechaHoraFin: '01/01/1245 00:00',
            codigoPlanTarifario: 'ABC',
            TipoLinea: '1',
            codigoPlanComercial: '',
            Encendido: '1',
            VecesDia: '30000',
            TipoFiltro: '2',
            Prioridad: '3',
            CallToAction: '1',
            idProductoDeCompra: '',
            codigoCategoria: '',
            canales: ''
          },

        ]
  };
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: WcmService, useValue: wcmStub },
      {
        provide: ServicioCompartidoService, useValue: {
          msisdn: '963838321',
          canal: '1',
          tipoLinea: '1',
          codigoPlanTarifario: 'ABC'
        }
      }
    ],
    imports: [HttpClientModule]
  }));
  beforeEach(() => {
    const today = new Date();
    const currentDay = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const promoInfo = {
      'aaaaa6566612233c-4ba2-41c1-8ae8-ebe08446a07c': {
        // promo llego a limite
        PROMO_CURRENT_DAY: currentDay,
        PROMO_CURRENT_TIMES: 5
      },
      '97e8d11120c-4ba2-41c1-8ae8-ebe08446a07c': {
        // promo OK no se ha pasado del limite de 5000 vistas por dia
        PROMO_CURRENT_DAY: currentDay,
        PROMO_CURRENT_TIMES: 5
      }
    };
    window.localStorage[Constantes.PROMO_LOCAL_STORAGE_OBJECT_NAME] = JSON.stringify(promoInfo);

  });
  it('should validate the promo configurations  ', () => {
    const service: MethodsService = TestBed.get(MethodsService);
    expect(service).toBeTruthy();
    const promoFoundResult = service.isPromotionsModalDisplayed();
    expect(promoFoundResult.found).toBeFalsy();
    expect(promoFoundResult.index).toEqual(Constantes.PROMO_INDEX_NOT_FOUND);


  });
});
