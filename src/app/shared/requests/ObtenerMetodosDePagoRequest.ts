export class ObtenerMetodosDePagoRequest {
  idProductoDeCompra;
  codTipoLinea;
  admin;
  idContrato;
	coIdPub;
	csId;
	contractIdPub;
  constructor(idProductoDeCompra, codTipoLinea, admin,idContrato,IdPub,csId,contractIdPub) {
    this.idProductoDeCompra = idProductoDeCompra;
    this.codTipoLinea = codTipoLinea;
    this.admin = admin;
    this.idContrato = idContrato;
    this.coIdPub = IdPub;
    this.csId = csId;
    this.contractIdPub = contractIdPub;
  }
}
