import { PopupService } from 'src/app/services/popup.service';
import { WcmService } from './../../../services/wcm.service';
import {
  AfterViewChecked,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Constantes } from 'src/app/services/constants';
import { DataLayerService } from 'src/app/services/data-layer.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit, OnChanges, AfterViewChecked {
  readonly VALID_MAIL_REGEX = Constantes.emailRegex;
  readonly MENSAJE_GIFTCARD_MAXLENGTH = Constantes.mensajeGiftcardMaxLength;

  @Input() listaProductos: any;
  @Input() colorCat: any;
  @Input() pasoNumero: string;
  @Input() idProductoElegido:any
  @Input() categoriaEscogida:any
  @Input() paqueteIlimitado:any
  @Input() isDeepLink: boolean;

  @Output() productoElegidoChange = new EventEmitter<boolean>();
  @Output() compartirProductoElegidoChange = new EventEmitter<any>();

  productoEscogido: any;
  productoEscogidoCaraOrdenado: any;
  idProdEscogido: any;
  terminosProducto: any;
  terminosGiftCards: any;
  pelicularPop: any;
  idPeliculaPop: any;
  gamerPop: any;
  idGamerPop:any;
  infoEscogida: any;
  musicaPop: any;
  idMusicaPop: any;

  isLoading = false;
  mostrarFormaPago = false;
  mostrarInfoGift = false;
  mostrarConsideracionesGift = false;
  mostrarVerMasPeliculas = false;
  mostrarVerMasMusica = false;
  mostrarVerMasGamer = false;
  todasProd = true;
  todasPelis = true;
  todasMusica = true;
  todasGamer = true;
  verMasMobile = false;
  precioPelicula = '';
  subTitulo = 'Selecciona el mejor paquete para ti';
  listaPeliculasWCM = [];
  listaProductosCaraOrdenado = [];

  defaultSelection = '';
  paquetesEtiquetadosFiltrado = []
  etiquetado
  info
  info2

  constructor(private wcmService: WcmService, private popupService: PopupService,private _dataLayer: DataLayerService) {}

 
  ngOnInit() {
    if(this.listaProductos[0].catnId == 8){

      
      //this._dataLayer.gtm_view_item_list_comprass(this.listaProductos)
    } else if(this.listaProductos[0].catnId == 63 || this.listaProductos[0].catnId == 62){


      this._dataLayer.gtm_view_item_list_compras_gift(this.listaProductos)
    } else {
      this._dataLayer.gtm_view_item_list_compras(this.listaProductos)
    }
    

    
    
    this.PaquetesPromocionados()
    this.popupService.currentAction.subscribe( rpta => {
      if(rpta){
        this.regresarProductos()
        this.popupService.changeState(false)
      }
    })
    this.terminosGiftCards = this.wcmService.terminos.giftcard;
    const tempLista = this.wcmService.listaVideos;



    this.popupService.currentActionMessage.subscribe(message => {
      if (message.indexOf('action_categorias_') > -1) {
        const promoIdProductoDeCompra = message.split('_')[2];
        this.defaultSelection = promoIdProductoDeCompra;
      } else {
        this.defaultSelection = '';
      }
    });



    //console.log('listaProductos', tempLista);

    if (this.colorCat === '80') {
    } else if (this.colorCat === '13') {
      this.precioPelicula = this.listaProductos[0].precio;
      tempLista.forEach(ele => {
        const opcion = {
          cantidadFavoritos: this.listaProductos[0].cantidadFavoritos,
          catnId: this.listaProductos[0].catnId,
          catvCodCategoria: this.listaProductos[0].catvCodCategoria,
          catvTitulo: this.listaProductos[0].catvTitulo,
          codTipoLinea: this.listaProductos[0].codTipoLinea,
          codigoPaquete: this.listaProductos[0].codigoPaquete,
          codigoProducto: this.listaProductos[0].codigoProducto,
          estadoMetodoPago: this.listaProductos[0].estadoMetodoPago,
          finVigencia: this.listaProductos[0].finVigencia,
          flagValidarSaldoPontis: this.listaProductos[0].flagValidarSaldoPontis,
          idMetodoPago: this.listaProductos[0].idMetodoPago,
          idProductoDeCompra: this.listaProductos[0].idProductoDeCompra,
          idProductoDeCompraAsociado: this.listaProductos[0].idProductoDeCompraAsociado,
          idTipoLinea: this.listaProductos[0].idTipoLinea,
          iniVigencia: this.listaProductos[0].iniVigencia,
          moneda1: this.listaProductos[0].moneda1,
          nombreMetodoPago: this.listaProductos[0].nombreMetodoPago,
          nombreProducto: this.listaProductos[0].nombreProducto,
          ordenMetodoPago: this.listaProductos[0].ordenMetodoPago,
          precio: this.listaProductos[0].precio,
          recomendadoCategoriaOrden: this.listaProductos[0].recomendadoCategoriaOrden,
          subtitulo: this.listaProductos[0].subtitulo,
          tipoVigencia: this.listaProductos[0].tipoVigencia,
          tituloProducto: this.listaProductos[0].tituloProducto,
          vigencia: this.listaProductos[0].vigencia,
          flagPontis: this.listaProductos[0].flagPontis,
          wcm: ele
        };

        this.listaPeliculasWCM.push(opcion);
      });
      console.log(this.listaPeliculasWCM);
      
      this._dataLayer.gtm_view_item_list_comprass(this.listaPeliculasWCM)
    } else if (this.colorCat === '25') {
      for (const prod of this.listaProductos) {
        for (const item of this.wcmService.configMusicaWCM) {
          if (item.identificadorBD === prod.codigoProducto) {
            prod.wcmItem = item;
            prod.wcmItem.detailFeatures = this.separarLineas(item.detailFeatures);
          }
        }
      }

      //console.log('listaProductosMusica: ', this.listaProductos);
    } else if (this.colorCat === '95') {   

      for (const prod of this.listaProductos) {
        for (const item of this.wcmService.listaPaquetesGamer) {
          if (item.idProductoDeCompra === prod.idProductoDeCompra) {
            prod.wcmItem = item;
            prod.wcmItem.detailFeatures = this.separarLineas(item.detailFeatures);
          }
        }
      }
      //console.log('listaProductosGamer: ', this.listaProductos);
      
    }
    else {
      this.listaProductosCaraOrdenado = [];
      this.listaProductos.forEach((element, index, array) => {
        const productoCopia = {
          idProductoDeCompra : element.idProductoDeCompra,
          listaCaracteristicasProducto : []
        };
        this.listaProductosCaraOrdenado.push(productoCopia);
      });
      this.listaProductosCaraOrdenado.forEach((element, index, array) => {
        const estilo1 = this.listaProductos[index].listaCaracteristicasProducto[0].estilo;
        let caracteristica = {nombre: '', estilo: ''};
        this.listaProductos[index].listaCaracteristicasProducto.forEach((e, i, arr) => {
          if (i === 0) {
            caracteristica = Object.assign({}, e);
          } else if (e.estilo === estilo1) {
            caracteristica.nombre = caracteristica.nombre + ' ' + e.nombre;
            if (i === (arr.length - 1)) {
              element.listaCaracteristicasProducto.push(caracteristica);
            }
          } else {
            if (element.listaCaracteristicasProducto.length === 0) {
              element.listaCaracteristicasProducto.push(caracteristica);
            }
            caracteristica = Object.assign({}, e);
            if (i === (arr.length - 1)) {
              caracteristica.estilo = caracteristica.estilo + ' texto_precio';
            }
            element.listaCaracteristicasProducto.push(caracteristica);
          }
        });
        if (element.listaCaracteristicasProducto) {
          
          if (element.listaCaracteristicasProducto[0].nombre.length >= 30) {
            element.listaCaracteristicasProducto[0].estilo = element.listaCaracteristicasProducto[0].estilo + ' texto_small';
          }
          if (element.listaCaracteristicasProducto[1].nombre.length >= 22) {
            element.listaCaracteristicasProducto[1].estilo = element.listaCaracteristicasProducto[1].estilo + ' texto_small2';
          }
        }
      });

    }

    if(this.idProductoElegido != 0 && this.encontrarProducto(this.idProductoElegido) != undefined){
        this.escogerProd(this.encontrarProducto(this.idProductoElegido))
    }


  }

  ngAfterViewChecked() {
      setTimeout(() => {
        if (this.defaultSelection != null && this.defaultSelection != '') {
          const filteredProducts = this.listaProductos.filter(prod => prod.idProductoDeCompra == this.defaultSelection);
          if (filteredProducts.length > 0) {
            if (this.colorCat == Constantes.WPSCategoriasDeCompra.videos) {
              if (this.listaPeliculasWCM.length > 0) {
                this.escogerProd(this.listaPeliculasWCM[0]);
              }
            } else {
              const promoProduct = filteredProducts[0];
              this.escogerProd(promoProduct);
            }
          }
          this.defaultSelection = '';
          this.popupService.changeActionMessage('');
        }
    });
  }


  ngOnChanges(changes: SimpleChanges) {
    //this.todasProd = true;
  }

  encontrarProducto(idProductoElegido){
    let data = this.listaProductos.find(e => {
      if(e.idProductoDeCompra == idProductoElegido){
        return e
      }
    });
    return data
  }

  separarLineas(lineaJunta: any) {
    if (!Array.isArray(lineaJunta)) { return lineaJunta.split('|'); }

    return lineaJunta;
  }

  isDesktop() {
    return window.innerWidth > 765;
  }

  escogerProd(product: any) {
    console.log("aaaaaaaaaaaaaaaaaa")
    console.log(product)
    if(product.catnId === '8'){
      this._dataLayer.gtm_Event_paquete_pelicula('compras_producto_click', product.nombreProducto,product.vigencia.toLowerCase(),product.precio.toLowerCase()+'0')
    } else if (product.catnId === '62' || product.catnId === '63'){
      this._dataLayer.gtm_Event_paquete_gift('compras_producto_click', product.nombreProducto, product.vigencia, product.precio)
    } else {
      this._dataLayer.gtm_Event_paquete('compras_producto_click', product.nombreProducto,product.listaCaracteristicasProducto[product.listaCaracteristicasProducto.length-2].nombre.toLowerCase(),product.listaCaracteristicasProducto[product.listaCaracteristicasProducto.length-1].nombre.toLowerCase())
    }
    
    if (this.productoEscogido !== undefined) {
      document
        .getElementById('prod_' + this.idProdEscogido)
        .classList.remove('color_' + this.colorCat);
    }

    this.idProdEscogido = product.idProductoDeCompra;
    this.productoEscogido = product;
    setTimeout(() => {
     // document
     // .getElementById('prod_' + product.idProductoDeCompra)
      //.classList.add('color_' + this.colorCat);
  }, 0);

  
    this.mostrarFormaPago = false;
    this.todasProd = false;
    this.todasPelis = false;
    this.todasMusica = false;
    this.todasGamer = false;

    if (this.colorCat === '80') {
      this.mostrarInfoGift = true;
    }
    if (this.colorCat !== '80' && this.colorCat !== '13') {
      this.listaProductosCaraOrdenado.forEach((element, index, array) => {
        if (element.idProductoDeCompra === this.idProdEscogido) {
          this.productoEscogidoCaraOrdenado = this.listaProductosCaraOrdenado[index];
        }
      });
    }

    //console.log('seleccionando producto', product);
    this.compartirProductoElegidoChange.emit(product);
    this.productoElegidoChange.emit(true);
  }

  regresarProductos() {
    console.log('isDeepLink', this.isDeepLink);
    
    if(this.isDeepLink){
      this._dataLayer.gtm_Event_paquete_cambiar_deep('compras_producto_click','cambiar','deeplink')
    } else {
      this._dataLayer.gtm_Event_paquete_cambiar('compras_producto_click','cambiar')
    }
    
    
    this.limpiarDedicatoria();
    this.todasProd = true;
    this.todasPelis = true;
    this.todasMusica = true;
    this.todasGamer = true;
    this.compartirProductoElegidoChange.emit(null);
    this.productoElegidoChange.emit(false);
    this.mostrarInfoGift = false;
  }


  limpiarDedicatoria() {
    if (this.productoEscogido.dedicatoria) {
      this.productoEscogido.dedicatoria = {
                          nombre_solicitante: '',
                          nombre_destinatario: '',
                          mensaje_opc: ''
                        };
    }
  }

  mostrarConGift(pro: any) {
    switch (pro.nombreProducto) {
      case 'Gift Card 5GB':
        this.terminosProducto = this.terminosGiftCards.giftcard_5gb;
        break;
      case 'Gift Card 10GB':
        this.terminosProducto = this.terminosGiftCards.giftcard_10gb;
        break;
      case 'Gift Card 30GB':
        this.terminosProducto = this.terminosGiftCards.giftcard_30gb;
        break;
      case 'Gift Card 30GB de Pack Video':
        this.terminosProducto = this.terminosGiftCards.giftcard_30gb_pack_video;
        break;
      case 'Gift Card Facebook Full 3':
        this.terminosProducto = this.terminosGiftCards.giftcard_facebook;
        break;
      case 'Gift Card Facebook Full 6':
        this.terminosProducto = this.terminosGiftCards.giftcard_facebook;
        break;
      case 'Gift Card Instagram 3':
        this.terminosProducto = this.terminosGiftCards.giftcard_instagram;
        break;
      case 'Gift Card WhatsApp 12':
        this.terminosProducto = this.terminosGiftCards.giftcard_whatsapp;
        break;
    }

    this.mostrarConsideracionesGift = true;
  }

  mostrarConPelicula(peliculaEscogida: any) {
    this.pelicularPop = peliculaEscogida;
    this.idPeliculaPop = peliculaEscogida.idProductoDeCompra;
    this.mostrarVerMasPeliculas = true;
  }

  mostrarConMusica(musicaEscogida: any) {
    this.musicaPop = musicaEscogida;
    this.idMusicaPop = musicaEscogida.idProductoDeCompra;
    this.mostrarVerMasMusica = true;
  }
  mostrarGamer(gamerEscogida: any) {
    this.gamerPop = gamerEscogida;
    this.idGamerPop = gamerEscogida.idProductoDeCompra;
    this.mostrarVerMasGamer = true;
  }

  cerrarPopUp() {
    this.mostrarConsideracionesGift = false;
    this.mostrarVerMasPeliculas = false;
    this.mostrarVerMasMusica = false;
    this.mostrarVerMasGamer = false;
    this.verMasMobile = false;
  }

  escogerPeli() {
    if (this.todasPelis) {
      this.escogerProd(this.pelicularPop);
    }

    this.mostrarVerMasPeliculas = false;
  }

  escogerMusica() {
    if (this.todasMusica) {
      this.escogerProd(this.musicaPop);
    }

    this.mostrarVerMasMusica = false;
  }
  escogerGamer() {
    if (this.todasGamer) {
      this.escogerProd(this.gamerPop);
    }

    this.mostrarVerMasGamer = false;
  }

  verMasMo() {
    this.verMasMobile = true;
  }

  obtenerEstiloCat(item: any) {
    const estilos = {};
    estilos[item.estilo] = true;
    estilos['color_' + this.colorCat + '_precio'] = item.estilo.includes('texto_precio');
    return estilos;
  }

  PaquetesPromocionados(){
    this.paquetesEtiquetadosFiltrado = this.wcmService.listaPaquetesEtiquetados.filter( obj => {
      const startDayDate = this.createPromoWCMDate(obj.fechaHoraInicio);
      const endDayDate = this.createPromoWCMDate(obj.fechaHoraFin);
      const currentDate = new Date();
      if (currentDate < startDayDate || currentDate > endDayDate) {
        obj.comment = 'Fecha de promoción no es válida';
        return false
      }
      return true
    })
  }


  createPromoWCMDate = (stringDate) => {
    return new Date(
        Number(stringDate.substr(6, 4)),
        Number(stringDate.substr(3, 2)) - 1,
        Number(stringDate.substr(0, 2)),
        Number(stringDate.substr(11, 2)),
        Number(stringDate.substr(14, 2)), 0, 0
    );
}

  ValidarEtiquetado(id){
    this.etiquetado = this.paquetesEtiquetadosFiltrado.find( obj => {
        let data = obj.lista_ids.split(',');
        return data.find( x => id == x)
      }
    )

    if(this.etiquetado){
      this.info = this.etiquetado.titulo.split(" ")
      this.info2 = this.etiquetado.subtitulo.split(" ")
      return true
    }
    return false
  }

}
