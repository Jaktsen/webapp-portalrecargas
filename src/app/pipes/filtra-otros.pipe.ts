import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtraOtros'
})
export class FiltraOtrosPipe implements PipeTransform {

  transform(values: any): any {
    if (!values) { return []; }
    return values.filter(paqutes => paqutes.precio != 0);
  }

}
