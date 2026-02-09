import { PopupPromocionesComponent } from './popup-promociones.component';

describe('PopupPromocionesComponent', () => {
  it('Debe de crear', () => {
    const mockFormBuilder = jasmine.createSpyObj(['group', '']);
    const mockEnviarCorreo = jasmine.createSpyObj(['enviarNotificacion']);
    const mockPopupService = jasmine.createSpyObj(['changeActionMessage']);
    const mockMethodsService = jasmine.createSpyObj(['isFlowPortalRecargas', 'isPortalIntegrated']);
    const component = new PopupPromocionesComponent(mockFormBuilder, mockEnviarCorreo, mockPopupService, mockMethodsService);

    expect(component).toBeTruthy();
  });
});
