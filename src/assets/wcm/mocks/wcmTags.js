function hereDocPortalCompras(f) {
  return f.toString().replace(/^[^\/]+\/\*!?/, '').
    replace(/\*\/[^\/]+$/, '');
}

var wcm = {
  terms: {
    giftcard: {
      giftcard_5gb: '',
      giftcard_10gb: '',
      giftcard_30gb: '',
      giftcard_30gb_pack_video: '',
      giftcard_facebook: '',
      giftcard_instagram: '',
      giftcard_whatsapp: '',
    },
    canje_eventos: {
      evento_1: '',
      evento_2: '',
      evento_3: '',
      evento_4: '',
      evento_5: ''
    },
    cargo_recibo: ''
  },
  listas: {
    listaVideos: [],
    listaGiftCards: [],
    listaWCMOpciones: [],
    listaWCMEvents: [],
    configWCMMusica: [],
    listaFondoRecomendados: [],
    listaWCMRecomendaciones: [],
    listaPopupRecarga: [],
    listaPaquetesEtiquetados: [],
    listaPaquetesGamer: [],
    listaCarrousel: []
  }
}

wcm.terms.giftcard.giftcard_5gb = hereDocPortalCompras(function () {/*!
    <p>Podrá activarse hasta el 31.12.19 en Prepago o Postpago (no ilimitados) de CLARO
<br>
Condiciones y restricciones en: <a target="_blank" href="http://cl4.ro/giftcardmovil" title="">http://cl4.ro/giftcardmovil</a>
</p>
*/});
wcm.terms.giftcard.giftcard_10gb = hereDocPortalCompras(function () {/*!
<p>Podrá activarse  hasta el 31.12.19 en Prepago o Postpago (no ilimitados) de CLARO.
<br>
Condiciones y restricciones en: <a target="_blank" href="http://cl4.ro/giftcardmovil" title="">http://cl4.ro/giftcardmovil</a>
</p>
*/});
wcm.terms.giftcard.giftcard_30gb = hereDocPortalCompras(function () {/*!
<p>Podrá activarse hasta el 31.12.19 en Prepago o Postpago (no ilimitados) de CLARO.
<br>
Condiciones y restricciones en: <a target="_blank" href="http://cl4.ro/giftcardmovil" title="">http://cl4.ro/giftcardmovil</a>
</p>
*/});
wcm.terms.giftcard.giftcard_30gb_pack_video = hereDocPortalCompras(function () {/*!
<p style='color:red'>Podrá activarse hasta el 31.12.19 en Prepago de CLARO.
No vale en Iquitos. 
<br>
Condiciones y restricciones en: <a target="_blank" href="http://cl4.ro/giftcardmovil" title="">http://cl4.ro/giftcardmovil</a>
</p>

*/});
wcm.terms.giftcard.giftcard_facebook = hereDocPortalCompras(function () {/*!
<p>Podrá activarse hasta el 31.12.19 en una línea de CLARO: prepago, Max Internacional 29.90 y 39.90 u otros Postpago. 
<br>
Condiciones y restricciones en: <a target="_blank" href="http://cl4.ro/giftcardmovil" title="">http://cl4.ro/giftcardmovil</a>
</p>
*/});
wcm.terms.giftcard.giftcard_instagram = hereDocPortalCompras(function () {/*!
<p>Podrá activarse hasta el 31.12.19 en una línea de CLARO: prepago, Max Internacional 29.90 u otros Postpago. 
<br>
Condiciones y restricciones en: <a target="_blank" href="http://cl4.ro/giftcardmovil" title="">http://cl4.ro/giftcardmovil</a>
</p>
*/});
wcm.terms.giftcard.giftcard_whatsapp = hereDocPortalCompras(function () {/*!
<p>Podrá activarse hasta el 31.12.19 en una línea prepago de CLARO.
<br>
Condiciones y restricciones en: <a target="_blank" href="http://cl4.ro/giftcardmovil" title="">http://cl4.ro/giftcardmovil</a>
</p>

*/});

wcm.terms.canje_eventos.evento_1 = hereDocPortalCompras(function () {/*!
<p>
Inscripciones validas del 23.10.20 hasta el 27.10.20
<br/>
Sorteo: 28.10.20
<br/>
Stock:  10 codigos para Noche de Divas concierto online
<br/>
Publicación de ganadores: 28/10/2020
<br/>
Entrega de premios: 29/10/2020
<br/>
Más información en :
<a target="_blank" href="https://bit.ly/3dTOn9f" title="">https://bit.ly/3dTOn9f</a>
</p>
*/});
wcm.terms.canje_eventos.evento_2 = hereDocPortalCompras(function () {/*!
<p>
Inscripciones validas del 23.10.20 hasta el 27.10.20
<br/>
Sorteo: 28.10.20
<br/>
Stock:  10 codigos para Noche de Divas concierto online
<br/>
Publicación de ganadores: 28/10/2020
<br/>
Entrega de premios: 29/10/2020
<br/>
Más información en :
<a target="_blank" href="https://bit.ly/3dTOn9f" title="">https://bit.ly/3dTOn9f</a>
</p>
*/});
wcm.terms.canje_eventos.evento_3 = hereDocPortalCompras(function () {/*!
<p>
Inscripciones validas del 23.10.20 hasta el 27.10.20
<br/>
Sorteo: 28.10.20
<br/>
Stock:  10 codigos para Noche de Divas concierto online
<br/>
Publicación de ganadores: 28/10/2020
<br/>
Entrega de premios: 29/10/2020
<br/>
Más información en :
<a target="_blank" href="https://bit.ly/3dTOn9f" title="">https://bit.ly/3dTOn9f</a>
</p>
*/});
wcm.terms.canje_eventos.evento_4 = hereDocPortalCompras(function () {/*!
<p>
Inscripciones validas del 23.10.20 hasta el 27.10.20
<br/>
Sorteo: 28.10.20
<br/>
Stock:  10 codigos para Noche de Divas concierto online
<br/>
Publicación de ganadores: 28/10/2020
<br/>
Entrega de premios: 29/10/2020
<br/>
Más información en :
<a target="_blank" href="https://bit.ly/3dTOn9f" title="">https://bit.ly/3dTOn9f</a>
</p>
*/});
wcm.terms.canje_eventos.evento_5 = hereDocPortalCompras(function () {/*!
<p style='color:red;outline:yellow 1px solid;'>
Inscripciones validas del 23.10.20 hasta el 27.10.20
<br/>
Sorteo: 28.10.20
<br/>
Stock:  10 codigos para Noche de Divas concierto online
<br/>
Publicación de ganadores: 28/10/2020
<br/>
Entrega de premios: 29/10/2020
<br/>
Más información en :
<a target="_blank" href="https://bit.ly/3dTOn9f" title="">https://bit.ly/3dTOn9f</a>
</p>
*/});
wcm.terms.cargo_recibo = hereDocPortalCompras(function () {/*!
Compra de Paquetes de manera facturada <br>Con la aceptación de este estipulado se deja presente que el monto del paquete comprado será facturado en su siguiente recibo como adicional a su cargo fijo. Ud. está en la total libertad de no comprar el paquete seleccionado, el proceso de compra no procederá sin su aceptación y por ende, si usted no acepta, no tendrá cargos adicionales en su próximo recibo.
*/});
