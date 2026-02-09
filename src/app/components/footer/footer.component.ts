
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input() mostrarContenido: boolean;

  year: any;

  constructor() { }

  ngOnInit() {
    const today = new Date();
    this.year = today.getFullYear();
  }

}
