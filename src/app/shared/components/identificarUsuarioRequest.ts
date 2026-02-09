export class IdentificarUsuarioRequest {
    msisdn: string;
    codigocaptcha: string;
    fuenteIngreso: string;
    autenticado: boolean;

    constructor(misdn: string, codigocaptcha: string, fuenteIngreso: string, autenticado: boolean) {
        this.msisdn = misdn;
        this.codigocaptcha = codigocaptcha;
        this.fuenteIngreso = fuenteIngreso;
        this.autenticado = autenticado;
    }
}
