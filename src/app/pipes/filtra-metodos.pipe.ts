import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtraMetodos'
})
export class FiltraMetodosPipe implements PipeTransform {

  transform(value: any[], esLineaPrepago: any): any {
    //console.log("metodoPago ", value);
    
    return value.length > 0 ? value.filter(m => !(esLineaPrepago && m.tipoMetodoPago=="2")) : value;
  }

}
