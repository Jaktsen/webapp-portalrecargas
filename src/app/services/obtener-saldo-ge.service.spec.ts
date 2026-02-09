import { TestBed } from '@angular/core/testing';

import { ObtenerSaldoGEService } from './obtener-saldo-ge.service';

describe('ObtenerSaldoGEService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('Debe de crear', () => {
    const mockService = jasmine.createSpyObj(['post']);
    // const service: ObtenerSaldoGEService = TestBed.get(ObtenerSaldoGEService);
    const service: ObtenerSaldoGEService = new ObtenerSaldoGEService(mockService);
    expect(service).toBeTruthy();
  });
});
