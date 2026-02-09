import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerDescargaComponent } from './banner-descarga.component';

describe('BannerDescargaComponent', () => {
  let component: BannerDescargaComponent;
  let fixture: ComponentFixture<BannerDescargaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerDescargaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerDescargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
