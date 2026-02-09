export class RecomendadoRequest {
    msisdn: string;
    codigocaptcha: string;
    fuenteIngreso: string;
    autenticado: boolean;
    isPontisEnabled: string;

    constructor(misdn: string, codigocaptcha: string, fuenteIngreso: string, autenticado: boolean, isPontisEnabled: string) {
        this.msisdn = misdn;
        this.codigocaptcha = codigocaptcha;
        this.fuenteIngreso = fuenteIngreso;
        this.autenticado = autenticado;
        this.isPontisEnabled = isPontisEnabled;
    }
}
