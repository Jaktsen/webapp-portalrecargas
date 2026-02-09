import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { WefClientService } from '../core/http/wef-client.service';
import { ServicioCompartidoService } from '../core/services/servicio-compartido.service';
import { MantenimientoFavoritosRequest } from '../shared/components/mantenimientoFavoritosRequest';
import { Constantes } from './constants';
import { GlobalObjectService } from './global-object.service';
import { MethodsService } from './methods.service';
import { default as obtenerFavoritosOneProductAsObject } from '../../assets/mocks/obtenerFavoritosOneProductAsObject.json';
import { ProductosFavoritosService } from './productos-favoritos.service';
import { ProductosRecomendadosService } from './productos-recomendados.service';

describe('ProductosFavoritosService', () => {
  const spy = jasmine.createSpyObj('WefClientService', ['post']);
  let wefClientSpy: jasmine.SpyObj<WefClientService>;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [ProductosFavoritosService, { provide: WefClientService, useValue: spy }, MethodsService, GlobalObjectService,
      {
        provide: ProductosRecomendadosService, useValue: {
          obtenerRecomendadosResponse: {
            listaProductosCompra: [
              {
                idProductoDeCompraAsociado: '137',
                listaCaracteristicasProducto: [
                  {
                    idCaracteristica: '281',
                    estilo: 'titulo_rojo',
                    orden: '1',
                    idProducto: '137',
                    nombre: 'Facebook, Twitter'
                  },
                  {
                    idCaracteristica: '198',
                    estilo: 'titulo_rojo',
                    orden: '2',
                    idProducto: '137',
                    nombre: 'y Whatsapp'
                  },
                  {
                    idCaracteristica: '199',
                    estilo: 'titulo_gris',
                    orden: '3',
                    idProducto: '137',
                    nombre: 'x 1 d\u00eda'
                  },
                  {
                    idCaracteristica: '200',
                    estilo: 'titulo_gris',
                    orden: '4',
                    idProducto: '137',
                    nombre: 'a S/ 1'
                  }
                ],
                nombreProducto: 'Facebook, Twitter y Whatsapp x1 d\u00eda a S/1'
              },
              {
                idProductoDeCompraAsociado: '222222',
                listaCaracteristicasProducto: [
                  {nombre: 'xxx'},
                  {nombre: 'yyy'},
                ]
              }
            ]
          }
        }
      },
      {
        provide: ServicioCompartidoService, useValue: {
          msisdn:  '942680930'
      } }],
    imports: [HttpClientModule],
  }));

  beforeEach(() => {
    sessionStorage.clear();
  });

  const defaultListaProductos = [
    {
      idTipoLinea: '2',
      flagValidarSaldoPontis: '1',
      nombreMetodoPago: 'Claro Puntos',
      iniVigencia: '2017-09-01 00:00:00.0',
      codTipoLinea: '2',
      tipoVigencia: 'DIAS',
      idMetodoPago: '21',
      precio: '64',
      moneda2: 'Claro Puntos',
      estadoMetodoPago: '1',
      catvTitulo: 'Paquetes de Megas',
      codigoPaquete: 'D_PQT100MB',
      idProductoDeCompraAsociado: '128',
      vigencia: '2',
      finVigencia: '2099-09-30 00:00:00.0',
      tituloProducto: '',
      codigoProducto: '',
      recomendadoCategoriaOrden: '9999',
      idProductoDeCompra: '128',
      ordenMetodoPago: '1',
      catnId: '2',
      catvCodCategoria: '1',
      cantidadFavoritos: '3',
      listaCaracteristicasProducto: [
        {
          idCaracteristica: '159',
          estilo: 'titulo_rojo',
          orden: '1',
          idProducto: '128',
          nombre: '200MB'
        },
        {
          idCaracteristica: '160',
          estilo: 'titulo_gris',
          orden: '2',
          idProducto: '128',
          nombre: 'x 2 d\u00edas'
        },
        {
          idCaracteristica: '161',
          estilo: 'titulo_gris',
          orden: '3',
          idProducto: '128',
          nombre: 'a S/ 3'
        }
      ],
      nombreProducto: '200MB x 2 d\u00edas a S/3'
    },
    {
      idTipoLinea: '2',
      flagValidarSaldoPontis: '1',
      nombreMetodoPago: 'Claro Puntos',
      iniVigencia: '2017-09-01 00:00:00.0',
      codTipoLinea: '2',
      tipoVigencia: 'DIAS',
      idMetodoPago: '21',
      moneda2: 'Claro Puntos',
      precio: '22',
      subtitulo: '',
      estadoMetodoPago: '1',
      catvTitulo: 'Redes Sociales',
      codigoPaquete: 'R_SOCIAL1D',
      idProductoDeCompraAsociado: '137',
      vigencia: '1',
      finVigencia: '2099-09-30 00:00:00.0',
      tituloProducto: '',
      codigoProducto: '',
      recomendadoCategoriaOrden: '9999',
      idProductoDeCompra: '137',
      ordenMetodoPago: '1',
      catnId: '3',
      catvCodCategoria: '10',
      cantidadFavoritos: '3',
      listaCaracteristicasProducto: [
        {
          idCaracteristica: '281',
          estilo: 'titulo_rojo',
          orden: '1',
          idProducto: '137',
          nombre: 'Facebook, Twitter'
        },
        {
          idCaracteristica: '198',
          estilo: 'titulo_rojo',
          orden: '2',
          idProducto: '137',
          nombre: 'y Whatsapp'
        },
        {
          idCaracteristica: '199',
          estilo: 'titulo_gris',
          orden: '3',
          idProducto: '137',
          nombre: 'x 1 d\u00eda'
        },
        {
          idCaracteristica: '200',
          estilo: 'titulo_gris',
          orden: '4',
          idProducto: '137',
          nombre: 'a S/ 1'
        }
      ],
      nombreProducto: 'Facebook, Twitter y Whatsapp x1 d\u00eda a S/1'
    }
  ];

  let testData = {
    dpIdRespuesta: '0',
    idRespuesta: '0',
    listaProductos: '[]'
  };
  function getMockData() {
    return  `{
      "comunResponseType": {
        "MessageResponse": {
          "Body": {
            "listaProductosDeCompra": ${testData.listaProductos},
            "defaultServiceResponse": {
              "idSesion": "62be964d-d4f9-463e-920b-0b638e9e5406",
              "mensaje": "Consulta con ?xito, se proces? correctamente la solicitud.",
              "idTransaccional": "b48774ef-3359-46cb-a455-80ad43da2420",
              "idRespuesta": "${testData.idRespuesta}"
            }
          },
          "Header": {
            "HeaderResponse": {
              "status": {
                "type": "${testData.dpIdRespuesta}",
                "code": "0",
                "msgid": "DPS01-7ada25ff-ae13-4d1b-aff2-efc974d82d8c",
                "message": "EJECUCI\u00d3N CON \u00c9XITO"
              },
              "pid": "58656374-124c-45b5-a5f4-dde2b8dabaa3",
              "consumer": "",
              "timestamp": "2020-11-30T15:13:14-06:00",
              "VarArg": ""
            }
          }
        }
      }
    }
    `; }
  function getNullProductsMockData() {
    return  `{
      "comunResponseType": {
        "MessageResponse": {
          "Body": {
            "listaProductosDeCompra": null,
            "defaultServiceResponse": {
              "idSesion": "62be964d-d4f9-463e-920b-0b638e9e5406",
              "mensaje": "Consulta con ?xito, se proces? correctamente la solicitud.",
              "idTransaccional": "b48774ef-3359-46cb-a455-80ad43da2420",
              "idRespuesta": "${testData.idRespuesta}"
            }
          },
          "Header": {
            "HeaderResponse": {
              "status": {
                "type": "${testData.dpIdRespuesta}",
                "code": "0",
                "msgid": "DPS01-7ada25ff-ae13-4d1b-aff2-efc974d82d8c",
                "message": "EJECUCI\u00d3N CON \u00c9XITO"
              },
              "pid": "58656374-124c-45b5-a5f4-dde2b8dabaa3",
              "consumer": "",
              "timestamp": "2020-11-30T15:13:14-06:00",
              "VarArg": ""
            }
          }
        }
      }
    }
    `; }


  it('should process 2 favorite products but 1 is repeated with recomendados resultando en 1 favorito', () => {
    const service: ProductosFavoritosService = TestBed.get(ProductosFavoritosService);
    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;
    testData = {
      dpIdRespuesta: '0',
      idRespuesta: '0',
      listaProductos: JSON.stringify(defaultListaProductos)
    };
    wefClientSpy.post.and.returnValue(of(JSON.parse(getMockData())));
    expect(service).toBeTruthy();
    service.obtenerFavoritos(() => {
      expect(service.obtenerFavoritosResponse.idRespuesta).toEqual(testData.idRespuesta);
      expect(service.obtenerFavoritosResponse.listaProductosFavoritos).not.toBeNull();
      expect(service.obtenerFavoritosResponse.listaProductosFavoritos.length).toEqual(2);
      expect(Number(window.sessionStorage.getItem(Constantes.CANT_ACTUAL_label))).toEqual(2);
      expect(window.sessionStorage.getItem(Constantes.CANT_FAVORITOS_label)).toEqual(defaultListaProductos[0].cantidadFavoritos);
    });
  });
  it('should process 2 favorite products but 1 product is repeated with recomendados, al final favoritos solo tendra 1', () => {
    const service: ProductosFavoritosService = TestBed.get(ProductosFavoritosService);
    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;
    testData = {
      dpIdRespuesta: '0',
      idRespuesta: '0',
      listaProductos: JSON.stringify(defaultListaProductos)
    };
    wefClientSpy.post.and.returnValue(of(JSON.parse(getMockData())));
    expect(service).toBeTruthy();
    service.obtenerFavoritos(() => {
      expect(service.obtenerFavoritosResponse.idRespuesta).toEqual(testData.idRespuesta);
      expect(service.obtenerFavoritosResponse.listaProductosFavoritos).not.toBeNull();
      expect(service.obtenerFavoritosResponse.listaProductosFavoritos.length).toEqual(2);
      expect(Number(window.sessionStorage.getItem(Constantes.CANT_ACTUAL_label))).toEqual(2);
      expect(window.sessionStorage.getItem(Constantes.CANT_FAVORITOS_label)).toEqual(defaultListaProductos[0].cantidadFavoritos);
    });
  });
  it('should process 3 fav px but 1 belongs to non allowed fav category and 1 repeated with recomendados resulting in only 1 favorites',
      () => {
    const service: ProductosFavoritosService = TestBed.get(ProductosFavoritosService);
    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;
    const defaultListaProductosClone = [];
    defaultListaProductos.forEach(val => defaultListaProductosClone.push(Object.assign({}, val)));
    defaultListaProductosClone.unshift({
      catvCodCategoria: Constantes.WPSCategoriasDeCompra.prestameMegas
    });
    console.log('defaultListaProductosClone', defaultListaProductosClone);
    console.log('defaultListaProductosClone size', defaultListaProductosClone.length);
    testData = {
      dpIdRespuesta: '0',
      idRespuesta: '0',
      listaProductos: JSON.stringify(defaultListaProductosClone)
    };
    const mockData = JSON.parse(getMockData());
    console.log('mockData', JSON.stringify(mockData));
    wefClientSpy.post.and.returnValue(of(mockData));
    // expect(service).toBeTruthy();
    service.obtenerFavoritos(() => {
      expect(service.obtenerFavoritosResponse.idRespuesta).toEqual(testData.idRespuesta);
      expect(service.obtenerFavoritosResponse.listaProductosFavoritos).not.toBeNull();
      console.log('service', service.obtenerFavoritosResponse);
      expect(service.obtenerFavoritosResponse.listaProductosFavoritos.length).toEqual(2);
      expect(Number(window.sessionStorage.getItem(Constantes.CANT_ACTUAL_label))).toEqual(2);
      expect(window.sessionStorage.getItem(Constantes.CANT_FAVORITOS_label)).toEqual(defaultListaProductos[0].cantidadFavoritos);
    });
  });
  it('should process 5 fav px but 2 belong to non allowed fav cat and 1 repeated con recomendados resulting in only 2 favorites',
      () => {
    const service: ProductosFavoritosService = TestBed.get(ProductosFavoritosService);
    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;
    const defaultListaProductosClone = [];
    defaultListaProductos.forEach(val => defaultListaProductosClone.push(Object.assign({}, val)));

    defaultListaProductosClone.unshift({
      catvCodCategoria: 888888888888888888888888,
      cantidadFavoritos: 3
    });
    defaultListaProductosClone.unshift({
      catvCodCategoria: Constantes.WPSCategoriasDeCompra.prestameMegas
      , cantidadFavoritos: 3
    });
    defaultListaProductosClone.unshift({
            catvCodCategoria: Constantes.WPSCategoriasDeCompra.prestameMegas,
            cantidadFavoritos: 3
          });
    console.log('defaultListaProductosClone', defaultListaProductosClone);
    console.log('defaultListaProductosClone size', defaultListaProductosClone.length);
    testData = {
      dpIdRespuesta: '0',
      idRespuesta: '0',
      listaProductos: JSON.stringify(defaultListaProductosClone)
    };
    const mockData = JSON.parse(getMockData());
    console.log('mockData', JSON.stringify(mockData));
    wefClientSpy.post.and.returnValue(of(mockData));
    // expect(service).toBeTruthy();
    service.obtenerFavoritos(() => {
      expect(service.obtenerFavoritosResponse.idRespuesta).toEqual(testData.idRespuesta);
      expect(service.obtenerFavoritosResponse.listaProductosFavoritos).not.toBeNull();
      console.log('service', service.obtenerFavoritosResponse);
      service.obtenerFavoritosResponse.listaProductosFavoritos.forEach((el) => { console.log(el.catvCodCategoria ); });
      expect(service.obtenerFavoritosResponse.listaProductosFavoritos.length).toEqual(3);
      expect(Number(window.sessionStorage.getItem(Constantes.CANT_ACTUAL_label))).toEqual(3);
      expect(window.sessionStorage.getItem(Constantes.CANT_FAVORITOS_label)).toEqual(defaultListaProductos[0].cantidadFavoritos);
    });
  });

  it('should process 1 favorite product', () => {
    const service: ProductosFavoritosService = TestBed.get(ProductosFavoritosService);
    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;

    const defaultListaProductosClone = defaultListaProductos[0];
    testData = {
      dpIdRespuesta: '0',
      idRespuesta: '0',
      listaProductos: JSON.stringify(defaultListaProductosClone)
    };
    const mockResponse = JSON.parse(getMockData());
    console.log('mockResponse', JSON.stringify(mockResponse));
    wefClientSpy.post.and.returnValue(of(mockResponse));
    expect(service).toBeTruthy();
    service.obtenerFavoritos(() => {
      console.log('service.obtenerFavoritosResponse', service.obtenerFavoritosResponse);
      expect(service.obtenerFavoritosResponse.idRespuesta).toEqual(testData.idRespuesta);
      expect(service.obtenerFavoritosResponse.listaProductosFavoritos).not.toBeNull();
      expect(service.obtenerFavoritosResponse.listaProductosFavoritos.length).toEqual(1);
      expect(Number(window.sessionStorage.getItem(Constantes.CANT_ACTUAL_label)))
          .toEqual(service.obtenerFavoritosResponse.listaProductosFavoritos.length);
      expect(window.sessionStorage.getItem(Constantes.CANT_FAVORITOS_label)).toEqual(defaultListaProductosClone.cantidadFavoritos);
    });
  });
  it('should process null favorite product', () => {
    const service: ProductosFavoritosService = TestBed.get(ProductosFavoritosService);
    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;

    testData = {
      dpIdRespuesta: '0',
      idRespuesta: '0',
      listaProductos: null
    };
    const mockResponse = JSON.parse(getNullProductsMockData());
    console.log('mockResponse', JSON.stringify(mockResponse));
    wefClientSpy.post.and.returnValue(of(mockResponse));
    expect(service).toBeTruthy();
    service.obtenerFavoritos(() => {
      expect(service.obtenerFavoritosResponse.idRespuesta).toEqual(testData.idRespuesta);
      expect(service.obtenerFavoritosResponse.listaProductosFavoritos.length).toEqual(0);
      expect(Number(window.sessionStorage.getItem(Constantes.CANT_ACTUAL_label))).toEqual(0);
      expect(window.sessionStorage.getItem(Constantes.CANT_FAVORITOS_label)).toBeNull();
    });
  });
});
describe('ProductosFavoritosService', () => {
  const spy = jasmine.createSpyObj('WefClientService', ['post']);
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ProductosFavoritosService, { provide: WefClientService, useValue: spy }, MethodsService, GlobalObjectService,
      {
        provide: ProductosRecomendadosService, useValue: {}
      },
      {
        provide: ServicioCompartidoService, useValue: {
          msisdn:  '942680930'
      } }],
    imports: [HttpClientModule],
  }));

  beforeEach(() => {
    sessionStorage.clear();
  });
  it('should mark flujo favorito in sessionStorage', () => {
    const service: ProductosFavoritosService = TestBed.get(ProductosFavoritosService);
    expect(service).toBeTruthy();
    service.flujoFav('N');
    expect(sessionStorage.getItem(Constantes.flagFav)).toEqual('N');
    service.flujoFav('S');
    expect(sessionStorage.getItem(Constantes.flagFav)).toEqual('S');
    service.flujoFav(null);
    expect(sessionStorage.getItem(Constantes.flagFav)).toEqual('null');
  });
});
describe('ProductosFavoritosService sin recomendados', () => {
  const spy = jasmine.createSpyObj('WefClientService', ['post']);
  let wefClientSpy: jasmine.SpyObj<WefClientService>;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [ProductosFavoritosService, { provide: WefClientService, useValue: spy }, MethodsService, GlobalObjectService,
      {
        provide: ProductosRecomendadosService, useValue: {
          obtenerRecomendadosResponse: {
            listaProductosCompra: [
              {
                idProductoDeCompraAsociado: '137',
                listaCaracteristicasProducto: [
                  {
                    idCaracteristica: '281',
                    estilo: 'titulo_rojo',
                    orden: '1',
                    idProducto: '137',
                    nombre: 'Facebook, Twitterdddd'
                  },
                  {
                    idCaracteristica: '198',
                    estilo: 'titulo_rojo',
                    orden: '2',
                    idProducto: '137',
                    nombre: 'y Whatsapp'
                  },
                  {
                    idCaracteristica: '199',
                    estilo: 'titulo_gris',
                    orden: '3',
                    idProducto: '137',
                    nombre: 'x 1 d\u00eda'
                  },
                  {
                    idCaracteristica: '200',
                    estilo: 'titulo_gris',
                    orden: '4',
                    idProducto: '137',
                    nombre: 'a S/ 1'
                  }
                ],
                nombreProducto: 'Facebook, Twitter y Whatsapp x1 d\u00eda a S/1'
              },
              {
                idProductoDeCompraAsociado: '222222',
                listaCaracteristicasProducto: [
                  {nombre: 'xxx'},
                  {nombre: 'yyy'},
                ]
              }
            ]
          }
        }
      },
      {
        provide: ServicioCompartidoService, useValue: {
          msisdn:  '942680930'
      } }],
    imports: [HttpClientModule],
  }));

  beforeEach(() => {
    sessionStorage.clear();
  });

  const defaultListaProductos = [
    {
      idTipoLinea: '2',
      flagValidarSaldoPontis: '1',
      nombreMetodoPago: 'Claro Puntos',
      iniVigencia: '2017-09-01 00:00:00.0',
      codTipoLinea: '2',
      tipoVigencia: 'DIAS',
      idMetodoPago: '21',
      precio: '64',
      moneda2: 'Claro Puntos',
      estadoMetodoPago: '1',
      catvTitulo: 'Paquetes de Megas',
      codigoPaquete: 'D_PQT100MB',
      idProductoDeCompraAsociado: '128',
      vigencia: '2',
      finVigencia: '2099-09-30 00:00:00.0',
      tituloProducto: '',
      codigoProducto: '',
      recomendadoCategoriaOrden: '9999',
      idProductoDeCompra: '128',
      ordenMetodoPago: '1',
      catnId: '2',
      catvCodCategoria: '1',
      cantidadFavoritos: '3',
      listaCaracteristicasProducto: [
        {
          idCaracteristica: '159',
          estilo: 'titulo_rojo',
          orden: '1',
          idProducto: '128',
          nombre: '200MB'
        },
        {
          idCaracteristica: '160',
          estilo: 'titulo_gris',
          orden: '2',
          idProducto: '128',
          nombre: 'x 2 d\u00edas'
        },
        {
          idCaracteristica: '161',
          estilo: 'titulo_gris',
          orden: '3',
          idProducto: '128',
          nombre: 'a S/ 3'
        }
      ],
      nombreProducto: '200MB x 2 d\u00edas a S/3'
    },
    {
      idTipoLinea: '2',
      flagValidarSaldoPontis: '1',
      nombreMetodoPago: 'Claro Puntos',
      iniVigencia: '2017-09-01 00:00:00.0',
      codTipoLinea: '2',
      tipoVigencia: 'DIAS',
      idMetodoPago: '21',
      moneda2: 'Claro Puntos',
      precio: '22',
      subtitulo: '',
      estadoMetodoPago: '1',
      catvTitulo: 'Redes Sociales',
      codigoPaquete: 'R_SOCIAL1D',
      idProductoDeCompraAsociado: '137',
      vigencia: '1',
      finVigencia: '2099-09-30 00:00:00.0',
      tituloProducto: '',
      codigoProducto: '',
      recomendadoCategoriaOrden: '9999',
      idProductoDeCompra: '137',
      ordenMetodoPago: '1',
      catnId: '3',
      catvCodCategoria: '10',
      cantidadFavoritos: '3',
      listaCaracteristicasProducto: [
        {
          idCaracteristica: '281',
          estilo: 'titulo_rojo',
          orden: '1',
          idProducto: '137',
          nombre: 'Facebook, Twitter'
        },
        {
          idCaracteristica: '198',
          estilo: 'titulo_rojo',
          orden: '2',
          idProducto: '137',
          nombre: 'y Whatsapp'
        },
        {
          idCaracteristica: '199',
          estilo: 'titulo_gris',
          orden: '3',
          idProducto: '137',
          nombre: 'x 1 d\u00eda'
        },
        {
          idCaracteristica: '200',
          estilo: 'titulo_gris',
          orden: '4',
          idProducto: '137',
          nombre: 'a S/ 1'
        }
      ],
      nombreProducto: 'Facebook, Twitter y Whatsapp x1 d\u00eda a S/1'
    }
  ];

  let testData = {
    dpIdRespuesta: '0',
    idRespuesta: '0',
    listaProductos: '[]'
  };
  function getMockData() {
    return  `{
      "comunResponseType": {
        "MessageResponse": {
          "Body": {
            "listaProductosDeCompra": ${testData.listaProductos},
            "defaultServiceResponse": {
              "idSesion": "62be964d-d4f9-463e-920b-0b638e9e5406",
              "mensaje": "Consulta con ?xito, se proces? correctamente la solicitud.",
              "idTransaccional": "b48774ef-3359-46cb-a455-80ad43da2420",
              "idRespuesta": "${testData.idRespuesta}"
            }
          },
          "Header": {
            "HeaderResponse": {
              "status": {
                "type": "${testData.dpIdRespuesta}",
                "code": "0",
                "msgid": "DPS01-7ada25ff-ae13-4d1b-aff2-efc974d82d8c",
                "message": "EJECUCI\u00d3N CON \u00c9XITO"
              },
              "pid": "58656374-124c-45b5-a5f4-dde2b8dabaa3",
              "consumer": "",
              "timestamp": "2020-11-30T15:13:14-06:00",
              "VarArg": ""
            }
          }
        }
      }
    }
    `; }
  it('should process 2 favorite products but no product is repeated with recomendados, al final favoritos solo tendra 2', () => {
    const service: ProductosFavoritosService = TestBed.get(ProductosFavoritosService);
    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;
    testData = {
      dpIdRespuesta: '0',
      idRespuesta: '0',
      listaProductos: JSON.stringify(defaultListaProductos)
    };
    wefClientSpy.post.and.returnValue(of(JSON.parse(getMockData())));
    expect(service).toBeTruthy();
    service.obtenerFavoritos(() => {
      expect(service.obtenerFavoritosResponse.idRespuesta).toEqual(testData.idRespuesta);
      expect(service.obtenerFavoritosResponse.listaProductosFavoritos).not.toBeNull();
      expect(service.obtenerFavoritosResponse.listaProductosFavoritos.length).toEqual(2);
      expect(Number(window.sessionStorage.getItem(Constantes.CANT_ACTUAL_label))).toEqual(2);
      expect(window.sessionStorage.getItem(Constantes.CANT_FAVORITOS_label)).toEqual(defaultListaProductos[0].cantidadFavoritos);
    });
  });
  it('should handle obtenerFavoritos error from server communication', () => {
    const service: ProductosFavoritosService = TestBed.get(ProductosFavoritosService);
    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;
    wefClientSpy.post.and.returnValue(throwError({ status: 500 }));
    expect(service).toBeTruthy();
    service.obtenerFavoritos(() => {
      expect(service.obtenerFavoritosResponse.idRespuesta).toBeNull();
      expect(service.obtenerFavoritosResponse.listaProductosFavoritos).not.toBeNull();
      expect(service.obtenerFavoritosResponse.listaProductosFavoritos.length).toEqual(0);
      expect(window.sessionStorage.getItem(Constantes.CANT_ACTUAL_label)).toBeNull();
      expect(window.sessionStorage.getItem(Constantes.CANT_FAVORITOS_label)).toBeNull();
    });
  });
  it('should handle ejecutarMantenimientoFavorito error from server communication', () => {
    const service: ProductosFavoritosService = TestBed.get(ProductosFavoritosService);
    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;
    wefClientSpy.post.and.returnValue(throwError({ status: 500 }));
    const request = new MantenimientoFavoritosRequest('123', 'E', '4');
    service.ejecutarMantenimientoFavorito(request);
    expect(service).toBeTruthy();
  });

});
describe('ProductosFavoritosService con recomendados null', () => {
  const spy = jasmine.createSpyObj('WefClientService', ['post']);
  let wefClientSpy: jasmine.SpyObj<WefClientService>;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [ProductosFavoritosService, { provide: WefClientService, useValue: spy }, MethodsService, GlobalObjectService,
      {
        provide: ProductosRecomendadosService, useValue: {
          obtenerRecomendadosResponse: {
            listaProductosCompra: null
          }
        }
      },
      {
        provide: ServicioCompartidoService, useValue: {
          msisdn:  '942680930'
      } }],
    imports: [HttpClientModule],
  }));

  beforeEach(() => {
    sessionStorage.clear();
  });

  const defaultListaProductos = [
    {
      idTipoLinea: '2',
      flagValidarSaldoPontis: '1',
      nombreMetodoPago: 'Claro Puntos',
      iniVigencia: '2017-09-01 00:00:00.0',
      codTipoLinea: '2',
      tipoVigencia: 'DIAS',
      idMetodoPago: '21',
      precio: '64',
      moneda2: 'Claro Puntos',
      estadoMetodoPago: '1',
      catvTitulo: 'Paquetes de Megas',
      codigoPaquete: 'D_PQT100MB',
      idProductoDeCompraAsociado: '128',
      vigencia: '2',
      finVigencia: '2099-09-30 00:00:00.0',
      tituloProducto: '',
      codigoProducto: '',
      recomendadoCategoriaOrden: '9999',
      idProductoDeCompra: '128',
      ordenMetodoPago: '1',
      catnId: '2',
      catvCodCategoria: '1',
      cantidadFavoritos: '3',
      listaCaracteristicasProducto: [
        {
          idCaracteristica: '159',
          estilo: 'titulo_rojo',
          orden: '1',
          idProducto: '128',
          nombre: '200MB'
        },
        {
          idCaracteristica: '160',
          estilo: 'titulo_gris',
          orden: '2',
          idProducto: '128',
          nombre: 'x 2 d\u00edas'
        },
        {
          idCaracteristica: '161',
          estilo: 'titulo_gris',
          orden: '3',
          idProducto: '128',
          nombre: 'a S/ 3'
        }
      ],
      nombreProducto: '200MB x 2 d\u00edas a S/3'
    },
    {
      idTipoLinea: '2',
      flagValidarSaldoPontis: '1',
      nombreMetodoPago: 'Claro Puntos',
      iniVigencia: '2017-09-01 00:00:00.0',
      codTipoLinea: '2',
      tipoVigencia: 'DIAS',
      idMetodoPago: '21',
      moneda2: 'Claro Puntos',
      precio: '22',
      subtitulo: '',
      estadoMetodoPago: '1',
      catvTitulo: 'Redes Sociales',
      codigoPaquete: 'R_SOCIAL1D',
      idProductoDeCompraAsociado: '137',
      vigencia: '1',
      finVigencia: '2099-09-30 00:00:00.0',
      tituloProducto: '',
      codigoProducto: '',
      recomendadoCategoriaOrden: '9999',
      idProductoDeCompra: '137',
      ordenMetodoPago: '1',
      catnId: '3',
      catvCodCategoria: '10',
      cantidadFavoritos: '3',
      listaCaracteristicasProducto: [
        {
          idCaracteristica: '281',
          estilo: 'titulo_rojo',
          orden: '1',
          idProducto: '137',
          nombre: 'Facebook, Twitter'
        },
        {
          idCaracteristica: '198',
          estilo: 'titulo_rojo',
          orden: '2',
          idProducto: '137',
          nombre: 'y Whatsapp'
        },
        {
          idCaracteristica: '199',
          estilo: 'titulo_gris',
          orden: '3',
          idProducto: '137',
          nombre: 'x 1 d\u00eda'
        },
        {
          idCaracteristica: '200',
          estilo: 'titulo_gris',
          orden: '4',
          idProducto: '137',
          nombre: 'a S/ 1'
        }
      ],
      nombreProducto: 'Facebook, Twitter y Whatsapp x1 d\u00eda a S/1'
    }
  ];

  let testData = {
    dpIdRespuesta: '0',
    idRespuesta: '0',
    listaProductos: '[]'
  };
  function getMockData() {
    return  `{
      "comunResponseType": {
        "MessageResponse": {
          "Body": {
            "listaProductosDeCompra": ${testData.listaProductos},
            "defaultServiceResponse": {
              "idSesion": "62be964d-d4f9-463e-920b-0b638e9e5406",
              "mensaje": "Consulta con ?xito, se proces? correctamente la solicitud.",
              "idTransaccional": "b48774ef-3359-46cb-a455-80ad43da2420",
              "idRespuesta": "${testData.idRespuesta}"
            }
          },
          "Header": {
            "HeaderResponse": {
              "status": {
                "type": "${testData.dpIdRespuesta}",
                "code": "0",
                "msgid": "DPS01-7ada25ff-ae13-4d1b-aff2-efc974d82d8c",
                "message": "EJECUCI\u00d3N CON \u00c9XITO"
              },
              "pid": "58656374-124c-45b5-a5f4-dde2b8dabaa3",
              "consumer": "",
              "timestamp": "2020-11-30T15:13:14-06:00",
              "VarArg": ""
            }
          }
        }
      }
    }
    `; }
  it('should process 2 favorite products but no product is repeated with recomendados, al final favoritos solo tendra 2', () => {
    const service: ProductosFavoritosService = TestBed.get(ProductosFavoritosService);
    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;
    testData = {
      dpIdRespuesta: '0',
      idRespuesta: '0',
      listaProductos: JSON.stringify(defaultListaProductos)
    };
    wefClientSpy.post.and.returnValue(of(JSON.parse(getMockData())));
    expect(service).toBeTruthy();
    service.obtenerFavoritos(() => {
      expect(service.obtenerFavoritosResponse.idRespuesta).toEqual(testData.idRespuesta);
      expect(service.obtenerFavoritosResponse.listaProductosFavoritos).not.toBeNull();
      expect(service.obtenerFavoritosResponse.listaProductosFavoritos.length).toEqual(2);
      expect(Number(window.sessionStorage.getItem(Constantes.CANT_ACTUAL_label))).toEqual(2);
      expect(window.sessionStorage.getItem(Constantes.CANT_FAVORITOS_label)).toEqual(defaultListaProductos[0].cantidadFavoritos);
    });
  });

});
describe('ProductosFavoritosService linea sin favoritos', () => {
  const spy = jasmine.createSpyObj('WefClientService', ['post']);
  let wefClientSpy: jasmine.SpyObj<WefClientService>;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [ProductosFavoritosService, { provide: WefClientService, useValue: spy }, MethodsService, GlobalObjectService,
      {
        provide: ProductosRecomendadosService, useValue: {
          obtenerRecomendadosResponse: {
            listaProductosCompra: null
          }
        }
      },
      {
        provide: ServicioCompartidoService, useValue: {
          msisdn:  '942680930'
      } }],
    imports: [HttpClientModule],
  }));

  beforeEach(() => {
    sessionStorage.clear();
  });


  let testData = {
    dpIdRespuesta: '0',
    idRespuesta: '0'

  };
  function getMockData() {
    return  `{
      "comunResponseType": {
        "MessageResponse": {
          "Body": {
            "defaultServiceResponse": {
              "idSesion": "62be964d-d4f9-463e-920b-0b638e9e5406",
              "mensaje": "Consulta con ?xito, se proces? correctamente la solicitud.",
              "idTransaccional": "b48774ef-3359-46cb-a455-80ad43da2420",
              "idRespuesta": "${testData.idRespuesta}"
            }
          },
          "Header": {
            "HeaderResponse": {
              "status": {
                "type": "${testData.dpIdRespuesta}",
                "code": "0",
                "msgid": "DPS01-7ada25ff-ae13-4d1b-aff2-efc974d82d8c",
                "message": "EJECUCI\u00d3N CON \u00c9XITO"
              },
              "pid": "58656374-124c-45b5-a5f4-dde2b8dabaa3",
              "consumer": "",
              "timestamp": "2020-11-30T15:13:14-06:00",
              "VarArg": ""
            }
          }
        }
      }
    }
    `; }

  it('should process 0 favorite products but no product is repeated with recomendados, al final favoritos solo tendra 0', () => {
    const service: ProductosFavoritosService = TestBed.get(ProductosFavoritosService);
    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;
    testData = {
      dpIdRespuesta: '0',
      idRespuesta: '0',
    };
    wefClientSpy.post.and.returnValue(of(JSON.parse(getMockData())));
    expect(service).toBeTruthy();
    service.obtenerFavoritos(() => {
      expect(service.obtenerFavoritosResponse.idRespuesta).toEqual(testData.idRespuesta);
      expect(service.obtenerFavoritosResponse.listaProductosFavoritos).not.toBeNull();
      expect(service.obtenerFavoritosResponse.listaProductosFavoritos.length).toEqual(0);
      expect(Number(window.sessionStorage.getItem(Constantes.CANT_ACTUAL_label))).toEqual(0);
      expect(window.sessionStorage.getItem(Constantes.CANT_FAVORITOS_label)).toBeNull();
    });
  });

});
describe('ProductosFavoritosService linea 1 solo favorito llega como objeto', () => {
  const spy = jasmine.createSpyObj('WefClientService', ['post']);
  let wefClientSpy: jasmine.SpyObj<WefClientService>;
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ProductosFavoritosService, { provide: WefClientService, useValue: spy }, MethodsService, GlobalObjectService,
      {
        provide: ProductosRecomendadosService, useValue: {
          obtenerRecomendadosResponse: {
            listaProductosCompra: null
          }
        }
      },
      {
        provide: ServicioCompartidoService, useValue: {
          msisdn:  '942680930'
      } }],
    imports: [HttpClientModule],
  }));

  beforeEach(() => {
    sessionStorage.clear();
  });
  it('should process 1 favorite products but no product is repeated with recomendados, al final favoritos solo tendra 1', () => {
    const service: ProductosFavoritosService = TestBed.get(ProductosFavoritosService);
    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;
    wefClientSpy.post.and.returnValue(of( obtenerFavoritosOneProductAsObject));
    expect(service).toBeTruthy();
    service.obtenerFavoritos(() => {
      expect(service.obtenerFavoritosResponse.idRespuesta).toEqual('0');
      expect(service.obtenerFavoritosResponse.listaProductosFavoritos).not.toBeNull();
      expect(service.obtenerFavoritosResponse.listaProductosFavoritos.length).toEqual(1);
      expect(Number(window.sessionStorage.getItem(Constantes.CANT_ACTUAL_label))).toEqual(1);
      expect(window.sessionStorage.getItem(Constantes.CANT_FAVORITOS_label)).toEqual('3');
    });
  });

});
