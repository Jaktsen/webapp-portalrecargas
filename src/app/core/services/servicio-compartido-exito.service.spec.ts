import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ServicioCompartidoExitoService } from './servicio-compartido-exito.service';

describe('ServicioCompartidoExitoService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
    ]

  }));

  it('should be created', () => {
    const service: ServicioCompartidoExitoService = TestBed.get(ServicioCompartidoExitoService);
    expect(service).toBeTruthy();
  });
});
