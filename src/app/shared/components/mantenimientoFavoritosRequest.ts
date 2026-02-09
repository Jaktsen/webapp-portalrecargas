export class MantenimientoFavoritosRequest {
    idProducto: string;
    accion: string;
    idMetodoPago: string;

    constructor(idProducto: string, accion: string, idMetodoPago: string) {
        this.idProducto = idProducto;
        this.accion = accion;
        this.idMetodoPago = idMetodoPago;
    }
}
