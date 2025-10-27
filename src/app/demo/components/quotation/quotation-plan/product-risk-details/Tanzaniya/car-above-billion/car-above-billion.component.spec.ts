import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarAboveBillionComponent } from './car-above-billion.component';

describe('CarAboveBillionComponent', () => {
  let component: CarAboveBillionComponent;
  let fixture: ComponentFixture<CarAboveBillionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarAboveBillionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarAboveBillionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
