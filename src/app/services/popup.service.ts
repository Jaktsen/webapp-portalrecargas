import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();


  private messageActionSource = new BehaviorSubject('');
  currentActionMessage = this.messageActionSource.asObservable();


  private messageResetMetodosPagoSource = new BehaviorSubject('');
  currentResetMetodosPagoMessage = this.messageResetMetodosPagoSource.asObservable();

  private messageCloseTiendaVirtualSource = new BehaviorSubject('');
  currentCloseTiendaVirtualMessage = this.messageCloseTiendaVirtualSource.asObservable();

  private closePopUpValidarDegradacion= new BehaviorSubject(false);
  currentAction = this.closePopUpValidarDegradacion.asObservable();

  changeMessage(message: string) {
    this.messageSource.next(message);
  }
  changeActionMessage(message: string) {
    this.messageActionSource.next(message);
  }
  changeResetActionMessage(message: string) {
    this.messageResetMetodosPagoSource.next(message);
  }
  changeCloseTiendaVirtualMessage(message: string) {
    this.messageCloseTiendaVirtualSource.next(message);
  }

  changeState(message: boolean) {
    this.closePopUpValidarDegradacion.next(message);
  }




}
