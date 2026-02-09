import { AppModule } from './../../app.module';
import { MethodsService } from 'src/app/services/methods.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MetodosPagoComponent } from './metodos-pago.component';
import { Constantes } from 'src/app/services/constants';

describe('MetodosPagoComponent', () => {
  let component: MetodosPagoComponent;
  let fixture: ComponentFixture<MetodosPagoComponent>;
  const MethodsServiceSpy = jasmine.createSpyObj('MethodsService', ['isFlowPortalRecargas', 'esLineaPrepago', 'scroll']);
  let methodsServiceSpy: jasmine.SpyObj<MethodsService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
      ],
      imports: [
        AppModule
      ],
      providers: [{ provide: MethodsService, useValue: MethodsServiceSpy }]
    })
        .compileComponents();
  }));

  describe('flujo basico no autenticado  linea prepago no recargas orden canje ', () => {
    beforeEach(()  => {
      methodsServiceSpy = TestBed.get(MethodsService) as jasmine.SpyObj<MethodsService>;
      methodsServiceSpy.isFlowPortalRecargas.and.returnValue(false);
      methodsServiceSpy.esLineaPrepago.and.returnValue(true);
      methodsServiceSpy.scroll.and.callThrough();
      fixture = TestBed.createComponent(MetodosPagoComponent);
      component = fixture.componentInstance;
      component.metodosPago = true;
      component.order = 'canje';
      component.listaMetodosPago = [
        {
          precioMoneda:	64,
          estado:	0,
          flagMuestraTerminosCondiciones:	true,
          tipoMetodoPago : 3,
          msgValidacionClaroClub:	'Cuentas con los suficientes Claro Puntos.',
          simboloMoneda:	'S/',
          cantidad:	64,
          totalClaroPuntos:	168,
          codValidacionClaroClub:	0,
          nombre:	'Tarjeta de Crédito/Débito'
        },
        {
          precioMoneda:	64,
          estado:	1,
          flagMuestraTerminosCondiciones:	true,
          tipoMetodoPago : 2,
          msgValidacionClaroClub:	'Cuentas con los suficientes Claro Puntos.',
          simboloMoneda:	'S/',
          cantidad:	64,
          totalClaroPuntos:	168,
          codValidacionClaroClub:	0,
          nombre: 'Cargo en recibo',
          medioPagarRecibo: {
            mensaje: Constantes.mensajes.metodo_pago_cargo_recibo_mensaje
          }
        },
        {
          precioMoneda:	64,
          estado:	0,
          flagMuestraTerminosCondiciones:	true,
          tipoMetodoPago : 4,
          msgValidacionClaroClub:	'Cuentas con los suficientes Claro Puntos.',
          simboloMoneda:	'S/',
          cantidad:	64,
          totalClaroPuntos:	168,
          codValidacionClaroClub:	0,
          nombre:	'Saldo de Recarga'
        },
        {
          precioMoneda:	64,
          estado:	0,
          flagMuestraTerminosCondiciones:	true,
          tipoMetodoPago : 1,
          msgValidacionClaroClub:	'Cuentas con los suficientes Claro Puntos.',
          simboloMoneda:	'S/',
          cantidad:	64,
          totalClaroPuntos:	168,
          codValidacionClaroClub:	0,
          nombre:	'Claro Puntos'
        },
      ];
      fixture.detectChanges();
    });
    it('should display basic payment methods (default flow)', () => {
      expect(component).toBeTruthy();
      expect(component.mensajeRevisarCondiciones).toEqual('Revisa las condiciones de los paquetes aquí');
      expect(component.listaMetodosPago.length).toEqual(4);
      expect(component.esLineaPrepago).toBeTruthy();
      const stepTitle = fixture.debugElement.nativeElement.querySelector('.home-header');
      expect(stepTitle.innerHTML).toContain('Paso 3');

      const tcBox = fixture.debugElement.nativeElement.querySelector('#metodoPagoItem-3');
      expect(tcBox).toHaveClass('disabled');
      const puntosBox = fixture.debugElement.nativeElement.querySelector('#metodoPagoItem-1');
      expect(puntosBox).toHaveClass('disabled');
      expect(puntosBox.innerHTML).not.toContain('Tienes');

      const saldoRecargaBox = fixture.debugElement.nativeElement.querySelector('#metodoPagoItem-4');
      expect(saldoRecargaBox).toHaveClass('disabled');
      expect(saldoRecargaBox.innerHTML).not.toContain('Tienes');
      expect(saldoRecargaBox.innerHTML).not.toContain('No tienes suficiente saldo');
    });
  });
  describe('flujo basico no autenticado linea postpago  recargas orden default ', () => {
    beforeEach(()  => {
      methodsServiceSpy = TestBed.get(MethodsService) as jasmine.SpyObj<MethodsService>;
      methodsServiceSpy.isFlowPortalRecargas.and.returnValue(true);
      methodsServiceSpy.esLineaPrepago.and.returnValue(false);
      fixture = TestBed.createComponent(MetodosPagoComponent);
      component = fixture.componentInstance;
      component.metodosPago = true;
      component.order = 'default';
      component.listaMetodosPago = [
        {
          precioMoneda:	64,
          estado:	0,
          flagMuestraTerminosCondiciones:	true,
          tipoMetodoPago : 3,
          simboloMoneda:	'S/',
          cantidad:	64,
          totalClaroPuntos:	168,
          codValidacionClaroClub:	0,
          nombre:	'Tarjeta de Crédito/Débito'
        },
        {
          precioMoneda:	64,
          estado:	1,
          flagMuestraTerminosCondiciones:	true,
          tipoMetodoPago : 2,
          simboloMoneda:	'S/',
          cantidad:	64,
          totalClaroPuntos:	168,
          codValidacionClaroClub:	0,
          nombre: 'Cargo en recibo',
          medioPagarRecibo: { mensaje: 'mensaje xxx  yyy' }
        },
        {
          precioMoneda:	64,
          estado:	0,
          flagMuestraTerminosCondiciones:	true,
          tipoMetodoPago : 4,
          msgValidacionClaroClub:	'Cuentas con los suficientes Claro Puntos.',
          simboloMoneda:	'S/',
          cantidad:	64,
          totalClaroPuntos:	168,
          codValidacionClaroClub:	0,
          nombre:	'Saldo de Recarga'
        },
        {
          precioMoneda:	64,
          estado:	0,
          flagMuestraTerminosCondiciones:	true,
          tipoMetodoPago : 1,
          msgValidacionClaroClub:	'Cuentas con los suficientes Claro Puntos.',
          simboloMoneda:	'S/',
          cantidad:	64,
          totalClaroPuntos:	168,
          codValidacionClaroClub:	0,
          nombre:	'Claro Puntos'
        },
      ];
      fixture.detectChanges();
    });
    it('should display basic payment methods (default flow)', () => {
      expect(component).toBeTruthy();
      expect(component.mensajeRevisarCondiciones).toEqual('Más información de las recargas aquí');
      expect(component.listaMetodosPago.length).toEqual(4);
      expect(component.esLineaPrepago).toBeFalsy();
      const stepTitle = fixture.debugElement.nativeElement.querySelector('.home-header');
      expect(stepTitle.innerHTML).toContain('Paso 3');


      const tcBox = fixture.debugElement.nativeElement.querySelector('#metodoPagoItem-3');
      expect(tcBox).toHaveClass('disabled');
      const puntosBox = fixture.debugElement.nativeElement.querySelector('#metodoPagoItem-1');
      expect(puntosBox).toBeNull();

      const reciboBox = fixture.debugElement.nativeElement.querySelector('#metodoPagoItem-2');
      expect(reciboBox).toBeNull();

      const saldoRecargaBox = fixture.debugElement.nativeElement.querySelector('#metodoPagoItem-4');
      expect(saldoRecargaBox).toBeNull();
    });
  });
});
