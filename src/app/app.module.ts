import { BrowserModule } from "@angular/platform-browser";
import { LOCALE_ID, NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatSnackBarModule,
} from "@angular/material";
import { BlockCopyPasteDirectiveDirective } from "./directives/block-copy-paste-directive.directive";
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from "./pages/home/home.component";
import { CompraConfirmaComponent } from "./pages/compra-confirma/compra-confirma.component";
import { InicioComponent } from "./pages/inicio/inicio.component";
import { NumeroCapchaComponent } from "./components/numero-capcha/numero-capcha.component";
import { RecomendadosComponent } from "./components/recomendados/recomendados.component";
import { FavoritosComponent } from "./components/favoritos/favoritos.component";
import { MetodosPagoComponent } from "./components/metodos-pago/metodos-pago.component";
import { FooterComponent } from "./components/footer/footer.component";
import { CategoriasComponent } from "./components/categorias/categorias.component";
import { SubcategoriasComponent } from "./components/categorias/subcategorias/subcategorias.component";
import { RoamingComponent } from "./components/categorias/roaming/roaming.component";
import { ProductosComponent } from "./components/categorias/productos/productos.component";
import { SafeHTMLPipe } from "./pipes/safe-html.pipe";
import { BannerDescargaComponent } from "./components/banner-descarga/banner-descarga.component";
import { ConfirmacionComponent } from "./components/confirmacion/confirmacion.component";
import { RecargasComponent } from "./components/recargas/recargas.component";
import { EventosComponent } from "./components/categorias/eventos/eventos.component";
import { PopupGeneralComponent } from "./components/popup-general/popup-general.component";
import { FiltraOtrosPipe } from "./pipes/filtra-otros.pipe";
import { VisitaMiClaroWebComponent } from "./components/visita-mi-claro-web/visita-mi-claro-web.component";
import { DatePipe, DecimalPipe, SlicePipe } from "@angular/common";
import { InfoboxComponent } from "./components/infobox/infobox.component";
import localeEsPe from "@angular/common/locales/es-PE";
import { registerLocaleData } from "@angular/common";
import { PrecioDecimalPipe } from "./pipes/filtra-precios.pipe";
import { FiltrarNombrePaquete } from "./pipes/filtra-paquetes.pipe";
import { TipoPago } from "./pipes/tipo-pago.pipe";
import { SnackBarPopComponent } from "./components/snack-bar-pop/snack-bar-pop.component";
import { DialogComponent } from "./components/dialog/dialog.component";
import { ErrorComponent } from "./components/error/error.component";
import { PopupPromocionesComponent } from "./components/popup-promociones/popup-promociones.component";
import { FiltraMetodosPipe } from "./pipes/filtra-metodos.pipe";
import { CarrouselOfertasComponent } from './components/carrousel-ofertas/carrousel-ofertas.component';

registerLocaleData(localeEsPe, "es-PE");

@NgModule({
  declarations: [
    AppComponent,
    BlockCopyPasteDirectiveDirective,
    HomeComponent,
    CompraConfirmaComponent,
    InicioComponent,
    NumeroCapchaComponent,
    RecomendadosComponent,
    FavoritosComponent,
    MetodosPagoComponent,
    FooterComponent,
    CategoriasComponent,
    SubcategoriasComponent,
    RoamingComponent,
    ProductosComponent,
    SafeHTMLPipe,
    BannerDescargaComponent,
    ConfirmacionComponent,
    RecargasComponent,
    EventosComponent,
    PopupGeneralComponent,
    FiltraOtrosPipe,
    VisitaMiClaroWebComponent,
    InfoboxComponent,
    PrecioDecimalPipe,
    FiltrarNombrePaquete,
    TipoPago,
    SnackBarPopComponent,
    DialogComponent,
    ErrorComponent,
    PopupPromocionesComponent,
    FiltraMetodosPipe,
    CarrouselOfertasComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatSnackBarModule,
  ],
  providers: [
    DatePipe,
    SlicePipe,
    DecimalPipe,
    PrecioDecimalPipe,
    { provide: LOCALE_ID, useValue: "es-PE" },
  ],
  bootstrap: [AppComponent],
  entryComponents: [SnackBarPopComponent, DialogComponent],
})
export class AppModule {}
