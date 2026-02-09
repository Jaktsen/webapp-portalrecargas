import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { WefClientService } from '../core/http/wef-client.service';

import { ProductosOfertaService } from './productos-oferta.service';
import { MethodsService } from './methods.service';
import { default as obtenerProductosOfertaArray } from '../../assets/mocks/tests/obtenerProductos/obtenerProductosOferta.json';
import { default as obtenerProductosOfertaOrder } from '../../assets/mocks/tests/obtenerProductos/obtenerProductosOfertaOrder.json';
import { default as obtenerProductosOfertaIDNoZero } from '../../assets/mocks/tests/obtenerProductos/idRespuestaNoZero.json';
import { default as mockOfertaIDDPNoZero } from '../../assets/mocks/tests/obtenerProductos/obtenerProductosOfertaIDDPRespuestaNoZero.json';
import { default as obtenerProductosOfertaSingleObject } from '../../assets/mocks/tests/obtenerProductos/ofertaSingleObject.json';
import { default as mockExcOnlinePrepago } from '../../assets/mocks/tests/obtenerProductos/ofertaExclusivoOnlinePrepago.json';
import { default as obtenerProductosOfertaGiftcard } from '../../assets/mocks/tests/obtenerProductos/giftcard/giftcard-datos.json';
import { default as wcmGiftcards } from '../../assets/mocks/tests/obtenerProductos/giftcard/wcm-giftcards.json';

import { of, throwError } from 'rxjs';
import { Constantes } from './constants';
import { WcmService } from './wcm.service';




describe('ProductosOfertaService', () => {
  const wcmStub = {
    listaGiftCards: wcmGiftcards
  };
  const spy = jasmine.createSpyObj('WefClientService', ['post']);
  let wefClientSpy: jasmine.SpyObj<WefClientService>;
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ProductosOfertaService, MethodsService,
      { provide: WefClientService, useValue: spy },
      { provide: WcmService, useValue: wcmStub }],
    imports: [HttpClientModule],
  }));

  it('should return the products for general category without zone from an array of 5 oferta exclusiva online', () => {
    const service: ProductosOfertaService = TestBed.get(ProductosOfertaService);
    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;
    wefClientSpy.post.and.returnValue(of(mockExcOnlinePrepago));
    expect(service).toBeTruthy();
    const categoria = {
      idCategoriaDeCompra: '1',
      codCategoria: '1'
    };
    service.obtenerOfertas(categoria).subscribe(res => {
      //console.log('respuesta', JSON.stringify(res));
      expect(res.length).toEqual(5);
      const productosExclusivaOnline = res.filter(producto =>
producto.codTipoLinea == Constantes.WPSTipoLinea.prepago
          && producto.catvCodCategoria == Constantes.WPSCategoriasDeCompra.paquetesExclusivosOnline
      );
      expect(productosExclusivaOnline.length).toEqual(5);

      productosExclusivaOnline.forEach(producto => {
        //console.log('producto', producto);
        producto.listaCaracteristicasProducto.forEach(caracteristica => {
          //console.log('caracteristica', caracteristica.estilo);
          expect(caracteristica.estilo.endsWith(' titulo_rojoMP')).toBeTruthy();
          //console.log('caracteristica 2', caracteristica.estilo);
        });
      });
    });
  });
  it('should return the products for general category without zone from an array of 5', () => {
    const service: ProductosOfertaService = TestBed.get(ProductosOfertaService);
    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;
    wefClientSpy.post.and.returnValue(of(obtenerProductosOfertaArray));
    expect(service).toBeTruthy();
    const categoria = {
      idCategoriaDeCompra: '1',
      codCategoria: '1'
    };
    service.obtenerOfertas(categoria).subscribe(res => {
      expect(res.length).toEqual(5);
    });
  });
  it('should return the products for general category without zone from an array of 5 with ordering of characteristics by orden', () => {
    const service: ProductosOfertaService = TestBed.get(ProductosOfertaService);
    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;
    //console.log(obtenerProductosOfertaOrder);
    wefClientSpy.post.and.returnValue(of(obtenerProductosOfertaOrder));
    expect(service).toBeTruthy();
    const categoria = {
      idCategoriaDeCompra: '1',
      codCategoria: '1'
    };
    service.obtenerOfertas(categoria).subscribe(ofertas => {
      expect(ofertas.length).toEqual(5);
      ofertas.forEach(producto => {
        //console.log('producto', producto);
        let i = 1;
        producto.listaCaracteristicasProducto.forEach(caract => {
          //console.log('caract', caract);
          expect(caract.orden).toEqual('' + i);
          i++;
        });
      });
    });
  });
  it('should return the products for general category without zone from an single object', () => {
    const service: ProductosOfertaService = TestBed.get(ProductosOfertaService);
    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;
    wefClientSpy.post.and.returnValue(of(obtenerProductosOfertaSingleObject));
    expect(service).toBeTruthy();
    const categoria = {
      idCategoriaDeCompra: '1',
      codCategoria: '1'
    };
    service.obtenerOfertas(categoria).subscribe(res => {
      expect(res.length).toEqual(1);
    });
  });
  it('should return the products for general category without zone and idRespuesta no zero', () => {
    const service: ProductosOfertaService = TestBed.get(ProductosOfertaService);
    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;
    wefClientSpy.post.and.returnValue(of(obtenerProductosOfertaIDNoZero));
    expect(service).toBeTruthy();
    const categoria = {
      idCategoriaDeCompra: '1',
      codCategoria: '1'
    };
    service.obtenerOfertas(categoria).subscribe(res => {
      expect(res.length).toEqual(0);
    });
  });
  it('should return the products for general category without zone and DP idRespuesta no zero', () => {
    const service: ProductosOfertaService = TestBed.get(ProductosOfertaService);
    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;
    wefClientSpy.post.and.returnValue(of(mockOfertaIDDPNoZero));
    expect(service).toBeTruthy();
    const categoria = {
      idCategoriaDeCompra: '1',
      codCategoria: '1'
    };
    service.obtenerOfertas(categoria).subscribe(res => {
      expect(res.length).toEqual(0);
    });
  });
  it('should return the products for general category without zone and error 500 from server', () => {
    const service: ProductosOfertaService = TestBed.get(ProductosOfertaService);
    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;
    wefClientSpy.post.and.returnValue(throwError({ status: 500 }));
    expect(service).toBeTruthy();
    const categoria = {
      idCategoriaDeCompra: '1',
      codCategoria: '1'
    };
    service.obtenerOfertas(categoria).subscribe(res => {
      expect(res.length).toEqual(0);
    });
  });
  it('should return the products for giftcard OK', () => {
    const service: ProductosOfertaService = TestBed.get(ProductosOfertaService);
    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;

    // filtrar solo productos categoria giftcard como es en realidad
    // (cada peticion de productos solo retorna productos de la misma categoria)
    const giftcardProductsJSON = obtenerProductosOfertaGiftcard;
    giftcardProductsJSON.comunResponseType.MessageResponse.Body.listaProductosDeCompra = giftcardProductsJSON
        .comunResponseType.MessageResponse.Body.listaProductosDeCompra
        .filter(prod => prod.catvCodCategoria == Constantes.WPSCategoriasDeCompra.gifCard2);
    wefClientSpy.post.and.returnValue(of(giftcardProductsJSON));

    expect(service).toBeTruthy();
    const categoria = {
      idCategoriaDeCompra: '1',
      codCategoria: Constantes.WPSCategoriasDeCompra.gifCard
    };
    service.obtenerOfertas(categoria).subscribe(res => {
      expect(res.length).toEqual(5);
      let i = 1;
      res.forEach(prod => {
        //console.log(prod);
        expect(Number(prod.wcm.ordenOferta)).toEqual(i);
        i++;
        expect(prod.idProductoDeCompra).toEqual(prod.wcm.idProductoDeCompra);
        expect(prod.dedicatoria).toEqual({
          nombre_solicitante: '',
          nombre_destinatario: '',
          mensaje_opc: ''
        });
        expect(prod.wcm).not.toBeNull();
      });

    });
  });
});
