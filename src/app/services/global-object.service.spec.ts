import { TestBed } from '@angular/core/testing';

import { GlobalObjectService } from './global-object.service';

describe('GlobalObjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalObjectService = TestBed.get(GlobalObjectService);
    expect(service).toBeTruthy();
  });
});
