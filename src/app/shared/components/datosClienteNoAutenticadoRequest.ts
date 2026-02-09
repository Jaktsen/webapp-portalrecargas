export class DatosClienteNoAutenticadoRequest {
    msisdn: string;
    codigocaptcha: string;
    fuenteIngreso: string;
    autenticado: boolean;
    isPontisEnabled: boolean;

    constructor(misdn: string, codigocaptcha: string, fuenteIngreso: string, autenticado: boolean, isPontisEnabled: boolean) {
        this.msisdn = misdn;
        this.codigocaptcha = codigocaptcha;
        this.fuenteIngreso = fuenteIngreso;
        this.autenticado = autenticado;
        this.isPontisEnabled = isPontisEnabled;
    }
}
