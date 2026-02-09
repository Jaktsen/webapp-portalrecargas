import { environment } from 'src/environments/environment';

export const Constantes = {
MensajeGenerico:'Hemos tenido problemas en procesar tu solicitud. Por favor, inténtalo nuevamente. Si el problema persiste, ' + 
'comunícate al 123. Si estás fuera del país llama gratis al <b>+51 997 990 123</b>',
  PREFIJO_PERU: '51',
  COMPRA_EXITOSA_MENSAJE: 'La transacción fue realizada con éxito',
  COMPRA_ERROR_MENSAJE: 'La transacción no pudo ser realizada',
  INTEGER_100: 100,
  INTEGER_2: 2,
  MOTOR_PAGOS_WHITELIST_NODE_NAME: 'motorPagos',
  MOTOR_PAGOS_WHITELIST_NODE_ORDER: 3,
  MOTOR_PAGOS_CODIGO_PORTAL: '1', // 1 VALOR DE PRODUCCIÓN,  3 VALOR EN DESARROLLO
  EMPTY_STRING: '',
  CADENA_UNO: '1',
  MOTOR_PAGOS_COMPRA_COMPARTIDA: 'compraCompartidaMP',
  MOTOR_PAGOS_REG_FIN_TRANSACCION: 'registrarFinTXMotorPagos',
  PC_CATEGORIAS_COMPRA: {
    internet: '1',
    voz: '2',
    sms: '3',
    roaming: '5',
    sociales: '10',
    videos: '13',
    gifCard: '80',
    gifCard1: '81',
    gifCard2: '82',
    gifCard3: '83',
    cambio_velocidad: '11',
  },
  MOTOR_PAGOS_TIPOS_COMPRA: {
    'RECARGA SOLES': '1',
    RECIBO: '2',
    EQUIPO: '3',
    'EQUIPO+CHIP': '4',
    ACCESORIO: '5',
    'PAQUETE MEGAS': '6',
    'PAQUETE VOZ': '7',
    'PAQUETE SMS': '8',
    'PAQUETE ROAMING': '9',
    'REDES SOCIALES': '10',
    'ALQUILER PELICULAS': '11',
    'GIFT CARD': '12',
    OTROS: '13',
  },
  MOTOR_PAGOS_STATUS_COMPRA: {
    EXITO: '0',
    ERROR: '1',
  },
  REG_FIN_TRANSACCION: {
    IDF_RECARGA_SIN_ACTIVACION: '9',
    IDF_ERROR_ST_EXTORNO: '10',
    IDF_ERROR_CONSULTAR_MOTORPAGOS_SALDOS_INSUFICIENTES: '11',
    IDF_ERROR_CONSULTAR_MOTORPAGOS_TARJETA_VENCIDA: '12',
  },
  MOTOR_PAGOS_CONSTANTS: {
    TOKEN: 'token',
    MOTORPAGOS_SWITCH_ENABLED: '1',
  },
  /* 13  43 1000 */
  CANALES: {
    PORTAL_COMPRAS: '1',
    MICLARO_WEB: '2',
    MICLARO_APP: '3',
    SMS: '4',
    REDES_SOCIALES: '5',
    PORTAL_CORPORATIVO: '6',
    SEGUIR_NAVEGANDO: '7',
    TIENDA_VIRTUAL: '8',
    MICLARO_CORPO: '9',
  },
  get CanalesIntegradosMCW() {
    return [
      this.CANALES.MICLARO_WEB,
      this.CANALES.MICLARO_CORPO
    ];
  },
  CANT_FAVORITOS_label: 'CANT_FAVORITOS',
  CANT_ACTUAL_label: 'CANT_ACTUAL',
  flagFav: 'Flag',
  allowedFavorites: 'Permitidos',
  TIPOS_LINEA: {
    PREPAGO: '1',
    POSTPAGO: '2',
  },
  FLAG_WHITELIST_ENABLED: '1',
  PONTIS_FLAG_DISABLED: '0',
  PONTIS_FLAG_ENABLED: '1',
  PONTIS_WHITELIST_NODE_NAME: 'pontis',
  PONTIS_WHITELIST_NODE_ORDER: 5,

  ROAMING_WHITELIST_NODE_NAME: 'roaming',
  ROAMING_WHITELIST_NODE_ORDER: 8,

  // POPUP PROMOTIONS
  PROMO_LOCAL_STORAGE_OBJECT_NAME: 'PROMO_INFO',
  CONFIG_STATUS_FIELD: 'Encendido',
  CONFIG_LINETYPE_FIELD: 'TipoLinea',
  CONFIG_TIMES_A_DAY_FIELD: 'VecesDia',
  CONFIG_START_DATETIME_FIELD: 'FechaHoraInicio',
  CONFIG_END_DATETIME_FIELD: 'FechaHoraFin',
  CONFIG_STATUS_ACTIVE_VALUE: '1',
  PROMO_WHITELIST_NODE_NAME: 'modal',
  PROMO_WHITELIST_NODE_ORDER: 6,
  PROMO_INDEX_NOT_FOUND: -999999,
  CONFIG_ID_PROMO_FIELD: 'idPromocion',
  LOCALSTORAGE_FIELD_PROMO_CURRENT_DAY: 'PROMO_CURRENT_DAY',
  LOCALSTORAGE_FIELD_PROMO_CURRENT_TIMES: 'PROMO_CURRENT_TIMES',
  DYNAMIC_PRICE_RECHARGE_PRODUCT_CODES: [
    'RECARGA_PRE000',
    'RECARGA_POSTMASI000',
    'RECARGA_POSTCORP000',
    'RECARGA_POSTBAM000',
    'RECARGA_PREBAM000',
  ],
  RECHARGE_LIMITS: {
    MIN: 3,
    MAX: 200,
  },
  CUSTOM_FULLVEL_DEGRAD_ERROR_MESSAGE:
    'Podras comprar un paquete ALTA VELOCIDAD, cuando hayas degradado la velocidad de tu plan. Mayor info: claro.com.pe',
  POPUP_TYPES: {
    error_custom_message_exit: '7',
  },

  VisitaMiClaroWebUrl: 'https://mi.claro.com.pe',

  WPSValoresCategoria: {
    value: {
      idCategoria: 0,
    },
    configurable: false,
    writable: false,
  },
  WPSMediodePagos: {
    value: {
      tarjeta: 'Tarjeta de Crédito / Débito',
      recibo: 'Cargo en recibo',
      puntos: 'Claro Puntos',
      prepago: 'Saldo de Recarga',
    },
    configurable: false,
    writable: false,
  },
  WPSTipoLinea: {
    prepago: '1',
    postpago: '2',
    todos: '3',
  },
  WPSTipoPermiso: {
    value: {
      usuario: '1',
      usuarioplus: '2',
      administrador: '4',
      todos: '5',
      usuarioyusuarioplus: '6',
    },
    configurable: false,
    writable: false,
  },
  WPSCategoria: {
    value: {
      movil: '1',
      fijo: '2',
      internet: '3',
      tv: '4',
      todos: '5',
    },
    configurable: false,
    writable: false,
  },
  WPSTipoLlamadas: {
    value: {
      entrantes: '1',
      salientes: '2',
      porcobrar: '3',
    },
    configurable: false,
    writable: false,
  },
  WPSTipoBolsa: {
    value: {
      internet: '1',
      minutos: '2',
      sms: '3',
      mms: '4',
    },
    configurable: false,
    writable: false,
  },
  WPSTipoMensajes: {
    value: {
      sms: '1',
      mms: '2',
    },
    configurable: false,
    writable: false,
  },
  WPSCriterio: {
    value: {
      todos: '0',
      porhorario: '1',
      portipo: '2',
      pordestino: '3',
      infcomplementaria: '4',
    },
    configurable: false,
    writable: false,
  },
  WPSTitularidadServicio: {
    value: {
      soloServicioUsuarioTitular: '1',
      soloServicioUsuarioAfiliado: '2',
      serviciosTitularesAfiliados: '3',
      soloServiciosEmpleado: '4',
      serviciosTitularesEmpleado: '5',
      serviciosAfiliadosEmpleado: '6',
      serviciosTitularesAfiliadosEmpleado: '7',
    },
    configurable: false,
    writable: false,
  },
  WPSMensajeError: {
    value: {
      noClaro: 'Esta línea no pertenece a Claro',
      atencion: '¡Atención!',
      upps: '¡Uppsss!!',
      upps_descripcion01: 'Tuvimos un problema',
      upps_descripcion02: ' vuelve a intentarlo',
      upps_descripcion03: 'Vuelva a intentarlo',
      exlamacion1: '¡Ay Caramba!',
      exlamacion2: '¡ALTO!',
      mensaje1: 'Tuvimos un problema.',
      mensaje2: 'Por favor ',
      mensaje3: 'vuelve ',
      mensaje4: 'vuelva ',
      mensaje5: 'a intentarlo',
      mensaje6: 'Ocurrió un error. Por favor inténtalo de nuevo',
      mensaje7: '¡Lo sentimos!',
      error_titulo: '¡Parece que tenemos un problema!',
      error_descripcion01: 'Por favor,',
      error_descripcion02: 'actualiza la página y vuelve a intentarlo.',
      error_descripcion03: 'actualiza la página y vuelve a intentarlo.',
      CODIGO_ERROR: '99',
      CODIGO_ERROR_CORPORATIVO: '98',
      MOTOR_PAGOS_GENERICO:
        'Le informamos que no se produjo cargo en su tarjeta.',
       MOTOR_PAGOS_GENERICO_REGISTRO_INICIO:
        'Por favor inténtalo otra vez',
      MOTOR_PAGOS_FALLA_SWITCH_EXTORNO:
        'No te preocupes que realizaremos el extorno del monto cargado en tu tarjeta en las próximas 24 horas',
      MOTOR_PAGOS_FALLA_SWITCH_PAQUETES:
        'No te preocupes <b>hemos realizado una recarga a tu saldo por el monto abonado</b> para que puedas realizar la compra',
      MOTOR_PAGOS_FALLA_SALDOS_INSUFICIENTES_CONTENT:
        'Inténtalo nuevamente con otro método de pago, otra tarjeta de crédito/débito o comunícate con tu banco',
      MOTOR_PAGOS_FALLA_TARJETA_VENCIDA_CONTENT:
        'Inténtalo nuevamente con otro método de pago, otra tarjeta de crédito/débito o comunícate con tu banco',
      MOTOR_PAGOS_FALLA_TARJETA_VENCIDA_TITLE:
        'Lo sentimos, la transacción fue rechazada por tu banco ',
      MOTOR_PAGOS_FALLA_SALDOS_INSUFICIENTES_TITLE:
        'Lo sentimos, no cuentas con saldo suficiente para esta transacción',
        MOTOR_PAGOS_FALLA_DEFAULT_TITLE:
        'Lo sentimos, la operación no pudo ser completada ',
      PRESTAME_MEGAS_EROR_TECNICO_TITULO: 'Lo sentimos, la operación no pudo ser completada ',
      PRESTAME_MEGAS_EROR_TECNICO_CONTENT: 'Ha ocurrido un error, por favor inténtalo más tarde',
      PRESTAME_MEGAS_EROR_MOBUP_TITULO: 'Lo sentimos, no se ha podido realizar el préstamo',
      PRESTAME_MEGAS_EROR_MOBUP_CONTENT: 'Ha ocurrido un error en la operación, por favor inténtalo otra vez',
      PRESTAME_MEGAS_EROR_GENERICO_TITULO: 'Lo sentimos, la operación no pudo ser completada',
      PRESTAME_MEGAS_EROR_GENERICO_CONTENT: 'Ha ocurrido un error, por favor inténtalo más tarde',
      ROAMING_TITULO_MANTENIMIENTO:
          'La compra de paquetes roaming se encuentra en mantenimiento',
      ROAMING_MENSAJE_MANTENIMIENTO: 'Por el momento, puedes comprar un paquete <b>comunicándote con nosotros desde tu móvil Claro al ' +
          '123 o al 135 si tu línea es corporativa</b>. Si estás fuera del país llama gratis al <b>+51 997 990 123</b>',
      ROAMING_TITULO_FELICIDADES: '¡Felicitaciones, tu plan ya cuenta con cobertura internacional para ',
      ROAMING_MENSAJE_FELICIDADES: 'Puedes utilizar tus megas, minutos y SMS en tu viaje sin necesidad de contratar este paquete',
      ROAMING_TITULO_PAQUETE_VIGENTE: 'Lo sentimos, ya tienes un paquete vigente o con saldo',
      ROAMING_MENSAJE_PAQUETE_VIGENTE:
          'Si deseas cancelarlo por favor comunícate al 123. Si estás fuera del país llama gratis al <b>+51 997 990 123',
      ROAMING_TITULO_ACTIVA_PAQUETE: 'Recuerda que debes activar el servicio de Roaming',
      ROAMING_MENSAJE_ACTIVA_PAQUETE:
          'Para poder seleccionar este paquete comunícate con nosotros llamando al 123. ' +
          'Si estás fuera del país llama gratis al <b>+51 997 990 123',
      ROAMING_MENSAJE_PAQUETE_PRO: 'Ya tienes un paquete programado, si deseas cancelarlo por favor comunícate al 123. <br> Si estás fuera del país llama gratis al <b>+51 997 990 123',
      DEGRADACION_TITULO: '¡Lo sentimos! No pudimos validar el estado de tu servicio.',
      DEGRADACION_MENSAJE: 'Por favor, selecciona nuevamente el paquete que deseas comprar.'
    },
    configurable: false,
    writable: false,
  },
  WPSTipoClienteDir: {
    value: {
      masivoFijo: '1',
      corporativoFijo: '2',
      todosFijo: '3',
      masivoInternet: '4',
      corporativoInternet: '5',
      todosInternet: '6',
      masivoTv: '7',
      corporativoTv: '8',
      todosTv: '9',
      masivoTodos: '10',
      corporativoTodos: '11',
      todos: '12',
    },
    configurable: false,
    writable: false,
  },
  WPSMensajeErrorTotal: {
    value: {
      upps: '¡Parece que tenemos un problema!',
      mensaje: 'Por favor,',
      mensaje2: 'actualiza la página y vuelve a intentarlo',
    },
    configurable: false,
    writable: false,
  },
  WPSpaginacion: {
    value: {
      pagina: '1',
      cantResultadosPagina: '10',
    },
    configurable: false,
    writable: false,
  },
  WPSMediosDePago: {
    puntosClaro: { codigo: '1', descripcion: 'Puntos Claro Club' },
    cargarEnRecibo: { codigo: '2', descripcion: 'Cargar en Recibo' },
    tarjetaCredito: { codigo: '3', descripcion: 'Tarjeta de Crédito' },
    saldoPrepago: { codigo: '4', descripcion: 'Saldo Prepago' },
  },
  WPSCodigoError: {
    value: {
      idErroCapcha: 6,
      idExito: 0,
      idNoEsClaro: 2
    },
    configurable: false,
    writable: false,
  },
  WPSidRoaming: {
    value: {
      idcategoriaRoaming: 5,
      idCategoria6: 6,
      idCategoria7: 7,
      idCategoria8: 8,
    },
    configurable: false,
    writable: false,
  },
  WPSIndicadorRequest: {
    value: {
      indicadorCreditoSaldo: 1,
      indicadorCategoria: 2,
      indicadorOfertas: 3,
      indicadorMetodosPago: 4,
      indicadorOtrasCompras: 5,
      indicadorFavoritos: 7,
      indicadorCompraTC: 6,
      indicadorRoaming: 9,
    },
    configurable: false,
    writable: false,
  },
  WPSVigenciaRoaming: {
    value: {
      diario: '1',
      mensual: '30',
    },
    configurable: false,
    writable: false,
  },
  WPSTiposVigencia: {
    value: {
      mensual: '6',
    },
    configurable: false,
    writable: false,
  },
  WPSMensajvalorNotificacioneseError: {
    value: {
      actualizar: 2,
      insertar: 1,
    },
    configurable: false,
    writable: false,
  },
  WPSEstadosCategoria: {
    value: {
      tieneSubCategoria: 1,
      sinSubCategoria: 0,
    },
    configurable: false,
    writable: false,
  },
  WPSTipoClic: {
    value: {
      clicCategoria: 1,
      clicPaises: 2,
      clicOfertas: 3,
      clicMensual: 5,
      clicDiario: 4,
    },
    configurable: false,
    writable: false,
  },
  WPSCategoriasDeCompra: {
    internet: '1',
    voz: '2',
    smsmms: '3',
    roaming: '5',

    recargas: '4',

    roaming_zona_claro: '6',
    roaming_zona_extendida: '7',
    roaming_zona_mundo: '8',


    chevere: '9',
    vozysms: '12',
    sociales: '10',
    videos: '13',
    compartir: '15',
    velocidad: '11',
    gifCard: '80',
    gifCard1: '81',
    gifCard2: '82',
    gifCard3: '83',
    miniPlanes: '22',
    musica: '25',


    paquetesRecomendados: '99',
    pontis: '97',
    prestameMegas: '98',
    canjeEventos: '15',
    canjeEventosSub1: '16',
    canjeEventosSub2: '17',
    canjeEventosSub3: '18',
    canjeEventosSub4: '19',
    canjeEventosSub5: '20',
    paquetesExclusivosOnline: '22',
    internetRoaming: '26',
    claroMusica: '25',
    paquetesGamer: '95',
    recuperaTuVelocidad: '24',
    llamadasIlimitadas: '41',
    minutosInternacionales: '21'
  },

  get WPSHiddenCategoriesInSeleccionaElPaqueteQueNecesitas() {
    return [
      this.WPSCategoriasDeCompra.prestameMegas,
      this.WPSCategoriasDeCompra.paquetesRecomendados,
    ];
  },

  WPSCanjeConstantes: {
    DBProductCode: 'DBProductCode',
    DBCategoryCode: 'DBCategoryCode',
    DBUniqueIdentifierColumn: 'codigoProducto',
    ClaroPuntosCodeField: 'codValidacionClaroClub',
    ClaroPuntosMessageField: 'msgValidacionClaroClub',
  },
  WPSPaqueteIlimitadoConstantes: {
    value: {
      PaqueteIlimitadoCodeField: 'codValidacionPaqIlimitado',
      PaqueteIlimitadoMessageField: 'msgValidacionPaqIlimitado',
    },
    configurable: false,
    writable: false,
  },
  WPSTipoProductoAuditoria: {
    value: {
      movil: 'MOVIL',
      fijo: 'TELEFONIA',
      internet: 'INTERNET',
      tv: 'CLAROTV',
    },
    configurable: false,
    writable: false,
  },
  Canales: {
    value: {
      PORTAL_COMPRAS: 1,
      MICLARO_WEB: 2,
      MICLARO_APP: 3,
      SMS: 4,
      REDES_SOCIALES: 5,
      PORTAL_CORPORATIVO: 6,
      SEGUIR_NAVEGANDO: 7,
      MICLARO_CORPO: 9,
    },
    configurable: false,
    writable: false,
  },

  VariablesWef: {
    value: {
      ES_AUTENTICADO: '#wef_esAutenticado',
      NUMERO_AUTENTICADO: '#wef_numeroAutenticado',
      CANAL: '#wef_canal',
    },
    configurable: false,
    writable: false,
  },
  // En Minutos
  WPSSessionTimeout: {
    threshold: Number(environment.wcmSessionTimeout),
  },
  urlPortal: {
    portalInternetClaro: environment.urlPortal,
  },
  Icons: {
    'claro-puntos':
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJSSURBVHgB7VZtbtNAEJ1ZmzYSPyg3CBI4Tmqk5ASYG5QTlJwAeoI2J0h6g3CClhM0nKBBShsnQcLcIBIUJcHeYcYxf9L4K0SAUJ6U7K49uzM7++atAXb4y0AoiEnleZsAju7mRqPh96fwm1BQEARU5/9yqRTUYQsoHMC28X8G8Mk6PB5bzvXQdtwsWxO2jHHFeaMBOtEg1OUs+8IZ0EDvuWH2B/7qu4nlnELsnBBa1cltF/4UxDnvnuTnVQ7f5p2X6wgmTx2XFB0TKhe5BBFwyuXYB63fWfEuRRtAMoP6xPby7zxTiGRnnM6zlCX8EH+8lN5sNps2fL+QOKm8zplY5yEGT6zRAO/m3x6HqJucBV9EyaAHV7NZqbDzKPykF0Pb5oXNz0sr3bTWpDWy0eYFryLq2LFGNydQEIkZMMA4jTpEXSvhTKue54cqeLUc4evrcv0ACiKRhKixzumHBdE5pECCYOb3uOvu781dbi+lCpDwXjBaBV2xzxUARWkFcCa3fcgAEX1BRDDZ6fhZjedhe93hIhmy5lGuAHg+lxocSFqzrl2F+IjiPpdlf2jXmkqr8j07ky5XnyVnAEB27sbXbg9SQIBCQggN5cu4WkAHEklIBB+kNTS008gl2i+lKCVZ9QY9KIjEAPYWZieqc+bCw/3gQkpuvfOl9mtNLdgAqUooThUZVyy9ZVE8IN3TCB+F4cy5F2ziip1cPBVvcAbbDuBXECaZbVphb4wp344te3TTgQ2R+6N0XKvVdYiunDeS4qrA/vfF194m8rvDDjv8U/gJ2af6k9dHIAoAAAAASUVORK5CYII=',
      // 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGKADAAQAAAABAAAAGAAAAADiNXWtAAACTUlEQVRIDe1STWgTQRR+byax9QcLFgTNpcX8bJrsEi0iAUFBhRYRPBjxVu3Jg6ei6KFoPHkpHjwUT4J4ECmKCL15UDx4CrapZWM2qYIVVCq2tlZJduc5C6ZMdzch6rEOLPN+vvd9++Y9gA1xKgnjktWXPv03zbJ2ighpCATm2sF6MW0JeIv+xP8nASJCS9OvVJP60WaibQkQgUNAtkpCqdymiqbflyI3BGBczal2SHWa2ZzjCGJooZH/aBhbrVrpMQIcYQgXo2ZxvJHz3i0F3NYF4YAQIgFElWoy/XSP+XpypU7HJNEhYHwoak7f85KqvvwJ/7EGBzvg3fw4CRqWgG+AWJZP1AsE3Qg40RXqHv4eXgz1Tk0t+qvXR4JnMDd/HQSdY8BGo0ZyR6w0sz925tROZHiBEE4uOV9utkO+Xuq391bL9FgJ3S5r+q0ggKUZ+XIiTXPptBGU98Z8M3CQDsjN4OEwBg4uxDtu1+0f14SN2Upq3yrZtcuEGG4QI8Fk7M3MRMP3PRGRiLjJbbXtHxog9e7JHf8sZ1KX84iQU48AwmEEWvtkbq+K93UAwGYBHFjmyxkJfKGCXbv64FGf3Kiw3KDZmDn9XIZiXozq+zqArs6XiPjJdsQY9fevte4WUT7PZIdjcpOWGHeeqUTN7OA11YwTkuiJFCogx1EmuGlDPQ4CrkqigwzZ2WipeLcZqRoPFHABlZQxIBxxR771LqVgAZCdj5eKD5VYS7OpgFv1Ppvd/PPrSkaCEsC5taWTv9pdKKy2ZPyf3Hgv8AvCOspN6/wZQgAAAABJRU5ErkJggg==',
    'claro-puntos-apagado':
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAI7SURBVHgB7VZdbtNAEJ6dRaISD4QLFPulEAm58QkINwgnKJyA9gRtTpD0BuEELSeoOYHzg9Q2IDlpOUCeKiTkWWY2zguJfzaNWqnKJ0Vrb9Y7n7+Z+dYAWzwyFDhiOL7pgDGt9I7CMPRncE8gOIIZN3jwYMeO94YzgU3jaRL48ev3weh6GseXSbNs7TPYMEbj2y+Upl251qC9svXOChCl33iQ6p8sBf95e2wM2eCGqB3Ud3vwUJDgw+upkd/gKjms+lylFIw4l0brA+7/JkgLigJK9SGFr4u3JKKWknmio/2634OKKDUiKyvRScGSSUr0wV79gZmrOWHV4JzbUw7kB29eK3bBV/ymn828DjyNeLFOcEGuAtxCsnFibzhYsEJWWYOIZ9YdleoGe7tH4IhcBbTG44xjL8jJaVj3J5z7j/bGmE9xnNTAEblFqAw0WGJI/6anUAAhMRrfRIYLVD+HJk+dD66mh9yHS2QIoCfrKxEw80MHwnd+H0rAxjNViJLQWjxOGky+A2pZXDQke7YqEYC52dRE1rLiUqheLq7DPb8/vEykQL0lohrO/5/LTwH3uciaHbsRFEJZtdLMHQMHH8gtQpb1u2WI2CkqLvF+HjxpSc5vBI7IJ7ADXdlUakG/0GfScquCL7xfkWrDGih0wqzPL9Q8nxPOS2TIDKTCldbvM2u2Bw/b7wlsmsCChEbV4aWtFX/PWIH2/lu/C2ui8keptBcSNjk5HvfojBD6cAfRJj5Mt9hii0fFP1RJBj8Y+k4lAAAAAElFTkSuQmCC',
      // 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAA5FBMVEUAAAD///////+q///V1dXf39/R0ejY2Njb29vP39/S0uHV1d/O2OLW1t7T2+LR2N7S2d/T2OPU2d7U2eLR2eLS2+PR2ODT2uHT2+LS2eDT2uDR2+HT2eDR2OHS2OHT2eLS2uDT2eHR2eHS2uHR2OLR2eLS2eDR2OHT2eDR2uDS2eHT2eHR2uLR2eHR2eHS2uHR2OHT2uDS2eHS2ODS2eHR2eHR2eHS2uHR2eLS2eHT2uHS2eHS2eHT2eHT2eHS2eHS2uHS2eLS2uHS2eDS2eHS2eHS2eHS2eHS2eHS2eHS2eHS2eFkCxrJAAAAS3RSTlMAAQIDBggLDQ4QERgaHyMnKC4vNT0/QkVGSUtNUVRVV1pdXmZpamtvc3V4eXuAhomRlpmen6Koq62wuLu8w8nKzNDT2d3s7/D2+v4dEc4HAAAAAWJLR0QB/wIt3gAAAKdJREFUGBnNwcUWglAUBdAjoNjdiYGFiYEdCCrc//8fZS0nD5k5cW/8YNCAN12DN12DN13DGzcswOW6BiCsSYZLPg0E9nYfDF9luV/VuKrVBMO/pcfZpEMwBNbCHvHgutYGrIQ9g2NMGTBkSsIRISU+V1W1jg+FRDh4a5q7GYYxwYdEWThS1AEj/DgJALjdMwpWy76UYsUj9eAmmUR0b+NboNyuiPgXL+g3E7rb7bxPAAAAAElFTkSuQmCC',
    'saldos-de-recarga':
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKsSURBVHgBxVdNbtpAFH4zRk2X5gS1oeKvIJFdl8mmi65QL1B6gqa77IBlV2lOEHICjlCOgNSqJSDAN4i7qUSJZ/oeHhxDIODxRPkk22OPPe9773szfsMAkcvlWlLKM2zakAw+Y6w7nU6/gCYsNH6Bxs+x/RKSg755a9s2832/Dxpgruve4tVGEq6HSPKxg8AIzLDpz2azLGggAyrsm8aRGA3sbLzvoSE3ukHgewDJpVsjkAoYuVNIAZJAUgM9Y0k+NJW4HDSgErcNeqGnfDvD9GnTjZYEOEBTXaPEHb+unkjGHGr/g2BQHf8axL8ZVSp1WED93eJvnxIXj8/4uK2bA2uJOy7WLiSQHEs14UUY2HVJA6sHXDo9sLMf4E80Ruok/F0qORRSJOAJxjv0jAvw4++MSpUmhsvBo3vsDXw1c8AIgXuwQXn4o7u1S1otik7Ag85ml1YSxlEeDj289DHeDZTidlR4c0VRWfUvvYfQe/WuWQKEgN19kkxeC5xiwFjTkpmrqHPpPWz1nmBEAuVZk9rjYrWHqdiYuuVXd0fsdKV9+eah98YI3BRqDSbDrEbjdTrPjyTDSOzU3igBxmQvPulQiksL+Emk/Q7vjREAIY4Dy6qHN9IrD3/2R8XabJ/3xggUwlUvWvlIkkO8N0ZgE4IvBlxkOoIH3c0+qiFU0zdCQBUl3yFWO7yfz/FMB7Tiq14cuHpe0zXVOrDN+AHw0XgHfyP0K08XgZhxjwqTpCUdIe1K6KQxboJAKuMEXQk8OqU1vpdAPp//KIT4hk2fc96eTCbLzI1Xxqp6XnuWBI9KgMbbEFYujiKyDQ4kmwWHE4D1otOHJ8CjBFBjKp09UHMXngDPvzVDw5c4SIsG2rVs7sNqWdWBRbta3N1mkUAJku+QSZqvGLhz0MR/gK9hOn8869wAAAAASUVORK5CYII=',
      // 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGKADAAQAAAABAAAAGAAAAADiNXWtAAAC90lEQVRIDbVWTUxTQRCe2VdrqCKIhERNPUArRWwxVDwZ0YvGePEg8UA0wZ/EaKLx4k3EqwePeiAe1BBMCBclGhUihotBTKSFttASE4wcNAEJBUvb3XG29oWStPRH3cvs7sx835uf3X0IPML17nZCuAdEu/R6w4E4hwS3nFP+ng3t0kqMeDw1Kq6+IuAnAHyT34mOE5BXWIXd4fN9z2dvEQlyKQKrMPB2XcA3pB0iLvdlAmg3nRGgxxHyd+v1zD7PiJQ0qP14mZ9AkiEAkqCUkCZgLkltbcaXyak4O9zgKMrDrgNHs9kaKJXahCEdIWojouQ7RMsxZ+jzcDYHvTfn9dqi0VWtb9HrvAMhjoQXLHkN0wYry3GdshYU4hqQCACpakDaQ4RSAPoIufQ8EJPbObodbHNRN07BBAS4G4DAGfQ9mGlsOqwkPSYiGzITCNHkDI5PaIJpl/s908S5aV6z6g6ns/ihpDrLXsGyqnIb1NptjqAvBZ6qCdERIeC+iVoSAaAY5Xx4YgvRbjE7l1ET2cXAo46A/5VJUHCKTActOR1PIw0eVETnVFIOhvd7GyEp7dwsrYbAU5m2JRFogM2VW/poPja4CslZlIkWLuwVRByrC/pfZhKUlKJwg+fqr/mllRgkvnEn/QBQq1zwVgJxNxNcz0uKoEJUPVmkhYiBKkY267hcjj/nDvu4NzQ+8E8IaiaHowyUureoq0uEe/srhUXcXA9O5cCHraQIIg3u05yS69zvIvKsnw8XLJCkzrDL3alJWGdwTQ6x/m3RNQjXe87w5djHOPb1X7y2YsKEQHhYZmw9X3QEhNTLn/ihwlJ9Mp2qNeQss6Ij0OCVBYJrvpwE1Nhm5XfBq6U25Et9iN+FRxp8Sf3cqfcKGTkJIjI0wCd1TEsNVBvwjTinJi4tqvm9UiWn+Sw0/xUBOx9MA5jyz5LEttTElGmjXIJfSqm0UghlrDMS0MHd8IKT2JG5b9qZfpm6bPNSHv0T3OPNhT76XLf/+9vyGwPVTDsj2/ydAAAAAElFTkSuQmCC',
    'saldos-de-recarga-apagado':
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKUSURBVHgBxVdLbtswEB2SWXXl7ItG2iQ1UNjWDdIb+AZxT9DkBJZP0OQEcU7gI9Q3iOMUdZ0WlftBt9UqgIGQzAwjObLiT0QSyANs6kfOmw+fRgwQ19//dLVSx3hYg2pIgbF+Y//NCViCjW9+fwKtj8EBSL7XrIcxWICNp7/+41iTSoVRPZxVmXw5SQLBeYKHaeNgbxcssANZ2MvGkRgtHJSen6GhMD+hOfgcQPXULRFYCY0/tuJaGRi59+AASoFZFz1jVSb6KlwOFqDCReMx2IW+RkV/NUliOtkBG2jdoaFYuNeT5FBnNSMljKJ34ag45fImaQkpWhLkkAqXcf4RL8d2BEqFayJS2MriIa5LKRWaD4DrAG5hF149rmFLYAHaihRS9H7GUA/MRY55LmA8STpgosP6URSm2c4BLwRyMGCjRj3sr7zJeZcGqWTvyS1wBKWBMTbEwmiTqGE6zk1UMix5v0LonAkQ7qT8gLviAkmkVKBCiPNHC+u9J3hJQeZZh47H09kAFav99ee/vbv5nEQqWOe9NwLjadIGlWsCa9H/fD5nYov33ghgnAfFZGqtzgTAIWzx3hsByVQkJBjPJW5HNDjMXmYbvfdGINo3qrdQPpOSZ3jvjUAZUsGIg+opgH75XmGLpl4IZE3JZ3jaOwDWQbeoekVgnVzQ6KQDm4xvQGpauLeheXc4RSA3Tu8BhY1J1ZaO4KqETsadCbgaJ1ilgAzT6Gp8K4EvP/4eKSlPgQoHRNw8eG0qt1nojHPBKXbLVbAxBWg8hofOJWBgiKxCANV2wfMJQKHp1LDc5fjCRgLYdJ5k+U4X7ZZnvPynGarSGbbIXVponWxuQy6rNjCt89W35JQxfgQWXznkgO2XMeEe3QlRqSyo2VAAAAAASUVORK5CYII=',
      // 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAA9lBMVEUAAAD///////+q///V1dXG4+PR0ejV1erY2NjM3d3V1ePR3NzT3t7V1d/T2+LQ1+TQ2+HR2+DS1+HT2OLQ2eHS2uLS2+PT19/U2ODR2ODR2eHS2uHW3uXR2OPS2eDT2uDT2uHS2OLT2eDR2uDR2+HT2eLR2uLS2uDS2ODT2OHT2eHS2eHV2uTS2eDS2eLS2uHS2OHR2eHS2uHS2eDS2uHT2eHS2uLS2uHT2OHS2eHS2eHS2uLS2ODS2eHR2eHS2OHS2eLT2eHS2eHS2eHS2uHR2eHS2eDS2eHS2eHS2eHS2eHS2eHS2uHS2eHS2eHS2eHS2eHS2eFinQYRAAAAUXRSTlMAAQIDBgkLDA0PEhYXGCMmKzIzNDw+P0BBQkNERUhJS0xPUVNUV1laW1xdZWdrcXZ3gIiNj5udpLK6u7/AwsTGx8nKy8zP2ePk5ebt7vj5+vwYBC/TAAAAAWJLR0QB/wIt3gAAAPJJREFUKM9l0ltTwjAQBeCjVotaLyhQbVQsilYqCl4xVKniBYSm3f//Z3ywoU1yHvPNbGb2LHA1JZlpgCKOGN3JxGKzgDp5QMg5DwGP6gW45EpYcXstxhhj7MDJAQCwNl58RiIoQUhddnl7c8TY+fVoUoI+4TijbBcY8j6p8PhprQINOtGhkz7XgOgdOix1eLLtUtMA2FtZOxrDgC7Rb4tOTbC9xnr0ARMALH8dArhPVPD5f4ZioMBZ+p3Lw4YC6autbTeHtwp0sPYt1J4qOwZwegGwR1Ud5jRTxspq4Q98aNU6Iu7JxEnpGBBMFoX+XBTPf8JLPlf5zrmRAAAAAElFTkSuQmCC',
    tarjeta:
      //'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGKADAAQAAAABAAAAGAAAAADiNXWtAAABA0lEQVRIDe1VS04CQRR89Wb0CCzYYKKGCYG5AQkrLuHOQ7gzkHgME+JBdMUNZkEIaCILXXAETL9yeojbniYZVs5bdlW9T3XntUgbNQ7A4+953tEfZo6J1vCj4ATO7ALrm6LYY9sf3RFcCOUySh1LghxA3GOTjb7KMXaqeDRTF6sP8VQtMeMTRXqpkF2BPl+vireQ6FRsm+Vjoc3So5CT8mB+apIwnxOPY9MflpOcL6oJANmVtT6bLcMr0t9BFfpyuy7mTRY4Wm6zRt59qLG2QMidCmstqrUoFeBbhNOPQb5seNlNfe4UlAe/rp3jq4jVdhRDcH4n/61rLzjnhxPT0D/n/AIGnV/YLwCgkgAAAABJRU5ErkJggg==',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAXCAYAAABqBU3hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAD1SURBVHgB7ZaxDcIwEEXvrPRkBNxAQxE2CBVjwAbABLABygQoE8AGZAMaGqiyAWloKGL+IRsJejsp/KTIl7j433aS+0xgCJj5gDLDlZJnoHVq23ZTA7bilxDCfzTGmGmCYi/iuCkxrmGqIY/IgjHssOiF7DprrY1MwICWLaEAwEMK8QfKRrmHocStltvlVFHHJK64jydnCsj89fw1AHLqgM6PoD/vwOh2ZQqI+/zjEUQD0UA0IAY+rRE9OqdAQCuzZZ0giBQIB1tJJ5gonCGPSBhZSSEpjG06OVLgbgjxCsFk9v3/w8gSQ6aUGpBnkIhLiFdSvwE/XU+yr0Ya7gAAAABJRU5ErkJggg==',
    'tarjeta-apagado':
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAP1BMVEUAAADR3NzT3t7U2ODS2uHT2+LS2uDS2ODT2OHS2OHR2eHS2eHS2OHS2eLS2eHS2eHS2eHS2eHS2eHS2eH///8/goRhAAAAE3RSTlMAFhdBREZaW1x3gLvGx93j5OX5oM8hEwAAAAFiS0dEFJLfyTUAAABRSURBVCjP1dJLEoAgDAPQCOKHIiK5/109AKkrNr5tp+1MWmCiENdBDMDRKfQdT0ljRyoNzGp+JminYAQdYDWh8mPHvwpNhnjdXuybc6hl5iu87FEK9lXLt/QAAAAASUVORK5CYII=',
    'cargo-a-recibo':
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEeSURBVHgB7ZfRDYIwEIav6IOPhAmEJx91A0dwFDcQJnAE4wa6gU6gEwAb4Ab4l0hCSE9aCiHGfklDQ+96f6/3cCX6dwS3sARCiBOmawyfTDYVIk7TNNGxnREf/IHpCmNB5myDIKCiKO5dhnPm/xHDL8vyjO8+z/MXaRCGYVnP4RtHUURdmfBUP3H63Wca6wZvguBJQ8SBTAXUIHhOPYBbrCtiTiPQvIpaBD6JlYD2ppIsywRZMmgGVIJUwnsJGOK0KjyamMkFWBUhh8l1/U4GXBGOhStCV4SuCF0RchmoGlF050bvgTayve+y4QQ8q0XPO+pswgT34V81o+gJr5ydYJzrh4lVBj68IGDDddjKDEhj6QQRF7ILfPsW3CF5A6xxfjDwHCTaAAAAAElFTkSuQmCC',
      // 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGKADAAQAAAABAAAAGAAAAADiNXWtAAACFklEQVRIDb1VT0sbURCfyaZqPagfQGg1iY0YQzzlWMXPEDxYaI7FUwXvtV9AEErP7cFD8ROIl3gVIWkS2WhitNBLb2mhUjVvpzNJ1uxm9z1soA5s3sxvZn6/92fzFuA/G4bxN1OptFK4CoSTYfk+Rr/ii8ld3N9XfczvBQTOX6TeIOAHArL8peERE3yJp+fXdSI+gXo2OwGt3z8A8CD61MrPlEqtcFqAenKxAETTBBAziUR8BD+vF7hhDDDy0UR+34P4PYKwxT1rjbK9R7lcYNXR++KOY40CtNnDWz+uiQgyhLyhQBcdkUrtmCt3vNUDAt6UbEPqHRFsuygiLidqlSOJEalETN0xXglvV4zRiS7Q/zUKcEOBibbdcgujV64ft6tvXV9Gfjl4EUEzCvRm25lxsPVhiFGgOb/0TFH7uY7KsqKt2dPiV11ecKOAoru89wwGiZS6KzC2Moh7Y6OAhU8+KWgLSajJCkITHtAoMGsXv3GtPEObUYD/rS8BaFnHjhC5itfKn3V5wY0CQm46A0CnwBzDCyRq1fdMIM/Q5r+LhqbRNxq3qJFMvyZw8tp2wlLirLKpzXPisVegbrqzoREZe2+I8RCljhZyI/W2zZ7T6xe0a/4VTI6fIsAfIGfjMpOZcotMo5A31NmW1BDCyWAt8/ntXz+Zbjdf5Xt8Ob5yY3cMCEji4R99qXZuZOZzdvVQoke3v5pXrykoCKmxAAAAAElFTkSuQmCC',
    'cargo-a-recibo-apagado':
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEnSURBVHgB7Ze9rcIwFIWPbV71GhZAkAIhCn6yCaOwAckEjIDYADZggyAoEKIAxAKUNLGxg5AiZIOTECGEvyJOnGufk+tb3AC/DjG9iDb7BmNsAiH68rGKLJtSGnSatdAqFiZxSqOswnlMVHSTjJJxIs75NL5g6PveGRastkdxvxecB+vdCa9MUP00GahrDAS24mmkeJgyMUJ2Azf8tndADnptL7A1UUEJpI/ibkIOYSEDj5squq06QUHemgGdIZ3xXAbe8bU6KD7Mxw0UKkITWY7rezLgirAsXBG6InRF6IrQlIGkEY2ife62PFkv2/tXMVoDhJClGtk/G9tsohWX5v8YS5pRIfjcFFfaj0mKc8y5b+qwtRlQwWqR9D5DAWEQsXgm7lBcARpTfFIrPuMEAAAAAElFTkSuQmCC',
      // 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAdVBMVEUAAAC/v//V1dXb29vb29vM3d3P39/P19/S1+PT2OPV2t/S2+DT19/T2uHT2+LS2uLT2OLS2eDT2uHS2eLT2eDS2OHT2eHR2uLS2ODR2eHS2uHT2uHS2uHR2eHS2eDS2eHS2ODS2eHS2eHS2eHS2eHS2eH///9hI1O5AAAAJXRSTlMABAYHDg8QIC0uMDlARUZgaGxucnN3eXt9gIiQpKivsMDc8Pf86hVdlwAAAAFiS0dEJloImLUAAACRSURBVCjPjZLZEoIwDEWjqLgEUcElohLU+/+/6ENLDY5lep7SnEkzaUo0yupw9OwnNr97I3A3ZvZ6zH2onTUbbPtQtTaGwUE8tUNlhQBgokZVIVawiOTuOBSGocjZsf4V4sfQ5IpoDxZHmdwjelVUlOpokoR5diLKcPouql2E/PSM4u9qgZspX1bXnksx/m/oA9xmF0oDVj0uAAAAAElFTkSuQmCC',
  },
  emailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  mensajeGiftcardMaxLength: 140,

  popupCustomExceptions: {
      go_back_to_categories: 'go_back'
  },
  mensajes: {
    metodo_pago_cargo_recibo_mensaje: 'Tu compra se cobrará en tu próximo recibo'
  },
  iconStar : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGKSURBVHgBtVPdTcJQFD73ByFVk25gSbSUpiTtBu0EsoE4AW6AbiAbsAITgBPQB+T3gbpBH9RASu/x3pISIAZ40PN0c76f89NTgP+M+a3jjy3HP8YhY8syGPJ7czps7wKbfKEHgPrXipe9KIz3zE2ntULRpaVlSQH1WcXpDQxXzwlc8AcpNuRT1y7WT3l+YBi64iIBP0m+I1qWzrJ6ICh2S6WlnldHQhrbNgk0c/NLTZMYvCmNF0UxyV01du0jFwYFuJESV6b9g3FD2VFfAHywlISfax6qsXjmWrx6lmCTAIEj4SpjWQCQSQ1NOvL5SDOIiY6UxnB+xMAxW/q25My2XZLSHsqlnRQzEZijUbhncLYJE14uVpGNoLY+q9QWqaD6iQ5ixVFcpckM1INjYSBAtFkqTu1BL67SRcaVRza8s93skJClgTV9f0XCjANBHwGj3cSyAJ7ipiQJ1CHx8uZEs5mQCEN9SiUSAl+q81FnM6LdoEhaEtsWqE4m0a89Hvt5pmatro4O/jJ+APvoso3Y9h4vAAAAAElFTkSuQmCC',
  obtenerMegodosPago_GenericErrorCode: '-1',

  formatos: {
    fechaConstanciaFormato: 'dd \'de\' MMMM yyyy'
  },

  FAVORITOS_METODOPAGO_OLD_NEW_ID_SESSION_STORAGE_LABEL: 'FAVORITOS_METODOPAGO_OLD_NEW_ID',

  PORTAL_FLOW: {
    RECARGAS_CANALES: ['8', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33']
  },
  Arrows: {
    'next':
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAhCAYAAAC4JqlRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANaSURBVHgBvZg9bxpBEIZnZ88HsaKEOIp8JSUlJSUlJT/BSHHhWHFE45o6UnRKLGIpHyJlSpcur6R0SXnlRS6CEynB+G4ns+vDBgzHHR95C9uc93ae2Z3dmUFARrlup2BZQ2cosYAR5PUzJWFgR6ofhnbQbDb6WeYTaQa1Wp380+dhBQSW+Y3Cghn7RNQTQ9lNA5MIoL2FXFQFEuX4ka8E9vIE/uUl9FutxuAOcBccReAgqRI/Kt7OThdwLb0kkLkA7z52KoJU1QxC7F79gO7I4CKNg7OBAUbKOzra76YGcE86VUBj3IchnmXd1wkQW9VBr4hSXvP1vrcQ4H37S02BqDCA1zx4+MJSIKfskFJVBOq+OXx5Pv4/nBjInq/buFbzoOEBoqfndk8+V2cCuO5pUS87MeU6jY9DoKQug1TdU7Y1DQA5u66P0K9L6cGG9DPHc7MNILs+AeC2P5WB+HwTemkjfRm1Gjy3wDNty9gcAYCQVU3WPGxcwIbFW+GDPl0gDYD1tt1xgBTfbky2goxH2pFr/Lbo2OrLjC+smo4F3FJhyTwdaqoVNNzyze+c2jPnP0G/H8HtSodWETkqiyQgWPayGcm8z96ngdCxoG2SEA6a4FO0kvFlIEREgUDhWDq7CUUzg88kmacDBzKJDxHpoyzrMcScmGCnSRSspKme7EZ1UHYJlhWvLm1FNf7r+7whiQBiIM+55OhCVik2DKomBAy4LjhPGmoxZR+kmLlX8dJlio/bVKzqOg0nHUmyhCPYNpKkgEBk3OdE43vmw6L7gPdfO48ilAGTODrg4D8Z12O1TU7RPvIm+Prhzk5YhlVkx2VYipsQ7Bsz9uav1bP03ey2v/qRRB3t2QMuVpxH0uUSfWVzbB0fN4I4HaN+sTiepzel8cxrLOsfhj7O06vGQpLM3FOZ974gifP0sxdczW5IZm7tvbjPvHcAJk/PqdvWocl609QEkwAxxH3dtkaIUZk/q96c3RfEZTSssy+YU2nP7Yw+cGcUcmfEA/JpWqxxjXpJQqzoz5ZA7+hVI31nNOHBg95Q9fA6DK6u8sF4b7i9/acgH9tFJFxPbzgNQnZUEUKUTBQnySQ3vEjbS6YCmIaJtsEREfD3A2H8/YA1IAl9aXNp18gWL/8ANnvKuoGlIJsAAAAASUVORK5CYII=',
    'next-active':
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAhCAYAAAC4JqlRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMlSURBVHgBvVhdUhNBEP6md6GsEsPewE15AOIJDEX54JN4AuIJwBOQnAA4QeAEwhNVQkw8geFZqV1usFo+mWTG7tksJprNziaBryo1k0lP9zd//ROFknhyGYVra6OaUiqERmAHCYkxJvYGXj95U41LqINyEQo+RoEOsK8MGjAIC8RjA5zTb5y4kJlLIODV6nUcslDDDhj0jMIFjdDDGuJku5pYuW4UYIiaJvDO4C3L1VNxnDKR1jwiuQQq3bt9pXXTCmmcwMdxZrAITCjUI9PkY9rjr4mBbv3ceXEMV7Dxw81OZDavo64ow4KQuZufo67oqnSjQ6dJLHgkE4Kr2yZWhOAqaloSnegI842nK1+l8f9I5O3ExtW3ujV+fet+ViVRYd3pAqN6NkZZxyO/zU3MnSYeCJTqjg2hPUUg6HxvcBNq8JNxvOmLQHTzi3ovtp6lNlPwtkTywSPBvgz+SJ+CT1EN49VjCcguyiLEeRXJmhEuxFnJXSCt9K4MesTebRmQ17PK19EtIkE+TqXV0HVSHr1iNn0+nxhLQOYrwrYLCXvP2CaUqpEEFwNzhxWgDAm2ecOuesvnfghjzmYJSRQcbgxrKIHhcAhFqkXw2mMS2zODEYdv3oE9f54yU0Hbg7+LxRHqNSOOLVfHXAK8nR84zJ6gLEiOFeL3E/LUwTxRIRCD6PmsH8cXM0YJyLnz1ounS+Q+5F1uRbQluoVAnzOdUudcYLybGsg3bpFmVjEZjRtOS2o2q3kk4/Z1sE1j9BfiYNCTQT3UDSyD9TQNK1y5lR1ZWTJ0br9P+ubHwGTssdGQ78BZ5pvxwJiMvNb2JCs7QHj5UCFZHBv7lq/S/7FTrUp7n5BkcVpruCWPC4BrC9Edjm3NYFiUty0B53wzy9tWSeLeuGu+me2EvAyXBCNXz+XfuiBv5bmVUdCJDtifyy4ELiXW1NysltSwcYDbVvK6elyKgFU0XWKJdI+914XWuu//8vvJu3FtyAYHTweh53l1pWi6NiSb6MZ5NtyqY0tEH1jlKK6OecVnrrWkE4F/yWDElbBiIlqP/x+ghAxHzQFK/z/wB6N5tODOnQSxAAAAAElFTkSuQmCC',
    'previous':
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAhCAYAAAC4JqlRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANSSURBVHgBvZgxb9pAFIDfvXMcGlUqTVXVI2NGRkbGjPyEIDWV0qhp+QfMlSqrjUikthEZO2bM6JGRkZGRKEOdVGoJse/13WESTMAYYvIkBD7fvffd3bt77yFgQXHdZt6yBs5AYh5DyOk2JaFvh8oPArtXq1X9RfSJNJ3q9WbuxaugBAKLPCI/R6NPRB0xkK00MIkAerawHpaBRDFq6iqBnRxB9/IS/Hq92r8DfAOOInCQ1BY3FYbaqQ030ksCmQnw5ahZEqTKphNi6+oCWiOD82QcnA30MVTewcFuKzWAe9gsAxrjXRjg2aL7GgOxVQX0iijl1T7senMBvjZ+bisQJQbwansPBywFcswTUqqMQK2P+2/Px99hrCPPPGvjWmp7VQ8QPa3bPfxRngrguscFvezElFkaH4dASS0GKbvHbGsSANbtij5C15fSgxXJ73XWzTaA7EoMwG18LwLx+Sb00nr6MlKvsm6BZ9qWsTkCACHLmqy2X23DioW3ogv6dIE0ANbnRtMBUny7MdkcGZ5vtQMUerX9d0vD6suML6xt7Qu4poIt0zrQVCmMm75rXXiE/HkGQ/jAKiB7ZYEEJAaRmPEbPF32YhqJ9gVtk4Rw0DifoiczPhIRUk+gcCwd3YSidpJxQcDxJ+QbbJDn+yK/mKmcPx2aJ00ibyUNpVy4LZTIk3mSFbAlLCpEYYe/fs16nwgg+vKcV8Ax26RPCcLCy399Ab2k9xYr90GKqcuql4634XToAxwd+9n5AFnC4a31kST1CIQzq6MxyM5nHhjE+EUmBDxpDSAC2WMSR2c18EQQery2ySG6i7wJXd24uRkUkwbFIOwo5VpW7NuC/rr9Z3WGRI2THf2BJxL36OST/ujfUThGfQ8UxuP0yoyPRd47ABMFozid5AuPFaN7IvLeJyRRnH75mrPZFYnRrWcv7iPvHYCJ0zPytiwknm+anCAOEEHc520ZQozS/Gn55vS6IEqjIcu6YEamPbMy+saVUcCVEXfIpSmxxmVUSxJiST9bAr2D99X0lVFsBg9qQ9XBm6B3dZXrjdeGGxt/8/K5XUDCbGrDSRCyw5IQYmsYGRPEBDdsp60lUwFMwoQb4IgQ+P+BIPp/wOqTBF/anNpVF/OX/7tgy8HDw6dwAAAAAElFTkSuQmCC',
    'previous-active':
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAhCAYAAAC4JqlRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMtSURBVHgBvVhRUtswEH2SnUxn2gbfoM70AKQnaBimH3yVnoBwAuAECScATgCcoOSrM4U06QkavlvG5gZpp19NvOquHNOkEEcOIW8mI0Ve6T3JknbXCgXx7FMUlkpJTSkVghDYRo2BMSb2hl5/sFWNCwwH5WIUfIwCCrCnDBowCOeYxwa40H9w4iImV0DAs6UymmzUsA0GPaPQ1gl6KCEebFQH1q4bBRihRhq8MnjPdvXUHGcs5DBPyEwBle7tniJqWSPCCXwcZ4TzwIJCSkyLX9MO/x0Y0OGvzdfHcAWTN9c6kVm7iroyGBaE9F37EnVlrEo3ajp1YsMj6RBc3rSwJASXUcuK6ERHyCdPZ75M8nsiZq3Ei8vvdUt+deP+rgqiwmOnE4zqWZvOKp72T7mIudLCE0GnY8dG43RKQND50eAiJPCRcdzpi0DG5hO1K1wvU84UvCyR/LAi2JPBP6nr4HNUw3j28zrKxSRCp9QvAJOgLZeV7AVNiral0dN8u80hN2V0U1uvh0dA+ziTkkB1rTz9ltX0+f3EcCBXGht5ti6w+4w5oVRNi3MxMLerIs/AnNd8Va/7XA9hzPkc8oCQHJiRCfm+CFEA/siPH3RG7L55BXb8vM5MfmQFQs6rd/rv1nAHlUybi+1Zz3MF8JIfGII9Jew2d3nXxCgI5at+3nMREEPrVw89lPfNHm2DRXTZtzfViPfA1nL2gNJ6XbhlUfsc6dRmGYoI2XxSl/0g+wLLgERWhgXw7K45LKnZqGZFImx/5jSGvmpegp400ogaeZ0mRSTlNORaGOWkLoU2+sL+n7ybV4FJ32MPFu+B8+xuxhNj0vNa7klVtkHjzVO5ZAnvTQXfpP5zs1qV8u5qyfw0EdyCxwXAuYWMHY65HlA4L257BJzjzSxuW6aIO3LXeDNbCTkZjznzNoAZ5wWzZj4zMwo60b5cv1J1SbGm+ma5JGHfkhD3fVc9LiTADjSdYol1j2+vNhH1/d9+f/BhnBsy4fD5MPQ8r66Uns4NtQ1041kcbtmxFUL7dnDMz455xueuuaSTgP/FIOFMWLEQovH3AT3Q7FgwROHvA38BBO+6/9237CAAAAAASUVORK5CYII='
  }
};
