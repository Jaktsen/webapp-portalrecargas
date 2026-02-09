import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalObjectService {

  public callbackUrl: any;

  constructor() { }
  public getWindow(): Window {
    return window;
  }

  get nativeWindow(){
    return this.getWindow();
  }
  public getWindowLocationHref() {
    return this.getWindow().location.href;
  }
  public goToLink(url: string) {
    window.open(url, '_blank');
  }

  public deshabilitarRetrocederNavegador() {
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, '', window.location.href);
    };
  }

  public getObject(name): any {
    return this.getWindow()[name];
  }

  public sessionStorageSave(label, value) {
    window.sessionStorage.setItem(label, value);
  }
  public sessionStorageRetrieve(label) {
    return window.sessionStorage.getItem(label);
  }


  public savePortalComprasMotorPagosCallbackUrl() {
    const callbackUrl = window.location.origin + window.location.pathname;
    this.callbackUrl = callbackUrl.substring(0, callbackUrl.indexOf('!'));
  }

  public reloadUrl(url) {
    window.location.replace(url);
  }

}
