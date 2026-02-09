import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitaMiClaroWebComponent } from './visita-mi-claro-web.component';

describe('VisitaMiClaroWebComponent', () => {
  let component: VisitaMiClaroWebComponent;
  let fixture: ComponentFixture<VisitaMiClaroWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitaMiClaroWebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitaMiClaroWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
