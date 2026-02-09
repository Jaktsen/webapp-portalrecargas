import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { WefClientService } from './wef-client.service';

describe('WefClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
    ]
  }));

  it('should be created', () => {
    const service: WefClientService = TestBed.get(WefClientService);
    expect(service).toBeTruthy();
  });
});
