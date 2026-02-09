import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CarrouselOfertasComponent} from './carrousel-ofertas.component';
import {ServicioCompartidoService} from '../../core/services/servicio-compartido.service';
import {WcmService} from '../../services/wcm.service';

describe('CarrouselOfertasComponent', () => {
  let component: CarrouselOfertasComponent;
  let fixture: ComponentFixture<CarrouselOfertasComponent>;
  const wcm = [{
    listaCarrousel: [{
      Imagen_desktop: '/assets/img/mocks/carrousel/frame-1595109.png',
      Imagen_tablet: '/assets/img/mocks/carrousel/frame-1595109.png',
      Imagen_mobile: '/assets/img/mocks/carrousel/frame-1595109.png',
      canales: '1 Portal de Compras,2 Mi Claro Web,3 Mi Claro App,4 SMS,5 Redes Sociales,6 Portal Corporativo,7 Seguir Navegando',
      tipoCliente: '1',
      tipoLinea: '1|2|3|4|5|6|7',
      activo: '1',
      prioridad: '4',
      urlOferta: 'https://www.claro.com.pe/personas/',
      nombre: 'nombre 1',
      id: 'xxxxxxx',
      idCarrouselOfertas: '1'

    }, {
      Imagen_desktop: '/assets/img/mocks/carrousel/frame-1595110.png',
      Imagen_tablet: '/assets/img/mocks/carrousel/frame-1595110.png',
      Imagen_mobile: '/assets/img/mocks/carrousel/frame-1595110.png',
      canales: '1 Portal de Compras,2 Mi Claro Web,3 Mi Claro App,4 SMS,5 Redes Sociales,6 Portal Corporativo,7 Seguir Navegando',
      tipoCliente: '1|2',
      tipoLinea: '1|2|3|4|5|6|7',
      activo: '1',
      prioridad: '2',
      urlOferta: 'https://www.claro.com.pe/personas/',
      nombre: 'nombre 1',
      id: 'xxxxxxx',
      idCarrouselOfertas: '1'
    }, {
      Imagen_desktop: '/assets/img/mocks/carrousel/frame-1595111.png',
      Imagen_tablet: '/assets/img/mocks/carrousel/frame-1595111.png',
      Imagen_mobile: '/assets/img/mocks/carrousel/frame-1595111.png',
      canales: '1 Portal de Compras,2 Mi Claro Web,3 Mi Claro App,4 SMS,5 Redes Sociales,6 Portal Corporativo,7 Seguir Navegando',
      tipoCliente: '1|2',
      tipoLinea: '1|2|3|4|5|6|7',
      activo: '1',
      prioridad: '1',
      urlOferta: 'https://www.claro.com.pe/personas/',
      nombre: 'nombre 1',
      id: 'xxxxxxx',
      idCarrouselOfertas: '1'
    }, {
      Imagen_desktop: '/assets/img/mocks/carrousel/frame-1595112.png',
      Imagen_tablet: '/assets/img/mocks/carrousel/frame-1595112.png',
      Imagen_mobile: '/assets/img/mocks/carrousel/frame-1595112.png',
      canales: '2 Mi Claro Web,3 Mi Claro App,4 SMS,5 Redes Sociales,6 Portal Corporativo,7 Seguir Navegando',
      tipoCliente: '1|2',
      tipoLinea: '2|3|4|5|6|7',
      activo: '1',
      prioridad: '1',
      urlOferta: 'https://www.claro.com.pe/personas/',
      nombre: 'nombre 1',
      id: 'xxxxxxx',
      idCarrouselOfertas: '1'
    }, {
      Imagen_desktop: '/assets/img/mocks/carrousel/frame-1595113.png',
      Imagen_tablet: '/assets/img/mocks/carrousel/frame-1595113.png',
      Imagen_mobile: '/assets/img/mocks/carrousel/frame-1595113.png',
      canales: '1 Portal de Compras,2 Mi Claro Web,3 Mi Claro App,4 SMS,5 Redes Sociales,6 Portal Corporativo,7 Seguir Navegando',
      tipoCliente: '1|2',
      tipoLinea: '1|2|3|4|5|6|7',
      activo: '1',
      prioridad: '1',
      urlOferta: 'https://www.claro.com.pe/personas/',
      nombre: 'nombre 1',
      id: 'xxxxxxx',
      idCarrouselOfertas: '1'
    }],
  }];
  const sc = {
    msisdn: '966789703'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarrouselOfertasComponent],
      imports: [],
      providers: [
        {provide: WcmService, useValue: wcm[0]},
        {provide: ServicioCompartidoService, useValue: sc},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CarrouselOfertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe de mostrar los items del carrusel', () => {
    component.listaCarrouselOfertas = wcm[0].listaCarrousel;
    expect(component).toBeTruthy();
    expect(component.listaCarrouselOfertas.length > 0).toBeTruthy(false);
  });

  it('Debe filtrar por cliente tipo de linea', () => {
    component.listaCarrouselOfertas = wcm[0].listaCarrousel;
    const res = component.filtrarCarrouselClienteTipoLinea();
    console.log('Filtrar por cliente: ' + res);
    expect(component).toBeTruthy();
    // expect(component.filtrarCarrouselClienteTipoLinea).toBeTruthy(false);
  });
});
