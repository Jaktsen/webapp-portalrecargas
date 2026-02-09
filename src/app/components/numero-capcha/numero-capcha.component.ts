import { MethodsService } from './../../services/methods.service';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Constantes } from '../../services/constants';
import { CaptchaService } from 'src/app/services/catpchaService';
import { IdentificarUsuarioRequest } from 'src/app/shared/components/identificarUsuarioRequest';
import { LoginService } from 'src/app/services/loginService';
import { Router } from '@angular/router';
import { ServicioCompartidoService } from 'src/app/core/services/servicio-compartido.service';
import { environment } from 'src/environments/environment';
import { DataLayerService } from 'src/app/services/data-layer.service';

@Component({
  selector: 'app-numero-capcha',
  templateUrl: './numero-capcha.component.html',
  styleUrls: ['./numero-capcha.component.scss']
})
export class NumeroCapchaComponent implements OnInit, AfterViewInit {

  @Input() tipoLogin: string;
  @Input() numeroTel: string;
  @Input() isAuthenticated = false;
  @Output() mostrarContenidoEvent = new EventEmitter<boolean>();
  @Output() resetEvent = new EventEmitter<boolean>();
  @Input() cambiaNumero = false;

  loginForm: FormGroup;
  loginFormAuto: FormGroup;
  captchaImage: any;

  tipoLinea = 'M';
  placeHolder = 'Ingrese una línea Claro';
  fuenteIngreso = '';

  modalAbierto = false;
  modalHomeAbierto = false;
  cambiandoNumero = false;
  isLoading = false;
  autenticado = false;
  mostrarCambiar = true;
  @Output() flagErrorService = new EventEmitter<any>(false);

  constructor( private formBuilder: FormBuilder, private captchaService: CaptchaService,
               private loginService: LoginService, private router: Router,
               public servicioCompartido: ServicioCompartidoService,
               private elementRef: ElementRef, private ms: MethodsService , private _dataLayer: DataLayerService) {
    this.loginForm = this.formBuilder.group({
      telephone: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      capcha: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]]
    });

    this.loginFormAuto = this.formBuilder.group({
      numeroAuto: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(9)]]
    });
  }

  ngOnInit() {
    window.sessionStorage.removeItem('tipoLogin');

    if (this.tipoLogin === 'loginNoAuto') {
      this.cargarCaptcha();
    }

    if (this.tipoLogin === 'loginAuto') {
      this.loginFormAuto.controls.numeroAuto.setValue(this.numeroTel);
      this.loginFormAuto.controls.numeroAuto.disable();
    }

    if (this.tipoLogin === 'loginInicio' && !this.isAuthenticated) {
      this.cargarCaptcha();
    }

    if (this.servicioCompartido.canal === Constantes.CANALES.MICLARO_CORPO
        || this.servicioCompartido.canal === Constantes.CANALES.MICLARO_WEB) {
      this.mostrarCambiar = false;
      this.placeHolder = '';
    }
  }

  ngOnChanges(changes: SimpleChanges): void{
    if(this.cambiaNumero){
      this.cambiarNumero('2')
    }
  }

  ngAfterViewInit() {
    if (this.tipoLogin === 'loginInicio' || this.tipoLogin === 'loginNoAuto') {
      this.elementRef.nativeElement.querySelector('#inputNumero').addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
      });
      this.elementRef.nativeElement.querySelector('#inputCapcha').addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9a-zA-Z]/g, '');
      });
    } else if (this.tipoLogin === 'loginAuto') {
      this.elementRef.nativeElement.querySelector('#inputNumAuto').addEventListener('input', () => {
        const maxNum = this.loginFormAuto.controls.numeroAuto.value.substring(0, 1) == '9' ||
        this.loginFormAuto.controls.numeroAuto.value.substring(0, 1) == '8' ? 9 : 8;
        this.loginFormAuto.controls.numeroAuto.setValue(this.loginFormAuto.controls.numeroAuto.value.replace(/[^0-9]/g, ''));
        if (this.loginFormAuto.controls.numeroAuto.value.length == maxNum) {
          this.loginFormAuto.controls.numeroAuto.disable();
          this.cambiandoNumero = false;
          this.onSubmitAuto();
        }
      });
    }
  }

  cambiarTipoLinea(num: string) {
    this.tipoLinea = num;
    if (this.tipoLinea === 'M') {
      this.placeHolder = 'Ingrese una Línea Claro';
      this.loginForm.controls.telephone.setValidators([Validators.required, Validators.minLength(9), Validators.maxLength(9)]);
    } else {
      this.placeHolder = 'Ingrese tu Código de Pago';
      this.loginForm.controls.telephone.setValidators([Validators.required, Validators.minLength(7), Validators.maxLength(9)]);
    }
  }

  cargaModalHogar() {
    this.modalAbierto = !this.modalAbierto;
  }
  cargaModalHomeHogar() {
    this.modalHomeAbierto = !this.modalHomeAbierto;
  }

  getErrorMessage(men: string) {
    switch (men) {
      case 'telephone':
        if (this.loginForm.controls.telephone.hasError('required')) {
          return   this.tipoLinea === 'M' ? 'Tienes que ingresar un número' :  'Tienes que ingresar tu código de pago';
        }
        if (this.loginForm.controls.telephone.hasError('serverError')) {
          return  Constantes.WPSMensajeError.value.upps_descripcion01 + Constantes.WPSMensajeError.value.upps_descripcion02;
        }
        if (this.loginForm.controls.telephone.hasError('noClaro')) {
          return  Constantes.WPSMensajeError.value.noClaro;
        }
        return '';
      case 'capcha':
        if (this.loginForm.controls.capcha.hasError('incorrect')) {
          return 'Código captcha incorrecto';
        }
        if (this.loginForm.controls.capcha.hasError('required')) {
          return 'Ingresa el captcha';
        }
        return '';
      case 'numeroAuto':
        if (this.loginFormAuto.controls.numeroAuto.hasError('required')) {
          return 'Tienes que ingresar un número';
        }
        if (this.loginFormAuto.controls.numeroAuto.hasError('serverError')) {
          return  Constantes.WPSMensajeError.value.upps_descripcion01 + Constantes.WPSMensajeError.value.upps_descripcion02;
        }
        if (this.loginFormAuto.controls.numeroAuto.hasError('noClaro')) {
          return  Constantes.WPSMensajeError.value.noClaro;
        }
        return '';
      default:
        return this.loginForm.controls.telephone.hasError('required') ? 'Tienes que ingresar un número' : '';
    }
  }

  cargarCaptcha() {
   this.captchaService.getCaptcha(() => {
     this.captchaImage = this.captchaService.captchaBase64Image;
     this.loginForm.controls.capcha.setValue('');
   });
  }

  /**
   * Siempre los login por este metodo deben ser no autenticados
   */
  onSubmit() {
    //console.log("servicioCompartido", this.servicioCompartido);

    if (this.servicioCompartido.isRecargas()) {
      this._dataLayer.gtm_Event_term('recargas_inicio_sesion_click', 'continuar');
    }
    
    this.isLoading = true;
    this.cambiandoNumero = false;

    const identificarUsuarioRequest = new IdentificarUsuarioRequest(
      this.loginForm.controls.telephone.value,
      this.loginForm.controls.capcha.value,
      'OTRO', false);

    this.loginService.obtenerTipoUsuario(identificarUsuarioRequest, () => {
      const obtenerTipoUsuarioResponse = this.loginService.obtenerTipoUsuarioResponse;
      const idRespuesta = obtenerTipoUsuarioResponse.idRespuesta;
      if(obtenerTipoUsuarioResponse.errorService){
        this.flagErrorService.emit(true)
      }else{
        if (idRespuesta == null) {
          console.log('Error servicio idRespuesta is null');
          return;
        } else if (Number(idRespuesta) === Constantes.WPSCodigoError.value.idExito) {
  
          if (this.servicioCompartido.isRecargas()) {
            this._dataLayer.gtm_EventLoginSuccess('recargas_inicio_sesion', 'success');
          }
  
          if ( Constantes.PORTAL_FLOW.RECARGAS_CANALES.indexOf(this.servicioCompartido.canal) == -1 && !this.servicioCompartido.recarga) {
            window.sessionStorage.setItem('tipoLogin', 'loginAuto');
          }
  
          this.loginForm.controls.telephone.disable();
          this.mostrarContenidoEvent.emit(true);
          this.router.navigateByUrl('/home', { skipLocationChange: true });
        } else if (Number(idRespuesta) === Constantes.WPSCodigoError.value.idErroCapcha) {
          if (this.servicioCompartido.isRecargas()) {
            this._dataLayer.gtm_EventLoginError('recargas_inicio_sesion', 'failure', 'error capcha');
          }
          this.loginForm.controls.capcha.setErrors({ incorrect: true });
          this.elementRef.nativeElement.querySelector('#inputCapcha').focus();
          this.cargarCaptcha();
          this.resetEvent.emit(true);
        } else if (Number(idRespuesta) === Constantes.WPSCodigoError.value.idNoEsClaro) {
          if (this.servicioCompartido.isRecargas()) {
            this._dataLayer.gtm_EventLoginError('recargas_inicio_sesion', 'failure', 'no es numero claro');
          }
          this.cargarCaptcha();
          this.loginForm.controls.telephone.setErrors({ noClaro: true });
          this.elementRef.nativeElement.querySelector('#inputNumero').focus();
          this.resetEvent.emit(true);
        } else {
          if (this.servicioCompartido.isRecargas()) {
            this._dataLayer.gtm_EventLoginError('recargas_inicio_sesion', 'failure', 'fallo del servidor');
          }
          this.cargarCaptcha();
          this.loginForm.controls.telephone.setErrors({ serverError: true });
          this.elementRef.nativeElement.querySelector('#inputNumero').focus();
          this.resetEvent.emit(true);
        }
      }
   this.isLoading = false;
    });
  }

  cambiarNumero(num: string) {

    this._dataLayer.gtm_Event_medio_pago('compras_inicio_sesion_click', 'cambiar')
    if (this.servicioCompartido.isRecargas()) {
      this._dataLayer.gtm_Event_term('recargas_inicio_sesion_click', 'cambiar');
    }

    if (num === '1') {
      this.resetEvent.emit(true);
      this.loginForm.controls.telephone.enable();
      this.cargarCaptcha();
      this.elementRef.nativeElement.querySelector('#inputNumero').focus();
    } else if (num === '2') {
      this.resetEvent.emit(true);
      this.cambiandoNumero = true;
      this.loginFormAuto.controls.numeroAuto.enable();
      this.elementRef.nativeElement.querySelector('#inputNumAuto').focus();
    }
  }

  /**
   * Los login por este método pueden ser:
   * autenticado (true) Si estamos trabajando con miclaroapp y cambiamos a la misma línea original
   * autenticado (false) En todo otro cambio de línea
   *
   */

  onSubmitAuto() {

    if (this.loginFormAuto.controls.numeroAuto.value.trim() == '') {
      return;
    }

    this.isLoading = true;
    this.cambiandoNumero = false;

    let autenticado = false;
    if (this.ms.isEqualToMiClaroAppOriginalLine(this.loginFormAuto.controls.numeroAuto.value)) {
      autenticado = true;
    }

    const requestTipoClienteNoAutenticado = {
      msisdn: this.loginFormAuto.controls.numeroAuto.value,
      codigocaptcha: '',
      fuenteIngreso: 'HEADER',
      autenticado,
      isPontisEnabled: null
    };

    this.loginService.getObtenerTipoClienteNoAutenticado(requestTipoClienteNoAutenticado, () => {
      const obtenerClienteNoAutenticadoResponse = this.loginService.obtenerClienteNoAutenticadoResponse;
      const idRespuesta = obtenerClienteNoAutenticadoResponse.idRespuesta;
      console.log(obtenerClienteNoAutenticadoResponse);
      console.log(idRespuesta);
      if(obtenerClienteNoAutenticadoResponse.errorService){
        this.flagErrorService.emit(true)
      }else{
        if (idRespuesta == null) {
          console.log('Error servicio idRespuesta is null');
          return;
        } else if (Number(idRespuesta) === Constantes.WPSCodigoError.value.idExito) {
  
          console.log('---------------------------');
          console.log(this.servicioCompartido.canal);
          console.log(environment.urlComprasyPAgosMiClaroApp);
          console.log(environment.urlComprasyPAgosMiClaroApp.linea.substring(2, 11));
          console.log(this.loginFormAuto.controls.numeroAuto.value);
          console.log('---------------------------');
  
  
          this.loginFormAuto.controls.numeroAuto.disable();
          this.mostrarContenidoEvent.emit(true);
        } else if (Number(idRespuesta) === Constantes.WPSCodigoError.value.idNoEsClaro || Number(idRespuesta) === 8) {
          this.loginFormAuto.controls.numeroAuto.setErrors({ noClaro: true });
          this.elementRef.nativeElement.querySelector('#inputNumAuto').blur();
          this.resetEvent.emit(true);
        } else {
          this.loginFormAuto.controls.numeroAuto.setErrors({ serverError: true });
          this.elementRef.nativeElement.querySelector('#inputNumAuto').blur();
          this.resetEvent.emit(true);
        }
      }
      
      this.isLoading = false;
    });
  }
}
