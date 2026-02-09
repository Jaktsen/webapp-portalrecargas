import { PopupService } from 'src/app/services/popup.service';
import { WcmService } from '../../services/wcm.service';
import { Constantes } from '../../services/constants';
import { Router } from '@angular/router';
import { GlobalObjectService } from './../../services/global-object.service';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-recomendados',
    templateUrl: './recomendados.component.html',
    styleUrls: ['./recomendados.component.scss']
})
export class RecomendadosComponent implements OnInit, OnChanges {

    @Input() tituloCarousel: string;
    @Input() nombre: string;
    @Input() listProductos: any[];
    @Input() carouselAbierto: string;
    @Input() disabled: boolean;

    @Output() abrirFlujoCarouselEvent = new EventEmitter<string>();
    @Output() recomendadoSelectionEvent = new EventEmitter<any>();

    maximoEspacio = 0;
    minimaCantidadCaracteres = 45;
    minima2CantidadCaracteres = 30;
    slideLeft = 0;
    btnNext = true;
    btnPrev = false;
    mostrarRecomendacion = false;
    recomendadosListos = false;
    portalRecargas = '2';

    recEscogido: any;
    idRecEscogido: any;
    today: any;
    recomendacionModal: any;
    listaRecomendadosWCM: any[];
    listaIdProducto: any[] = [];

    listaRecomendados: any[];

    enableRecomendados:boolean;

    constructor(private wcmService: WcmService,
        private router: Router,
        private go: GlobalObjectService, private popupService: PopupService) {
        this.listaRecomendados = this.go.getObject('ordenarRecomendados');
    }

    ngOnInit() {

        console.warn("Lista recomendados ordenada", this.listaRecomendados);


        this.listaRecomendadosWCM = this.evalucionRecomendados(this.wcmService.listaRecomendado);
        this.listProductos = this.evaluacionPontis(this.listProductos);

        console.warn("lista de productos recomendados", this.listProductos);

        this.listProductos = this.filtrarRecomendados(this.listProductos);

        // this.listProductos = this.listProductos.sort((a, b) =>  Number(a.recomendadoCategoriaOrden) - Number(b.recomendadoCategoriaOrden));

        console.warn("lista de productos recomendados ordenados", this.listProductos);


        // console.warn("lista de productos recomendados FILTER", this.listProductos.filter(l => l.idProductoDeCompra == ));

        if (this.listProductos.length > 0) {
            this.enableRecomendados = true;
            this.listProductos.forEach(rec => {

                rec.nombreCompleto = '';

                rec.listaCaracteristicasProducto.forEach(carac => {
                    if (carac.estilo.includes('titulo_rojo') || carac.estilo.includes('titulo_blanco')) {
                        rec.nombreCompleto = rec.nombreCompleto + ' ' + carac.nombre;
                    } else {
                        if (carac.nombre.includes('S/')) {
                            rec.precioCompleto = carac.nombre.slice(carac.nombre.match('S/').index, carac.nombre.length);

                            if (!rec.precioCompleto.includes('.')) {
                                rec.precioCompleto = rec.precioCompleto + '.00';
                            }
                        } else {
                            rec.tiempoCompleto = carac.nombre;
                        }
                    }
                });

                for (const recEle of this.listaRecomendadosWCM) {
                    const seleccion = recEle.seleccion.split('|');
                    if (seleccion.includes(rec[recEle.identificador])) {
                        rec.fondoImagen = recEle.ImagenFondo;
                        rec.color = recEle.colorTexto;
                        break;
                    }
                }
            });

            this.popupService.currentActionMessage.subscribe(message => {
                if (message.indexOf('action_recomendados_') > -1) {
                    const promoIdProductoDeCompra = message.split('_')[2];
                    const filteredProducts = this.listProductos.filter(prod => prod.idProductoDeCompra == promoIdProductoDeCompra);
                    if (filteredProducts.length > 0) {
                        const promoProduct = filteredProducts[0];
                        this.escogerCard(promoProduct, this.disabled);
                    }
                    this.popupService.changeActionMessage('');
                }
            });

            const today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const yyyy = today.getFullYear();
            this.today = mm + '/' + dd + '/' + yyyy;

            this.maximoEspacio = window.innerWidth > 776 ? 776 : window.innerWidth;
            this.btnNext = (this.listProductos.length * 212) < this.maximoEspacio ? false : true;
            this.recomendadosListos = true;
        } else {
            this.enableRecomendados = false;
            //console.log("listaProductos " + this.listProductos);

        }
    }

    ngOnChanges(cambios: SimpleChanges) {
        if (this.carouselAbierto !== 'recomendados' && this.recEscogido !== undefined) {
            document.getElementById('rec_' + this.idRecEscogido).style.border = 'solid 1px rgba(33, 33, 33, 0.03)';
            document.getElementById('rec_' + this.idRecEscogido).classList.remove('color_' + this.recEscogido.catvCodCategoria);
        }
    }

    evaluacionPontis(listProductos: any[]) {
        const listaFinal = [];

        for (const rec of listProductos) {
            if (!this.listaIdProducto.includes(rec.idProductoDeCompra)) {
                this.listaIdProducto.push(rec.idProductoDeCompra);
                listaFinal.push(rec);
            } else {
                const indexLista = this.listaIdProducto.indexOf(rec.idProductoDeCompra);
                if (listaFinal[indexLista].flagPontis == '1' && rec.flagPontis == '0') {
                    listaFinal[indexLista] = rec;
                }
            }
        }
        return listaFinal;
    }

    evalucionRecomendados(listaRecomendadoWCM: any[]) {
        const listaEvaluada = [];

        for (const rec of listaRecomendadoWCM) {
            if (rec.activoFlag == '1') {
                const fechaIni = this.parseFecha(rec.fechaHoraInicio);
                const fechaFin = this.parseFecha(rec.fechaHoraFin);
                if ((Date.now() >= fechaIni && Date.now() <= fechaFin)) {
                    listaEvaluada.push(rec);
                }
            }
        }

        listaEvaluada.sort((a, b) => (a.prioridad > b.prioridad) ? 1 : -1);
        return listaEvaluada;
    }

    private parseFecha(fechaHora) {
        return Date.parse(fechaHora.split('/')[1] + '/' + fechaHora.split('/')[0] + '/' + fechaHora.split('/')[2]);
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
            el.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
    }

    escogerCard(item: any, option: boolean) {
        if (option) {
            this.flujoFav('N');

            if (this.recEscogido !== undefined) {
                document.getElementById('rec_' + this.idRecEscogido).style.border = 'solid 1px rgba(33, 33, 33, 0.03)';
                document.getElementById('rec_' + this.idRecEscogido).classList.remove('color_' + this.idRecEscogido.catvCodCategoria);
            }

            this.recEscogido = item;
            this.idRecEscogido = item.idProductoDeCompra;
            this.abrirFlujoCarouselEvent.emit('recomendados');
            document.getElementById('rec_' + this.idRecEscogido).style.border = 'solid 2px';
            document.getElementById('rec_' + this.idRecEscogido).classList.add('color_' + item.catvCodCategoria);

            this.recomendadoSelectionEvent.emit(item);
        }
    }

    getObtenerFondoRecomendados(producto: any) {
        if (producto.fondoImagen != null && producto.fondoImagen != undefined) {
            return 'url(' + producto.fondoImagen + ')';
        } else {
            return null;
        }
    }

    getObtenerRecomendados(producto: any) {
        if (producto.fondoImagen != null && producto.fondoImagen != undefined) {
            return true;
        } else {
            return false;
        }
    }

    flujoFav(indicador: any) {
        this.go.sessionStorageSave(Constantes.flagFav, indicador);
    }

    cerrarPopUp() {
        this.mostrarRecomendacion = false;
    }

    filtrarRecomendados(listProductos: any[]) {
        const listaFinal = [];

        if (this.listaRecomendados !== undefined) {
            for (const r of this.listaRecomendados) {
                for (const p of listProductos) {
                    if (p.idProductoDeCompra === r) {
                        listaFinal.push(p);
                    }
                }
            }
        }

        return listaFinal;
    }

}
