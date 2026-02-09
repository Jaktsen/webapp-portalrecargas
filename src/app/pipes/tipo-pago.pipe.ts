import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'tipoPago'})
export class TipoPago implements PipeTransform {
  transform(value: string): string {
    let final = '';

    if (value === '1') {
        final = 'Claro puntos';
    } else if (value === '2') {
        final = 'Cargo en recibo';
    } else if (value === '3') {
        final = 'Tarjeta de crédito/débito';
    } else {
        final = 'Saldo de recarga';
    }

    return final;
  }
}
