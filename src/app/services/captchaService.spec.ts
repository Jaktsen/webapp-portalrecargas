import { CaptchaService } from './catpchaService';
import { async, TestBed } from '@angular/core/testing';
import { WefClientService } from '../core/http/wef-client.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';

describe('Captcha service', () => {
  let comp: CaptchaService;
  let wefClientSpy: jasmine.SpyObj<WefClientService>;

  let testData = {
    captcha: '',
  };

  function getMockResponse() {
    return `
{
  "comunResponseType": {
      "captcha": "${testData.captcha}"
  }
}
`;
  }
  function getMockResponseWithoutCaptcha() {
    return `
{
  "comunResponseType": {
      "captchas": "${testData.captcha}"
  }
}
`;
  }

  beforeEach(() => {
    const spy = jasmine.createSpyObj('WefClientService', ['get']);
    TestBed.configureTestingModule({
      // provide the component-under-test and dependent service
      providers: [CaptchaService, { provide: WefClientService, useValue: spy }],
      imports: [HttpClientModule],
    });
    // inject both the component and the dependent service.
    comp = TestBed.get(CaptchaService);
    wefClientSpy = TestBed.get(WefClientService) as jasmine.SpyObj<
      WefClientService
    >;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
  });

  it('should getCaptcha correctly', async(() => {
    testData = {
      captcha: 'xxxyyy',
    };
    wefClientSpy.get.and.returnValue(of(JSON.parse(getMockResponse())));

    comp.getCaptcha(() => {
      //console.log(comp.captchaBase64Image);
      expect(comp.captchaBase64Image).toEqual(
        'data:image/png;base64,' + testData.captcha
      );
      expect(comp.errorFlag).toBeFalsy();
      expect(comp.errorMessage).toEqual('');
    });
  }));
  it('should handle when no captcha data is found in a response', async(() => {
    testData = {
      captcha: 'xxxyyy',
    };
    wefClientSpy.get.and.returnValue(
      of(JSON.parse(getMockResponseWithoutCaptcha()))
    );
    comp.getCaptcha(() => {
      //console.log(comp.captchaBase64Image);
      expect(comp.captchaBase64Image).toBeNull();
      expect(comp.errorFlag).toBeTruthy();
      expect(comp.errorMessage).toEqual('No available captcha code');
    });
  }));
  it('should handle when error happens', async(() => {
    testData = {
      captcha: 'xxxyyy',
    };
    wefClientSpy.get.and.returnValue(throwError({ status: 500 }));

    comp.getCaptcha(() => {
      //console.log(comp.captchaBase64Image);
      expect(comp.captchaBase64Image).toBeNull();
      expect(comp.errorFlag).toBeTruthy();
      //console.log(comp.errorMessage);
      expect(comp.errorMessage).toContain('500');
    });
  }));
});
