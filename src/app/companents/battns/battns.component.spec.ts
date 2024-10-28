import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattnsComponent } from './battns.component';

describe('BattnsComponent', () => {
  let component: BattnsComponent;
  let fixture: ComponentFixture<BattnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BattnsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BattnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
