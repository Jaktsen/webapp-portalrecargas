import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }
  navigateToUrl(url: string) {
    return browser.get(url) as Promise<any>;
  }



  getTitleText() {
    return element(by.css('app-root .content span')).getText() as Promise<string>;
  }
  getTitle() {
    return element(by.xpath('//p[@class=\'titulo\']')).getText() as Promise<string>;
  }

  getTituloElementCount() {
    return element.all(by.xpath('//p[@class=\'titulo\']')).count();
  }

  checkAppRecargasComponentCount() {
    return element.all(by.xpath('//app-recargas')).count();
  }
  checkAppCategoriasComponentCount() {
    return element.all(by.xpath('//app-categorias')).count();
  }
  checkOfertaRecargasHabilitadaCount() {
    return element.all(by.css('div.paquetes-habilitados')).count();
  }

  llenarNumero(numero: string) {
    return element(by.id('inputNumero')).sendKeys(numero);
  }
  llenarCaptcha(captcha: string) {
    return element(by.id('inputCapcha')).sendKeys(captcha);
  }
  login() {
    return element(by.xpath('(//button[@class=\'buton-ingresar\'])[1]')).click();
  }
}
