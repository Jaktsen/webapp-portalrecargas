import { ObtenerCategoriaService } from "./../../services/obtener-categoria.service";
import { ObtenerMetodosPagoService } from "./../../services/obtener-metodos-pago.service";
import { ProductosFavoritosService } from "./../../services/productos-favoritos.service";
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from "@angular/core";
import { ProductosOfertaService } from "src/app/services/productos-oferta.service";
import { Constantes } from "src/app/services/constants";
import { WcmService } from "../../services/wcm.service";
import { MethodsService } from "src/app/services/methods.service";
import { PopupService } from "src/app/services/popup.service";
import { ValidarCompraRoamingService } from "src/app/services/validar-compra-roaming.service";
import { ServicioCompartidoService } from "src/app/core/services/servicio-compartido.service";
import { GlobalObjectService } from "./../../services/global-object.service";
import { UiServiceService } from "src/app/services/ui-service.service";
import { ButtonBehavior } from "./../../components/dialog/dialog.component";
import { environment } from "src/environments/environment";
import { ValidarDegradacionService } from "src/app/services/validar-degradacion.service";
import { DataLayerService } from "src/app/services/data-layer.service";

@Component({
  selector: "app-categorias",
  templateUrl: "./categorias.component.html",
  styleUrls: ["./categorias.component.scss"],
})
export class CategoriasComponent implements OnInit, OnChanges {
  @Input() nombre: string;
  @Input() listaCategorias: any[];
  @Input() carouselAbierto: string;
  @Input() creditoSaldo: any;
  @Input() disabled: boolean = false

  @Input() categoria
  @Input() subcategoria
  @Input() idProductoElegido
  @Input() isDeepLink: boolean;
  //@Input() isDegradado:string; 
  //@Input() identificadorUsuarioToBeRequestType;  

  @Output() carouselAbiertoChange = new EventEmitter<string>();
  @Output() mostrarConfirma = new EventEmitter<boolean>();
  @Output() productoSelect = new EventEmitter<any>();
  @Output() categoriaSelect = new EventEmitter<any>();
  @Output() metodoseleccionado = new EventEmitter<any>();
  @Output() compartirSubCat = new EventEmitter<any>();

  categoriaEscogida: any;
  subCategoriEscogida: any;
  infoPopUp: any;
  nombrePopUp: any;

  todasCards = true;
  sinSubCategoria = false;
  conSubCategoria = false;
  roaming = false;
  eventos = false;
  listaProductos = [];
  isLoadingCat = false;
  isLoadingMetodo = false;
  mostrarMedioPagos = false;
  popUpGeneral = false;
  isRoamingActivaded = true;
  bannerTiendaClaro = true;

  listaMetodosPago;
  productoElegido: any;
  obtenerMetodosPagoIdRespuesta: any;
  requestRoaming: any = {
    tipoVal: null,
    zone_code: null,
    tipoRoming: null,
    vigenciaProducto: null,
    idProductoDeCompra: null,
  };
  paqueteIlimitado: boolean = false;
  tipoMetodoPagoStar;
  @Output() flagErrorService = new EventEmitter<any>(false);
  reqValidarDegradacion = {
    tipoLinea : '',
    codTipoLinea : '',
    idProductoServicio:'',
    admin : '',
    tmcode:'',
    flagPivot : '',
    idCategoria:''
  }

  isDegradado = "true"
  identificadorUsuarioToBeRequestType = null

  constructor(
    private productosOfertaService: ProductosOfertaService,
    private productosFavoritosService: ProductosFavoritosService,
    private wcmService: WcmService,
    private methods: MethodsService,
    private omp: ObtenerMetodosPagoService,
    private popupService: PopupService,
    private vcRoamingService: ValidarCompraRoamingService,
    private ocs: ObtenerCategoriaService,
    public servicioCompartido: ServicioCompartidoService,
    private go: GlobalObjectService,
    private uiService: UiServiceService,
    private validarDegradacionService: ValidarDegradacionService,
    private _dataLayer: DataLayerService
  ) {}

  ngOnInit() {

    console.log('isDeepLink', this.isDeepLink);
    
    this.popupService.currentCloseTiendaVirtualMessage.subscribe((message) => {
      if (message === "close_banner_tienda") {
        this.ocultarBannerTiendaClaro();
      }
    });

    this.popupService.currentMessage.subscribe((message) => {
      if (message === Constantes.popupCustomExceptions.go_back_to_categories) {
        this.regresarCategorias();
        //console.groupEnd();
      }
    });
    this.popupService.currentActionMessage.subscribe((message) => {
      if (message.indexOf("action_categorias_") > -1) {
        //console.groupCollapsed("Procesando call to action");
        try {
          const catCod = message.split("_")[3];
          const filteredCat = this.listaCategorias.filter(
            (cat) => cat.codCategoria == catCod,
          );
          if (filteredCat.length > 0) {
            const calledCat = filteredCat[0];
            this.seleccionarCat(calledCat, this.disabled);
            //console.log("Call to action seleccionando categoria %O", calledCat);
          } else {
            this.popupService.changeActionMessage("");
            //console.log("No existe la categoria para el call to action");
          }
        } catch (error) {
          console.error("Ocurrio error", error);
          this.popupService.changeActionMessage("");
        }
        console.groupEnd();
      }
    });
  }

  ngOnChanges() {
    if (this.carouselAbierto !== "categorias") {
      this.todasCards = true;
      this.sinSubCategoria = false;
      this.conSubCategoria = false;
      this.roaming = false;
      this.eventos = false;
      this.listaProductos = [];
      this.isLoadingCat = false;
    }

    this.deepLink()
  }

  deepLink(){
    if(this.categoria == ''){
      this.categoria =this.subcategoria 
    }

    if(this.categoria !=null && this.listaCategorias!=null){
      //traer wef mock o servicio
      const filteredCat = this.listaCategorias.filter(
        (cat) => cat.codCategoria == this.categoria,
      );

      if(filteredCat[0].listaSubCategorias != null && filteredCat[0].listaSubCategorias){
        const filteredSubCat = filteredCat[0].listaSubCategorias.filter(
          (cat) => cat.codCategoria == this.subcategoria,
        );
        this.subcategoria = filteredSubCat
      }
      

      

      this.seleccionarCat(filteredCat[0],true)
    }
  }

  validarDegradacion(arg: any) {
    this.listaMetodosPago = []
    this.reqValidarDegradacion.tipoLinea = this.servicioCompartido.tipoLinea;
    this.reqValidarDegradacion.codTipoLinea = this.productoElegido.codTipoLinea;
    this.reqValidarDegradacion.idProductoServicio = this.servicioCompartido.idProductoServicio;
    this.reqValidarDegradacion.admin = this.servicioCompartido.isAdmin;
    this.reqValidarDegradacion.tmcode = this.servicioCompartido.codigoPlanTarifario;
    if (this.servicioCompartido.isONE){
      this.reqValidarDegradacion.flagPivot = '1';
    }else{
      this.reqValidarDegradacion.flagPivot = '0';
    }
    this.reqValidarDegradacion.idCategoria = this.productoElegido.catnId; 
    this.validarDegradacionService.validarDegradacionServ(() => {

    const idRespuesta = this.validarDegradacionService.validarDegradacionResponse.idRespuesta;
    if (idRespuesta === "0") {
      this.isDegradado = this.validarDegradacionService.validarDegradacionResponse.degradado;
      this.identificadorUsuarioToBeRequestType = this.validarDegradacionService.validarDegradacionResponse.IdentificadorUsuarioToBeRequestType
      if(this.isDegradado === "true")
        {

          this.omp
          .obtenerMetodosDePago(this.productoElegido,this.creditoSaldo.lblSaldoPrepago,this.identificadorUsuarioToBeRequestType)
          .subscribe((response) => {
            this.listaMetodosPago = response.listMetodoPago;
            if(response.flagPaqueteIlimitado === "true" ){
              this.paqueteIlimitado = true
            }
            let data = this.listaProductos.find( obj => (obj.idProductoDeCompra == '1305' || obj.idProductoDeCompra == '1306' || obj.idProductoDeCompra == '1307' || obj.idProductoDeCompra == '1308'));
            if(data){
              this.listaMetodosPago[0].estado = 0;
            }
            this.obtenerMetodosPagoIdRespuesta = response.idRespuesta;
            this.mostrarMedioPagos = arg;
          });
        }
  
        this.mostrarMedioPagos = true;
    }else {
      const data = {
        content: Constantes.WPSMensajeError.value.DEGRADACION_MENSAJE,
        mainButtonBehavior: ButtonBehavior.SimplyCloseAndResetProducts,
        title: Constantes.WPSMensajeError.value.DEGRADACION_TITULO,
        buttonMessage: "Entendido",
        isInvertedButton: null,
        imagen: null,
      };
      this.uiService.openPopup(data);
    }
 

    },this.reqValidarDegradacion);


  }

  seleccionarCat(cat: any, isActive:boolean) {
    this._dataLayer.gtm_Event_categoria('compras_tipo_paquete_click',cat.titulo.toLowerCase());
  
    if (isActive){  
      if(cat.codCategoria == Constantes.WPSCategoriasDeCompra.roaming &&
      !this.methods.isRoamingCategoryEnabled()){
     
      const data = {
        content: Constantes.WPSMensajeError.value.ROAMING_MENSAJE_MANTENIMIENTO,
        mainButtonBehavior: ButtonBehavior.SimplyClose,
        title: Constantes.WPSMensajeError.value.ROAMING_TITULO_MANTENIMIENTO,
        buttonMessage: null,
        isInvertedButton: null,
        imagen: { path: "robot_mantenimiento", pos: "down" },
      };
      this.uiService.openPopup(data);

      return;
    }

    this.ocs.categoriaSeleccionada = null;

    if (this.isRoamingActivaded) {
      this.loadScript();
      this.categoriaEscogida = cat;
      this.todasCards = false;
      this.productosFavoritosService.flujoFav("N");
      this.carouselAbiertoChange.emit("categorias");
      this.categoriaSelect.emit(cat);
    }
    window.sessionStorage.setItem(Constantes.allowedFavorites, "1");

    if (this.hasSubcategoriesButIsNotRoamingNorEventos(cat)) {
      this.categoriaEscogida = cat;
      this.todasCards = false;
      this.carouselAbiertoChange.emit("categorias");
      this.categoriaSelect.emit(cat);
      this.ocs.categoriaSeleccionada = cat;
      this.conSubCategoria = true;
      setTimeout(() => {
        this.methods.scroll(document.getElementById("subCatBox"));
      }, 1000);
    } else if (this.isCategoryRoaming(cat)) {
      this.validarCompraRoaming(
        Constantes.WPSTipoClic.value.clicCategoria,
        cat,
      );
    } else if (this.isCategoryEventos(cat)) {
      this.categoriaEscogida = cat;
      this.todasCards = false;
      this.carouselAbiertoChange.emit("categorias");
      this.categoriaSelect.emit(cat);
      this.ocs.categoriaSeleccionada = cat;
      this.eventos = true;
      setTimeout(() => {
        this.methods.scroll(document.getElementById("eventosBox"));
      }, 1000);
    } else {
      this.categoriaEscogida = cat;
      this.todasCards = false;
      this.carouselAbiertoChange.emit("categorias");
      this.categoriaSelect.emit(cat);
      this.ocs.categoriaSeleccionada = cat;
      this.isLoadingCat = true;
      this.obtenerProductos(cat);
      this.productosFavoritosService.flujoFav("N");

      setTimeout(() => {
        this.methods.scroll(document.getElementById("sinSubCatBox"));
      }, 1000);
    }
  }
  }

  private isCategoryEventos(cat: any) {
    return cat.codCategoria === Constantes.WPSCategoriasDeCompra.compartir;
  }

  private isCategoryRoaming(cat: any) {
    return cat.codCategoria === Constantes.WPSCategoriasDeCompra.roaming;
  }

  private hasSubcategoriesButIsNotRoamingNorEventos(cat: any) {
    return (
      cat.listaSubCategorias &&
      cat.listaSubCategorias.length > 0 &&
      cat.codCategoria !== Constantes.WPSCategoriasDeCompra.roaming &&
      cat.codCategoria !== Constantes.WPSCategoriasDeCompra.compartir
    );
  }

  validarCompraRoaming(tipoVal: any, cat: any) {
    this.requestRoaming.tipoVal = tipoVal;
    this.vcRoamingService.validarProductodeCompraRoaming(
      this.requestRoaming,
      () => {
        const valRoaming = this.vcRoamingService.validarRoamingResponse;
        const idRespuesta = valRoaming.idRespuesta;
        if(valRoaming.errorService){
          this.flagErrorService.emit(true)
        }else{
          if (Number(idRespuesta) === 0) {
            this.vcRoamingService.validarRoamingActivo(() => {
              const valRoamingActivo =
                this.vcRoamingService.validarRoamingActivoResponse;
              const idRespuestaRoamingActivo = Number(
                valRoamingActivo.idRespuesta,
              );
              if (Number(idRespuestaRoamingActivo) === 0) {
                const boolValue = valRoamingActivo.status == "true";
                this.isRoamingActivaded = boolValue;
                if (this.isRoamingActivaded) {
                  this.categoriaEscogida = cat;
                  this.todasCards = false;
                  this.carouselAbiertoChange.emit("categorias");
                  this.roaming = true;
  
                  setTimeout(() => {
                    this.methods.scroll(document.getElementById("roamingBox"));
                  }, 1000);
                } else {
                  const data = {
                    content:
                      Constantes.WPSMensajeError.value
                        .ROAMING_MENSAJE_ACTIVA_PAQUETE,
                    mainButtonBehavior: ButtonBehavior.SimplyClose,
                    title:
                      Constantes.WPSMensajeError.value
                        .ROAMING_TITULO_ACTIVA_PAQUETE,
                    buttonMessage: "Entendido",
                    isInvertedButton: null,
                    imagen: null,
                  };
                  this.uiService.openPopup(data);
                }
                
              }
            });
          } else {
            if (Number(idRespuesta) > 0) {
              const errorMessage =
                valRoaming.mensaje != "" &&
                valRoaming.mensaje != null &&
                Number(idRespuesta) > 0 && idRespuesta != 6 && idRespuesta != 10 
                  ? valRoaming.mensaje
                  : Constantes.MensajeGenerico;
              const data = {
                content: errorMessage,
                mainButtonBehavior: ButtonBehavior.ResetCategories,
                title: Constantes.WPSMensajeError.value.mensaje7,
                buttonMessage: "Entendido",
                isInvertedButton: null,
                imagen: null,
              };
              this.uiService.openPopup(data);
            } else {
              this.nombrePopUp = "Error Mensaje";
              this.infoPopUp = {
                mensaje_upps_titulo: "¡Lo sentimos!",
                customMessageError: Constantes.MensajeGenerico,
              };
              this.popUpGeneral = true;
            }
          }
        }
      },
    );
  }

  isDisplayableCategory(item) {
    if (item.catcEstado == "0") {
      return false;
    }

    if (
      Constantes.WPSHiddenCategoriesInSeleccionaElPaqueteQueNecesitas.length > 0
    ) {
      if (
        Constantes.WPSHiddenCategoriesInSeleccionaElPaqueteQueNecesitas.indexOf(
          item.codCategoria,
        ) == -1
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  regresarCategorias() {
    //this.ocs.categoriaSeleccionada.titulo.toLowerCase(),
    this._dataLayer.gtm_Event_categoria('compras_tipo_paquete_click',"cambiar");
    this.todasCards = true;
    this.sinSubCategoria = false;
    this.conSubCategoria = false;
    this.roaming = false;
    this.eventos = false;
    this.mostrarMedioPagos = false;
    this.ocs.categoriaSeleccionada = null;
    this.subCategoriEscogida = null;
    this.compartirSubCat.emit(null);
    
  }

  obtenerProductos(categoriaSeleccionada: any) {
    this.productosOfertaService
      .obtenerOfertas(categoriaSeleccionada)
      .toPromise()
      .then((response: any) => {
        this.listaProductos = response;
        this.isLoadingCat = false;
        this.todasCards = false;

        this.sinSubCategoria = true;

        setTimeout(() => {
          this.methods.scroll(document.getElementById("sinSubCatBox"));
        }, 1000);
      })
      .catch((err) => {
        console.error("error", err);
      });
  }

  habilitarMetodoPago(arg: any) {
    this.listaMetodosPago = []
    this.isLoadingMetodo = true;
    if (this.productoElegido) {

      if(this.servicioCompartido.tipoLinea === '2'){
        this.validarDegradacion(arg);
  
      }else{
        this.omp
        .obtenerMetodosDePago(this.productoElegido,this.creditoSaldo.lblSaldoPrepago,this.identificadorUsuarioToBeRequestType)
        .subscribe((response) => {
          this.listaMetodosPago = response.listMetodoPago;
          this.tipoMetodoPagoStar = response.tipoMetodoPagoStar;
          
          if(response.flagPaqueteIlimitado === "true" ){
            this.paqueteIlimitado = true
          }

          let data = this.listaProductos.find( obj => (obj.idProductoDeCompra == '1305' || obj.idProductoDeCompra == '1306' || obj.idProductoDeCompra == '1307' || obj.idProductoDeCompra == '1308'));
          if(data){
            this.listaMetodosPago[0].estado = 0;
          }
          this.obtenerMetodosPagoIdRespuesta = response.idRespuesta;
          this.mostrarMedioPagos = arg;
        });
      }      
    } else {
      this.mostrarMedioPagos = arg;
    }
  }

  compartirProdElegido(productoElegido: any) {

    this.productoElegido = productoElegido;
    this.productoSelect.emit(productoElegido);
  }

  compartirProdElegidoSub(prod: any) {

    this.productoElegido = prod;
    this.productoSelect.emit(prod);
  }

  compartirEventoPro(event: any) {
    //console.log("evento:", event);
    this.productoSelect.emit(event.oportunidad);
    this.categoriaSelect.emit(event.evento);
    this.ocs.categoriaSeleccionada = event.evento;
  }

  compartirProdElegidoRoaming(event: any) {
    //console.log("productoElegido Roaming:", event);
    this.productoElegido = event;
    this.productoSelect.emit(event);
  }

  compartirSubCategoria(sub: any) {
    this.compartirSubCat.emit(sub);
  }

  habilitarConfirmacion(estado: boolean) {
    this.mostrarConfirma.emit(estado);
  }

  metodoSeleccionado(metodo: any) {
    this.metodoseleccionado.emit(metodo);
  }

  terminarLoading(event: any) {
    // this.isLoadingMetodo = event;
  }

  cerrarPopUp(est: any) {
    this.popUpGeneral = est;
  }

  visitTiendaClaro() {
    this._dataLayer.gtm_Event_paquete_cambiar("compras_banner_visita_tienda_click","visita tienda claro")
    this.go.goToLink(
      "https://tiendaclaro.pe/?utm_source=portal_compras&utm_medium=banner_catalogo&utm_campaign=banner_catalogo",
    );
  }

  ocultarBannerTiendaClaro() {
    this.bannerTiendaClaro = false;
  }

  loadScript() {
    var isFound = false;
    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; ++i) {
      if (
        scripts[i].getAttribute("src") != null &&
        (scripts[i].getAttribute("src").includes("paisesRoaming") ||
          scripts[i].getAttribute("src").includes("paisesRoamingSinFrontera"))
      ) {
        isFound = true;
        break;
      }
    }

    if (!isFound) {
      var dynamicScripts = [
        environment.roamingConfig + "paisesRoaming.json?subtype=js",
        environment.roamingConfig + "paisesroamingsinfrontera.json?subtype=js",
      ];

      for (var i = 0; i < dynamicScripts.length; i++) {
        let node = document.createElement("script");
        node.src = dynamicScripts[i];
        node.type = "text/javascript";
        node.async = true;
        document.getElementsByTagName("head")[0].appendChild(node);
      }
    }
  }

  habilitarErrorServicio(event){
    this.flagErrorService.emit(event)
  } 

}
