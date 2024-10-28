import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DimaxodlarComponent } from './dimaxodlar.component';

describe('DimaxodlarComponent', () => {
  let component: DimaxodlarComponent;
  let fixture: ComponentFixture<DimaxodlarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DimaxodlarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DimaxodlarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
