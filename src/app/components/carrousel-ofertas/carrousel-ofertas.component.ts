import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ServicioCompartidoService } from 'src/app/core/services/servicio-compartido.service';
import { Constantes } from 'src/app/services/constants';
import { WcmService } from '../../services/wcm.service';
import { DataLayerService } from '../../services/data-layer.service';
export interface CarrouselWCM {
  Imagen_desktop: string;
  Imagen_tablet: string;
  Imagen_mobile: string;
  canales: string;
  tipoCliente: string;
  tipoLinea: string;
  activo: string;
  prioridad: string;
  urlOferta: string;
  nombre: string;
  idCarrouselOfertas: string;
}

@Component({
  selector: 'app-carrousel-ofertas',
  templateUrl: './carrousel-ofertas.component.html',
  styleUrls: ['./carrousel-ofertas.component.scss']
})
export class CarrouselOfertasComponent implements OnInit {
  listaCarrouselOfertas: CarrouselWCM[];

  limit = false;

  step = 0;

  nextArrow: string = Constantes.Arrows['next-active'];
  previousArrow: string = Constantes.Arrows['previous'];


  constructor(private wcmService: WcmService, public servicioCompartido: ServicioCompartidoService, private dataLayer: DataLayerService) {
    this.listaCarrouselOfertas = wcmService.listaCarrousel;
    this.listaCarrouselOfertas = this.filtrarCarrouselEstado();
  }

  ngOnInit() {
    console.log(this.servicioCompartido);
    console.log(this.listaCarrouselOfertas);
    this.listaCarrouselOfertas = this.filtrarCarrouselCanales();
    this.listaCarrouselOfertas = this.filtrarCarrouselClienteTipoLinea();
    // Activa las flechas
    if (this.listaCarrouselOfertas.length > 5) {
      this.limit = true;
    } else {
      this.limit = false;
    }
    this.listaCarrouselOfertas.sort((a, b) => parseInt(a.prioridad) - parseInt(b.prioridad));
  }

  filtrarCarrouselEstado() {
    return this.listaCarrouselOfertas.filter(f => f.activo === '1');
  }

  filtrarCarrouselCanales() {
    const carrouselFiltradoCanales: CarrouselWCM[] = [];
    this.listaCarrouselOfertas.map(m => {
      // console.log(m);
      if (m.canales != 'Todos los canales') {
        m.canales.split(',').forEach(canal => {
          canal.split(' ', 1).forEach(codigoCanal => {
            // console.log(codigoCanal + " == " + this.servicioCompartidoCarrousel.canal);
            if (codigoCanal === this.servicioCompartido.canal) {
              carrouselFiltradoCanales.push(m);
            }
          });
        });
      } else {
        carrouselFiltradoCanales.push(m);
      }
    });
    return carrouselFiltradoCanales;
  }


  filtrarCarrouselClienteTipoLinea() {
    const carrouselFiltradoClienteTipoLinea = [];
    this.listaCarrouselOfertas.map(m => {
      console.log(m);
      m.tipoCliente.split('|').forEach(t => {
        // console.log(t + " == " + this.servicioCompartido.tipoLinea);
        if (t === this.servicioCompartido.tipoLinea) {
          m.tipoLinea.split('|').forEach(tl => {
            // console.log(tl + " == " + this.servicioCompartido.codigoTipoLinea);
            if (tl === this.servicioCompartido.codigoTipoLinea) {
              carrouselFiltradoClienteTipoLinea.push(m);
            }
          });
        }
      });
    });
    return carrouselFiltradoClienteTipoLinea;
  }

  move(action: boolean) {
    if (action) {
      document.getElementById('carrousel').scrollLeft += 150;
      if (this.step != this.listaCarrouselOfertas.length - 4) {
        this.step++;
      }
    } else {
      document.getElementById('carrousel').scrollLeft -= 150;
      if (this.step != 0) {
        this.step--;
      }
    }

    // console.log("step", this.step);
    this.setUpArrows();

  }

  setUpArrows() {
    // Verifica el limite del carrousel
    if (this.step == this.listaCarrouselOfertas.length - 4) {
      this.previousArrow = Constantes.Arrows['previous-active'];
      this.nextArrow = Constantes.Arrows['next'];
    } else if (this.step == 0) {
      this.previousArrow = Constantes.Arrows['previous'];
      this.nextArrow = Constantes.Arrows['next-active'];
    } else if (this.step > 0) {
      this.previousArrow = Constantes.Arrows['previous-active'];
      this.nextArrow = Constantes.Arrows['next-active'];
    }
  }

  clickEventCarrousel(nombreElemento: string, nombreImagen: string) {
    console.log('ClickCarrousel-');
    const dataImg = nombreImagen.split('/');
    const imgName = dataImg[dataImg.length - 1].split('?');
    const nombreEl = nombreElemento.toLowerCase();
    const categoriaEle = nombreElemento.toLowerCase();
    this.dataLayer.gtm_Event_carrousel('compras_banner_productos_servicios_click', nombreEl, categoriaEle, imgName[0]);
  }
}
