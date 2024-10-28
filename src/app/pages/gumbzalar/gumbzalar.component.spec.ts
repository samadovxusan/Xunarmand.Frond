import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GumbzalarComponent } from './gumbzalar.component';

describe('GumbzalarComponent', () => {
  let component: GumbzalarComponent;
  let fixture: ComponentFixture<GumbzalarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GumbzalarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GumbzalarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
