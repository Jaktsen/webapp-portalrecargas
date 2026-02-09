import { environment } from './../../src/environments/environment.prod';
import { AppPage } from './app.po';
import { browser, by, element, logging } from 'protractor';


describe('workspace-project App', () => {

  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });


  it('should display portal recargas offer if rec is 1 and we use HE', () => {
    browser.waitForAngularEnabled(false);
    page.navigateToUrl('?num=966789703&root=1&canal=8&rec=1')
      .then(() => expect(page.getTitle()).toEqual('Selecciona o ingresa el monto'))
      .then(() => expect(page.getTituloElementCount()).toEqual(1))
      .then(() => expect(page.checkAppRecargasComponentCount()).toEqual(1))
      .then(() => expect(page.checkAppCategoriasComponentCount()).toEqual(0))
      .then(() => expect(page.checkOfertaRecargasHabilitadaCount()).toEqual(1))
    ;
  });
  it('should not display portal recargas offer if rec is 0 and we use HE', () => {
    browser.waitForAngularEnabled(false);
    page.navigateToUrl('?num=966789703&root=1&canal=8&rec=0')
      .then(() => expect(page.getTituloElementCount()).toEqual(0))
      .then(() => expect(page.checkAppRecargasComponentCount()).toEqual(0))
      .then(() => expect(page.checkAppCategoriasComponentCount()).toEqual(0))
      .then(() => expect(page.checkOfertaRecargasHabilitadaCount()).toEqual(0));
  });
  it('should not display portal recargas offer if rec 0 and we authenticate via captcha', () => {
    browser.waitForAngularEnabled(false);
    page.navigateToUrl('?root=1&canal=8&rec=0')
    .then(() =>  page.llenarNumero('966789703') )
    .then(() =>  page.llenarCaptcha('12345'))
    .then(() => page.login())
      .then(() => expect(page.getTituloElementCount()).toEqual(0))
      .then(() => expect(page.checkAppRecargasComponentCount()).toEqual(0))
      .then(() => expect(page.checkAppCategoriasComponentCount()).toEqual(0))
      .then(() => expect(page.checkOfertaRecargasHabilitadaCount()).toEqual(0));

  });

  it('should display portal recargas offer if rec is 1 and we authenticate correctly via captcha', () => {
    browser.waitForAngularEnabled(false);
    page.navigateToUrl('?root=1&canal=8&rec=1')
      .then(() =>  page.llenarNumero('966789703') )
      .then(() =>  page.llenarCaptcha('12345'))
      .then(() => page.login())
      .then(() => expect(page.getTituloElementCount()).toEqual(1))
      .then(() => expect(page.checkAppRecargasComponentCount()).toEqual(1))
      .then(() => expect(page.checkAppCategoriasComponentCount()).toEqual(0))
      .then(() => expect(page.checkOfertaRecargasHabilitadaCount()).toEqual(1))
      .then(() => expect(page.getTitle()).toEqual('Selecciona o ingresa el monto'))
      ;
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
