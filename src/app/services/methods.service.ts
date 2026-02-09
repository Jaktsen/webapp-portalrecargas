import { GlobalObjectService } from 'src/app/services/global-object.service';
import { EnviarTokenService } from './enviar-token.service';
import { ServicioCompartidoService } from './../core/services/servicio-compartido.service';
import { WcmService } from './wcm.service';
import { Injectable } from '@angular/core';
import { Constantes } from '../services/constants';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root',
})
export class MethodsService {

    constructor(private wcm: WcmService, private sc: ServicioCompartidoService,
                private enviarToken: EnviarTokenService, private go: GlobalObjectService) { }

    getPontisFlag = function(whitelistConfig, index, name, nroAutenticado, tipoLinea) {
        try {
            return (this.isInWhitelist(whitelistConfig, index, name, nroAutenticado)
                && tipoLinea == Constantes.TIPOS_LINEA.PREPAGO)
                ? Constantes.PONTIS_FLAG_ENABLED
                : Constantes.PONTIS_FLAG_DISABLED;
        } catch (e) {
            return Constantes.PONTIS_FLAG_DISABLED;
        }
    };

    isInWhitelist = (whitelistConfig, index, name, nroAutenticado) => {
        try {
            if (whitelistConfig[index][name].state !== Constantes.FLAG_WHITELIST_ENABLED) {
                return true;
            }
            if ((typeof whitelistConfig !== 'undefined')
                && whitelistConfig
                && whitelistConfig[index]
                && whitelistConfig[index][name]
                && whitelistConfig[index][name].state === Constantes.FLAG_WHITELIST_ENABLED) {
                const nroAutenticadoIndexInWhitelistArray
                    = whitelistConfig[index][name].allowedNumbers.indexOf(nroAutenticado);
                if (nroAutenticadoIndexInWhitelistArray == -1) {
                    return false;
                } else {
                    return true;
                }
            }
        } catch (error) {
            return false;
        }
    }

    converToArray(origin) {
        if (Array.isArray(origin)) {
            return origin;
        } else {
            const destin = [];
            destin.push(origin);
            return destin;
        }
    }

    isCurrentCategoryGiftCard(categoriaSeleccionada): boolean {
        return (categoriaSeleccionada.codCategoria == Constantes.WPSCategoriasDeCompra.gifCard ||
            categoriaSeleccionada.codCategoria == Constantes.WPSCategoriasDeCompra.gifCard1 ||
            categoriaSeleccionada.codCategoria == Constantes.WPSCategoriasDeCompra.gifCard2);
    }

    isIFILTE(productoElegido) {
        return productoElegido.codTipoLinea == '6' || productoElegido.codTipoLinea == '7';
    }

    convertTipoMetodoPagoAIndicador(tipoMetodoPago) {
        if (tipoMetodoPago == '3') { return '1'; } else if (tipoMetodoPago == '2') { return '2';
        } else if (tipoMetodoPago == '4') { return '3'; } else if (tipoMetodoPago == '1') { return '4'; }
    }

    isProductPrestame(producto): boolean {
        return producto.catvCodCategoria == Constantes.WPSCategoriasDeCompra.prestameMegas;
    }

    isProductCanjeEventos(producto): boolean {
        return (
          producto.catvCodCategoria ==
            Constantes.WPSCategoriasDeCompra.canjeEventos ||
          producto.catvCodCategoria ==
            Constantes.WPSCategoriasDeCompra.canjeEventosSub1 ||
          producto.catvCodCategoria ==
            Constantes.WPSCategoriasDeCompra.canjeEventosSub2 ||
          producto.catvCodCategoria ==
            Constantes.WPSCategoriasDeCompra.canjeEventosSub3 ||
          producto.catvCodCategoria ==
            Constantes.WPSCategoriasDeCompra.canjeEventosSub4 ||
          producto.catvCodCategoria ==
            Constantes.WPSCategoriasDeCompra.canjeEventosSub5
        );
    }

    isFlowPortalRecargas() {
        return Constantes.PORTAL_FLOW.RECARGAS_CANALES.indexOf(sessionStorage.getItem('canal')) > -1
            && sessionStorage.getItem('recarga') == '1';
    }
    isFlowPortalRecargasAllRec() {
        return Constantes.PORTAL_FLOW.RECARGAS_CANALES.indexOf(sessionStorage.getItem('canal')) > -1;
    }
    isFlowPortalRecargasWithRecDisabled() {
        return Constantes.PORTAL_FLOW.RECARGAS_CANALES.indexOf(sessionStorage.getItem('canal')) > -1 &&
            sessionStorage.getItem('recarga') == '0';
    }

    esLineaPrepago() {
        return this.sc.tipoLinea == '1';
    }

    isProductRoaming(producto): boolean {
        return (
            producto.catvCodCategoria == Constantes.WPSCategoriasDeCompra.roaming
            || producto.catvCodCategoria == Constantes.WPSCategoriasDeCompra.roaming_zona_mundo
            || producto.catvCodCategoria == Constantes.WPSCategoriasDeCompra.roaming_zona_claro
            || producto.catvCodCategoria == Constantes.WPSCategoriasDeCompra.roaming_zona_extendida
            );
    }

    isFeatureEnabled(index, name) {
        const switchIsOn = this.isWhitelistSwitchOn(index, name);
        if (switchIsOn) {
            const roamingWhitelistConfig = this.wcm.whitelistConfig[index][name];
            if (roamingWhitelistConfig.allowedNumbers.length > 0 && roamingWhitelistConfig.allowedNumbers.indexOf(this.sc.msisdn) > -1) {
                console.log(`Feature ${name} is enabled and current line is whitelisted`);
                return true;
            } else {
                console.log(`Feature ${name} is enabled but current line is blacklisted`);
                return false;
            }
        } else {
            console.log(`Feature ${name} is enabled for all lines, no whitelist is applied`);
            return true;
        }
    }

    isRoamingCategoryEnabled() {
        return this.isFeatureEnabled(Constantes.ROAMING_WHITELIST_NODE_ORDER, Constantes.ROAMING_WHITELIST_NODE_NAME);
    }

    isWhitelistSwitchOn(order, whitelistName) {
        return (
            typeof this.wcm.whitelistConfig !== 'undefined' &&
            this.wcm.whitelistConfig &&
            this.wcm.whitelistConfig[order] &&
            this.wcm.whitelistConfig[order][whitelistName] &&
            this.wcm.whitelistConfig[order][whitelistName].state ===
            Constantes.MOTOR_PAGOS_CONSTANTS.MOTORPAGOS_SWITCH_ENABLED
        );
    }

    isValidEmail(email) {
        if (email == null) { return false; }
        if (typeof email == 'undefined') { return false; }
        if (email == '') { return false; }
        return Constantes.emailRegex.test(String(email).toLowerCase());
    }


    isPromotionsModalDisplayed() {
        console.log(this.sc);
        
        const wcmPromotionsModalConfig = this.wcm.listaWCMRecomendaciones;
        const whitelistConfig = this.wcm.whitelistConfig;
        const servicioCompartido = this.sc;
        const index = Constantes.PROMO_WHITELIST_NODE_ORDER;
        const name = Constantes.PROMO_WHITELIST_NODE_NAME;
        const notFoundAnswer = {
            found: false,
            index: Constantes.PROMO_INDEX_NOT_FOUND,
            promociones: wcmPromotionsModalConfig
        };

        try {
            if (!this.isInWhitelist(whitelistConfig, index, name, servicioCompartido.msisdn)) {
                console.log('Promociones bloqueado por Whitelist');
                return notFoundAnswer;
            }

            let promotionFound = false;
            let prioridad = 5;
            let selectedPromotionIndex = Constantes.PROMO_INDEX_NOT_FOUND;
            const promoLocalStorageInfo = window.localStorage[Constantes.PROMO_LOCAL_STORAGE_OBJECT_NAME];
            const localStorageInfo = promoLocalStorageInfo != null ? JSON.parse(promoLocalStorageInfo) : {};
            for (let i = 0; i < wcmPromotionsModalConfig.length; i++) {
                
                if (!promotionFound) {
                    // prender y apagar  1 ACTIVO, DIFERENTE A 1 APAGADO
                    if (wcmPromotionsModalConfig[i][Constantes.CONFIG_STATUS_FIELD] != Constantes.CONFIG_STATUS_ACTIVE_VALUE) {
                        wcmPromotionsModalConfig[i].comment = 'Promocion no está activada';
                        continue;
                    }
                    // validar vigencia por fechas
                    const startDayDate = this.createPromoWCMDate(wcmPromotionsModalConfig[i][Constantes.CONFIG_START_DATETIME_FIELD]);
                    const endDayDate = this.createPromoWCMDate(wcmPromotionsModalConfig[i][Constantes.CONFIG_END_DATETIME_FIELD]);
                    const currentDate = new Date();
                    if (currentDate < startDayDate || currentDate > endDayDate) {
                        wcmPromotionsModalConfig[i].comment = 'Fecha de promoción no es válida';
                        continue;
                    }
                    // numero de veces
                    const today = new Date();
                    const todayString = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                    if (
                        this.weHaveNoConfigurationForThisPromotion(localStorageInfo, wcmPromotionsModalConfig, i, todayString)
                    ) {
                        this.setupNewPromoConfigurationForLocalStorage(localStorageInfo, wcmPromotionsModalConfig, i, todayString);
                    } else {
                        const currentTimes = localStorageInfo[wcmPromotionsModalConfig[i].idPromocion].PROMO_CURRENT_TIMES;
                        const limiteDiario = wcmPromotionsModalConfig[i].VecesDia;
                        if (parseInt(currentTimes, 10) >= parseInt(limiteDiario, 10)) {
                            wcmPromotionsModalConfig[i].comment = `Promoción llegó a límite diario de vistas. ` +
                                `#Límite ${limiteDiario} #Mostrado ${currentTimes}`;
                            continue;
                        }
                    }
                    // tipo linea FILTRO 1
                    let canales;
                    if (wcmPromotionsModalConfig[i].canales != '') {
                        let canalValido = false;
                        canales = wcmPromotionsModalConfig[i].canales.split(',');
                        if (canales[0] != 'Todos los canales') {
                            for (const canal of canales) {
                                const canalInfo = canal.split(' ');
                                const promoCanal = canalInfo[0];
                                if (promoCanal == servicioCompartido.canal) {
                                    canalValido = true;
                                    break;
                                }
                            }
                        }
                        if (!canalValido && (canales.length > 0 && canales[0] != 'Todos los canales')) {
                            wcmPromotionsModalConfig[i].comment =
                                `Canal no valido. Promo: ${wcmPromotionsModalConfig[i].canales}, Canal: ${servicioCompartido.canal}`;
                            continue;
                        }
                    } else {
                        wcmPromotionsModalConfig[i].comment = `Promo valida para todos los canales`;
                    }

                    switch (wcmPromotionsModalConfig[i].TipoFiltro) {
                        case '1':
                        
                                if (Number(servicioCompartido.codigoTipoLinea) != Number(wcmPromotionsModalConfig[i].TipoLinea)) {
                                    wcmPromotionsModalConfig[i].comment = `Tipo de linea no coincide con tipo linea de promocion. ` +
                                        `Linea: ${servicioCompartido.codigoTipoLinea}, Promocion: ${wcmPromotionsModalConfig[i].TipoLinea}`;
                                    continue;
                                }
                            
                            
                            break;
                        case '2':
                            const listaCodigosPlanTarifario = wcmPromotionsModalConfig[i].codigoPlanTarifario.split(',');
                            
                                if(!listaCodigosPlanTarifario.includes(servicioCompartido.codigoPlanTarifario)){
                                    wcmPromotionsModalConfig[i].comment = `Plan tarifario de linea no coincide con plan de promocion. ` +
                                        `Linea ${servicioCompartido.codigoPlanTarifario}, `
                                        + `Promo: ${wcmPromotionsModalConfig[i].codigoPlanTarifario}`;  
                                    continue;
                                }
                            
                                               
                            break;
                        default:
                            break;
                    }
                    console.log("fffffffffffffffffff")
                    console.log(servicioCompartido)
                    if (servicioCompartido.codigoTipoPlan != (wcmPromotionsModalConfig[i].TipoPlan)) {
                        if((wcmPromotionsModalConfig[i].TipoPlan) != 2){
                            wcmPromotionsModalConfig[i].comment = `Tipo de linea no coincide con tipo plan de promocion. ` +
                        `Linea: ${servicioCompartido.codigoTipoPlan}, Promocion: ${wcmPromotionsModalConfig[i].TipoPlan}`;
                        continue;
                        }
                        
                    }
                    if (wcmPromotionsModalConfig[i].Prioridad == '1') {
                        promotionFound = true;
                    }
                    if (prioridad > Number(wcmPromotionsModalConfig[i].Prioridad)) {
                        selectedPromotionIndex = i;
                        prioridad = Number(wcmPromotionsModalConfig[i].Prioridad);
                        wcmPromotionsModalConfig[i].comment = 'Promo casi seleccionada! prioridad ' +
                        `${wcmPromotionsModalConfig[selectedPromotionIndex].Prioridad}` ;
                    } else {
                        wcmPromotionsModalConfig[i].comment = 'Promo con prioridad mayor a las actuales ' +
                            `${wcmPromotionsModalConfig[selectedPromotionIndex].Prioridad}` ;
                    }
                    localStorageInfo[wcmPromotionsModalConfig[i].idPromocion].PROMO_CURRENT_TIMES = Number(
                    localStorageInfo[wcmPromotionsModalConfig[i].idPromocion].PROMO_CURRENT_TIMES) + 1;
                }
            }
            if (selectedPromotionIndex >= 0) {
                promotionFound = true;
                wcmPromotionsModalConfig[selectedPromotionIndex].comment =
                    `Bingo-! prioridad ${wcmPromotionsModalConfig[selectedPromotionIndex].Prioridad}` ;
            }
            window.localStorage[Constantes.PROMO_LOCAL_STORAGE_OBJECT_NAME] = JSON.stringify(localStorageInfo);
            return {
                found: promotionFound,
                index: selectedPromotionIndex,
                promociones: wcmPromotionsModalConfig
            };
        } catch (error) {
            return notFoundAnswer;
        }
    }


    private setupNewPromoConfigurationForLocalStorage(localStorageInfo, wcmPromotionsModalConfig, i: number, todayString: string) {
        localStorageInfo[wcmPromotionsModalConfig[i].idPromocion] = {};
        localStorageInfo[wcmPromotionsModalConfig[i].idPromocion].PROMO_CURRENT_DAY = todayString;
        localStorageInfo[wcmPromotionsModalConfig[i].idPromocion].PROMO_CURRENT_TIMES = 0;
    }

    private weHaveNoConfigurationForThisPromotion(localStorageInfo, wcmPromotionsModalConfig, i: number, todayString: string) {
        return localStorageInfo == null
            || localStorageInfo[wcmPromotionsModalConfig[i].idPromocion] == null
            || localStorageInfo[wcmPromotionsModalConfig[i].idPromocion].PROMO_CURRENT_DAY == null
            || localStorageInfo[wcmPromotionsModalConfig[i].idPromocion].PROMO_CURRENT_DAY != todayString;
    }

    createPromoWCMDate = (stringDate) => {
        return new Date(
            Number(stringDate.substr(6, 4)),
            Number(stringDate.substr(3, 2)) - 1,
            Number(stringDate.substr(0, 2)),
            Number(stringDate.substr(11, 2)),
            Number(stringDate.substr(14, 2)), 0, 0
        );
    }

    scroll(el: HTMLElement) {
        if (el) {
            setTimeout(() => {
                el.scrollIntoView({ block: 'start', behavior: 'smooth' });
                //console.log('pa abajo!');
            }, 250);
        }
    }

    requestTokenSMS(codigoNum: number, nroAutenticado?: string, tokenIngresado?: string, emailRecibo?: string, contrasenaRecibo?: any) {
        const request = {
            mailCelEnvio: null,
            codigoSecreto: null,
            mail: null,
            contrasena: null
        };

        if (codigoNum === 1) {
            request.mailCelEnvio = '51' + nroAutenticado;
        } else if (codigoNum === 2) {
            request.mailCelEnvio = '51' + nroAutenticado;
            request.codigoSecreto = tokenIngresado;
        } else if (codigoNum === 3) {
            request.mail = emailRecibo;
            request.contrasena = contrasenaRecibo;
        }

        return request;
    }

    prepareItemData(items) {
        const container = [];
        items.forEach((item, index) => {
          if (index % 2 == 0) {
            container[index / 2] = [];
            container[index / 2][0] = item;
          } else {
            container[(index - 1) / 2][1] = item;
          }
        });
        return container;
      }

    isValueContainedInArray(value, array) {
        return array.indexOf(value) > -1;
    }
    isPortalEmbedded() {
        return this.isValueContainedInArray(this.sc.canal, Constantes.CanalesIntegradosMCW);
    }
    isPortalIntegrated(canal: any) {
        return [Constantes.CANALES.MICLARO_APP, Constantes.CANALES.MICLARO_WEB, Constantes.CANALES.MICLARO_CORPO].indexOf(canal) > -1;
    }
    printVigenciaUtil(vigencia: any, tipoVigencia: string) {
        if (tipoVigencia == 'DIAS') {
          return vigencia + (vigencia > 1 ? ' días' : ' día');
        }

        if (tipoVigencia == Constantes.WPSTiposVigencia.value.mensual) {
          return vigencia + (vigencia > 1 ? ' meses' : ' mes');
        }

        return '';
    }
    enviarSMSToken(callback) {
        const request = this.requestTokenSMS(1, this.sc.msisdn);
        this.enviarToken.enviarTokenxSMS(request).toPromise().then((res: any) => {
          const rtpaBody = res.comunResponseType.MessageResponse.Body.defaultServiceResponse.idRespuesta;
          const idRespuestaDP = res.comunResponseType.MessageResponse.Header.HeaderResponse.status.type;
          if (Number(idRespuestaDP) == 0 && rtpaBody == 0) {
              // do nothing
              console.log('SMS token enviado correctamente');
            }
          callback();
        }).catch(err => {
            callback();
            console.log('error enviarTokenxSMS ', err);
        });
      }

    isEqualToMiClaroAppOriginalLine(changingLineValue) {
        return this.sc.canal == Constantes.CANALES.MICLARO_APP &&
          environment.urlComprasyPAgosMiClaroApp &&
          environment.urlComprasyPAgosMiClaroApp.linea != Constantes.EMPTY_STRING &&
          environment.urlComprasyPAgosMiClaroApp.token != Constantes.EMPTY_STRING &&
          changingLineValue == environment.urlComprasyPAgosMiClaroApp.linea.substring(2, 11);
    }

    reloadPortal() {
        let reloadUrl = Constantes.urlPortal.portalInternetClaro;
        const canal = sessionStorage.getItem('canal');
        const embeddedToken = sessionStorage.getItem('embeddedToken');
        const isEmbeddedChannel = sessionStorage.getItem('isEmbeddedChannel') == '1';
        if (this.isFlowPortalRecargas()) {
            reloadUrl += `?cn=${canal}&rec=1`;
        } else if ( isEmbeddedChannel && this.isPortalIntegrated(canal)) {
            reloadUrl += `?cn=${canal}&listnum=${embeddedToken}`;
        } else {
            reloadUrl += `?cn=${canal}`;
        }
        console.log(`Reload url: ${reloadUrl}`);
        this.go.reloadUrl(reloadUrl);
    }
}
