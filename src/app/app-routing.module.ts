import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompraConfirmaComponent } from './pages/compra-confirma/compra-confirma.component';
import { HomeComponent } from './pages/home/home.component';
import { InicioComponent } from './pages/inicio/inicio.component';



const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'home', component: HomeComponent, children: [ {path: '**', component: HomeComponent} ] },
  { path: 'confirma', component: CompraConfirmaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true , onSameUrlNavigation: 'reload' }
  )],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
