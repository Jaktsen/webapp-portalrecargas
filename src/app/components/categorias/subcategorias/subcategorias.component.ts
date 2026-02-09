import { ObtenerMetodosPagoService } from './../../../services/obtener-metodos-pago.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Constantes } from 'src/app/services/constants';
import { ProductosFavoritosService } from 'src/app/services/productos-favoritos.service';
import { ProductosOfertaService } from 'src/app/services/productos-oferta.service';
import { ObtenerCategoriaService } from 'src/app/services/obtener-categoria.service';
import { MethodsService } from 'src/app/services/methods.service';
import { ValidarDegradacionService } from 'src/app/services/validar-degradacion.service';
import { ServicioCompartidoService } from 'src/app/core/services/servicio-compartido.service';
import { ButtonBehavior } from '../../dialog/dialog.component';
import { UiServiceService } from 'src/app/services/ui-service.service';


@Component({
  selector: 'app-subcategorias',
  templateUrl: './subcategorias.component.html',
  styleUrls: ['./subcategorias.component.scss'],
})
export class SubcategoriasComponent implements OnInit {
  @Input() categoriaEscogida: any;
  @Input() creditoSaldo: any;
  @Input() subcategoria: any; 
  @Input() idProductoElegido;
  @Input() isDegradado: string;
  @Input() isDeepLink: boolean;

  @Output() mostrarConfirma = new EventEmitter<boolean>();
  @Output() comparteProd = new EventEmitter<any>();
  @Output() comparteSubCat = new EventEmitter<any>();


  subEscogido: any;
  idSubEscogido: any;

  subtituloCategoria = '¿Qué tipo de paquete necesitas?';
  mostrarProductos = false;
  listaProductos = [];
  isLoading = false;
  mostrarMedioPagos = false;
  metodoPaso = '4';

  tipoMetodoPagoStar;

  productoElegido = null;

  listaMetodosPago;
  obtenerMetodosPagoIdRespuesta: any;

  codigoCatOrSub = '';
  reqValidarDegradacion = {
    tipoLinea : '',
    codTipoLinea : '',
    idProductoServicio:'',
    admin : '',
    tmcode:'',
    flagPivot : '',
    idCategoria:''
  }
  identificadorUsuarioToBeRequestType = null

  constructor(
    private methods: MethodsService,
    private productosOfertaService: ProductosOfertaService,
    private productosFavoritosService: ProductosFavoritosService,
    private omp: ObtenerMetodosPagoService,
    private ocs: ObtenerCategoriaService,
    private validarDegradacionService: ValidarDegradacionService,
    public servicioCompartido: ServicioCompartidoService,
    private uiService: UiServiceService,
  ) {}

  ngOnInit() {

    if(this.subcategoria){
      this.escogerSub( this.subcategoria[0 ], this.encontrarPosicionSubcategoria(this.subcategoria))
    }
    
    this.codigoCatOrSub = this.categoriaEscogida.codCategoria;
    if (this.categoriaEscogida.codCategoria === '80') {
      this.metodoPaso = '5';
    }
  }

  validarDegradacion(arg: any) {
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
            this.obtenerMetodosPagoIdRespuesta = response.idRespuesta;

            this.mostrarMedioPagos = arg;
            setTimeout(() => {
              if (this.categoriaEscogida.codCategoria === '80') {
                this.methods.scroll(document.getElementById('gift-card-info'));
              } else {
                this.methods.scroll(document.getElementById('metodosDiv'));
              }
            }, 250);

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

  

  escogerSub(sub: any, num: any) {

    this.ocs.categoriaSeleccionada.nestedSubcategory = null;

    if (this.subEscogido !== undefined) {
      document
        .getElementById('sub_' + this.idSubEscogido)
        .classList.remove('color_' + this.categoriaEscogida.codCategoria);
    }

    this.idSubEscogido = num;
    this.subEscogido = sub;
    this.ocs.categoriaSeleccionada.nestedSubcategory = sub;
    this.comparteSubCat.emit(this.subEscogido);
    this.codigoCatOrSub = this.subEscogido.idCategoriaDeCompra;

    setTimeout(() => {
        document
        .getElementById('sub_' + num)
        .classList.add('color_' + this.categoriaEscogida.codCategoria);
    }, 100);

    this.isLoading = true;
    this.mostrarProductos = false;
    this.mostrarMedioPagos = false;

    setTimeout(() => {
      this.obtenerProductos(sub);
      this.productosFavoritosService.flujoFav('N');
    }, 3000);
  }

  obtenerProductos(categoriaSeleccionada) {
    //console.log("==============BUSCANDO PRODUCTO DE SUBCATEGORIA=========")
    //console.log(categoriaSeleccionada)
    if (
      categoriaSeleccionada.codCategoria ===
        Constantes.PC_CATEGORIAS_COMPRA.gifCard1 ||
      categoriaSeleccionada.codCategoria ===
        Constantes.PC_CATEGORIAS_COMPRA.gifCard2
    ) {
      this.productosOfertaService
        .obtenerOfertas(categoriaSeleccionada)
        .subscribe((productos) => {
          //console.log('obteniendo productos giftcard');
          this.listaProductos = productos;
          this.isLoading = false;
          this.mostrarProductos = true;
          setTimeout(() => {
            this.methods.scroll(document.getElementById('prod_bo'));
          }, 200);
        });
    } else {
      this.productosOfertaService
        .obtenerOfertas(categoriaSeleccionada)
        .subscribe((productos) => {
          //console.log('obteniendo productos genericos');
          this.listaProductos = productos;
          this.isLoading = false;
          this.mostrarProductos = true;
          setTimeout(() => {
            this.methods.scroll(document.getElementById('prod_bo'));
          }, 200);
        });
    }
  }

  encontrarPosicionSubcategoria(sub){
      for (const [i, value] of this.categoriaEscogida.listaSubCategorias.entries()) {
        if( value.codCategoria === sub[0].codCategoria){
          return i
        }
    }
  }

  habilitarMetodoPago(arg: boolean) {
    this.mostrarMedioPagos = false;
    if (this.productoElegido) {
    if(this.servicioCompartido.tipoLinea === '2'){
      this.validarDegradacion(arg);

    }else{
      this.omp
      .obtenerMetodosDePago(this.productoElegido,this.creditoSaldo.lblSaldoPrepago,this.identificadorUsuarioToBeRequestType)
      .subscribe((response) => {
        this.listaMetodosPago = response.listMetodoPago;
        this.obtenerMetodosPagoIdRespuesta = response.idRespuesta;

        this.mostrarMedioPagos = arg;
        setTimeout(() => {
          if (this.categoriaEscogida.codCategoria === '80') {
            this.methods.scroll(document.getElementById('gift-card-info'));
          } else {
            this.methods.scroll(document.getElementById('metodosDiv'));
          }
        }, 250);

      });}
      
    } else {
      this.mostrarMedioPagos = arg;
    }
  }
  compartirProdElegido(productoElegido: any) {
    console.log('productoElegido Sub:', productoElegido);
    this.productoElegido = productoElegido;
    this.comparteProd.emit(productoElegido);
  }

  habilitarConfirmacion(estado: boolean) {
    this.mostrarConfirma.emit(estado);
  }
}
