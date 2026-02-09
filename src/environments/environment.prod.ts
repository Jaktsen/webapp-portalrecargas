declare var urlComprasyPAgos: any;
declare var urlComprasyPAgosMiClaroApp: any;

export const environment = {
  production: true,
  tipoLinea: '',
  urlComprasyPAgosMiClaroApp,

  // prod
  roamingConfig:'/wps/wcm/connect/portal de compras/htmlresources/js/',
  motorPagosUrl: 'https://motordepagos.claro.com.pe/MotorPagosWeb/recursos/public/js/jmpago.js',
  // dev
  // motorPagosUrl: '',
  urlComprasyPAgosWef: urlComprasyPAgos,
  wcmSessionTimeout: '[Element key="Tiempo" type="Content" context="selected" name="portal de compras/portal site/home/timeout sesion"]',
  urlPortal: `[Plugin:Matches text="[PathCmpnt type="Noprefixbase"]" pattern=".*192.168.5.169.*|.*192.168.5.170.*|.*limwcmmiclarov01.*|.*limwcmmiclarov02.*|.*internetclaro.com.pe.*|.*compras.miclaro.com.pe.*"]http://compras.miclaro.com.pe[/Plugin:Matches][Plugin:Matches text="[PathCmpnt type="Noprefixbase"]" pattern=".*192.168.5.165.*"]http://192.168.5.165:10039/wps/portal/rootcompras[/Plugin:Matches][Plugin:Matches text="[PathCmpnt type="Noprefixbase"]" pattern=".*200.108.110.169.*"]http://200.108.110.169/wps/portal/rootcompras[/Plugin:Matches][Plugin:Matches text="[PathCmpnt type="Noprefixbase"]" pattern=".*200.108.99.46.*"]http://200.108.99.46/wps/portal/rootcompras[/Plugin:Matches][Plugin:Matches text="[PathCmpnt type="Noprefixbase"]" pattern=".*limnewporcov01.*|.*172.19.155.89.*"]http://172.19.155.89:10039/wps/portal/rootcompras[/Plugin:Matches][Plugin:Matches text="[PathCmpnt type="Noprefixbase"]" pattern=".*LIMWCMMICLAROV03.*|.*192.168.5.171.*"]http://192.168.5.171:10039/wps/portal/rootcompras[/Plugin:Matches][Plugin:Matches text="[PathCmpnt type="Noprefixbase"]" pattern=".*localhost.*|.*127.0.0.1.*"]http://127.0.0.1:10039/wps/portal/rootcompras[/Plugin:Matches]`,
  wcmResources: {
    mensajeDegradacionesURL: '/wps/wcm/connect/portal de compras/htmlresources/js/MensajeDeErrorDegradaciones.json?subtype=js'
  }

};