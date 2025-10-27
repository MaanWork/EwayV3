import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarUptoBillionComponent } from './car-upto-billion.component';

describe('CarUptoBillionComponent', () => {
  let component: CarUptoBillionComponent;
  let fixture: ComponentFixture<CarUptoBillionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarUptoBillionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarUptoBillionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
