import { WefClientService } from './../core/http/wef-client.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CaptchaService {
  public url = environment.urlComprasyPAgosWef.obtenerCaptcha;
  public captchaBase64Image = null;
  public errorFlag = false;
  public errorMessage = '';

  constructor(private wefClientService: WefClientService) {}

  getCaptcha(callback) {
    this.wefClientService.get(this.url).subscribe(
      (response) => {
        console.log('captchaService > getCaptcha');
        if (response.comunResponseType.captcha != null) {
          this.captchaBase64Image =
            'data:image/png;base64,' + response.comunResponseType.captcha;
          this.errorFlag = false;
          console.log('captchaImage response: ', this.captchaBase64Image);
        } else {
          console.log('No available captcha');
          this.captchaBase64Image = null;
          this.errorFlag = true;
          this.errorMessage = 'No available captcha code';
        }
        console.groupEnd();
        callback();
      },
      (error) => {
        console.log('captchaService > getCaptcha');
        this.captchaBase64Image = null;
        this.errorFlag = true;
        this.errorMessage = JSON.stringify(error);
        console.error(this.errorMessage);
        console.groupEnd();
        callback();
      }
    );
  }
}
