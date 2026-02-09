import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'precioDecimal'
})
export class PrecioDecimalPipe implements PipeTransform {

  transform(value) {
    if (value.length - (value.indexOf('.') + 1) === 1) {
        return value + '0';
    }

    return value;
  }
}
