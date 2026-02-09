export class ProductosOfertaRequest {
    idCategoria: string;
    codigoCategoria: string;
    constructor(categoriaSeleccionada: any, zona?: string) {
        this.idCategoria = categoriaSeleccionada.idCategoriaDeCompra;
        if (zona !== '' && zona !== undefined) {
            this.codigoCategoria = zona;
        } else {
            this.codigoCategoria = categoriaSeleccionada.codCategoria;
        }
    }
}
