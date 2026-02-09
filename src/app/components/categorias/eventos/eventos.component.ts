import { ObtenerMetodosPagoService } from './../../../services/obtener-metodos-pago.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MethodsService } from 'src/app/services/methods.service';
import { WcmService } from 'src/app/services/wcm.service';
import { Constantes } from 'src/app/services/constants';
import { ProductosOfertaService } from 'src/app/services/productos-oferta.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent implements OnInit {
  @Input() categoriaEscogida: any;
  @Output() mostrarConfirma = new EventEmitter<boolean>();
  @Output() compartirEvento = new EventEmitter<any>();

  productoEscogido: any;
  idProdEscogido: any;
  terminosProducto: any;
  eventoEscogido: any;
  idEventoEscogido: any;
  colorCat: any;
  listaEventos: any;
  terminosEventos: any;
  listaWCMOpciones: any;


  mostrarConEventProduct: any;

  listaEventosProd: any = [];
  canjesEventos: any = [];
  isLoading = false;
  todasProd = true;
  todasCanje = true;
  mostrarMedioPagoEvento = false;
  mostrarConsideracionesEvento = false;
  tipoMetodoPagoStar;


  @Input() creditoSaldo: any;
  listaMetodosPago;
  obtenerMetodosPagoIdRespuesta: any;

  constructor(
    private wcmService: WcmService,
    private methods: MethodsService,
    private productosOfertaService: ProductosOfertaService,
    private omp: ObtenerMetodosPagoService
  ) {
    this.listaEventos = this.wcmService.listaWCMEvents;
    this.terminosEventos = this.wcmService.terminos.canje_eventos;
    this.listaWCMOpciones = this.wcmService.listaWCMOpciones;
  }

  ngOnInit() {
    this.colorCat = this.categoriaEscogida.codCategoria;
    const tempoLista = this.methods.converToArray(
      this.categoriaEscogida.listaSubCategorias
    );

    tempoLista.forEach((ele) => {
      this.listaEventos.forEach((eve) => {
        if (ele.codCategoria === eve.subcategoryID) {
          ele.wcm = eve;
          this.listaEventosProd.push(ele);
        }
      });
    });

    //console.log(this.listaEventosProd);
  }

  escogerProd(product: any, i: any) {
    const eventoEsc = {
      nombre: product.wcm.nombreEvento,
      fecha: product.wcm.fechaEvento,
      condiciones: product.wcm.LinkCondicionesSorteo,
      sorteo: product.wcm.fechaSorteo
    };
    window.sessionStorage.setItem('eventoEsc', JSON.stringify(eventoEsc));

    this.isLoading = true;
    if (this.productoEscogido !== undefined) {
      document
        .getElementById('prod_' + this.idProdEscogido)
        .classList.remove('color_' + this.categoriaEscogida.codCategoria);
    }

    this.idProdEscogido = i;
    this.productoEscogido = product;
    document
      .getElementById('prod_' + i)
      .classList.add('color_' + this.categoriaEscogida.codCategoria);

    const tempoLista = this.methods.converToArray(
      this.categoriaEscogida.listaSubCategorias
    );

    tempoLista.forEach((ele) => {
      if (ele.codCategoria === product.wcm.subcategoryID) {
        this.productosOfertaService
          .obtenerOfertas(ele)
          .toPromise()
          .then((response: any) => {
            //console.log('Response', response);
            this.filtarOpcionesEvento(response);
          })
          .catch((err) => {
            console.error('error', err);
          });
      }
    });
  }

  filtarOpcionesEvento(anb: any) {
    this.canjesEventos = [];

    anb.forEach(ele => {
      this.listaWCMOpciones.forEach(opc => {
        if (opc.DBProductCode === ele.codigoProducto) {
          ele.wcm = opc;
          this.canjesEventos.push(ele);
        }
      });
    });

    this.isLoading = false;
    this.todasProd = false;

    setTimeout(() => {
      this.methods.scroll(document.getElementById('eventoProdBox'));
    }, 1000);
  }

  escogerCanje(evento: any, i: any) {
    if (this.eventoEscogido !== undefined) {
      document
        .getElementById('canje_' + this.idEventoEscogido)
        .classList.remove('color_' + this.categoriaEscogida.codCategoria);
    }

    this.idEventoEscogido = i;
    this.eventoEscogido = evento;
    document
      .getElementById('canje_' + i)
      .classList.add('color_' + this.categoriaEscogida.codCategoria);

    this.todasCanje = false;
    // this.isLoading = true;
    this.mostrarMedioPagoEvento = false;

    if (evento) {
      this.omp.obtenerMetodosDePago(evento,this.creditoSaldo.lblSaldoPrepago).subscribe((response) => {
        this.listaMetodosPago = response.listMetodoPago;
        this.tipoMetodoPagoStar = response.tipoMetodoPagoStar;
        this.obtenerMetodosPagoIdRespuesta = response.idRespuesta;
        this.mostrarMedioPagoEvento = true;
      });
    }

    setTimeout(() => {
      this.methods.scroll(document.getElementById('metodoPagoBox'));
    }, 1000);
  }

  mostrarConEvent(prod: any) {
    this.mostrarConEventProduct = prod;
    if (
      prod.wcm.subcategoryID === Constantes.WPSCategoriasDeCompra.canjeEventosSub1
    ) {
      this.terminosProducto = this.terminosEventos.evento_1;
    } else if (
      prod.wcm.subcategoryID === Constantes.WPSCategoriasDeCompra.canjeEventosSub2
    ) {
      this.terminosProducto = this.terminosEventos.evento_2;
    } else if (
      prod.wcm.subcategoryID === Constantes.WPSCategoriasDeCompra.canjeEventosSub3
    ) {
      this.terminosProducto = this.terminosEventos.evento_3;
    } else if (
      prod.wcm.subcategoryID === Constantes.WPSCategoriasDeCompra.canjeEventosSub4
    ) {
      this.terminosProducto = this.terminosEventos.evento_4;
    } else if (
      prod.wcm.subcategoryID === Constantes.WPSCategoriasDeCompra.canjeEventosSub5
    ) {
      this.terminosProducto = this.terminosEventos.evento_5;
    } else {
      this.terminosProducto = null;
    }

    this.mostrarConsideracionesEvento = true;
  }

  cerrarPopup() {
    this.mostrarConsideracionesEvento = false;
  }

  regresarProductos() {
    this.todasProd = true;
    this.todasCanje = true;
    this.mostrarMedioPagoEvento = false;
  }

  regresarCanje() {
    this.todasCanje = true;
    this.mostrarMedioPagoEvento = false;
  }

  habilitarConfirmacion(estado: any) {
    const eventoEs = {
      evento: this.productoEscogido,
      oportunidad: this.eventoEscogido
    };

    //console.log('eventoEs: ', eventoEs);
    this.compartirEvento.emit(eventoEs);
    this.mostrarConfirma.emit(estado);
  }

}
