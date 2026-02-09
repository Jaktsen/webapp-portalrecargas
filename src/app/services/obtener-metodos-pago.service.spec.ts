/*import { ServicioCompartidoService } from './../core/services/servicio-compartido.service';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { WefClientService } from '../core/http/wef-client.service';
import { MethodsService } from './methods.service';
import { ObtenerCreditoSaldoProductoService } from './obtener-credito-saldo-producto.service';
import { default as mockPagoSimple } from '../../assets/mocks/tests/obtenerMetodosDePago/obtenerMetodosPago.json';
import { default as mockCPNotEnough } from '../../assets/mocks/tests/obtenerMetodosDePago/claroPuntosNoSuficientesPuntos.json';
import { default as mockCRNotEnoughCred } from '../../assets/mocks/tests/obtenerMetodosDePago/pagoCargoReciboNoSuficienteCredito.json';
import { default as mockErrorPaqueteIlimitado } from '../../assets/mocks/tests/obtenerMetodosDePago/errorPaqueteIlimitado.json';
import { default as mockShowSPNotEnough } from '../../assets/mocks/tests/obtenerMetodosDePago/mostrarMensajeSaldoPrepagoInsuf.json';
import { default as mockNoShowSPNotEnough } from '../../assets/mocks/tests/obtenerMetodosDePago/noMostrarMensajeSaldoPrepagoInsuf.json';
import { default as mockErrorIDRespuesta } from '../../assets/mocks/tests/obtenerMetodosDePago/errorIdRespuesta.json';


import { ObtenerMetodosPagoService } from './obtener-metodos-pago.service';
import { of, throwError } from 'rxjs';
import { Constantes } from './constants';
import { GlobalObjectService } from './global-object.service';

const mockConfigBloqueoWCM = [
  {
    Codigos: [
      {
        M1: [
          { codigo: 'BLOQ_ROB', descripcion: 'Bloqueo por Robo' },
          { codigo: 'BLOQ_PER', descripcion: 'Bloqueo por Perdida' },
          { codigo: 'BLOQ_FRA', descripcion: 'Bloqueo por Fraude' },
          { codigo: 'BLOQ_APC', descripcion: 'Bloqueo a Pedido del Cliente' },
          { codigo: 'BLOQ_PRO', descripcion: 'Bloqueo por Uso Prohibido' },
          { codigo: 'BLOQ_S20', descripcion: 'Bloqueo S20 x fraude' },
          { codigo: 'BLOQ_S10', descripcion: 'Bloqueo S10 x fraude ( antes del BL S20)' },
          { codigo: 'BLOQ_DSC', descripcion: 'Bloqueo por Desconocimiento' }
        ]
      },
      {
        M2: [
          { codigo: 'BLOQ_COB', descripcion: 'Bloqueo por Cobranzas' },
          { codigo: 'BLOQ_FIN', descripcion: 'Bloqueo por Financiamiento' },
          { codigo: 'BLOQ_SAC', descripcion: 'Bloqueo por SAC' },
          { codigo: 'BLOQ_SES', descripcion: 'Bloqueo por SES' }
        ]
      },
      {
        M3: [
          { codigo: 'BLOQ_LC', descripcion: 'Bloqueo por Límite de Crédito' }
        ]
      }
    ]
  },
  {
    Mensajes: [
      {
        titulo: 'La línea ingresada se encuentra bloqueada',
        mensaje: 'Para ayudarte con el desbloqueo, comunícate con un asesor llamando al <strong>123</strong> ' +
            'desde un móvil Claro o al <strong>0800 00123</strong> desde un fijo',
        comment: 'Bloque de PopUp'
      },
      {
        titulo: '',
        mensaje: 'No puedes cargar la compra a tu recibo debido<br>a que tienes una <strong>deuda pendiente de pago</strong>',
        comment: 'CR - deuda pendiente '
      },
      {
        titulo: '',
        mensaje: 'No puedes cargar la compra a tu recibo debido<br>a que has <strong>superado tu límite de crédito</strong>',
        comment: 'CR - limite de credito'
      }
    ]
  }
];

describe('ObtenerMetodosPagoService', () => {
  const wefSpy = jasmine.createSpyObj('WefClientService', ['post']);
  const goSpy = jasmine.createSpyObj('GlobalObjectService', ['getObject']);
  let wefClientSpy: jasmine.SpyObj<WefClientService>;
  let goClientSpy: jasmine.SpyObj<GlobalObjectService>;
  const ocspStub =  {
    obtenerCreditoSaldoResponse: {
      creditoSaldo: {
        lineaCredito: '100',
        lblSaldoPrepago: 100
      }
    }
  };
  const scStub =  {
    isIFILTE: false,
    isAdmin: false,
    codigoBloqueo: null,
    isblockCR: false
  };
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ObtenerMetodosPagoService, MethodsService,
      { provide: WefClientService, useValue: wefSpy },
      { provide: ObtenerCreditoSaldoProductoService, useValue: ocspStub },
      { provide: ServicioCompartidoService, useValue: scStub },
      { provide: GlobalObjectService, useValue: goSpy }
    ],
    imports: [HttpClientModule],
  }
  ));

  function validar(metodoPago, mock) {
    expect(metodoPago.response.nombre).toEqual(mock.nombre);
    expect(metodoPago.response.codigo).toEqual(mock.tipoMetodoPago);
    expect(metodoPago.response.idMetodoPago).toEqual(mock.tipoMetodoPago);
    expect(metodoPago.response.fechaVigencia).toEqual(mock.fechaVigencia);
    expect(metodoPago.response.fechaCompra).toEqual(mock.fechaCompra);
    expect(metodoPago.response.precioMoneda).toEqual(mock.precioMoneda);
    expect(metodoPago.response.simboloMoneda).toEqual(mock.simboloMoneda);
    expect(metodoPago.response.cantidad).toEqual(mock.cantidad);
    expect(metodoPago.response.unidadCantidad).toEqual(mock.unidadCantidad);

    expect(metodoPago.estado).toEqual(mock.estado);
  }
  it('should obtain los metodos de pago para un producto generico', () => {
    const service: ObtenerMetodosPagoService = TestBed.get(ObtenerMetodosPagoService);
    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;

    goClientSpy = TestBed.get(GlobalObjectService) as jasmine.SpyObj<GlobalObjectService>;
    goClientSpy.getObject.and.returnValue(mockConfigBloqueoWCM);
    service.configBloqueos = goClientSpy.getObject('configBloqueos');

    console.log('dataerronea', JSON.stringify(mockPagoSimple));
    const wefObtenerMetodosPagoMock = JSON.parse(JSON.stringify(mockPagoSimple));
    console.log('eeee', wefObtenerMetodosPagoMock);
    wefClientSpy.post.and.returnValue(of(wefObtenerMetodosPagoMock));
    expect(service).toBeTruthy();
    const productoSeleccionado = {
      codTipoLinea: '1',
      idProductoDeCompra: '1223',
      catvCodCategoria: '12222'
    };
    service.obtenerMetodosDePago(productoSeleccionado).subscribe(res => {
      expect(res.idRespuesta).toEqual(wefObtenerMetodosPagoMock.comunResponseType.MessageResponse.Body.defaultServiceResponse.idRespuesta);
      expect(res.listMetodoPago.length).toEqual(4);
      // tests por cada metodo de pago
      res.listMetodoPago.forEach((metodoPago) => {
        if (metodoPago.tipoMetodoPago == Constantes.WPSMediosDePago.puntosClaro.codigo) {
          expect(metodoPago.response).not.toBeNull();
          expect(metodoPago.medioClaroPuntos).not.toBeNull();
          expect(metodoPago.medioClaroPuntos.response).toEqual(metodoPago.response);

          const mockClaroPuntos = wefObtenerMetodosPagoMock.comunResponseType.MessageResponse.Body.listaMetodoPago
              .filter(m => m.nombre == 'Claro Puntos')[0];
          expect(metodoPago.medioClaroPuntos.idMetodoPago).toEqual(mockClaroPuntos.idMetodoPago);
          expect(metodoPago.medioClaroPuntos.nombre).toEqual(mockClaroPuntos.nombre);
          expect(metodoPago.medioClaroPuntos.precioPuntos).toEqual(mockClaroPuntos.precioMoneda);
          expect(metodoPago.medioClaroPuntos.cantidad).toEqual(mockClaroPuntos.cantidad);
          expect(metodoPago.medioClaroPuntos.claroPuntos).toEqual(mockClaroPuntos.totalClaroPuntos);

          validar(metodoPago, mockClaroPuntos);


        }
        if (metodoPago.tipoMetodoPago == Constantes.WPSMediosDePago.cargarEnRecibo.codigo) {
          expect(metodoPago.response).not.toBeNull();
          expect(metodoPago.medioPagarRecibo).not.toBeNull();
          expect(metodoPago.medioPagarRecibo.response).toEqual(metodoPago.response);

          const mockCargoRecibo = wefObtenerMetodosPagoMock.comunResponseType.MessageResponse.Body.listaMetodoPago
              .filter(m => m.nombre == 'Cargo en Recibo')[0];
          console.log('mockCargoRecibo', mockCargoRecibo);
          expect(metodoPago.medioPagarRecibo.mensaje).toEqual(Constantes.mensajes.metodo_pago_cargo_recibo_mensaje);
          expect(metodoPago.medioPagarRecibo.idMetodoPago).toEqual(mockCargoRecibo.idMetodoPago);
          expect(metodoPago.medioPagarRecibo.nombre).toEqual(mockCargoRecibo.nombre);
          expect(metodoPago.medioPagarRecibo.verTerminos).toEqual(mockCargoRecibo.flagMuestraTerminosCondiciones);

          validar(metodoPago, mockCargoRecibo);

        }
        if (metodoPago.tipoMetodoPago == Constantes.WPSMediosDePago.tarjetaCredito.codigo) {
          expect(metodoPago.response).not.toBeNull();
          expect(metodoPago.medioTarjetaCredito).not.toBeNull();
          expect(metodoPago.medioTarjetaCredito.response).toEqual(metodoPago.response);
          console.log('errrrrr', JSON.stringify(metodoPago));

          const mockTC = wefObtenerMetodosPagoMock.comunResponseType.MessageResponse.Body.listaMetodoPago
              .filter(m => m.nombre == 'Tarjeta de Crédito/Débito')[0];
          console.log('mockTC', mockTC);
          expect(metodoPago.medioTarjetaCredito.idMetodoPago).toEqual(mockTC.idMetodoPago);
          expect(metodoPago.medioTarjetaCredito.nombre).toEqual(mockTC.nombre);

          validar(metodoPago, mockTC);

        }
        if (metodoPago.tipoMetodoPago == Constantes.WPSMediosDePago.saldoPrepago.codigo) {
          expect(metodoPago.response).not.toBeNull();
          expect(metodoPago.medioSaldoPrepago).not.toBeNull();
          expect(metodoPago.medioSaldoPrepago.response).toEqual(metodoPago.response);

          const mockTC = wefObtenerMetodosPagoMock.comunResponseType.MessageResponse.Body.listaMetodoPago
              .filter(m => m.nombre == 'Saldo de Recarga')[0];
          expect(metodoPago.medioSaldoPrepago.idMetodoPago).toEqual(mockTC.idMetodoPago);
          expect(metodoPago.medioSaldoPrepago.nombre).toEqual(mockTC.nombre);

          validar(metodoPago, mockTC);

        }
      });

      //  //ordenar leyenda tc 3 claro puntos 1 recibo 2 saldo recarga 4
      //  listMetodoPago= this.ordenarMetodosPago(listMetodoPago,{ 3: 1, 2: 2, 4: 3, 1: 4 });
      let i = 0;
      res.listMetodoPago.forEach(metodoPago => {
        if (i == 0) {
          expect(metodoPago.tipoMetodoPago).toEqual(Constantes.WPSMediosDePago.tarjetaCredito.codigo);
        } else if (i == 1) {
          expect(metodoPago.tipoMetodoPago).toEqual(Constantes.WPSMediosDePago.cargarEnRecibo.codigo);
        } else if (i == 2) {
          expect(metodoPago.tipoMetodoPago).toEqual(Constantes.WPSMediosDePago.saldoPrepago.codigo);
        } else if (i == 3) {
          expect(metodoPago.tipoMetodoPago).toEqual(Constantes.WPSMediosDePago.puntosClaro.codigo);
        }
        i++;
      });

    });
  });
  it('should obtain solo 1 metodo saldo prepago para un producto pontis', () => {
    const service: ObtenerMetodosPagoService = TestBed.get(ObtenerMetodosPagoService);

    goClientSpy = TestBed.get(GlobalObjectService) as jasmine.SpyObj<GlobalObjectService>;
    goClientSpy.getObject.and.returnValue(mockConfigBloqueoWCM);
    service.configBloqueos = goClientSpy.getObject('configBloqueos');


    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;
    const wefObtenerMetodosPagoMock = JSON.parse(JSON.stringify(mockPagoSimple));
    wefClientSpy.post.and.returnValue(of(wefObtenerMetodosPagoMock));
    expect(service).toBeTruthy();
    const productoSeleccionado = {
      codTipoLinea: '1',
      idProductoDeCompra: '1223',
      catvCodCategoria: Constantes.WPSCategoriasDeCompra.pontis
    };
    service.obtenerMetodosDePago(productoSeleccionado).subscribe(res => {
      console.log('RES........' + JSON.stringify(res));
      expect(res.idRespuesta).toEqual(wefObtenerMetodosPagoMock.comunResponseType.MessageResponse.Body.defaultServiceResponse.idRespuesta);
      expect(res.listMetodoPago.length).toEqual(1);
      expect(res.listMetodoPago[0].tipoMetodoPago).toEqual(Constantes.WPSMediosDePago.saldoPrepago.codigo);
      // tests por cada metodo de pago
      res.listMetodoPago.forEach((metodoPago) => {
        if (metodoPago.tipoMetodoPago == Constantes.WPSMediosDePago.saldoPrepago.codigo) {
          expect(metodoPago.response).not.toBeNull();
          expect(metodoPago.medioSaldoPrepago).not.toBeNull();
          expect(metodoPago.medioSaldoPrepago.response).toEqual(metodoPago.response);

          const mockTC = wefObtenerMetodosPagoMock.comunResponseType.MessageResponse.Body.listaMetodoPago[1];
          expect(metodoPago.medioSaldoPrepago.idMetodoPago).toEqual(mockTC.idMetodoPago);
          expect(metodoPago.medioSaldoPrepago.nombre).toEqual(mockTC.nombre);

          validar(metodoPago, mockTC);

        }
      });

    });
  });
  it('should obtain 3 metodos salvo cargo en recibo para un producto exclusivo online y prepago', () => {
    const service: ObtenerMetodosPagoService = TestBed.get(ObtenerMetodosPagoService);

    goClientSpy = TestBed.get(GlobalObjectService) as jasmine.SpyObj<GlobalObjectService>;
    goClientSpy.getObject.and.returnValue(mockConfigBloqueoWCM);
    service.configBloqueos = goClientSpy.getObject('configBloqueos');


    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;
    const wefObtenerMetodosPagoMock = JSON.parse(JSON.stringify(mockPagoSimple));
    wefClientSpy.post.and.returnValue(of(wefObtenerMetodosPagoMock));
    expect(service).toBeTruthy();
    const productoSeleccionado = {
      codTipoLinea: '1',
      idProductoDeCompra: '1223',
      catvCodCategoria: Constantes.WPSCategoriasDeCompra.paquetesExclusivosOnline
    };
    service.obtenerMetodosDePago(productoSeleccionado).subscribe(res => {
      expect(res.idRespuesta).toEqual(wefObtenerMetodosPagoMock.comunResponseType.MessageResponse.Body.defaultServiceResponse.idRespuesta);
      expect(res.listMetodoPago.length).toEqual(3);
      const exclusivoOnlineMetodosPago = [
        Constantes.WPSMediosDePago.saldoPrepago.codigo,
        Constantes.WPSMediosDePago.puntosClaro.codigo,
        Constantes.WPSMediosDePago.tarjetaCredito.codigo
      ];
      expect(exclusivoOnlineMetodosPago.includes(res.listMetodoPago[0].tipoMetodoPago)).toBeTruthy();
      expect(exclusivoOnlineMetodosPago.includes(res.listMetodoPago[1].tipoMetodoPago)).toBeTruthy();
      expect(exclusivoOnlineMetodosPago.includes(res.listMetodoPago[2].tipoMetodoPago)).toBeTruthy();

    });
  });
  it('should obtain 1 metodo solo claro puntos para un producto canje eventos', () => {
    const service: ObtenerMetodosPagoService = TestBed.get(ObtenerMetodosPagoService);
    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;
    const wefObtenerMetodosPagoMock = JSON.parse(JSON.stringify(mockPagoSimple));
    service.configBloqueos = mockConfigBloqueoWCM;
    wefClientSpy.post.and.returnValue(of(wefObtenerMetodosPagoMock));
    expect(service).toBeTruthy();
    const productoSeleccionado = {
      codTipoLinea: '1',
      idProductoDeCompra: '1223',
      catvCodCategoria: Constantes.WPSCategoriasDeCompra.canjeEventosSub1
    };
    service.obtenerMetodosDePago(productoSeleccionado).subscribe(res => {
      expect(res.idRespuesta).toEqual(wefObtenerMetodosPagoMock.comunResponseType.MessageResponse.Body.defaultServiceResponse.idRespuesta);
      expect(res.listMetodoPago.length).toEqual(1);
      expect(res.listMetodoPago[0].tipoMetodoPago).toEqual(Constantes.WPSMediosDePago.puntosClaro.codigo);
    });
  });
  it('should obtain 0 metodo cuando idRespuesta y dpIdRespuesta no son zero', () => {
    const service: ObtenerMetodosPagoService = TestBed.get(ObtenerMetodosPagoService);

    goClientSpy = TestBed.get(GlobalObjectService) as jasmine.SpyObj<GlobalObjectService>;
    goClientSpy.getObject.and.returnValue(mockConfigBloqueoWCM);
    service.configBloqueos = goClientSpy.getObject('configBloqueos');

    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;
    const wefObtenerMetodosPagoMock = mockErrorIDRespuesta;
    wefClientSpy.post.and.returnValue(of(wefObtenerMetodosPagoMock));
    expect(service).toBeTruthy();
    const productoSeleccionado = {
      codTipoLinea: '1',
      idProductoDeCompra: '1223',
      catvCodCategoria: '1111'
    };
    service.obtenerMetodosDePago(productoSeleccionado).subscribe(res => {
      expect(res.idRespuesta).toEqual(wefObtenerMetodosPagoMock.comunResponseType.MessageResponse.Body.defaultServiceResponse.idRespuesta);
      expect(res.listMetodoPago.length).toEqual(0);
    });
  });
  it('should obtain 0 metodo cuando hay error 500 de servidor', () => {
    const service: ObtenerMetodosPagoService = TestBed.get(ObtenerMetodosPagoService);

    goClientSpy = TestBed.get(GlobalObjectService) as jasmine.SpyObj<GlobalObjectService>;
    goClientSpy.getObject.and.returnValue(mockConfigBloqueoWCM);
    service.configBloqueos = goClientSpy.getObject('configBloqueos');

    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;
    wefClientSpy.post.and.returnValue(throwError({ status: 500 }));

    expect(service).toBeTruthy();
    const productoSeleccionado = {
      codTipoLinea: '1',
      idProductoDeCompra: '1223',
      catvCodCategoria: '1111'
    };
    service.obtenerMetodosDePago(productoSeleccionado).subscribe(res => {
      expect(res.idRespuesta).toEqual(Constantes.obtenerMegodosPago_GenericErrorCode);
      expect(res.listMetodoPago.length).toEqual(0);
    });
  });
  it('should disable enabled claro puntos when there are not enough puntos for non canje eventos product', () => {
    const service: ObtenerMetodosPagoService = TestBed.get(ObtenerMetodosPagoService);

    goClientSpy = TestBed.get(GlobalObjectService) as jasmine.SpyObj<GlobalObjectService>;
    goClientSpy.getObject.and.returnValue(mockConfigBloqueoWCM);
    service.configBloqueos = goClientSpy.getObject('configBloqueos');

    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;
    const wefObtenerMetodosPagoMock = mockCPNotEnough;


    wefClientSpy.post.and.returnValue(of(wefObtenerMetodosPagoMock));
    expect(service).toBeTruthy();
    const productoSeleccionado = {
      codTipoLinea: '1',
      idProductoDeCompra: '1223',
      catvCodCategoria: '1111'
    };
    service.obtenerMetodosDePago(productoSeleccionado).subscribe(res => {
      console.log('error list', res.listMetodoPago);
      expect(res.idRespuesta).toEqual(wefObtenerMetodosPagoMock.comunResponseType.MessageResponse.Body.defaultServiceResponse.idRespuesta);
      const claroPuntosMetodo = res.listMetodoPago
          .filter(metodoPago => metodoPago.tipoMetodoPago == Constantes.WPSMediosDePago.puntosClaro.codigo)[0];
      expect(claroPuntosMetodo.estado).toEqual('0');
      expect(claroPuntosMetodo.customErrorPopup.showError).toBeFalsy();
      expect(claroPuntosMetodo.customErrorPopup.messageTitle).toEqual(Constantes.WPSMensajeError.value.upps);
      expect(claroPuntosMetodo.customErrorPopup.message).toBe('xyz');
    });
  });
  it('should disable enabled cargo en recibo when there is not enough credit', () => {
    const service: ObtenerMetodosPagoService = TestBed.get(ObtenerMetodosPagoService);

    goClientSpy = TestBed.get(GlobalObjectService) as jasmine.SpyObj<GlobalObjectService>;
    goClientSpy.getObject.and.returnValue(mockConfigBloqueoWCM);
    service.configBloqueos = goClientSpy.getObject('configBloqueos');

    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;
    const wefObtenerMetodosPagoMockJsonFile = mockCRNotEnoughCred;
    const wefObtenerMetodosPagoMock =    JSON.parse(JSON.stringify( wefObtenerMetodosPagoMockJsonFile));


    wefClientSpy.post.and.returnValue(of(wefObtenerMetodosPagoMock));
    expect(service).toBeTruthy();
    const productoSeleccionado = {
      codTipoLinea: '1',
      idProductoDeCompra: '1223',
      catvCodCategoria: '1111'
    };
    service.obtenerMetodosDePago(productoSeleccionado).subscribe(res => {
      expect(res.idRespuesta).toEqual(wefObtenerMetodosPagoMock.comunResponseType.MessageResponse.Body.defaultServiceResponse.idRespuesta);
      const metodoPago = res.listMetodoPago.filter(met => met.tipoMetodoPago == Constantes.WPSMediosDePago.cargarEnRecibo.codigo)[0];
      expect(metodoPago.estado).toEqual('0');
      expect(metodoPago.medioPagarRecibo.mensaje).toEqual(Constantes.mensajes.metodo_pago_cargo_recibo_mensaje);
    });
  });
  it('should prepare ErrorPaqueteIlimitado info for backend disabled TC', () => {
    const service: ObtenerMetodosPagoService = TestBed.get(ObtenerMetodosPagoService);

    goClientSpy = TestBed.get(GlobalObjectService) as jasmine.SpyObj<GlobalObjectService>;
    goClientSpy.getObject.and.returnValue(mockConfigBloqueoWCM);
    service.configBloqueos = goClientSpy.getObject('configBloqueos');

    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;
    const wefObtenerMetodosPagoMock = JSON.parse(JSON.stringify(mockErrorPaqueteIlimitado));

    const errorPaqueteIlimitadoMessage = 'yyyyyy';


    wefClientSpy.post.and.returnValue(of(wefObtenerMetodosPagoMock));
    expect(service).toBeTruthy();
    const productoSeleccionado = {
      codTipoLinea: '1',
      idProductoDeCompra: '1223',
      catvCodCategoria: '1111'
    };
    service.obtenerMetodosDePago(productoSeleccionado).subscribe(res => {
      expect(res.idRespuesta).toEqual(wefObtenerMetodosPagoMock.comunResponseType.MessageResponse.Body.defaultServiceResponse.idRespuesta);
      const metodoPago = res.listMetodoPago.filter(met => met.tipoMetodoPago == Constantes.WPSMediosDePago.tarjetaCredito.codigo)[0];
      expect(metodoPago.estado).toEqual('0');
      expect(metodoPago.customErrorPopup.showError).toBeTruthy();
      expect(metodoPago.customErrorPopup.messageTitle).toBe(Constantes.WPSMensajeError.value.atencion);
      expect(metodoPago.customErrorPopup.message).toBe(errorPaqueteIlimitadoMessage);
    });
  });
  it('should set mostrarMensajeSaldoPrepagoInsuficiente false given haySaldoPrepagoSuficiente, met SP comes enabled and cred is 100',
      () => {
    const service: ObtenerMetodosPagoService = TestBed.get(ObtenerMetodosPagoService);

    goClientSpy = TestBed.get(GlobalObjectService) as jasmine.SpyObj<GlobalObjectService>;
    goClientSpy.getObject.and.returnValue(mockConfigBloqueoWCM);
    service.configBloqueos = goClientSpy.getObject('configBloqueos');

    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;
    const wefObtenerMetodosPagoMock = Object.assign({}, mockNoShowSPNotEnough);



    wefClientSpy.post.and.returnValue(of(wefObtenerMetodosPagoMock));
    expect(service).toBeTruthy();
    const productoSeleccionado = {
      codTipoLinea: '1',
      idProductoDeCompra: '1223',
      catvCodCategoria: '1111'
    };
    service.obtenerMetodosDePago(productoSeleccionado).subscribe(res => {
      expect(res.idRespuesta).toEqual(wefObtenerMetodosPagoMock.comunResponseType.MessageResponse.Body.defaultServiceResponse.idRespuesta);
      const metodoPago = res.listMetodoPago.filter(met => met.tipoMetodoPago == Constantes.WPSMediosDePago.saldoPrepago.codigo)[0];
      expect(metodoPago.estado).toEqual('1');
      expect(metodoPago.mostrarMensajeSaldoPrepagoInsuficiente).toBeFalsy();
    });
  });
  it('should set mostrarMensajeSaldoPrepagoInsuficiente true given no haySaldoPrepagoSuficiente and met SP comes enabled, cred es 100',
      () => {
    const service: ObtenerMetodosPagoService = TestBed.get(ObtenerMetodosPagoService);

    goClientSpy = TestBed.get(GlobalObjectService) as jasmine.SpyObj<GlobalObjectService>;
    goClientSpy.getObject.and.returnValue(mockConfigBloqueoWCM);
    service.configBloqueos = goClientSpy.getObject('configBloqueos');


    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;
    const wefObtenerMetodosPagoMock = JSON.parse(JSON.stringify(mockShowSPNotEnough));

    wefClientSpy.post.and.returnValue(of(wefObtenerMetodosPagoMock));
    expect(service).toBeTruthy();
    const productoSeleccionado = {
      codTipoLinea: '1',
      idProductoDeCompra: '1223',
      catvCodCategoria: '1111'
    };
    service.obtenerMetodosDePago(productoSeleccionado).subscribe(res => {
      expect(res.idRespuesta).toEqual(wefObtenerMetodosPagoMock.comunResponseType.MessageResponse.Body.defaultServiceResponse.idRespuesta);
      const metodoPago = res.listMetodoPago.filter(met => met.tipoMetodoPago == Constantes.WPSMediosDePago.saldoPrepago.codigo)[0];
      console.log(metodoPago);
      expect(metodoPago.estado).toEqual('0');
      expect(metodoPago.mostrarMensajeSaldoPrepagoInsuficiente).toBeTruthy();
    });
  });
});

describe('ObtenerMetodosPagoService > getMetodosPagoProductoInformacionLink > categoria SMS', () => {
  const wefSpy = jasmine.createSpyObj('WefClientService', ['post']);

  let wefClientSpy: jasmine.SpyObj<WefClientService>;
  const ocspStub =  {
  };
  const scStub =  {
    tipoCliente: '2',
    tipoLinea: '1'
  };
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ObtenerMetodosPagoService, MethodsService,
      { provide: WefClientService, useValue: wefSpy },
      { provide: ObtenerCreditoSaldoProductoService, useValue: ocspStub },
      { provide: ServicioCompartidoService, useValue: scStub }
    ],
    imports: [HttpClientModule],
  }));
  it('should return getMetodosPagoProductoInformacionLink OK', () => {
    const service: ObtenerMetodosPagoService = TestBed.get(ObtenerMetodosPagoService);
    service.configBloqueos = mockConfigBloqueoWCM;

    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;
    expect(service.getMetodosPagoProductoInformacionLink( Constantes.WPSCategoriasDeCompra.smsmms))
        .toEqual('https://www.claro.com.pe/personas/movil/beneficios-adicionales/sms-ilimitado-1sol/');
  });
});
describe('ObtenerMetodosPagoService > getMetodosPagoProductoInformacionLink > linea corporativa', () => {
  const wefSpy = jasmine.createSpyObj('WefClientService', ['post']);
  let wefClientSpy: jasmine.SpyObj<WefClientService>;
  const ocspStub =  {
  };
  const scStub =  {
    tipoCliente: '2',
    tipoLinea: '2'
  };
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ObtenerMetodosPagoService, MethodsService,
      { provide: WefClientService, useValue: wefSpy },
      { provide: ObtenerCreditoSaldoProductoService, useValue: ocspStub },
      { provide: ServicioCompartidoService, useValue: scStub }
    ],
    imports: [HttpClientModule],
  }));
  it('should return getMetodosPagoProductoInformacionLink OK', () => {
    const service: ObtenerMetodosPagoService = TestBed.get(ObtenerMetodosPagoService);
    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;
    expect(service.getMetodosPagoProductoInformacionLink('categoria'))
        .toEqual('https://www.claro.com.pe/negocios/movil/recargas/?tab=internet');
  });
});
describe('ObtenerMetodosPagoService > getMetodosPagoProductoInformacionLink > flujo recargas y prepago', () => {
  const wefSpy = jasmine.createSpyObj('WefClientService', ['post']);
  let wefClientSpy: jasmine.SpyObj<WefClientService>;
  const ocspStub =  {
  };
  const ms = {
    isFlowPortalRecargas: () => true
  };
  const scStub =  {
    tipoCliente: '2',
    tipoLinea: '1',
    canal: '8',
    recarga: true
  };
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ObtenerMetodosPagoService, MethodsService,
      { provide: WefClientService, useValue: wefSpy },
      { provide: ObtenerCreditoSaldoProductoService, useValue: ocspStub },
      { provide: ServicioCompartidoService, useValue: scStub },
      { provide: MethodsService, useValue: ms }
    ],
    imports: [HttpClientModule],
  }));
  it('should return getMetodosPagoProductoInformacionLink OK', () => {
    const service: ObtenerMetodosPagoService = TestBed.get(ObtenerMetodosPagoService);
    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;
    expect(service.getMetodosPagoProductoInformacionLink('categoria'))
        .toEqual('https://www.claro.com.pe/personas/movil/prepago/?tab=recarga5');
  });
});
describe('ObtenerMetodosPagoService > getMetodosPagoProductoInformacionLink > flujo recargas y no prepago', () => {
  const wefSpy = jasmine.createSpyObj('WefClientService', ['post']);
  let wefClientSpy: jasmine.SpyObj<WefClientService>;
  const ocspStub =  {
  };
  const scStub =  {
    tipoCliente: '1',
    tipoLinea: '2',
    canal: '8',
    recarga: true
  };
  const ms = {
    isFlowPortalRecargas: () => true
  };
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ObtenerMetodosPagoService, MethodsService,
      { provide: WefClientService, useValue: wefSpy },
      { provide: ObtenerCreditoSaldoProductoService, useValue: ocspStub },
      { provide: ServicioCompartidoService, useValue: scStub },
      { provide: MethodsService, useValue: ms }
    ],
    imports: [HttpClientModule],
  }));
  it('should return getMetodosPagoProductoInformacionLink OK', () => {
    const service: ObtenerMetodosPagoService = TestBed.get(ObtenerMetodosPagoService);
    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;
    expect(service.getMetodosPagoProductoInformacionLink('categoria'))
        .toEqual('https://www.claro.com.pe/personas/movil/beneficios-adicionales/?tab=postpago');
  });
});
describe('ObtenerMetodosPagoService > ordenarMetodosPago ', () => {
  const wefSpy = jasmine.createSpyObj('WefClientService', ['post']);
  let wefClientSpy: jasmine.SpyObj<WefClientService>;
  const ocspStub =  {
  };
  const scStub =  {
    tipoCliente: '1',
    tipoLinea: '2',
    canal: '1',
    recarga: false
  };
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ObtenerMetodosPagoService, MethodsService,
      { provide: WefClientService, useValue: wefSpy },
      { provide: ObtenerCreditoSaldoProductoService, useValue: ocspStub },
      { provide: ServicioCompartidoService, useValue: scStub }
    ],
    imports: [HttpClientModule],
  }));
  it('should return ordenarMetodosPago OK', () => {
    const service: ObtenerMetodosPagoService = TestBed.get(ObtenerMetodosPagoService);
    service.configBloqueos = mockConfigBloqueoWCM;

    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;
    let listMetodoPago = [
      {
        nombre: 'Claro Puntos',
        tipoMetodoPago: '1',
      },
      {
        nombre: 'Saldo de Recarga',
        tipoMetodoPago: '4'
      },
      {
        nombre: 'Tarjeta de Crédito/Débito',
        tipoMetodoPago: '3'
      },
      {
        nombre: 'Cargo en Recibo',
        tipoMetodoPago: '2'
      }
    ]
      ;
    listMetodoPago = service.ordenarMetodosPago(listMetodoPago, { 3: 1, 2: 2, 4: 3, 1: 4 });
    let i = 0;
    listMetodoPago.forEach(metodoPago => {
      if (i == 0) {
        expect(metodoPago.nombre).toEqual('Tarjeta de Crédito/Débito');
      } else if (i == 1) {
        expect(metodoPago.nombre).toEqual('Cargo en Recibo');
      } else if (i == 2) {
        expect(metodoPago.nombre).toEqual('Saldo de Recarga');
      } else {
        expect(metodoPago.nombre).toEqual('Claro Puntos');
      }
      i++;
    });

    listMetodoPago = [
      {
        nombre: 'Claro Puntos',
        tipoMetodoPago: '1',
      }
    ]
      ;
    listMetodoPago = service.ordenarMetodosPago(listMetodoPago, { 3: 1, 2: 2, 4: 3, 1: 4 });
    expect(listMetodoPago[0].nombre).toEqual('Claro Puntos');

  });
});

describe('ObtenerMetodosPagoService > getMetodosPagoProductoInformacionLink > else prepago', () => {
  const wefSpy = jasmine.createSpyObj('WefClientService', ['post']);
  let wefClientSpy: jasmine.SpyObj<WefClientService>;
  const ocspStub =  {
  };
  const scStub =  {
    tipoCliente: '1',
    tipoLinea: '1',
    canal: '1',
    recarga: false
  };
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ObtenerMetodosPagoService, MethodsService,
      { provide: WefClientService, useValue: wefSpy },
      { provide: ObtenerCreditoSaldoProductoService, useValue: ocspStub },
      { provide: ServicioCompartidoService, useValue: scStub }
    ],
    imports: [HttpClientModule],
  }));
  it('should return getMetodosPagoProductoInformacionLink OK', () => {
    const service: ObtenerMetodosPagoService = TestBed.get(ObtenerMetodosPagoService);
    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;
    const pqteMegasLink = 'https://www.claro.com.pe/personas/movil/prepago/paquetes/#megas';
    expect(service.getMetodosPagoProductoInformacionLink('categoria')).toEqual(pqteMegasLink);
  });
});
describe('ObtenerMetodosPagoService > getMetodosPagoProductoInformacionLink > else postpago', () => {
  const wefSpy = jasmine.createSpyObj('WefClientService', ['post']);
  let wefClientSpy: jasmine.SpyObj<WefClientService>;
  const ocspStub =  {
  };
  const scStub =  {
    tipoCliente: '1',
    tipoLinea: '2',
    canal: '1',
    recarga: false
  };
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ObtenerMetodosPagoService, MethodsService,
      { provide: WefClientService, useValue: wefSpy },
      { provide: ObtenerCreditoSaldoProductoService, useValue: ocspStub },
      { provide: ServicioCompartidoService, useValue: scStub }
    ],
    imports: [HttpClientModule],
  }));
  it('should return getMetodosPagoProductoInformacionLink OK', () => {
    const service: ObtenerMetodosPagoService = TestBed.get(ObtenerMetodosPagoService);
    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;
    const linkPostpago = 'https://www.claro.com.pe/personas/beneficios/movil/paquetes-internet/';
    expect(service.getMetodosPagoProductoInformacionLink('categoria')).toEqual(linkPostpago);
  });
});
*/