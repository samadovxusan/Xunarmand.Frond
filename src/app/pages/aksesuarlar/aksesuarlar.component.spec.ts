import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AksesuarlarComponent } from './aksesuarlar.component';

describe('AksesuarlarComponent', () => {
  let component: AksesuarlarComponent;
  let fixture: ComponentFixture<AksesuarlarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AksesuarlarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AksesuarlarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
