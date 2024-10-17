import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VintilatsiyaComponent } from './vintilatsiya.component';

describe('VintilatsiyaComponent', () => {
  let component: VintilatsiyaComponent;
  let fixture: ComponentFixture<VintilatsiyaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VintilatsiyaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VintilatsiyaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
