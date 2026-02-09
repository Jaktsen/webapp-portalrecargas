import { AppModule } from './../../app.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PopupGeneralComponent } from './popup-general.component';
import { By } from '@angular/platform-browser';

describe('PopupGeneralComponent', () => {
  let component: PopupGeneralComponent;
  let fixture: ComponentFixture<PopupGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [

      ],
      imports: [
       AppModule

      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should open Error Progreso popup OK', () => {
    component.nombrePopUp = 'Error Progreso';
    component.infoPopUp = {
      mensaje_upps_titulo: 'Mensaje de prueba aqu&iacute;'
    };
    fixture.detectChanges();
    const popupsErrorProgreso = fixture.debugElement.queryAll(By.css('#popErrorProgreso'));
    expect(popupsErrorProgreso.length).toEqual(1);
    expect(component).toBeTruthy();
    component.cerrarPop();
    fixture.detectChanges();
  });
});
