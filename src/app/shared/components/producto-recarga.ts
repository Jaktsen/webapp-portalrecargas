export class ProductoRecarga {
    idProductoRecarga: string;
    nombreProductoRecarga: string;
    detalle1ProductoRecarga: string;
    detalle2ProductoRecarga: string;

    constructor( idProductoRecarga: string, nombreProductoRecarga: string,
                 detalle1ProductoRecarga: string, detalle2ProductoRecarga: string) {
       this.idProductoRecarga = idProductoRecarga;
       this.nombreProductoRecarga = nombreProductoRecarga;
       this.detalle1ProductoRecarga = detalle1ProductoRecarga;
       this.detalle2ProductoRecarga = detalle2ProductoRecarga;
    }
}
