import {RecomendadosComponent} from './recomendados.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {WcmService} from '../../services/wcm.service';
import {GlobalObjectService} from '../../services/global-object.service';
import {PopupService} from '../../services/popup.service';
import {FiltrarNombrePaquete} from '../../pipes/filtra-paquetes.pipe';
import {Router} from '@angular/router';
import createSpyObj = jasmine.createSpyObj;
import createSpy = jasmine.createSpy;
import {BehaviorSubject} from "rxjs";

describe('RecomendadosComponent', () => {
  let component: RecomendadosComponent;
  let fixture: ComponentFixture<RecomendadosComponent>;

  const listaFondoRecomendados = [
    '137',
    '5661',
    '4684',
    '4685',
    '4686',
    '123',
    '124',
    '125',
    '261',
    '128',
    '132'
  ];

  const listProductos = [{
    idTipoLinea: '1',
    flagValidarSaldoPontis: '1',
    nombreMetodoPago: 'Saldo de Recarga',
    iniVigencia: '2020-02-21 00:00:00.0',
    codTipoLinea: '1',
    tituloConfirma: '',
    tipoVigencia: 'DIAS',
    idMetodoPago: '4',
    subtituloConfirma: '',
    moneda2: '',
    precio: '5',
    moneda1: 'S\/',
    subtitulo: '',
    estadoMetodoPago: '1',
    catvTitulo: 'Paquetes de Internet',
    codigoPaquete: 'ICP30D200MB',
    idProductoDeCompraAsociado: '509',
    vigencia: '5',
    finVigencia: '2099-12-31 00:00:00.0',
    tituloProducto: '',
    flagPontis: '0',
    codigoProducto: 'MEGAS12',
    recomendadoCategoriaOrden: '4',
    idProductoDeCompra: '4686',
    ordenMetodoPago: '1',
    catnId: '2',
    catvCodCategoria: '1',
    cantidadFavoritos: '3',
    listaCaracteristicasProducto: [
      {
        idCaracteristica: '2384',
        estilo: 'titulo_rojo',
        orden: '1',
        idProducto: '509',
        nombre: 'DOBLE DE MB'
      },
      {
        idCaracteristica: '2385',
        estilo: 'titulo_rojo',
        orden: '2',
        idProducto: '509',
        nombre: '1.3 GB'
      },
      {
        idCaracteristica: '2386',
        estilo: 'titulo_gris',
        orden: '3',
        idProducto: '509',
        nombre: 'x 5 d\u00edas'
      },
      {
        idCaracteristica: '2387',
        estilo: 'titulo_gris',
        orden: '4',
        idProducto: '509',
        nombre: 'a S\/ 5'
      }
    ],
    nombreProducto: '1.3 GB x 5 d\u00edas a S\/5'
  }];

  let mockGlobalObjectService;
  const spyWcm = {
    listaRecomendado: [{
      idFondoRecomendado: '215931a9-8471-4f32-bf57-136a078ce455',
      titulo: 'Chévere 1',
      fechaHoraInicio: '01/04/2021 00:00',
      fechaHoraFin: '31/12/2025 00:00',
      ImagenFondo:
        'assets/img/mocks/fondos-recomendados/chevere1.jpeg',
      identificador: 'idProductoDeCompra',
      seleccion: '1',
      colorTexto: 'white',
      prioridad: '1',
      activoFlag: '1',
    },
      {
        idFondoRecomendado: '763ed331-dac9-4cf4-a150-e50a29cf039b',
        titulo: 'Chévere 2',
        fechaHoraInicio: '01/04/2021 00:00',
        fechaHoraFin: '31/12/2025 00:00',
        ImagenFondo:
          'assets/img/mocks/fondos-recomendados/X2-chev.png',
        identificador: 'idProductoDeCompra',
        seleccion: '2',
        colorTexto: 'white',
        prioridad: '1',
        activoFlag: '1',
      }]
  };

  const spyPopup = {
    currentActionMessage: new BehaviorSubject('')
  };

  beforeEach(() => {
    mockGlobalObjectService = jasmine.createSpyObj(['getObject']);
    mockGlobalObjectService.getObject.and.returnValue(listaFondoRecomendados);

    TestBed.configureTestingModule({
      declarations: [RecomendadosComponent, FiltrarNombrePaquete],
      imports: [],
      providers: [
        {provide: WcmService, useValue: spyWcm},
        {provide: Router},
        {provide: GlobalObjectService, useValue: mockGlobalObjectService},
        {provide: PopupService, useValue: spyPopup},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RecomendadosComponent);
    component = fixture.componentInstance;
    component.listProductos = listProductos;

    fixture.detectChanges();
  });


  it('EvalucionRecomendados', () => {
    expect(component.evalucionRecomendados(component.listaRecomendadosWCM).length > 0).toEqual(true);
  });

});
