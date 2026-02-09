import { GlobalObjectService } from './../../services/global-object.service';
import { Component, OnInit } from '@angular/core';
import { Constantes } from 'src/app/services/constants';

@Component({
  selector: 'app-visita-mi-claro-web',
  templateUrl: './visita-mi-claro-web.component.html',
  styleUrls: ['./visita-mi-claro-web.component.scss']
})
export class VisitaMiClaroWebComponent implements OnInit {

  constructor(private go: GlobalObjectService) { }

  ngOnInit() {
  }
  goToLink() {
    this.go.goToLink(Constantes.VisitaMiClaroWebUrl);
  }
}
