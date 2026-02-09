import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'filtrarNombrePaquete'})
export class FiltrarNombrePaquete implements PipeTransform {
  transform(value: string): string {
    let final = '';

    if (value.includes('Llamadas y SMS Ilimitadas') || value.includes('Paquetes de SMS')) {
      final = 'Minutos y SMS';
    } else if (value.includes('Paquetes de')) {
        final = value.replace('Paquetes de ', '');
    } else if (value.includes('Paquetes')) {
        final = value.replace('Paquetes ', '');
    }  else {
        final = value;
    }

    return final;
  }
}
