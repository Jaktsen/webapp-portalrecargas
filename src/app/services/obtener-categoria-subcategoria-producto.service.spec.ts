import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { WefClientService } from '../core/http/wef-client.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';

import { ObtenerCategoriaSubcategoriaProductoService } from './obtener-categoria-subcategoria-producto.service';

describe('ObtenerCategoriaSubcategoriaProductoService', () => {
  const spy = jasmine.createSpyObj('WefClientService', ['post']);

  beforeEach(() => TestBed.configureTestingModule({
    providers: [ { provide: WefClientService, useValue: spy },],
    imports: [HttpClientModule],
  }));

  it('creado correctamente', () => {
    const service: ObtenerCategoriaSubcategoriaProductoService = TestBed.get(ObtenerCategoriaSubcategoriaProductoService);
    expect(service).toBeTruthy();
  });

  let testData = {
    idRespuesta: '0',
    codCategoria: '',
    codSubcategoria: ''
  };

  function getMockData() {
    return  `{
      "comunResponseType": {
          "MessageResponse": {
              "Body": {
                  "categoriasXproducto": {
                      "categoria": "2",
                      "subcategoria": "41"
                  },
                  "defaultServiceResponse": {
                      "idSesion": "11aac8e7-ae86-4d3b-8bce-68f393d8ba84",
                      "mensaje": "Consulta con ?xito, se proces? correctamente la solicitud.",
                      "idTransaccional": "1b1beb7a-a927-4502-9a56-8336e4c65601",
                      "idRespuesta": "0"
                  }
              },
              "Header": {
                  "HeaderResponse": {
                      "status": {
                          "type": "0",
                          "code": "0",
                          "msgid": "DPS01-63e63213-6093-4f96-a2c4-c017dfe17c17",
                          "message": "EJECUCI\u00d3N CON \u00c9XITO"
                      },
                      "pid": "9598282b-0dfa-490c-a26b-a7bdabd88304",
                      "consumer": "",
                      "timestamp": "2020-12-22T11:49:23-05:00",
                      "VarArg": ""
                  }
              }
          }
      }
  }`}

  it('codigo Respuesta 0', () => {
    const service: ObtenerCategoriaSubcategoriaProductoService = TestBed.get(ObtenerCategoriaSubcategoriaProductoService);
    //service.obtenerCategoriaYsubCategoriaXproducto()
    const wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;
    testData = {
      idRespuesta: '0',
      codCategoria: '2',
      codSubcategoria: '41'
    };
    wefClientSpy.post.and.returnValue(of(JSON.parse(getMockData())));
    service.obtenerCategoriaYsubCategoriaXproducto(()=>{
      expect(service.obtenerCategoriasXproductoResponse.idRespuesta).toEqual(testData.idRespuesta);
    },151)

  });

  it('codigo Respuesta diferente 0', () => {
    const service: ObtenerCategoriaSubcategoriaProductoService = TestBed.get(ObtenerCategoriaSubcategoriaProductoService);
    //service.obtenerCategoriaYsubCategoriaXproducto()
    const wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<WefClientService>;
    testData = {
      idRespuesta: '-1',
      codCategoria: '',
      codSubcategoria: ''
    };
    wefClientSpy.post.and.returnValue(of(JSON.parse(getMockData())));
    service.obtenerCategoriaYsubCategoriaXproducto(()=>{
      expect(service.obtenerCategoriasXproductoResponse.idRespuesta).not.toEqual(testData.idRespuesta);
    },151)

  });
});
