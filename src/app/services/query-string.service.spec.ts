import { GlobalObjectService } from './global-object.service';
import { TestBed } from '@angular/core/testing';
import { QueryStringService } from './query-string.service';

describe('QueryStringService', () => {
  let globalObjectServiceSpy: jasmine.SpyObj<GlobalObjectService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('GlobalObjectService', ['getWindowLocationHref']);
    TestBed.configureTestingModule({
      providers: [
        { provide: GlobalObjectService, useValue: spy },
      ],
    });
  });

  it('should get queryString correctly', () => {
    const service: QueryStringService = TestBed.get(QueryStringService);
    globalObjectServiceSpy = TestBed.get(GlobalObjectService) as jasmine.SpyObj<GlobalObjectService>;
    globalObjectServiceSpy.getWindowLocationHref.and.returnValue('http://localhost:4200/?root=1&canal=8&rec=1');
    expect(service).toBeTruthy();
    expect(service.extraerQueryString('root')).toEqual('1');
    expect(service.extraerQueryString('canal')).toEqual('8');
    expect(service.extraerQueryString('rec')).toEqual('1');
    expect(service.extraerQueryString('num')).toBeNull();
  });

  it('should extraerQueryStringMultiple correctly', () => {
    const service: QueryStringService = TestBed.get(QueryStringService);
    globalObjectServiceSpy = TestBed.get(GlobalObjectService) as jasmine.SpyObj<GlobalObjectService>;
    globalObjectServiceSpy.getWindowLocationHref.and.returnValue('http://localhost:4200/?root=1&canal=8&rec=1');
    expect(service).toBeTruthy();
    service.extraerQueryStringMultiple(['root', 'canal', 'rec', 'num']);
    expect(service.getQueryString('root')).toEqual('1');
    expect(service.paramsStore.canal).toEqual('8');
    expect(service.getQueryString('rec')).toEqual('1');
    expect(service.paramsStore.num).toBeNull();
  });
});
