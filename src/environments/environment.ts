// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  tipoLinea: '',
  urlComprasyPAgosMiClaroApp: {
    token: '',
    linea: ''
  },
  roamingConfig:'assets/wcm/mocks/',
  motorPagosUrl: 'assets/wcm/mocks/bypassMotor.js',
  urlComprasyPAgosWef:  {
    enviarTokenxSMS: 'assets/mocks/enviarTokenSMS.json',

    validarTokenIngresado: 'assets/mocks/validarTokenSMS.json',

    obtenerCaptcha: 'assets/mocks/obtenerCaptcha.json',
    obtenerTipoCliente: 'assets/mocks/obtenerTipoCliente.json',
    obtenerTipoClienteNoAutenticado: 'assets/mocks/obtenerTipoClienteNoAutenticado.json',

    obtenerOfertas: 'assets/mocks/obtenerOfertaporCategoria.json',
    obtenerCategoriasXproducto: 'assets/mocks/compraRapida.json',

    enviarNotificaciones: 'assets/mocks/enviarNotificacion/enviarNotificacion.json',
    obtenerPaquetesSugeridos: 'assets/mocks/obtenerProductosRecomendados.json',
    obtenerMetodosdePago: 'assets/mocks/obtenerMetodosDePago/obtenerMetodosPago.json',
    // obtenerMetodosdePago: "assets/mocks/obtenerMetodosDePago/obtenerMetodosPagoRecargas.json",
    // obtenerMetodosdePago: "http://localhost:8081/metodosPago",

    mantenimientoFavoritos: 'assets/mocks/mantenimientoFavoritos.json',
    // mantenimientoFavoritos: 'http://localhost:8080/mantenimientoFavoritos',
    obtenerCreditoSaldoProducto: 'assets/mocks/obtenerCreditoSaldoProducto.json',
    // obtenerTipoCliente: 'http://localhost:8080/obtenerTipoCliente'
    // obtenerCategoria: "assets/mocks/obtenerCategoriasMusica.json",
    obtenerCategoria: 'assets/mocks/obtenerCategoria.json',
    // obtenerCategoria: "assets/mocks/obtenerCategorias/obtenerCategoriasFantasma.json",

    validarProductoCompra: 'assets/mocks/validarProductoCompraRoaming.json',
    validarRoaming: 'assets/mocks/validarRoamingActivo.json',


    confirmarAdelanto : 'assets/mocks/confirmarAdelanto/confirmarAdelanto.json',
    pagarProductoCompra : 'assets/mocks/pagarProductoCompra.json',

    regInicioTransaccionPagoTC: 'assets/mocks/inicioTransaccionTC.json',
    regFinTransaccionPagoTC: 'assets/mocks/finTransaccionTC.json',
    registrarLogSP: 'assets/mocks/registrarLogSP.json',

    registrarRecargaTC: 'assets/mocks/recargas/registros.json',
    finalizarRecargaTC: 'assets/mocks/recargas/tcpagos.json',
    validarDegradacion : 'assets/mocks/validarDegradacion.json',
    obtenerSaldo : 'assets/mocks/creditoSaldo.json',
  },

  wcmSessionTimeout: '30',




  // canal recargas
  // urlPortal: 'http://localhost:4200?root=1&canal=1&rec=1&admin=0',
  // urlPortal: 'http://localhost:4200?root=1&num=999869452&canal=8&rec=1&admin=0',

  // otros canales con comportamiento de recargas  canales: [21,33]
  // urlPortal: 'http://localhost:4200?root=1&canal=23&rec=1&admin=0',
  // urlPortal: "http://localhost:4200?root=1&num=997352963&canal=23&rec=1&admin=0",
  urlPortal: 'http://localhost:4200?root=1&num=999869451&canal=1&rec=0&admin=0&idxp=0&mp=0',

  // urlPortal: 'http://localhost:4200?root=1&canal=7',
  // urlPortal: 'http://localhost:4200?root=1&canal=8&rec=1',
  // urlPortal: "http://localhost:4200?root=1&num=999869452&canal=1&rec=0&admin=0",
  // urlPortal: "http://localhost:4200?root=1&num=871020927&canal=2&rec=0&admin=0",

  // portal compras
  // urlPortal: "http://localhost:4200?root=1&num=997352963&canal=1&rec=0&admin=0",
  // urlPortal: "http://localhost:4200?root=1&num=999869452&canal=1&rec=0&admin=0",
  // urlPortal: "http://localhost:4200?root=1&canal=1&rec=0&admin=0",



  // MCW masivo
  // urlPortal: "http://localhost:4200?root=1&num=999869452&canal=2&rec=0&admin=0",
  // urlPortal: "http://localhost:4200?root=1&canal=2&rec=0&admin=0",


  //  urlPortal: "http://localhost:4200?root=1&num=997352963&canal=1&rec=1",
  //  urlPortal: "http://localhost:4200?root=1&num=997352963&canal=9&rec=1&admin=1",
  //  urlPortal: "http://localhost:4200?root=1&&canal=9&rec=1&admin=0",
  // urlPortal: 'http://localhost:4200?root=1&canal=8&rec=1',
  // urlPortal: "http://localhost:4200?root=1&num=999869452&canal=1",
  // urlPortal: "http://localhost:4200?root=1&num=871020927&canal=2&rec=0&admin=0",
   // urlPortal: "http://localhost:4200?root=1&num=999869452&canal=2&rec=0",
  // urlPortal: "http://localhost:4200?root=1&num=997352963&canal=1&rec=1",



  wcmResources: {
    mensajeDegradacionesURL: 'assets/wcm/mocks/MensajeDeErrorDegradaciones.json?subtype=js'
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
