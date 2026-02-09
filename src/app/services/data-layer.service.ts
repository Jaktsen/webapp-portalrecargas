import { isNgTemplate } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { GlobalObjectService } from './global-object.service';

@Injectable({
  providedIn: 'root'
})
export class DataLayerService {

  private window;
 
  constructor(private _globalObject: GlobalObjectService) {
    this.window = this._globalObject.nativeWindow;

  }

  removerTildes (str)  {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  } 

  monto (str)  {
    return str.slice(2,str.length)
  } 

  monto2 (str)  {
    return str.slice(4,str.length)
  } 
  

  private _pushEvent(obj) {
    if (obj)  this.window.dataLayer.push(obj);
     console.log("gtm", this.window.dataLayer);
    // alert(JSON.stringify(this.window.dataLayer));
    // console.log("gtm after push", this.window.dataLayer);
  }

  //dataLayer methods

  gtm_PageView(url) {
    const metric = {
      event: 'content-view',
      pageName: url
    };
    this._pushEvent(metric);
  }

  gtm_Event(evento: string, elemento: string,recarga:string, vigencia: string) {
    const metric = {
      'event': 'atm.event',
      'event_name': evento,
      'elemento': elemento,
      'recarga':recarga,
      'vigencia': vigencia
    };
    console.log(metric);

    this._pushEvent(metric);

  }
  gtm_Event_check(evento: string, elemento: string,estado:string) {
    const metric = {
      'event': 'atm.event',
      'event_name': evento,
      'elemento': elemento,
      'estado':estado,
    };
    console.log(metric);

    this._pushEvent(metric);

  }

  gtm_Event_check_express(evento: string, elemento: string,estado:string, origen:string) {
    const metric = {
      'event': 'atm.event',
      'event_name': evento,
      'elemento': elemento,
      'estado':estado,
      'origen_compra': origen,
    };
    console.log(metric);

    this._pushEvent(metric);

  }

  gtm_Event_term(evento: string, elemento: string) {
    const metric = {
      'event': 'atm.event',
      'event_name': evento,
      'elemento': elemento
    };
    console.log(metric);

    this._pushEvent(metric);

  }

  gtm_Event_recargar(evento: string, elemento: string,operacion: string,fecha: string, producto: string, pago: string, monto: string ) {
    const metric = {
      'event': 'atm.event',
      'event_name': evento,
      'elemento': elemento,
      'operacion': operacion + " soles",
      'fecha': fecha,
      'producto':producto,
      "metodo_pago":pago,
      'monto':this.monto(monto)
    };
    console.log(metric);

    this._pushEvent(metric);

  }

  gtm_Event_pago(evento: string, estado: string, error:string) {
    const metric = {
      'event': 'atm.event',
      'event_name': evento,
      'estado': estado,
      "nombre_error": error

    };
    console.log(metric);

    this._pushEvent(metric);

  }
  gtm_Event_compra(evento: string, elemento: string) {
    const metric = {
      'event': 'atm.event',
      'event_name': evento,
      'elemento': elemento

    };
    console.log(metric);
    
    this._pushEvent(metric);
       
  }
  gtm_Event_compra_2(evento: string, elemento: string) {
    const metric = {
      'event': 'atm.event',
      'event_name': evento,
      'origen_compra': elemento

    };
    console.log(metric);
    
    this._pushEvent(metric);
       
  }

  gtm_Event_pagoSucces(evento: string, estado: string) {
    const metric = {
      'event': 'atm.event',
      'event_name': evento,
      'estado': estado

    };
    console.log(metric);

    this._pushEvent(metric);

  }

  gtm_Event_recargaEtiosa(evento: string, elemento: string) {
    const metric = {
      'event': 'atm.event',
      'event_name': evento,
      'elemento': elemento

    };
    console.log(metric);

    this._pushEvent(metric);

  }

  gtm_EventLoginSuccess(evento: string, estado: string) {
    const metric = {
      'event': 'atm.event',
      'event_name': evento,
      'estado': estado
    };
    this._pushEvent(metric);
  }

  gtm_EventLoginError(evento: string, estado: string, nombre_error: string) {
    const metric = {
      'event': 'atm.event',
      'event_name': evento,
      'estado': estado,
      'nombre_error': nombre_error
    };
    this._pushEvent(metric);
  }

  gtm_view_item_list(items: any[]) {
    let itemsFiltered = [];
    itemsFiltered = items.map(r => (
      {
        item_name: r.nombreProducto,
        currency: 'PEN',
        price: this.monto(r.codigoPaquete)
      }
    ));
    const metric = {
      'event': 'atm.ga4.ecommerce',
      'event_name': 'view_item_list',
      'ecommerce':{
        'items': itemsFiltered
      }
    }
    this._pushEvent(metric);

  }

  gtm_checkout_shipping(event_name:string, metodoPago: any, productoElegido: any) {
    console.log(productoElegido)
    let itemsFiltered = [
      {
        item_name: this.removerTildes(productoElegido.nombreProducto.toLowerCase()) ,
        currency: 'PEN',
        price: productoElegido.precio + ".00"
      }];

    const metric = {
      'event': 'atm.ga4.ecommerce',
      'event_name': event_name,
      'ecommerce':{
        'currency': 'PEN',
        'value': productoElegido.precio + ".00",
        'items': itemsFiltered
      }
    }
    this._pushEvent(metric);

  }

  gtm_checkout_shipping_rec(event_name:string, metodoPago: any, productoElegido: any) {
    console.log(productoElegido)
    let itemsFiltered = [
      {
        item_name: this.removerTildes(productoElegido.nombreProducto.toLowerCase()) ,
        currency: 'PEN',
        price: productoElegido.precioMoneda + ".00"
      }];

    const metric = {
      'event': 'atm.ga4.ecommerce',
      'event_name': event_name,
      'ecommerce':{
        'currency': 'PEN',
        'value': productoElegido.precioMoneda + ".00",
        'items': itemsFiltered
      }
    }
    this._pushEvent(metric);

  }

  gtm_add_payment_info(metodoPago: any, productoElegido: any) {
    let itemsFiltered = [
      {
        item_name: this.removerTildes(productoElegido.nombreProducto.toLowerCase()),
        currency: 'PEN',
        price: productoElegido.precioMoneda + ".00",
      }];

    const metric = {
      'event': 'atm.ga4.ecommerce',
      'event_name': 'add_payment_info',
      'ecommerce':{
        'currency': 'PEN',
        'value': productoElegido.precioMoneda + ".00",
        'payment_type':  this.removerTildes(metodoPago.nombre.toLowerCase()) ,
        'items': itemsFiltered
      }
    }
    this._pushEvent(metric);
  }

  gtm_purchase(servicio: any) {
    console.log('servicioservicioservicio');
    
    console.log(servicio);
    
    let itemsFiltered = [
      {
        item_name:  this.removerTildes(servicio.nombreProd.toLowerCase()) ,
        currency: 'PEN',
        price: servicio.precioMoneda + ".00"
      }];
      let metric
      if(servicio.igv){
          metric = {
          'event': 'atm.ga4.ecommerce',
          'event_name': 'purchase',
          'origin':'compras',
          'ecommerce':{
            'currency': 'PEN',
            'value': servicio.precioMoneda + ".00",
            'transaction_id': servicio.numeroOperacion,
            'tax': servicio.igv,
            'shipping': servicio.idTransaccionCompra,
            'items': itemsFiltered
          }
        }
      } else{
         metric = {
          'event': 'atm.ga4.ecommerce',
          'event_name': 'purchase',
          'origin':'compras',
          'ecommerce':{
            'currency': 'PEN',
            'value': servicio.precioMoneda + ".00",
            'transaction_id': servicio.numeroOperacion,
            'tax':  '',
            'shipping': '',
            'items': itemsFiltered
          }
        }
      }
      console.log(metric);
    this._pushEvent(metric);
       
  }

  gtm_purchase_recarga(servicio: any) {
    console.log('servicioservicioservicio');
    
    console.log(servicio);
    
    let itemsFiltered = [
      {
        item_name:  this.removerTildes(servicio.nombreProd.toLowerCase()) ,
        currency: 'PEN',
        price: servicio.precioMoneda + ".00"
      }];
      let metric
      if(servicio.igv){
          metric = {
          'event': 'atm.ga4.ecommerce',
          'event_name': 'purchase',
          'origin':'recargas',
          'ecommerce':{
            'currency': 'PEN',
            'value': servicio.precioMoneda + ".00",
            'transaction_id': servicio.numeroOperacion,
            'tax': servicio.igv,
            'shipping': servicio.idTransaccionCompra,
            'items': itemsFiltered
          }
        }
      } else{
         metric = {
          'event': 'atm.ga4.ecommerce',
          'event_name': 'purchase',
          'ecommerce':{
            'currency': 'PEN',
            'value': servicio.precioMoneda + ".00",
            'transaction_id': servicio.numeroOperacion,
            'tax':  '',
            'shipping': '',
            'items': itemsFiltered
          }
        }
      }
      console.log(metric);
    this._pushEvent(metric);
       
  }


  gtm_event_cargoRecibo(eventName: string, element: string) {
    const metric = {
      event: 'atm.event',
      event_name: eventName,
      elemento: element
    };
    console.log(metric);
    this._pushEvent(metric);
  }

  gtm_event_RecargarC(event: string, element: string, tipoPaquete: string,
                        fecha: string, producto: string, metodoPago: string, monto: string) {
    const metric = {
      event: 'atm.event',
      event_name: event,
      elemento: element,
      tipo_paquete: tipoPaquete,
      fecha,
      producto,
      metodo_pago: metodoPago,
      monto
    };
    console.log(metric);
    this._pushEvent(metric);
  }

  gtm_Event_categoria(evento: string, elemento: string) {
    const metric = {
      'event': 'atm.event',
      'event_name': evento,
      'elemento': this.removerTildes(elemento.toLowerCase()) ,
    };

    
    this._pushEvent(metric);
       
  }

  gtm_Event_paquete(evento: string, elemento1: string, elemento2: string, elemento3: string) {
    const metric = {
      'event': 'atm.event',
      'event_name': evento,
      'elemento': this.removerTildes(elemento1.toLowerCase()) ,
      "vigencia": this.removerTildes(elemento2.toLowerCase()),
      "monto": this.monto(elemento3) 
    };

    
    this._pushEvent(metric);
       
  }

  gtm_Event_paquete_pelicula(evento: string, elemento1: string, elemento2: string, elemento3: string) {
    const metric = {
      'event': 'atm.event',
      'event_name': evento,
      'elemento': this.removerTildes(elemento1.toLowerCase()) ,
      "vigencia": this.removerTildes(elemento2.toLowerCase()),
      "monto": 's/ ' + elemento3 
    };

    
    this._pushEvent(metric);
       
  }

  gtm_Event_paquete_gift(evento: string, elemento1: string, elemento2: string, elemento3: string) {
    const metric = {
      'event': 'atm.event',
      'event_name': evento,
      'elemento': this.removerTildes(elemento1.toLowerCase()) ,
      "vigencia": this.removerTildes(elemento2.toLowerCase()),
      "monto": 's/ ' + elemento3 + '.00'
    };

    
    this._pushEvent(metric);
       
  }

  gtm_Event_paquete_cambiar(evento: string, elemento: string) {
    const metric = {
      'event': 'atm.event',
      'event_name': evento,
      'elemento': elemento,
    };

    
    this._pushEvent(metric);
       
  }

  gtm_Event_paquete_cambiar_deep(evento: string, elemento: string, origen: string) {
    const metric = {
      'event': 'atm.event',
      'event_name': evento,
      'elemento': elemento,
      'origen_compra':origen,
    };

    
    this._pushEvent(metric);
       
  }

  gtm_Event_medio_pago(evento: string, elemento: string) {
    const metric = {
      'event': 'atm.event',
      'event_name': evento,
      'elemento': this.removerTildes(elemento.toLowerCase()) ,
    };

    
    this._pushEvent(metric);
       
  }

  gtm_Event_compra_exitosa(evento: string, elemento1: string, elemento2: string, elemento3: string, elemento4: string) {
    const metric = {
      'event': 'atm.event',
      'event_name': evento,
      'elemento': elemento1,
      'estado': elemento2,
      'tipo_paquete': this.removerTildes(elemento4.toLowerCase()) ,
      'producto': this.removerTildes(elemento3.toLowerCase()) ,
    };

    
    this._pushEvent(metric);
       
  }

  gtm_Event_compra_exitosa_cambiar_volver(evento: string, elemento1: string) {
    const metric = {
      'event': 'atm.event',
      'event_name': evento,
      'elemento': elemento1,
    };

    
    this._pushEvent(metric);
       
  }

  gtm_view_item_list_compras(items: any[]) {
    let itemsFiltered = [];
    itemsFiltered = items.map(r => (
      {
        item_name: this.removerTildes(r.nombreProducto.toLowerCase()) ,
        currency: 'PEN',
        price: this.monto2(r.listaCaracteristicasProducto[r.listaCaracteristicasProducto.length - 1].nombre) + ".00"
      }
    ));
    console.log('itemsFiltereditemsFiltereditemsFiltered');
    
    console.log(itemsFiltered);
    
    const metric = {
      'event': 'atm.ga4.ecommerce',
      'event_name': 'view_item_list',
      'ecommerce':{
        'items': itemsFiltered
      }
    }
    this._pushEvent(metric);
    
  }


  gtm_view_item_list_comprass(items: any[]) {
    let itemsFiltered = [];
    itemsFiltered = items.map(r => (
      {
        item_name: this.removerTildes(r.nombreProducto.toLowerCase()) ,
        currency: 'PEN',
        price: r.precio+ '0'
      }
    ));
    const metric = {
      'event': 'atm.ga4.ecommerce',
      'event_name': 'view_item_list',
      'ecommerce':{
        'items': itemsFiltered
      }
    }
    this._pushEvent(metric);
    
  }

  gtm_view_item_list_compras_gift(items: any[]) {
    let itemsFiltered = [];
    itemsFiltered = items.map(r => (
      {
        item_name: this.removerTildes(r.nombreProducto.toLowerCase()) ,
        currency: 'PEN',
        price: r.precio +'.00'
      }
    ));
    const metric = {
      'event': 'atm.ga4.ecommerce',
      'event_name': 'view_item_list',
      'ecommerce':{
        'items': itemsFiltered
      }
    }
    this._pushEvent(metric);
    
  }

  gtm_Event_carrousel(evento: string, elemento: string, categoriaInput: string, nombreImagen: string) {
    const metric = {
      event: 'atm.event',
      event_name: evento,
      elemento: this.removerTildes(elemento.toLowerCase()),
      categoria: categoriaInput,
      nombre_imagen: nombreImagen
    };
    this._pushEvent(metric);
  }

}
