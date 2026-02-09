import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { GlobalObjectService } from "src/app/services/global-object.service";
import { ValidarCompraRoamingService } from "src/app/services/validar-compra-roaming.service";
import { ServicioCompartidoService } from "src/app/core/services/servicio-compartido.service";
import { ProductosOfertaService } from "src/app/services/productos-oferta.service";
import { Constantes } from "src/app/services/constants";
import { ObtenerMetodosPagoService } from "./../../../services/obtener-metodos-pago.service";
import { MethodsService } from "src/app/services/methods.service";
import { UiServiceService } from "src/app/services/ui-service.service";
import { ButtonBehavior } from "./../../../components/dialog/dialog.component";
import { ValidarDegradacionService } from "src/app/services/validar-degradacion.service";


@Component({
  selector: "app-roaming",
  templateUrl: "./roaming.component.html",
  styleUrls: ["./roaming.component.scss"],
})
export class RoamingComponent implements OnInit {
  @Input() categoriaEscogida: any;
  @Output() mostrarConfirma = new EventEmitter<boolean>();
  @Output() metodoSeleccionado = new EventEmitter<any>();
  @Output() compartirProductoElegidoChange = new EventEmitter<any>();
  @Input() creditoSaldo: any;

  resultJSRoaming: Observable<string>;

  paisElegido = new FormControl();
  opcionesPaises: Observable<any[]>;
  paisEscogido: any;
  paisesZona: any[];
  infoPopUp: any;
  nombrePopUp: any;
  paises: any = [];
  paisesRoamingSinFrontera: any;
  obtenerMetodosPagoIdRespuesta: any;
  listaMetodosPago: any;
  tipoMetodoPagoStar;

  paisInputLleno = false;
  modalPaises = false;
  mostrarProductosDiarios = false;
  mostrarProductosDias = false;
  mostrarProductosDiasMundial = false;
  mostrarMedioPagos = false;
  popUpGeneral = false;
  isRoamingPartePlan = false;
  zonaClaro = "";
  opcionesPaisesZona: any[] = [];
  mapaPais = "";
  listaProductosFiltrados = [];
  listaProductos = [];
  listaProductosMundiales = [];
  sinFronterasMsg = false;
  sinFronterasMsgMundial = false;
  hideDiario = false;
  hideMensual = false;
  hideMensualMundial = false;
  showContentDiarioMensual = false;
  zonaEuropa: any = ['47', '82', '53', '03', '123', '67', '142', '19', '13', '120', '58', '141', '74', '70', '36', '127'];
  planes289: any = ['1771', '1932', '2035', '2529', 'claroMax_289_CR2One', 'claroMax_28990_ILI_Ext_CROne', 'claroMax_28990_ILI_Promo_CR2One', 'MaxInt289SY_One'];
  zonaRoaming: any = { zone_code: "", country_code: "" };
  hideMapa = false;
  requestRoaming: any = {
    tipoVal: null,
    zone_code: null,
    tipoRoming: null,
    vigenciaProducto: null,
    idProductoDeCompra: null,
  };
  productoElegido = null;
  isLoadingMetodo = false;
  @Output() flagErrorService = new EventEmitter<any>(false);

  isDegradado: string;
  identificadorUsuarioToBeRequestType

  reqValidarDegradacion = {
    tipoLinea: '',
    codTipoLinea: '',
    idProductoServicio: '',
    admin: '',
    tmcode: '',
    flagPivot: '',
    idCategoria: ''
  }

  constructor(
    private globalObjectService: GlobalObjectService,
    private vcRoamingService: ValidarCompraRoamingService,
    public servicioCompartido: ServicioCompartidoService,
    private productosOfertaService: ProductosOfertaService,
    private uiService: UiServiceService,
    private methods: MethodsService,
    private omp: ObtenerMetodosPagoService,
    private validarDegradacionService: ValidarDegradacionService,
  ) {
    this.paises = this.globalObjectService.getObject('paisesRoaming');
    this.paisesRoamingSinFrontera = this.globalObjectService.getObject('paisesRoamingSinFrontera');
  }

  ngOnInit() {
    this.opcionesPaises = this.paisElegido.valueChanges.pipe(
      startWith(" "),
      map((value) => (typeof value === "string" ? value : value.country)),
      map((country) => (country ? this._filter(country) : this.paises.slice())),
    );
  }

  selectionMetodo(metodo: any) {
    this.metodoSeleccionado.emit(metodo);
  }

  displayFn(pais: any): string {
    return pais && pais.country ? pais.country : "";
  }

  private _filter(country: string): any[] {
    const filterValue = country.toLowerCase();
    return this.paises.filter(
      (option) => option.country.toLowerCase().indexOf(filterValue) === 0,
    );
  }

  keyPressFun(e: any) {
    if (e.keyCode === 13) {
      if (
        this.paises.filter(
          (option) =>
            option.country.toLowerCase() ===
            (this.paisElegido.value as string).toLowerCase(),
        ).length > 0
      ) {
        this.paisElegido.setValue(
          this.paises.filter(
            (option) =>
              option.country.toLowerCase() ===
              (this.paisElegido.value as string).toLowerCase(),
          )[0],
        );
        document.getElementById("paso2_titulo").click();
        this.paisElegidoFun();
      }
    } else if (e.keyCode === 8) {
      this.paisInputLleno = false;
      this.modalPaises = false;
      this.mostrarMedioPagos = false;
      this.mostrarProductosDiarios = false;
      this.mostrarProductosDias = false;
    }
  }

  validarCompraRoaming(tipoVal: any) {
    // this.servicioCompartido.tipoVal = tipoVal;
    this.requestRoaming.tipoVal = tipoVal;
    this.requestRoaming.zone_code = this.zonaRoaming.zone_code;
    this.vcRoamingService.validarProductodeCompraRoaming(
      this.requestRoaming,
      () => {
        const valRoaming = this.vcRoamingService.validarRoamingResponse;
        const idRespuesta = valRoaming.idRespuesta;
        if (valRoaming.errorService) {
          this.flagErrorService.emit(true)
        } else {
          if (Number(idRespuesta) === 0) {
            if (tipoVal == Constantes.WPSTipoClic.value.clicPaises) {
              this.revisarSinFronteras();
            } else if (tipoVal == Constantes.WPSTipoClic.value.clicDiario) {
              this.methods.scroll(document.getElementById("paso_4_roaming"));
            } else if (tipoVal == Constantes.WPSTipoClic.value.clicMensual) {
              this.methods.scroll(document.getElementById("paso_4_roaming"));
            }
          } else {
            if (Number(idRespuesta) > 0) {
              const data = {
                content:
                  valRoaming.mensaje != "" &&
                    valRoaming.mensaje != null &&
                    Number(idRespuesta) > 0 && idRespuesta != 6 && idRespuesta != 10
                    ? valRoaming.mensaje
                    : Constantes.MensajeGenerico,
                mainButtonBehavior: ButtonBehavior.SimplyClose,
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

  //WALKAROUND Revisar Planes 289 mostrar popup Qatar
  // sinFronterasMundial() {
  //   if (this.planes289.includes(this.servicioCompartido.codigoPlanTarifario) && (this.zonaRoaming.country_code == "122" || this.zonaRoaming.country_code == "44")) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  revisarSinFronteras() {

    //console.log("planRoaming", this.servicioCompartido.planRoaming);
    

    // if (this.sinFronterasMundial()) {

    //   this.sinFronterasMsg = true;
    //   this.sinFronterasMsgMundial = true;
    //   this.showContentDiarioMensual = false;
    //   this.opcionesPaisesZona = this.paises.filter(
    //     (opt) => this.zonaEuropa.includes(opt.country_code),
    //   );
    //   const data = {
    //     content:
    //       Constantes.WPSMensajeError.value.ROAMING_MENSAJE_FELICIDADES,
    //     mainButtonBehavior: ButtonBehavior.SimplyClose,
    //     title:
    //       Constantes.WPSMensajeError.value.ROAMING_TITULO_FELICIDADES +
    //       " Qatar y Emiratos Árabes Unidos!",
    //     buttonMessage: "Entendido",
    //     isInvertedButton: null,
    //     imagen: { path: "avion_roaming", pos: "up" },
    //   };
    //   this.uiService.openPopup(data);


    // } else {
      if (
        this.servicioCompartido.planRoaming == "" ||
        this.servicioCompartido.planRoaming == undefined
      ) {
        this.sinFronterasMsg = false;
        this.showContentDiarioMensual = true;
        if (this.zonaRoaming.country_code == "23" || this.zonaRoaming.country_code == "32" || this.zonaRoaming.country_code == "41") {
          this.sinFronterasMsg = false;
          this.showContentDiarioMensual = false;
          const data = {
            content:
              Constantes.WPSMensajeError.value.ROAMING_MENSAJE_FELICIDADES,
            mainButtonBehavior: ButtonBehavior.SimplyClose,
            title:
              Constantes.WPSMensajeError.value.ROAMING_TITULO_FELICIDADES +
              " " +
              this.zonaRoaming.country +
              "!",
            buttonMessage: "Entendido",
            isInvertedButton: null,
            imagen: { path: "avion_roaming", pos: "up" },
          };
          this.uiService.openPopup(data);



          this.hideMapa = false;
          // this.obtenerOfertasCompra(
          //   this.categoriaEscogida,
          //   this.zonaRoaming.zone_code,
          // );

        }
        else if (this.zonaRoaming.zone_code != "0") {
          this.hideMapa = true;
          this.obtenerOfertasCompra(
            this.categoriaEscogida,
            this.zonaRoaming.zone_code,
          );

        } else {
          this.showContentDiarioMensual = false;
        }
      } else if (
        this.servicioCompartido.planRoaming == "3661" ||
        this.servicioCompartido.planRoaming == "Beneficio_BSF"
      ) {
        let sinf = false;

        for (const paisSinFrontera of this.paisesRoamingSinFrontera) {
          if (
            this.zonaRoaming.country_code == paisSinFrontera.country_code &&
            this.zonaRoaming.country_code != "48"
          ) {
            sinf = true;
          }
        }

        if (this.zonaRoaming.zone_code != "0") {
          if (sinf) {
            const data = {
              content:
                Constantes.WPSMensajeError.value.ROAMING_MENSAJE_FELICIDADES,
              mainButtonBehavior: ButtonBehavior.SimplyClose,
              title:
                Constantes.WPSMensajeError.value.ROAMING_TITULO_FELICIDADES +
                " " +
                this.zonaRoaming.country +
                "!",
              buttonMessage: "Entendido",
              isInvertedButton: null,
              imagen: { path: "avion_roaming", pos: "up" },
            };
            this.uiService.openPopup(data);

            this.sinFronterasMsg = true;
            this.showContentDiarioMensual = false;
          } else {
            this.sinFronterasMsg = false;
            this.showContentDiarioMensual = true;
            this.obtenerOfertasCompra(
              this.categoriaEscogida,
              this.zonaRoaming.zone_code,
            );
          }
        }
      } else if (
        this.servicioCompartido.planRoaming == "4194" ||
        this.servicioCompartido.planRoaming == "BF2"
      ) {
        for (const paisSinFrontera of this.paisesRoamingSinFrontera) {
          if (this.zonaRoaming.country_code == paisSinFrontera.country_code) {
            var sinf = true;
          }
        }

        if (this.zonaRoaming.zone_code != "0") {
          if (sinf) {
            const data = {
              content:
                Constantes.WPSMensajeError.value.ROAMING_MENSAJE_FELICIDADES,
              mainButtonBehavior: ButtonBehavior.SimplyClose,
              title:
                Constantes.WPSMensajeError.value.ROAMING_TITULO_FELICIDADES +
                " " +
                this.zonaRoaming.country +
                "!",
              buttonMessage: "Entendido",
              isInvertedButton: null,
              imagen: { path: "avion_roaming", pos: "up" },
            };
            this.uiService.openPopup(data);

            this.sinFronterasMsg = true;
            this.showContentDiarioMensual = false;
          } else {
            this.sinFronterasMsg = false;
            this.showContentDiarioMensual = true;
            this.obtenerOfertasCompra(
              this.categoriaEscogida,
              this.zonaRoaming.zone_code,
            );
          }

        }
      }
    // }
  }


  obtenerOfertasCompra(categoriaSeleccionada: any, zona: any) {

    this.productosOfertaService
      .obtenerOfertas(categoriaSeleccionada, zona)
      .toPromise()
      .then((response: any) => {
        this.listaProductos = response;
       
        
        
        const listaProductosFiltradosDia = this.listaProductos.filter(
          
          (opt) => opt.vigencia === Constantes.WPSVigenciaRoaming.value.diario,
          
        );
        
        const listaProductosFiltradosMes = this.listaProductos.filter(
          (opt) => opt.vigencia !== Constantes.WPSVigenciaRoaming.value.diario,
        );
        
        this.hideDiario = false;
        this.hideMensual = false;
        this.hideMensualMundial = false;
        if (
          this.zonaRoaming.country_code == "23" || this.zonaRoaming.country_code == "32" || this.zonaRoaming.country_code == "41"
        ) {
          this.hideDiario = false;
          this.hideMensual = false;
        }
        if (
          listaProductosFiltradosDia.length > 0 &&
          this.zonaRoaming.zone != "Mundo"
        ) {
          this.hideDiario = true;
        }

        if (listaProductosFiltradosMes.length > 0) {
          this.hideMensual = true;
        }

        //console.log("Roaming " + this.zonaRoaming.country_code);


        // if (this.zonaRoaming.country_code == "122" || this.zonaRoaming.country_code == "44") {
        //   this.hideMensualMundial = false;
        //   this.hideMensual = true;
        // }
        // if (this.zonaRoaming.zone == "Claro Extendida") {
        //   if (this.zonaRoaming.country_code != "122" && this.zonaRoaming.country_code != "44") {
        //     this.hideMensual = true;
        //     this.hideDiario = true;
        //   } else {
        //     this.hideMensual = false;
        //     this.hideDiario = false;
        //   }
        //   this.hideMensualMundial = true;
        // }
        this.methods.scroll(document.getElementById("paso_3_roaming"));
      })
      .catch((err) => {
        console.error("error", err);
      });

    // PALIATIVO ZONA MUNDIALES
    this.productosOfertaService
      .obtenerOfertas(categoriaSeleccionada, "96")
      .toPromise()
      .then((response: any) => {
        this.listaProductosMundiales = response;

      }).catch((err) => {
        console.error("error", err);
      });
  }

  paisElegidoFun() {
    this.listaProductos = [];
    this.hideMapa = false;
    this.showContentDiarioMensual = false;
    this.mostrarProductosDias = false;
    this.mostrarProductosDiarios = false;
    this.mostrarMedioPagos = false;

    if (this.isRoamingPartePlan) {
      const data = {
        content:
          Constantes.WPSMensajeError.value.ROAMING_MENSAJE_PAQUETE_VIGENTE,
        mainButtonBehavior: ButtonBehavior.SimplyClose,
        title: Constantes.WPSMensajeError.value.ROAMING_TITULO_PAQUETE_VIGENTE,
        buttonMessage: "Entendido",
        isInvertedButton: null,
        imagen: null,
      };
      this.uiService.openPopup(data);
    } else {
      this.paisEscogido = this.paisElegido.value.country;
      this.zonaClaro = this.paisElegido.value.zone;
      this.zonaRoaming = this.paisElegido.value;
      window.sessionStorage.setItem("zone_code", this.zonaRoaming.zone_code);
      window.sessionStorage.setItem("zone_pais", this.zonaRoaming.country);

      if (this.zonaRoaming.zone_code != "0") {
        this.hideMapa = true;
        this.paisInputLleno = true;
      } else {
        this.hideMapa = false;
        this.paisInputLleno = true;
        this.showContentDiarioMensual = false;
      }

      this.servicioCompartido.tipoVal = Constantes.WPSTipoClic.value.clicPaises;
      this.validarCompraRoaming(Constantes.WPSTipoClic.value.clicPaises);

      if (
        this.servicioCompartido.planRoaming == "4194" ||
        this.servicioCompartido.planRoaming == "BF2"
      ) {
        this.opcionesPaisesZona = this.paises.filter(
          (opt) => opt.zone === this.zonaClaro,
        );
      } else {
        // if (this.zonaRoaming.zone_code == '7' && (this.zonaRoaming.country_code == '44' || this.zonaRoaming.country_code == '122')) {
        //   this.opcionesPaisesZona = this.paises.filter(
        //     (opt) => opt.zone === this.zonaClaro && opt.country_code != "48" && opt.country_code != "23" && opt.country_code != "32" && opt.country_code != "41",
        //   );
        // } else {
          this.opcionesPaisesZona = this.paises.filter(
            (opt) => opt.zone === this.zonaClaro && opt.country_code != "48" && opt.country_code != "23" && opt.country_code != "32" && opt.country_code != "41"
            //  && opt.country_code != "44" && opt.country_code != "122"
             ,
          );
        // }
      }

      if (this.isZonaClaroMapaUSA()) {
        this.mapaPais = "assets/img/ZonaClaroMapaUsa.jpg";
      } else if (this.isZonaClaroMapa()) {
        this.mapaPais = "assets/img/ZonaClaroMapa.jpg";
      } else if (this.isZonaClaroMapaUSA2()) {
        this.mapaPais = "assets/img/ZonaClaroMapaUsa.jpg";
      } else if (this.zonaClaro === "Claro Extendida") {
        this.mapaPais = "assets/img/ClaroExtendida.jpg";
      } else if (this.zonaClaro === "Mundo") {
        this.mapaPais = "assets/img/ClaroMundo.jpg";
      }

      window.scrollTo(0, document.body.scrollHeight);
    }
  }

  private isZonaClaroMapaUSA2() {
    return (
      this.zonaClaro === "Claro" &&
      (this.servicioCompartido.planRoaming == "4194" ||
        this.servicioCompartido.planRoaming == "BF2" ||
        this.servicioCompartido.planRoaming == "" ||
        this.servicioCompartido.planRoaming == undefined)
    );
  }

  private isZonaClaroMapa() {
    return (
      this.zonaClaro === "Claro" &&
      (this.servicioCompartido.planRoaming == "3661" ||
        this.servicioCompartido.planRoaming == "Beneficio_BSF") &&
      this.zonaRoaming.country_code != "48"
    );
  }

  private isZonaClaroMapaUSA() {
    return (
      this.zonaClaro === "Claro" &&
      (this.servicioCompartido.planRoaming == "3661" ||
        this.servicioCompartido.planRoaming == "Beneficio_BSF") &&
      this.zonaRoaming.country_code == "48"
    );
  }

  sortProductos(tipo: string) {
    this.mostrarProductosDiarios = false;
    this.mostrarProductosDias = false;
    this.mostrarProductosDiasMundial = false;
    this.mostrarMedioPagos = false;
    this.listaProductosFiltrados = [];



    // if (tipo === "MUNDIAL") {
    //   console.log('this.listaProductosMundiales', this.listaProductosMundiales);
      
    //   this.listaProductosFiltrados = this.listaProductosMundiales;
    // } else 

    if (tipo === "DIARIA") {
  
      
      this.listaProductosFiltrados = this.listaProductos.filter(
        (opt) => opt.tipoVigencia === tipo
      );
    } 
    // else {
    //   if (this.zonaRoaming.country_code == "122" || this.zonaRoaming.country_code == "44") {
    //     this.listaProductosFiltrados = this.listaProductosMundiales;
    //   } else {
    //     this.listaProductosFiltrados = this.listaProductos.filter(
    //       (opt) => opt.tipoVigencia === tipo
    //     );
    //   }
    // }
      this.listaProductosFiltrados = this.listaProductos.filter(
           (opt) => opt.tipoVigencia === tipo
        );
    this.requestRoaming.tipoRoming =
      Constantes.WPSVigenciaRoaming.value.mensual;
    this.requestRoaming.vigenciaProducto =
      Constantes.WPSVigenciaRoaming.value.mensual;
    this.validarCompraRoaming(Constantes.WPSTipoClic.value.clicMensual);

    //console.log("listaProductosFiltrados: ", this.listaProductosFiltrados);
    if (tipo === "MUNDIAL") {
      this.mostrarProductosDiasMundial = true;
    } else if (tipo === "DIARIA") {
      this.mostrarProductosDiarios = true;
    } else {
      this.mostrarProductosDias = true;
    }
  }

  compartirProdElegido(productoElegido: any) {
    this.productoElegido = productoElegido;
    this.compartirProductoElegidoChange.emit(productoElegido);
  }

  validarDegradacion(arg: any) {
    this.reqValidarDegradacion.tipoLinea = this.servicioCompartido.tipoLinea;
    this.reqValidarDegradacion.codTipoLinea = this.productoElegido.codTipoLinea;
    this.reqValidarDegradacion.idProductoServicio = this.servicioCompartido.idProductoServicio;
    this.reqValidarDegradacion.admin = this.servicioCompartido.isAdmin;
    this.reqValidarDegradacion.tmcode = this.servicioCompartido.codigoPlanTarifario;
    if (this.servicioCompartido.isONE) {
      this.reqValidarDegradacion.flagPivot = '1';
    } else {
      this.reqValidarDegradacion.flagPivot = '0';
    }
    this.reqValidarDegradacion.idCategoria = this.productoElegido.catnId;
    this.validarDegradacionService.validarDegradacionServ(() => {

      const idRespuesta = this.validarDegradacionService.validarDegradacionResponse.idRespuesta;
      if (idRespuesta === "0") {
        this.isDegradado = this.validarDegradacionService.validarDegradacionResponse.degradado;
        this.identificadorUsuarioToBeRequestType = this.validarDegradacionService.validarDegradacionResponse.IdentificadorUsuarioToBeRequestType
        if (this.isDegradado === "true") {
          this.omp.obtenerMetodosDePago(this.productoElegido, this.creditoSaldo.lblSaldoPrepago, this.identificadorUsuarioToBeRequestType).subscribe((response) => {
            this.listaMetodosPago = response.listMetodoPago;
            this.obtenerMetodosPagoIdRespuesta = response.idRespuesta;
            this.mostrarMedioPagos = arg;

          });
        }

      } else {
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


    }, this.reqValidarDegradacion);


  }


  habilitarMetodoPago(arg: boolean) {
    this.mostrarMedioPagos = false;
    this.isLoadingMetodo = true;
    if (this.productoElegido) {
      this.requestRoaming.idProductoDeCompra =
        this.productoElegido.idProductoDeCompra;
      this.requestRoaming.tipoVal = Constantes.WPSTipoClic.value.clicOfertas;
      this.requestRoaming.zone_code = this.zonaRoaming.zone_code;

      this.vcRoamingService.validarProductodeCompraRoaming(
        this.requestRoaming,
        () => {
          const valRoaming = this.vcRoamingService.validarRoamingResponse;
          const idRespuesta = valRoaming.idRespuesta;
          if (valRoaming.errorService) {
            this.flagErrorService.emit(true)
          } else {
            if (Number(idRespuesta) === 0) {

              if (this.servicioCompartido.tipoLinea === '2') {
                this.validarDegradacion(arg);

              } else {
                this.omp
                  .obtenerMetodosDePago(this.productoElegido, this.creditoSaldo.lblSaldoPrepago)
                  .subscribe((response) => {
                    this.listaMetodosPago = response.listMetodoPago;
                    this.tipoMetodoPagoStar = response.tipoMetodoPagoStar;
                    this.obtenerMetodosPagoIdRespuesta = response.idRespuesta;
                    this.mostrarMedioPagos = arg;
                  });
              }

            } else {
              if (Number(idRespuesta) > 0) {
                const mensajeValRoaming =
                  valRoaming.mensaje != "" &&
                    valRoaming.mensaje != null &&
                    Number(idRespuesta) > 0 && idRespuesta != 6 && idRespuesta != 10
                    ? valRoaming.mensaje
                    : Constantes.MensajeGenerico;
                const data = {
                  content: mensajeValRoaming,
                  mainButtonBehavior: ButtonBehavior.SimplyClose,
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
    } else {
      this.mostrarMedioPagos = arg;
    }
  }

  terminarLoading(event: any) {
    this.isLoadingMetodo = !event;
  }

  cerrarPopUp(est: any) {
    this.popUpGeneral = est;
  }

  habilitarConfirmacion(estado: any) {
    this.mostrarConfirma.emit(estado);
  }

}
