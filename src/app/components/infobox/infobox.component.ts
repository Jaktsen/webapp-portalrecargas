import { MethodsService } from 'src/app/services/methods.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-infobox',
  templateUrl: './infobox.component.html',
  styleUrls: ['./infobox.component.scss']
})
export class InfoboxComponent implements OnInit {

  private theData;

  get data(): any {
    return this.theData;
  }

  @Input()
  set data(val: any) {
    console.log('previous item = ', this.theData);
    console.log('currently selected item=', val);
    this.theData = this.ms.prepareItemData(val);
  }

  constructor(private ms: MethodsService) { }

  ngOnInit() {
  }

}
