import { PopupService } from 'src/app/services/popup.service';
import { ObtenerCategoriaService } from 'src/app/services/obtener-categoria.service';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ProductosOfertaService } from 'src/app/services/productos-oferta.service';
import { Constantes } from '../../services/constants';
import { ServicioCompartidoService } from 'src/app/core/services/servicio-compartido.service';
import { MethodsService } from 'src/app/services/methods.service';
import { GlobalObjectService } from 'src/app/services/global-object.service';
import { WcmService } from 'src/app/services/wcm.service';
import { DataLayerService } from '../../services/data-layer.service';

@Component({
  selector: 'app-recargas',
  templateUrl: './recargas.component.html',
  styleUrls: ['./recargas.component.scss']
})
export class RecargasComponent implements OnInit , OnChanges {

  @Input() activarRecargas: boolean;
  @Input() listaCategorias: any[];
  @Input() nombre: string;
  productoEscogido: any;
  idProdEscogido: any;
  listaProductos = [];
  imagen_fondo
  pelicularPop: any;
  idPeliculaPop: any;
  mostrarVerMasPeliculas= false;
  verMasMobile = false;

  @Output() abrirFlujoCarouselEvent = new EventEmitter<string>();
  @Output() productoRecargaSelectionEvent = new EventEmitter<any>();
  @Output() favoriteSelectionEvent = new EventEmitter<any>();
  montosMock = [
    {
      monto: '3',
      vigencia: '30'
    },
    {
      monto: '5',
      vigencia: '30'
    },
    {
      monto: '7',
      vigencia: '30'
    },
    {
      monto: '10',
      vigencia: '30'
    },
    {
      monto: '15',
      vigencia: '30'
    },
    {
      monto: '20',
      vigencia: '30'
    },
    {
      monto: '50',
      vigencia: '30'
    }
  ];
  listCheck = []

  constructor(private productosOfertaService: ProductosOfertaService,
              public servicioCompartido: ServicioCompartidoService,
              private methods: MethodsService,
              private ocs: ObtenerCategoriaService, private popupService: PopupService, 
              private go: GlobalObjectService,
              private wcmService: WcmService,
              methodsService: MethodsService,
              private _dataLayer: DataLayerService) { }

                
  ngOnInit() {
    let listaRecomendados = this.go.getObject(
      'wcm'
    ).listas.listaFondoRecomendados;
    
    //console.log(listaRecomendados)
    listaRecomendados.forEach( a => {
      if( a.titulo == 'fondo_portal_recargas'){
        this.imagen_fondo = a.ImagenFondo
        //console.log("a")
        //console.log(this.imagen_fondo)
      }
    })

if(this.listaCategorias === undefined){

} else if (this.listaCategorias.length > 0 && this.activarRecargas) {
      this.obtenerProductos(this.listaCategorias[0]);
    }
    const tempLista = this.wcmService.listaPopupRecargas;
    //console.log('listaProductos', tempLista);
    //console.log(this.listaProductos);

    this.popupService.currentActionMessage.subscribe(message => {
      
      if (message.indexOf('action_recargas_') > -1) {
      
          console.groupCollapsed('Procesando call to action recargas');
          try {
            const parts = message.split('_');
            const catCod = parts[3];
            const idProd = parts[2];
            const filteredCat = this.listaCategorias.filter(cat => cat.codCategoria == catCod);
            const filteredProd = this.listaProductos.filter(prod => prod.idProductoDeCompra == idProd);
            let index = this.listaProductos.findIndex( prod => prod.idProductoDeCompra == idProd);
            if (filteredCat.length > 0 && filteredProd.length > 0) {
              const calledProd = filteredProd[0];
              this.escogerCard(calledProd,index);
              //console.log('Call to action seleccionando producto %O', calledProd);
            } else {
              //console.log('No existe producto para el call to action');
            }
            this.popupService.changeActionMessage('');
          } catch (error) {
            console.error('Ocurrio error', error);
            this.popupService.changeActionMessage('');
        }
          console.groupEnd();
        } 
    });  
  }

  ngOnChanges(changes) {
    if(!changes.activarRecargas.currentValues){
      this.productoRecargaSelectionEvent.emit(null);
    }
  }


   removeAccents = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  getObtenerFondoRecomendados(producto: any) {
    if (producto!= null ) {
        return 'url(' + producto + ')';
    } else {
        return null;
    }
}
  escogerCard(productoSeleccionado: any, index: any) {

    if (this.productoEscogido !== undefined) {
      document.getElementById('prod_' + this.idProdEscogido).style.border = 'solid 1px rgba(0, 0, 0, 0.03)';

      
    }

    this.data(index)
    this.ocs.categoriaSeleccionada = null;

    const vigenciatemp = this.removeAccents(productoSeleccionado.listaCaracteristicasProducto[2].nombre)
    const vigencia = vigenciatemp.split('x ');
    this._dataLayer.gtm_Event('recargas_seleccion_monto_click',productoSeleccionado.listaCaracteristicasProducto[0].nombre.toLowerCase(), '', vigencia[1]);
  
    (document.getElementById('inputMonto') as HTMLInputElement).value = '';
    document.getElementById('minMaxMonto').style.color = '#212121';
    document.getElementById('minMaxMonto').innerHTML = 'Monto minímo: S/ 3.00 ';
    document.getElementById('input-paquete').style.border = 'solid 1px rgba(0, 0, 0, 0.03)';
    this.idProdEscogido = productoSeleccionado.idProductoDeCompra;
    this.productoEscogido = productoSeleccionado;
    this.productoEscogido.confirmaRecarga =  false;
    document.getElementById('prod_' + productoSeleccionado.idProductoDeCompra).style.border = 'solid 1px #0FBDDF ';

    this.ocs.categoriaSeleccionada = this.listaCategorias[0];

    this.abrirFlujoCarouselEvent.emit('recargas');
    this.favoriteSelectionEvent.emit(this.productoEscogido);
    //this.productoRecargaSelectionEvent.emit(this.productoEscogido);
    setTimeout(() => {
      this.methods.scroll(document.getElementById('metodosDiv'));
    }, 1000);

  }
  input(){
    this._dataLayer.gtm_Event_term('recargas_ingresa_monto_click', 'ingrese otro monto');
  }
  onInput(event: any) {
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
  }

  confirmarMonto() {

    this._dataLayer.gtm_Event('recargas_ingresa_monto_click', 'confirmar','','');

    this.listCheck[0] = false
    this.listCheck[1] = false
    this.listCheck[2] = false
    this.listCheck[3] = false
    this.listCheck[4] = false
    this.listCheck[5] = false
    this.listCheck[6] = false

    if (this.productoEscogido !== undefined) {
      document.getElementById('prod_' + this.idProdEscogido).style.border = 'solid 1px rgba(0, 0, 0, 0.03)';
    }
    
    if (this.listaProductos.length > 0) {

      const dynamicProduct = this.listaProductos.filter((elem) => {
        return Constantes.DYNAMIC_PRICE_RECHARGE_PRODUCT_CODES.indexOf(elem.codigoProducto) > -1;
      })[0];

      document.getElementById('input-paquete').style.border = 'solid 1px #2197ae';

      const montoEs = (document.getElementById('inputMonto') as HTMLInputElement).value;

      const dynamicPrice = parseInt(montoEs, 10);
      if (dynamicProduct != null && dynamicPrice) {

        if (dynamicPrice > Constantes.RECHARGE_LIMITS.MAX) {
          document.getElementById('minMaxMonto').innerHTML = 'Ingrese un monto inferior a S/ 200.00 ';
          document.getElementById('minMaxMonto').style.color = '#da272c';
          this.abrirFlujoCarouselEvent.emit('');
          return;
        }
        if (dynamicPrice < Constantes.RECHARGE_LIMITS.MIN) {
          document.getElementById('minMaxMonto').innerHTML = 'Ingrese un monto superior a S/ 3.00 ';
          document.getElementById('minMaxMonto').style.color = '#da272c';
          this.abrirFlujoCarouselEvent.emit('');
          return;
        }
        document.getElementById('minMaxMonto').innerHTML = 'Monto minímo: S/ 3.00 ';
        document.getElementById('minMaxMonto').style.color = '#212121';
        dynamicProduct.precioMoneda = dynamicPrice;
        dynamicProduct.dynamicProductFlux = true;
        dynamicProduct.confirmaRecarga = true;
        //  Reglas: Vigencia de recargas
        // 👉🏻Prepago:
        // De 3 a s/59: 30 días
        // De S/60 a más: 60 días
        // 👉🏻Postpago: 1 año
        // prepago
        if (this.servicioCompartido.tipoLinea == '1') {
          if (dynamicPrice >= 3 && dynamicPrice < 60) {
            dynamicProduct.vigencia = 30;
          } else {
            dynamicProduct.vigencia = 60;
          }
        } else {
          dynamicProduct.vigencia = 365;
        }
        // $scope.dynamicProductFlux = true;
        this.abrirFlujoCarouselEvent.emit('recargas');
        this.productoRecargaSelectionEvent.emit(dynamicProduct);

        setTimeout(() => {
          this.methods.scroll(document.getElementById('metodosDiv'));
        }, 1000);

      } else {
        console.log('else');
        
        this.abrirFlujoCarouselEvent.emit('recargas');
        document.getElementById('minMaxMonto').style.color = '#212121';
      }

    }


  }

  obtenerProductos(categoriaSeleccionada: any) {
    this.listCheck = []    
    this.productosOfertaService.obtenerOfertas(categoriaSeleccionada).toPromise().then((response: any) => {
      this.listaProductos = response;
      //console.log('Producto RECARGA::',  this.listaProductos);
      const listaRecarga = [];
      const listaRecargaWcm = this.wcmService.listaPopupRecargas;
      //console.log(listaRecargaWcm);
      if(this.servicioCompartido.tipoLinea == '1'){
        for (const prod of this.listaProductos) {
          for (const item of this.wcmService.listaPopupRecargas) {
            if (item.idProductoDeCompra === prod.idProductoDeCompra) {
              prod.wcmItem = item;
             
            }
          }
        }

        listaRecargaWcm.forEach( s =>        
          this.listaProductos.forEach( e => {     
            if (e.idProductoDeCompra === s.idProductoDeCompra) {     
              
              e.wcm = s;
  
              listaRecarga.push(e);
              
            }
          })
        );
      }
      //console.log('this.listaProductos', this.listaProductos);
      
      //console.log('productossssssssssssssss', listaRecarga);
      let data = this.listaProductos.filter(paqutes => paqutes.precio != 0)
      for(let detalle of data){  
             
        this.listCheck.push(false)
      
      }

      this.activarRecargas = true;
      if(this.servicioCompartido.tipoLinea == '1'){
        this._dataLayer.gtm_view_item_list(listaRecarga);
      } else {
        this._dataLayer.gtm_view_item_list(data);
      }
      


    }).catch(err => {
      console.error('error', err);
    });
  }

  data(id){
    this.listCheck[0] = false
    this.listCheck[1] = false
    this.listCheck[2] = false
    this.listCheck[3] = false
    this.listCheck[4] = false
    this.listCheck[5] = false
    this.listCheck[6] = false
    this.listCheck[id] = true

  }
  isDesktop() {
    return window.innerWidth > 765;
  }

  mostrarConPelicula(recargaEscogida: any) {

    const vigenciatemp =  this.removeAccents(recargaEscogida.listaCaracteristicasProducto[2].nombre)
    const vigencia = vigenciatemp.split('x ');
    this._dataLayer.gtm_Event('recargas_seleccion_monto_click','ver mas', recargaEscogida.listaCaracteristicasProducto[0].nombre.toLowerCase(), vigencia[1]);
    console.log('recargaEscogida' , recargaEscogida);
    this.pelicularPop = recargaEscogida;
    this.idPeliculaPop = recargaEscogida.idProductoDeCompra;
    this.mostrarVerMasPeliculas = true;
    this._dataLayer.gtm_Event('recargas_seleccion_monto_banner_view','ver mas', recargaEscogida.listaCaracteristicasProducto[0].nombre.toLowerCase(), vigencia[1]);
  }

  cerrarPopUp() {
    
    this.mostrarVerMasPeliculas = false;
    this.verMasMobile = false;
  }

  verMasMo() {
    this.verMasMobile = true;
  }


}
