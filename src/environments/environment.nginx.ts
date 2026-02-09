/**
 * environment.nginx.ts
 * 
 * Entorno para despliegue en nginx (desacoplado de WebSphere Portal).
 * Usa los mocks locales como fuente de datos — sin dependencias WEF/WCM/WPS.
 * 
 * CLAVE: production = false  →  WefClientService.post() usa HTTP GET a mocks JSON
 *        en lugar de POST a servlets WEF. Esto permite que el frontend funcione
 *        completamente sin backends.
 * 
 * El build se ejecuta con optimizaciones de producción (AOT, tree-shaking, minificación)
 * a través del flag --optimization=true en angular.json, independiente de este flag.
 */

export const environment = {
  production: false,  // Mantiene mock routing en WefClientService

  tipoLinea: '',

  urlComprasyPAgosMiClaroApp: {
    token: '',
    linea: ''
  },

  // Configuración de roaming — apunta a mocks locales
  roamingConfig: 'assets/wcm/mocks/',

  // Motor de Pagos — bypass local (sin integración externa)
  motorPagosUrl: 'assets/wcm/mocks/bypassMotor.js',

  // Endpoints WEF — todos apuntando a mocks JSON locales
  urlComprasyPAgosWef: {
    enviarTokenxSMS:                'assets/mocks/enviarTokenSMS.json',
    validarTokenIngresado:          'assets/mocks/validarTokenSMS.json',
    obtenerCaptcha:                 'assets/mocks/obtenerCaptcha.json',
    obtenerTipoCliente:             'assets/mocks/obtenerTipoCliente.json',
    obtenerTipoClienteNoAutenticado:'assets/mocks/obtenerTipoClienteNoAutenticado.json',
    obtenerOfertas:                 'assets/mocks/obtenerOfertaporCategoria.json',
    obtenerCategoriasXproducto:     'assets/mocks/compraRapida.json',
    enviarNotificaciones:           'assets/mocks/enviarNotificacion/enviarNotificacion.json',
    obtenerPaquetesSugeridos:       'assets/mocks/obtenerProductosRecomendados.json',
    obtenerMetodosdePago:           'assets/mocks/obtenerMetodosDePago/obtenerMetodosPago.json',
    mantenimientoFavoritos:         'assets/mocks/mantenimientoFavoritos.json',
    obtenerCreditoSaldoProducto:    'assets/mocks/obtenerCreditoSaldoProducto.json',
    obtenerCategoria:               'assets/mocks/obtenerCategoria.json',
    validarProductoCompra:          'assets/mocks/validarProductoCompraRoaming.json',
    validarRoaming:                 'assets/mocks/validarRoamingActivo.json',
    confirmarAdelanto:              'assets/mocks/confirmarAdelanto/confirmarAdelanto.json',
    pagarProductoCompra:            'assets/mocks/pagarProductoCompra.json',
    regInicioTransaccionPagoTC:     'assets/mocks/inicioTransaccionTC.json',
    regFinTransaccionPagoTC:        'assets/mocks/finTransaccionTC.json',
    registrarLogSP:                 'assets/mocks/registrarLogSP.json',
    registrarRecargaTC:             'assets/mocks/recargas/registros.json',
    finalizarRecargaTC:             'assets/mocks/recargas/tcpagos.json',
    validarDegradacion:             'assets/mocks/validarDegradacion.json',
    obtenerSaldo:                   'assets/mocks/creditoSaldo.json',
  },

  // Timeout de sesión en minutos (antes venía de WCM via marker [Element key="Tiempo"...])
  wcmSessionTimeout: '30',

  // URL del portal — valor limpio, sin markers [Plugin:Matches] de WebSphere
  // El query string simula un usuario autenticado en canal Portal de Compras
  urlPortal: '/?root=1&num=999869451&canal=1&rec=0&admin=0',

  // Recurso WCM de degradaciones — apunta a mock local
  wcmResources: {
    mensajeDegradacionesURL: 'assets/wcm/mocks/MensajeDeErrorDegradaciones.json?subtype=js'
  }
};
