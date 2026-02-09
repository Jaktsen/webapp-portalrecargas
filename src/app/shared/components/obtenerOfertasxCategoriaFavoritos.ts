export class ObtenerOfertasxCategoriaFavoritosRequest {
    idCategoria: string;
    codigoCategoria: string;
    constructor(idCategoria: string, codigoCategoria: string) {
        this.idCategoria = idCategoria;
        this.codigoCategoria = codigoCategoria;
    }
}
