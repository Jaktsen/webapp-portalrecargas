import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { GlobalObjectService } from './global-object.service';

import { WcmService } from './wcm.service';

describe('WcmService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [],
    imports: [HttpClientModule],
    providers: [
      WcmService,
      { provide: GlobalObjectService,  useValue: {
        getObject: (prop: string) => {
          if (prop === 'wcm') {
            return {
              terms: {
                giftcard: {
                  giftcard_5gb: 'giftcard_5gb',
                  giftcard_10gb: 'giftcard_10gb',
                  giftcard_30gb: 'giftcard_30gb',
                  giftcard_30gb_pack_video: 'giftcard_30gb_pack_video',
                  giftcard_facebook: 'giftcard_facebook',
                  giftcard_instagram: 'giftcard_instagram',
                  giftcard_whatsapp: 'giftcard_whatsapp',
                },
                canje_eventos: {
                  evento_1: 'evento1',
                  evento_2: 'evento2',
                  evento_3: 'evento3',
                  evento_4: 'evento4',
                  evento_5: 'evento5',
                },
                cargo_recibo: 'cargo_recibo',
                textos_legales_roaming: {
                  diario: 'diario',
                  mensual: 'mensual'
                }
              },
              listas: {
                listaVideos: [],
                listaGiftCards: [],
                listaWCMOpciones: [],
                listaWCMEvents: [],
                listaWCMRecomendaciones: []
              }
            };
          }
          return prop;
        },
      }  }
   ]

  }));

  it('should load wcm contents successfully', () => {
    const service: WcmService = TestBed.get(WcmService);
    expect(service).toBeTruthy();
    service.loadContent();
    console.log(service.configBloqueos);
    expect(service.terminos.giftcard.giftcard_whatsapp).toEqual('giftcard_whatsapp');
  });
});
