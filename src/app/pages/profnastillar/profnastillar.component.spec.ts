import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfnastillarComponent } from './profnastillar.component';

describe('ProfnastillarComponent', () => {
  let component: ProfnastillarComponent;
  let fixture: ComponentFixture<ProfnastillarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfnastillarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfnastillarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
