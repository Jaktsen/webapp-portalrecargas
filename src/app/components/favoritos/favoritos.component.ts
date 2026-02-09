import { Constantes } from 'src/app/services/constants';
import { ProductosFavoritosService } from './../../services/productos-favoritos.service';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { SnackBarPopComponent } from '../snack-bar-pop/snack-bar-pop.component';
import { MatSnackBar } from '@angular/material';
import { ServicioCompartidoService } from '../../core/services/servicio-compartido.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss']
})
export class FavoritosComponent implements OnInit, OnChanges {

  @Input() tituloCarousel: string;
  @Input() nombre: string;
  @Input() listProductos: any[];
  @Input() carouselAbierto: string;
  @Input() disabled: boolean

  @Output() abrirFlujoCarouselEvent = new EventEmitter<string>();
  @Output() favoriteSelectionEvent = new EventEmitter<any>();
  @Output() eliminarFavoritoEvent = new EventEmitter<any>();

  favEscogido: any;
  idFavEscogido: any;
  favParaBorrar: any;

  maximoEspacio = 0;
  slideLeft = 0;
  minimaCantidadCaracteres = 45;
  btnNext = true;
  btnPrev = false;
  mostrarBorrarFav = false;

  constructor(private productosFavoritosService: ProductosFavoritosService, private snackBar: MatSnackBar,public servicioCompartido: ServicioCompartidoService) { }

  ngOnInit() {
    this.listProductos.forEach(fav => {
      fav.nombreCompleto = '';

      fav.listaCaracteristicasProducto.forEach(carac => {
         if (carac.estilo.includes('titulo_rojo')) {
          fav.nombreCompleto = fav.nombreCompleto + ' ' + carac.nombre;
         } else {
           if (carac.nombre.includes('S/')) {
            fav.precioCompleto = carac.nombre.slice(carac.nombre.match('S/').index, carac.nombre.length);

            if (!fav.precioCompleto.includes('.')) {
              fav.precioCompleto = fav.precioCompleto + '.00';
            }
           } else {
             fav.tiempoCompleto = carac.nombre;
           }
         }
       });
    });

    this.maximoEspacio = window.innerWidth > 776 ? 776 : window.innerWidth;
    this.btnNext = (this.listProductos.length * 212) < this.maximoEspacio ? false : true;
  }

  ngOnChanges() {
    if (this.carouselAbierto !== 'favoritos' && this.favEscogido !== undefined) {
      document.getElementById('fav_' + this.idFavEscogido).style.border = 'solid 1px rgba(33, 33, 33, 0.03)';
      document.getElementById('fav_' + this.idFavEscogido).classList.remove('color_' + this.favEscogido.catvCodCategoria);
    }
  }

  move(num: string) {
    const espacioAncho = document.getElementById(this.nombre + '_espacio').clientWidth;
    const slideAncho = document.getElementById(this.nombre + '_slide').clientWidth;
    const anchoCard = 196;

    if (num === '1') {
      this.slideLeft = (this.slideLeft + anchoCard) > 0 ? 0 : this.slideLeft + anchoCard;
      this.btnPrev = (this.slideLeft + anchoCard) > 0 ? false : true;
      this.btnNext = true;
    } else {
      this.slideLeft = (espacioAncho - this.slideLeft) > slideAncho ? espacioAncho - slideAncho : this.slideLeft - anchoCard;
      this.btnNext = (espacioAncho - this.slideLeft) > slideAncho ? false : true;
      this.btnPrev = true;
    }

    document.getElementById(this.nombre + '_slide').style.left = this.slideLeft + 'px';
  }

  scroll(el: HTMLElement) {
    if (el) {
      el.scrollIntoView({block: 'start', behavior: 'smooth'});
    }
  }

  eliminarFavorito(event, prod: any, active:boolean) {
    if(active) { 
    event.stopPropagation();
    this.mostrarBorrarFav = true;
    this.favParaBorrar = prod;
     }
  }

  escogerCard(item: any, k: any, active:boolean) {
    if(active){ 
    this.productosFavoritosService.flujoFav('S');
    if (this.favEscogido !== undefined) {
      document.getElementById('fav_' + this.idFavEscogido).style.border = 'solid 1px rgba(33, 33, 33, 0.03)';
      document.getElementById('fav_' + this.idFavEscogido).classList.remove('color_' + this.favEscogido.catvCodCategoria);
    }

    this.favEscogido = item;
    this.idFavEscogido = k;
    this.abrirFlujoCarouselEvent.emit('favoritos');
    document.getElementById('fav_' + k).style.border = 'solid 2px';
    document.getElementById('fav_' + k).classList.add('color_' + item.catvCodCategoria);

    this.favoriteSelectionEvent.emit(item);
     }
  }

  tamanoTiempo(tiempo: string) {
    if (tiempo.length > 9) { return true; }

    return false;
  }

  shouldReducePriceSize(prod) {
    try {
      return prod.precioCompleto.length >= 9 || prod.catvCodCategoria == Constantes.WPSCategoriasDeCompra.internetRoaming;
    } catch (Exception) {
      return false;
    }
  }

  closePopUpFav(num: string) {
    if (num === '1') {
      this.favParaBorrar = null;
      this.mostrarBorrarFav = false;
    } else {
      this.eliminarFavoritoEvent.emit(this.favParaBorrar);
      this.favParaBorrar = null;
      this.mostrarBorrarFav = false;

      const data = {
        mensaje: 'Compra favorita <b>eliminada exitosamente</b>',
        lineas: '1'
      };

      this.snackBar.openFromComponent(SnackBarPopComponent, {
        data,
        duration: 10000,
        panelClass: ['estilo_caja_fav']
      });
    }
  }
}
