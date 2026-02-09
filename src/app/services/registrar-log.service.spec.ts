import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { RegistrarLogService } from './registrar-log.service';

describe('RegistrarLogService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: RegistrarLogService = TestBed.get(RegistrarLogService);
    expect(service).toBeTruthy();
  });
});
