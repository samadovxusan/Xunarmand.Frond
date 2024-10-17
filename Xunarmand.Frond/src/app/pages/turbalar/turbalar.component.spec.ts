import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurbalarComponent } from './turbalar.component';

describe('TurbalarComponent', () => {
  let component: TurbalarComponent;
  let fixture: ComponentFixture<TurbalarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurbalarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurbalarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
